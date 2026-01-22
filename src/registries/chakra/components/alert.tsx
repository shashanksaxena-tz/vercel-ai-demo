import React from 'react';
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Alert = ({ element }: ComponentRenderProps) => {
  const { title, description, variant = 'default', style } = element.props;

  const status = variant === 'destructive' ? 'error' : 'info';

  return (
    <ChakraAlert status={status} style={style as React.CSSProperties}>
      <AlertIcon />
      <Box>
        {!!title && <AlertTitle>{title as string}</AlertTitle>}
        {!!description && <AlertDescription>{description as string}</AlertDescription>}
      </Box>
    </ChakraAlert>
  );
};
