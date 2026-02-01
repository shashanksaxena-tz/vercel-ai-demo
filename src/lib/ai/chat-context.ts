'use client';

/**
 * Chat Context - State management for iterative UI building conversation
 *
 * Provides a React Context + hooks for managing:
 * - Conversation history (user + assistant messages)
 * - Current UI tree state
 * - Tree snapshots at each conversation turn
 * - Methods for adding messages, updating tree, and clearing conversation
 */

import * as React from 'react';
import type { UITree } from '@json-render/core';

// ============================================================================
// Types
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  treeSnapshot?: UITree; // Tree state after this message was processed
  metadata?: {
    timing?: number;
    componentsUsed?: string[];
    explanation?: string;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  currentTree: UITree | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChatContextValue extends ChatState {
  // Actions
  addUserMessage: (content: string) => ChatMessage;
  addAssistantMessage: (content: string, tree?: UITree, metadata?: ChatMessage['metadata']) => ChatMessage;
  updateTree: (tree: UITree) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearConversation: () => void;
  clearError: () => void;
  // Utilities
  getConversationHistory: () => Array<{ role: 'user' | 'assistant'; content: string }>;
  getLastTree: () => UITree | null;
  undoToMessage: (messageId: string) => void;
}

// ============================================================================
// Initial State
// ============================================================================

const initialState: ChatState = {
  messages: [],
  currentTree: null,
  isLoading: false,
  error: null,
};

// ============================================================================
// Action Types
// ============================================================================

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_TREE'; payload: UITree }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CONVERSATION' }
  | { type: 'UNDO_TO_MESSAGE'; payload: string };

// ============================================================================
// Reducer
// ============================================================================

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        // If the message has a tree snapshot, update current tree
        currentTree: action.payload.treeSnapshot ?? state.currentTree,
      };

    case 'UPDATE_TREE':
      return {
        ...state,
        currentTree: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_CONVERSATION':
      return {
        ...initialState,
      };

    case 'UNDO_TO_MESSAGE': {
      const messageIndex = state.messages.findIndex((m) => m.id === action.payload);
      if (messageIndex === -1) return state;

      const messages = state.messages.slice(0, messageIndex + 1);
      const targetMessage = messages[messageIndex];

      // Find the last tree snapshot up to this point
      let currentTree: UITree | null = null;
      for (let i = messageIndex; i >= 0; i--) {
        if (messages[i].treeSnapshot) {
          currentTree = messages[i].treeSnapshot!;
          break;
        }
      }

      return {
        ...state,
        messages,
        currentTree: targetMessage.treeSnapshot ?? currentTree,
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================

const ChatContext = React.createContext<ChatContextValue | null>(null);

// ============================================================================
// ID Generator
// ============================================================================

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// Provider Component
// ============================================================================

export interface ChatProviderProps {
  children: React.ReactNode;
  initialTree?: UITree | null;
}

export function ChatProvider({ children, initialTree = null }: ChatProviderProps) {
  const [state, dispatch] = React.useReducer(chatReducer, {
    ...initialState,
    currentTree: initialTree,
  });

  // Update tree if initialTree changes
  React.useEffect(() => {
    if (initialTree && initialTree !== state.currentTree) {
      dispatch({ type: 'UPDATE_TREE', payload: initialTree });
    }
  }, [initialTree]);

  // Action creators
  const addUserMessage = React.useCallback((content: string): ChatMessage => {
    const message: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    return message;
  }, []);

  const addAssistantMessage = React.useCallback(
    (content: string, tree?: UITree, metadata?: ChatMessage['metadata']): ChatMessage => {
      const message: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        treeSnapshot: tree,
        metadata,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: message });
      return message;
    },
    []
  );

  const updateTree = React.useCallback((tree: UITree) => {
    dispatch({ type: 'UPDATE_TREE', payload: tree });
  }, []);

  const setLoading = React.useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = React.useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearConversation = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CONVERSATION' });
  }, []);

  const clearError = React.useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const getConversationHistory = React.useCallback((): Array<{
    role: 'user' | 'assistant';
    content: string;
  }> => {
    return state.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
  }, [state.messages]);

  const getLastTree = React.useCallback((): UITree | null => {
    // Find the last message with a tree snapshot
    for (let i = state.messages.length - 1; i >= 0; i--) {
      if (state.messages[i].treeSnapshot) {
        return state.messages[i].treeSnapshot!;
      }
    }
    return state.currentTree;
  }, [state.messages, state.currentTree]);

  const undoToMessage = React.useCallback((messageId: string) => {
    dispatch({ type: 'UNDO_TO_MESSAGE', payload: messageId });
  }, []);

  const value: ChatContextValue = {
    ...state,
    addUserMessage,
    addAssistantMessage,
    updateTree,
    setLoading,
    setError,
    clearConversation,
    clearError,
    getConversationHistory,
    getLastTree,
    undoToMessage,
  };

  return React.createElement(ChatContext.Provider, { value }, children);
}

// ============================================================================
// Hook
// ============================================================================

export function useChat(): ChatContextValue {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

// ============================================================================
// Optional: Standalone hook for simple use cases
// ============================================================================

export function useChatState(initialTree?: UITree | null) {
  const [state, dispatch] = React.useReducer(chatReducer, {
    ...initialState,
    currentTree: initialTree ?? null,
  });

  const addUserMessage = React.useCallback((content: string): ChatMessage => {
    const message: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    return message;
  }, []);

  const addAssistantMessage = React.useCallback(
    (content: string, tree?: UITree, metadata?: ChatMessage['metadata']): ChatMessage => {
      const message: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        treeSnapshot: tree,
        metadata,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: message });
      return message;
    },
    []
  );

  const updateTree = React.useCallback((tree: UITree) => {
    dispatch({ type: 'UPDATE_TREE', payload: tree });
  }, []);

  const setLoading = React.useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = React.useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearConversation = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CONVERSATION' });
  }, []);

  const getConversationHistory = React.useCallback((): Array<{
    role: 'user' | 'assistant';
    content: string;
  }> => {
    return state.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
  }, [state.messages]);

  return {
    ...state,
    addUserMessage,
    addAssistantMessage,
    updateTree,
    setLoading,
    setError,
    clearConversation,
    getConversationHistory,
  };
}
