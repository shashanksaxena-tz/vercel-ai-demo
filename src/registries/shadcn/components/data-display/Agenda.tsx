'use client';

import React, { useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Clock, MapPin, ChevronRight } from 'lucide-react';

export const Agenda = ({ element }: ComponentRenderProps) => {
  const {
    events,
    startDate,
    endDate,
    showEmptyDays = false,
    groupByDate = true,
    style,
  } = element.props;

  const eventsArray = events as Array<{
    id?: string;
    title: string;
    description?: string;
    date: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    color?: string;
  }>;

  const groupedEvents = useMemo(() => {
    if (!eventsArray?.length) return {};

    const sorted = [...eventsArray].sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return 0;
    });

    return sorted.reduce((groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {} as Record<string, typeof eventsArray>);
  }, [eventsArray]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      return 'Today';
    }
    if (eventDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!eventsArray?.length) {
    return (
      <div
        className="p-8 text-center text-muted-foreground border rounded-lg"
        style={style as React.CSSProperties}
      >
        No events scheduled
      </div>
    );
  }

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      {Object.entries(groupedEvents).map(([date, dateEvents]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 sticky top-0 bg-background py-1">
            {formatDate(date)}
          </h3>
          <div className="space-y-2">
            {dateEvents.map((event, idx) => (
              <div
                key={event.id || idx}
                className="flex gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: event.color || '#3b82f6' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium truncate">{event.title}</h4>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                      {event.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    {(event.startTime || event.endTime) && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {event.startTime}
                          {event.endTime && ` - ${event.endTime}`}
                        </span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
