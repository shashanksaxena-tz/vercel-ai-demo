'use client';

import React from 'react';
import { Tabs as ChakraTabs, Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

interface TabItem {
    label: string;
    value: string;
    content: React.ReactNode;
}

export const Tabs = ({ element }: ComponentRenderProps) => {
    const { items = [], defaultValue, style } = element.props;

    const tabItems = items as TabItem[];
    const initialValue = defaultValue as string || tabItems[0]?.value;

    return (
        <ChakraTabs.Root defaultValue={initialValue} style={style as React.CSSProperties}>
            <ChakraTabs.List>
                {tabItems.map((item) => (
                    <ChakraTabs.Trigger key={item.value} value={item.value}>
                        {item.label}
                    </ChakraTabs.Trigger>
                ))}
            </ChakraTabs.List>
            {tabItems.map((item) => (
                <ChakraTabs.Content key={item.value} value={item.value}>
                    <Box p={4}>
                        {item.content}
                    </Box>
                </ChakraTabs.Content>
            ))}
        </ChakraTabs.Root>
    );
};
