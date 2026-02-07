'use client';

/**
 * Props Editor Panel - Right sidebar for editing selected element properties
 *
 * Features:
 * - Element header with type, tier badge, key, and description
 * - Required props section with red asterisk markers
 * - Collapsible optional props section
 * - Type-aware input rendering (string, number, boolean, enum, JSON)
 * - Additional props section for props not in the block definition
 * - JSON view toggle for raw editing
 * - Live updates via onUpdateProps callback
 * - Debounced string inputs (300ms)
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { UIElement } from '@json-render/core';
import type { BlockDefinition, PropDefinition, BlockTier } from '@/lib/registry/block-registry';
import { cn } from '@/lib/utils';
import {
  Settings2,
  ChevronDown,
  Code2,
  AlertCircle,
  Hash,
  Type,
  ToggleLeft,
  List,
  Braces,
  Info,
} from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface PropsEditorProps {
  element: UIElement | null;
  blockDefinition: BlockDefinition | null;
  onUpdateProps: (key: string, props: Record<string, unknown>) => void;
  className?: string;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Convert camelCase or kebab-case string to Title Case for display
 */
function formatPropName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/**
 * Get the appropriate icon for a prop type
 */
function getPropTypeIcon(type: string) {
  switch (type) {
    case 'string':
      return Type;
    case 'number':
      return Hash;
    case 'boolean':
      return ToggleLeft;
    case 'enum':
      return List;
    case 'array':
    case 'object':
      return Braces;
    default:
      return Code2;
  }
}

/**
 * Get tier badge styling
 */
function getTierBadgeStyles(tier: BlockTier): string {
  switch (tier) {
    case 'core':
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20';
    case 'extended':
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20';
    case 'unresolved':
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

// ============================================================================
// Debounced String Input
// ============================================================================

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function DebouncedInput({ value, onChange, placeholder, className }: DebouncedInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local value when external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, 300);
    },
    [onChange]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}

// ============================================================================
// Prop Input Components
// ============================================================================

interface PropInputProps {
  prop: PropDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

function PropInput({ prop, value, onChange }: PropInputProps) {
  const inputClasses = cn(
    'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50'
  );

  switch (prop.type) {
    case 'string':
      return (
        <DebouncedInput
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => onChange(v)}
          placeholder={
            prop.default !== undefined ? String(prop.default) : `Enter ${formatPropName(prop.name).toLowerCase()}...`
          }
          className={inputClasses}
        />
      );

    case 'number':
      return (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChange(typeof value === 'number' ? value - 1 : -1)}
            className={cn(
              'flex items-center justify-center h-8 w-8 rounded-md border border-input',
              'hover:bg-muted transition-colors text-sm font-medium'
            )}
          >
            -
          </button>
          <input
            type="number"
            value={typeof value === 'number' ? value : ''}
            onChange={(e) => {
              const num = e.target.value === '' ? undefined : Number(e.target.value);
              onChange(num);
            }}
            placeholder={prop.default !== undefined ? String(prop.default) : '0'}
            className={cn(inputClasses, 'text-center flex-1')}
          />
          <button
            type="button"
            onClick={() => onChange(typeof value === 'number' ? value + 1 : 1)}
            className={cn(
              'flex items-center justify-center h-8 w-8 rounded-md border border-input',
              'hover:bg-muted transition-colors text-sm font-medium'
            )}
          >
            +
          </button>
        </div>
      );

    case 'boolean':
      return (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            Boolean(value) ? 'bg-primary' : 'bg-input'
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 rounded-full bg-background transition-transform shadow-sm',
              Boolean(value) ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
      );

    case 'enum':
      if (prop.options && prop.options.length > 0) {
        return (
          <select
            value={value !== undefined && value !== null ? String(value) : ''}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClasses, 'cursor-pointer')}
          >
            <option value="">
              {prop.default !== undefined ? `Default: ${String(prop.default)}` : 'Select...'}
            </option>
            {prop.options.map((opt) => (
              <option key={String(opt)} value={String(opt)}>
                {String(opt)}
              </option>
            ))}
          </select>
        );
      }
      // Fall through to default if no options
      return (
        <DebouncedInput
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => onChange(v)}
          placeholder={prop.default !== undefined ? String(prop.default) : 'Enter value...'}
          className={inputClasses}
        />
      );

    // array, object, or unknown type - JSON editing
    default: {
      const jsonStr =
        value !== undefined && value !== null
          ? typeof value === 'string'
            ? value
            : JSON.stringify(value, null, 2)
          : '';

      return <JsonTextarea value={jsonStr} onChange={onChange} placeholder={prop.default !== undefined ? JSON.stringify(prop.default, null, 2) : `Enter ${prop.type} as JSON...`} />;
    }
  }
}

// ============================================================================
// JSON Textarea (shared between prop input and JSON mode)
// ============================================================================

interface JsonTextareaProps {
  value: string;
  onChange: (value: unknown) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

function JsonTextarea({ value, onChange, placeholder, rows = 3, className }: JsonTextareaProps) {
  const [localValue, setLocalValue] = useState(value);
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    setLocalValue(value);
    setParseError(null);
  }, [value]);

  const handleBlur = useCallback(() => {
    if (!localValue.trim()) {
      onChange(undefined);
      setParseError(null);
      return;
    }
    try {
      const parsed = JSON.parse(localValue);
      onChange(parsed);
      setParseError(null);
    } catch {
      setParseError('Invalid JSON');
    }
  }, [localValue, onChange]);

  return (
    <div className="space-y-1">
      <textarea
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          setParseError(null);
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm font-mono',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'resize-y min-h-[60px]',
          parseError && 'border-destructive focus-visible:ring-destructive',
          className
        )}
      />
      {parseError && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {parseError}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// Prop Field Row
// ============================================================================

interface PropFieldProps {
  prop: PropDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

function PropField({ prop, value, onChange }: PropFieldProps) {
  const Icon = getPropTypeIcon(prop.type);

  return (
    <div className="space-y-1.5">
      {/* Label */}
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        <label className="text-xs font-medium text-foreground leading-none">
          {formatPropName(prop.name)}
          {prop.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {prop.description && (
          <span className="group relative">
            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-popover text-popover-foreground border rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {prop.description}
            </span>
          </span>
        )}
      </div>
      {/* Input */}
      <PropInput prop={prop} value={value} onChange={onChange} />
    </div>
  );
}

// ============================================================================
// Additional Props (key-value pairs for props not in block definition)
// ============================================================================

interface AdditionalPropsProps {
  props: Record<string, unknown>;
  definedPropNames: Set<string>;
  onUpdateProp: (name: string, value: unknown) => void;
}

function AdditionalProps({ props, definedPropNames, onUpdateProp }: AdditionalPropsProps) {
  const additionalEntries = useMemo(() => {
    return Object.entries(props).filter(([key]) => !definedPropNames.has(key));
  }, [props, definedPropNames]);

  if (additionalEntries.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Braces className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Additional Props
        </span>
        <span className="text-xs text-muted-foreground">({additionalEntries.length})</span>
      </div>
      <div className="space-y-3 pl-1">
        {additionalEntries.map(([key, val]) => {
          const displayValue =
            val !== undefined && val !== null
              ? typeof val === 'string'
                ? val
                : JSON.stringify(val, null, 2)
              : '';
          const isSimpleString = typeof val === 'string';

          return (
            <div key={key} className="space-y-1.5">
              <label className="text-xs font-medium text-foreground leading-none flex items-center gap-1.5">
                <Code2 className="h-3 w-3 text-muted-foreground" />
                {formatPropName(key)}
              </label>
              {isSimpleString ? (
                <DebouncedInput
                  value={displayValue}
                  onChange={(v) => onUpdateProp(key, v)}
                  className={cn(
                    'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm',
                    'placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                  )}
                />
              ) : (
                <JsonTextarea
                  value={displayValue}
                  onChange={(v) => onUpdateProp(key, v)}
                  rows={2}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function PropsEditor({
  element,
  blockDefinition,
  onUpdateProps,
  className,
}: PropsEditorProps) {
  const [jsonMode, setJsonMode] = useState(false);
  const [showOptional, setShowOptional] = useState(true);
  const [jsonValue, setJsonValue] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Update JSON value when element changes
  useEffect(() => {
    if (element) {
      setJsonValue(JSON.stringify(element.props, null, 2));
      setJsonError(null);
    }
  }, [element]);

  // Handle individual prop change
  const handlePropChange = useCallback(
    (propName: string, value: unknown) => {
      if (!element) return;
      const updatedProps = { ...element.props, [propName]: value };
      // Remove undefined values
      if (value === undefined) {
        delete updatedProps[propName];
      }
      onUpdateProps(element.key, updatedProps);
    },
    [element, onUpdateProps]
  );

  // Handle JSON mode save
  const handleJsonSave = useCallback(() => {
    if (!element) return;
    if (!jsonValue.trim()) {
      onUpdateProps(element.key, {});
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonValue);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        setJsonError('Props must be a JSON object');
        return;
      }
      onUpdateProps(element.key, parsed as Record<string, unknown>);
      setJsonError(null);
    } catch {
      setJsonError('Invalid JSON syntax');
    }
  }, [element, jsonValue, onUpdateProps]);

  // Separate required and optional props
  const { requiredProps, optionalProps, definedPropNames } = useMemo(() => {
    if (!blockDefinition) {
      return { requiredProps: [], optionalProps: [], definedPropNames: new Set<string>() };
    }
    const required: PropDefinition[] = [];
    const optional: PropDefinition[] = [];
    const names = new Set<string>();

    for (const prop of blockDefinition.props) {
      names.add(prop.name);
      if (prop.required) {
        required.push(prop);
      } else {
        optional.push(prop);
      }
    }
    return { requiredProps: required, optionalProps: optional, definedPropNames: names };
  }, [blockDefinition]);

  // ========== EMPTY STATE ==========
  if (!element) {
    return (
      <div className={cn('flex flex-col h-full bg-background', className)}>
        <div className="flex items-center gap-2 px-4 py-3 border-b bg-card">
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Properties</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-muted p-3 mb-3">
            <Settings2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Select an element to edit its properties
          </p>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-card space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Properties</span>
          </div>
          {/* JSON toggle */}
          <button
            onClick={() => {
              if (!jsonMode && element) {
                setJsonValue(JSON.stringify(element.props, null, 2));
                setJsonError(null);
              }
              setJsonMode(!jsonMode);
            }}
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 text-xs rounded-md transition-colors',
              'hover:bg-muted',
              jsonMode && 'bg-muted text-foreground'
            )}
            title={jsonMode ? 'Switch to form view' : 'Switch to JSON view'}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>JSON</span>
          </button>
        </div>

        {/* Element info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">{element.type}</span>
            {blockDefinition && (
              <span
                className={cn(
                  'px-1.5 py-0.5 text-[10px] font-medium rounded border',
                  getTierBadgeStyles(blockDefinition.tier)
                )}
              >
                {blockDefinition.tier}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-mono">{element.key}</p>
          {blockDefinition?.description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {blockDefinition.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {jsonMode ? (
          /* ========== JSON MODE ========== */
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Raw JSON
              </span>
              <span className="text-xs text-muted-foreground">
                Edit and blur to apply
              </span>
            </div>
            <textarea
              value={jsonValue}
              onChange={(e) => {
                setJsonValue(e.target.value);
                setJsonError(null);
              }}
              onBlur={handleJsonSave}
              rows={Math.max(8, jsonValue.split('\n').length + 2)}
              spellCheck={false}
              className={cn(
                'w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono',
                'placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                'resize-y min-h-[200px]',
                jsonError && 'border-destructive focus-visible:ring-destructive'
              )}
            />
            {jsonError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                {jsonError}
              </p>
            )}
          </div>
        ) : (
          /* ========== FORM MODE ========== */
          <div className="p-4 space-y-5">
            {/* Required Props */}
            {requiredProps.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Required
                  </span>
                  <span className="text-xs text-muted-foreground">({requiredProps.length})</span>
                </div>
                <div className="space-y-4 pl-1">
                  {requiredProps.map((prop) => (
                    <PropField
                      key={prop.name}
                      prop={prop}
                      value={element.props[prop.name]}
                      onChange={(val) => handlePropChange(prop.name, val)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Divider between required and optional */}
            {requiredProps.length > 0 && optionalProps.length > 0 && (
              <div className="border-t border-border" />
            )}

            {/* Optional Props */}
            {optionalProps.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowOptional(!showOptional)}
                  className="flex items-center gap-2 w-full text-left group"
                >
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 text-muted-foreground transition-transform',
                      !showOptional && '-rotate-90'
                    )}
                  />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-hover:text-foreground transition-colors">
                    Optional
                  </span>
                  <span className="text-xs text-muted-foreground">({optionalProps.length})</span>
                </button>
                {showOptional && (
                  <div className="space-y-4 pl-1">
                    {optionalProps.map((prop) => (
                      <PropField
                        key={prop.name}
                        prop={prop}
                        value={element.props[prop.name]}
                        onChange={(val) => handlePropChange(prop.name, val)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Divider before additional props */}
            {(requiredProps.length > 0 || optionalProps.length > 0) && element.props && (
              <div className="border-t border-border" />
            )}

            {/* Additional Props (not in block definition) */}
            <AdditionalProps
              props={element.props}
              definedPropNames={definedPropNames}
              onUpdateProp={handlePropChange}
            />

            {/* No block definition fallback */}
            {!blockDefinition && Object.keys(element.props).length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Braces className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    All Props
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({Object.keys(element.props).length})
                  </span>
                </div>
                <div className="space-y-3 pl-1">
                  {Object.entries(element.props).map(([key, val]) => {
                    const displayValue =
                      val !== undefined && val !== null
                        ? typeof val === 'string'
                          ? val
                          : JSON.stringify(val, null, 2)
                        : '';
                    const isSimpleString = typeof val === 'string';

                    return (
                      <div key={key} className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground leading-none flex items-center gap-1.5">
                          <Code2 className="h-3 w-3 text-muted-foreground" />
                          {formatPropName(key)}
                        </label>
                        {isSimpleString ? (
                          <DebouncedInput
                            value={displayValue}
                            onChange={(v) => handlePropChange(key, v)}
                            className={cn(
                              'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm',
                              'placeholder:text-muted-foreground',
                              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                            )}
                          />
                        ) : (
                          <JsonTextarea
                            value={displayValue}
                            onChange={(v) => handlePropChange(key, v)}
                            rows={2}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty props state */}
            {!blockDefinition && Object.keys(element.props).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-xs text-muted-foreground">
                  This element has no props. Switch to JSON mode to add properties.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>{Object.keys(element.props).length} props</span>
          {blockDefinition && (
            <span>{blockDefinition.kind} / {blockDefinition.category}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropsEditor;
