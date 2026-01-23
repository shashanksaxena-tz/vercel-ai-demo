'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PieChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    showLabels = true,
    showLegend = true,
    showPercentage = true,
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

  const createSlicePath = (startAngle: number, endAngle: number, radius: number = 40) => {
    const startRad = (Math.PI * startAngle) / 180;
    const endRad = (Math.PI * endAngle) / 180;
    const x1 = 50 + radius * Math.cos(startRad);
    const y1 = 50 + radius * Math.sin(startRad);
    const x2 = 50 + radius * Math.cos(endRad);
    const y2 = 50 + radius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  let currentAngle = -90;
  const slices = chartData.map((item, idx) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const midAngle = startAngle + angle / 2;
    const labelRadius = 55;
    const labelX = 50 + labelRadius * Math.cos((Math.PI * midAngle) / 180);
    const labelY = 50 + labelRadius * Math.sin((Math.PI * midAngle) / 180);

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
      labelX,
      labelY,
      percentage: ((item.value / total) * 100).toFixed(1),
    };
  });

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title as string}</h3>}
      <div className="flex flex-col items-center gap-4">
        <div className="relative" style={{ width: size as number, height: size as number }}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {slices.map((slice, idx) => (
              <path
                key={idx}
                d={createSlicePath(slice.startAngle, slice.endAngle, hoveredIndex === idx ? 42 : 40)}
                fill={getColor(idx)}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage}%)`}</title>
              </path>
            ))}
          </svg>
          {hoveredIndex !== null && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-lg font-bold">{slices[hoveredIndex].value}</p>
                <p className="text-xs text-muted-foreground">{slices[hoveredIndex].label}</p>
              </div>
            </div>
          )}
        </div>
        {showLegend && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {chartData.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-center gap-2 transition-opacity',
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
