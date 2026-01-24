'use client';

import React from 'react';
import { antdRegistry } from '@/registries/antd';
import { ConfigProvider, theme } from 'antd';

// Wrapper to provide Ant Design context if needed (though AntD works without it, strict mode is good)
function AntdWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
            }}
        >
            <div className="p-8 space-y-8 max-w-6xl mx-auto bg-white min-h-screen text-black">
                {children}
            </div>
        </ConfigProvider>
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
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { key: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

export default function TestAntdPage() {
    const mockOnAction = (action: { name: string }) => {
        console.log('Action triggered:', action.name);
        alert(`Action: ${action.name}`);
    };

    return (
        <AntdWrapper>
            <h1 className="text-3xl font-bold mb-8">Ant Design Registry Test</h1>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Buttons</h2>
                <div className="flex gap-4 flex-wrap items-center">
                    <antdRegistry.Button element={el('Button', { variant: 'default', label: 'Primary' }, 'btn-1')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'secondary', label: 'Secondary' }, 'btn-2')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'destructive', label: 'Destructive' }, 'btn-3')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'outline', label: 'Outline' }, 'btn-4')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'ghost', label: 'Ghost' }, 'btn-5')} onAction={mockOnAction} />
                </div>
            </section>

            {/* Grid */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Grid System</h2>
                <antdRegistry.Grid element={el('Grid', { columns: 3, gap: 16 }, 'grid-1')}>
                    <div className="bg-blue-100 p-4 text-center rounded">Col 1</div>
                    <div className="bg-blue-200 p-4 text-center rounded">Col 2</div>
                    <div className="bg-blue-300 p-4 text-center rounded">Col 3</div>
                </antdRegistry.Grid>
            </section>

            {/* Input & Select */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Forms</h2>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                    <antdRegistry.Input element={el('Input', { label: 'Username', placeholder: 'Enter username' }, 'input-1')} />
                    <antdRegistry.Select element={el('Select', {
                        label: 'Role',
                        options: [
                            { label: 'Admin', value: 'admin' },
                            { label: 'User', value: 'user' }
                        ]
                    }, 'select-1')} />
                </div>
            </section>

             {/* Table */}
             <section className="space-y-4">
                <h2 className="text-xl font-semibold">Table</h2>
                <antdRegistry.Table element={el('Table', {
                    columns: [
                        { header: 'Name', accessorKey: 'name' },
                        { header: 'Email', accessorKey: 'email' },
                        { header: 'Role', accessorKey: 'role' }
                    ],
                    data: tableData,
                }, 'table-1')} />
            </section>

            {/* Card */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Card</h2>
                <antdRegistry.Card element={el('Card', { title: 'Ant Card', description: 'This is a card description' }, 'card-1')}>
                    <p>Card content goes here.</p>
                </antdRegistry.Card>
            </section>

            {/* Alert */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Alert</h2>
                <antdRegistry.Alert element={el('Alert', { variant: 'info', title: 'Info', message: 'This is an info alert' }, 'alert-1')} />
                <antdRegistry.Alert element={el('Alert', { variant: 'danger', title: 'Error', message: 'This is an error alert' }, 'alert-2')} />
            </section>

        </AntdWrapper>
    );
}
