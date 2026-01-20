import React from 'react';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ComponentRenderProps, useDataBinding } from '@json-render/react';

export const Checkbox = ({ element }: ComponentRenderProps) => {
  const { label, name, style } = element.props;
  const [value, setValue] = useDataBinding(name as string);

  return (
    <div className="flex items-center space-x-2" style={style as React.CSSProperties}>
      <ShadcnCheckbox
        id={name as string}
        checked={!!value}
        onCheckedChange={(checked) => setValue(checked)}
      />
      {!!label && (
        <Label
          htmlFor={name as string}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label as string}
        </Label>
      )}
    </div>
  );
};
