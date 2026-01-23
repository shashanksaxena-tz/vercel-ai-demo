import React from 'react';
import { Input as ChakraInput, Field } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Input = ({ element }: ComponentRenderProps) => {
    const { label, placeholder, type = 'text', name, required, style } = element.props;
    const labelText = label as string | undefined;

    return (
        <Field.Root required={required as boolean} style={style as React.CSSProperties}>
            {Boolean(labelText) && <Field.Label>{labelText}</Field.Label>}
            <ChakraInput
                name={name as string}
                type={type as string}
                placeholder={placeholder as string}
            />
        </Field.Root>
    );
};
