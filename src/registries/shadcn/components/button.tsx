import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, children, onAction }: ComponentRenderProps) => {
  const { variant = 'primary', size = 'default', label, children: propsChildren, action, style } = element.props;

  const variantMap: Record<string, any> = {
    primary: 'default',
    secondary: 'secondary',
    danger: 'destructive',
    ghost: 'ghost',
    outline: 'outline',
    link: 'link',
    default: 'default'
  };

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    } else if (element.props.onClick && onAction) {
       onAction({ name: element.props.onClick as string });
    }
  };

  const content = label || propsChildren || children;

  return (
    <ShadcnButton
      variant={variantMap[variant as string] || 'default'}
      size={size as any}
      onClick={handleClick}
      style={style as React.CSSProperties}
    >
      {content as React.ReactNode}
    </ShadcnButton>
  );
};
