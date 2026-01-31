import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Info, AlertTriangle, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';

export const Callout = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    content,
    variant = 'info',
    icon,
    style
  } = element.props;

  const variants: Record<string, { styles: string; icon: React.JSX.Element | null }> = {
    info: {
      styles: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
    warning: {
      styles: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    },
    error: {
      styles: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    },
    success: {
      styles: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    },
    tip: {
      styles: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-100',
      icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
    },
    default: {
      styles: 'bg-muted border-border',
      icon: null,
    },
  };

  const variantConfig = variants[(variant as keyof typeof variants) || 'info'];
  const IconElement = icon ? null : variantConfig.icon;

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        variantConfig.styles
      )}
      style={style as React.CSSProperties}
    >
      {IconElement && <div className="flex-shrink-0">{IconElement}</div>}
      <div className="flex-1 min-w-0">
        {title ? <p className="font-semibold mb-1">{title as string}</p> : null}
        {content ? (
          <p className="text-sm">{content as string}</p>
        ) : (
          <div className="text-sm">{children}</div>
        )}
      </div>
    </div>
  );
};
