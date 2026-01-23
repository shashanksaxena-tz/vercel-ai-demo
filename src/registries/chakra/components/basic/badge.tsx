'use client';
import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element }: ComponentRenderProps) => {
    const { children, variant = 'default', size = 'md', style } = element.props;

    let colorPalette = 'gray';
    let chakraVariant: 'solid' | 'subtle' | 'outline' | 'surface' | 'plain' = 'subtle';

    switch (variant) {
        case 'default':
            chakraVariant = 'subtle';
            colorPalette = 'gray';
            break;
        case 'secondary':
            chakraVariant = 'outline';
            colorPalette = 'gray';
            break;
        case 'destructive':
            chakraVariant = 'solid';
            colorPalette = 'red';
            break;
        case 'success':
            chakraVariant = 'solid';
            colorPalette = 'green';
            break;
        case 'warning':
            chakraVariant = 'solid';
            colorPalette = 'orange';
            break;
        case 'info':
            chakraVariant = 'solid';
            colorPalette = 'blue';
            break;
        case 'outline':
            chakraVariant = 'outline';
            break;
        case 'solid':
            chakraVariant = 'solid';
            break;
        default:
            chakraVariant = 'subtle';
            break;
    }

    return (
        <ChakraBadge
            colorPalette={colorPalette}
            variant={chakraVariant}
            size={size as 'sm' | 'md' | 'lg'}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
        </ChakraBadge>
    );
};

export const Tag = ({ element, onAction }: ComponentRenderProps) => {
    const { children, variant = 'default', size = 'md', closable = false, onClose, style } = element.props;

    let colorPalette = 'gray';

    switch (variant) {
        case 'primary':
            colorPalette = 'blue';
            break;
        case 'success':
            colorPalette = 'green';
            break;
        case 'warning':
            colorPalette = 'orange';
            break;
        case 'error':
            colorPalette = 'red';
            break;
        default:
            colorPalette = 'gray';
            break;
    }

    return (
        <ChakraBadge
            colorPalette={colorPalette}
            variant="subtle"
            size={size as 'sm' | 'md' | 'lg'}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                ...(style as React.CSSProperties)
            }}
        >
            {children as React.ReactNode}
            {closable && (
                <button
                    onClick={() => onClose && onAction?.({ name: onClose as string })}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0 0.25rem',
                        marginLeft: '0.25rem',
                        opacity: 0.7,
                    }}
                >
                    x
                </button>
            )}
        </ChakraBadge>
    );
};

export const StatusBadge = ({ element }: ComponentRenderProps) => {
    const { status = 'default', label, style } = element.props;

    const statusColors: Record<string, string> = {
        online: 'green',
        offline: 'gray',
        busy: 'red',
        away: 'orange',
        active: 'green',
        inactive: 'gray',
        pending: 'yellow',
        completed: 'green',
        failed: 'red',
        default: 'gray',
    };

    return (
        <ChakraBadge
            colorPalette={statusColors[status as string] || 'gray'}
            variant="subtle"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                ...(style as React.CSSProperties)
            }}
        >
            <span
                style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                }}
            />
            {(label || status) as React.ReactNode}
        </ChakraBadge>
    );
};
