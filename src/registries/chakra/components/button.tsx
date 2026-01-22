import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, children, onAction }: ComponentRenderProps) => {
  const { variant = 'primary', size = 'md', label, children: propsChildren, action, style } = element.props;

  const getVariant = (v: string) => {
    switch (v) {
      case 'primary': return { colorScheme: 'blue', variant: 'solid' };
      case 'secondary': return { colorScheme: 'gray', variant: 'solid' };
      case 'danger': return { colorScheme: 'red', variant: 'solid' };
      case 'ghost': return { variant: 'ghost' };
      case 'outline': return { variant: 'outline' };
      case 'link': return { variant: 'link' };
      default: return { colorScheme: 'blue', variant: 'solid' };
    }
  };

  const { colorScheme, variant: chakraVariant } = getVariant(variant as string);

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    } else if (element.props.onClick && onAction) {
       onAction({ name: element.props.onClick as string });
    }
  };

  const content = label || propsChildren || children;

  return (
    <ChakraButton
      colorScheme={colorScheme}
      variant={chakraVariant}
      size={size as string}
      onClick={handleClick}
      style={style as React.CSSProperties}
    >
      {content as React.ReactNode}
    </ChakraButton>
  );
};
