'use client';

import { Sparkles, Layout, Plus } from 'lucide-react';

interface WelcomeScreenProps {
  onPickTemplate: () => void;
  onStartBlank: () => void;
  onOpenAI: () => void;
}

export function WelcomeScreen({ onPickTemplate, onStartBlank, onOpenAI }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20">
      <div className="max-w-lg w-full mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Layout className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Universal UI Builder
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Build beautiful interfaces with AI assistance and visual editing.
            Start from a template, a blank canvas, or describe what you want.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={onPickTemplate}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Layout className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Pick a Template</div>
              <div className="text-xs text-muted-foreground mt-0.5">6 ready-to-use layouts</div>
            </div>
          </button>

          <button
            onClick={onStartBlank}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Start Blank</div>
              <div className="text-xs text-muted-foreground mt-0.5">Empty canvas + drag-drop</div>
            </div>
          </button>

          <button
            onClick={onOpenAI}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Ask AI</div>
              <div className="text-xs text-muted-foreground mt-0.5">Describe what to build</div>
            </div>
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          AI is always available in the left panel &mdash; use it anytime to generate, modify, or enhance your UI
        </p>
      </div>
    </div>
  );
}
