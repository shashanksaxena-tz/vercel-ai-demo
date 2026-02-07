#!/usr/bin/env node
/**
 * Verification script for namespace prefix fix
 * Run: node --experimental-strip-types verify-namespace-fix.mjs
 */

import { generateReactCode } from './src/lib/export/code-generator.ts';

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   Invalid JSX Namespace Syntax Fix - Verification            ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

// Test case with problematic namespace prefixes
const testTree = {
  root: 'container1',
  elements: {
    container1: {
      type: 'core::Container',
      props: {
        type: 'core::Container',
        value: 'Container',
        className: 'p-8'
      },
      children: ['heading1', 'avatar1', 'button1']
    },
    heading1: {
      type: 'core::Heading',
      props: {
        type: 'core::Heading',
        value: 'Welcome',
        text: 'Welcome to the App',
        level: '1'
      },
      children: []
    },
    avatar1: {
      type: 'core::Avatar',
      props: {
        type: 'core::Avatar',
        value: 'Alice Johnson',
        src: '/avatars/alice.jpg',
        alt: 'Alice Johnson'
      },
      children: []
    },
    button1: {
      type: 'mcp::ShimmerButton',
      props: {
        type: 'mcp::ShimmerButton',
        value: 'Click Me',
        label: 'Get Started',
        variant: 'primary'
      },
      children: []
    }
  }
};

console.log('❌ BEFORE FIX (Expected bad output):\n');
console.log('```tsx');
console.log('import { core::Avatar, core::Container, core::Heading, mcp::ShimmerButton } from \'@/components/ui\';');
console.log('');
console.log('<core::Container type="core::Container" value="Container" className="p-8">');
console.log('  <core::Heading type="core::Heading" value="Welcome" level="1" />');
console.log('  <core::Avatar type="core::Avatar" value="Alice Johnson" src="/avatars/alice.jpg" alt="Alice Johnson" />');
console.log('  <mcp::ShimmerButton type="mcp::ShimmerButton" value="Click Me" variant="primary" />');
console.log('</core::Container>');
console.log('```\n');

console.log('═'.repeat(65) + '\n');
console.log('✅ AFTER FIX (Actual output):\n');

const code = generateReactCode(testTree, {
  target: 'react',
  framework: 'shadcn',
  componentName: 'WelcomeComponent',
  includeTypes: true,
  includeApiComments: false
});

console.log('```tsx');
console.log(code);
console.log('```\n');

console.log('═'.repeat(65) + '\n');
console.log('🧪 VERIFICATION CHECKS:\n');

const checks = [
  { name: 'No "::" namespace prefix in JSX', pass: !code.includes('::'), critical: true },
  { name: 'No type= props in output', pass: !code.includes('type='), critical: true },
  { name: 'No value= props in output', pass: !code.includes('value='), critical: true },
  { name: 'Valid import statement (no ::)', pass: !code.match(/import.*::/), critical: true },
  { name: 'Contains Avatar component', pass: code.includes('<Avatar'), critical: false },
  { name: 'Contains Container component', pass: code.includes('<Container'), critical: false },
  { name: 'Contains Heading component', pass: code.includes('<Heading'), critical: false },
  { name: 'Contains ShimmerButton component', pass: code.includes('<ShimmerButton'), critical: false },
  { name: 'Includes Framer Motion for animations', pass: code.includes('framer-motion'), critical: false },
  { name: 'Valid JSX element names', pass: /<[A-Z][a-zA-Z0-9]*/.test(code) && !code.includes('::'), critical: true },
  { name: 'Clean prop attributes', pass: code.includes('src=') && code.includes('alt='), critical: false },
];

let allCriticalPass = true;
let totalPass = 0;

checks.forEach(check => {
  const icon = check.pass ? '✅' : '❌';
  const status = check.pass ? 'PASS' : 'FAIL';
  const critical = check.critical ? '⚠️  CRITICAL' : '';

  console.log(`${icon} ${check.name.padEnd(40)} [${status}] ${critical}`);

  if (check.pass) {
    totalPass++;
  } else if (check.critical) {
    allCriticalPass = false;
  }
});

console.log('\n' + '═'.repeat(65) + '\n');
console.log(`📊 RESULTS: ${totalPass}/${checks.length} checks passed\n`);

if (allCriticalPass) {
  console.log('🎉 SUCCESS! All critical checks passed.');
  console.log('   The namespace prefix fix is working correctly.\n');
  process.exit(0);
} else {
  console.log('💥 FAILURE! Some critical checks failed.');
  console.log('   The namespace prefix fix needs attention.\n');
  process.exit(1);
}
