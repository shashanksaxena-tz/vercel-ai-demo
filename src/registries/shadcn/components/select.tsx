import React from 'react';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ComponentRenderProps, useDataBinding } from '@json-render/react';

export const Select = ({ element }: ComponentRenderProps) => {
  const { label, options, name, placeholder, style } = element.props;
  const [value, setValue] = useDataBinding(name as string);

  return (
    <div className="grid w-full items-center gap-1.5" style={style as React.CSSProperties}>
      {!!label && <Label>{label as string}</Label>}
      <ShadcnSelect value={value as string} onValueChange={(val) => setValue(val)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder as string} />
        </SelectTrigger>
        <SelectContent>
          {(options as any[])?.map((opt: any) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
};
