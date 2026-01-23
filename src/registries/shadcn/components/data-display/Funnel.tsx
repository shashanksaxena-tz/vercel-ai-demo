'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Funnel = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    showLabels = true,
    showValues = true,
    showPercentage = true,
    colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc'],
    height = 400,
    style,
  } = element.props;

  const funnelData = data as Array<{ label: string; value: number }>;
  const colorArray = colors as string[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!funnelData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const maxValue = funnelData[0]?.value || 1;
  const getColor = (index: number) => colorArray[index % colorArray.length];

  const stepHeight = (height as number) / funnelData.length;

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title as string}</h3>}
      <div className="relative" style={{ height: height as number }}>
        {funnelData.map((item, idx) => {
          const widthPercent = (item.value / maxValue) * 100;
          const prevPercent = idx > 0 ? (funnelData[idx - 1].value / maxValue) * 100 : 100;
          const conversionRate = idx > 0
            ? ((item.value / funnelData[idx - 1].value) * 100).toFixed(1)
            : '100';
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              className="relative flex items-center justify-center"
              style={{ height: stepHeight }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  'absolute h-full transition-all duration-300 flex items-center justify-center',
                  isHovered && 'z-10'
                )}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: getColor(idx),
                  clipPath: idx === funnelData.length - 1
                    ? 'none'
                    : `polygon(0 0, 100% 0, ${50 + (funnelData[idx + 1]?.value / maxValue) * 50}% 100%, ${50 - (funnelData[idx + 1]?.value / maxValue) * 50}% 100%)`,
                  opacity: isHovered ? 0.9 : 1,
                }}
              >
                {showLabels && (
                  <div className="text-white text-center z-10">
                    <p className="font-semibold">{item.label}</p>
                    {showValues && (
                      <p className="text-sm opacity-90">{item.value.toLocaleString()}</p>
                    )}
                  </div>
                )}
              </div>
              {showPercentage && idx > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-4 text-sm text-muted-foreground whitespace-nowrap">
                  {conversionRate}%
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {funnelData.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-2 transition-opacity',
              hoveredIndex !== null && hoveredIndex !== idx && 'opacity-50'
            )}
          >
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: getColor(idx) }}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
