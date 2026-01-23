import React from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Checkbox = ({ element }: ComponentRenderProps) => {
    const { label, name, checked, style } = element.props;
    const labelText = label as string | undefined;

    return (
        <ChakraCheckbox.Root
            defaultChecked={checked as boolean}
            name={name as string}
            style={style as React.CSSProperties}
        >
            <ChakraCheckbox.HiddenInput />
            <ChakraCheckbox.Control />
            {Boolean(labelText) && <ChakraCheckbox.Label>{labelText}</ChakraCheckbox.Label>}
        </ChakraCheckbox.Root>
    );
};
