'use client';

import { Renderer, ComponentRenderProps, flatToTree, JSONUIProvider } from '@json-render/react';
import { aceternityRegistry } from '@/registries/aceternity';

const testRegistry = {
  ...aceternityRegistry,
  div: ({ element, children }: ComponentRenderProps) => <div className={element.props.className as string}>{children}</div>
};

const elements = [
  { key: 'root', type: 'div', props: { className: 'p-8 space-y-8 max-w-4xl mx-auto bg-neutral-950 text-white min-h-screen' }, parentKey: null },
  { key: 'title', type: 'Text', props: { variant: 'h1', children: 'Aceternity Registry Test' }, parentKey: 'root' },

  // Grid
  { key: 'grid-bento', type: 'Grid', props: { columns: 3, gap: 4 }, parentKey: 'root' },

  { key: 'card1', type: 'Card', props: { title: 'Glowing Card 1', description: 'Description 1' }, parentKey: 'grid-bento' },
  { key: 'card2', type: 'Card', props: { title: 'Glowing Card 2', description: 'Description 2' }, parentKey: 'grid-bento' },
  { key: 'card3', type: 'Card', props: { title: 'Glowing Card 3', description: 'Description 3' }, parentKey: 'grid-bento' },

  // Buttons
  { key: 'stack-btns', type: 'Stack', props: { direction: 'row', gap: 4 }, parentKey: 'root' },
  { key: 'btn1', type: 'Button', props: { label: 'Aceternity Button' }, parentKey: 'stack-btns' },

  // Alert
  { key: 'alert1', type: 'Alert', props: { title: 'Floating Alert', description: 'This is a floating card alert.' }, parentKey: 'root' },
];

const testTree = flatToTree(elements);

export default function Page() {
  return (
    <JSONUIProvider registry={testRegistry}>
      <Renderer tree={testTree} registry={testRegistry} />
    </JSONUIProvider>
  );
}
