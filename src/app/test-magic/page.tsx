'use client';

import React from 'react';
import { magicuiRegistry } from '@/registries/magicui';

// Helper to create element with key
const el = (type: string, props: Record<string, any>, key: string) => ({
    type,
    key,
    props,
});

export default function TestMagicPage() {
    const mockOnAction = (action: { name: string }) => {
        console.log('Action triggered:', action.name);
        alert(`Action: ${action.name}`);
    };

    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Magic UI Registry Test</h1>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Magic Buttons (Shimmer)</h2>
                <div className="flex gap-4 flex-wrap">
                    <magicuiRegistry.Button element={el('Button', { variant: 'default', children: 'Shimmer Button' }, 'btn-1')} onAction={mockOnAction} />
                </div>
            </section>

            {/* Text */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Magic Text (Gradient)</h2>
                <magicuiRegistry.Text element={el('Text', { variant: 'h1', children: 'Gradient Heading 1' }, 'text-h1')} />
                <magicuiRegistry.Text element={el('Text', { variant: 'h2', children: 'Gradient Heading 2' }, 'text-h2')} />
            </section>

            {/* Card */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Magic Card</h2>
                <magicuiRegistry.Card element={el('Card', { title: 'Magic Card', description: 'With spotlight effect' }, 'card-1')}>
                    <p>Move your mouse over this card to see the effect.</p>
                </magicuiRegistry.Card>
            </section>

            {/* Alert */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Magic Alert (Shine Border)</h2>
                <magicuiRegistry.Alert element={el('Alert', { title: 'Shine Alert', description: 'This alert has a shiny border.' }, 'alert-1')} />
            </section>
        </div>
    );
}
