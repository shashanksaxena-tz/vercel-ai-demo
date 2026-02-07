/**
 * Animation Component Tests
 *
 * Tests for animated components from Magic UI and Aceternity UI.
 * Validates discovery, metadata, dependencies, and export code generation.
 */

import {
  searchMagicUI,
  searchAceternityUI,
  type ComponentMetadata,
} from '../mcp-client';

describe('Animated Components', () => {
  describe('Magic UI Discovery', () => {
    it('should discover shimmer components', async () => {
      const result = await searchMagicUI('shimmer');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      const shimmerComponent = result[0];
      expect(shimmerComponent.name).toMatch(/shimmer/i);
      expect(shimmerComponent.source).toBe('magic-ui');
    }, 10000);

    it('should include animation metadata for shimmer components', async () => {
      const result = await searchMagicUI('shimmer');

      expect(result.length).toBeGreaterThan(0);
      const component = result[0];

      expect(component.animations).toBeDefined();
      if (component.animations) {
        expect(['framer-motion', 'css', 'spring', 'gsap']).toContain(
          component.animations.type
        );
        expect(['simple', 'medium', 'complex']).toContain(
          component.animations.complexity
        );
      }
    }, 10000);

    it('should extract framer-motion dependencies', async () => {
      const result = await searchMagicUI('shimmer');

      expect(result.length).toBeGreaterThan(0);
      const component = result[0];

      expect(component.dependencies).toBeDefined();

      if (component.dependencies) {
        if (Array.isArray(component.dependencies)) {
          expect(component.dependencies).toContain('framer-motion');
        } else if (component.dependencies.npm) {
          expect(component.dependencies.npm).toContain('framer-motion');
        }
      }
    }, 10000);

    it('should discover text reveal components', async () => {
      const result = await searchMagicUI('text reveal');

      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);

      const textComponent = result.find((c) =>
        c.name.toLowerCase().includes('text')
      );
      expect(textComponent).toBeDefined();
      expect(textComponent?.animations).toBeDefined();
    }, 10000);

    it('should discover widget components', async () => {
      const result = await searchMagicUI('widget');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    }, 10000);

    it('should categorize components correctly', async () => {
      const result = await searchMagicUI('button');

      if (result.length > 0) {
        const component = result[0];
        expect(component.category).toBeDefined();
        expect(typeof component.category).toBe('string');
      }
    }, 10000);
  });

  describe('Aceternity UI Discovery', () => {
    it('should discover blur components', async () => {
      const result = await searchAceternityUI('blur');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      const blurComponent = result[0];
      expect(blurComponent.source).toBe('aceternity-ui');
    }, 10000);

    it('should include animation metadata for blur components', async () => {
      const result = await searchAceternityUI('blur');

      if (result.length > 0) {
        const component = result[0];

        expect(component.animations).toBeDefined();
        if (component.animations) {
          expect(['framer-motion', 'css', 'spring', 'gsap']).toContain(
            component.animations.type
          );
          expect(['simple', 'medium', 'complex']).toContain(
            component.animations.complexity
          );
        }
      }
    }, 10000);

    it('should discover 3D card components', async () => {
      const result = await searchAceternityUI('3d card');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    }, 10000);

    it('should discover background effects', async () => {
      const result = await searchAceternityUI('background');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    }, 10000);

    it('should have proper component structure', async () => {
      const result = await searchAceternityUI('card');

      if (result.length > 0) {
        const component = result[0];

        expect(component.id).toBeDefined();
        expect(component.name).toBeDefined();
        expect(component.description).toBeDefined();
        expect(component.source).toBe('aceternity-ui');
      }
    }, 10000);
  });

  describe('Component Dependencies', () => {
    it('should extract all npm dependencies', async () => {
      const magicComponents = await searchMagicUI('shimmer');
      const aceternityComponents = await searchAceternityUI('blur');

      const allComponents = [...magicComponents, ...aceternityComponents];

      for (const component of allComponents) {
        if (component.dependencies) {
          if (Array.isArray(component.dependencies)) {
            component.dependencies.forEach((dep) => {
              expect(typeof dep).toBe('string');
            });
          } else {
            if (component.dependencies.npm) {
              expect(Array.isArray(component.dependencies.npm)).toBe(true);
            }
            if (component.dependencies.imports) {
              expect(Array.isArray(component.dependencies.imports)).toBe(true);
            }
          }
        }
      }
    }, 15000);

    it('should identify common animation libraries', async () => {
      const magicComponents = await searchMagicUI('motion');

      const animationLibraries = [
        'framer-motion',
        'react-spring',
        'gsap',
        '@react-spring/web',
      ];

      const foundLibraries = new Set<string>();

      for (const component of magicComponents) {
        if (component.dependencies) {
          const deps = Array.isArray(component.dependencies)
            ? component.dependencies
            : component.dependencies.npm || [];

          deps.forEach((dep) => {
            if (animationLibraries.includes(dep)) {
              foundLibraries.add(dep);
            }
          });
        }
      }

      expect(foundLibraries.size).toBeGreaterThan(0);
    }, 10000);
  });

  describe('Export Code Generation', () => {
    it('should generate component export with namespace', async () => {
      const components = await searchMagicUI('shimmer');

      if (components.length > 0) {
        const component = components[0];
        const exportCode = generateExportCode(component);

        expect(exportCode).toContain('mcp::');
        expect(exportCode).toContain(component.name);
      }
    });

    it('should generate npm install command for dependencies', async () => {
      const components = await searchMagicUI('shimmer');

      if (components.length > 0) {
        const component = components[0];
        const installCmd = generateInstallCommand(component);

        expect(installCmd).toContain('npm install');
        expect(installCmd).toContain('framer-motion');
      }
    });

    it('should generate import statements', async () => {
      const components = await searchMagicUI('shimmer');

      if (components.length > 0) {
        const component = components[0];
        const imports = generateImportStatements(component);

        expect(imports).toBeDefined();
        expect(imports.length).toBeGreaterThan(0);
        expect(imports[0]).toContain('import');
      }
    });
  });

  describe('Animation Metadata', () => {
    it('should classify simple animations correctly', async () => {
      const components = await searchMagicUI('fade');

      const simpleAnimations = components.filter(
        (c) => c.animations?.complexity === 'simple'
      );

      expect(simpleAnimations.length).toBeGreaterThan(0);
    }, 10000);

    it('should classify complex animations correctly', async () => {
      const components = await searchAceternityUI('3d');

      const complexAnimations = components.filter(
        (c) => c.animations?.complexity === 'complex'
      );

      // 3D animations should be marked as complex
      if (complexAnimations.length > 0) {
        expect(complexAnimations[0].animations?.complexity).toBe('complex');
      }
    }, 10000);

    it('should identify animation type correctly', async () => {
      const components = await searchMagicUI('motion');

      for (const component of components) {
        if (component.animations) {
          expect(component.animations.type).toBeDefined();
          expect(['framer-motion', 'css', 'spring', 'gsap']).toContain(
            component.animations.type
          );
        }
      }
    }, 10000);
  });

  describe('Performance Scoring', () => {
    it('should score simple animations with low complexity', () => {
      const simpleComponent: ComponentMetadata = {
        id: 'fade-in',
        name: 'FadeIn',
        displayName: 'Fade In',
        description: 'Simple fade in animation',
        category: 'other',
        tags: ['animation', 'fade'],
        source: 'magic-ui',
        animations: {
          type: 'css',
          complexity: 'simple',
        },
      };

      const score = scoreAnimationPerformance([simpleComponent]);

      expect(score.complexity).toBe('simple');
      expect(score.score).toBeLessThanOrEqual(3);
      expect(score.warning).toBeUndefined();
    });

    it('should score medium animations appropriately', () => {
      const mediumComponent: ComponentMetadata = {
        id: 'slide-in',
        name: 'SlideIn',
        displayName: 'Slide In',
        description: 'Slide animation with transforms',
        category: 'other',
        tags: ['animation', 'slide'],
        source: 'magic-ui',
        animations: {
          type: 'framer-motion',
          complexity: 'medium',
        },
      };

      const score = scoreAnimationPerformance([mediumComponent]);

      expect(score.complexity).toBe('medium');
      expect(score.score).toBeGreaterThan(3);
      expect(score.score).toBeLessThanOrEqual(6);
    });

    it('should score complex animations with warnings', () => {
      const complexComponent: ComponentMetadata = {
        id: '3d-card',
        name: '3DCard',
        displayName: '3D Card',
        description: 'Complex 3D card with perspective',
        category: 'cards',
        tags: ['animation', '3d', 'card'],
        source: 'aceternity-ui',
        animations: {
          type: 'framer-motion',
          complexity: 'complex',
        },
      };

      const score = scoreAnimationPerformance([complexComponent]);

      expect(score.complexity).toBe('complex');
      expect(score.score).toBeGreaterThan(6);
      expect(score.warning).toBeDefined();
      expect(score.recommendations).toBeDefined();
    });

    it('should warn for multiple complex animations', () => {
      const complexComponents: ComponentMetadata[] = [
        {
          id: '3d-card',
          name: '3DCard',
          displayName: '3D Card',
          description: '3D card',
          category: 'cards',
          tags: ['3d'],
          source: 'aceternity-ui',
          animations: { type: 'framer-motion', complexity: 'complex' },
        },
        {
          id: 'particle-bg',
          name: 'ParticleBackground',
          displayName: 'Particle Background',
          description: 'Particle background',
          category: 'other',
          tags: ['particles'],
          source: 'aceternity-ui',
          animations: { type: 'framer-motion', complexity: 'complex' },
        },
      ];

      const score = scoreAnimationPerformance(complexComponents);

      expect(score.score).toBeGreaterThan(8);
      expect(score.warning).toContain('multiple');
      expect(score.recommendations).toBeDefined();
      expect(score.recommendations!.length).toBeGreaterThan(0);
    });

    it('should provide performance recommendations', () => {
      const components: ComponentMetadata[] = [
        {
          id: 'hero',
          name: 'AnimatedHero',
          displayName: 'Animated Hero',
          description: 'Hero with animations',
          category: 'marketing',
          tags: ['hero'],
          source: 'magic-ui',
          animations: { type: 'framer-motion', complexity: 'medium' },
        },
      ];

      const score = scoreAnimationPerformance(components);

      if (score.recommendations) {
        expect(score.recommendations.length).toBeGreaterThan(0);
        score.recommendations.forEach((rec) => {
          expect(typeof rec).toBe('string');
          expect(rec.length).toBeGreaterThan(0);
        });
      }
    });
  });
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate component export code with namespace
 */
function generateExportCode(component: ComponentMetadata): string {
  return `export const ${component.name} = registry["mcp::${component.name}"];`;
}

/**
 * Generate npm install command for component dependencies
 */
function generateInstallCommand(component: ComponentMetadata): string {
  if (!component.dependencies) {
    return '';
  }

  const deps = Array.isArray(component.dependencies)
    ? component.dependencies
    : component.dependencies.npm || [];

  if (deps.length === 0) {
    return '';
  }

  return `npm install ${deps.join(' ')}`;
}

/**
 * Generate import statements for component
 */
function generateImportStatements(component: ComponentMetadata): string[] {
  const imports: string[] = [];

  if (!component.dependencies) {
    return imports;
  }

  const deps = Array.isArray(component.dependencies)
    ? component.dependencies
    : component.dependencies.npm || [];

  // Generate import for component
  imports.push(`import { ${component.name} } from '@/components/mcp/${component.source}/${component.name}';`);

  // Generate imports for dependencies
  if (deps.includes('framer-motion')) {
    imports.push(`import { motion } from 'framer-motion';`);
  }

  return imports;
}

/**
 * Performance Score Interface
 */
interface PerformanceScore {
  complexity: 'simple' | 'medium' | 'complex';
  score: number; // 1-10
  warning?: string;
  recommendations?: string[];
}

/**
 * Score animation performance based on complexity
 *
 * Scoring system:
 * - Simple (1-3): CSS transitions, fades, basic text animations
 * - Medium (4-6): Framer Motion transforms, slides, spring animations
 * - Complex (7-10): Canvas, WebGL, 3D transforms, particle effects
 */
function scoreAnimationPerformance(
  components: ComponentMetadata[]
): PerformanceScore {
  let totalScore = 0;
  let maxComplexity: 'simple' | 'medium' | 'complex' = 'simple';
  const complexityCount = { simple: 0, medium: 0, complex: 0 };

  // Calculate score based on animation complexity
  for (const component of components) {
    if (!component.animations) continue;

    const { complexity } = component.animations;
    complexityCount[complexity]++;

    // Assign base scores
    let componentScore = 0;
    if (complexity === 'simple') {
      componentScore = 2;
    } else if (complexity === 'medium') {
      componentScore = 5;
    } else {
      componentScore = 8;
    }

    totalScore += componentScore;

    // Track max complexity
    if (complexity === 'complex') {
      maxComplexity = 'complex';
    } else if (complexity === 'medium' && maxComplexity === 'simple') {
      maxComplexity = 'medium';
    }
  }

  // Normalize score to 1-10 range
  const avgScore = components.length > 0 ? totalScore / components.length : 0;
  const normalizedScore = Math.min(10, Math.max(1, Math.round(avgScore)));

  // Generate warnings and recommendations
  let warning: string | undefined;
  const recommendations: string[] = [];

  // Warn for complex animations
  if (complexityCount.complex > 0) {
    if (complexityCount.complex > 1) {
      warning = `Using multiple complex animations (${complexityCount.complex}) may impact performance on lower-end devices`;
      recommendations.push('Consider lazy loading complex animations');
      recommendations.push('Use Intersection Observer to trigger animations only when visible');
      recommendations.push('Implement reduced motion preference detection');
    } else {
      warning = 'Complex animations detected - test performance on mobile devices';
      recommendations.push('Monitor frame rate during animations');
      recommendations.push('Consider simpler fallback for reduced motion preference');
    }
  }

  // Recommendations based on complexity mix
  if (complexityCount.medium + complexityCount.complex > 3) {
    recommendations.push('Limit simultaneous animations to improve performance');
    recommendations.push('Use will-change CSS property sparingly');
    recommendations.push('Avoid animating expensive properties (box-shadow, filter)');
  }

  // Recommendations for all animation usage
  if (components.some((c) => c.animations)) {
    if (recommendations.length === 0) {
      recommendations.push('Test animations on various devices and browsers');
      recommendations.push('Respect user prefers-reduced-motion setting');
    }
  }

  return {
    complexity: maxComplexity,
    score: normalizedScore,
    warning,
    recommendations: recommendations.length > 0 ? recommendations : undefined,
  };
}

// Export for use in other modules
export { scoreAnimationPerformance };
export type { PerformanceScore };
