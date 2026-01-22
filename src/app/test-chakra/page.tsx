'use client';

import { Renderer, flatToTree } from '@json-render/react';
import { chakraRegistry } from '@/registries/chakra';
import Wrapper from './wrapper';

const elements = [
  { key: 'root', type: 'Container', props: { maxWidth: 'container.md', style: { padding: '20px' } }, parentKey: null },
  { key: 'stack1', type: 'Stack', props: { gap: 6 }, parentKey: 'root' },
  { key: 'card1', type: 'Card', props: { title: 'Chakra UI Test', description: 'This is a test of the Chakra UI registry.' }, parentKey: 'stack1' },
  { key: 'stack2', type: 'Stack', props: { gap: 4 }, parentKey: 'card1' },
  { key: 'btn1', type: 'Button', props: { label: 'Primary Button', variant: 'primary' }, parentKey: 'stack2' },
  { key: 'stack3', type: 'Stack', props: { direction: 'row', gap: 2 }, parentKey: 'stack2' },
  { key: 'badge1', type: 'Badge', props: { children: 'New', variant: 'success' }, parentKey: 'stack3' },
  { key: 'badge2', type: 'Badge', props: { children: 'Admin', variant: 'default' }, parentKey: 'stack3' },
  { key: 'alert1', type: 'Alert', props: { title: 'Success!', description: 'Chakra UI registry is working.', variant: 'default' }, parentKey: 'stack2' },
  { key: 'grid1', type: 'Grid', props: { columns: 2, gap: 4 }, parentKey: 'stack1' },
  { key: 'metric1', type: 'Metric', props: { label: 'Revenue', value: '$12,345', trend: 12, trendDirection: 'up' }, parentKey: 'grid1' },
  { key: 'metric2', type: 'Metric', props: { label: 'Users', value: '1,234', trend: -5, trendDirection: 'down' }, parentKey: 'grid1' }
];

const tree = flatToTree(elements);

export default function TestChakraPage() {
  return (
    <Wrapper>
      <Renderer tree={tree} registry={chakraRegistry} />
    </Wrapper>
  );
}
