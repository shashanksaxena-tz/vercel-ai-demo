'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Document = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    type,
    size,
    createdBy,
    createdAt,
    updatedAt,
    thumbnail,
    style
  } = element.props;

  const getIcon = () => {
    const fileType = (type as string)?.toLowerCase();
    if (fileType?.includes('pdf')) return '📄';
    if (fileType?.includes('doc') || fileType?.includes('word')) return '📝';
    if (fileType?.includes('xls') || fileType?.includes('excel') || fileType?.includes('sheet')) return '📊';
    if (fileType?.includes('ppt') || fileType?.includes('presentation')) return '📑';
    if (fileType?.includes('image') || fileType?.includes('png') || fileType?.includes('jpg')) return '🖼️';
    return '📎';
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewDocument', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        {thumbnail ? (
          <img src={thumbnail as string} alt="" className="w-12 h-12 rounded object-cover" />
        ) : (
          <span className="text-3xl">{getIcon()}</span>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{name as string}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {type && <span>{type as string}</span>}
            {size && <span>• {size as string}</span>}
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            {createdBy && <span>By {createdBy as string}</span>}
            {updatedAt ? <span>• Updated {updatedAt as string}</span> : createdAt && <span>• {createdAt as string}</span>}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'downloadDocument', payload: { id, name } } as never); }}
          className="p-2 hover:bg-muted rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};
