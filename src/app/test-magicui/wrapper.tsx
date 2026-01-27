'use client';

import { JSONUIProvider } from '@json-render/react';
import { magicuiRegistry } from '@/registries/magicui';

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <JSONUIProvider
      registry={magicuiRegistry}
      initialData={{
        name: 'John Doe',
        email: 'john@example.com',
        user: { role: 'admin' },
        items: [
          { id: '1', name: 'Item 1', status: 'Active' },
          { id: '2', name: 'Item 2', status: 'Inactive' }
        ]
      }}
    >
      {children}
    </JSONUIProvider>
  );
}
