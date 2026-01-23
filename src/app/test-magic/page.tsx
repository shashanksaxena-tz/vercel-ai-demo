'use client';

import React from 'react';
import { magicuiRegistry } from '@/registries/magicui';
import { aceternityRegistry } from '@/registries/aceternity';

// Helper to create element with key
const el = (type: string, props: Record<string, any>, key: string) => ({
    type,
    key,
    props,
});

export default function TestMagicPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 space-y-16 font-sans">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Magic UI & Aceternity Test
            </h1>

            {/* Magic UI Section */}
            <section className="space-y-8 p-8 border border-white/10 rounded-2xl bg-white/5">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Magic UI Registry</h2>

                {/* Magic Text */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Gradient Text</h3>
                    <magicuiRegistry.Text element={el('Text', { variant: 'h1', children: 'Magic Gradient Title' }, 'magic-text-1')} />
                </div>

                {/* Magic Button */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Shimmer Button</h3>
                    <magicuiRegistry.Button element={el('Button', { children: 'Shimmer Me' }, 'magic-btn-1')} />
                </div>

                {/* Magic Card */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Magic Card</h3>
                    <div className="w-[300px] h-[200px]">
                        <magicuiRegistry.Card element={el('Card', { title: 'Magic Card', description: 'Hover to see spotlight' }, 'magic-card-1')}>
                            <p>Card Content</p>
                        </magicuiRegistry.Card>
                    </div>
                </div>

                {/* Magic Alert */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Shine Border Alert</h3>
                    <magicuiRegistry.Alert element={el('Alert', { title: 'Notification', description: 'This has a shine border' }, 'magic-alert-1')} />
                </div>
            </section>

            {/* Aceternity UI Section */}
            <section className="space-y-8 p-8 border border-white/10 rounded-2xl bg-white/5">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Aceternity Registry</h2>

                {/* Aceternity Text */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Gradient Heading</h3>
                    <aceternityRegistry.Text element={el('Text', { variant: 'h1', children: 'Aceternity Title' }, 'ace-text-1')} />
                </div>

                {/* Aceternity Button */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Gradient Button</h3>
                    <aceternityRegistry.Button element={el('Button', { children: 'Click Me' }, 'ace-btn-1')} />
                </div>

                {/* Aceternity Card */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Glowing Card</h3>
                    <div className="w-[300px]">
                        <aceternityRegistry.Card element={el('Card', { title: 'Glowing Card', description: 'Glows on hover' }, 'ace-card-1')}>
                            <p>Card content</p>
                        </aceternityRegistry.Card>
                    </div>
                </div>

                {/* Aceternity Alert */}
                <div>
                    <h3 className="text-lg text-gray-400 mb-2">Floating Alert</h3>
                    <aceternityRegistry.Alert element={el('Alert', { title: 'Alert', description: 'Floating style' }, 'ace-alert-1')} />
                </div>
            </section>
        </div>
    );
}
