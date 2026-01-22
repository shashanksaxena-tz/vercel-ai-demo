import React from 'react';
import { Card as ChakraCard, Heading, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Card = ({ element, children }: ComponentRenderProps) => {
    const { title, description, content, footer, style } = element.props;
    const titleText = title as string | undefined;
    const descriptionText = description as string | undefined;

    const contentNode = (content || children) as React.ReactNode;
    const footerNode = footer as React.ReactNode;

    return (
        <ChakraCard.Root style={style as React.CSSProperties}>
            {(titleText || descriptionText) && (
                <ChakraCard.Header>
                    {titleText && <Heading size="md">{titleText}</Heading>}
                    {descriptionText && <Text color="fg.muted">{descriptionText}</Text>}
                </ChakraCard.Header>
            )}
            <ChakraCard.Body>
                {contentNode}
            </ChakraCard.Body>
            {footerNode && (
                <ChakraCard.Footer>
                    {footerNode}
                </ChakraCard.Footer>
            )}
        </ChakraCard.Root>
    );
};
