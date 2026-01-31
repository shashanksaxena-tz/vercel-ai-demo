'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Section = ({ element, children }: ComponentRenderProps) => {
    const {
        id,
        padding = 'lg',
        background = 'default',
        fullWidth = false,
        maxWidth = 1200,
        style
    } = element.props;

    const paddingMap: Record<string, number> = {
        none: 0,
        xs: 16,
        sm: 32,
        md: 48,
        lg: 64,
        xl: 96,
        '2xl': 128,
    };

    const getBackgroundStyle = (): React.CSSProperties => {
        switch (background) {
            case 'muted':
                return { backgroundColor: '#fafafa' };
            case 'primary':
                return { backgroundColor: '#1677ff', color: 'white' };
            case 'secondary':
                return { backgroundColor: '#722ed1', color: 'white' };
            case 'dark':
                return { backgroundColor: '#141414', color: 'white' };
            case 'light':
                return { backgroundColor: 'white', color: '#141414' };
            case 'gradient':
                return { background: 'linear-gradient(135deg, rgba(22,119,255,0.1) 0%, transparent 50%, rgba(114,46,209,0.1) 100%)' };
            default:
                return {};
        }
    };

    const py = paddingMap[(padding as string) || 'lg'] || 64;

    return (
        <section
            id={id as string}
            style={{
                width: '100%',
                paddingTop: py,
                paddingBottom: py,
                ...getBackgroundStyle(),
                ...(style as React.CSSProperties || {}),
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: fullWidth ? '100%' : (typeof maxWidth === 'number' ? maxWidth : 1200),
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: 16,
                paddingRight: 16,
            }}>
                {children}
            </div>
        </section>
    );
};
