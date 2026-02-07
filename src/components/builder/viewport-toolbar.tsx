'use client';

interface ViewportToolbarProps {
  viewport: 'desktop' | 'tablet' | 'mobile';
  mode: 'preview' | 'edit' | 'code';
  onViewportChange: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  onModeChange: (mode: 'preview' | 'edit' | 'code') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  elementCount: number;
  className?: string;
}

const VIEWPORT_CONFIG = {
  desktop: { icon: '□', label: 'Desktop', dimensions: '1280px' },
  tablet: { icon: '▭', label: 'Tablet', dimensions: '768px' },
  mobile: { icon: '▯', label: 'Mobile', dimensions: '375px' },
} as const;

const MODE_CONFIG = {
  preview: { icon: '👁', label: 'Preview' },
  edit: { icon: '✎', label: 'Edit' },
  code: { icon: '⟨⟩', label: 'Code' },
} as const;

export function ViewportToolbar({
  viewport,
  mode,
  onViewportChange,
  onModeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  elementCount,
  className = '',
}: ViewportToolbarProps) {
  return (
    <div
      className={`flex items-center justify-between h-11 px-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 ${className}`}
    >
      {/* Left section: Viewport buttons */}
      <div className="flex items-center gap-1 divide-x divide-gray-200 dark:divide-gray-700">
        <div className="flex gap-1">
          {(Object.keys(VIEWPORT_CONFIG) as Array<keyof typeof VIEWPORT_CONFIG>).map((vp) => {
            const config = VIEWPORT_CONFIG[vp];
            const isActive = viewport === vp;
            return (
              <button
                key={vp}
                onClick={() => onViewportChange(vp)}
                className={`
                  flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                title={`${config.label} (${config.dimensions})`}
              >
                <span className="text-base">{config.icon}</span>
                <span className="hidden sm:inline">{config.label}</span>
                <span className="hidden md:inline text-xs opacity-60">
                  {config.dimensions}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center section: Mode toggle */}
      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded p-0.5">
        {(Object.keys(MODE_CONFIG) as Array<keyof typeof MODE_CONFIG>).map((m) => {
          const config = MODE_CONFIG[m];
          const isActive = mode === m;
          return (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`
                flex items-center gap-1.5 px-3 py-1 rounded text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
              title={config.label}
            >
              <span className="text-base">{config.icon}</span>
              <span className="hidden sm:inline">{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right section: Undo/Redo + Element count */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`
              px-2 py-1 rounded text-sm font-medium transition-colors
              ${
                canUndo
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              }
            `}
            title={`Undo ${canUndo ? '(Ctrl+Z)' : ''}`}
          >
            <span className="text-base">↩</span>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`
              px-2 py-1 rounded text-sm font-medium transition-colors
              ${
                canRedo
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              }
            `}
            title={`Redo ${canRedo ? '(Ctrl+Shift+Z)' : ''}`}
          >
            <span className="text-base">↪</span>
          </button>
        </div>

        <div className="flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-400">
          <span>
            {elementCount} {elementCount === 1 ? 'element' : 'elements'}
          </span>
        </div>
      </div>
    </div>
  );
}
