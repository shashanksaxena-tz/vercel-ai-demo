/**
 * Theme Tokens - Design tokens for each UI framework
 *
 * These tokens provide consistent theming across frameworks,
 * including colors, spacing, typography, and shadows.
 */

import type { UIFramework } from '@/types';

// Theme token structure
export interface ThemeTokens {
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryForeground: string;
    secondary: string;
    secondaryHover: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    error: string;
    errorForeground: string;
    info: string;
    infoForeground: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Shadcn/UI Theme Tokens
const shadcnTokens: ThemeTokens = {
  name: 'Shadcn/UI',
  colors: {
    primary: 'hsl(222.2, 47.4%, 11.2%)',
    primaryHover: 'hsl(222.2, 47.4%, 20%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(210, 40%, 96.1%)',
    secondaryHover: 'hsl(210, 40%, 90%)',
    secondaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
    accent: 'hsl(210, 40%, 96.1%)',
    accentForeground: 'hsl(222.2, 47.4%, 11.2%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)',
    muted: 'hsl(210, 40%, 96.1%)',
    mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
    border: 'hsl(214.3, 31.8%, 91.4%)',
    input: 'hsl(214.3, 31.8%, 91.4%)',
    ring: 'hsl(222.2, 84%, 4.9%)',
    success: 'hsl(142.1, 76.2%, 36.3%)',
    successForeground: 'hsl(0, 0%, 100%)',
    warning: 'hsl(45.4, 93.4%, 47.5%)',
    warningForeground: 'hsl(0, 0%, 0%)',
    error: 'hsl(0, 84.2%, 60.2%)',
    errorForeground: 'hsl(0, 0%, 100%)',
    info: 'hsl(217.2, 91.2%, 59.8%)',
    infoForeground: 'hsl(0, 0%, 100%)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};

// Material UI Theme Tokens
const muiTokens: ThemeTokens = {
  name: 'Material UI',
  colors: {
    primary: '#1976d2',
    primaryHover: '#1565c0',
    primaryForeground: '#ffffff',
    secondary: '#9c27b0',
    secondaryHover: '#7b1fa2',
    secondaryForeground: '#ffffff',
    accent: '#ff4081',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#212121',
    muted: '#f5f5f5',
    mutedForeground: '#757575',
    border: '#e0e0e0',
    input: '#e0e0e0',
    ring: '#1976d2',
    success: '#2e7d32',
    successForeground: '#ffffff',
    warning: '#ed6c02',
    warningForeground: '#ffffff',
    error: '#d32f2f',
    errorForeground: '#ffffff',
    info: '#0288d1',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  typography: {
    fontFamily: {
      sans: 'Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'Georgia, serif',
      mono: '"Roboto Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2.125rem',
      '4xl': '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    xl: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
  },
};

// Chakra UI Theme Tokens
const chakraTokens: ThemeTokens = {
  name: 'Chakra UI',
  colors: {
    primary: '#3182CE',
    primaryHover: '#2C5282',
    primaryForeground: '#ffffff',
    secondary: '#718096',
    secondaryHover: '#4A5568',
    secondaryForeground: '#ffffff',
    accent: '#805AD5',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#1A202C',
    muted: '#E2E8F0',
    mutedForeground: '#718096',
    border: '#E2E8F0',
    input: '#E2E8F0',
    ring: '#3182CE',
    success: '#38A169',
    successForeground: '#ffffff',
    warning: '#D69E2E',
    warningForeground: '#1A202C',
    error: '#E53E3E',
    errorForeground: '#ffffff',
    info: '#3182CE',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

// Ant Design Theme Tokens
const antdTokens: ThemeTokens = {
  name: 'Ant Design',
  colors: {
    primary: '#1890ff',
    primaryHover: '#40a9ff',
    primaryForeground: '#ffffff',
    secondary: '#722ed1',
    secondaryHover: '#9254de',
    secondaryForeground: '#ffffff',
    accent: '#eb2f96',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: 'rgba(0, 0, 0, 0.85)',
    muted: '#fafafa',
    mutedForeground: 'rgba(0, 0, 0, 0.45)',
    border: '#d9d9d9',
    input: '#d9d9d9',
    ring: '#1890ff',
    success: '#52c41a',
    successForeground: '#ffffff',
    warning: '#faad14',
    warningForeground: 'rgba(0, 0, 0, 0.85)',
    error: '#ff4d4f',
    errorForeground: '#ffffff',
    info: '#1890ff',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'Georgia, serif',
      mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '38px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.35',
      normal: '1.5715',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '6px',
    xl: '8px',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 2px 8px rgba(0, 0, 0, 0.15)',
    md: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px rgba(0, 0, 0, 0.08)',
    lg: '0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px rgba(0, 0, 0, 0.05)',
    xl: '0 12px 48px 16px rgba(0, 0, 0, 0.03), 0 12px 36px rgba(0, 0, 0, 0.08)',
  },
};

// Tailwind CSS Theme Tokens
const tailwindTokens: ThemeTokens = {
  name: 'Tailwind CSS',
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#6b7280',
    secondaryHover: '#4b5563',
    secondaryForeground: '#ffffff',
    accent: '#8b5cf6',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#1f2937',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280',
    border: '#e5e7eb',
    input: '#e5e7eb',
    ring: '#3b82f6',
    success: '#10b981',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#1f2937',
    error: '#ef4444',
    errorForeground: '#ffffff',
    info: '#0ea5e9',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'Fira Code, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};

// Flowbite Theme Tokens
const flowbiteTokens: ThemeTokens = {
  name: 'Flowbite',
  colors: {
    primary: '#1d4ed8',
    primaryHover: '#1e40af',
    primaryForeground: '#ffffff',
    secondary: '#4b5563',
    secondaryHover: '#374151',
    secondaryForeground: '#ffffff',
    accent: '#7c3aed',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#111827',
    muted: '#f9fafb',
    mutedForeground: '#6b7280',
    border: '#e5e7eb',
    input: '#e5e7eb',
    ring: '#1d4ed8',
    success: '#059669',
    successForeground: '#ffffff',
    warning: '#d97706',
    warningForeground: '#1f2937',
    error: '#dc2626',
    errorForeground: '#ffffff',
    info: '#2563eb',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'Fira Code, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};

// Magic UI Theme Tokens (Modern, Gradient-focused)
const magicUITokens: ThemeTokens = {
  name: 'Magic UI',
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    primaryForeground: '#ffffff',
    secondary: '#ec4899',
    secondaryHover: '#db2777',
    secondaryForeground: '#ffffff',
    accent: '#14b8a6',
    accentForeground: '#ffffff',
    background: '#0a0a0a',
    foreground: '#fafafa',
    muted: '#18181b',
    mutedForeground: '#a1a1aa',
    border: '#27272a',
    input: '#27272a',
    ring: '#6366f1',
    success: '#22c55e',
    successForeground: '#ffffff',
    warning: '#eab308',
    warningForeground: '#0a0a0a',
    error: '#ef4444',
    errorForeground: '#ffffff',
    info: '#3b82f6',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.2)',
  },
};

// Aceternity UI Theme Tokens (Dark, Modern, Animated)
const aceternityTokens: ThemeTokens = {
  name: 'Aceternity UI',
  colors: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryForeground: '#ffffff',
    secondary: '#06b6d4',
    secondaryHover: '#0891b2',
    secondaryForeground: '#ffffff',
    accent: '#f59e0b',
    accentForeground: '#1f2937',
    background: '#030712',
    foreground: '#f9fafb',
    muted: '#111827',
    mutedForeground: '#9ca3af',
    border: '#1f2937',
    input: '#1f2937',
    ring: '#8b5cf6',
    success: '#10b981',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#1f2937',
    error: '#f43f5e',
    errorForeground: '#ffffff',
    info: '#0ea5e9',
    infoForeground: '#ffffff',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.5)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  },
};

// Token registry
const themeTokensRegistry: Record<UIFramework, ThemeTokens> = {
  shadcn: shadcnTokens,
  mui: muiTokens,
  chakra: chakraTokens,
  antd: antdTokens,
  tailwind: tailwindTokens,
  flowbite: flowbiteTokens,
  'magic-ui': magicUITokens,
  aceternity: aceternityTokens,
};

/**
 * Get theme tokens for a specific framework
 */
export function getThemeTokens(framework: UIFramework): ThemeTokens {
  return themeTokensRegistry[framework] || shadcnTokens;
}

/**
 * Get all available theme tokens
 */
export function getAllThemeTokens(): Record<UIFramework, ThemeTokens> {
  return themeTokensRegistry;
}

/**
 * Check if a framework has theme tokens
 */
export function hasThemeTokens(framework: UIFramework): boolean {
  return framework in themeTokensRegistry;
}

// Export individual token sets
export {
  shadcnTokens,
  muiTokens,
  chakraTokens,
  antdTokens,
  tailwindTokens,
  flowbiteTokens,
  magicUITokens,
  aceternityTokens,
};
