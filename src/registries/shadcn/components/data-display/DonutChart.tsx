'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DonutChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    centerLabel,
    centerValue,
    showLegend = true,
    showPercentage = true,
    thickness = 8,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'],
    size = 200,
    style,
  } = element.props;

  const chartData = data as Array<{ label: string; value: number }>;
  const colorArray = colors as string[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!chartData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const total = chartData.reduce((sum, d) => sum + d.value, 0);
  const getColor = (index: number) => colorArray[index % colorArray.length];

  const outerRadius = 40;
  const innerRadius = outerRadius - (thickness as number);

  const createArcPath = (startAngle: number, endAngle: number, isHovered: boolean) => {
    const r1 = isHovered ? outerRadius + 2 : outerRadius;
    const r2 = innerRadius;
    const startRad = (Math.PI * startAngle) / 180;
    const endRad = (Math.PI * endAngle) / 180;

    const x1Outer = 50 + r1 * Math.cos(startRad);
    const y1Outer = 50 + r1 * Math.sin(startRad);
    const x2Outer = 50 + r1 * Math.cos(endRad);
    const y2Outer = 50 + r1 * Math.sin(endRad);

    const x1Inner = 50 + r2 * Math.cos(endRad);
    const y1Inner = 50 + r2 * Math.sin(endRad);
    const x2Inner = 50 + r2 * Math.cos(startRad);
    const y2Inner = 50 + r2 * Math.sin(startRad);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1Outer} ${y1Outer} A ${r1} ${r1} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} L ${x1Inner} ${y1Inner} A ${r2} ${r2} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner} Z`;
  };

  let currentAngle = -90;
  const slices = chartData.map((item, idx) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
      percentage: ((item.value / total) * 100).toFixed(1),
    };
  });

  const displayLabel = hoveredIndex !== null ? chartData[hoveredIndex].label : (centerLabel as string);
  const displayValue = hoveredIndex !== null ? chartData[hoveredIndex].value : (centerValue || total);

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title as string}</h3>}
      <div className="flex flex-col items-center gap-4">
        <div className="relative" style={{ width: size as number, height: size as number }}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {slices.map((slice, idx) => (
              <path
                key={idx}
                d={createArcPath(slice.startAngle, slice.endAngle, hoveredIndex === idx)}
                fill={getColor(idx)}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage}%)`}</title>
              </path>
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-2xl font-bold">{displayValue}</p>
              {displayLabel && (
                <p className="text-xs text-muted-foreground">{displayLabel}</p>
              )}
            </div>
          </div>
        </div>
        {showLegend && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {chartData.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-center gap-2 transition-opacity cursor-pointer',
                  hoveredIndex !== null && hoveredIndex !== idx && 'opacity-50'
                )}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(idx) }}
                />
                <span className="text-sm">
                  {item.label}
                  {showPercentage && (
                    <span className="text-muted-foreground ml-1">
                      ({((item.value / total) * 100).toFixed(1)}%)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
