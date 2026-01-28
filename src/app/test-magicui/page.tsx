'use client';

import { Renderer, ComponentRenderProps, flatToTree, JSONUIProvider } from '@json-render/react';
import { magicuiRegistry } from '@/registries/magicui';

const testRegistry = {
  ...magicuiRegistry,
  div: ({ element, children }: ComponentRenderProps) => <div className={element.props.className as string}>{children}</div>
};

const elements = [
  { key: 'root', type: 'div', props: { className: 'p-8 space-y-8 max-w-4xl mx-auto bg-black text-white min-h-screen' }, parentKey: null },
  { key: 'title', type: 'Text', props: { variant: 'h1', children: 'Magic UI Registry Test' }, parentKey: 'root' },

  // Magic Components
  { key: 'card-magic', type: 'Card', props: { title: 'Magic Components', description: 'Animated components' }, parentKey: 'root' },
  { key: 'stack-magic', type: 'Stack', props: { gap: 4 }, parentKey: 'card-magic' },

  { key: 'btn1', type: 'Button', props: { label: 'Shimmer Button' }, parentKey: 'stack-magic' },

  { key: 'alert1', type: 'Alert', props: { title: 'Shine Border', description: 'This alert has a shine border.' }, parentKey: 'stack-magic' },
];

const testTree = flatToTree(elements);

export default function Page() {
  return (
    <JSONUIProvider registry={testRegistry}>
      <Renderer tree={testTree} registry={testRegistry} />
    </JSONUIProvider>
  );
}
