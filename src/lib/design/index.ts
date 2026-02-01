/**
 * Design System Exports
 *
 * Provides design language presets, color system, and context for
 * global styling customization.
 */

export {
  type DesignLanguage,
  type DesignPreset,
  type CustomDesignPreset,
  DESIGN_PRESETS,
  DEFAULT_DESIGN_LANGUAGE,
  getDesignCSSVariables,
  getTailwindRadiusConfig,
} from './design-presets';

export {
  type ColorPalette,
  type ColorScheme,
  COLOR_SCHEMES,
  DEFAULT_COLOR_SCHEME,
  darkenHsl,
  lightenHsl,
  getContrastingForeground,
  generateHoverColor,
  getColorCSSVariables,
  createPaletteFromPrimary,
} from './color-system';

export {
  DesignProvider,
  useDesign,
  type DesignContextValue,
} from './design-context';

export { injectCSSVariables, removeCSSVariables, getAllCSSVariables } from './css-injector';
