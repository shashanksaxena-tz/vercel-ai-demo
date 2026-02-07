import { describe, it, expect } from 'vitest';
import { MAGIC_UI_BLOCK_DEFINITIONS, ACETERNITY_BLOCK_DEFINITIONS } from '../extended-blocks';

describe('Extended Block Definitions', () => {
  it('should define magic-ui blocks with mcp:: namespace', () => {
    expect(MAGIC_UI_BLOCK_DEFINITIONS.length).toBeGreaterThan(10);
    for (const def of MAGIC_UI_BLOCK_DEFINITIONS) {
      expect(def.type).toMatch(/^mcp::/);
      expect(def.tier).toBe('extended');
      expect(def.source).toBe('magic-ui');
    }
  });

  it('should define aceternity blocks with mcp:: namespace', () => {
    expect(ACETERNITY_BLOCK_DEFINITIONS.length).toBeGreaterThan(10);
    for (const def of ACETERNITY_BLOCK_DEFINITIONS) {
      expect(def.type).toMatch(/^mcp::/);
      expect(def.tier).toBe('extended');
      expect(def.source).toBe('aceternity-ui');
    }
  });

  it('should have descriptions and tags', () => {
    for (const def of [...MAGIC_UI_BLOCK_DEFINITIONS, ...ACETERNITY_BLOCK_DEFINITIONS]) {
      expect(def.description.length).toBeGreaterThan(0);
      expect(def.tags).toContain('animated');
    }
  });
});
