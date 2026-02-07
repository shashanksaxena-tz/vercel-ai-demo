/**
 * Tests for namespace support in framework-registry
 */

import { describe, it, expect } from 'vitest';
import {
  parseComponentType,
  formatComponentType,
  mergeRegistry,
  getFrameworkRegistryWithMCP,
  type MCPComponentMetadata,
} from '../framework-registry';
import { shadcnRegistry } from '@/components/registries/shadcn/registry';

describe('Namespace Support', () => {
  describe('parseComponentType', () => {
    it('should parse non-namespaced component as core', () => {
      const result = parseComponentType('Button');
      expect(result).toEqual({ namespace: 'core', component: 'Button' });
    });

    it('should parse core:: namespace correctly', () => {
      const result = parseComponentType('core::Button');
      expect(result).toEqual({ namespace: 'core', component: 'Button' });
    });

    it('should parse mcp:: namespace correctly', () => {
      const result = parseComponentType('mcp::ShimmerButton');
      expect(result).toEqual({ namespace: 'mcp', component: 'ShimmerButton' });
    });

    it('should handle invalid format gracefully', () => {
      const result = parseComponentType('invalid::format::Button');
      expect(result.namespace).toBe('core');
    });
  });

  describe('formatComponentType', () => {
    it('should format with core namespace by default', () => {
      const result = formatComponentType('Button');
      expect(result).toBe('core::Button');
    });

    it('should format with specified namespace', () => {
      const result = formatComponentType('ShimmerButton', 'mcp');
      expect(result).toBe('mcp::ShimmerButton');
    });
  });

  describe('mergeRegistry', () => {
    it('should namespace core components', () => {
      const merged = mergeRegistry(shadcnRegistry, []);
      const components = Object.keys(merged.components);

      // Should have both namespaced and non-namespaced versions
      expect(components).toContain('core::Button');
      expect(components).toContain('Button'); // Backward compatibility
    });

    it('should merge MCP components with mcp:: namespace', () => {
      const mcpComponents: MCPComponentMetadata[] = [
        {
          name: 'ShimmerButton',
          description: 'A shimmer button from MCP',
          source: 'mcp-server',
          renderer: () => null,
        },
      ];

      const merged = mergeRegistry(shadcnRegistry, mcpComponents);
      const components = Object.keys(merged.components);

      expect(components).toContain('mcp::ShimmerButton');
      expect(components).not.toContain('ShimmerButton'); // No non-namespaced version
    });

    it('should not allow MCP components to override core components', () => {
      const DummyCoreButton = () => 'Core';
      const DummyMCPButton = () => 'MCP';

      const baseRegistry = {
        ...shadcnRegistry,
        components: {
          Button: DummyCoreButton as any,
        },
      };

      const mcpComponents: MCPComponentMetadata[] = [
        {
          name: 'Button',
          description: 'MCP Button',
          source: 'mcp-server',
          renderer: DummyMCPButton as any,
        },
      ];

      const merged = mergeRegistry(baseRegistry, mcpComponents);

      // Core component should remain unchanged
      expect(merged.components['Button']).toBe(DummyCoreButton);
      expect(merged.components['core::Button']).toBe(DummyCoreButton);

      // MCP component should be available under mcp:: namespace
      expect(merged.components['mcp::Button']).toBe(DummyMCPButton);
    });

    it('should handle empty MCP components array', () => {
      const merged = mergeRegistry(shadcnRegistry, []);
      expect(merged.components).toBeDefined();
      expect(Object.keys(merged.components).length).toBeGreaterThan(0);
    });
  });

  describe('getFrameworkRegistryWithMCP', () => {
    it('should return namespaced core registry when no MCP components provided', () => {
      const registry = getFrameworkRegistryWithMCP('shadcn', []);
      const components = Object.keys(registry.components);

      // Should have namespaced versions
      expect(components.some((c) => c.startsWith('core::'))).toBe(true);
    });

    it('should merge MCP components when provided', () => {
      const mcpComponents: MCPComponentMetadata[] = [
        {
          name: 'AnimatedCard',
          description: 'Animated card from MCP',
          source: 'mcp-server',
          renderer: () => null,
        },
      ];

      const registry = getFrameworkRegistryWithMCP('shadcn', mcpComponents);
      const components = Object.keys(registry.components);

      expect(components).toContain('mcp::AnimatedCard');
      expect(components.some((c) => c.startsWith('core::'))).toBe(true);
    });
  });

  describe('Backward Compatibility', () => {
    it('should support non-namespaced component lookup for core components', () => {
      const merged = mergeRegistry(shadcnRegistry, []);

      // Both should work for core components
      expect(merged.components['Button']).toBeDefined();
      expect(merged.components['core::Button']).toBeDefined();
      expect(merged.components['Button']).toBe(merged.components['core::Button']);
    });

    it('should not create non-namespaced aliases for MCP components', () => {
      const mcpComponents: MCPComponentMetadata[] = [
        {
          name: 'CustomComponent',
          description: 'Custom component from MCP',
          source: 'mcp-server',
          renderer: () => null,
        },
      ];

      const merged = mergeRegistry(shadcnRegistry, mcpComponents);

      expect(merged.components['mcp::CustomComponent']).toBeDefined();
      expect(merged.components['CustomComponent']).toBeUndefined();
    });
  });
});
