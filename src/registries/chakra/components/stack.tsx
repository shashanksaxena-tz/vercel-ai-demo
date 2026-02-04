import React from 'react';
import { Stack as ChakraStack } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Stack = ({ element, children }: ComponentRenderProps) => {
    const { direction = 'column', gap = 4, style } = element.props;

    return (
        <ChakraStack
            direction={direction === 'row' ? 'row' : 'column'}
            gap={gap as number}
            style={style as React.CSSProperties}
        >
            {children}
        </ChakraStack>
    );
};
