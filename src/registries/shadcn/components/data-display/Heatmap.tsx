'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Heatmap = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    xLabels,
    yLabels,
    showValues = true,
    colorScale = ['#f0f9ff', '#0ea5e9', '#0369a1'],
    cellSize = 40,
    style,
  } = element.props;

  const heatmapData = data as number[][];
  const xAxisLabels = xLabels as string[];
  const yAxisLabels = yLabels as string[];
  const colors = colorScale as string[];
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  if (!heatmapData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const flatValues = heatmapData.flat();
  const minValue = Math.min(...flatValues);
  const maxValue = Math.max(...flatValues);
  const valueRange = maxValue - minValue || 1;

  const getColor = (value: number) => {
    const normalized = (value - minValue) / valueRange;
    if (colors.length === 2) {
      return interpolateColor(colors[0], colors[1], normalized);
    }
    if (normalized <= 0.5) {
      return interpolateColor(colors[0], colors[1], normalized * 2);
    }
    return interpolateColor(colors[1], colors[2], (normalized - 0.5) * 2);
  };

  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
      <div className="overflow-auto">
        <div className="inline-flex flex-col">
          {xAxisLabels && (
            <div className="flex ml-16">
              {xAxisLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="text-xs text-muted-foreground text-center"
                  style={{ width: cellSize as number }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
          {heatmapData.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center">
              {yAxisLabels && (
                <div className="w-16 text-xs text-muted-foreground text-right pr-2 truncate">
                  {yAxisLabels[rowIdx]}
                </div>
              )}
              {row.map((value, colIdx) => {
                const isHovered =
                  hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                return (
                  <div
                    key={colIdx}
                    className={cn(
                      'flex items-center justify-center border border-white/20 transition-all',
                      isHovered && 'ring-2 ring-primary z-10'
                    )}
                    style={{
                      width: cellSize as number,
                      height: cellSize as number,
                      backgroundColor: getColor(value),
                    }}
                    onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {showValues && (
                      <span
                        className={cn(
                          'text-xs font-medium',
                          (value - minValue) / valueRange > 0.5 ? 'text-white' : 'text-foreground'
                        )}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs text-muted-foreground">{minValue}</span>
        <div
          className="flex-1 h-3 rounded"
          style={{
            background: `linear-gradient(to right, ${colors.join(', ')})`,
          }}
        />
        <span className="text-xs text-muted-foreground">{maxValue}</span>
      </div>
    </div>
  );
};
