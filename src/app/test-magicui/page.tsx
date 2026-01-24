'use client';

import React from 'react';
import { magicuiRegistry } from '@/registries/magicui';

// Helper to create element with key
const el = (type: string, props: Record<string, any>, key: string) => ({
    type,
    key,
    props,
});

export default function TestMagicUIPage() {
    const mockOnAction = (action: { name: string }) => {
        console.log('Action triggered:', action.name);
        alert(`Action: ${action.name}`);
    };

    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto min-h-screen bg-black text-white">
            <h1 className="text-3xl font-bold mb-8">Magic UI Registry Test</h1>
            <p className="text-gray-400">Note: This registry uses dark mode aesthetics.</p>

            {/* Magic Text */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Gradient Text</h2>
                <magicuiRegistry.Text element={el('Text', { variant: 'h1', children: 'Magic UI Heading' }, 'text-1')} />
                <magicuiRegistry.Text element={el('Text', { variant: 'h2', children: 'Subheading with Gradient' }, 'text-2')} />
            </section>

            {/* Magic Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Shimmer Buttons</h2>
                <div className="flex gap-4">
                    <magicuiRegistry.Button element={el('Button', { label: 'Click Me', action: 'click' }, 'btn-1')} onAction={mockOnAction} />
                    <magicuiRegistry.Button element={el('Button', { label: 'Submit' }, 'btn-2')} onAction={mockOnAction} />
                </div>
            </section>

            {/* Magic Cards */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Magic Cards (Spotlight)</h2>
                <div className="grid grid-cols-2 gap-8">
                    <magicuiRegistry.Card element={el('Card', { title: 'Card 1', description: 'Hover over me to see the effect' }, 'card-1')}>
                        <p className="text-gray-300">Some content inside the magic card.</p>
                    </magicuiRegistry.Card>
                    <magicuiRegistry.Card element={el('Card', { title: 'Card 2', description: 'Another card' }, 'card-2')}>
                        <p className="text-gray-300">More content here.</p>
                    </magicuiRegistry.Card>
                </div>
            </section>

            {/* Magic Alert (Shine Border) */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Shine Border (Alert)</h2>
                <magicuiRegistry.Alert element={el('Alert', { title: 'Notification', description: 'This alert has a shine border animation.' }, 'alert-1')} />
            </section>

             {/* Stack & Grid */}
             <section className="space-y-4">
                <h2 className="text-xl font-semibold">Layouts</h2>
                <magicuiRegistry.Grid element={el('Grid', { columns: 3, gap: 4 }, 'grid-1')}>
                    <div className="bg-gray-800 p-4 rounded text-center">Box 1</div>
                    <div className="bg-gray-800 p-4 rounded text-center">Box 2</div>
                    <div className="bg-gray-800 p-4 rounded text-center">Box 3</div>
                </magicuiRegistry.Grid>
            </section>
        </div>
    );
}
