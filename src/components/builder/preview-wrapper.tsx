'use client';

/**
 * Preview Wrapper - Scopes design system variables to only the preview area
 *
 * This wrapper ensures that design system colors and styles only affect
 * the rendered UI components, not the application chrome/header.
 * It also applies framework-specific theme tokens (background, foreground, fonts).
 */

import * as React from 'react';
import { useDesign } from '@/lib/design';
import { useRegistry } from '@/lib/registry';
import { cn } from '@/lib/utils';

interface PreviewWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps the UI preview area with scoped design system variables
 * and framework-specific theming.
 */
export function PreviewWrapper({ children, className }: PreviewWrapperProps) {
  const { cssVariables } = useDesign();
  const { themeTokens, activeFramework } = useRegistry();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Apply CSS variables to this wrapper only, not the entire document
  React.useEffect(() => {
    if (!wrapperRef.current) return;

    const vars = cssVariables.split('\n').reduce((acc, line) => {
      const match = line.match(/(--[\w-]+):\s*([^;]+);/);
      if (match) {
        acc[match[1]] = match[2];
      }
      return acc;
    }, {} as Record<string, string>);

    // Apply variables to this element only
    for (const [key, value] of Object.entries(vars)) {
      wrapperRef.current.style.setProperty(key, value);
    }
  }, [cssVariables]);

  // Compute framework-specific inline styles from theme tokens
  const frameworkStyles = React.useMemo<React.CSSProperties>(() => {
    if (!themeTokens) return { isolation: 'isolate' as const };
    return {
      isolation: 'isolate' as const,
      backgroundColor: themeTokens.colors.background,
      color: themeTokens.colors.foreground,
      fontFamily: themeTokens.typography.fontFamily.sans,
      transition: 'background-color 0.3s ease, color 0.3s ease',
    };
  }, [themeTokens]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'preview-wrapper',
        className
      )}
      style={frameworkStyles}
      data-framework={activeFramework}
    >
      {children}
    </div>
  );
}

export default PreviewWrapper;
