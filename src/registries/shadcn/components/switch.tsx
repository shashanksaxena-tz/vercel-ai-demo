import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const Switch = ({ element }: ComponentRenderProps) => {
  const { label, name, checked = false, style } = element.props;

  return (
    <div className="flex items-center space-x-2" style={style as React.CSSProperties}>
      <ShadcnSwitch id={name as string} defaultChecked={checked as boolean} />
      {!!label && (
        <Label htmlFor={name as string} className="text-sm font-medium">
          {label as React.ReactNode}
        </Label>
      )}
    </div>
  );
};
