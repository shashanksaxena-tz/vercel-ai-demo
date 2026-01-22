import React from 'react';
import { Box, Card as ChakraCard, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Card = ({ element, children }: ComponentRenderProps) => {
  const { title, description, content, footer, style } = element.props;

  return (
    <ChakraCard style={style as React.CSSProperties}>
      {(!!title || !!description) && (
        <CardHeader>
          {!!title && <Heading size="md">{title as string}</Heading>}
          {!!description && <Text pt="2" fontSize="sm">{description as string}</Text>}
        </CardHeader>
      )}
      <CardBody>
        {(element.props.children || children) as React.ReactNode}
        {!!content && <Box>{content as React.ReactNode}</Box>}
      </CardBody>
      {!!footer && (
        <CardFooter>
          {footer as React.ReactNode}
        </CardFooter>
      )}
    </ChakraCard>
  );
};
