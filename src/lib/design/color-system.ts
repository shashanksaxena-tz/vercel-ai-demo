/**
 * Color System - Theme color management and generation
 *
 * Provides:
 * - ColorPalette interface for all theme colors
 * - Preset color schemes (Slate, Blue, Rose, etc.)
 * - Auto-generation of hover/foreground variants from base colors
 */

export interface ColorPalette {
  // Primary colors
  primary: string;
  primaryForeground: string;
  primaryHover: string;

  // Secondary colors
  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;

  // Accent colors
  accent: string;
  accentForeground: string;
  accentHover: string;

  // Destructive/Error colors
  destructive: string;
  destructiveForeground: string;
  destructiveHover: string;

  // Background colors
  background: string;
  foreground: string;

  // Card colors
  card: string;
  cardForeground: string;

  // Muted colors
  muted: string;
  mutedForeground: string;

  // Border & Input
  border: string;
  input: string;
  ring: string;

  // Popover
  popover: string;
  popoverForeground: string;
}

export type ColorScheme = 'slate' | 'blue' | 'rose' | 'green' | 'orange' | 'violet' | 'custom';

export const COLOR_SCHEMES: Record<Exclude<ColorScheme, 'custom'>, ColorPalette> = {
  slate: {
    primary: 'hsl(222.2, 47.4%, 11.2%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    primaryHover: 'hsl(222.2, 47.4%, 20%)',
    secondary: 'hsl(210, 40%, 96.1%)',
    secondaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
    secondaryHover: 'hsl(210, 40%, 90%)',
    accent: 'hsl(210, 40%, 96.1%)',
    accentForeground: 'hsl(222.2, 47.4%, 11.2%)',
    accentHover: 'hsl(210, 40%, 90%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    destructiveHover: 'hsl(0, 84.2%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222.2, 84%, 4.9%)',
    muted: 'hsl(210, 40%, 96.1%)',
    mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
    border: 'hsl(214.3, 31.8%, 91.4%)',
    input: 'hsl(214.3, 31.8%, 91.4%)',
    ring: 'hsl(222.2, 84%, 4.9%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(222.2, 84%, 4.9%)',
  },
  blue: {
    primary: 'hsl(221.2, 83.2%, 53.3%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    primaryHover: 'hsl(221.2, 83.2%, 45%)',
    secondary: 'hsl(210, 40%, 96.1%)',
    secondaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
    secondaryHover: 'hsl(210, 40%, 90%)',
    accent: 'hsl(210, 40%, 96.1%)',
    accentForeground: 'hsl(222.2, 47.4%, 11.2%)',
    accentHover: 'hsl(210, 40%, 90%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    destructiveHover: 'hsl(0, 84.2%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222.2, 84%, 4.9%)',
    muted: 'hsl(210, 40%, 96.1%)',
    mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
    border: 'hsl(214.3, 31.8%, 91.4%)',
    input: 'hsl(214.3, 31.8%, 91.4%)',
    ring: 'hsl(221.2, 83.2%, 53.3%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(222.2, 84%, 4.9%)',
  },
  rose: {
    primary: 'hsl(346.8, 77.2%, 49.8%)',
    primaryForeground: 'hsl(355.7, 100%, 97.3%)',
    primaryHover: 'hsl(346.8, 77.2%, 40%)',
    secondary: 'hsl(355.7, 100%, 97.3%)',
    secondaryForeground: 'hsl(346.8, 77.2%, 49.8%)',
    secondaryHover: 'hsl(355.7, 100%, 92%)',
    accent: 'hsl(355.7, 100%, 97.3%)',
    accentForeground: 'hsl(346.8, 77.2%, 49.8%)',
    accentHover: 'hsl(355.7, 100%, 92%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    destructiveHover: 'hsl(0, 84.2%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(240, 10%, 3.9%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(240, 10%, 3.9%)',
    muted: 'hsl(240, 4.8%, 95.9%)',
    mutedForeground: 'hsl(240, 3.8%, 46.1%)',
    border: 'hsl(240, 5.9%, 90%)',
    input: 'hsl(240, 5.9%, 90%)',
    ring: 'hsl(346.8, 77.2%, 49.8%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(240, 10%, 3.9%)',
  },
  green: {
    primary: 'hsl(142.1, 76.2%, 36.3%)',
    primaryForeground: 'hsl(355.7, 100%, 97.3%)',
    primaryHover: 'hsl(142.1, 76.2%, 28%)',
    secondary: 'hsl(142.1, 76.2%, 95%)',
    secondaryForeground: 'hsl(142.1, 76.2%, 36.3%)',
    secondaryHover: 'hsl(142.1, 76.2%, 90%)',
    accent: 'hsl(142.1, 76.2%, 95%)',
    accentForeground: 'hsl(142.1, 76.2%, 36.3%)',
    accentHover: 'hsl(142.1, 76.2%, 90%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    destructiveHover: 'hsl(0, 84.2%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(240, 10%, 3.9%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(240, 10%, 3.9%)',
    muted: 'hsl(240, 4.8%, 95.9%)',
    mutedForeground: 'hsl(240, 3.8%, 46.1%)',
    border: 'hsl(240, 5.9%, 90%)',
    input: 'hsl(240, 5.9%, 90%)',
    ring: 'hsl(142.1, 76.2%, 36.3%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(240, 10%, 3.9%)',
  },
  orange: {
    primary: 'hsl(24.6, 95%, 53.1%)',
    primaryForeground: 'hsl(60, 9.1%, 97.8%)',
    primaryHover: 'hsl(24.6, 95%, 45%)',
    secondary: 'hsl(60, 4.8%, 95.9%)',
    secondaryForeground: 'hsl(24, 9.8%, 10%)',
    secondaryHover: 'hsl(60, 4.8%, 90%)',
    accent: 'hsl(60, 4.8%, 95.9%)',
    accentForeground: 'hsl(24, 9.8%, 10%)',
    accentHover: 'hsl(60, 4.8%, 90%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(60, 9.1%, 97.8%)',
    destructiveHover: 'hsl(0, 84.2%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(20, 14.3%, 4.1%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(20, 14.3%, 4.1%)',
    muted: 'hsl(60, 4.8%, 95.9%)',
    mutedForeground: 'hsl(25, 5.3%, 44.7%)',
    border: 'hsl(20, 5.9%, 90%)',
    input: 'hsl(20, 5.9%, 90%)',
    ring: 'hsl(24.6, 95%, 53.1%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(20, 14.3%, 4.1%)',
  },
  violet: {
    primary: 'hsl(262.1, 83.3%, 57.8%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    primaryHover: 'hsl(262.1, 83.3%, 48%)',
    secondary: 'hsl(262.1, 83.3%, 95%)',
    secondaryForeground: 'hsl(262.1, 83.3%, 57.8%)',
    secondaryHover: 'hsl(262.1, 83.3%, 90%)',
    accent: 'hsl(262.1, 83.3%, 95%)',
    accentForeground: 'hsl(262.1, 83.3%, 57.8%)',
    accentHover: 'hsl(262.1, 83.3%, 90%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    destructiveHover: 'hsl(0, 84.2%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(224, 71.4%, 4.1%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(224, 71.4%, 4.1%)',
    muted: 'hsl(220, 14.3%, 95.9%)',
    mutedForeground: 'hsl(220, 8.9%, 46.1%)',
    border: 'hsl(220, 13%, 91%)',
    input: 'hsl(220, 13%, 91%)',
    ring: 'hsl(262.1, 83.3%, 57.8%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(224, 71.4%, 4.1%)',
  },
};

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'slate';

/**
 * Convert HSL string to RGB values
 */
function hslToRgb(hsl: string): { r: number; g: number; b: number } | null {
  const match = hsl.match(/hsl\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/);
  if (!match) return null;

  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Darken an HSL color
 */
export function darkenHsl(hsl: string, amount: number = 10): string {
  const match = hsl.match(/hsl\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/);
  if (!match) return hsl;

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = Math.max(0, parseFloat(match[3]) - amount);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Lighten an HSL color
 */
export function lightenHsl(hsl: string, amount: number = 10): string {
  const match = hsl.match(/hsl\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/);
  if (!match) return hsl;

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = Math.min(100, parseFloat(match[3]) + amount);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Get a contrasting foreground color for a given background
 */
export function getContrastingForeground(background: string): string {
  const rgb = hslToRgb(background);
  if (!rgb) return 'hsl(0, 0%, 0%)';

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)';
}

/**
 * Generate hover variant from base color
 */
export function generateHoverColor(baseColor: string): string {
  const rgb = hslToRgb(baseColor);
  if (!rgb) return darkenHsl(baseColor, 8);

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  // Darken light colors, lighten dark colors
  return luminance > 0.5 ? darkenHsl(baseColor, 8) : lightenHsl(baseColor, 8);
}

/**
 * Get CSS variables for a color palette
 */
export function getColorCSSVariables(palette: ColorPalette): Record<string, string> {
  return {
    '--primary': palette.primary,
    '--primary-foreground': palette.primaryForeground,
    '--primary-hover': palette.primaryHover,
    '--secondary': palette.secondary,
    '--secondary-foreground': palette.secondaryForeground,
    '--secondary-hover': palette.secondaryHover,
    '--accent': palette.accent,
    '--accent-foreground': palette.accentForeground,
    '--accent-hover': palette.accentHover,
    '--destructive': palette.destructive,
    '--destructive-foreground': palette.destructiveForeground,
    '--destructive-hover': palette.destructiveHover,
    '--background': palette.background,
    '--foreground': palette.foreground,
    '--card': palette.card,
    '--card-foreground': palette.cardForeground,
    '--muted': palette.muted,
    '--muted-foreground': palette.mutedForeground,
    '--border': palette.border,
    '--input': palette.input,
    '--ring': palette.ring,
    '--popover': palette.popover,
    '--popover-foreground': palette.popoverForeground,
  };
}

/**
 * Create a custom palette from a primary color
 */
export function createPaletteFromPrimary(primaryColor: string): ColorPalette {
  const basePalette = COLOR_SCHEMES.slate;

  return {
    ...basePalette,
    primary: primaryColor,
    primaryForeground: getContrastingForeground(primaryColor),
    primaryHover: generateHoverColor(primaryColor),
    ring: primaryColor,
  };
}
