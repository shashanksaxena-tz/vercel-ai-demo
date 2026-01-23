'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Printer, RotateCw, FileText } from 'lucide-react';

export const PDFViewer = ({ element }: ComponentRenderProps) => {
  const {
    src,
    title,
    initialPage = 1,
    totalPages,
    showToolbar = true,
    showNavigation = true,
    showZoom = true,
    showDownload = true,
    showPrint = true,
    height = 600,
    style,
  } = element.props;

  const [currentPage, setCurrentPage] = useState(initialPage as number);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    if (totalPages) {
      setCurrentPage((prev) => Math.min(totalPages as number, prev + 1));
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(200, prev + 25));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(50, prev - 25));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePrint = () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = src as string;
    document.body.appendChild(iframe);
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  };

  // Build PDF URL with page parameter
  const pdfUrl = `${src}#page=${currentPage}&zoom=${zoom}`;

  return (
    <div
      className="border rounded-lg overflow-hidden bg-card"
      style={style as React.CSSProperties}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              <span className="font-medium text-sm truncate max-w-[200px]">
                {title as string || 'PDF Document'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation */}
            {showNavigation && (
              <div className="flex items-center gap-1 px-2 border-r">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="p-1.5 hover:bg-muted rounded disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1 text-sm">
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 px-2 py-1 text-center border rounded text-sm"
                    min={1}
                    max={totalPages as number}
                  />
                  {totalPages && (
                    <>
                      <span className="text-muted-foreground">/</span>
                      <span>{totalPages as number}</span>
                    </>
                  )}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={totalPages ? currentPage >= (totalPages as number) : false}
                  className="p-1.5 hover:bg-muted rounded disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Zoom */}
            {showZoom && (
              <div className="flex items-center gap-1 px-2 border-r">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 50}
                  className="p-1.5 hover:bg-muted rounded disabled:opacity-50"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-sm min-w-[3rem] text-center">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 200}
                  className="p-1.5 hover:bg-muted rounded disabled:opacity-50"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Rotate */}
            <button
              onClick={handleRotate}
              className="p-1.5 hover:bg-muted rounded"
              title="Rotate"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {/* Print */}
            {showPrint && (
              <button
                onClick={handlePrint}
                className="p-1.5 hover:bg-muted rounded"
                title="Print"
              >
                <Printer className="h-4 w-4" />
              </button>
            )}

            {/* Download */}
            {showDownload && (
              <a
                href={src as string}
                download
                className="p-1.5 hover:bg-muted rounded"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* PDF Content */}
      <div
        className="overflow-auto bg-gray-200"
        style={{ height: height as number }}
      >
        <iframe
          src={pdfUrl}
          title={title as string || 'PDF Document'}
          className="w-full h-full border-0"
          style={{
            transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
            transformOrigin: 'center center',
          }}
        />
      </div>
    </div>
  );
};
