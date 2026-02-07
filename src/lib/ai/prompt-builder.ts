import type { BlockDefinition } from '@/lib/registry/block-registry';

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  layout: 'Layout',
  cards: 'Card',
  typography: 'Typography',
  forms: 'Buttons & Forms',
  inputs: 'Form Inputs',
  'data-display': 'Data Display',
  feedback: 'Feedback',
  navigation: 'Navigation',
  overlay: 'Overlays',
  charts: 'Charts',
  marketing: 'Marketing',
  dashboard: 'Dashboard',
  media: 'Media',
  blocks: 'Blocks',
  'e-commerce': 'E-Commerce',
  authentication: 'Authentication',
  other: 'Other',
};

function formatProps(props: BlockDefinition['props']): string {
  if (props.length === 0) return '';
  return 'Props: ' + props
    .map((p) => `${p.name}${p.required ? ' [REQ]' : ''}`)
    .join(', ');
}

function formatBlockName(block: BlockDefinition): string {
  if (block.tier === 'core') {
    return block.type.replace('core::', '');
  }
  return block.type;
}

export function buildComponentReferenceFromBlocks(blocks: BlockDefinition[]): string {
  const grouped = new Map<string, BlockDefinition[]>();
  for (const block of blocks) {
    const cat = block.category;
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(block);
  }

  const sections: string[] = [];
  sections.push('## Components');
  sections.push('');

  for (const [category, categoryBlocks] of grouped) {
    const displayName = CATEGORY_DISPLAY_NAMES[category] || category;
    sections.push(`### ${displayName}`);

    for (const block of categoryBlocks) {
      const name = formatBlockName(block);
      const propsStr = formatProps(block.props);
      sections.push(`- **${name}**: ${block.description}. ${propsStr}`);
    }

    sections.push('');
  }

  return sections.join('\n');
}

export function buildValidComponentTypes(blocks: BlockDefinition[]): string[] {
  return blocks.map((b) => {
    if (b.tier === 'core') return b.type.replace('core::', '');
    return b.type;
  });
}
