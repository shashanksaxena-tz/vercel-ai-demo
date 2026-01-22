'use client';

import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';

interface Action {
    name: string;
    params?: Record<string, unknown>;
}

interface ActionContextType {
    onAction: (action: Action) => void;
}

const ActionContext = createContext<ActionContextType | null>(null);

export function useAction() {
    const context = useContext(ActionContext);
    if (!context) {
        throw new Error('useAction must be used within ActionProvider');
    }
    return context;
}

interface ActionProviderProps {
    children: ReactNode;
    onCustomAction?: (action: Action) => void;
}

export function ActionProvider({ children, onCustomAction }: ActionProviderProps) {
    const handleAction = useCallback(async (action: Action) => {
        console.log('Action triggered:', action.name, action.params);

        // Handle built-in actions
        switch (action.name) {
            case 'export_report':
                toast.info('Exporting report...', { duration: 1500 });
                await new Promise((r) => setTimeout(r, 1500));
                toast.success('Report exported successfully!');
                break;

            case 'refresh_data':
                toast.info('Refreshing data...', { duration: 1000 });
                await new Promise((r) => setTimeout(r, 1000));
                toast.success('Data refreshed!');
                break;

            case 'navigate':
                toast.info(`Navigating to ${action.params?.page || 'page'}...`);
                break;

            case 'submit_form':
                toast.info('Submitting form...', { duration: 1000 });
                await new Promise((r) => setTimeout(r, 1000));
                toast.success('Form submitted successfully!');
                break;

            case 'toggle_theme':
                toast.info('Theme toggled!');
                break;

            default:
                // Pass to custom handler or show generic toast
                if (onCustomAction) {
                    onCustomAction(action);
                } else {
                    toast.info(`Action: ${action.name}`);
                }
        }
    }, [onCustomAction]);

    return (
        <ActionContext.Provider value={{ onAction: handleAction }}>
            {children}
        </ActionContext.Provider>
    );
}
