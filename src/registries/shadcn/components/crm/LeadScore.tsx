'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LeadScore = ({ element }: ComponentRenderProps) => {
  const {
    score,
    maxScore = 100,
    showLabel = true,
    size = 'md',
    style
  } = element.props;

  const percentage = ((score as number) / (maxScore as number)) * 100;

  const sizes = {
    sm: { ring: 'w-10 h-10', text: 'text-xs' },
    md: { ring: 'w-14 h-14', text: 'text-sm' },
    lg: { ring: 'w-20 h-20', text: 'text-base' },
  };

  const getColor = () => {
    if (percentage >= 80) return '#22c55e';
    if (percentage >= 60) return '#84cc16';
    if (percentage >= 40) return '#eab308';
    if (percentage >= 20) return '#f97316';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn('inline-flex flex-col items-center')}
      style={style as React.CSSProperties}
    >
      <div className={cn('relative', sizes[size as keyof typeof sizes]?.ring || sizes.md.ring)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className={cn(
          'absolute inset-0 flex items-center justify-center font-bold',
          sizes[size as keyof typeof sizes]?.text || sizes.md.text
        )}>
          {score as number}
        </span>
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground mt-1">Lead Score</span>
      )}
    </div>
  );
};
