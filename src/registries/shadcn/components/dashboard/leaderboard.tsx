'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const LeaderBoard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    entries,
    showRankChange = true,
    showTopThree = true,
    valueLabel = 'Score',
    variant = 'default',
    style,
  } = element.props;

  const entriesArray = entries as Array<{
    id?: string | number;
    rank: number;
    name: string;
    avatar?: string;
    value: number;
    previousRank?: number;
    subtitle?: string;
  }>;

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-transparent',
    elevated: 'border-0 shadow-lg',
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return null;
  };

  const getRankChange = (current: number, previous?: number) => {
    if (previous === undefined) return null;
    const diff = previous - current;
    if (diff > 0) return { icon: TrendingUp, color: 'text-emerald-600', value: diff };
    if (diff < 0) return { icon: TrendingDown, color: 'text-rose-600', value: Math.abs(diff) };
    return { icon: Minus, color: 'text-muted-foreground', value: 0 };
  };

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {(!!title || !!description) && (
        <CardHeader>
          {!!title && <CardTitle>{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(!title && !description && 'pt-6')}>
        <div className="space-y-3">
          {entriesArray?.map((entry, idx) => {
            const rankChange = showRankChange ? getRankChange(entry.rank, entry.previousRank) : null;
            const isTopThree = showTopThree && entry.rank <= 3;

            return (
              <div
                key={entry.id || idx}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-lg',
                  isTopThree ? 'bg-muted/50' : 'hover:bg-muted/30 transition-colors'
                )}
              >
                <div className="flex items-center justify-center w-8">
                  {isTopThree ? (
                    getRankIcon(entry.rank)
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">
                      {entry.rank}
                    </span>
                  )}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.avatar} alt={entry.name} />
                  <AvatarFallback>{entry.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{entry.name}</p>
                  {!!entry.subtitle && (
                    <p className="text-xs text-muted-foreground truncate">{entry.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {rankChange && rankChange.value !== 0 && (
                    <span className={cn('flex items-center gap-0.5 text-xs', rankChange.color)}>
                      <rankChange.icon className="h-3 w-3" />
                      {rankChange.value}
                    </span>
                  )}
                  <div className="text-right">
                    <p className="font-semibold">{entry.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{valueLabel as React.ReactNode}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
