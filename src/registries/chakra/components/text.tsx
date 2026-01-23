import React from 'react';
import { Text as ChakraText, Heading, Code, Blockquote } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Text = ({ element }: ComponentRenderProps) => {
    const { variant = 'p', children, content, style } = element.props;
    const textContent = (content || children) as React.ReactNode;

    switch (variant) {
        case 'h1':
            return (
                <Heading as="h1" size="4xl" style={style as React.CSSProperties}>
                    {textContent}
                </Heading>
            );
        case 'h2':
            return (
                <Heading as="h2" size="3xl" style={style as React.CSSProperties}>
                    {textContent}
                </Heading>
            );
        case 'h3':
            return (
                <Heading as="h3" size="2xl" style={style as React.CSSProperties}>
                    {textContent}
                </Heading>
            );
        case 'h4':
            return (
                <Heading as="h4" size="xl" style={style as React.CSSProperties}>
                    {textContent}
                </Heading>
            );
        case 'code':
            return (
                <Code style={style as React.CSSProperties}>
                    {textContent}
                </Code>
            );
        case 'blockquote':
            return (
                <Blockquote.Root style={style as React.CSSProperties}>
                    <Blockquote.Content>{textContent}</Blockquote.Content>
                </Blockquote.Root>
            );
        case 'p':
        default:
            return (
                <ChakraText style={style as React.CSSProperties}>
                    {textContent}
                </ChakraText>
            );
    }
};
