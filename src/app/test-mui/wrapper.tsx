'use client';

import React from 'react';
import { JSONUIProvider } from '@json-render/react';
import { muiRegistry } from '@/registries/mui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <JSONUIProvider
        registry={muiRegistry}
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
    </ThemeProvider>
  );
}
