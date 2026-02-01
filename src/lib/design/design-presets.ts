/**
 * Design Presets - Border radius presets for design language system
 *
 * Provides three main design languages:
 * - Sharp: No border radius (0px) - Clean, modern, geometric
 * - Rounded: Balanced curves (0.375rem) - Friendly, approachable
 * - Pill: Full rounded (9999px) - Soft, playful, organic
 */

export type DesignLanguage = 'sharp' | 'rounded' | 'pill' | 'custom';

export interface DesignPreset {
  name: string;
  description: string;
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  preview: {
    button: string;
    card: string;
    input: string;
    badge: string;
  };
}

export const DESIGN_PRESETS: Record<Exclude<DesignLanguage, 'custom'>, DesignPreset> = {
  sharp: {
    name: 'Sharp',
    description: 'Clean, modern, geometric design with no rounded corners',
    borderRadius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      full: '0',
    },
    preview: {
      button: '0',
      card: '0',
      input: '0',
      badge: '0',
    },
  },
  rounded: {
    name: 'Rounded',
    description: 'Friendly, balanced curves for an approachable feel',
    borderRadius: {
      none: '0',
      sm: '0.125rem', // 2px
      md: '0.375rem', // 6px
      lg: '0.5rem', // 8px
      xl: '0.75rem', // 12px
      full: '9999px',
    },
    preview: {
      button: '0.375rem',
      card: '0.5rem',
      input: '0.375rem',
      badge: '9999px',
    },
  },
  pill: {
    name: 'Pill',
    description: 'Soft, playful, organic shapes with fully rounded corners',
    borderRadius: {
      none: '0',
      sm: '0.5rem', // 8px
      md: '1rem', // 16px
      lg: '1.5rem', // 24px
      xl: '2rem', // 32px
      full: '9999px',
    },
    preview: {
      button: '9999px',
      card: '1.5rem',
      input: '9999px',
      badge: '9999px',
    },
  },
};

export interface CustomDesignPreset {
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}

export const DEFAULT_DESIGN_LANGUAGE: DesignLanguage = 'rounded';

/**
 * Get CSS variables for a design preset
 */
export function getDesignCSSVariables(
  language: DesignLanguage,
  customPreset?: CustomDesignPreset
): Record<string, string> {
  const preset =
    language === 'custom' && customPreset
      ? { borderRadius: customPreset.borderRadius }
      : DESIGN_PRESETS[language as Exclude<DesignLanguage, 'custom'>];

  if (!preset) {
    return getDesignCSSVariables('rounded');
  }

  return {
    '--radius-none': preset.borderRadius.none,
    '--radius-sm': preset.borderRadius.sm,
    '--radius-md': preset.borderRadius.md,
    '--radius-lg': preset.borderRadius.lg,
    '--radius-xl': preset.borderRadius.xl,
    '--radius-full': preset.borderRadius.full,
    // Legacy support for existing components
    '--radius': preset.borderRadius.md,
  };
}

/**
 * Get Tailwind-compatible radius classes for a design language
 */
export function getTailwindRadiusConfig(language: DesignLanguage): Record<string, string> {
  const preset = DESIGN_PRESETS[language as Exclude<DesignLanguage, 'custom'>];
  if (!preset) return getTailwindRadiusConfig('rounded');

  return {
    none: preset.borderRadius.none,
    sm: preset.borderRadius.sm,
    DEFAULT: preset.borderRadius.md,
    md: preset.borderRadius.md,
    lg: preset.borderRadius.lg,
    xl: preset.borderRadius.xl,
    '2xl': preset.borderRadius.xl,
    full: preset.borderRadius.full,
  };
}
