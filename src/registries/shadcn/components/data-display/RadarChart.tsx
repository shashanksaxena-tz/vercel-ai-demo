'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RadarChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    title,
    series,
    showGrid = true,
    showLabels = true,
    fillOpacity = 0.2,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    size = 300,
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

  const numPoints = chartData.length;
  const angleStep = (2 * Math.PI) / numPoints;
  const maxValue = Math.max(
    ...chartData.flatMap((d) =>
      seriesNames ? seriesNames.map((s) => d[s] || 0) : [d.value]
    )
  );

  const getColor = (index: number) => colorArray[index % colorArray.length];

  const getPoint = (index: number, value: number, radius: number = 40) => {
    const angle = index * angleStep - Math.PI / 2;
    const normalizedValue = (value / maxValue) * radius;
    const x = 50 + normalizedValue * Math.cos(angle);
    const y = 50 + normalizedValue * Math.sin(angle);
    return { x, y };
  };

  const getPolygonPoints = (valueKey: string = 'value') => {
    return chartData
      .map((item, idx) => {
        const point = getPoint(idx, item[valueKey] || 0);
        return `${point.x},${point.y}`;
      })
      .join(' ');
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title as string}</h3>}
      <div className="flex flex-col items-center gap-4">
        <svg
          width={size as number}
          height={size as number}
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          {showGrid && (
            <g stroke="#e5e7eb" strokeWidth="0.5" fill="none">
              {gridLevels.map((level) => (
                <polygon
                  key={level}
                  points={chartData
                    .map((_, idx) => {
                      const point = getPoint(idx, maxValue * level);
                      return `${point.x},${point.y}`;
                    })
                    .join(' ')}
                />
              ))}
              {chartData.map((_, idx) => {
                const point = getPoint(idx, maxValue);
                return (
                  <line key={idx} x1="50" y1="50" x2={point.x} y2={point.y} />
                );
              })}
            </g>
          )}

          {seriesNames ? (
            seriesNames.map((s, i) => (
              <polygon
                key={s}
                points={getPolygonPoints(s)}
                fill={getColor(i)}
                fillOpacity={fillOpacity as number}
                stroke={getColor(i)}
                strokeWidth="2"
              />
            ))
          ) : (
            <polygon
              points={getPolygonPoints()}
              fill={getColor(0)}
              fillOpacity={fillOpacity as number}
              stroke={getColor(0)}
              strokeWidth="2"
            />
          )}

          {showLabels &&
            chartData.map((item, idx) => {
              const point = getPoint(idx, maxValue + 8);
              return (
                <text
                  key={idx}
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[4px] fill-muted-foreground"
                >
                  {item.label}
                </text>
              );
            })}
        </svg>

        {seriesNames && seriesNames.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4">
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
    </div>
  );
};
