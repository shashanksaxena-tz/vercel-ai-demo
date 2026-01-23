'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

export const MilestoneTracker = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    milestones,
    orientation = 'horizontal',
    variant = 'default',
    style,
  } = element.props;

  const milestonesArray = milestones as Array<{
    id?: string | number;
    title: string;
    date?: string;
    status: 'completed' | 'current' | 'upcoming' | 'delayed';
    description?: string;
  }>;

  const statusConfig = {
    completed: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100', line: 'bg-emerald-500' },
    current: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', line: 'bg-blue-500' },
    upcoming: { icon: Circle, color: 'text-muted-foreground', bg: 'bg-muted', line: 'bg-muted' },
    delayed: { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-100', line: 'bg-rose-500' },
  };

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-transparent',
    elevated: 'border-0 shadow-lg',
  };

  const isHorizontal = orientation === 'horizontal';

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {!!title && (
        <CardHeader>
          <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!title && 'pt-6')}>
        <div className={cn(
          'relative',
          isHorizontal ? 'flex items-start justify-between' : 'space-y-6'
        )}>
          {/* Connection Line */}
          <div className={cn(
            'absolute',
            isHorizontal
              ? 'top-5 left-5 right-5 h-0.5 bg-muted'
              : 'top-5 bottom-5 left-5 w-0.5 bg-muted'
          )} />

          {milestonesArray?.map((milestone, idx) => {
            const config = statusConfig[milestone.status];
            const Icon = config.icon;

            return (
              <div
                key={milestone.id || idx}
                className={cn(
                  'relative z-10',
                  isHorizontal ? 'flex flex-col items-center text-center flex-1' : 'flex gap-4'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 border-background',
                  config.bg
                )}>
                  <Icon className={cn('h-5 w-5', config.color)} />
                </div>
                <div className={cn(isHorizontal ? 'mt-3 px-2' : 'flex-1 pb-4')}>
                  <p className="font-medium text-sm">{milestone.title}</p>
                  {!!milestone.date && (
                    <p className="text-xs text-muted-foreground mt-0.5">{milestone.date}</p>
                  )}
                  {!!milestone.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {milestone.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
