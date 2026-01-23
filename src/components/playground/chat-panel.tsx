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
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b">
                <h2 className="font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI UI Generator
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Describe the UI you want to create
                </p>
            </div>

            {/* Quick Prompts */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Quick Prompts</h3>
                        <div className="space-y-2">
                            {QUICK_PROMPTS.map((qp, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickPrompt(qp)}
                                    disabled={isLoading}
                                    className="w-full text-left text-sm p-2 rounded-lg border hover:bg-muted/50 transition-colors disabled:opacity-50"
                                >
                                    {qp}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    {summary && (
                        <div className="p-3 rounded-lg bg-muted/50">
                            <h3 className="text-sm font-medium mb-1">Generated</h3>
                            <p className="text-sm text-muted-foreground">{summary}</p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex flex-col gap-2">
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your UI... (e.g., 'Create a dashboard with sales metrics')"
                        className="min-h-[80px] resize-none"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={!prompt.trim() || isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4 mr-2" />
                                Generate UI
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
