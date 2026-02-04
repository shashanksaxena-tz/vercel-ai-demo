import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ComponentRenderProps } from '@json-render/react';

export const Icon = ({ element }: ComponentRenderProps) => {
    const { name, size = 24, color, style } = element.props;

    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[name as string];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return null;
    }

    return (
        <IconComponent
            size={size as number}
            color={color as string}
            style={style as React.CSSProperties}
        />
    );
};

