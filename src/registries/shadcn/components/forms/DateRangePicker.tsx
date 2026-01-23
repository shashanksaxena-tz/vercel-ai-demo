'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const DateRangePicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    placeholder = 'Select date range',
    minDate,
    maxDate,
    disabled = false,
    required = false,
    error,
    helperText,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const defaultValue = value as { start?: string; end?: string } | undefined;
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValue?.start ? new Date(defaultValue.start) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultValue?.end ? new Date(defaultValue.end) : null
  );
  const [selectingEnd, setSelectingEnd] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (minDate && date < new Date(minDate as string)) return true;
    if (maxDate && date > new Date(maxDate as string)) return true;
    return false;
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date > startDate && date < endDate;
  };

  const handleSelectDate = (day: number) => {
    if (isDateDisabled(day)) return;
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (!selectingEnd) {
      setStartDate(selectedDate);
      setEndDate(null);
      setSelectingEnd(true);
    } else {
      if (selectedDate < startDate!) {
        setStartDate(selectedDate);
        setEndDate(startDate);
      } else {
        setEndDate(selectedDate);
      }
      setSelectingEnd(false);
      setIsOpen(false);

      const range = {
        start: formatDate(selectedDate < startDate! ? selectedDate : startDate!),
        end: formatDate(selectedDate < startDate! ? startDate! : selectedDate),
      };
      onAction?.({
        name: 'change',
        params: { name, value: range },
      });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const displayValue = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate) {
      return `${formatDate(startDate)} - ...`;
    }
    return placeholder as string;
  };

  return (
    <div className="relative w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <button
        type="button"
        className={cn(
          'flex w-full h-10 items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !startDate && 'text-muted-foreground',
          !!(error) && 'border-destructive focus:ring-destructive'
        )}
        disabled={disabled as boolean}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {displayValue()}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 z-50 bg-popover border rounded-lg shadow-lg p-4 w-72">
          <div className="mb-2 text-xs text-muted-foreground text-center">
            {selectingEnd ? 'Select end date' : 'Select start date'}
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              type="button"
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-xs text-muted-foreground font-medium py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isStart = startDate && formatDate(currentDay) === formatDate(startDate);
              const isEnd = endDate && formatDate(currentDay) === formatDate(endDate);
              const inRange = isInRange(day);
              const isDisabled = isDateDisabled(day);

              return (
                <button
                  key={day}
                  type="button"
                  className={cn(
                    'h-8 w-8 rounded-md text-sm hover:bg-muted transition-colors',
                    (isStart || isEnd) && 'bg-primary text-primary-foreground hover:bg-primary',
                    inRange && 'bg-primary/20',
                    isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
                  )}
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
