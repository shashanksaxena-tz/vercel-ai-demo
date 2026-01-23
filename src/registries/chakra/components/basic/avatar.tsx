'use client';
import React from 'react';
import { Avatar as ChakraAvatar, Group } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element }: ComponentRenderProps) => {
    const { src, name, size = 'md', style, showBorder = false, status } = element.props;

    let chakraSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
    switch (size) {
        case 'xs':
            chakraSize = 'xs';
            break;
        case 'sm':
            chakraSize = 'sm';
            break;
        case 'lg':
            chakraSize = 'lg';
            break;
        case 'xl':
            chakraSize = 'xl';
            break;
        case '2xl':
            chakraSize = '2xl';
            break;
        default:
            chakraSize = 'md';
            break;
    }

    const avatarElement = (
        <ChakraAvatar.Root
            size={chakraSize}
            style={{
                border: showBorder ? '2px solid var(--chakra-colors-white)' : undefined,
                ...(style as React.CSSProperties)
            }}
        >
            <ChakraAvatar.Image src={src as string} />
            <ChakraAvatar.Fallback name={name as string} />
        </ChakraAvatar.Root>
    );

    if (status) {
        return (
            <div style={{ position: 'relative', display: 'inline-flex' }}>
                {avatarElement}
                <span
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '0.75rem',
                        height: '0.75rem',
                        borderRadius: '50%',
                        backgroundColor: status === 'online' ? '#48BB78' : status === 'busy' ? '#F56565' : status === 'away' ? '#ED8936' : '#A0AEC0',
                        border: '2px solid white',
                    }}
                />
            </div>
        );
    }

    return avatarElement;
};

export const AvatarGroup = ({ element, children }: ComponentRenderProps) => {
    const { max, size = 'md', style } = element.props;

    return (
        <Group gap="0" spaceX="-3" style={style as React.CSSProperties}>
            {children}
            {max && (
                <ChakraAvatar.Root size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}>
                    <ChakraAvatar.Fallback>+{max as number}</ChakraAvatar.Fallback>
                </ChakraAvatar.Root>
            )}
        </Group>
    );
};

export const AvatarBadge = ({ element }: ComponentRenderProps) => {
    const { src, name, size = 'md', badge, badgeColor = 'green', style } = element.props;

    return (
        <div style={{ position: 'relative', display: 'inline-flex', ...(style as React.CSSProperties) }}>
            <ChakraAvatar.Root size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}>
                <ChakraAvatar.Image src={src as string} />
                <ChakraAvatar.Fallback name={name as string} />
            </ChakraAvatar.Root>
            <span
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: 'translate(25%, 25%)',
                    minWidth: '1.25rem',
                    height: '1.25rem',
                    borderRadius: '9999px',
                    backgroundColor: badgeColor as string,
                    color: 'white',
                    fontSize: '0.625rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 0.25rem',
                    border: '2px solid white',
                }}
            >
                {badge as React.ReactNode}
            </span>
        </div>
    );
};
