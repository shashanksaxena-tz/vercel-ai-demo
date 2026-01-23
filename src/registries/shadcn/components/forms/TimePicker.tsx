'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

export const TimePicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    placeholder = 'Select time',
    disabled = false,
    required = false,
    format = '24h', // '12h' | '24h'
    minuteStep = 1,
    error,
    helperText,
    style
  } = element.props;

  const parseTime = (timeStr: string | undefined) => {
    if (!timeStr) return { hours: 12, minutes: 0, period: 'AM' };
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    return { hours, minutes, period: period || 'AM' };
  };

  const [isOpen, setIsOpen] = useState(false);
  const initialTime = parseTime(value as string);
  const [hours, setHours] = useState(initialTime.hours);
  const [minutes, setMinutes] = useState(initialTime.minutes);
  const [period, setPeriod] = useState(initialTime.period);

  const is12Hour = format === '12h';
  const maxHours = is12Hour ? 12 : 23;
  const minHours = is12Hour ? 1 : 0;

  const formatTime = () => {
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    return is12Hour ? `${h}:${m} ${period}` : `${h}:${m}`;
  };

  const incrementHours = () => {
    setHours((prev) => (prev >= maxHours ? minHours : prev + 1));
  };

  const decrementHours = () => {
    setHours((prev) => (prev <= minHours ? maxHours : prev - 1));
  };

  const incrementMinutes = () => {
    const step = minuteStep as number;
    setMinutes((prev) => {
      const next = prev + step;
      return next >= 60 ? 0 : next;
    });
  };

  const decrementMinutes = () => {
    const step = minuteStep as number;
    setMinutes((prev) => {
      const next = prev - step;
      return next < 0 ? 60 - step : next;
    });
  };

  const togglePeriod = () => {
    setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
  };

  const handleConfirm = () => {
    const timeValue = formatTime();
    setIsOpen(false);
    onAction?.({
      name: 'change',
      params: { name, value: timeValue },
    });
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
          !value && 'text-muted-foreground',
          !!(error) && 'border-destructive focus:ring-destructive'
        )}
        disabled={disabled as boolean}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Clock className="mr-2 h-4 w-4" />
        {value ? formatTime() : (placeholder as string)}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 z-50 bg-popover border rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-2">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="p-1 hover:bg-muted rounded"
                onClick={incrementHours}
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <div className="w-12 h-12 flex items-center justify-center text-2xl font-medium">
                {String(hours).padStart(2, '0')}
              </div>
              <button
                type="button"
                className="p-1 hover:bg-muted rounded"
                onClick={decrementHours}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <span className="text-2xl font-medium">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="p-1 hover:bg-muted rounded"
                onClick={incrementMinutes}
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <div className="w-12 h-12 flex items-center justify-center text-2xl font-medium">
                {String(minutes).padStart(2, '0')}
              </div>
              <button
                type="button"
                className="p-1 hover:bg-muted rounded"
                onClick={decrementMinutes}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* AM/PM */}
            {is12Hour && (
              <div className="flex flex-col items-center ml-2">
                <button
                  type="button"
                  className="p-1 hover:bg-muted rounded"
                  onClick={togglePeriod}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center text-lg font-medium">
                  {period}
                </div>
                <button
                  type="button"
                  className="p-1 hover:bg-muted rounded"
                  onClick={togglePeriod}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 text-sm rounded hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleConfirm}
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
