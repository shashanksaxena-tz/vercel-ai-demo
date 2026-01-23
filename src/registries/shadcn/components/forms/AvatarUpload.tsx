'use client';

import React, { useRef, useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Camera, User, X } from 'lucide-react';

export const AvatarUpload = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    disabled = false,
    required = false,
    maxSize = 2,
    size = 'default',
    shape = 'circle',
    error,
    helperText,
    style
  } = element.props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>((value as string) || null);

  const sizeStyles = {
    sm: 'h-16 w-16',
    default: 'h-24 w-24',
    lg: 'h-32 w-32',
    xl: 'h-40 w-40',
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    default: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-16 w-16',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onAction?.({
        name: 'error',
        params: { name, error: 'Please select an image file' },
      });
      return;
    }

    // Validate file size
    const maxBytes = (maxSize as number) * 1024 * 1024;
    if (file.size > maxBytes) {
      onAction?.({
        name: 'error',
        params: { name, error: `Image must be less than ${maxSize}MB` },
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    onAction?.({
      name: 'change',
      params: {
        name,
        value: file,
        preview: url,
        fileName: file.name,
        fileSize: file.size,
      },
    });
  };

  const handleRemove = () => {
    if (preview && !value) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onAction?.({
      name: 'change',
      params: { name, value: null, preview: null },
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

      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            className={cn(
              'relative flex items-center justify-center bg-muted border-2 border-input overflow-hidden',
              sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
              shape === 'circle' ? 'rounded-full' : 'rounded-lg',
              !!(error) && 'border-destructive'
            )}
          >
            {preview ? (
              <img
                src={preview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className={cn('text-muted-foreground', iconSizes[(size as keyof typeof iconSizes) || 'default'])} />
            )}
          </div>

          {/* Upload button overlay */}
          <button
            type="button"
            className={cn(
              'absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg',
              'hover:bg-primary/90 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              !!(disabled) && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => !disabled && inputRef.current?.click()}
            disabled={disabled as boolean}
          >
            <Camera className="h-4 w-4" />
          </button>

          {/* Remove button */}
          {preview && (
            <button
              type="button"
              className={cn(
                'absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg',
                'hover:bg-destructive/90 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                !!(disabled) && 'opacity-50 cursor-not-allowed'
              )}
              onClick={handleRemove}
              disabled={disabled as boolean}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="flex-1">
          <button
            type="button"
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md border border-input bg-background',
              'hover:bg-muted transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              !!(disabled) && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => !disabled && inputRef.current?.click()}
            disabled={disabled as boolean}
          >
            {preview ? 'Change photo' : 'Upload photo'}
          </button>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG or GIF. Max {maxSize}MB.
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name as string}
        accept="image/*"
        disabled={disabled as boolean}
        className="sr-only"
        onChange={handleFileChange}
      />

      {(error || helperText) ? (
        <p className={cn('mt-2 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
