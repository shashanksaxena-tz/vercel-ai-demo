'use client';

import React, { useRef, useState, useCallback } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, X, Upload } from 'lucide-react';

interface UploadedImage {
  file: File;
  preview: string;
}

export const ImageUpload = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    accept = 'image/*',
    multiple = false,
    disabled = false,
    required = false,
    maxSize = 5,
    maxFiles = 10,
    error,
    helperText,
    aspectRatio,
    style
  } = element.props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFiles = useCallback((files: File[]) => {
    const maxBytes = (maxSize as number) * 1024 * 1024;
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > maxBytes) return false;
      return true;
    });

    const availableSlots = (maxFiles as number) - images.length;
    const filesToAdd = validFiles.slice(0, multiple ? availableSlots : 1);

    const newImages: UploadedImage[] = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = multiple ? [...images, ...newImages] : newImages;
    setImages(updatedImages);

    onAction?.({
      name: 'change',
      params: {
        name,
        value: updatedImages.map((img) => img.file),
        previews: updatedImages.map((img) => img.preview),
      },
    });
  }, [images, maxFiles, maxSize, multiple, name, onAction]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(Array.from(e.target.files || []));
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onAction?.({
      name: 'change',
      params: {
        name,
        value: newImages.map((img) => img.file),
        previews: newImages.map((img) => img.preview),
      },
    });
  };

  const aspectRatioStyle = aspectRatio
    ? { aspectRatio: aspectRatio as string }
    : { aspectRatio: '16/9' };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      {images.length === 0 || multiple ? (
        <div
          className={cn(
            'relative flex flex-col items-center justify-center w-full min-h-[150px] p-6 rounded-lg border-2 border-dashed transition-colors',
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
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-sm font-medium mb-1">
            {isDragging ? 'Drop images here' : 'Upload images'}
          </p>
          <p className="text-xs text-muted-foreground">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Max {maxSize}MB per image
          </p>
        </div>
      ) : null}

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

      {images.length > 0 && (
        <div className={cn('mt-4', multiple ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : '')}>
          {images.map((image, index) => (
            <div
              key={`${image.file.name}-${index}`}
              className="relative group rounded-lg overflow-hidden border border-input"
              style={aspectRatioStyle}
            >
              <img
                src={image.preview}
                alt={image.file.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  className="p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-xs text-white truncate">{image.file.name}</p>
                <p className="text-xs text-white/70">{formatFileSize(image.file.size)}</p>
              </div>
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
