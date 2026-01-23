'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const AnalyticsChart = ({ element }: ComponentRenderProps) => {
  const {
    title,
    description,
    type = 'line',
    data,
    dataKey,
    categories,
    index = 'name',
    colors,
    height = 300,
    showGrid = true,
    showAxis = true,
    style,
  } = element.props;

  const chartConfig: ChartConfig = {};
  const cats = categories as string[] || [dataKey as string];

  cats?.forEach((cat, i) => {
    chartConfig[cat] = {
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1'),
      color: (colors as string[])?.[i] || `hsl(var(--chart-${(i % 5) + 1}))`,
    };
  });

  const renderChart = () => {
    const commonProps = {
      data: data as any[],
      accessibilityLayer: true,
    };

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
          {showAxis && (
            <>
              <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
            </>
          )}
          <ChartTooltip content={<ChartTooltipContent />} />
          {cats?.map((cat) => (
            <Bar key={cat} dataKey={cat} fill={`var(--color-${cat})`} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      );
    }

    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
          {showAxis && (
            <>
              <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
            </>
          )}
          <ChartTooltip content={<ChartTooltipContent />} />
          {cats?.map((cat) => (
            <Area
              key={cat}
              type="monotone"
              dataKey={cat}
              fill={`var(--color-${cat})`}
              stroke={`var(--color-${cat})`}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      );
    }

    // Default: line chart
    return (
      <LineChart {...commonProps}>
        {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
        {showAxis && (
          <>
            <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
          </>
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        {cats?.map((cat) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={`var(--color-${cat})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <Card className="overflow-hidden" style={style as React.CSSProperties}>
      {(!!title || !!description) && (
        <CardHeader className="pb-2">
          {!!title && <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-4 pt-0">
        <ChartContainer config={chartConfig} style={{ height: `${height}px`, width: '100%' }}>
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
