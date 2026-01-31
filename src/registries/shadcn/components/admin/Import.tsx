'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Import = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title = 'Import Data',
    acceptedFormats,
    maxSize,
    isProcessing = false,
    progress,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <h4 className="font-medium">{title as string}</h4>

      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center',
          isProcessing ? 'bg-muted/50' : 'hover:border-primary cursor-pointer'
        )}
        onClick={() => !isProcessing && onAction?.({ name: 'selectFile' })}
      >
        {isProcessing ? (
          <div className="space-y-2">
            <svg className="w-8 h-8 mx-auto animate-spin text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-muted-foreground">Processing...</p>
            {progress !== undefined && (
              <div className="w-full max-w-xs mx-auto">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{progress as React.ReactNode}%</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="font-medium">Drop file here or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">
              {acceptedFormats ? `Accepted: ${(acceptedFormats as string[]).join(', ')}` : 'CSV, JSON, or Excel files'}
            </p>
            {maxSize && (
              <p className="text-xs text-muted-foreground">Max size: {maxSize as string}</p>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onAction?.({ name: 'downloadTemplate' })}
          className="text-sm text-primary hover:underline"
        >
          Download template
        </button>
        <span className="text-muted-foreground">•</span>
        <button
          onClick={() => onAction?.({ name: 'viewHelp' })}
          className="text-sm text-primary hover:underline"
        >
          View import guide
        </button>
      </div>
    </div>
  );
};
