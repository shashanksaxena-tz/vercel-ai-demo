'use client';

import React from 'react';
import { antdRegistry } from '@/registries/antd';

// Helper to create element with key
const el = (type: string, props: Record<string, any>, key: string) => ({
    type,
    key,
    props,
});

export default function TestAntdPage() {
    const mockOnAction = (action: { name: string }) => {
        console.log('Action triggered:', action.name);
        alert(`Action: ${action.name}`);
    };

    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto font-sans">
            <h1 className="text-3xl font-bold mb-8">Ant Design Registry Test</h1>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Buttons</h2>
                <div className="flex gap-4 flex-wrap">
                    <antdRegistry.Button element={el('Button', { variant: 'default', children: 'Primary' }, 'btn-1')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'secondary', children: 'Secondary' }, 'btn-2')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'destructive', children: 'Destructive' }, 'btn-3')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'outline', children: 'Outline' }, 'btn-4')} onAction={mockOnAction} />
                    <antdRegistry.Button element={el('Button', { variant: 'ghost', children: 'Ghost' }, 'btn-5')} onAction={mockOnAction} />
                </div>
            </section>

            {/* Text */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Text Variants</h2>
                <antdRegistry.Text element={el('Text', { variant: 'h1', children: 'Heading 1' }, 'text-h1')} />
                <antdRegistry.Text element={el('Text', { variant: 'h2', children: 'Heading 2' }, 'text-h2')} />
                <antdRegistry.Text element={el('Text', { variant: 'p', children: 'This is a paragraph.' }, 'text-p')} />
            </section>

            {/* Badges */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Badges</h2>
                <div className="flex gap-4 flex-wrap">
                    <antdRegistry.Badge element={el('Badge', { variant: 'default', children: 'Default' }, 'badge-1')} />
                    <antdRegistry.Badge element={el('Badge', { variant: 'secondary', children: 'Secondary' }, 'badge-2')} />
                    <antdRegistry.Badge element={el('Badge', { variant: 'destructive', children: 'Destructive' }, 'badge-3')} />
                </div>
            </section>

            {/* Card */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Card</h2>
                <antdRegistry.Card element={el('Card', { title: 'Sample Card', description: 'Card description' }, 'card-1')}>
                    <p>Card content here</p>
                </antdRegistry.Card>
            </section>

            {/* Alert */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Alerts</h2>
                <antdRegistry.Alert element={el('Alert', { variant: 'default', title: 'Info', description: 'This is an info alert.' }, 'alert-1')} />
                <antdRegistry.Alert element={el('Alert', { variant: 'destructive', title: 'Error', description: 'Something went wrong.' }, 'alert-3')} />
            </section>

            {/* Metric */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Metrics</h2>
                <div className="grid grid-cols-3 gap-4">
                    <antdRegistry.Metric element={el('Metric', { label: 'Revenue', value: '$45,231', trend: 20.1, trendDirection: 'up' }, 'metric-1')} />
                    <antdRegistry.Metric element={el('Metric', { label: 'Users', value: '2,350', trend: 5.4, trendDirection: 'up' }, 'metric-2')} />
                    <antdRegistry.Metric element={el('Metric', { label: 'Bounce', value: '32.4%', trend: -2.1, trendDirection: 'down' }, 'metric-3')} />
                </div>
            </section>
        </div>
    );
}
