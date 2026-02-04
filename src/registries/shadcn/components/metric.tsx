import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Metric = ({ element }: ComponentRenderProps) => {
  const { label, value, trend, trendDirection, style } = element.props;

  let TrendIcon = Minus;
  let trendColor = 'text-muted-foreground';
  let trendBg = 'bg-muted/50';

  if (trendDirection === 'up') {
    TrendIcon = TrendingUp;
    trendColor = 'text-emerald-600';
    trendBg = 'bg-emerald-50';
  } else if (trendDirection === 'down') {
    TrendIcon = TrendingDown;
    trendColor = 'text-rose-600';
    trendBg = 'bg-rose-50';
  }

  return (
    <Card
      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
      style={style as React.CSSProperties}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {label as React.ReactNode}
            </p>
            <p className="text-3xl font-bold tracking-tight">{value as React.ReactNode}</p>
          </div>
          {trend !== undefined && (
            <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium', trendColor, trendBg)}>
              <TrendIcon className="h-3.5 w-3.5" />
              <span>{trend as React.ReactNode}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
