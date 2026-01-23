'use client';

import React from 'react';
import { JSONUIProvider } from '@json-render/react';
import { chakraRegistry } from '@/registries/chakra';
import { Provider } from '@/registries/chakra/provider';

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <JSONUIProvider
        registry={chakraRegistry}
        initialData={{
          name: 'Jane Doe',
          email: 'jane@example.com',
          user: { role: 'user' },
          items: [
            { id: '1', name: 'Item A', status: 'Active' },
            { id: '2', name: 'Item B', status: 'Pending' }
          ]
        }}
      >
        {children}
      </JSONUIProvider>
    </Provider>
  );
}
