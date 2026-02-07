import { describe, it, expect } from 'vitest';
import { buildComponentReferenceFromBlocks, buildValidComponentTypes } from '../prompt-builder';
import type { BlockDefinition } from '@/lib/registry/block-registry';

// Test fixtures (don't depend on other task files)
const mockCoreBlock = (name: string, category: string, props: any[] = []): BlockDefinition => ({
  type: `core::${name}`,
  kind: 'interactive',
  tier: 'core',
  source: 'core',
  renderer: null,
  props,
  category: category as any,
  tags: [],
  defaultProps: {},
  description: `${name} component`,
});

const mockExtendedBlock = (name: string, source: string): BlockDefinition => ({
  type: `mcp::${name}`,
  kind: 'interactive',
  tier: 'extended',
  source,
  renderer: null,
  props: [{ name: 'className', type: 'string', required: false }],
  category: 'other',
  tags: ['animated'],
  defaultProps: {},
  description: `${name} animated component`,
});

describe('Prompt Builder', () => {
  it('should generate component reference from core blocks', () => {
    const blocks = [
      mockCoreBlock('Button', 'forms', [{ name: 'label', type: 'string', required: true }]),
      mockCoreBlock('Container', 'layout'),
    ];
    const reference = buildComponentReferenceFromBlocks(blocks);
    expect(reference).toContain('Button');
    expect(reference).toContain('Container');
    expect(reference).toContain('label [REQ]');
  });

  it('should include MCP namespace for extended blocks', () => {
    const blocks = [
      mockCoreBlock('Button', 'forms'),
      mockExtendedBlock('ShimmerButton', 'magic-ui'),
      mockExtendedBlock('MagicCard', 'magic-ui'),
    ];
    const reference = buildComponentReferenceFromBlocks(blocks);
    expect(reference).toContain('mcp::ShimmerButton');
    expect(reference).toContain('mcp::MagicCard');
  });

  it('should group by category', () => {
    const blocks = [
      mockCoreBlock('Container', 'layout'),
      mockCoreBlock('Card', 'cards'),
      mockCoreBlock('Hero', 'marketing'),
    ];
    const reference = buildComponentReferenceFromBlocks(blocks);
    expect(reference).toContain('### Layout');
    expect(reference).toContain('### Card');
    expect(reference).toContain('### Marketing');
  });

  it('should mark required props', () => {
    const blocks = [
      mockCoreBlock('Button', 'forms', [
        { name: 'label', type: 'string', required: true },
        { name: 'variant', type: 'string', required: false },
      ]),
    ];
    const reference = buildComponentReferenceFromBlocks(blocks);
    expect(reference).toContain('label [REQ]');
    expect(reference).not.toContain('variant [REQ]');
  });

  it('should generate valid component types list', () => {
    const blocks = [
      mockCoreBlock('Button', 'forms'),
      mockExtendedBlock('ShimmerButton', 'magic-ui'),
    ];
    const types = buildValidComponentTypes(blocks);
    expect(types).toContain('Button');        // core:: stripped
    expect(types).toContain('mcp::ShimmerButton'); // mcp:: kept
  });
});
