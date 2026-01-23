'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DealPipeline = ({ element, children }: ComponentRenderProps) => {
  const {
    stages,
    showValues = true,
    style
  } = element.props;

  const stageList = stages as Array<{ name: string; value: string; count: number }>;

  return (
    <div
      className={cn('w-full')}
      style={style as React.CSSProperties}
    >
      {stageList && (
        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
          {stageList.map((stage, i) => (
            <div key={i} className="text-center min-w-0">
              <p className="text-sm font-medium truncate">{stage.name}</p>
              {showValues && (
                <p className="text-lg font-bold text-primary">{stage.value}</p>
              )}
              <p className="text-xs text-muted-foreground">{stage.count} deals</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4 overflow-x-auto min-h-[400px]">
        {children}
      </div>
    </div>
  );
};
