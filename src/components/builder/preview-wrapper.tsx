'use client';

/**
 * Preview Wrapper - Scopes design system variables to only the preview area
 *
 * This wrapper ensures that design system colors and styles only affect
 * the rendered UI components, not the application chrome/header.
 */

import * as React from 'react';
import { useDesign } from '@/lib/design';
import { cn } from '@/lib/utils';

interface PreviewWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps the UI preview area with scoped design system variables
 */
export function PreviewWrapper({ children, className }: PreviewWrapperProps) {
  const { cssVariables } = useDesign();
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

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'preview-wrapper',
        // Use CSS variables for theming
        'bg-[var(--background)] text-[var(--foreground)]',
        className
      )}
      style={{
        // Ensure variables are scoped to this element
        isolation: 'isolate',
      }}
    >
      {children}
    </div>
  );
}

export default PreviewWrapper;
