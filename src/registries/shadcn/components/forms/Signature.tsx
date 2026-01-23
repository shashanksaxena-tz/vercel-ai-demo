'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Eraser, Download } from 'lucide-react';

export const Signature = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    width = 400,
    height = 200,
    disabled = false,
    required = false,
    strokeColor = '#000000',
    strokeWidth = 2,
    backgroundColor = '#ffffff',
    error,
    helperText,
    style
  } = element.props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = backgroundColor as string;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = strokeColor as string;
    ctx.lineWidth = strokeWidth as number;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [backgroundColor, strokeColor, strokeWidth]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onAction?.({
      name: 'change',
      params: { name, value: dataUrl },
    });
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.fillStyle = backgroundColor as string;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);

    onAction?.({
      name: 'change',
      params: { name, value: null },
    });
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
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
          'relative rounded-md border-2 border-input overflow-hidden',
          !!(error) && 'border-destructive',
          !!(disabled) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <canvas
          ref={canvasRef}
          width={width as number}
          height={height as number}
          className="w-full touch-none"
          style={{ maxWidth: width as number }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        <div className="absolute top-2 right-2 flex gap-1">
          <button
            type="button"
            className={cn(
              'p-2 rounded bg-background/80 hover:bg-background border border-input transition-colors',
              !!(disabled) && 'cursor-not-allowed opacity-50'
            )}
            onClick={clearSignature}
            disabled={disabled as boolean}
            title="Clear"
          >
            <Eraser className="h-4 w-4" />
          </button>
          {hasSignature && (
            <button
              type="button"
              className="p-2 rounded bg-background/80 hover:bg-background border border-input transition-colors"
              onClick={downloadSignature}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>

        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-sm">Sign here</p>
          </div>
        )}
      </div>

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
