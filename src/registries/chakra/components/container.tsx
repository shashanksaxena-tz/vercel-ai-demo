import React from 'react';
import { Container as ChakraContainer } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Container = ({ element, children }: ComponentRenderProps) => {
    const { maxWidth = '7xl', style } = element.props;

    return (
        <ChakraContainer
            maxW={maxWidth as string}
            style={style as React.CSSProperties}
        >
            {children}
        </ChakraContainer>
    );
};
