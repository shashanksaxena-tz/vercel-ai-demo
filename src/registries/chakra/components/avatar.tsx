import React from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element }: ComponentRenderProps) => {
    const { src, fallback, alt, style } = element.props;

    return (
        <ChakraAvatar.Root style={style as React.CSSProperties}>
            <ChakraAvatar.Image src={src as string} alt={alt as string} />
            <ChakraAvatar.Fallback>
                {(fallback as string)?.slice(0, 2).toUpperCase() || 'U'}
            </ChakraAvatar.Fallback>
        </ChakraAvatar.Root>
    );
};
