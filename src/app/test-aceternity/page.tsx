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
        <div className="p-8 space-y-8 max-w-6xl mx-auto bg-black min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-8 text-white">Aceternity UI Registry Test</h1>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Aceternity Buttons</h2>
                <div className="flex gap-4 flex-wrap">
                    <aceternityRegistry.Button element={el('Button', { variant: 'default', children: 'Glow Button' }, 'btn-1')} onAction={mockOnAction} />
                </div>
            </section>

            {/* Text */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Aceternity Text</h2>
                <aceternityRegistry.Text element={el('Text', { variant: 'h1', children: 'Neon Heading 1' }, 'text-h1')} />
                <aceternityRegistry.Text element={el('Text', { variant: 'h2', children: 'Neon Heading 2' }, 'text-h2')} />
            </section>

            {/* Card */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Aceternity Card</h2>
                <aceternityRegistry.Card element={el('Card', { title: 'Glowing Card', description: 'With glow effect' }, 'card-1')}>
                    <p className="text-gray-400">This card glows in the dark.</p>
                </aceternityRegistry.Card>
            </section>

            {/* Alert */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Aceternity Alert</h2>
                <aceternityRegistry.Alert element={el('Alert', { title: 'Floating Alert', description: 'This alert floats.' }, 'alert-1')} />
            </section>

            {/* Grid */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Bento Grid</h2>
                <aceternityRegistry.Grid element={el('Grid', { columns: 3 }, 'grid-1')}>
                   <div className="bg-neutral-800 p-4 rounded min-h-[100px]">Item 1</div>
                   <div className="bg-neutral-800 p-4 rounded min-h-[100px] col-span-2">Item 2</div>
                   <div className="bg-neutral-800 p-4 rounded min-h-[100px]">Item 3</div>
                   <div className="bg-neutral-800 p-4 rounded min-h-[100px]">Item 4</div>
                </aceternityRegistry.Grid>
            </section>
        </div>
    );
}
