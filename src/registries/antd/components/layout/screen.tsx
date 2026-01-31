'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Screen = ({ element, children }: ComponentRenderProps) => {
    const {
        height = '100vh',
        width = '100vw',
        overflow = 'hidden',
        background,
        centered = false,
        style
    } = element.props;

    const getBackgroundStyle = (): React.CSSProperties => {
        switch (background) {
            case 'muted':
                return { backgroundColor: '#fafafa' };
            case 'dark':
                return { backgroundColor: '#141414', color: 'white' };
            case 'gradient':
                return { background: 'linear-gradient(135deg, rgba(22,119,255,0.1) 0%, transparent 50%, rgba(114,46,209,0.1) 100%)' };
            default:
                return { backgroundColor: 'white' };
        }
    };

    return (
        <div
            style={{
                height: height as string,
                width: width as string,
                overflow: overflow as 'hidden' | 'auto' | 'scroll' | 'visible',
                display: centered ? 'flex' : 'block',
                alignItems: centered ? 'center' : undefined,
                justifyContent: centered ? 'center' : undefined,
                ...getBackgroundStyle(),
                ...(style as React.CSSProperties || {}),
            }}
        >
            {children}
        </div>
    );
};
