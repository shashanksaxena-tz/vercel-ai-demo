import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RadioGroup = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    options = [],
    value,
    defaultValue,
    required = false,
    disabled = false,
    orientation = 'vertical',
    error,
    style
  } = element.props;

  const optionsArray = options as Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;

  const [selectedValue, setSelectedValue] = React.useState(
    (value || defaultValue) as string
  );

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onAction?.({
      name: 'change',
      params: { name, value: newValue },
    });
  };

  return (
    <fieldset
      className="w-full"
      style={style as React.CSSProperties}
      disabled={disabled as boolean}
    >
      {label ? (
        <legend className="text-sm font-medium mb-3">
          {label as string}
          {(required as boolean) && <span className="text-red-500 ml-1">*</span>}
        </legend>
      ) : null}
      <div
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        )}
      >
        {optionsArray.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start gap-3 cursor-pointer',
              !!(option.disabled || disabled) && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name={name as string}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={option.disabled || (disabled as boolean)}
                onChange={() => handleChange(option.value)}
                className="sr-only peer"
              />
              <div
                className={cn(
                  'h-4 w-4 rounded-full border border-primary ring-offset-background transition-all',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                  selectedValue === option.value && 'border-primary'
                )}
              >
                {selectedValue === option.value && (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium">{option.label}</span>
              {option.description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error ? <p className="mt-2 text-sm text-red-500">{error as string}</p> : null}
    </fieldset>
  );
};
