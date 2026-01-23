'use client';

import React, { useRef, useState, useCallback } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Upload, File, X, CloudUpload } from 'lucide-react';

export const FileDropzone = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    accept,
    multiple = true,
    disabled = false,
    required = false,
    maxSize,
    maxFiles = 10,
    error,
    helperText,
    style
  } = element.props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFiles = useCallback((newFiles: File[]): File[] => {
    let validFiles = newFiles;

    // Check max files
    if (files.length + validFiles.length > (maxFiles as number)) {
      validFiles = validFiles.slice(0, (maxFiles as number) - files.length);
    }

    // Check file size
    if (maxSize) {
      const maxBytes = (maxSize as number) * 1024 * 1024;
      validFiles = validFiles.filter((file) => file.size <= maxBytes);
    }

    // Check accepted types
    if (accept) {
      const acceptedTypes = (accept as string).split(',').map((t) => t.trim());
      validFiles = validFiles.filter((file) => {
        return acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.replace('/*', ''));
          }
          return file.type === type;
        });
      });
    }

    return validFiles;
  }, [files.length, maxFiles, maxSize, accept]);

  const handleFiles = useCallback((newFiles: File[]) => {
    const validFiles = validateFiles(newFiles);
    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    setFiles(updatedFiles);
    onAction?.({
      name: 'change',
      params: {
        name,
        value: updatedFiles,
        fileNames: updatedFiles.map((f) => f.name),
        fileSizes: updatedFiles.map((f) => f.size),
      },
    });
  }, [files, multiple, name, onAction, validateFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
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
          'relative flex flex-col items-center justify-center w-full min-h-[200px] p-6 rounded-lg border-2 border-dashed transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-input bg-background',
          !!(error) && 'border-destructive',
          !!(disabled) && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer hover:bg-muted/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <CloudUpload className={cn(
          'h-12 w-12 mb-4 transition-colors',
          isDragging ? 'text-primary' : 'text-muted-foreground'
        )} />
        <p className="text-lg font-medium mb-1">
          {isDragging ? 'Drop files here' : 'Drag and drop files here'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse
        </p>
        <div className="text-xs text-muted-foreground space-y-1 text-center">
          {accept && <p>Accepted: {accept as string}</p>}
          {maxSize && <p>Max size: {maxSize as number}MB per file</p>}
          {maxFiles && <p>Max files: {maxFiles as number}</p>}
        </div>

        <input
          ref={inputRef}
          type="file"
          name={name as string}
          accept={accept as string}
          multiple={multiple as boolean}
          disabled={disabled as boolean}
          className="sr-only"
          onChange={handleInputChange}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center p-3 bg-muted rounded-md"
            >
              <File className="h-5 w-5 mr-3 flex-shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                className="ml-2 p-1 text-muted-foreground hover:text-destructive rounded transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
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
