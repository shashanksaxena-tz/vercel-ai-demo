'use client';

import React from 'react';
import { aceternityRegistry } from '@/registries/aceternity';

// Helper to create element with key
const el = (type: string, props: Record<string, any>, key: string) => ({
    type,
    key,
    props,
});

export default function TestAceternityPage() {
    const mockOnAction = (action: { name: string }) => {
        console.log('Action triggered:', action.name);
        alert(`Action: ${action.name}`);
    };

    return (
        <div className="p-8 space-y-8 min-h-screen bg-neutral-900 text-white">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Aceternity UI Registry Test
            </h1>

            {/* Aceternity Text */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Gradient Text</h2>
                <aceternityRegistry.Text element={el('Text', { variant: 'h1', children: 'Aceternity Heading' }, 'text-1')} />
                <aceternityRegistry.Text element={el('Text', { variant: 'h2', children: 'Subheading with Gradient' }, 'text-2')} />
                <aceternityRegistry.Text element={el('Text', { variant: 'p', children: 'Regular text in Aceternity style is gray-300.' }, 'text-3')} />
            </section>

            {/* Aceternity Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Glowing Buttons</h2>
                <div className="flex gap-4">
                    <aceternityRegistry.Button element={el('Button', { label: 'Click Me', action: 'click' }, 'btn-1')} onAction={mockOnAction} />
                    <aceternityRegistry.Button element={el('Button', { label: 'Submit' }, 'btn-2')} onAction={mockOnAction} />
                </div>
            </section>

            {/* Aceternity Grid (Bento) */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Bento Grid</h2>
                <aceternityRegistry.Grid element={el('Grid', { columns: 3 }, 'grid-1')}>
                    <aceternityRegistry.Card element={el('Card', { title: 'Bento Item 1', description: 'Description 1' }, 'card-1')}>
                        <div className="h-20 bg-neutral-800 rounded"></div>
                    </aceternityRegistry.Card>
                    <aceternityRegistry.Card element={el('Card', { title: 'Bento Item 2', description: 'Description 2' }, 'card-2')}>
                        <div className="h-20 bg-neutral-800 rounded"></div>
                    </aceternityRegistry.Card>
                    <aceternityRegistry.Card element={el('Card', { title: 'Bento Item 3', description: 'Description 3' }, 'card-3')}>
                        <div className="h-20 bg-neutral-800 rounded"></div>
                    </aceternityRegistry.Card>
                </aceternityRegistry.Grid>
            </section>

            {/* Aceternity Alert (Floating) */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Floating Alert</h2>
                <aceternityRegistry.Alert element={el('Alert', { title: 'Notification', description: 'This alert uses a floating card effect.' }, 'alert-1')} />
            </section>

            {/* Aceternity Container */}
            <section className="space-y-4">
                 <h2 className="text-xl font-semibold text-gray-300">Container</h2>
                 <aceternityRegistry.Container element={el('Container', {}, 'container-1')}>
                    <aceternityRegistry.Text element={el('Text', { variant: 'p', children: 'This is inside a container.' }, 'text-inner')} />
                 </aceternityRegistry.Container>
            </section>
        </div>
    );
}
