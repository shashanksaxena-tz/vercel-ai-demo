'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ScatterChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    xLabel,
    yLabel,
    showGrid = true,
    dotSize = 6,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    height = 300,
    style,
  } = element.props;

  const chartData = data as Array<{ x: number; y: number; label?: string; category?: string }>;
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
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const categories = [...new Set(chartData.map((d) => d.category || 'default'))];
  const getColor = (category: string) => {
    const idx = categories.indexOf(category);
    return colorArray[idx % colorArray.length];
  };

  const getPosition = (x: number, y: number) => ({
    cx: 30 + ((x - xMin) / xRange) * 340,
    cy: 180 - ((y - yMin) / yRange) * 160,
  });

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
                <line key={`h${i}`} x1="30" y1={20 + i * 40} x2="370" y2={20 + i * 40} />
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={`v${i}`} x1={30 + i * 68} y1="20" x2={30 + i * 68} y2="180" />
              ))}
            </g>
          )}

          {chartData.map((point, idx) => {
            const pos = getPosition(point.x, point.y);
            const isHovered = hoveredIndex === idx;
            return (
              <circle
                key={idx}
                cx={pos.cx}
                cy={pos.cy}
                r={isHovered ? (dotSize as number) + 2 : (dotSize as number)}
                fill={getColor(point.category || 'default')}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <title>{`${point.label || ''} (${point.x}, ${point.y})`}</title>
              </circle>
            );
          })}

          {xLabel && (
            <text x="200" y="195" textAnchor="middle" className="text-[10px] fill-muted-foreground">
              {xLabel as string}
            </text>
          )}
          {yLabel && (
            <text
              x="10"
              y="100"
              textAnchor="middle"
              transform="rotate(-90, 10, 100)"
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

      {hoveredIndex !== null && (
        <div className="absolute top-2 right-2 bg-popover border rounded px-2 py-1 text-sm shadow-md">
          <p>
            {chartData[hoveredIndex].label && (
              <span className="font-medium">{chartData[hoveredIndex].label}: </span>
            )}
            ({chartData[hoveredIndex].x}, {chartData[hoveredIndex].y})
          </p>
        </div>
      )}
    </div>
  );
};
