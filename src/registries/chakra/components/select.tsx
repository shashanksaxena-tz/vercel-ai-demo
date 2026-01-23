import React from 'react';
import { NativeSelect, Field } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

interface SelectOption {
    label: string;
    value: string;
}

export const Select = ({ element }: ComponentRenderProps) => {
    const { label, options = [], name, placeholder, style } = element.props;
    const labelText = label as string | undefined;

    return (
        <Field.Root style={style as React.CSSProperties}>
            {Boolean(labelText) && <Field.Label>{labelText}</Field.Label>}
            <NativeSelect.Root>
                <NativeSelect.Field name={name as string} placeholder={placeholder as string}>
                    {(options as SelectOption[]).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
        </Field.Root>
    );
};
