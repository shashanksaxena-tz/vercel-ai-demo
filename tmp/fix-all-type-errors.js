#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('ui')) {
        findTsxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function fixTypeErrors() {
  console.log('Finding all component files...');
  const files = findTsxFiles('src/registries');

  console.log(`Found ${files.length} files to process`);

  let totalChanges = 0;

  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf-8');
      let changes = 0;
      const originalContent = content;

      // Fix 1: Add ReactNode cast to variables followed by } when not already cast
      // Pattern: {varName} where varName comes from element.props
      // This targets simple variable renders like {unit}, {label}, {icon}, etc.
      const simpleVarPattern = /\{(\w+)\s*\}/g;
      let match;
      const varsToFix = new Set();

      // First pass: identify variables that might need fixing
      while ((match = simpleVarPattern.exec(content)) !== null) {
        const varName = match[1];
        // Skip if it's a known safe pattern
        if (!['children', 'element', 'React', 'true', 'false', 'null', 'undefined'].includes(varName)) {
          varsToFix.add(varName);
        }
      }

      // Second pass: fix variables that are defined from element.props
      for (const varName of varsToFix) {
        // Check if this var is destructured from element.props
        const propsPattern = new RegExp(`(const|let|var)\\s*{[^}]*\\b${varName}\\b[^}]*}\\s*=\\s*element\\.props`, 'm');
        if (propsPattern.test(content)) {
          // Fix the rendering - but only if not already cast
          const renderPattern = new RegExp(`\\{${varName}(?!\\s+as\\s+React\\.ReactNode)\\}`, 'g');
          const newContent = content.replace(renderPattern, `{${varName} as React.ReactNode}`);
          if (newContent !== content) {
            content = newContent;
            changes++;
          }
        }
      }

      // Fix 2: Add ReactNode cast to .toLocaleString(), .toFixed(), .charAt() etc when not already cast
      content = content.replace(
        /\{([^}]+)\.(toLocaleString|toFixed|charAt|toString)\(([^)]*)\)(?!\s+as\s+React\.ReactNode)\}/g,
        '{$1.$2($3) as React.ReactNode}'
      );

      // Fix 3: Add ReactNode cast to string interpolation without cast
      content = content.replace(
        /\{`([^`]*)\$\{([^}]+)\}([^`]*)`(?!\s+as\s+React\.ReactNode)\}/g,
        '{`$1\${$2}$3` as React.ReactNode}'
      );

      // Fix 4: Add number cast to comparisons with unknown values
      // Pattern: varName >= number or varName > number, etc.
      content = content.replace(
        /\b(\w+)\s*(>=|<=|>|<)\s*(\d+)/g,
        (match, varName, operator, number) => {
          // Check if already cast
          if (match.includes(' as number)')) return match;
          // Check if this is from element.props
          const propsPattern = new RegExp(`(const|let|var)\\s*{[^}]*\\b${varName}\\b[^}]*}\\s*=\\s*element\\.props`, 'm');
          if (propsPattern.test(content)) {
            return `(${varName} as number) ${operator} ${number}`;
          }
          return match;
        }
      );

      // Fix 5: Add number cast to Math functions with unknown values
      content = content.replace(
        /Math\.(abs|round|floor|ceil|min|max)\(([^)]+)\)/g,
        (match, func, arg) => {
          // Skip if already cast
          if (arg.includes(' as number)')) return match;
          // Check if this looks like it needs casting
          if (/^\w+$/.test(arg.trim())) {
            const varName = arg.trim();
            const propsPattern = new RegExp(`(const|let|var)\\s*{[^}]*\\b${varName}\\b[^}]*}\\s*=\\s*element\\.props`, 'm');
            if (propsPattern.test(content)) {
              return `Math.${func}(${arg} as number)`;
            }
          }
          return match;
        }
      );

      // Fix 6: Handle ternary expressions that need wrapping
      // Pattern: condition ? value1 : value2 where values are unknown
      content = content.replace(
        /\{([^}]+)\s*\?\s*([^:]+)\s*:\s*([^}]+)\}/g,
        (match, condition, trueVal, falseVal) => {
          // Skip if already has ReactNode cast at the end
          if (match.includes(' as React.ReactNode}')) return match;

          // Check if this is rendering unknown values from props
          const varPattern = /\b(\w+)\b/g;
          let hasPropsVar = false;
          let varMatch;
          while ((varMatch = varPattern.exec(trueVal + falseVal)) !== null) {
            const varName = varMatch[1];
            const propsPattern = new RegExp(`(const|let|var)\\s*{[^}]*\\b${varName}\\b[^}]*}\\s*=\\s*element\\.props`, 'm');
            if (propsPattern.test(content)) {
              hasPropsVar = true;
              break;
            }
          }

          if (hasPropsVar) {
            return `{(${condition} ? ${trueVal} : ${falseVal}) as React.ReactNode}`;
          }
          return match;
        }
      );

      // Fix 7: Width/Height type errors in style objects
      content = content.replace(
        /(width|height|minWidth|minHeight|maxWidth|maxHeight):\s*([^,\n]+?)(?=,|\})/g,
        (match, prop, value) => {
          // Skip if already cast
          if (value.includes(' as ')) return match;
          // Check if value contains unknown variables
          if (/\w+\s*\?[^:]+:[^,\}]+/.test(value)) {
            return `${prop}: (${value}) as string | number`;
          }
          return match;
        }
      );

      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf-8');
        totalChanges++;
        console.log(`✓ Fixed ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  console.log(`\nComplete! Fixed ${totalChanges} files.`);
}

try {
  fixTypeErrors();
} catch (error) {
  console.error('Error:', error);
}
