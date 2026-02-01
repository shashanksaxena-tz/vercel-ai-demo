'use client';

/**
 * Chat Panel - Conversational interface for iterative UI editing
 */

import * as React from 'react';
import type { UITree } from '@json-render/core';
import { cn } from '@/lib/utils';
import { Send, Loader2, MessageSquare, Sparkles } from 'lucide-react';

// Message type for chat history
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tree?: UITree;
  timestamp: Date;
}

interface ChatPanelProps {
  currentTree: UITree | null;
  onTreeUpdate: (tree: UITree) => void;
  className?: string;
}

// Example prompts for empty state
const examplePrompts = [
  'Create a landing page for a restaurant',
  'Add a contact form with name, email, and message',
  'Make the header darker and add a logo',
];

export function ChatPanel({ currentTree, onTreeUpdate, className }: ChatPanelProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Generate unique ID for messages
  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Handle sending a message
  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || isLoading) return;

    setError(null);
    setInput('');

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          currentTree,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      // Add assistant message with the generated tree
      const assistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: data.message || 'Here is your updated UI.',
        tree: data.tree,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update the tree if one was returned
      if (data.tree) {
        onTreeUpdate(data.tree);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      // Add error message from assistant
      const errorAssistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: `I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle example prompt click
  const handleExampleClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b bg-muted/30">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Chat</span>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start Building</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
              Describe what you want to create or modify, and I will generate the UI for you.
            </p>
            <div className="space-y-2 w-full max-w-[320px]">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Try an example
              </p>
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Message List
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex flex-col gap-1 max-w-[85%]',
                  message.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                )}
              >
                <div
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  {message.content}
                </div>
                <span className="text-xs text-muted-foreground px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 max-w-[85%] mr-auto">
                <div className="rounded-lg px-3 py-2 bg-muted text-foreground">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Generating...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-950/30 border-t border-red-200 dark:border-red-900">
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-muted/30">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build..."
              disabled={isLoading}
              rows={1}
              className={cn(
                'w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm',
                'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'min-h-[40px] max-h-[120px]'
              )}
              style={{
                height: 'auto',
                minHeight: '40px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              'flex items-center justify-center rounded-lg p-2 h-10 w-10',
              'bg-primary text-primary-foreground',
              'hover:bg-primary/90 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}

export default ChatPanel;
