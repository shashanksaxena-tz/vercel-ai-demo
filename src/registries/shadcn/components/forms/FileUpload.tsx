'use client';

import React, { useRef, useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export const FileUpload = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    accept,
    multiple = false,
    disabled = false,
    required = false,
    maxSize,
    maxFiles = 10,
    error,
    helperText,
    showProgress = true,
    style
  } = element.props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (uploadedFiles.length + files.length > (maxFiles as number)) {
      onAction?.({
        name: 'error',
        params: { name, error: `Maximum ${maxFiles} files allowed` },
      });
      return;
    }

    const newFiles: UploadedFile[] = files.map((file) => {
      if (maxSize && file.size > (maxSize as number) * 1024 * 1024) {
        return { file, progress: 0, status: 'error' as const, error: 'File too large' };
      }
      return { file, progress: 0, status: 'uploading' as const };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadedFile, index) => {
      if (uploadedFile.status === 'error') return;

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          setUploadedFiles((prev) =>
            prev.map((f, i) =>
              i === uploadedFiles.length + index
                ? { ...f, progress: 100, status: 'success' }
                : f
            )
          );

          onAction?.({
            name: 'upload',
            params: {
              name,
              file: uploadedFile.file,
              fileName: uploadedFile.file.name,
              fileSize: uploadedFile.file.size,
            },
          });
        } else {
          setUploadedFiles((prev) =>
            prev.map((f, i) =>
              i === uploadedFiles.length + index ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    onAction?.({
      name: 'remove',
      params: { name, index },
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

      <button
        type="button"
        className={cn(
          'flex flex-col items-center justify-center w-full h-32 rounded-md border-2 border-dashed border-input bg-background',
          'hover:bg-muted/50 transition-colors cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          !!(error) && 'border-destructive',
          !!(disabled) && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => inputRef.current?.click()}
        disabled={disabled as boolean}
      >
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Click to upload {multiple ? 'files' : 'a file'}
        </p>
        {accept && (
          <p className="text-xs text-muted-foreground mt-1">
            Accepted: {accept as string}
          </p>
        )}
        {maxSize && (
          <p className="text-xs text-muted-foreground">
            Max size: {maxSize as number}MB
          </p>
        )}
      </button>

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

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((uploadedFile, index) => (
            <div
              key={`${uploadedFile.file.name}-${index}`}
              className="flex items-center p-3 bg-muted rounded-md"
            >
              <File className="h-5 w-5 mr-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                  <div className="flex items-center ml-2">
                    {uploadedFile.status === 'uploading' && (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    )}
                    {uploadedFile.status === 'success' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {uploadedFile.status === 'error' && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(uploadedFile.file.size)}
                </p>
                {showProgress && uploadedFile.status === 'uploading' && (
                  <div className="mt-1 h-1 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${uploadedFile.progress}%` }}
                    />
                  </div>
                )}
                {uploadedFile.error && (
                  <p className="text-xs text-destructive mt-1">{uploadedFile.error}</p>
                )}
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
