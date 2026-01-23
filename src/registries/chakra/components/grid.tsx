import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
    const { columns = 2, gap = 4, style } = element.props;

    return (
        <SimpleGrid
            columns={columns as number}
            gap={gap as number}
            style={style as React.CSSProperties}
        >
            {children}
        </SimpleGrid>
    );
};
