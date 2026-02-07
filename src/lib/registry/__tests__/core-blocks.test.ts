import { describe, it, expect } from 'vitest';
import { CORE_BLOCK_DEFINITIONS } from '../core-blocks';
import { createBlockRegistry, registerBlock, getAllBlockTypes, getBlock } from '../block-registry';
import type { BlockDefinition } from '../block-registry';

describe('Core Block Definitions', () => {
  it('should define all 78 core component types', () => {
    expect(CORE_BLOCK_DEFINITIONS.length).toBeGreaterThanOrEqual(78);
  });

  it('should have no duplicate types', () => {
    const types = CORE_BLOCK_DEFINITIONS.map((d) => d.type);
    const uniqueTypes = new Set(types);
    expect(uniqueTypes.size).toBe(types.length);
  });

  it('should all have core:: namespace', () => {
    for (const def of CORE_BLOCK_DEFINITIONS) {
      expect(def.type).toMatch(/^core::/);
    }
  });

  it('should all have tier=core and source=core', () => {
    for (const def of CORE_BLOCK_DEFINITIONS) {
      expect(def.tier).toBe('core');
      expect(def.source).toBe('core');
    }
  });

  it('should all have renderer=null (renderers are framework-specific)', () => {
    for (const def of CORE_BLOCK_DEFINITIONS) {
      expect(def.renderer).toBeNull();
    }
  });

  it('should cover all expected categories', () => {
    const categories = new Set(CORE_BLOCK_DEFINITIONS.map((d) => d.category));
    // Should have at least: layout, cards, typography, forms, inputs, data-display,
    // feedback, navigation, overlay, charts, marketing, dashboard, media
    expect(categories.size).toBeGreaterThan(5);
    expect(categories.has('layout')).toBe(true);
    expect(categories.has('cards')).toBe(true);
    expect(categories.has('typography')).toBe(true);
    expect(categories.has('navigation')).toBe(true);
    expect(categories.has('marketing')).toBe(true);
  });

  it('should have descriptions for all blocks', () => {
    for (const def of CORE_BLOCK_DEFINITIONS) {
      expect(def.description.length).toBeGreaterThan(0);
    }
  });

  it('should have tags for all blocks', () => {
    for (const def of CORE_BLOCK_DEFINITIONS) {
      expect(def.tags.length).toBeGreaterThan(0);
    }
  });

  it('should have props defined for key components', () => {
    const button = CORE_BLOCK_DEFINITIONS.find((d) => d.type === 'core::Button');
    expect(button).toBeDefined();
    expect(button!.props.length).toBeGreaterThan(0);
    expect(button!.props.some((p) => p.name === 'label' && p.required)).toBe(true);
  });

  it('should have required props for Heading', () => {
    const heading = CORE_BLOCK_DEFINITIONS.find((d) => d.type === 'core::Heading');
    expect(heading).toBeDefined();
    expect(heading!.props.some((p) => p.name === 'level' && p.required)).toBe(true);
    expect(heading!.props.some((p) => p.name === 'text' && p.required)).toBe(true);
  });

  it('should have required props for Grid', () => {
    const grid = CORE_BLOCK_DEFINITIONS.find((d) => d.type === 'core::Grid');
    expect(grid).toBeDefined();
    expect(grid!.props.some((p) => p.name === 'cols' && p.required)).toBe(true);
    expect(grid!.props.some((p) => p.name === 'gap' && p.required)).toBe(true);
  });

  it('should have required props for Image', () => {
    const image = CORE_BLOCK_DEFINITIONS.find((d) => d.type === 'core::Image');
    expect(image).toBeDefined();
    expect(image!.props.some((p) => p.name === 'src' && p.required)).toBe(true);
    expect(image!.props.some((p) => p.name === 'alt' && p.required)).toBe(true);
  });

  it('should include all layout components (7)', () => {
    const layoutNames = ['Container', 'Row', 'Column', 'Grid', 'Stack', 'Spacer', 'Divider'];
    for (const name of layoutNames) {
      const block = CORE_BLOCK_DEFINITIONS.find((d) => d.type === `core::${name}`);
      expect(block, `Missing layout component: ${name}`).toBeDefined();
    }
  });

  it('should include all card components (4)', () => {
    const cardNames = ['Card', 'CardHeader', 'CardBody', 'CardFooter'];
    for (const name of cardNames) {
      const block = CORE_BLOCK_DEFINITIONS.find((d) => d.type === `core::${name}`);
      expect(block, `Missing card component: ${name}`).toBeDefined();
    }
  });

  it('should include all marketing components (8)', () => {
    const marketingNames = [
      'Hero',
      'FeatureCard',
      'PricingCard',
      'TestimonialCard',
      'CTA',
      'Footer',
      'FAQ',
      'Newsletter',
    ];
    for (const name of marketingNames) {
      const block = CORE_BLOCK_DEFINITIONS.find((d) => d.type === `core::${name}`);
      expect(block, `Missing marketing component: ${name}`).toBeDefined();
    }
  });

  it('should register all definitions into a BlockRegistry', () => {
    let registry = createBlockRegistry();
    for (const block of CORE_BLOCK_DEFINITIONS) {
      registry = registerBlock(registry, block);
    }

    const types = getAllBlockTypes(registry);
    expect(types.length).toBeGreaterThanOrEqual(78);

    // Core blocks should resolve without namespace
    expect(getBlock(registry, 'Button')).toBeDefined();
    expect(getBlock(registry, 'core::Button')).toBeDefined();
    expect(getBlock(registry, 'Container')).toBeDefined();
    expect(getBlock(registry, 'core::Container')).toBeDefined();
  });

  it('should have valid BlockKind values', () => {
    const validKinds = new Set(['layout', 'content', 'interactive', 'media', 'navigation', 'data']);
    for (const def of CORE_BLOCK_DEFINITIONS) {
      expect(validKinds.has(def.kind), `Invalid kind "${def.kind}" for ${def.type}`).toBe(true);
    }
  });
});
