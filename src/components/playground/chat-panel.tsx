'use client';

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface ChatPanelProps {
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
    summary?: string | null;
}

const QUICK_PROMPTS = [
    'Create a sales dashboard with KPI metrics and a line chart',
    'Build a user management table with action buttons',
    'Design a login form with email and password',
    'Create a pricing card with features list',
    'Build a product analytics dashboard',
];

export function ChatPanel({ onSubmit, isLoading, summary }: ChatPanelProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSubmit(prompt.trim());
        }
    };

    const handleQuickPrompt = (quickPrompt: string) => {
        setPrompt(quickPrompt);
        onSubmit(quickPrompt);
    };

    return (
        <div className="flex flex-col h-full bg-transparent">
            {/* Header */}
            <div className="p-6 pb-2">
                <h2 className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    Generator
                </h2>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 px-6">
                <div className="space-y-6 py-4">
                    {/* Summary (if exists) */}
                    {summary ? (
                        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-900 dark:text-orange-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                                <h3 className="text-xs font-semibold uppercase tracking-wider">Current Build</h3>
                            </div>
                            <p className="text-sm leading-relaxed opacity-90">{summary}</p>
                        </div>
                    ) : (
                        <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center">
                            <p className="text-sm text-muted-foreground">No active generation.</p>
                        </div>
                    )}

                    {/* Quick Prompts */}
                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                            <span>SUGGESTED PROMPTS</span>
                            <div className="h-px bg-border flex-1" />
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {QUICK_PROMPTS.map((qp, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickPrompt(qp)}
                                    disabled={isLoading}
                                    className="text-left text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-orange-500 hover:text-white hover:border-orange-600 transition-all disabled:opacity-50 shadow-sm"
                                >
                                    {qp}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 pt-2 border-t bg-background/50 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="relative rounded-2xl border bg-background focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all shadow-sm">
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your UI... e.g. 'A sleek CRM dashboard'"
                        className="min-h-[100px] resize-none border-0 focus-visible:ring-0 bg-transparent p-4 text-sm"
                        disabled={isLoading}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <div className="p-2 flex justify-end">
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!prompt.trim() || isLoading}
                            className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl px-4 py-2 h-auto"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                                    Generating
                                </>
                            ) : (
                                <>
                                    Generate
                                    <Send className="h-3.5 w-3.5 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-3">
                    Press <kbd className="font-sans px-1 py-0.5 rounded bg-muted border text-muted-foreground">Enter</kbd> to generate
                </p>
            </div>
        </div>
    );
}
