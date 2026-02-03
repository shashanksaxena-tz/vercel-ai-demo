import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const Switch = ({ element }: ComponentRenderProps) => {
  const label = element.props.label as React.ReactNode;
  const name = element.props.name as string;
  const checked = element.props.checked as boolean;
  const style = element.props.style as React.CSSProperties;

  return (
    <div className="flex items-center space-x-2" style={style}>
      <ShadcnSwitch id={name} defaultChecked={checked} />
      {label ? (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      ) : null}
    </div>
  );
};
