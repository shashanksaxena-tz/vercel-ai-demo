'use client';

/**
 * Flowbite Registry
 * Flowbite-style components with Tailwind CSS
 * More rounded, softer design with blue accent colors
 */

import * as React from 'react';
import type { ComponentRegistry } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Flowbite Theme - Blue accent, rounded corners
const flowbiteTheme: RegistryTheme = {
  name: 'Flowbite',
  colors: {
    primary: '#1d4ed8', // blue-700
    secondary: '#4b5563', // gray-600
    accent: '#7c3aed', // violet-600
    background: '#ffffff',
    foreground: '#111827', // gray-900
    muted: '#f9fafb', // gray-50
    success: '#059669', // emerald-600
    warning: '#d97706', // amber-600
    error: '#dc2626', // red-600
    info: '#2563eb', // blue-600
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, monospace',
  },
  borderRadius: '0.75rem',
  shadows: true,
};

// Flowbite Component Registry - All components receive ComponentRenderProps
const flowbiteComponents: ComponentRegistry = {
  // Layout
  Container: ({ element, children }) => {
    const { maxWidth = 'xl', centered } = element.props as { maxWidth?: string; centered?: boolean };
    return (
      <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${
        maxWidth === 'sm' ? 'max-w-screen-sm' :
        maxWidth === 'md' ? 'max-w-screen-md' :
        maxWidth === 'lg' ? 'max-w-screen-lg' :
        maxWidth === 'xl' ? 'max-w-screen-xl' : 'max-w-full'
      } ${centered ? 'flex flex-col items-center' : ''}`}>
        {children}
      </div>
    );
  },

  Row: ({ element, children }) => {
    const { align = 'center', justify = 'start', gap = 'md', wrap, reverse } = element.props as { align?: string; justify?: string; gap?: string; wrap?: boolean; reverse?: boolean };
    return (
      <div className={`flex ${reverse ? 'flex-row-reverse' : ''} ${wrap ? 'flex-wrap' : ''} ${
        align === 'start' ? 'items-start' : align === 'end' ? 'items-end' : align === 'stretch' ? 'items-stretch' : 'items-center'
      } ${
        justify === 'center' ? 'justify-center' : justify === 'end' ? 'justify-end' : justify === 'between' ? 'justify-between' : 'justify-start'
      } ${
        gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : 'gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Column: ({ element, children }) => {
    const { align = 'stretch', justify = 'start', gap = 'md' } = element.props as { align?: string; justify?: string; gap?: string };
    return (
      <div className={`flex flex-col ${
        align === 'start' ? 'items-start' : align === 'center' ? 'items-center' : align === 'end' ? 'items-end' : 'items-stretch'
      } ${
        justify === 'center' ? 'justify-center' : justify === 'end' ? 'justify-end' : justify === 'between' ? 'justify-between' : 'justify-start'
      } ${
        gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : 'gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Grid: ({ element, children }) => {
    const { columns = 3, gap = 'md' } = element.props as { columns?: number; gap?: string };
    return (
      <div
        className={`grid ${gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : 'gap-4'}`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    );
  },

  Stack: ({ element, children }) => {
    const { direction = 'vertical', spacing = 'md' } = element.props as { direction?: string; spacing?: string };
    return (
      <div className={`flex ${direction === 'horizontal' ? '' : 'flex-col'} ${
        spacing === 'xs' ? 'gap-1' : spacing === 'sm' ? 'gap-2' : spacing === 'lg' ? 'gap-6' : 'gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Spacer: ({ element }) => {
    const { size = 'md', flexible } = element.props as { size?: string; flexible?: boolean };
    return <div className={flexible ? 'flex-1' : `${size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />;
  },

  Divider: ({ element }) => {
    const { orientation = 'horizontal', label } = element.props as { orientation?: string; label?: string };
    if (label) {
      return (
        <div className="flex items-center">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">{label}</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
      );
    }
    return <div className={orientation === 'horizontal' ? 'h-px w-full bg-gray-300' : 'w-px h-full bg-gray-300'} />;
  },

  // Cards - Flowbite style: more rounded, softer shadows
  Card: ({ element, children }) => {
    const { variant = 'elevated', padding = 'md', hoverable } = element.props as { variant?: string; padding?: string; hoverable?: boolean };
    return (
      <div className={`${
        variant === 'elevated' ? 'bg-white shadow-md border border-gray-100' :
        variant === 'outlined' ? 'bg-white border-2 border-gray-200' :
        'bg-gray-50'
      } ${
        padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-5'
      } rounded-xl ${hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}`}>
        {children}
      </div>
    );
  },

  CardHeader: ({ element }) => {
    const { title, subtitle, avatar } = element.props as { title?: string; subtitle?: string; avatar?: string };
    return (
      <div className="flex items-start gap-4 p-5 pb-0">
        {avatar && <img src={avatar} alt="" className="h-12 w-12 rounded-full" />}
        <div className="flex-1">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    );
  },

  CardBody: ({ element, children }) => {
    const { padding = 'md' } = element.props as { padding?: string };
    return <div className={padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-5'}>{children}</div>;
  },

  CardFooter: ({ element, children }) => {
    const { align = 'end' } = element.props as { align?: string };
    return (
      <div className={`flex items-center gap-3 p-5 pt-0 ${
        align === 'start' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end'
      }`}>
        {children}
      </div>
    );
  },

  // Typography
  Heading: ({ element }) => {
    const { level = '2', text, color = 'default', align = 'left' } = element.props as { level?: string; text: string; color?: string; align?: string };
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    const sizes: Record<string, string> = { '1': 'text-4xl', '2': 'text-3xl', '3': 'text-2xl', '4': 'text-xl', '5': 'text-lg', '6': 'text-base' };
    return (
      <Tag className={`${sizes[level]} font-bold ${
        color === 'primary' ? 'text-blue-700' : color === 'muted' ? 'text-gray-500' : 'text-gray-900'
      } ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
        {text}
      </Tag>
    );
  },

  Text: ({ element }) => {
    const { content, size = 'md', color = 'default', align = 'left' } = element.props as { content: string; size?: string; color?: string; align?: string };
    return (
      <p className={`${
        size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
      } ${color === 'muted' ? 'text-gray-500' : color === 'primary' ? 'text-blue-700' : 'text-gray-700'} ${
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
      }`}>
        {content}
      </p>
    );
  },

  Link: ({ element }) => {
    const { text, href, external } = element.props as { text: string; href: string; external?: boolean };
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-blue-700 hover:text-blue-800 hover:underline"
      >
        {text}
      </a>
    );
  },

  // Buttons - Flowbite style: rounded-lg, blue-700 primary
  Button: ({ element }) => {
    const { label, variant = 'solid', size = 'md', fullWidth, disabled, loading } = element.props as { label: string; variant?: string; size?: string; fullWidth?: boolean; disabled?: boolean; loading?: boolean };
    return (
      <button
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 ${
          size === 'xs' ? 'px-3 py-1.5 text-xs rounded-lg' :
          size === 'sm' ? 'px-4 py-2 text-sm rounded-lg' :
          size === 'lg' ? 'px-6 py-3 text-base rounded-xl' :
          'px-5 py-2.5 text-sm rounded-lg'
        } ${fullWidth ? 'w-full' : ''} ${
          variant === 'solid' ? 'bg-blue-700 text-white hover:bg-blue-800' :
          variant === 'outline' ? 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50' :
          variant === 'ghost' ? 'text-blue-700 hover:bg-blue-50' :
          'text-blue-700 hover:underline'
        }`}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {label}
      </button>
    );
  },

  IconButton: ({ element }) => {
    const { icon, label, variant = 'ghost', size = 'md' } = element.props as { icon: string; label: string; variant?: string; size?: string };
    return (
      <button
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-lg transition-colors ${
          size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
        } ${variant === 'solid' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        [{icon}]
      </button>
    );
  },

  ButtonGroup: ({ children }) => <div className="inline-flex rounded-lg">{children}</div>,

  // Form Components - Flowbite style: rounded-lg, blue focus
  Input: ({ element }) => {
    const { label, placeholder, type = 'text', size = 'md', disabled, error, hint } = element.props as { label?: string; placeholder?: string; type?: string; size?: string; disabled?: boolean; error?: string; hint?: string };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 ${
            size === 'sm' ? 'py-2 text-sm' : size === 'lg' ? 'py-3.5' : 'py-2.5'
          } bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 disabled:opacity-50 ${
            error ? 'border-red-500 focus:ring-red-300' : ''
          }`}
        />
        {(hint || error) && <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>{error || hint}</p>}
      </div>
    );
  },

  TextArea: ({ element }) => {
    const { label, placeholder, rows = 4, disabled, error } = element.props as { label?: string; placeholder?: string; rows?: number; disabled?: boolean; error?: string };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
        <textarea
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 disabled:opacity-50 ${
            error ? 'border-red-500' : ''
          }`}
        />
      </div>
    );
  },

  Select: ({ element }) => {
    const { label, placeholder, options = [], disabled } = element.props as { label?: string; placeholder?: string; options?: { value: string; label: string }[]; disabled?: boolean };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
        <select
          disabled={disabled}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  },

  Checkbox: ({ element }) => {
    const { label, checked, disabled } = element.props as { label?: string; checked?: boolean; disabled?: boolean };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          readOnly
        />
        <span className="text-sm text-gray-900">{label}</span>
      </label>
    );
  },

  Radio: ({ element }) => {
    const { label, value, disabled } = element.props as { label?: string; value?: string; disabled?: boolean };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value={value}
          disabled={disabled}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          readOnly
        />
        <span className="text-sm text-gray-900">{label}</span>
      </label>
    );
  },

  RadioGroup: ({ element, children }) => {
    const { label, orientation = 'vertical' } = element.props as { label?: string; orientation?: string };
    return (
      <fieldset className="space-y-2">
        {label && <legend className="text-sm font-medium text-gray-900">{label}</legend>}
        <div className={orientation === 'horizontal' ? 'flex gap-4' : 'space-y-2'}>{children}</div>
      </fieldset>
    );
  },

  Switch: ({ element }) => {
    const { label, checked, disabled } = element.props as { label?: string; checked?: boolean; disabled?: boolean };
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        <span
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`} />
        </span>
        {label && <span className="text-sm text-gray-900">{label}</span>}
      </label>
    );
  },

  Slider: ({ element }) => {
    const { label, min = 0, max = 100 } = element.props as { label?: string; min?: number; max?: number };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
        <input type="range" min={min} max={max} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
      </div>
    );
  },

  // Data Display - Flowbite style
  Badge: ({ element }) => {
    const { text, variant = 'solid', color = 'default', size = 'md' } = element.props as { text: string; variant?: string; color?: string; size?: string };
    return (
      <span className={`inline-flex items-center font-medium rounded-full ${
        size === 'xs' ? 'px-2 py-0.5 text-xs' : size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${
        variant === 'solid' ? (
          color === 'success' ? 'bg-green-100 text-green-800' :
          color === 'error' ? 'bg-red-100 text-red-800' :
          color === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        ) : (
          color === 'success' ? 'border border-green-500 text-green-500' :
          color === 'error' ? 'border border-red-500 text-red-500' :
          'border border-blue-500 text-blue-500'
        )
      }`}>
        {text}
      </span>
    );
  },

  Avatar: ({ element }) => {
    const { src, name, size = 'md', status } = element.props as { src?: string; name?: string; size?: string; status?: string };
    const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
    const sizeClass = size === 'xs' ? 'h-6 w-6 text-xs' : size === 'sm' ? 'h-8 w-8 text-sm' : size === 'lg' ? 'h-14 w-14 text-lg' : 'h-10 w-10';

    return (
      <div className="relative inline-flex">
        {src ? (
          <img src={src} alt={name || 'Avatar'} className={`${sizeClass} rounded-full object-cover`} />
        ) : (
          <div className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600`}>
            {initials}
          </div>
        )}
        {status && (
          <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
            status === 'online' ? 'bg-green-400' : status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
          }`} />
        )}
      </div>
    );
  },

  AvatarGroup: ({ element, children }) => {
    const { max = 4 } = element.props as { max?: number };
    const items = React.Children.toArray(children);
    const visible = items.slice(0, max);
    const remaining = items.length - max;
    return (
      <div className="flex -space-x-3">
        {visible.map((child, i) => <div key={i} className="ring-2 ring-white rounded-full">{child}</div>)}
        {remaining > 0 && (
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-white ring-2 ring-white">
            +{remaining}
          </div>
        )}
      </div>
    );
  },

  Icon: ({ element }) => {
    const { name, size = 'md' } = element.props as { name: string; size?: string };
    return (
      <span className={`inline-flex ${size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`}>
        [{name}]
      </span>
    );
  },

  Image: ({ element }) => {
    const { src, alt, rounded = 'md', width, height } = element.props as { src: string; alt: string; rounded?: string; width?: number; height?: number };
    return (
      <img
        src={src}
        alt={alt}
        style={{ width, height }}
        className={`object-cover ${rounded === 'none' ? '' : rounded === 'full' ? 'rounded-full' : 'rounded-lg'}`}
      />
    );
  },

  List: ({ element, children }) => {
    const { variant = 'unordered' } = element.props as { variant?: string };
    const Tag = variant === 'ordered' ? 'ol' : 'ul';
    return <Tag className={`${variant === 'ordered' ? 'list-decimal' : 'list-disc'} pl-5 space-y-1 text-gray-700`}>{children}</Tag>;
  },

  ListItem: ({ children }) => <li>{children}</li>,

  Table: ({ element, children }) => {
    const { variant = 'simple' } = element.props as { variant?: string };
    return (
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className={`w-full text-sm text-left text-gray-700 ${variant === 'striped' ? '[&_tbody_tr:nth-child(odd)]:bg-gray-50' : ''}`}>
          {children}
        </table>
      </div>
    );
  },

  TableHeader: ({ children }) => <thead className="text-xs text-gray-700 uppercase bg-gray-50">{children}</thead>,
  TableBody: ({ children }) => <tbody>{children}</tbody>,
  TableRow: ({ element, children }) => {
    const { hoverable } = element.props as { hoverable?: boolean };
    return <tr className={`bg-white border-b ${hoverable ? 'hover:bg-gray-50' : ''}`}>{children}</tr>;
  },
  TableCell: ({ element, children }) => {
    const { header, align = 'left' } = element.props as { header?: boolean; align?: string };
    const Tag = header ? 'th' : 'td';
    return <Tag className={`px-6 py-4 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''} ${header ? 'font-medium' : ''}`}>{children}</Tag>;
  },

  Metric: ({ element }) => {
    const { label, value, change, changeType = 'neutral' } = element.props as { label: string; value: string; change?: string; changeType?: string };
    return (
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {change && (
            <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>
              {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : ''}{change}
            </span>
          )}
        </div>
      </div>
    );
  },

  Progress: ({ element }) => {
    const { value = 0, max = 100, size = 'md', color = 'primary', showValue } = element.props as { value?: number; max?: number; size?: string; color?: string; showValue?: boolean };
    const pct = Math.min(100, (value / max) * 100);
    return (
      <div className="w-full">
        <div className={`w-full bg-gray-200 rounded-full ${size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-2.5'}`}>
          <div
            className={`rounded-full ${color === 'success' ? 'bg-green-600' : color === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}
            style={{ width: `${pct}%`, height: '100%' }}
          />
        </div>
        {showValue && <p className="mt-1 text-sm text-gray-500">{Math.round(pct)}%</p>}
      </div>
    );
  },

  // Feedback - Flowbite style
  Alert: ({ element }) => {
    const { title, description, status = 'info', closable } = element.props as { title?: string; description: string; status?: string; closable?: boolean };
    return (
      <div className={`p-4 rounded-lg ${
        status === 'success' ? 'bg-green-50 text-green-800 border border-green-300' :
        status === 'error' ? 'bg-red-50 text-red-800 border border-red-300' :
        status === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-300' :
        'bg-blue-50 text-blue-800 border border-blue-300'
      }`}>
        {title && <h5 className="font-medium mb-1">{title}</h5>}
        <p className="text-sm">{description}</p>
        {closable && <button className="float-right font-bold">×</button>}
      </div>
    );
  },

  Toast: ({ element }) => {
    const { title, description, status = 'info' } = element.props as { title: string; description?: string; status?: string };
    return (
      <div className={`p-4 rounded-lg shadow-lg ${
        status === 'success' ? 'bg-green-500 text-white' :
        status === 'error' ? 'bg-red-500 text-white' :
        'bg-gray-800 text-white'
      }`}>
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
    );
  },

  Skeleton: ({ element }) => {
    const { variant = 'text', width, height } = element.props as { variant?: string; width?: number; height?: number };
    return (
      <div
        className={`animate-pulse bg-gray-200 ${variant === 'circular' ? 'rounded-full' : 'rounded'}`}
        style={{ width, height: height || (variant === 'text' ? '1rem' : undefined) }}
      />
    );
  },

  Spinner: ({ element }) => {
    const { size = 'md', label } = element.props as { size?: string; label?: string };
    return (
      <div className="inline-flex items-center gap-2">
        <svg
          className={`animate-spin text-blue-600 ${size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {label && <span className="text-sm text-gray-600">{label}</span>}
      </div>
    );
  },

  EmptyState: ({ element }) => {
    const { title, description, actionLabel } = element.props as { title: string; description?: string; actionLabel?: string };
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-2 text-sm text-gray-500 max-w-sm">{description}</p>}
        {actionLabel && (
          <button className="mt-4 px-5 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800">
            {actionLabel}
          </button>
        )}
      </div>
    );
  },

  // Navigation - Flowbite style
  Tabs: ({ element, children }) => {
    const { defaultValue } = element.props as { defaultValue?: string };
    return <div className="w-full" data-default-value={defaultValue}>{children}</div>;
  },
  TabList: ({ children }) => <div className="inline-flex border-b border-gray-200">{children}</div>,
  Tab: ({ element }) => {
    const { value, label, disabled } = element.props as { value: string; label: string; disabled?: boolean };
    return (
      <button
        data-value={value}
        disabled={disabled}
        className="px-4 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 disabled:opacity-50"
      >
        {label}
      </button>
    );
  },
  TabPanel: ({ element, children }) => {
    const { value } = element.props as { value: string };
    return <div data-value={value} className="mt-4">{children}</div>;
  },

  Breadcrumb: ({ element, children }) => {
    const { separator = '/' } = element.props as { separator?: string };
    const items = React.Children.toArray(children);
    return (
      <nav className="flex items-center text-sm">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {item}
            {i < items.length - 1 && <span className="mx-2 text-gray-400">{separator}</span>}
          </React.Fragment>
        ))}
      </nav>
    );
  },

  BreadcrumbItem: ({ element }) => {
    const { label, href, current } = element.props as { label: string; href?: string; current?: boolean };
    return current ? (
      <span className="font-medium text-gray-900">{label}</span>
    ) : href ? (
      <a href={href} className="text-gray-500 hover:text-blue-600">{label}</a>
    ) : (
      <span className="text-gray-500">{label}</span>
    );
  },

  Pagination: ({ element }) => {
    const { totalPages, currentPage = 1 } = element.props as { totalPages: number; currentPage?: number };
    return (
      <nav className="flex items-center gap-1">
        <button className="px-3 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50" disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-700 text-white' : 'border hover:bg-gray-50'}`}
          >
            {i + 1}
          </button>
        ))}
        <button className="px-3 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50" disabled={currentPage === totalPages}>Next</button>
      </nav>
    );
  },

  NavMenu: ({ element, children }) => {
    const { orientation = 'horizontal' } = element.props as { orientation?: string };
    return <nav className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'items-center'}`}>{children}</nav>;
  },

  NavItem: ({ element }) => {
    const { label, href = '#', active, badge } = element.props as { label: string; href?: string; active?: boolean; badge?: string };
    return (
      <a
        href={href}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        {label}
        {badge && <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs">{badge}</span>}
      </a>
    );
  },

  // Overlays
  Modal: ({ element, children }) => {
    const { title } = element.props as { title?: string };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
          {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
          {children}
        </div>
      </div>
    );
  },

  Drawer: ({ element, children }) => {
    const { title, placement = 'right' } = element.props as { title?: string; placement?: string };
    return (
      <div className={`fixed inset-y-0 ${placement === 'left' ? 'left-0' : 'right-0'} z-50 w-80 bg-white shadow-xl p-6`}>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    );
  },

  Tooltip: ({ element, children }) => {
    const { content } = element.props as { content: string };
    return (
      <span className="relative group">
        {children}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100">
          {content}
        </span>
      </span>
    );
  },

  Popover: ({ children }) => <div className="relative">{children}</div>,

  Dropdown: ({ element, children }) => {
    const { trigger } = element.props as { trigger: string };
    return (
      <div className="relative group">
        <button className="px-4 py-2">{trigger}</button>
        <div className="absolute z-50 mt-1 bg-white border rounded-lg shadow-lg hidden group-hover:block min-w-[160px]">
          {children}
        </div>
      </div>
    );
  },

  DropdownItem: ({ element }) => {
    const { label, disabled, destructive } = element.props as { label: string; disabled?: boolean; destructive?: boolean };
    return (
      <button
        disabled={disabled}
        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${destructive ? 'text-red-600' : ''} ${disabled ? 'opacity-50' : ''}`}
      >
        {label}
      </button>
    );
  },

  // Accordion - Flowbite style
  Accordion: ({ children }) => <div className="divide-y divide-gray-200 rounded-xl border">{children}</div>,

  AccordionItem: ({ element, children }) => {
    const { title } = element.props as { title: string };
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-5 py-4 text-left font-medium hover:bg-gray-50"
        >
          {title}
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="px-5 pb-4 text-sm text-gray-600">{children}</div>}
      </div>
    );
  },

  Collapsible: ({ element, children }) => {
    const { title, defaultOpen = false } = element.props as { title: string; defaultOpen?: boolean };
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
      <div className="rounded-xl border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-5 py-4 font-medium"
        >
          {title}
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="px-5 pb-4">{children}</div>}
      </div>
    );
  },

  // Specialized
  Chart: ({ element }) => {
    const { type, height = 200 } = element.props as { type: string; height?: number };
    return (
      <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ height }}>
        <span className="text-gray-500">Chart: {type}</span>
      </div>
    );
  },

  Calendar: () => <div className="p-4 border rounded-xl bg-gray-50">Calendar</div>,

  DatePicker: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="date" placeholder={placeholder} className="w-full px-4 py-2.5 border rounded-lg" />
      </div>
    );
  },

  FileUpload: ({ element }) => {
    const { label, accept } = element.props as { label?: string; accept?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="file" accept={accept} className="w-full text-sm" />
      </div>
    );
  },

  Rating: ({ element }) => {
    const { max = 5, value = 0, readonly } = element.props as { max?: number; value?: number; readonly?: boolean };
    return (
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <button key={i} disabled={readonly} className={`text-xl ${i < value ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
        ))}
      </div>
    );
  },

  TagInput: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="flex flex-wrap gap-1 p-2 border rounded-lg min-h-[44px]">
          <input placeholder={placeholder} className="flex-1 min-w-[100px] outline-none" />
        </div>
      </div>
    );
  },

  ColorPicker: ({ element }) => {
    const { label } = element.props as { label?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="color" className="h-10 w-20 rounded-lg cursor-pointer" />
      </div>
    );
  },

  Timeline: ({ element, children }) => {
    const { orientation = 'vertical' } = element.props as { orientation?: string };
    return <div className={`relative ${orientation === 'horizontal' ? 'flex' : 'space-y-4'}`}>{children}</div>;
  },

  TimelineItem: ({ element }) => {
    const { title, description, time, status = 'upcoming' } = element.props as { title: string; description?: string; time?: string; status?: string };
    return (
      <div className="relative flex gap-4">
        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
          status === 'completed' ? 'bg-green-500 text-white' :
          status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
          'bg-gray-200 text-gray-500'
        }`}>
          <span className="h-2 w-2 rounded-full bg-current" />
        </div>
        <div className="flex-1 pb-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{title}</h4>
            {time && <span className="text-xs text-gray-500">{time}</span>}
          </div>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
    );
  },

  Stepper: ({ element, children }) => {
    const { currentStep = 0, orientation = 'horizontal' } = element.props as { currentStep?: number; orientation?: string };
    const steps = React.Children.toArray(children);
    return (
      <div className={`flex ${orientation === 'horizontal' ? 'items-center' : 'flex-col'}`}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {React.isValidElement(step) && React.cloneElement(step as React.ReactElement<{ stepIndex: number; currentStep: number }>, { stepIndex: i, currentStep })}
            {i < steps.length - 1 && <div className={`bg-gray-200 ${orientation === 'horizontal' ? 'h-0.5 flex-1 mx-2' : 'w-0.5 h-8 ml-4 my-1'}`} />}
          </React.Fragment>
        ))}
      </div>
    );
  },

  Step: ({ element }) => {
    const { title, stepIndex = 0, currentStep = 0 } = element.props as { title: string; stepIndex?: number; currentStep?: number };
    const isCompleted = stepIndex < currentStep;
    const isCurrent = stepIndex === currentStep;
    return (
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
          isCompleted ? 'bg-blue-600 text-white' :
          isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
          'bg-gray-200 text-gray-500'
        }`}>
          {isCompleted ? '✓' : stepIndex + 1}
        </div>
        <p className={`text-sm font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>{title}</p>
      </div>
    );
  },

  Code: ({ element }) => {
    const { code, showLineNumbers } = element.props as { code: string; showLineNumbers?: boolean };
    return (
      <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100">
        <code>
          {showLineNumbers ? code.split('\n').map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-4 text-gray-500 select-none">{i + 1}</span>
              <span>{line}</span>
            </div>
          )) : code}
        </code>
      </pre>
    );
  },

  Kbd: ({ element }) => {
    const { keys } = element.props as { keys: string[] };
    return (
      <span className="inline-flex items-center gap-1">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 border rounded-lg">{key}</kbd>
            {i < keys.length - 1 && <span className="text-gray-400">+</span>}
          </React.Fragment>
        ))}
      </span>
    );
  },

  Quote: ({ element }) => {
    const { text, author, source } = element.props as { text: string; author?: string; source?: string };
    return (
      <figure>
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">{text}</blockquote>
        {(author || source) && (
          <figcaption className="mt-2 text-sm">
            {author && <span className="font-medium">{author}</span>}
            {author && source && <span className="mx-1">—</span>}
            {source && <cite className="text-gray-500">{source}</cite>}
          </figcaption>
        )}
      </figure>
    );
  },

  Stat: ({ element }) => {
    const { label, value, helpText, trend } = element.props as { label: string; value: string; helpText?: string; trend?: { direction: string; value: string } };
    return (
      <div className="rounded-xl border p-5">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {trend && (
            <span className={`text-sm font-medium ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
      </div>
    );
  },

  Tag: ({ element }) => {
    const { label, variant = 'subtle', closable } = element.props as { label: string; variant?: string; closable?: boolean };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${
        variant === 'solid' ? 'bg-gray-900 text-white' :
        variant === 'outline' ? 'border border-gray-300 text-gray-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {label}
        {closable && <button className="ml-0.5 hover:opacity-70">×</button>}
      </span>
    );
  },
};

// Registry Definition
export const flowbiteRegistry: RegistryDefinition = {
  name: 'flowbite',
  displayName: 'Flowbite',
  description: 'Flowbite-style components with rounded corners and blue accents',
  framework: 'flowbite',
  components: flowbiteComponents,
  theme: flowbiteTheme,
};

export { flowbiteComponents, flowbiteTheme };
