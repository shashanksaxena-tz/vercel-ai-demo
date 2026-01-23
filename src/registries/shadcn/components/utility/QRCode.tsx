'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const QRCode = ({ element }: ComponentRenderProps) => {
  const {
    value,
    size = 128,
    bgColor = '#ffffff',
    fgColor = '#000000',
    style
  } = element.props;

  // Note: In a real implementation, you would use a QR code library like 'qrcode'
  // This is a placeholder that shows how the component would be structured
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value as string)}&bgcolor=${(bgColor as string).replace('#', '')}&color=${(fgColor as string).replace('#', '')}`;

  return (
    <div
      className={cn('inline-block')}
      style={style as React.CSSProperties}
    >
      <img
        src={qrCodeUrl}
        alt="QR Code"
        width={size as number}
        height={size as number}
        className="rounded"
      />
    </div>
  );
};
