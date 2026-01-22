import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Metric = ({ element }: ComponentRenderProps) => {
  const { label, value, trend, trendDirection, style } = element.props;

  let TrendIcon = Minus;
  let trendColor = 'text-muted-foreground';

  if (trendDirection === 'up') {
    TrendIcon = TrendingUp;
    trendColor = 'text-green-600';
  } else if (trendDirection === 'down') {
    TrendIcon = TrendingDown;
    trendColor = 'text-red-600';
  }

  return (
    <Card style={style as React.CSSProperties}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label as React.ReactNode}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value as React.ReactNode}</div>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 mt-1 text-sm', trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span>{trend as React.ReactNode}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
