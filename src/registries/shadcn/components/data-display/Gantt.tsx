'use client';

import React, { useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Gantt = ({ element }: ComponentRenderProps) => {
  const {
    tasks,
    startDate,
    endDate,
    showProgress = true,
    showDependencies = false,
    rowHeight = 40,
    columnWidth = 40,
    style,
  } = element.props;

  const tasksArray = tasks as Array<{
    id: string;
    name: string;
    start: string;
    end: string;
    progress?: number;
    color?: string;
    dependencies?: string[];
  }>;

  const { dates, dateRange } = useMemo(() => {
    if (!tasksArray?.length) return { dates: [], dateRange: { start: new Date(), end: new Date() } };

    const allDates = tasksArray.flatMap((t) => [new Date(t.start), new Date(t.end)]);
    const minDate = startDate ? new Date(startDate as string) : new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = endDate ? new Date(endDate as string) : new Date(Math.max(...allDates.map((d) => d.getTime())));

    const datesArr: Date[] = [];
    const current = new Date(minDate);
    while (current <= maxDate) {
      datesArr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return {
      dates: datesArr,
      dateRange: { start: minDate, end: maxDate },
    };
  }, [tasksArray, startDate, endDate]);

  const getTaskPosition = (task: { start: string; end: string }) => {
    const taskStart = new Date(task.start);
    const taskEnd = new Date(task.end);
    const rangeStart = dateRange.start.getTime();
    const totalDays = dates.length;

    const startOffset = Math.floor((taskStart.getTime() - rangeStart) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return {
      left: startOffset * (columnWidth as number),
      width: duration * (columnWidth as number),
    };
  };

  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };

  const formatMonth = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Group dates by month for header
  const months = useMemo(() => {
    const monthGroups: { month: string; days: number }[] = [];
    let currentMonth = '';
    let dayCount = 0;

    dates.forEach((date) => {
      const month = formatMonth(date);
      if (month !== currentMonth) {
        if (currentMonth) {
          monthGroups.push({ month: currentMonth, days: dayCount });
        }
        currentMonth = month;
        dayCount = 1;
      } else {
        dayCount++;
      }
    });
    if (currentMonth) {
      monthGroups.push({ month: currentMonth, days: dayCount });
    }

    return monthGroups;
  }, [dates]);

  if (!tasksArray?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No tasks to display
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden" style={style as React.CSSProperties}>
      <div className="flex">
        {/* Task Names Column */}
        <div className="flex-shrink-0 w-48 border-r bg-muted/30">
          <div className="h-16 border-b flex items-center justify-center font-semibold text-sm">
            Tasks
          </div>
          {tasksArray.map((task) => (
            <div
              key={task.id}
              className="px-3 border-b flex items-center text-sm font-medium truncate"
              style={{ height: rowHeight as number }}
            >
              {task.name}
            </div>
          ))}
        </div>

        {/* Timeline Area */}
        <div className="flex-1 overflow-x-auto">
          <div style={{ width: dates.length * (columnWidth as number) }}>
            {/* Month Header */}
            <div className="flex h-8 border-b">
              {months.map((m, idx) => (
                <div
                  key={idx}
                  className="border-r text-xs font-medium flex items-center justify-center bg-muted/50"
                  style={{ width: m.days * (columnWidth as number) }}
                >
                  {m.month}
                </div>
              ))}
            </div>

            {/* Day Header */}
            <div className="flex h-8 border-b">
              {dates.map((date, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'border-r text-xs flex items-center justify-center',
                    date.getDay() === 0 || date.getDay() === 6 ? 'bg-muted/30' : ''
                  )}
                  style={{ width: columnWidth as number }}
                >
                  {formatDate(date)}
                </div>
              ))}
            </div>

            {/* Task Rows */}
            {tasksArray.map((task) => {
              const pos = getTaskPosition(task);
              return (
                <div
                  key={task.id}
                  className="relative border-b"
                  style={{ height: rowHeight as number }}
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex">
                    {dates.map((date, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'border-r',
                          date.getDay() === 0 || date.getDay() === 6 ? 'bg-muted/30' : ''
                        )}
                        style={{ width: columnWidth as number }}
                      />
                    ))}
                  </div>

                  {/* Task Bar */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 rounded h-6 flex items-center overflow-hidden"
                    style={{
                      left: pos.left,
                      width: pos.width,
                      backgroundColor: task.color || '#3b82f6',
                    }}
                  >
                    {showProgress && task.progress !== undefined && (
                      <div
                        className="absolute inset-y-0 left-0 bg-black/20"
                        style={{ width: `${task.progress}%` }}
                      />
                    )}
                    <span className="relative z-10 px-2 text-xs text-white font-medium truncate">
                      {task.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
