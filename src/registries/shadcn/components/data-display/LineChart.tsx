'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LineChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    series,
    showDots = true,
    showArea = false,
    smooth = true,
    showGrid = true,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    height = 300,
    style,
  } = element.props;

  const chartData = data as Array<{ label: string; value: number; [key: string]: any }>;
  const seriesNames = series as string[] | undefined;
  const colorArray = colors as string[];

  if (!chartData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const allValues = seriesNames
    ? seriesNames.flatMap((s) => chartData.map((d) => d[s] || 0))
    : chartData.map((d) => d.value);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue || 1;

  const getColor = (index: number) => colorArray[index % colorArray.length];

  const getPoints = (valueKey: string = 'value') => {
    return chartData.map((item, idx) => {
      const x = (idx / (chartData.length - 1)) * 380 + 10;
      const y = 190 - ((item[valueKey] - minValue) / range) * 170;
      return { x, y, value: item[valueKey], label: item.label };
    });
  };

  const getPath = (points: Array<{ x: number; y: number }>, filled = false) => {
    if (smooth) {
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        d += ` Q ${prev.x + (cpx - prev.x) * 0.5} ${prev.y}, ${cpx} ${(prev.y + curr.y) / 2}`;
        d += ` Q ${curr.x - (curr.x - cpx) * 0.5} ${curr.y}, ${curr.x} ${curr.y}`;
      }
      if (filled) {
        d += ` L ${points[points.length - 1].x} 190 L ${points[0].x} 190 Z`;
      }
      return d;
    }
    const linePoints = points.map((p) => `${p.x},${p.y}`).join(' L ');
    if (filled) {
      return `M ${points[0].x} 190 L ${linePoints} L ${points[points.length - 1].x} 190 Z`;
    }
    return `M ${linePoints}`;
  };

  const renderSeries = (valueKey: string, index: number) => {
    const points = getPoints(valueKey);
    const color = getColor(index);
    return (
      <g key={valueKey}>
        {showArea && (
          <path
            d={getPath(points, true)}
            fill={color}
            fillOpacity={0.1}
          />
        )}
        <path
          d={getPath(points)}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showDots &&
          points.map((point, idx) => (
            <circle
              key={idx}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke={color}
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          ))}
      </g>
    );
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
      <div
        className="relative border rounded-lg bg-card overflow-hidden"
        style={{ height: height as number }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          {showGrid && (
            <g stroke="#e5e7eb" strokeWidth="1">
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`h${i}`} x1="10" y1={20 + i * 42.5} x2="390" y2={20 + i * 42.5} />
              ))}
              {chartData.map((_, idx) => (
                <line
                  key={`v${idx}`}
                  x1={(idx / (chartData.length - 1)) * 380 + 10}
                  y1="20"
                  x2={(idx / (chartData.length - 1)) * 380 + 10}
                  y2="190"
                />
              ))}
            </g>
          )}
          {seriesNames
            ? seriesNames.map((s, i) => renderSeries(s, i))
            : renderSeries('value', 0)}
        </svg>
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
          {chartData.map((item, idx) => (
            <span key={idx} className="text-xs text-muted-foreground truncate" style={{ maxWidth: `${100 / chartData.length}%` }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
      {seriesNames && seriesNames.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {seriesNames.map((s, idx) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: getColor(idx) }}
              />
              <span className="text-sm text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
