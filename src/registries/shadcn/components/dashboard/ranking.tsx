'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Award, Star, TrendingUp, TrendingDown } from 'lucide-react';

export const Ranking = ({ element, children }: ComponentRenderProps) => {
  const {
    rank,
    total,
    label,
    previousRank,
    showBadge = true,
    showChange = true,
    size = 'default',
    style,
  } = element.props;

  const rankNum = Number(rank) || 0;
  const totalNum = Number(total);
  const previousNum = previousRank !== undefined ? Number(previousRank) : undefined;

  const getBadgeInfo = (r: number) => {
    if (r === 1) return { icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-100', label: '1st' };
    if (r === 2) return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-100', label: '2nd' };
    if (r === 3) return { icon: Award, color: 'text-amber-700', bg: 'bg-amber-50', label: '3rd' };
    if (r <= 10) return { icon: Star, color: 'text-blue-500', bg: 'bg-blue-50', label: `${r}th` };
    return null;
  };

  const badge = getBadgeInfo(rankNum);

  const getChangeInfo = () => {
    if (previousNum === undefined) return null;
    const diff = previousNum - rankNum;
    if (diff > 0) return { direction: 'up', value: diff, color: 'text-emerald-600' };
    if (diff < 0) return { direction: 'down', value: Math.abs(diff), color: 'text-rose-600' };
    return null;
  };

  const change = getChangeInfo();

  const sizeStyles = {
    sm: { container: 'gap-2', rank: 'text-2xl', badge: 'h-8 w-8', icon: 'h-4 w-4' },
    default: { container: 'gap-3', rank: 'text-4xl', badge: 'h-12 w-12', icon: 'h-6 w-6' },
    lg: { container: 'gap-4', rank: 'text-5xl', badge: 'h-16 w-16', icon: 'h-8 w-8' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <div
      className={cn('flex flex-col items-center', sizes.container)}
      style={style as React.CSSProperties}
    >
      {showBadge && badge && (
        <div className={cn('rounded-full flex items-center justify-center', badge.bg, sizes.badge)}>
          <badge.icon className={cn(badge.color, sizes.icon)} />
        </div>
      )}
      <div className="text-center">
        <div className="flex items-baseline gap-1 justify-center">
          <span className={cn('font-bold', sizes.rank)}>#{rankNum}</span>
          {totalNum && (
            <span className="text-sm text-muted-foreground">/ {totalNum}</span>
          )}
        </div>
        {!!label && (
          <p className="text-sm text-muted-foreground mt-1">{label as React.ReactNode}</p>
        )}
        {showChange && change && (
          <div className={cn('flex items-center justify-center gap-1 mt-2 text-sm font-medium', change.color)}>
            {change.direction === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{change.value} position{change.value !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
