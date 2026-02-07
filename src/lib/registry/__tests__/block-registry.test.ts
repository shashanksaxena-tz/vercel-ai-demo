import { describe, it, expect, beforeEach } from 'vitest';
import {
  BlockRegistry,
  createBlockRegistry,
  registerBlock,
  getBlock,
  getBlocksByTier,
  getBlocksByCategory,
  getAllBlockTypes,
} from '../block-registry';

describe('BlockRegistry', () => {
  let registry: BlockRegistry;

  beforeEach(() => {
    registry = createBlockRegistry();
  });

  it('should create an empty registry', () => {
    expect(getAllBlockTypes(registry)).toHaveLength(0);
  });

  it('should register and retrieve a core block', () => {
    const mockRenderer = () => null;
    registry = registerBlock(registry, {
      type: 'core::Button',
      kind: 'interactive',
      tier: 'core',
      source: 'core',
      renderer: mockRenderer,
      props: [{ name: 'label', type: 'string', required: true }],
      defaultProps: {},
      category: 'forms',
      tags: ['button', 'interactive'],
      description: 'A button component',
    });

    const block = getBlock(registry, 'core::Button');
    expect(block).toBeDefined();
    expect(block!.kind).toBe('interactive');
    expect(block!.tier).toBe('core');
  });

  it('should resolve non-namespaced types to core', () => {
    const mockRenderer = () => null;
    registry = registerBlock(registry, {
      type: 'core::Button',
      kind: 'interactive',
      tier: 'core',
      source: 'core',
      renderer: mockRenderer,
      props: [],
      defaultProps: {},
      category: 'forms',
      tags: [],
      description: 'A button',
    });

    const block = getBlock(registry, 'Button');
    expect(block).toBeDefined();
    expect(block!.type).toBe('core::Button');
  });

  it('should filter blocks by tier', () => {
    const mockRenderer = () => null;
    registry = registerBlock(registry, {
      type: 'core::Button',
      kind: 'interactive',
      tier: 'core',
      source: 'core',
      renderer: mockRenderer,
      props: [],
      defaultProps: {},
      category: 'forms',
      tags: [],
      description: 'A button',
    });
    registry = registerBlock(registry, {
      type: 'mcp::ShimmerButton',
      kind: 'interactive',
      tier: 'extended',
      source: 'magic-ui',
      renderer: mockRenderer,
      props: [],
      defaultProps: {},
      category: 'forms',
      tags: ['animated'],
      description: 'Shimmer button',
    });

    expect(getBlocksByTier(registry, 'core')).toHaveLength(1);
    expect(getBlocksByTier(registry, 'extended')).toHaveLength(1);
  });

  it('should filter blocks by category', () => {
    const mockRenderer = () => null;
    registry = registerBlock(registry, {
      type: 'core::Card',
      kind: 'content',
      tier: 'core',
      source: 'core',
      renderer: mockRenderer,
      props: [],
      defaultProps: {},
      category: 'cards',
      tags: [],
      description: 'A card',
    });

    expect(getBlocksByCategory(registry, 'cards')).toHaveLength(1);
    expect(getBlocksByCategory(registry, 'forms')).toHaveLength(0);
  });

  it('should return all block type strings', () => {
    const mockRenderer = () => null;
    registry = registerBlock(registry, {
      type: 'core::Button',
      kind: 'interactive',
      tier: 'core',
      source: 'core',
      renderer: mockRenderer,
      props: [],
      defaultProps: {},
      category: 'forms',
      tags: [],
      description: 'A button',
    });

    const types = getAllBlockTypes(registry);
    expect(types).toContain('core::Button');
  });
});
