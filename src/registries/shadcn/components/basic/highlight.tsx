'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Highlight = ({ element, children }: ComponentRenderProps) => {
  const { content, color = 'yellow', gradient = false, className, style } = element.props;

  const colors = {
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    pink: 'bg-pink-100 dark:bg-pink-900/30',
    orange: 'bg-orange-100 dark:bg-orange-900/30',
  };

  const gradientStyles = {
    yellow: 'bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:via-yellow-800/20 dark:to-yellow-900/40',
    green: 'bg-gradient-to-r from-green-200 via-green-100 to-green-200 dark:from-green-900/40 dark:via-green-800/20 dark:to-green-900/40',
    blue: 'bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 dark:from-blue-900/40 dark:via-blue-800/20 dark:to-blue-900/40',
    purple: 'bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 dark:from-purple-900/40 dark:via-purple-800/20 dark:to-purple-900/40',
    pink: 'bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 dark:from-pink-900/40 dark:via-pink-800/20 dark:to-pink-900/40',
    orange: 'bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 dark:from-orange-900/40 dark:via-orange-800/20 dark:to-orange-900/40',
  };

  const colorKey = color as keyof typeof colors;

  return (
    <span
      className={cn(
        'px-1 py-0.5 rounded',
        gradient
          ? gradientStyles[colorKey] || gradientStyles.yellow
          : colors[colorKey] || colors.yellow,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </span>
  );
};
