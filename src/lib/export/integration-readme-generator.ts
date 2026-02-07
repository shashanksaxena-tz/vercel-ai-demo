/**
 * Integration README Generator
 *
 * Generates comprehensive API integration guides for components
 * with extracted data structures.
 */

import type { UIFramework } from '@/types';
import type { DataStructure } from './data-extractor';
import { generateSampleData } from './data-extractor';

/**
 * Options for integration README
 */
export interface IntegrationReadmeOptions {
  componentName: string;
  framework: UIFramework;
  structures: DataStructure[];
  includeReactQuery?: boolean;
  includeNextJS?: boolean;
  includeFetch?: boolean;
}

/**
 * Convert PascalCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Get framework display name
 */
function getFrameworkDisplayName(framework: UIFramework): string {
  const names: Record<UIFramework, string> = {
    shadcn: 'shadcn/ui',
    mui: 'Material UI',
    chakra: 'Chakra UI',
    tailwind: 'Tailwind CSS',
    flowbite: 'Flowbite React',
    antd: 'Ant Design',
    'magic-ui': 'Magic UI',
    aceternity: 'Aceternity UI',
  };
  return names[framework];
}

/**
 * Generate TypeScript interfaces section
 */
function generateInterfacesSection(structures: DataStructure[]): string {
  const lines: string[] = [];

  lines.push('## Data Structures');
  lines.push('');
  lines.push('Your API should return data matching these TypeScript interfaces:');
  lines.push('');
  lines.push('```typescript');

  for (const structure of structures) {
    lines.push(`interface ${structure.name} {`);

    for (const field of structure.fields) {
      const optional = field.optional ? '?' : '';
      const comment = field.samples.length > 0 ? ` // e.g., "${field.samples[0]}"` : '';
      lines.push(`  ${field.name}${optional}: ${field.type};${comment}`);
    }

    lines.push('}');
    lines.push('');
  }

  lines.push('```');

  return lines.join('\n');
}

/**
 * Generate API response format section
 */
function generateApiResponseSection(structures: DataStructure[]): string {
  const lines: string[] = [];

  lines.push('## Expected API Response');
  lines.push('');
  lines.push('Your API endpoint should return data in this format:');
  lines.push('');

  for (const structure of structures) {
    lines.push(`### GET /api/${toKebabCase(structure.name)}`);
    lines.push('');
    lines.push('```json');
    lines.push('{');
    lines.push(`  "data": [`);

    // Generate example JSON response
    const sampleCount = Math.min(2, structure.elementKeys.length);
    for (let i = 0; i < sampleCount; i++) {
      lines.push('    {');

      for (let j = 0; j < structure.fields.length; j++) {
        const field = structure.fields[j];
        const sample = field.samples[i % field.samples.length];
        const isLast = j === structure.fields.length - 1;

        let value: string;
        if (field.type.includes('string')) {
          value = `"${sample}"`;
        } else if (field.type.includes('number')) {
          value = String(sample);
        } else if (field.type.includes('boolean')) {
          value = String(sample);
        } else {
          value = `"${sample}"`;
        }

        lines.push(`      "${field.name}": ${value}${isLast ? '' : ','}`);
      }

      const isLastItem = i === sampleCount - 1;
      lines.push(`    }${isLastItem ? '' : ','}`);
    }

    lines.push('  ],');
    lines.push('  "total": 10,');
    lines.push('  "page": 1,');
    lines.push('  "limit": 10');
    lines.push('}');
    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate React Query integration example
 */
function generateReactQuerySection(componentName: string, structures: DataStructure[]): string {
  const lines: string[] = [];
  const kebabName = toKebabCase(componentName);

  lines.push('## Integration with React Query');
  lines.push('');
  lines.push('### Installation');
  lines.push('');
  lines.push('```bash');
  lines.push('npm install @tanstack/react-query');
  lines.push('```');
  lines.push('');
  lines.push('### Setup QueryClient');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { QueryClient, QueryClientProvider } from '@tanstack/react-query';");
  lines.push('');
  lines.push('const queryClient = new QueryClient();');
  lines.push('');
  lines.push('function App() {');
  lines.push('  return (');
  lines.push('    <QueryClientProvider client={queryClient}>');
  lines.push('      {/* Your app */}');
  lines.push('    </QueryClientProvider>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');
  lines.push('### Usage Example');
  lines.push('');

  for (const structure of structures) {
    const hookName = `use${structure.name}`;
    const apiPath = `/api/${toKebabCase(structure.name)}`;

    lines.push('```tsx');
    lines.push("'use client';");
    lines.push('');
    lines.push("import { useQuery } from '@tanstack/react-query';");
    lines.push(`import { ${componentName} } from './${kebabName}';`);
    lines.push('');
    lines.push(`function ${hookName}() {`);
    lines.push(`  return useQuery({`);
    lines.push(`    queryKey: ['${structure.propName}'],`);
    lines.push(`    queryFn: async () => {`);
    lines.push(`      const response = await fetch('${apiPath}');`);
    lines.push(`      if (!response.ok) throw new Error('Failed to fetch');`);
    lines.push(`      const data = await response.json();`);
    lines.push(`      return data.data;`);
    lines.push(`    },`);
    lines.push(`  });`);
    lines.push('}');
    lines.push('');
    lines.push('export default function Page() {');
    lines.push(`  const { data, isLoading, error } = ${hookName}();`);
    lines.push('');
    lines.push('  if (isLoading) return <div>Loading...</div>;');
    lines.push('  if (error) return <div>Error: {error.message}</div>;');
    lines.push('');
    lines.push(`  return <${componentName} ${structure.propName}={data || []} />;`);
    lines.push('}');
    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate Next.js Server Components integration
 */
function generateNextJSSection(componentName: string, structures: DataStructure[]): string {
  const lines: string[] = [];
  const kebabName = toKebabCase(componentName);

  lines.push('## Integration with Next.js Server Components');
  lines.push('');
  lines.push('### Usage Example');
  lines.push('');

  for (const structure of structures) {
    const apiPath = `https://api.example.com/${toKebabCase(structure.name)}`;

    lines.push('```tsx');
    lines.push(`import { ${componentName} } from '@/components/${kebabName}';`);
    lines.push('');
    lines.push(`async function fetch${structure.name}() {`);
    lines.push(`  const response = await fetch('${apiPath}', {`);
    lines.push(`    next: { revalidate: 60 }, // Revalidate every 60 seconds`);
    lines.push(`  });`);
    lines.push('');
    lines.push('  if (!response.ok) {');
    lines.push('    throw new Error(\`Failed to fetch ${structure.propName}\`);');
    lines.push('  }');
    lines.push('');
    lines.push('  const data = await response.json();');
    lines.push('  return data.data;');
    lines.push('}');
    lines.push('');
    lines.push('export default async function Page() {');
    lines.push(`  const ${structure.propName} = await fetch${structure.name}();`);
    lines.push('');
    lines.push(`  return <${componentName} ${structure.propName}={${structure.propName}} />;`);
    lines.push('}');
    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate simple fetch example
 */
function generateFetchSection(componentName: string, structures: DataStructure[]): string {
  const lines: string[] = [];
  const kebabName = toKebabCase(componentName);

  lines.push('## Simple Fetch Integration');
  lines.push('');
  lines.push('### Usage Example');
  lines.push('');

  for (const structure of structures) {
    const apiPath = `/api/${toKebabCase(structure.name)}`;

    lines.push('```tsx');
    lines.push("'use client';");
    lines.push('');
    lines.push("import { useState, useEffect } from 'react';");
    lines.push(`import { ${componentName} } from './${kebabName}';`);
    lines.push('');
    lines.push('export default function Page() {');
    lines.push(`  const [${structure.propName}, set${structure.name}] = useState([]);`);
    lines.push('  const [loading, setLoading] = useState(true);');
    lines.push('');
    lines.push('  useEffect(() => {');
    lines.push('    fetch(\'' + apiPath + '\')');
    lines.push('      .then(res => res.json())');
    lines.push(`      .then(data => {`);
    lines.push(`        set${structure.name}(data.data);`);
    lines.push('        setLoading(false);');
    lines.push('      })');
    lines.push('      .catch(console.error);');
    lines.push('  }, []);');
    lines.push('');
    lines.push('  if (loading) return <div>Loading...</div>;');
    lines.push('');
    lines.push(`  return <${componentName} ${structure.propName}={${structure.propName}} />;`);
    lines.push('}');
    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate test data section
 */
function generateTestDataSection(structures: DataStructure[]): string {
  const lines: string[] = [];

  lines.push('## Test Data');
  lines.push('');
  lines.push('Use this sample data for testing your component:');
  lines.push('');
  lines.push('```typescript');

  for (const structure of structures) {
    const sampleData = generateSampleData(structure);
    lines.push(sampleData);
    lines.push('');
  }

  lines.push('```');
  lines.push('');
  lines.push('### Example Usage with Test Data');
  lines.push('');
  lines.push('```tsx');

  for (const structure of structures) {
    lines.push(`<${structure.name}Component ${structure.propName}={mock${structure.name}} />`);
  }

  lines.push('```');

  return lines.join('\n');
}

/**
 * Generate integration README
 *
 * @param options - Integration README options
 * @returns Complete markdown content
 */
export function generateIntegrationReadme(options: IntegrationReadmeOptions): string {
  const {
    componentName,
    framework,
    structures,
    includeReactQuery = true,
    includeNextJS = true,
    includeFetch = true,
  } = options;

  if (structures.length === 0) {
    return '# No Data Structures Detected\n\nThis component does not contain extractable data patterns.';
  }

  const sections: string[] = [];

  // Header
  sections.push(`# ${componentName} - API Integration Guide`);
  sections.push('');
  sections.push(`This component was generated by Generative UI Builder using ${getFrameworkDisplayName(framework)}.`);
  sections.push('');
  sections.push('This guide explains how to integrate your API data with this component.');
  sections.push('');

  // Data structures
  sections.push(generateInterfacesSection(structures));
  sections.push('');

  // API response format
  sections.push(generateApiResponseSection(structures));
  sections.push('');

  // Integration examples
  if (includeReactQuery) {
    sections.push(generateReactQuerySection(componentName, structures));
    sections.push('');
  }

  if (includeNextJS) {
    sections.push(generateNextJSSection(componentName, structures));
    sections.push('');
  }

  if (includeFetch) {
    sections.push(generateFetchSection(componentName, structures));
    sections.push('');
  }

  // Test data
  sections.push(generateTestDataSection(structures));
  sections.push('');

  // Environment variables
  sections.push('## Environment Variables');
  sections.push('');
  sections.push('Create a `.env.local` file in your project root:');
  sections.push('');
  sections.push('```env');
  sections.push('NEXT_PUBLIC_API_URL=https://api.example.com');
  sections.push('```');
  sections.push('');

  // Notes
  sections.push('## Important Notes');
  sections.push('');
  sections.push('1. **Replace placeholder URLs**: Update all API endpoints to match your actual backend URLs.');
  sections.push('2. **Add error handling**: The examples include basic error handling, but you should enhance it based on your needs.');
  sections.push('3. **Add loading states**: Consider adding skeleton loaders or spinners for better UX.');
  sections.push('4. **Add authentication**: If your API requires authentication, add the necessary headers.');
  sections.push('5. **Type safety**: The TypeScript interfaces ensure type safety. Keep them in sync with your API.');
  sections.push('');

  // Footer
  sections.push('---');
  sections.push('');
  sections.push('Generated with Generative UI Builder');

  return sections.join('\n');
}

/**
 * Generate minimal integration guide (just interfaces and test data)
 */
export function generateMinimalIntegrationGuide(
  componentName: string,
  structures: DataStructure[]
): string {
  if (structures.length === 0) {
    return '';
  }

  const sections: string[] = [];

  sections.push(`# ${componentName} - Data Integration`);
  sections.push('');
  sections.push(generateInterfacesSection(structures));
  sections.push('');
  sections.push(generateTestDataSection(structures));

  return sections.join('\n');
}

export default generateIntegrationReadme;
