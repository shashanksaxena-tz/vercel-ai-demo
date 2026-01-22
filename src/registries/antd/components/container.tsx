import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Container = ({ element, children }: ComponentRenderProps) => {
    const { maxWidth = '1200px', style } = element.props;

    return (
        <div
            style={{
                maxWidth: maxWidth as string,
                margin: '0 auto',
                padding: '0 16px',
                ...style as React.CSSProperties,
            }}
        >
            {children}
        </div>
    );
};
