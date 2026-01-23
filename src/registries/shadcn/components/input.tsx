import React from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ComponentRenderProps, useDataBinding } from '@json-render/react';

export const Input = ({ element }: ComponentRenderProps) => {
  const { label, placeholder, type = 'text', name, required, style } = element.props;

  const [value, setValue] = useDataBinding(name as string);

  return (
    <div className="grid w-full items-center gap-1.5" style={style as React.CSSProperties}>
      {!!label && <Label htmlFor={name as string}>{label as string}</Label>}
      <ShadcnInput
        id={name as string}
        type={type as string}
        placeholder={placeholder as string}
        value={(value as string) || ''}
        onChange={(e) => setValue(e.target.value)}
        required={required as boolean}
      />
    </div>
  );
};
