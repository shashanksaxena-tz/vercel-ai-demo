'use client';
import React from 'react';
import { Text as ChakraText, Heading, Code, Blockquote, Em, Strong, Mark } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Text = ({ element }: ComponentRenderProps) => {
    const { variant = 'p', children, style, color, size, weight, align, truncate, lineClamp } = element.props;

    const textProps = {
        style: style as React.CSSProperties,
        color: color as string,
        fontSize: size as string,
        fontWeight: weight as string,
        textAlign: align as 'left' | 'center' | 'right' | 'justify',
        truncate: truncate as boolean,
        lineClamp: lineClamp as number,
    };

    switch (variant) {
        case 'h1':
            return (
                <Heading as="h1" size="4xl" {...textProps}>
                    {children as React.ReactNode}
                </Heading>
            );
        case 'h2':
            return (
                <Heading as="h2" size="3xl" {...textProps}>
                    {children as React.ReactNode}
                </Heading>
            );
        case 'h3':
            return (
                <Heading as="h3" size="2xl" {...textProps}>
                    {children as React.ReactNode}
                </Heading>
            );
        case 'h4':
            return (
                <Heading as="h4" size="xl" {...textProps}>
                    {children as React.ReactNode}
                </Heading>
            );
        case 'h5':
            return (
                <Heading as="h5" size="lg" {...textProps}>
                    {children as React.ReactNode}
                </Heading>
            );
        case 'h6':
            return (
                <Heading as="h6" size="md" {...textProps}>
                    {children as React.ReactNode}
                </Heading>
            );
        case 'code':
            return (
                <Code style={style as React.CSSProperties}>
                    {children as React.ReactNode}
                </Code>
            );
        case 'blockquote':
            return (
                <Blockquote.Root style={style as React.CSSProperties}>
                    <Blockquote.Content>{children as React.ReactNode}</Blockquote.Content>
                </Blockquote.Root>
            );
        case 'em':
        case 'italic':
            return (
                <Em style={style as React.CSSProperties}>
                    {children as React.ReactNode}
                </Em>
            );
        case 'strong':
        case 'bold':
            return (
                <Strong style={style as React.CSSProperties}>
                    {children as React.ReactNode}
                </Strong>
            );
        case 'mark':
        case 'highlight':
            return (
                <Mark style={style as React.CSSProperties}>
                    {children as React.ReactNode}
                </Mark>
            );
        case 'small':
            return (
                <ChakraText fontSize="sm" {...textProps}>
                    {children as React.ReactNode}
                </ChakraText>
            );
        case 'muted':
            return (
                <ChakraText color="fg.muted" {...textProps}>
                    {children as React.ReactNode}
                </ChakraText>
            );
        case 'lead':
            return (
                <ChakraText fontSize="xl" color="fg.muted" {...textProps}>
                    {children as React.ReactNode}
                </ChakraText>
            );
        case 'p':
        default:
            return (
                <ChakraText {...textProps}>
                    {children as React.ReactNode}
                </ChakraText>
            );
    }
};

export const Heading_ = ({ element }: ComponentRenderProps) => {
    const { level = 1, children, style, size, color } = element.props;
    const as = `h${Math.min(Math.max(level as number, 1), 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    const sizeMap: Record<number, string> = {
        1: '4xl',
        2: '3xl',
        3: '2xl',
        4: 'xl',
        5: 'lg',
        6: 'md',
    };

    return (
        <Heading
            as={as}
            size={(size || sizeMap[level as number] || 'xl') as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'}
            color={color as string}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
        </Heading>
    );
};

export const Paragraph = ({ element }: ComponentRenderProps) => {
    const { children, style, color, size } = element.props;

    return (
        <ChakraText
            as="p"
            color={color as string}
            fontSize={size as string}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
        </ChakraText>
    );
};
