'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { FileText, Download, ExternalLink } from 'lucide-react';

export const PDF = ({ element }: ComponentRenderProps) => {
  const {
    src,
    title,
    width = '100%',
    height = 600,
    showToolbar = true,
    showDownload = true,
    fallbackMessage,
    variant = 'embed',
    style,
  } = element.props;

  if (variant === 'link') {
    return (
      <a
        href={src as string}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        style={style as React.CSSProperties}
      >
        <div className="p-2 bg-red-100 rounded-lg">
          <FileText className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{title as string || 'PDF Document'}</p>
          <p className="text-sm text-muted-foreground">Click to open</p>
        </div>
        <ExternalLink className="h-5 w-5 text-muted-foreground" />
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className="border rounded-lg overflow-hidden bg-card"
        style={style as React.CSSProperties}
      >
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-red-600" />
            <span className="font-medium">{title as string || 'PDF Document'}</span>
          </div>
          {showDownload && (
            <a
              href={src as string}
              download
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <Download className="h-4 w-4" />
            </a>
          )}
        </div>
        <iframe
          src={`${src}${showToolbar ? '' : '#toolbar=0'}`}
          title={title as string || 'PDF Document'}
          className="w-full"
          style={{ height: height as number }}
        />
      </div>
    );
  }

  // Default embed variant
  return (
    <div className="relative" style={style as React.CSSProperties}>
      <object
        data={`${src}${showToolbar ? '' : '#toolbar=0'}`}
        type="application/pdf"
        style={{ width: width as string | number, height: height as number }}
        className="rounded-lg"
      >
        <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg" style={{ height: height as number }}>
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center mb-4">
            {fallbackMessage as string || 'Unable to display PDF. Your browser may not support embedded PDFs.'}
          </p>
          <a
            href={src as string}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Open PDF
          </a>
        </div>
      </object>
    </div>
  );
};
