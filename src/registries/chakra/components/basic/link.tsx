'use client';
import React from 'react';
import { Link as ChakraLink, Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Link = ({ element, onAction }: ComponentRenderProps) => {
    const { href, children, external = false, action, color, style, underline = true } = element.props;

    const handleClick = (e: React.MouseEvent) => {
        if (action) {
            e.preventDefault();
            onAction?.({ name: action as string });
        }
    };

    return (
        <ChakraLink
            href={href as string}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            onClick={handleClick}
            color={color as string}
            textDecoration={underline ? 'underline' : 'none'}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
            {external && (
                <Box as="span" ml="1" display="inline">
                    ↗
                </Box>
            )}
        </ChakraLink>
    );
};

export const NavLink = ({ element, onAction }: ComponentRenderProps) => {
    const { href, children, active = false, action, style } = element.props;

    const handleClick = (e: React.MouseEvent) => {
        if (action) {
            e.preventDefault();
            onAction?.({ name: action as string });
        }
    };

    return (
        <ChakraLink
            href={href as string}
            onClick={handleClick}
            px="3"
            py="2"
            borderRadius="md"
            fontWeight={active ? 'semibold' : 'normal'}
            bg={active ? 'blue.50' : 'transparent'}
            color={active ? 'blue.600' : 'inherit'}
            _hover={{
                bg: 'gray.100',
                textDecoration: 'none',
            }}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
        </ChakraLink>
    );
};

export const LinkButton = ({ element, onAction }: ComponentRenderProps) => {
    const { href, children, action, variant = 'default', style } = element.props;

    const handleClick = (e: React.MouseEvent) => {
        if (action) {
            e.preventDefault();
            onAction?.({ name: action as string });
        }
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        default: {
            color: 'var(--chakra-colors-blue-600)',
        },
        muted: {
            color: 'var(--chakra-colors-gray-500)',
        },
        destructive: {
            color: 'var(--chakra-colors-red-600)',
        },
    };

    return (
        <ChakraLink
            href={href as string}
            onClick={handleClick}
            display="inline-flex"
            alignItems="center"
            gap="1"
            fontWeight="medium"
            textDecoration="none"
            _hover={{
                textDecoration: 'underline',
            }}
            style={{
                ...variantStyles[variant as string] || variantStyles.default,
                ...(style as React.CSSProperties)
            }}
        >
            {children as React.ReactNode}
        </ChakraLink>
    );
};

export const LinkOverlay = ({ element, onAction }: ComponentRenderProps) => {
    const { href, children, action, style } = element.props;

    const handleClick = (e: React.MouseEvent) => {
        if (action) {
            e.preventDefault();
            onAction?.({ name: action as string });
        }
    };

    return (
        <ChakraLink
            href={href as string}
            onClick={handleClick}
            position="static"
            _before={{
                content: '""',
                position: 'absolute',
                inset: 0,
                zIndex: 0,
            }}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
        </ChakraLink>
    );
};
