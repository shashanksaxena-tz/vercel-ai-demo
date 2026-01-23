import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const AspectRatio = ({ element, children }: ComponentRenderProps) => {
  const {
    ratio = '16/9',
    style
  } = element.props;

  const ratioMap: Record<string, string> = {
    square: '1/1',
    video: '16/9',
    portrait: '3/4',
    landscape: '4/3',
    wide: '21/9',
    ultrawide: '32/9',
  };

  const aspectRatio = ratioMap[ratio as string] || (ratio as string);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
