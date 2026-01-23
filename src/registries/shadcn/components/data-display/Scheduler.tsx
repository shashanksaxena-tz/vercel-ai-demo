'use client';

import React, { useState, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Scheduler = ({ element }: ComponentRenderProps) => {
  const {
    events,
    initialDate,
    view = 'week',
    startHour = 8,
    endHour = 18,
    slotHeight = 48,
    style,
  } = element.props;

  const eventsArray = events as Array<{
    id?: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    color?: string;
  }>;

  const [currentDate, setCurrentDate] = useState(() => {
    if (initialDate) return new Date(initialDate as string);
    return new Date();
  });

  const hours = useMemo(() => {
    const hrs = [];
    for (let i = startHour as number; i <= (endHour as number); i++) {
      hrs.push(i);
    }
    return hrs;
  }, [startHour, endHour]);

  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  }, [currentDate]);

  const getEventsForDay = (date: Date) => {
    if (!eventsArray) return [];
    const dateStr = date.toISOString().split('T')[0];
    return eventsArray.filter((e) => e.date === dateStr);
  };

  const getEventPosition = (event: { startTime: string; endTime: string }) => {
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours + minutes / 60;
    };

    const startTime = parseTime(event.startTime);
    const endTime = parseTime(event.endTime);
    const top = (startTime - (startHour as number)) * (slotHeight as number);
    const height = (endTime - startTime) * (slotHeight as number);

    return { top, height };
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden" style={style as React.CSSProperties}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <button
          onClick={() => navigateWeek(-1)}
          className="p-2 hover:bg-muted rounded-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="font-semibold">
          {monthNames[weekDays[0].getMonth()]} {weekDays[0].getDate()} -{' '}
          {monthNames[weekDays[6].getMonth()]} {weekDays[6].getDate()},{' '}
          {weekDays[6].getFullYear()}
        </h2>
        <button
          onClick={() => navigateWeek(1)}
          className="p-2 hover:bg-muted rounded-md"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="flex border-b">
        <div className="w-16 flex-shrink-0 border-r" />
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className={cn(
              'flex-1 p-2 text-center border-r last:border-r-0',
              isToday(day) && 'bg-primary/10'
            )}
          >
            <p className="text-xs text-muted-foreground">{dayNames[day.getDay()]}</p>
            <p className={cn('text-lg font-semibold', isToday(day) && 'text-primary')}>
              {day.getDate()}
            </p>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="flex overflow-auto" style={{ maxHeight: 600 }}>
        <div className="w-16 flex-shrink-0 border-r">
          {hours.map((hour) => (
            <div
              key={hour}
              className="border-b text-right pr-2 text-xs text-muted-foreground"
              style={{ height: slotHeight as number }}
            >
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        {weekDays.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={dayIdx} className="flex-1 border-r last:border-r-0 relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="border-b hover:bg-muted/30"
                  style={{ height: slotHeight as number }}
                />
              ))}
              {dayEvents.map((event, eIdx) => {
                const pos = getEventPosition(event);
                return (
                  <div
                    key={event.id || eIdx}
                    className="absolute left-1 right-1 rounded px-1 text-xs text-white overflow-hidden"
                    style={{
                      top: pos.top,
                      height: pos.height,
                      backgroundColor: event.color || '#3b82f6',
                    }}
                  >
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-white/80 text-[10px]">
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
