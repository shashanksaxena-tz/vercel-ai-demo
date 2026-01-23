'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BubbleChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    xLabel,
    yLabel,
    showGrid = true,
    minBubbleSize = 5,
    maxBubbleSize = 30,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    height = 300,
    style,
  } = element.props;

  const chartData = data as Array<{
    x: number;
    y: number;
    size: number;
    label?: string;
    category?: string;
  }>;
  const colorArray = colors as string[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!chartData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const xValues = chartData.map((d) => d.x);
  const yValues = chartData.map((d) => d.y);
  const sizeValues = chartData.map((d) => d.size);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const sizeMin = Math.min(...sizeValues);
  const sizeMax = Math.max(...sizeValues);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  const sizeRange = sizeMax - sizeMin || 1;

  const categories = [...new Set(chartData.map((d) => d.category || 'default'))];
  const getColor = (category: string) => {
    const idx = categories.indexOf(category);
    return colorArray[idx % colorArray.length];
  };

  const getPosition = (x: number, y: number) => ({
    cx: 40 + ((x - xMin) / xRange) * 320,
    cy: 170 - ((y - yMin) / yRange) * 150,
  });

  const getBubbleSize = (size: number) => {
    const normalized = (size - sizeMin) / sizeRange;
    return (minBubbleSize as number) + normalized * ((maxBubbleSize as number) - (minBubbleSize as number));
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
      <div
        className="relative border rounded-lg bg-card overflow-hidden"
        style={{ height: height as number }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {showGrid && (
            <g stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4">
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`h${i}`} x1="40" y1={20 + i * 37.5} x2="360" y2={20 + i * 37.5} />
              ))}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`v${i}`} x1={40 + i * 80} y1="20" x2={40 + i * 80} y2="170" />
              ))}
            </g>
          )}

          {chartData.map((point, idx) => {
            const pos = getPosition(point.x, point.y);
            const bubbleSize = getBubbleSize(point.size);
            const isHovered = hoveredIndex === idx;
            return (
              <circle
                key={idx}
                cx={pos.cx}
                cy={pos.cy}
                r={isHovered ? bubbleSize + 2 : bubbleSize}
                fill={getColor(point.category || 'default')}
                fillOpacity={0.6}
                stroke={getColor(point.category || 'default')}
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <title>{`${point.label || ''} (${point.x}, ${point.y}, size: ${point.size})`}</title>
              </circle>
            );
          })}

          {xLabel && (
            <text x="200" y="190" textAnchor="middle" className="text-[10px] fill-muted-foreground">
              {xLabel as string}
            </text>
          )}
          {yLabel && (
            <text
              x="15"
              y="95"
              textAnchor="middle"
              transform="rotate(-90, 15, 95)"
              className="text-[10px] fill-muted-foreground"
            >
              {yLabel as string}
            </text>
          )}
        </svg>
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColor(cat) }}
              />
              <span className="text-sm text-muted-foreground">{cat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
