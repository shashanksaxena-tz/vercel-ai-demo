'use client';

import React, { useState, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Calendar = ({ element }: ComponentRenderProps) => {
  const {
    events,
    initialDate,
    showHeader = true,
    showWeekNumbers = false,
    highlightToday = true,
    selectable = false,
    selectedDate: initialSelectedDate,
    onDateSelect,
    style,
  } = element.props;

  const eventsArray = events as Array<{
    date: string;
    title: string;
    color?: string;
  }>;

  const [currentDate, setCurrentDate] = useState(() => {
    if (initialDate) return new Date(initialDate as string);
    return new Date();
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (initialSelectedDate) return new Date(initialSelectedDate as string);
    return null;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { days, weeks } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    const remainingDays = 6 - lastDay.getDay();
    endDate.setDate(endDate.getDate() + remainingDays);

    const daysArr: Date[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      daysArr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const weeksArr: Date[][] = [];
    for (let i = 0; i < daysArr.length; i += 7) {
      weeksArr.push(daysArr.slice(i, i + 7));
    }

    return { days: daysArr, weeks: weeksArr };
  }, [currentDate]);

  const getEventsForDate = (date: Date) => {
    if (!eventsArray) return [];
    const dateStr = date.toISOString().split('T')[0];
    return eventsArray.filter((e) => e.date === dateStr);
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (selectable) {
      setSelectedDate(date);
    }
  };

  const getWeekNumber = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-muted rounded-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-muted rounded-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <div className={cn('grid bg-muted/50', showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7')}>
          {showWeekNumbers && (
            <div className="p-2 text-center text-xs font-medium text-muted-foreground">Wk</div>
          )}
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIdx) => (
          <div
            key={weekIdx}
            className={cn('grid border-t', showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7')}
          >
            {showWeekNumbers && (
              <div className="p-2 text-center text-xs text-muted-foreground bg-muted/30">
                {getWeekNumber(week[0])}
              </div>
            )}
            {week.map((date, dayIdx) => {
              const dateEvents = getEventsForDate(date);
              return (
                <div
                  key={dayIdx}
                  className={cn(
                    'min-h-[60px] p-1 border-l first:border-l-0',
                    !isCurrentMonth(date) && 'bg-muted/30',
                    selectable && 'cursor-pointer hover:bg-muted/50',
                    isSelected(date) && 'bg-primary/10'
                  )}
                  onClick={() => handleDateClick(date)}
                >
                  <div
                    className={cn(
                      'w-7 h-7 flex items-center justify-center text-sm',
                      !isCurrentMonth(date) && 'text-muted-foreground',
                      highlightToday && isToday(date) && 'bg-primary text-primary-foreground rounded-full',
                      isSelected(date) && !isToday(date) && 'bg-primary/20 rounded-full'
                    )}
                  >
                    {date.getDate()}
                  </div>
                  {dateEvents.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {dateEvents.slice(0, 2).map((event, eIdx) => (
                        <div
                          key={eIdx}
                          className="text-[10px] truncate rounded px-1"
                          style={{ backgroundColor: event.color || '#3b82f6', color: 'white' }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dateEvents.length > 2 && (
                        <div className="text-[10px] text-muted-foreground px-1">
                          +{dateEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
