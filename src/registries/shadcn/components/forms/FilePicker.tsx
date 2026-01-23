'use client';

import React, { useRef, useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { File, X } from 'lucide-react';

export const FilePicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    placeholder = 'Choose file',
    accept,
    multiple = false,
    disabled = false,
    required = false,
    maxSize,
    error,
    helperText,
    style
  } = element.props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (maxSize) {
      const maxBytes = (maxSize as number) * 1024 * 1024;
      const oversizedFiles = files.filter((file) => file.size > maxBytes);
      if (oversizedFiles.length > 0) {
        onAction?.({
          name: 'error',
          params: { name, error: `File(s) exceed maximum size of ${maxSize}MB` },
        });
        return;
      }
    }

    setSelectedFiles(files);
    onAction?.({
      name: 'change',
      params: {
        name,
        value: files,
        fileNames: files.map((f) => f.name),
        fileSizes: files.map((f) => f.size),
      },
    });
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onAction?.({
      name: 'change',
      params: {
        name,
        value: newFiles,
        fileNames: newFiles.map((f) => f.name),
        fileSizes: newFiles.map((f) => f.size),
      },
    });
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div
        className={cn(
          'flex items-center rounded-md border border-input bg-background',
          !!(error) && 'border-destructive',
          !!(disabled) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <button
          type="button"
          className={cn(
            'flex items-center h-10 px-4 bg-muted border-r border-input rounded-l-md text-sm font-medium',
            'hover:bg-muted/80 transition-colors',
            !!(disabled) && 'cursor-not-allowed'
          )}
          onClick={() => inputRef.current?.click()}
          disabled={disabled as boolean}
        >
          <File className="h-4 w-4 mr-2" />
          Browse
        </button>
        <div className="flex-1 px-3 py-2 text-sm truncate">
          {selectedFiles.length > 0
            ? selectedFiles.map((f) => f.name).join(', ')
            : (placeholder as string)}
        </div>
        <input
          ref={inputRef}
          type="file"
          name={name as string}
          accept={accept as string}
          multiple={multiple as boolean}
          disabled={disabled as boolean}
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-2 space-y-1">
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between px-3 py-2 bg-muted rounded text-sm"
            >
              <div className="flex items-center flex-1 min-w-0">
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
                <span className="ml-2 text-muted-foreground flex-shrink-0">
                  ({formatFileSize(file.size)})
                </span>
              </div>
              <button
                type="button"
                className="ml-2 text-muted-foreground hover:text-destructive"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
