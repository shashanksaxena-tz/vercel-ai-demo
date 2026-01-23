'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BarChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    horizontal = false,
    stacked = false,
    showValues = true,
    showGrid = true,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    height = 300,
    style,
  } = element.props;

  const chartData = data as Array<{ label: string; value: number; values?: number[]; category?: string }>;
  const colorArray = colors as string[];

  if (!chartData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const maxValue = Math.max(
    ...chartData.map((d) => (d.values ? d.values.reduce((a, b) => a + b, 0) : d.value))
  );

  const getColor = (index: number) => colorArray[index % colorArray.length];

  if (horizontal) {
    return (
      <div className="w-full" style={style as React.CSSProperties}>
        {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
        <div className="space-y-3">
          {chartData.map((item, idx) => {
            const widthPercent = (item.value / maxValue) * 100;
            return (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20 truncate flex-shrink-0">
                  {item.label}
                </span>
                <div className="flex-1 h-8 bg-muted rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-500 flex items-center px-2"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: getColor(idx),
                    }}
                  >
                    {showValues && (
                      <span className="text-xs text-white font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
      <div
        className={cn(
          'relative border rounded-lg p-4 bg-card',
          showGrid && 'bg-[linear-gradient(to_right,transparent_calc(100%-1px),#e5e7eb_calc(100%-1px)),linear-gradient(to_bottom,transparent_calc(100%-1px),#e5e7eb_calc(100%-1px))] bg-[size:25%_25%]'
        )}
        style={{ height: height as number }}
      >
        <div className="flex items-end justify-around h-full gap-2 pt-4 pb-8">
          {chartData.map((item, idx) => {
            if (stacked && item.values) {
              const total = item.values.reduce((a, b) => a + b, 0);
              const heightPercent = (total / maxValue) * 100;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 h-full">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-12 rounded-t overflow-hidden flex flex-col-reverse"
                      style={{ height: `${heightPercent}%` }}
                    >
                      {item.values.map((val, vIdx) => (
                        <div
                          key={vIdx}
                          style={{
                            height: `${(val / total) * 100}%`,
                            backgroundColor: getColor(vIdx),
                          }}
                          title={`${val}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 truncate max-w-full">
                    {item.label}
                  </span>
                </div>
              );
            }

            const heightPercent = (item.value / maxValue) * 100;
            return (
              <div key={idx} className="flex flex-col items-center flex-1 h-full">
                <div className="flex-1 w-full flex items-end justify-center">
                  <div
                    className="w-full max-w-12 rounded-t transition-all duration-300 hover:opacity-80 relative"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: getColor(idx),
                    }}
                  >
                    {showValues && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2 truncate max-w-full">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
