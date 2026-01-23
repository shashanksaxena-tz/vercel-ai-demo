import React from 'react';
import { Switch as ChakraSwitch, Field } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Switch = ({ element }: ComponentRenderProps) => {
    const { label, name, checked, style } = element.props;
    const labelText = label as string | undefined;

    return (
        <Field.Root style={style as React.CSSProperties}>
            <ChakraSwitch.Root
                defaultChecked={checked as boolean}
                name={name as string}
            >
                <ChakraSwitch.HiddenInput />
                <ChakraSwitch.Control>
                    <ChakraSwitch.Thumb />
                </ChakraSwitch.Control>
                {Boolean(labelText) && <ChakraSwitch.Label>{labelText}</ChakraSwitch.Label>}
            </ChakraSwitch.Root>
        </Field.Root>
    );
};
