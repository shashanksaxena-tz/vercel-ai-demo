'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { RegistryKey } from '@/registries';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

interface RegistryProviderProps {
  registry: RegistryKey;
  children: React.ReactNode;
}

export function RegistryProvider({ registry, children }: RegistryProviderProps) {
  switch (registry) {
    case 'mui':
      return (
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      );

    case 'chakra':
      return (
        <ChakraProvider value={defaultSystem}>
          {children}
        </ChakraProvider>
      );

    case 'antd':
      return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
              borderRadius: 6,
            },
            algorithm: antdTheme.defaultAlgorithm,
          }}
        >
          {children}
        </ConfigProvider>
      );

    case 'aceternity':
      return (
        <div className="bg-neutral-950 text-white min-h-full rounded-lg">
          {children}
        </div>
      );

    case 'magicui':
      return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-full rounded-lg">
          {children}
        </div>
      );

    default:
      return <>{children}</>;
  }
}
