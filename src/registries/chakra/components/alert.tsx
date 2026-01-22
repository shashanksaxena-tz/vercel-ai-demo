import React from 'react';
import { Alert as ChakraAlert } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Alert = ({ element }: ComponentRenderProps) => {
    const { title, description, variant = 'default', style } = element.props;
    const titleText = title as string | undefined;
    const descriptionText = description as string | undefined;

    // Map variants to Chakra status
    let status: 'info' | 'warning' | 'success' | 'error' = 'info';

    switch (variant) {
        case 'destructive':
            status = 'error';
            break;
        case 'warning':
            status = 'warning';
            break;
        case 'success':
            status = 'success';
            break;
        case 'default':
        default:
            status = 'info';
            break;
    }

    return (
        <ChakraAlert.Root status={status} style={style as React.CSSProperties}>
            <ChakraAlert.Indicator />
            <ChakraAlert.Content>
                {titleText && <ChakraAlert.Title>{titleText}</ChakraAlert.Title>}
                {descriptionText && <ChakraAlert.Description>{descriptionText}</ChakraAlert.Description>}
            </ChakraAlert.Content>
        </ChakraAlert.Root>
    );
};
