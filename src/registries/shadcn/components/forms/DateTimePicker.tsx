'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

export const DateTimePicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    placeholder = 'Select date and time',
    minDate,
    maxDate,
    disabled = false,
    required = false,
    timeFormat = '24h',
    minuteStep = 1,
    error,
    helperText,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'date' | 'time'>('date');
  const [currentDate, setCurrentDate] = useState(new Date());

  const parseDateTime = (str: string | undefined) => {
    if (!str) return { date: null, hours: 12, minutes: 0, period: 'AM' };
    const dateTime = new Date(str);
    return {
      date: dateTime,
      hours: dateTime.getHours(),
      minutes: dateTime.getMinutes(),
      period: dateTime.getHours() >= 12 ? 'PM' : 'AM',
    };
  };

  const initialValue = parseDateTime(value as string);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialValue.date);
  const [hours, setHours] = useState(initialValue.hours);
  const [minutes, setMinutes] = useState(initialValue.minutes);
  const [period, setPeriod] = useState(initialValue.period);

  const is12Hour = timeFormat === '12h';
  const maxHours = is12Hour ? 12 : 23;
  const minHours = is12Hour ? 1 : 0;

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

  const formatTime = () => {
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    return is12Hour ? `${h}:${m} ${period}` : `${h}:${m}`;
  };

  const formatDateTime = () => {
    if (!selectedDate) return '';
    return `${formatDate(selectedDate)} ${formatTime()}`;
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (minDate && date < new Date(minDate as string)) return true;
    if (maxDate && date > new Date(maxDate as string)) return true;
    return false;
  };

  const handleSelectDate = (day: number) => {
    if (isDateDisabled(day)) return;
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setView('time');
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

  const handleConfirm = () => {
    if (!selectedDate) return;
    const dateTime = formatDateTime();
    setIsOpen(false);
    setView('date');
    onAction?.({
      name: 'change',
      params: { name, value: dateTime },
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
          !selectedDate && 'text-muted-foreground',
          !!(error) && 'border-destructive focus:ring-destructive'
        )}
        disabled={disabled as boolean}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {selectedDate ? formatDateTime() : (placeholder as string)}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 z-50 bg-popover border rounded-lg shadow-lg p-4 w-80">
          {/* Tabs */}
          <div className="flex border-b border-input mb-4">
            <button
              type="button"
              className={cn(
                'flex-1 py-2 text-sm font-medium border-b-2 transition-colors',
                view === 'date'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setView('date')}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Date
            </button>
            <button
              type="button"
              className={cn(
                'flex-1 py-2 text-sm font-medium border-b-2 transition-colors',
                view === 'time'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setView('time')}
            >
              <Clock className="h-4 w-4 inline mr-2" />
              Time
            </button>
          </div>

          {view === 'date' ? (
            <>
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
                  const isSelected =
                    selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentDate.getMonth() &&
                    selectedDate?.getFullYear() === currentDate.getFullYear();
                  const isDisabled = isDateDisabled(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      className={cn(
                        'h-8 w-8 rounded-md text-sm hover:bg-muted transition-colors',
                        isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
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
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="p-1 hover:bg-muted rounded"
                  onClick={() => setHours((prev) => (prev >= maxHours ? minHours : prev + 1))}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center text-2xl font-medium">
                  {String(hours).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  className="p-1 hover:bg-muted rounded"
                  onClick={() => setHours((prev) => (prev <= minHours ? maxHours : prev - 1))}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <span className="text-2xl font-medium">:</span>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="p-1 hover:bg-muted rounded"
                  onClick={() =>
                    setMinutes((prev) => {
                      const step = minuteStep as number;
                      return prev + step >= 60 ? 0 : prev + step;
                    })
                  }
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center text-2xl font-medium">
                  {String(minutes).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  className="p-1 hover:bg-muted rounded"
                  onClick={() =>
                    setMinutes((prev) => {
                      const step = minuteStep as number;
                      return prev - step < 0 ? 60 - step : prev - step;
                    })
                  }
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {is12Hour && (
                <div className="flex flex-col items-center ml-2">
                  <button
                    type="button"
                    className="p-1 hover:bg-muted rounded"
                    onClick={() => setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'))}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center text-lg font-medium">
                    {period}
                  </div>
                  <button
                    type="button"
                    className="p-1 hover:bg-muted rounded"
                    onClick={() => setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'))}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 text-sm rounded hover:bg-muted"
              onClick={() => {
                setIsOpen(false);
                setView('date');
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleConfirm}
              disabled={!selectedDate}
            >
              Confirm
            </button>
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
