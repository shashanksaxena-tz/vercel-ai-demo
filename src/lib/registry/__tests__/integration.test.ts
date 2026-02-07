/**
 * Integration Tests for the Dynamic Block Registry System
 *
 * Tests the complete flow from block definitions → prompt generation → type validation.
 * Verifies that core-blocks, extended-blocks, block-registry, and prompt-builder
 * work together correctly.
 */

import { describe, it, expect } from 'vitest';
import { createBlockRegistry, registerBlock, getBlock, getAllBlockTypes, getBlocksByTier, mergeBlockRegistries } from '../block-registry';
import { CORE_BLOCK_DEFINITIONS } from '../core-blocks';
import { MAGIC_UI_BLOCK_DEFINITIONS, ACETERNITY_BLOCK_DEFINITIONS } from '../extended-blocks';
import { buildComponentReferenceFromBlocks, buildValidComponentTypes } from '../../ai/prompt-builder';

describe('Integration: Block Registry System', () => {
  // Build a full registry from all block definitions
  function buildFullRegistry() {
    let registry = createBlockRegistry();
    for (const block of [
      ...CORE_BLOCK_DEFINITIONS,
      ...MAGIC_UI_BLOCK_DEFINITIONS,
      ...ACETERNITY_BLOCK_DEFINITIONS,
    ]) {
      registry = registerBlock(registry, block);
    }
    return registry;
  }

  describe('Full registry creation', () => {
    it('should register all core + extended blocks', () => {
      const registry = buildFullRegistry();
      const allTypes = getAllBlockTypes(registry);

      const expectedCount =
        CORE_BLOCK_DEFINITIONS.length +
        MAGIC_UI_BLOCK_DEFINITIONS.length +
        ACETERNITY_BLOCK_DEFINITIONS.length;

      expect(allTypes.length).toBe(expectedCount);
    });

    it('should have distinct tiers', () => {
      const registry = buildFullRegistry();

      const core = getBlocksByTier(registry, 'core');
      const extended = getBlocksByTier(registry, 'extended');

      expect(core.length).toBe(CORE_BLOCK_DEFINITIONS.length);
      expect(extended.length).toBe(
        MAGIC_UI_BLOCK_DEFINITIONS.length + ACETERNITY_BLOCK_DEFINITIONS.length
      );
    });

    it('should resolve core blocks with and without namespace', () => {
      const registry = buildFullRegistry();

      // With namespace
      expect(getBlock(registry, 'core::Button')).toBeDefined();
      expect(getBlock(registry, 'core::Container')).toBeDefined();

      // Without namespace (should fall back to core::)
      expect(getBlock(registry, 'Button')).toBeDefined();
      expect(getBlock(registry, 'Container')).toBeDefined();
    });

    it('should resolve extended blocks only with mcp:: prefix', () => {
      const registry = buildFullRegistry();

      expect(getBlock(registry, 'mcp::ShimmerButton')).toBeDefined();
      expect(getBlock(registry, 'mcp::BackgroundBeams')).toBeDefined();

      // Without prefix, should not find extended blocks
      expect(getBlock(registry, 'ShimmerButton')).toBeUndefined();
    });
  });

  describe('Prompt generation from blocks', () => {
    it('should generate component reference from core blocks only', () => {
      const reference = buildComponentReferenceFromBlocks(CORE_BLOCK_DEFINITIONS);

      expect(reference).toContain('## Components');
      expect(reference).toContain('### Layout');
      expect(reference).toContain('**Container**');
      expect(reference).toContain('**Button**');
      expect(reference).toContain('[REQ]');
    });

    it('should generate component reference including extended blocks', () => {
      const allBlocks = [
        ...CORE_BLOCK_DEFINITIONS,
        ...MAGIC_UI_BLOCK_DEFINITIONS,
        ...ACETERNITY_BLOCK_DEFINITIONS,
      ];
      const reference = buildComponentReferenceFromBlocks(allBlocks);

      // Core components present
      expect(reference).toContain('**Container**');
      expect(reference).toContain('**Button**');

      // Extended components present with mcp:: prefix
      expect(reference).toContain('mcp::ShimmerButton');
      expect(reference).toContain('mcp::BackgroundBeams');
    });

    it('should generate valid component types from all blocks', () => {
      const allBlocks = [
        ...CORE_BLOCK_DEFINITIONS,
        ...MAGIC_UI_BLOCK_DEFINITIONS,
        ...ACETERNITY_BLOCK_DEFINITIONS,
      ];
      const types = buildValidComponentTypes(allBlocks);

      // Core types without namespace
      expect(types).toContain('Button');
      expect(types).toContain('Container');
      expect(types).toContain('Grid');

      // Extended types with mcp:: prefix
      expect(types).toContain('mcp::ShimmerButton');
      expect(types).toContain('mcp::BackgroundBeams');
    });

    it('should produce more types than the static 78', () => {
      const allBlocks = [
        ...CORE_BLOCK_DEFINITIONS,
        ...MAGIC_UI_BLOCK_DEFINITIONS,
        ...ACETERNITY_BLOCK_DEFINITIONS,
      ];
      const types = buildValidComponentTypes(allBlocks);

      expect(types.length).toBeGreaterThan(78);
    });
  });

  describe('Registry merging', () => {
    it('should merge separate registries correctly', () => {
      let coreRegistry = createBlockRegistry();
      for (const block of CORE_BLOCK_DEFINITIONS) {
        coreRegistry = registerBlock(coreRegistry, block);
      }

      let extendedRegistry = createBlockRegistry();
      for (const block of [...MAGIC_UI_BLOCK_DEFINITIONS, ...ACETERNITY_BLOCK_DEFINITIONS]) {
        extendedRegistry = registerBlock(extendedRegistry, block);
      }

      const merged = mergeBlockRegistries(coreRegistry, extendedRegistry);
      const allTypes = getAllBlockTypes(merged);

      expect(allTypes.length).toBe(
        CORE_BLOCK_DEFINITIONS.length +
        MAGIC_UI_BLOCK_DEFINITIONS.length +
        ACETERNITY_BLOCK_DEFINITIONS.length
      );
    });
  });
});
