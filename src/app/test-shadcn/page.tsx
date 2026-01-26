'use client';

import { Renderer, ComponentRenderProps, flatToTree } from '@json-render/react';
import { TestWrapper } from './wrapper';
import { shadcnRegistry } from '@/registries/shadcn';

const testRegistry = {
  ...shadcnRegistry,
  div: ({ element, children }: ComponentRenderProps) => <div className={element.props.className as string}>{children}</div>
};

const elements = [
  // Root
  { key: 'root', type: 'div', props: { className: 'p-8 space-y-8 max-w-4xl mx-auto' }, parentKey: null },

  // Title
  { key: 'title', type: 'Text', props: { variant: 'h1', content: 'Shadcn Registry Test' }, parentKey: 'root' },

  // Card 1
  { key: 'card1', type: 'Card', props: { title: 'Complex Component Test', description: 'Testing Card with Inputs and Table' }, parentKey: 'root' },

  // Card 1 Content (Container)
  { key: 'card1-content', type: 'div', props: { className: 'grid gap-4 py-4' }, parentKey: 'card1' },

  // Inputs
  { key: 'input1', type: 'Input', props: { name: 'name', label: 'Full Name', placeholder: 'Enter name' }, parentKey: 'card1-content' },
  { key: 'select1', type: 'Select', props: { name: 'user.role', label: 'Role', placeholder: 'Select role', options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }] }, parentKey: 'card1-content' },
  { key: 'check1', type: 'Checkbox', props: { name: 'agreed', label: 'I agree to terms' }, parentKey: 'card1-content' },

  // Card 2
  { key: 'card2', type: 'Card', props: { title: 'Data Table' }, parentKey: 'root' },
  { key: 'table1', type: 'Table', props: {
      data: [{ id: '1', name: 'Item 1', status: 'Active' }, { id: '2', name: 'Item 2', status: 'Inactive' }],
      columns: [{ header: 'ID', accessorKey: 'id' }, { header: 'Name', accessorKey: 'name' }, { header: 'Status', accessorKey: 'status' }]
    }, parentKey: 'card2' },

  // Card 3
  { key: 'card3', type: 'Card', props: { title: 'Charts' }, parentKey: 'root' },
  { key: 'chart1', type: 'Chart', props: {
      type: 'bar',
      index: 'month',
      categories: ['desktop', 'mobile'],
      data: [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
      ]
    }, parentKey: 'card3' },

  // Alert
  { key: 'alert1', type: 'Alert', props: { title: 'Success', description: 'All components rendered successfully.', variant: 'default', icon: 'check-circle' }, parentKey: 'root' },

  // Stack and Switch
  { key: 'stack-section', type: 'div', props: { className: 'mt-8' }, parentKey: 'root' },
  { key: 'stack-title', type: 'Text', props: { variant: 'h2', content: 'Stack & Switch' }, parentKey: 'stack-section' },
  { key: 'stack1', type: 'Stack', props: { direction: 'row', gap: 4, align: 'center', style: { border: '1px solid #ccc', padding: '1rem', borderRadius: '0.5rem' } }, parentKey: 'stack-section' },
  { key: 'switch1', type: 'Switch', props: { name: 'notifications', label: 'Enable Notifications' }, parentKey: 'stack1' },
  { key: 'switch2', type: 'Switch', props: { name: 'dark_mode', label: 'Dark Mode', checked: true }, parentKey: 'stack1' },

  // Grid
  { key: 'grid-section', type: 'div', props: { className: 'mt-8' }, parentKey: 'root' },
  { key: 'grid-title', type: 'Text', props: { variant: 'h2', content: 'Grid' }, parentKey: 'grid-section' },
  { key: 'grid1', type: 'Grid', props: { columns: 3, gap: 4 }, parentKey: 'grid-section' },
  { key: 'g-item-1', type: 'Card', props: { title: 'Grid Item 1' }, parentKey: 'grid1' },
  { key: 'g-item-2', type: 'Card', props: { title: 'Grid Item 2' }, parentKey: 'grid1' },
  { key: 'g-item-3', type: 'Card', props: { title: 'Grid Item 3' }, parentKey: 'grid1' }
];

const testTree = flatToTree(elements);

export default function Page() {
  return (
    <TestWrapper>
      <Renderer tree={testTree} registry={testRegistry} />
    </TestWrapper>
  );
}
