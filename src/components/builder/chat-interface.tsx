'use client';

/**
 * Chat Interface - Iterative UI Building through Conversation
 *
 * A full-featured chat interface that allows users to build and modify UIs
 * through natural language conversation. Supports:
 * - Message history with tree snapshots
 * - Loading states during generation
 * - Error handling and recovery
 * - Example prompts for getting started
 * - Undo functionality via conversation history
 * - Visual tree state indicator
 */

import * as React from 'react';
import type { UITree } from '@json-render/core';
import { cn } from '@/lib/utils';
import {
  Send,
  Loader2,
  MessageSquare,
  Sparkles,
  Trash2,
  RotateCcw,
  ChevronDown,
  Code2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wand2,
} from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  treeSnapshot?: UITree;
  metadata?: {
    timing?: number;
    componentsUsed?: string[];
    explanation?: string;
    valid?: boolean;
    validationErrors?: string[];
  };
}

interface ChatInterfaceProps {
  currentTree: UITree | null;
  onTreeUpdate: (tree: UITree) => void;
  className?: string;
  showTreeIndicator?: boolean;
}

// ============================================================================
// Example Prompts
// ============================================================================

const examplePrompts = [
  {
    category: 'Landing Pages',
    prompts: [
      'Create a landing page for a coffee shop with hero, menu section, and contact info',
      'Build a SaaS product landing page with features, pricing, and testimonials',
    ],
  },
  {
    category: 'Dashboards',
    prompts: [
      'Create a dashboard with 4 metric cards and a data table',
      'Build an analytics dashboard with charts and recent activity feed',
    ],
  },
  {
    category: 'Forms',
    prompts: [
      'Add a contact form with name, email, phone, and message fields',
      'Create a multi-step checkout form with billing and shipping sections',
    ],
  },
];

const quickModifications = [
  'Add a footer with copyright and social links',
  'Make the header sticky and add a dark mode toggle',
  'Add more spacing between sections',
  'Change the layout to a two-column design',
];

// ============================================================================
// Helper Functions
// ============================================================================

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

/**
 * Count actual changes between two trees
 */
function countTreeChanges(oldTree: UITree, newTree: UITree): number {
  let changes = 0;

  // Check for new or modified elements
  for (const [key, newElement] of Object.entries(newTree.elements)) {
    const oldElement = oldTree.elements[key];

    if (!oldElement) {
      // New element
      changes++;
      continue;
    }

    // Check if props changed
    const oldProps = JSON.stringify(oldElement.props);
    const newProps = JSON.stringify(newElement.props);

    if (oldProps !== newProps) {
      changes++;
    }
  }

  // Check for deleted elements
  for (const key of Object.keys(oldTree.elements)) {
    if (!newTree.elements[key]) {
      changes++;
    }
  }

  return changes;
}

function countElements(tree: UITree | null): number {
  if (!tree) return 0;
  return Object.keys(tree.elements).length;
}

// ============================================================================
// Subcomponents
// ============================================================================

interface MessageBubbleProps {
  message: ChatMessage;
  onUndoToHere?: () => void;
  showUndo?: boolean;
}

function MessageBubble({ message, onUndoToHere, showUndo }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        isUser ? 'ml-auto items-end' : 'mr-auto items-start',
        'max-w-[90%]'
      )}
    >
      <div
        className={cn(
          'rounded-xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-muted text-foreground rounded-bl-sm'
        )}
      >
        {message.content}
      </div>

      {/* Metadata for assistant messages */}
      {!isUser && message.metadata && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          {message.metadata.timing && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDuration(message.metadata.timing)}
            </span>
          )}
          {message.metadata.valid !== undefined && (
            <span
              className={cn(
                'flex items-center gap-1 text-xs',
                message.metadata.valid ? 'text-green-600' : 'text-amber-600'
              )}
            >
              {message.metadata.valid ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
              {message.metadata.valid ? 'Valid' : 'Has warnings'}
            </span>
          )}
          {message.treeSnapshot && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Code2 className="h-3 w-3" />
              {countElements(message.treeSnapshot)} elements
            </span>
          )}
        </div>
      )}

      {/* Timestamp and undo button */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
        {showUndo && message.treeSnapshot && (
          <button
            onClick={onUndoToHere}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Restore UI to this state"
          >
            <RotateCcw className="h-3 w-3" />
            Restore
          </button>
        )}
      </div>
    </div>
  );
}

interface TreeIndicatorProps {
  tree: UITree | null;
}

function TreeIndicator({ tree }: TreeIndicatorProps) {
  const [expanded, setExpanded] = React.useState(false);
  const elementCount = countElements(tree);
  const componentTypes = tree
    ? [...new Set(Object.values(tree.elements).map((el) => el.type))].slice(0, 5)
    : [];

  if (!tree) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground bg-muted/50 rounded-lg">
        <Code2 className="h-3.5 w-3.5" />
        <span>No UI generated yet</span>
      </div>
    );
  }

  return (
    <div className="bg-muted/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs hover:bg-muted/80 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Code2 className="h-3.5 w-3.5 text-green-600" />
          <span className="font-medium">{elementCount} elements</span>
          <span className="text-muted-foreground">in current tree</span>
        </div>
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')}
        />
      </button>
      {expanded && (
        <div className="px-3 py-2 border-t border-border/50">
          <div className="flex flex-wrap gap-1">
            {componentTypes.map((type) => (
              <span
                key={type}
                className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded"
              >
                {type}
              </span>
            ))}
            {componentTypes.length < Object.keys(tree.elements).length && (
              <span className="px-1.5 py-0.5 text-xs text-muted-foreground">
                +{Object.keys(tree.elements).length - componentTypes.length} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ChatInterface({
  currentTree,
  onTreeUpdate,
  className,
  showTreeIndicator = true,
}: ChatInterfaceProps) {
  // State
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showExamples, setShowExamples] = React.useState(true);
  const [isPolishing, setIsPolishing] = React.useState(false);
  const [showPolishMenu, setShowPolishMenu] = React.useState(false);

  // Refs
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const polishMenuRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle click outside polish menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (polishMenuRef.current && !polishMenuRef.current.contains(event.target as Node)) {
        setShowPolishMenu(false);
      }
    };

    if (showPolishMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showPolishMenu]);

  // Get conversation history for API context
  const getConversationHistory = React.useCallback(() => {
    return messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || isLoading) return;

    setError(null);
    setInput('');
    setShowExamples(false);

    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = getConversationHistory();

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          currentTree,
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      // The API returns: tree, explanation, suggestedStyles, timing, valid, validationErrors
      const { tree, explanation, timing, valid, validationErrors } = data;

      // Add assistant message with tree snapshot
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: explanation || 'Here is your updated UI.',
        timestamp: new Date(),
        treeSnapshot: tree,
        metadata: {
          timing,
          valid,
          validationErrors,
          componentsUsed: tree
            ? [...new Set(Object.values(tree.elements).map((el) => (el as { type: string }).type))]
            : [],
        },
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Update the tree
      if (tree) {
        onTreeUpdate(tree);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      // Add error message from assistant
      const errorAssistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: `I encountered an error: ${errorMessage}. Please try again or rephrase your request.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle undo to a specific message
  const handleUndoToMessage = (messageId: string) => {
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    // Keep messages up to and including the target
    const newMessages = messages.slice(0, messageIndex + 1);
    setMessages(newMessages);

    // Find the tree snapshot at this point
    const targetMessage = messages[messageIndex];
    if (targetMessage.treeSnapshot) {
      onTreeUpdate(targetMessage.treeSnapshot);
    }
  };

  // Handle clear conversation
  const handleClearConversation = () => {
    setMessages([]);
    setShowExamples(true);
    setError(null);
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

  // Handle polish UI
  const handlePolish = async (quick: boolean) => {
    console.log('[Polish UI] Starting polish...', {
      hasCurrentTree: !!currentTree,
      elementCount: currentTree ? Object.keys(currentTree.elements || {}).length : 0,
      isPolishing,
      quick
    });

    if (!currentTree || isPolishing) {
      console.warn('[Polish UI] Aborted:', !currentTree ? 'No tree' : 'Already polishing');
      return;
    }

    setShowPolishMenu(false);
    setIsPolishing(true);
    setError(null);

    try {
      console.log('[Polish UI] ===== POLISH START =====');
      console.log('[Polish UI] BEFORE - Current tree:', JSON.stringify(currentTree, null, 2));
      console.log('[Polish UI] Sending request to /api/polish...');
      const response = await fetch('/api/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tree: currentTree,
          quick,
          context: 'User interface',
        }),
      });

      const data = await response.json();
      console.log('[Polish UI] Received response:', {
        ok: response.ok,
        status: response.status,
        hasTree: !!data.tree,
        mode: data.mode,
        message: data.message,
        error: data.error,
        fullData: data
      });

      if (!response.ok) {
        console.error('[Polish UI] API Error Response:', data);
        throw new Error(data.error || data.details || `Polish request failed with status ${response.status}`);
      }

      const { tree, mode, message } = data;

      console.log('[Polish UI] AFTER - Received tree from API:', JSON.stringify(tree, null, 2));

      // Update the tree
      let finalMessage = message;
      if (tree) {
        console.log('[Polish UI] Updating tree with', Object.keys(tree.elements).length, 'elements');

        // Count actual changes between current and new tree
        const changeCount = currentTree ? countTreeChanges(currentTree, tree) : Object.keys(tree.elements).length;
        console.log('[Polish UI] Detected', changeCount, 'changes');

        // Log specific changes
        if (currentTree) {
          Object.entries(tree.elements).forEach(([key, newEl]) => {
            const oldEl = currentTree.elements[key];
            if (oldEl && JSON.stringify(oldEl.props) !== JSON.stringify(newEl.props)) {
              console.log(`[Polish UI] Changed ${newEl.type} (${key}):`, {
                before: oldEl.props,
                after: newEl.props
              });
            }
          });
        }

        // FORCE new object reference to ensure React re-renders
        // This fixes the issue where React might skip re-render if object reference is the same
        const freshTree = {
          root: tree.root,
          elements: Object.fromEntries(
            Object.entries(tree.elements).map(([key, element]) => [
              key,
              {
                ...element,
                props: { ...element.props },
                children: element.children ? [...element.children] : undefined,
              }
            ])
          )
        };

        console.log('[Polish UI] Calling onTreeUpdate with fresh tree...');
        onTreeUpdate(freshTree);
        console.log('[Polish UI] onTreeUpdate called successfully');
        console.log('[Polish UI] ===== POLISH END =====');

        // Provide better user feedback
        if (changeCount === 0) {
          finalMessage = "✨ Your UI already has complete content! Nothing to polish.";
        } else if (!finalMessage) {
          finalMessage = `✨ Polished ${changeCount} ${changeCount === 1 ? 'element' : 'elements'} with better content.`;
        }
      } else {
        console.warn('[Polish UI] No tree in response!');
        finalMessage = "⚠️ Polish completed but no changes were made.";
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: finalMessage || `Applied ${mode === 'quick' ? 'Quick' : 'AI'} Polish to your UI.`,
        timestamp: new Date(),
        treeSnapshot: tree,
        metadata: {
          componentsUsed: tree
            ? [...new Set(Object.values(tree.elements).map((el) => (el as { type: string }).type))]
            : [],
          valid: true,
        },
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('[Polish UI] Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to polish UI';
      setError(errorMessage);
      console.log('[Polish UI] Error message set:', errorMessage);
    } finally {
      setIsPolishing(false);
      console.log('[Polish UI] Polish complete, isPolishing set to false');
    }
  };

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">AI Chat</span>
          {messages.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ({messages.length} messages)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Polish UI Button */}
          {currentTree && (
            <div className="relative" ref={polishMenuRef}>
              <button
                onClick={() => setShowPolishMenu(!showPolishMenu)}
                disabled={isPolishing}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300',
                  'hover:from-purple-500/20 hover:to-pink-500/20',
                  'border border-purple-500/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                title="Polish your UI with better content"
              >
                {isPolishing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Wand2 className="h-3.5 w-3.5" />
                )}
                Polish UI
              </button>

              {/* Polish Options Dropdown */}
              {showPolishMenu && !isPolishing && (
                <div className="absolute right-0 top-full mt-1 z-50 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                  <div className="p-2 border-b border-border bg-muted/50">
                    <p className="text-xs font-medium">Polish Options</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => handlePolish(true)}
                      className="w-full flex items-start gap-2 px-3 py-2 text-left rounded-md hover:bg-accent transition-colors"
                    >
                      <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Quick Polish</div>
                        <div className="text-xs text-muted-foreground">
                          Instant placeholders
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handlePolish(false)}
                      className="w-full flex items-start gap-2 px-3 py-2 text-left rounded-md hover:bg-accent transition-colors"
                    >
                      <Wand2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">AI Polish</div>
                        <div className="text-xs text-muted-foreground">
                          Realistic content via AI
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Clear Button */}
          {messages.length > 0 && (
            <button
              onClick={handleClearConversation}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Tree State Indicator */}
      {showTreeIndicator && (
        <div className="px-4 py-2 border-b bg-muted/20">
          <TreeIndicator tree={currentTree} />
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          // Empty State with Examples
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center text-center px-4 py-6">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Build UI with AI</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-[300px]">
                Describe what you want to create, and I will generate the UI for you. Then iterate
                with follow-up requests.
              </p>
            </div>

            {showExamples && (
              <div className="flex-1 overflow-auto px-2 space-y-4">
                {examplePrompts.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                      {category.category}
                    </h4>
                    <div className="space-y-1.5">
                      {category.prompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(prompt)}
                          className="w-full text-left px-3 py-2.5 text-sm rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Message List
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                showUndo={
                  message.role === 'assistant' &&
                  message.treeSnapshot !== undefined &&
                  index < messages.length - 1
                }
                onUndoToHere={() => handleUndoToMessage(message.id)}
              />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 max-w-[90%] mr-auto">
                <div className="rounded-xl rounded-bl-sm px-4 py-2.5 bg-muted text-foreground">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm">Generating UI...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Polishing Indicator */}
            {isPolishing && (
              <div className="flex items-start gap-2 max-w-[90%] mr-auto">
                <div className="rounded-xl rounded-bl-sm px-4 py-2.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-foreground">
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                    <span className="text-sm">Polishing your UI...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Modifications (show after first generation) */}
            {messages.length > 0 && !isLoading && currentTree && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2 px-1">Quick modifications:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickModifications.slice(0, 3).map((mod, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(mod)}
                      className="px-2.5 py-1 text-xs rounded-full border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {mod}
                    </button>
                  ))}
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
        <div className="px-4 py-2 bg-destructive/10 border-t border-destructive/20">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-xs text-destructive flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-xs text-destructive hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-card">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                currentTree
                  ? 'Describe how to modify the UI...'
                  : 'Describe what you want to build...'
              }
              disabled={isLoading}
              rows={1}
              className={cn(
                'w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm',
                'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'min-h-[48px] max-h-[150px]'
              )}
              style={{
                height: 'auto',
                minHeight: '48px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              'flex items-center justify-center rounded-xl p-3 h-12 w-12',
              'bg-primary text-primary-foreground',
              'hover:bg-primary/90 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
            )}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 px-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}

export default ChatInterface;
