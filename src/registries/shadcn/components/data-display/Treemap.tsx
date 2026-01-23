'use client';

import React, { useState, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface TreemapItem {
  name: string;
  value: number;
  children?: TreemapItem[];
  color?: string;
}

interface TreemapRect {
  x: number;
  y: number;
  width: number;
  height: number;
  item: TreemapItem;
  depth: number;
}

export const Treemap = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    showLabels = true,
    showValues = true,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6', '#ec4899'],
    height = 400,
    style,
  } = element.props;

  const treemapData = data as TreemapItem[];
  const colorArray = colors as string[];
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getColor = (index: number) => colorArray[index % colorArray.length];

  const calculateLayout = useMemo(() => {
    if (!treemapData?.length) return [];

    const total = treemapData.reduce((sum, item) => sum + item.value, 0);
    const rects: TreemapRect[] = [];
    let currentX = 0;
    let currentY = 0;
    let remainingWidth = 400;
    let remainingHeight = 300;
    let isHorizontal = true;

    treemapData.forEach((item, idx) => {
      const ratio = item.value / total;

      let rectWidth: number;
      let rectHeight: number;

      if (isHorizontal) {
        rectWidth = remainingWidth * ratio * (treemapData.length / (treemapData.length - idx));
        rectHeight = remainingHeight;
        if (idx % 2 === 1) {
          remainingWidth -= rectWidth;
          currentX += rectWidth;
        }
      } else {
        rectWidth = remainingWidth;
        rectHeight = remainingHeight * ratio * (treemapData.length / (treemapData.length - idx));
        if (idx % 2 === 0) {
          remainingHeight -= rectHeight;
          currentY += rectHeight;
        }
      }

      const width = (item.value / total) * 400;
      const x = rects.reduce((sum, r) => sum + r.width, 0);

      rects.push({
        x,
        y: 0,
        width,
        height: 300,
        item,
        depth: 0,
      });

      if (idx % 2 === 1) {
        isHorizontal = !isHorizontal;
      }
    });

    return rects;
  }, [treemapData]);

  if (!treemapData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const total = treemapData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
      <div
        className="relative border rounded-lg overflow-hidden bg-card"
        style={{ height: height as number }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {calculateLayout.map((rect, idx) => {
            const isHovered = hoveredItem === rect.item.name;
            return (
              <g key={idx}>
                <rect
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  fill={rect.item.color || getColor(idx)}
                  stroke="white"
                  strokeWidth="2"
                  className={cn(
                    'transition-all duration-200',
                    isHovered && 'opacity-80'
                  )}
                  onMouseEnter={() => setHoveredItem(rect.item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                />
                {showLabels && rect.width > 50 && rect.height > 30 && (
                  <text
                    x={rect.x + rect.width / 2}
                    y={rect.y + rect.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[12px] fill-white font-medium pointer-events-none"
                  >
                    {rect.item.name}
                  </text>
                )}
                {showValues && rect.width > 50 && rect.height > 50 && (
                  <text
                    x={rect.x + rect.width / 2}
                    y={rect.y + rect.height / 2 + 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-white/80 pointer-events-none"
                  >
                    {rect.item.value}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {treemapData.map((item, idx) => (
          <div
            key={item.name}
            className={cn(
              'flex items-center gap-2 transition-opacity',
              hoveredItem && hoveredItem !== item.name && 'opacity-50'
            )}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: item.color || getColor(idx) }}
            />
            <span className="text-sm">
              {item.name}{' '}
              <span className="text-muted-foreground">
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
