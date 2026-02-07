/**
 * Animation Export Tests
 *
 * Tests that animation dependencies are correctly included in exported code.
 */

import type { UITree } from '@json-render/core';
import {
  generateReactCode,
  generateNextJSCode,
  getInstallationInstructions,
  generatePackageJsonDependencies,
  getAnimationDependenciesFromTree,
  hasAnimatedComponents,
  type CodeGenerationOptions,
} from '../code-generator';

describe('Animation Export', () => {
  describe('Magic UI ShimmerButton', () => {
    const shimmerButtonTree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: { maxWidth: 'md', padding: 'lg' },
          children: ['button1'],
        },
        button1: {
          key: 'button1',
          type: 'ShimmerButton',
          props: { label: 'Click Me' },
        },
      },
    };

    it('should detect animated components', () => {
      const hasAnimations = hasAnimatedComponents(shimmerButtonTree, 'magic-ui');
      expect(hasAnimations).toBe(true);
    });

    it('should extract animation dependencies', () => {
      const deps = getAnimationDependenciesFromTree(shimmerButtonTree, 'magic-ui');

      expect(deps.npm).toContain('framer-motion@^11.0.0');
      expect(deps.imports).toContain('motion');
      expect(deps.imports).toContain('AnimatePresence');
    });

    it('should generate package.json dependencies', () => {
      const packageDeps = generatePackageJsonDependencies(shimmerButtonTree, 'magic-ui');

      expect(packageDeps).toHaveProperty('framer-motion');
      expect(packageDeps['framer-motion']).toBe('^11.0.0');
    });

    it('should include framer-motion imports in React code', () => {
      const options: CodeGenerationOptions = {
        target: 'react',
        framework: 'magic-ui',
        componentName: 'ShimmerButtonDemo',
        includeTypes: true,
        useClientDirective: false,
      };

      const code = generateReactCode(shimmerButtonTree, options);

      expect(code).toContain("import { motion, AnimatePresence } from 'framer-motion'");
    });

    it('should include use client directive for animations', () => {
      const options: CodeGenerationOptions = {
        target: 'react',
        framework: 'magic-ui',
        componentName: 'ShimmerButtonDemo',
        includeTypes: true,
        useClientDirective: false,
      };

      const code = generateReactCode(shimmerButtonTree, options);

      expect(code).toContain("'use client'");
    });

    it('should include installation instructions with framer-motion', () => {
      const instructions = getInstallationInstructions('magic-ui', true);

      expect(instructions).toContain('framer-motion');
      expect(instructions).toContain('npm install framer-motion');
    });
  });

  describe('Aceternity UI MovingBorderButton', () => {
    const movingBorderTree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: {},
          children: ['button1'],
        },
        button1: {
          key: 'button1',
          type: 'MovingBorderButton',
          props: { label: 'Hover Me' },
        },
      },
    };

    it('should detect animated components', () => {
      const hasAnimations = hasAnimatedComponents(movingBorderTree, 'aceternity');
      expect(hasAnimations).toBe(true);
    });

    it('should extract all animation dependencies', () => {
      const deps = getAnimationDependenciesFromTree(movingBorderTree, 'aceternity');

      expect(deps.npm).toContain('framer-motion@^11.0.0');
      expect(deps.npm).toContain('clsx');
      expect(deps.npm).toContain('tailwind-merge');
      expect(deps.imports).toContain('motion');
      expect(deps.imports).toContain('AnimatePresence');
    });

    it('should generate package.json with all dependencies', () => {
      const packageDeps = generatePackageJsonDependencies(movingBorderTree, 'aceternity');

      expect(packageDeps).toHaveProperty('framer-motion');
      expect(packageDeps).toHaveProperty('clsx');
      expect(packageDeps).toHaveProperty('tailwind-merge');
    });

    it('should include all imports in generated code', () => {
      const options: CodeGenerationOptions = {
        target: 'react',
        framework: 'aceternity',
        componentName: 'BorderButtonDemo',
        includeTypes: true,
      };

      const code = generateReactCode(movingBorderTree, options);

      expect(code).toContain("import { motion, AnimatePresence } from 'framer-motion'");
      expect(code).toContain("'use client'");
    });
  });

  describe('MCP Namespaced Components', () => {
    const mcpTree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: {},
          children: ['button1'],
        },
        button1: {
          key: 'button1',
          type: 'mcp::ShimmerButton',
          props: { label: 'MCP Button' },
        },
      },
    };

    it('should detect animations from MCP namespaced components', () => {
      const hasAnimations = hasAnimatedComponents(mcpTree, 'magic-ui');
      expect(hasAnimations).toBe(true);
    });

    it('should extract dependencies from MCP components', () => {
      const deps = getAnimationDependenciesFromTree(mcpTree, 'magic-ui');

      expect(deps.npm).toContain('framer-motion@^11.0.0');
      expect(deps.imports).toContain('motion');
    });
  });

  describe('Non-Animated Components', () => {
    const staticTree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: {},
          children: ['button1'],
        },
        button1: {
          key: 'button1',
          type: 'Button',
          props: { label: 'Static Button' },
        },
      },
    };

    it('should not detect animations in static components', () => {
      const hasAnimations = hasAnimatedComponents(staticTree, 'shadcn');
      expect(hasAnimations).toBe(false);
    });

    it('should return empty dependencies for static components', () => {
      const deps = getAnimationDependenciesFromTree(staticTree, 'shadcn');

      expect(deps.npm).toHaveLength(0);
      expect(deps.imports).toHaveLength(0);
    });

    it('should not include framer-motion imports for static components', () => {
      const options: CodeGenerationOptions = {
        target: 'react',
        framework: 'shadcn',
        componentName: 'StaticButton',
        includeTypes: true,
      };

      const code = generateReactCode(staticTree, options);

      expect(code).not.toContain('framer-motion');
    });

    it('should not include animation instructions for static components', () => {
      const instructions = getInstallationInstructions('shadcn', false);

      expect(instructions).not.toContain('Animation Dependencies');
    });
  });

  describe('Next.js Export', () => {
    const animatedTree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: {},
          children: ['card1'],
        },
        card1: {
          key: 'card1',
          type: 'MagicCard',
          props: { title: 'Animated Card' },
        },
      },
    };

    it('should include use client directive in Next.js pages with animations', () => {
      const options: CodeGenerationOptions = {
        target: 'nextjs',
        framework: 'magic-ui',
        componentName: 'Page',
        includeTypes: true,
      };

      const code = generateNextJSCode(animatedTree, options);

      expect(code).toContain("'use client'");
      expect(code).toContain("import { motion } from 'framer-motion'");
    });
  });

  describe('Mixed Components', () => {
    const mixedTree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: {},
          children: ['static1', 'animated1'],
        },
        static1: {
          key: 'static1',
          type: 'Card',
          props: {},
        },
        animated1: {
          key: 'animated1',
          type: 'ShimmerButton',
          props: { label: 'Shimmer' },
        },
      },
    };

    it('should detect animations in mixed component trees', () => {
      const hasAnimations = hasAnimatedComponents(mixedTree, 'magic-ui');
      expect(hasAnimations).toBe(true);
    });

    it('should extract only animation dependencies', () => {
      const deps = getAnimationDependenciesFromTree(mixedTree, 'magic-ui');

      expect(deps.npm).toContain('framer-motion@^11.0.0');
      // Should not include dependencies from static Card component
    });
  });
});
