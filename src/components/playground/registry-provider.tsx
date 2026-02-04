'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { RegistryKey } from '@/registries';

// MUI Theme - Material Design 3 inspired
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px -2px rgba(0,0,0,0.1), 0 4px 16px -4px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px -2px rgba(0,0,0,0.15), 0 8px 24px -4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
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
          <div className="bg-gradient-to-b from-blue-50/50 to-white min-h-full">
            {children}
          </div>
        </ThemeProvider>
      );

    case 'chakra':
      return (
        <ChakraProvider value={defaultSystem}>
          <div className="bg-gradient-to-br from-teal-50/30 via-white to-cyan-50/30 min-h-full">
            {children}
          </div>
        </ChakraProvider>
      );

    case 'antd':
      return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
              borderRadius: 6,
              fontFamily: 'inherit',
            },
            algorithm: antdTheme.defaultAlgorithm,
          }}
        >
          <div className="bg-gradient-to-b from-slate-50 to-white min-h-full">
            {children}
          </div>
        </ConfigProvider>
      );

    case 'aceternity':
      return (
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white min-h-full rounded-xl overflow-hidden relative">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      );

    case 'magicui':
      return (
        <div className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 min-h-full rounded-xl overflow-hidden relative">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      );

    case 'shadcn':
      return (
        <div className="bg-white min-h-full">
          {children}
        </div>
      );

    default:
      return <>{children}</>;
  }
}
