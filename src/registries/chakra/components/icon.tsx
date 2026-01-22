import React from 'react';
import { Icon as ChakraIcon } from '@chakra-ui/react';
import * as LucideIcons from 'lucide-react';
import { ComponentRenderProps } from '@json-render/react';

export const Icon = ({ element }: ComponentRenderProps) => {
    const { name, size = 24, color, style } = element.props;

    // Get the icon from Lucide
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[name as string];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return null;
    }

    return (
        <ChakraIcon
            asChild
            style={{ ...style as React.CSSProperties, color: color as string }}
        >
            <IconComponent size={size as number} />
        </ChakraIcon>
    );
};
