'use client';

import { Renderer, ComponentRenderProps, flatToTree } from '@json-render/react';
import { TestWrapper } from './wrapper';
import { muiRegistry } from '@/registries/mui';

const testRegistry = {
  ...muiRegistry,
  div: ({ element, children }: ComponentRenderProps) => <div style={element.props.style as React.CSSProperties} className={element.props.className as string}>{children}</div>
};

const elements: Array<{ key: string; type: string; props: Record<string, unknown>; parentKey: string | null }> = [
  // Root
  { key: 'root', type: 'Container', props: { maxWidth: 'lg', style: { padding: '32px' } }, parentKey: null },

  // Stack for layout
  { key: 'stack1', type: 'Stack', props: { gap: 4 }, parentKey: 'root' },

  // Title
  { key: 'title', type: 'Text', props: { variant: 'h2', content: 'MUI Registry Test' }, parentKey: 'stack1' },

  // Metrics Grid
  { key: 'metrics-grid', type: 'Grid', props: { columns: 3, gap: 2 }, parentKey: 'stack1' },
  { key: 'metric1', type: 'Metric', props: { label: 'Total Revenue', value: '$45,231.89', trend: 20.1, trendDirection: 'up' }, parentKey: 'metrics-grid' },
  { key: 'metric2', type: 'Metric', props: { label: 'Subscriptions', value: '+2350', trend: 180.1, trendDirection: 'up' }, parentKey: 'metrics-grid' },
  { key: 'metric3', type: 'Metric', props: { label: 'Bounce Rate', value: '12.2%', trend: 4.1, trendDirection: 'down' }, parentKey: 'metrics-grid' },

  // Card 1
  { key: 'card1', type: 'Card', props: { title: 'Form Components', description: 'Testing Inputs and Selects' }, parentKey: 'stack1' },
  { key: 'card1-content', type: 'Stack', props: { gap: 2 }, parentKey: 'card1' },
  { key: 'input1', type: 'Input', props: { name: 'name', label: 'Full Name', placeholder: 'Enter name' }, parentKey: 'card1-content' },
  { key: 'select1', type: 'Select', props: { name: 'user.role', label: 'Role', placeholder: 'Select role', options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }] }, parentKey: 'card1-content' },
  { key: 'switch1', type: 'Switch', props: { name: 'notifications', label: 'Enable Notifications' }, parentKey: 'card1-content' },
  { key: 'btn1', type: 'Button', props: { label: 'Submit', variant: 'default' }, parentKey: 'card1-content' },

  // Card 2
  { key: 'card2', type: 'Card', props: { title: 'Data Table' }, parentKey: 'stack1' },
  { key: 'table1', type: 'Table', props: {
      data: [{ id: '1', name: 'Item 1', status: 'Active' }, { id: '2', name: 'Item 2', status: 'Inactive' }],
      columns: [{ header: 'ID', accessorKey: 'id' }, { header: 'Name', accessorKey: 'name' }, { header: 'Status', accessorKey: 'status' }]
    }, parentKey: 'card2' },

   // Tabs
   { key: 'tabs1', type: 'Tabs', props: {
       items: [
           { label: 'Tab 1', value: '1', content: 'Content for Tab 1' },
           { label: 'Tab 2', value: '2', content: 'Content for Tab 2' }
       ]
   }, parentKey: 'stack1' },

  // Alert
  { key: 'alert1', type: 'Alert', props: { title: 'Success', description: 'MUI components rendered successfully.', variant: 'default', icon: 'check-circle' }, parentKey: 'stack1' }
];

const testTree = flatToTree(elements);

export default function Page() {
  return (
    <TestWrapper>
      <Renderer tree={testTree} registry={testRegistry} />
    </TestWrapper>
  );
}
