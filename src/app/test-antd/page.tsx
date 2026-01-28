'use client';

import { Renderer, ComponentRenderProps, flatToTree, JSONUIProvider } from '@json-render/react';
import { antdRegistry } from '@/registries/antd';

const testRegistry = {
  ...antdRegistry,
  div: ({ element, children }: ComponentRenderProps) => <div className={element.props.className as string}>{children}</div>
};

const elements = [
  { key: 'root', type: 'div', props: { className: 'p-8 space-y-8 max-w-4xl mx-auto' }, parentKey: null },
  { key: 'title', type: 'Text', props: { variant: 'h1', children: 'Ant Design Registry Test' }, parentKey: 'root' },

  // Buttons
  { key: 'card-buttons', type: 'Card', props: { title: 'Buttons' }, parentKey: 'root' },
  { key: 'stack-buttons', type: 'Stack', props: { direction: 'row', gap: 2 }, parentKey: 'card-buttons' },
  { key: 'btn1', type: 'Button', props: { label: 'Primary', variant: 'default' }, parentKey: 'stack-buttons' },
  { key: 'btn2', type: 'Button', props: { label: 'Danger', variant: 'destructive' }, parentKey: 'stack-buttons' },
  { key: 'btn3', type: 'Button', props: { label: 'Outline', variant: 'outline' }, parentKey: 'stack-buttons' },

  // Inputs
  { key: 'card-inputs', type: 'Card', props: { title: 'Inputs' }, parentKey: 'root' },
  { key: 'stack-inputs', type: 'Stack', props: { gap: 4 }, parentKey: 'card-inputs' },
  { key: 'input1', type: 'Input', props: { name: 'name', label: 'Name', placeholder: 'Enter name' }, parentKey: 'stack-inputs' },
  { key: 'select1', type: 'Select', props: { name: 'role', label: 'Role', options: [{label: 'Admin', value: 'admin'}, {label: 'User', value: 'user'}] }, parentKey: 'stack-inputs' },
  { key: 'check1', type: 'Checkbox', props: { name: 'agreed', label: 'I agree' }, parentKey: 'stack-inputs' },

  // Alert
  { key: 'alert1', type: 'Alert', props: { title: 'Info', description: 'This is an Ant Design alert.', variant: 'default' }, parentKey: 'root' },

  // Table
  { key: 'card-table', type: 'Card', props: { title: 'Table' }, parentKey: 'root' },
  { key: 'table1', type: 'Table', props: {
      data: [{ id: '1', name: 'Alice', role: 'Admin' }, { id: '2', name: 'Bob', role: 'User' }],
      columns: [{ header: 'ID', accessorKey: 'id' }, { header: 'Name', accessorKey: 'name' }, { header: 'Role', accessorKey: 'role' }]
  }, parentKey: 'card-table' }
];

const testTree = flatToTree(elements);

export default function Page() {
  return (
    <JSONUIProvider registry={testRegistry}>
      <Renderer tree={testTree} registry={testRegistry} />
    </JSONUIProvider>
  );
}
