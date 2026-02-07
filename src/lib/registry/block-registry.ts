import type { ComponentCategory } from '@/lib/mcp/types';

export type BlockKind = 'layout' | 'content' | 'interactive' | 'media' | 'navigation' | 'data';
export type BlockTier = 'core' | 'extended' | 'unresolved';

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: unknown;
  description?: string;
  options?: unknown[];
}

export interface BlockDefinition {
  type: string;
  kind: BlockKind;
  tier: BlockTier;
  source: string;
  renderer: React.ComponentType<any> | null;
  skeleton?: React.ComponentType<any>;
  props: PropDefinition[];
  defaultProps: Record<string, unknown>;
  category: ComponentCategory;
  tags: string[];
  description: string;
}

export interface BlockRegistry {
  blocks: Map<string, BlockDefinition>;
}

export function createBlockRegistry(): BlockRegistry {
  return { blocks: new Map() };
}

export function registerBlock(registry: BlockRegistry, block: BlockDefinition): BlockRegistry {
  const newBlocks = new Map(registry.blocks);
  newBlocks.set(block.type, block);
  return { blocks: newBlocks };
}

export function getBlock(registry: BlockRegistry, type: string): BlockDefinition | undefined {
  const direct = registry.blocks.get(type);
  if (direct) return direct;
  if (!type.includes('::')) {
    return registry.blocks.get(`core::${type}`);
  }
  return undefined;
}

export function getBlocksByTier(registry: BlockRegistry, tier: BlockTier): BlockDefinition[] {
  return Array.from(registry.blocks.values()).filter((b) => b.tier === tier);
}

export function getBlocksByCategory(registry: BlockRegistry, category: ComponentCategory): BlockDefinition[] {
  return Array.from(registry.blocks.values()).filter((b) => b.category === category);
}

export function getAllBlockTypes(registry: BlockRegistry): string[] {
  return Array.from(registry.blocks.keys());
}

export function getBlocksWithRenderers(registry: BlockRegistry): BlockDefinition[] {
  return Array.from(registry.blocks.values()).filter((b) => b.renderer !== null);
}

export function mergeBlockRegistries(...registries: BlockRegistry[]): BlockRegistry {
  const allBlocks = new Map<string, BlockDefinition>();
  for (const reg of registries) {
    for (const [key, block] of reg.blocks) {
      allBlocks.set(key, block);
    }
  }
  return { blocks: allBlocks };
}
