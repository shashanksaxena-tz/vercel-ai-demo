'use client';

import React from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { chakraRegistry } from '@/registries/chakra';

// Wrapper to provide Chakra context
function ChakraWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider value={defaultSystem}>
            {children}
        </ChakraProvider>
    );
}

// Helper to create element with key
const el = (type: string, props: Record<string, any>, key: string) => ({
    type,
    key,
    props,
});

// Test data
const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const chartData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 2000, revenue: 9800 },
    { month: 'Apr', sales: 2780, revenue: 3908 },
    { month: 'May', sales: 1890, revenue: 4800 },
];

export default function TestChakraPage() {
    const mockOnAction = (action: { name: string }) => {
        console.log('Action triggered:', action.name);
        alert(`Action: ${action.name}`);
    };

    return (
        <ChakraWrapper>
            <div className="p-8 space-y-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Chakra UI Registry Test</h1>

                {/* Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Buttons</h2>
                    <div className="flex gap-4 flex-wrap">
                        <chakraRegistry.Button element={el('Button', { variant: 'default', children: 'Primary' }, 'btn-1')} onAction={mockOnAction} />
                        <chakraRegistry.Button element={el('Button', { variant: 'secondary', children: 'Secondary' }, 'btn-2')} onAction={mockOnAction} />
                        <chakraRegistry.Button element={el('Button', { variant: 'destructive', children: 'Destructive' }, 'btn-3')} onAction={mockOnAction} />
                        <chakraRegistry.Button element={el('Button', { variant: 'outline', children: 'Outline' }, 'btn-4')} onAction={mockOnAction} />
                        <chakraRegistry.Button element={el('Button', { variant: 'ghost', children: 'Ghost' }, 'btn-5')} onAction={mockOnAction} />
                    </div>
                </section>

                {/* Text */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Text Variants</h2>
                    <chakraRegistry.Text element={el('Text', { variant: 'h1', children: 'Heading 1' }, 'text-h1')} />
                    <chakraRegistry.Text element={el('Text', { variant: 'h2', children: 'Heading 2' }, 'text-h2')} />
                    <chakraRegistry.Text element={el('Text', { variant: 'h3', children: 'Heading 3' }, 'text-h3')} />
                    <chakraRegistry.Text element={el('Text', { variant: 'p', children: 'This is a paragraph.' }, 'text-p')} />
                </section>

                {/* Badges */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Badges</h2>
                    <div className="flex gap-4 flex-wrap">
                        <chakraRegistry.Badge element={el('Badge', { variant: 'default', children: 'Default' }, 'badge-1')} />
                        <chakraRegistry.Badge element={el('Badge', { variant: 'secondary', children: 'Secondary' }, 'badge-2')} />
                        <chakraRegistry.Badge element={el('Badge', { variant: 'destructive', children: 'Destructive' }, 'badge-3')} />
                    </div>
                </section>

                {/* Avatar & Icon */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Avatar & Icon</h2>
                    <div className="flex gap-4 items-center">
                        <chakraRegistry.Avatar element={el('Avatar', { fallback: 'JD', alt: 'John Doe' }, 'avatar-1')} />
                        <chakraRegistry.Icon element={el('Icon', { name: 'User', size: 24 }, 'icon-1')} />
                        <chakraRegistry.Icon element={el('Icon', { name: 'Settings', size: 24 }, 'icon-2')} />
                    </div>
                </section>

                {/* Card */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Card</h2>
                    <chakraRegistry.Card element={el('Card', { title: 'Sample Card', description: 'Card description' }, 'card-1')}>
                        <p>Card content here</p>
                    </chakraRegistry.Card>
                </section>

                {/* Alert */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Alerts</h2>
                    <chakraRegistry.Alert element={el('Alert', { variant: 'default', title: 'Info', description: 'This is an info alert.' }, 'alert-1')} />
                    <chakraRegistry.Alert element={el('Alert', { variant: 'success', title: 'Success', description: 'Completed!' }, 'alert-2')} />
                    <chakraRegistry.Alert element={el('Alert', { variant: 'destructive', title: 'Error', description: 'Something went wrong.' }, 'alert-3')} />
                </section>

                {/* Metric */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Metrics</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <chakraRegistry.Metric element={el('Metric', { label: 'Revenue', value: '$45,231', trend: 20.1, trendDirection: 'up' }, 'metric-1')} />
                        <chakraRegistry.Metric element={el('Metric', { label: 'Users', value: '2,350', trend: 5.4, trendDirection: 'up' }, 'metric-2')} />
                        <chakraRegistry.Metric element={el('Metric', { label: 'Bounce', value: '32.4%', trend: -2.1, trendDirection: 'down' }, 'metric-3')} />
                    </div>
                </section>

                {/* Forms */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Form Components</h2>
                    <div className="grid grid-cols-2 gap-4 max-w-2xl">
                        <chakraRegistry.Input element={el('Input', { label: 'Email', name: 'email', placeholder: 'Enter email' }, 'input-1')} />
                        <chakraRegistry.Select element={el('Select', { label: 'Country', name: 'country', options: [{ label: 'US', value: 'us' }, { label: 'UK', value: 'uk' }] }, 'select-1')} />
                        <chakraRegistry.Checkbox element={el('Checkbox', { label: 'Accept terms', name: 'terms' }, 'checkbox-1')} />
                        <chakraRegistry.Switch element={el('Switch', { label: 'Notifications', name: 'notif' }, 'switch-1')} />
                    </div>
                </section>

                {/* Table */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Table</h2>
                    <chakraRegistry.Table element={el('Table', {
                        columns: [{ header: 'Name', accessorKey: 'name' }, { header: 'Email', accessorKey: 'email' }, { header: 'Role', accessorKey: 'role' }],
                        data: tableData,
                    }, 'table-1')} />
                </section>

                {/* Chart */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Charts</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <chakraRegistry.Chart element={el('Chart', { type: 'bar', data: chartData, categories: ['sales', 'revenue'], index: 'month' }, 'chart-1')} />
                        <chakraRegistry.Chart element={el('Chart', { type: 'line', data: chartData, categories: ['sales', 'revenue'], index: 'month' }, 'chart-2')} />
                    </div>
                </section>

                {/* Tabs */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Tabs</h2>
                    <chakraRegistry.Tabs element={el('Tabs', {
                        items: [
                            { label: 'Overview', value: 'overview', content: 'Overview content' },
                            { label: 'Analytics', value: 'analytics', content: 'Analytics content' },
                        ],
                        defaultValue: 'overview',
                    }, 'tabs-1')} />
                </section>
            </div>
        </ChakraWrapper>
    );
}
