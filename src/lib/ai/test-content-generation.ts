/**
 * Test Script for Content Generation
 *
 * Verifies that AI-generated UIs include realistic content by default
 */

import { generateUIFromPrompt } from './ui-generator';
import type { UITree } from './ui-generator';

interface ContentCheckResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Check if a UITree has realistic content
 */
export function checkUITreeContent(tree: UITree, context: string): ContentCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [key, element] of Object.entries(tree.elements)) {
    const props = element.props;

    // Check Heading components
    if (element.type === 'Heading') {
      const text = props.text as string | undefined;
      if (!text) {
        errors.push(`Heading "${key}" is missing text prop`);
      } else if (text.toLowerCase() === 'heading' || text.toLowerCase() === 'title') {
        errors.push(`Heading "${key}" has placeholder text: "${text}"`);
      } else if (text.length < 3) {
        warnings.push(`Heading "${key}" text is very short: "${text}"`);
      }
    }

    // Check Text components
    if (element.type === 'Text') {
      const content = props.content as string | undefined;
      if (!content) {
        errors.push(`Text "${key}" is missing content prop`);
      } else if (content.toLowerCase().includes('lorem ipsum')) {
        errors.push(`Text "${key}" contains lorem ipsum`);
      } else if (content.length < 10) {
        warnings.push(`Text "${key}" content is very short: "${content}"`);
      }
    }

    // Check Button components
    if (element.type === 'Button') {
      const label = props.label as string | undefined;
      if (!label) {
        errors.push(`Button "${key}" is missing label prop`);
      } else if (
        label.toLowerCase() === 'button' ||
        label.toLowerCase() === 'click here' ||
        label.toLowerCase() === 'submit'
      ) {
        warnings.push(`Button "${key}" has generic label: "${label}"`);
      }
    }

    // Check Metric components
    if (element.type === 'Metric') {
      const label = props.label as string | undefined;
      const value = props.value as string | number | undefined;

      if (!label) {
        errors.push(`Metric "${key}" is missing label prop`);
      } else if (label.toLowerCase() === 'metric') {
        errors.push(`Metric "${key}" has placeholder label: "${label}"`);
      }

      if (!value) {
        errors.push(`Metric "${key}" is missing value prop`);
      }
    }

    // Check Image components
    if (element.type === 'Image') {
      const src = props.src as string | undefined;
      const alt = props.alt as string | undefined;

      if (!src) {
        errors.push(`Image "${key}" is missing src prop`);
      }

      if (!alt) {
        warnings.push(`Image "${key}" is missing alt text for accessibility`);
      }
    }

    // Check layout components have gap/spacing
    if (['Row', 'Column', 'Stack'].includes(element.type)) {
      const gap = props.gap as string | undefined;
      if (!gap && element.children && element.children.length > 1) {
        warnings.push(`Layout "${key}" (${element.type}) has multiple children but no gap specified`);
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Test cases for content generation
 */
const testPrompts = [
  {
    name: 'Simple Dashboard',
    prompt: 'Create a dashboard with 4 metric cards showing revenue, users, orders, and conversion rate',
    checks: [
      'Should have 4 Metric components',
      'Each metric should have realistic values',
      'Metrics should have descriptive labels',
    ],
  },
  {
    name: 'Login Form',
    prompt: 'Create a login form with email and password fields',
    checks: [
      'Should have Input components with labels',
      'Button should have action-oriented label',
      'Should have a heading',
    ],
  },
  {
    name: 'Product Card',
    prompt: 'Create a product card with an image, title, description, price, and add to cart button',
    checks: [
      'Should have an Image with src',
      'Should have realistic product title',
      'Should have product description text',
      'Button should say something like "Add to Cart"',
    ],
  },
  {
    name: 'Landing Page Hero',
    prompt: 'Create a hero section for a SaaS landing page',
    checks: [
      'Should have compelling heading',
      'Should have descriptive text',
      'Should have call-to-action button with clear label',
    ],
  },
];

/**
 * Run all tests
 */
export async function runContentTests() {
  console.log('🧪 Testing AI Content Generation\n');

  let totalPassed = 0;
  let totalFailed = 0;

  for (const test of testPrompts) {
    console.log(`📝 Test: ${test.name}`);
    console.log(`   Prompt: "${test.prompt}"`);

    try {
      const result = await generateUIFromPrompt(test.prompt);
      const contentCheck = checkUITreeContent(result.tree, test.prompt);

      if (contentCheck.passed) {
        console.log('   ✅ PASSED - All content checks successful');
        totalPassed++;

        if (contentCheck.warnings.length > 0) {
          console.log('   ⚠️  Warnings:');
          contentCheck.warnings.forEach((w) => console.log(`      - ${w}`));
        }
      } else {
        console.log('   ❌ FAILED - Content quality issues found');
        totalFailed++;
        contentCheck.errors.forEach((e) => console.log(`      - ${e}`));
      }

      console.log(`   Explanation: ${result.explanation}`);
      console.log('');
    } catch (error) {
      console.log(`   ❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
      totalFailed++;
      console.log('');
    }
  }

  console.log('─'.repeat(60));
  console.log(`📊 Results: ${totalPassed} passed, ${totalFailed} failed`);

  return { passed: totalPassed, failed: totalFailed };
}

/**
 * Run tests if executed directly
 */
if (require.main === module) {
  runContentTests()
    .then(({ passed, failed }) => {
      process.exit(failed > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}
