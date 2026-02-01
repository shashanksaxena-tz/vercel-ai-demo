/**
 * CSS Variable Injector - Runtime CSS custom property management
 *
 * Provides utilities to inject, remove, and query CSS custom properties
 * on the document root element. Handles SSR gracefully by checking for
 * browser environment before DOM manipulation.
 */

/** Prefix used to identify design system CSS variables */
const DESIGN_VAR_PREFIX = '--';

/**
 * Check if running in browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Inject CSS variables into the document root (:root)
 *
 * Applies CSS custom properties directly to document.documentElement,
 * enabling dynamic theming across all components.
 *
 * @param variables - Record of CSS variable names to values
 * @example
 * injectCSSVariables({
 *   '--primary': 'hsl(221.2, 83.2%, 53.3%)',
 *   '--radius-md': '0.375rem'
 * });
 */
export function injectCSSVariables(variables: Record<string, string>): void {
  if (!isBrowser()) {
    return;
  }

  const root = document.documentElement;

  for (const [key, value] of Object.entries(variables)) {
    // Ensure the key starts with -- for CSS custom properties
    const cssVarName = key.startsWith('--') ? key : `--${key}`;
    root.style.setProperty(cssVarName, value);
  }
}

/**
 * Remove CSS variables from the document root (:root)
 *
 * Removes specified CSS custom properties from document.documentElement.
 * Useful for cleanup when design context unmounts or resets.
 *
 * @param keys - Array of CSS variable names to remove
 * @example
 * removeCSSVariables(['--primary', '--radius-md']);
 */
export function removeCSSVariables(keys: string[]): void {
  if (!isBrowser()) {
    return;
  }

  const root = document.documentElement;

  for (const key of keys) {
    // Ensure the key starts with -- for CSS custom properties
    const cssVarName = key.startsWith('--') ? key : `--${key}`;
    root.style.removeProperty(cssVarName);
  }
}

/**
 * Get all current design system CSS variables from document root
 *
 * Retrieves all CSS custom properties currently set on the root element
 * that belong to the design system (prefixed with --).
 *
 * @returns Record of CSS variable names to their current values
 * @example
 * const vars = getAllCSSVariables();
 * // { '--primary': 'hsl(221.2, 83.2%, 53.3%)', '--radius-md': '0.375rem', ... }
 */
export function getAllCSSVariables(): Record<string, string> {
  if (!isBrowser()) {
    return {};
  }

  const root = document.documentElement;
  const inlineStyle = root.style;
  const variables: Record<string, string> = {};

  // Get variables from inline styles (ones we've injected)
  for (let i = 0; i < inlineStyle.length; i++) {
    const property = inlineStyle[i];
    if (property.startsWith(DESIGN_VAR_PREFIX)) {
      const value = inlineStyle.getPropertyValue(property).trim();
      if (value) {
        variables[property] = value;
      }
    }
  }

  return variables;
}

/**
 * Check if a specific CSS variable is currently set
 *
 * @param key - The CSS variable name to check
 * @returns true if the variable is set on the root element
 */
export function hasCSSVariable(key: string): boolean {
  if (!isBrowser()) {
    return false;
  }

  const cssVarName = key.startsWith('--') ? key : `--${key}`;
  const value = document.documentElement.style.getPropertyValue(cssVarName);
  return value !== '';
}

/**
 * Get a single CSS variable value
 *
 * @param key - The CSS variable name to retrieve
 * @returns The variable value or empty string if not set
 */
export function getCSSVariable(key: string): string {
  if (!isBrowser()) {
    return '';
  }

  const cssVarName = key.startsWith('--') ? key : `--${key}`;
  return document.documentElement.style.getPropertyValue(cssVarName).trim();
}

/**
 * Update a single CSS variable
 *
 * @param key - The CSS variable name
 * @param value - The new value to set
 */
export function setCSSVariable(key: string, value: string): void {
  if (!isBrowser()) {
    return;
  }

  const cssVarName = key.startsWith('--') ? key : `--${key}`;
  document.documentElement.style.setProperty(cssVarName, value);
}
