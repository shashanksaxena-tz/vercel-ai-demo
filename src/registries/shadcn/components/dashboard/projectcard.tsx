'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Clock, MoreHorizontal } from 'lucide-react';

export const ProjectCard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    status = 'active',
    progress,
    dueDate,
    teamMembers,
    priority,
    variant = 'default',
    style,
  } = element.props;

  const statusConfig = {
    active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
    onHold: { label: 'On Hold', color: 'bg-amber-100 text-amber-700' },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-700' },
    cancelled: { label: 'Cancelled', color: 'bg-rose-100 text-rose-700' },
    planning: { label: 'Planning', color: 'bg-purple-100 text-purple-700' },
  };

  const config = statusConfig[(status as keyof typeof statusConfig) || 'active'];
  const teamArray = teamMembers as Array<{ name: string; avatar?: string }>;

  const variantStyles = {
    default: 'border shadow-sm hover:shadow-md transition-shadow',
    minimal: 'border shadow-none',
    elevated: 'border-0 shadow-lg',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            {!!title && <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>}
            {!!description && (
              <CardDescription className="line-clamp-2">{description as React.ReactNode}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={cn('px-2 py-1 text-xs font-medium rounded-full', config.color)}>
              {config.label}
            </span>
            <button className="p-1 rounded hover:bg-muted transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {progress !== undefined && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={Number(progress)} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          {!!dueDate && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {dueDate as React.ReactNode}
            </span>
          )}
          {teamArray && teamArray.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {teamArray.slice(0, 3).map((member, idx) => (
                  <Avatar key={idx} className="h-7 w-7 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                {teamArray.length > 3 && (
                  <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{teamArray.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {children}
      </CardContent>
    </Card>
  );
};
