'use client';

import { JSONUIProvider } from '@json-render/react';
import { shadcnRegistry } from '@/registries/shadcn';

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <JSONUIProvider
      registry={shadcnRegistry}
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
