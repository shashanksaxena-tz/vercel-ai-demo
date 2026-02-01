'use client';

/**
 * Design Context - Global design system state management
 *
 * Provides:
 * - Design language (Sharp/Rounded/Pill) state
 * - Color palette state
 * - CSS variable generation
 * - LocalStorage persistence
 */

import * as React from 'react';
import {
  type DesignLanguage,
  type CustomDesignPreset,
  DEFAULT_DESIGN_LANGUAGE,
  getDesignCSSVariables,
} from './design-presets';
import {
  type ColorPalette,
  type ColorScheme,
  COLOR_SCHEMES,
  DEFAULT_COLOR_SCHEME,
  getColorCSSVariables,
} from './color-system';
import { injectCSSVariables, removeCSSVariables } from './css-injector';

const STORAGE_KEY = 'generative-ui-builder-design';

export interface DesignContextValue {
  // Design language
  designLanguage: DesignLanguage;
  setDesignLanguage: (language: DesignLanguage) => void;
  customDesignPreset: CustomDesignPreset | null;
  setCustomDesignPreset: (preset: CustomDesignPreset | null) => void;

  // Color palette
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  colorPalette: ColorPalette;
  setColorPalette: (palette: Partial<ColorPalette>) => void;

  // Generated CSS
  cssVariables: string;

  // Actions
  resetToDefaults: () => void;
}

const DesignContext = React.createContext<DesignContextValue | null>(null);

interface StoredDesignState {
  designLanguage: DesignLanguage;
  customDesignPreset: CustomDesignPreset | null;
  colorScheme: ColorScheme;
  customColorPalette: Partial<ColorPalette> | null;
}

function getStoredState(): StoredDesignState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore errors
  }
  return null;
}

function saveState(state: StoredDesignState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore errors
  }
}

interface DesignProviderProps {
  children: React.ReactNode;
  defaultDesignLanguage?: DesignLanguage;
  defaultColorScheme?: ColorScheme;
}

export function DesignProvider({
  children,
  defaultDesignLanguage = DEFAULT_DESIGN_LANGUAGE,
  defaultColorScheme = DEFAULT_COLOR_SCHEME,
}: DesignProviderProps) {
  // Initialize from storage or defaults
  const [designLanguage, setDesignLanguageState] = React.useState<DesignLanguage>(defaultDesignLanguage);
  const [customDesignPreset, setCustomDesignPresetState] = React.useState<CustomDesignPreset | null>(null);
  const [colorScheme, setColorSchemeState] = React.useState<ColorScheme>(defaultColorScheme);
  const [customColorPalette, setCustomColorPaletteState] = React.useState<Partial<ColorPalette> | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load from storage on mount
  React.useEffect(() => {
    const stored = getStoredState();
    if (stored) {
      setDesignLanguageState(stored.designLanguage);
      setCustomDesignPresetState(stored.customDesignPreset);
      setColorSchemeState(stored.colorScheme);
      setCustomColorPaletteState(stored.customColorPalette);
    }
    setIsInitialized(true);
  }, []);

  // Compute the active color palette
  const colorPalette = React.useMemo<ColorPalette>(() => {
    const baseScheme = colorScheme === 'custom' ? COLOR_SCHEMES.slate : COLOR_SCHEMES[colorScheme];
    if (customColorPalette) {
      return { ...baseScheme, ...customColorPalette };
    }
    return baseScheme;
  }, [colorScheme, customColorPalette]);

  // Generate CSS variables string
  const cssVariables = React.useMemo(() => {
    const designVars = getDesignCSSVariables(designLanguage, customDesignPreset ?? undefined);
    const colorVars = getColorCSSVariables(colorPalette);
    const allVars = { ...designVars, ...colorVars };

    return Object.entries(allVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n  ');
  }, [designLanguage, customDesignPreset, colorPalette]);

  // Inject CSS variables when they change
  React.useEffect(() => {
    if (!isInitialized) return;

    const designVars = getDesignCSSVariables(designLanguage, customDesignPreset ?? undefined);
    const colorVars = getColorCSSVariables(colorPalette);
    const allVars = { ...designVars, ...colorVars };

    injectCSSVariables(allVars);

    return () => {
      removeCSSVariables(Object.keys(allVars));
    };
  }, [designLanguage, customDesignPreset, colorPalette, isInitialized]);

  // Save state when it changes
  React.useEffect(() => {
    if (!isInitialized) return;

    saveState({
      designLanguage,
      customDesignPreset,
      colorScheme,
      customColorPalette,
    });
  }, [designLanguage, customDesignPreset, colorScheme, customColorPalette, isInitialized]);

  // Setters with persistence
  const setDesignLanguage = React.useCallback((language: DesignLanguage) => {
    setDesignLanguageState(language);
  }, []);

  const setCustomDesignPreset = React.useCallback((preset: CustomDesignPreset | null) => {
    setCustomDesignPresetState(preset);
  }, []);

  const setColorScheme = React.useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    if (scheme !== 'custom') {
      setCustomColorPaletteState(null);
    }
  }, []);

  const setColorPalette = React.useCallback((palette: Partial<ColorPalette>) => {
    setCustomColorPaletteState((current) => ({
      ...(current ?? {}),
      ...palette,
    }));
    setColorSchemeState('custom');
  }, []);

  const resetToDefaults = React.useCallback(() => {
    setDesignLanguageState(defaultDesignLanguage);
    setCustomDesignPresetState(null);
    setColorSchemeState(defaultColorScheme);
    setCustomColorPaletteState(null);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [defaultDesignLanguage, defaultColorScheme]);

  const value = React.useMemo<DesignContextValue>(
    () => ({
      designLanguage,
      setDesignLanguage,
      customDesignPreset,
      setCustomDesignPreset,
      colorScheme,
      setColorScheme,
      colorPalette,
      setColorPalette,
      cssVariables,
      resetToDefaults,
    }),
    [
      designLanguage,
      setDesignLanguage,
      customDesignPreset,
      setCustomDesignPreset,
      colorScheme,
      setColorScheme,
      colorPalette,
      setColorPalette,
      cssVariables,
      resetToDefaults,
    ]
  );

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
}

export function useDesign(): DesignContextValue {
  const context = React.useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
}
