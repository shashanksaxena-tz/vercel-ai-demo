'use client';

/**
 * Tailwind CSS Registry
 * Pure Tailwind CSS implementations without component libraries
 * Modern, clean design with utility-first approach
 */

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Tailwind Theme - Modern Clean Design
const tailwindTheme: RegistryTheme = {
  name: 'Tailwind Modern',
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#6b7280', // gray-500
    accent: '#8b5cf6', // violet-500
    background: '#ffffff',
    foreground: '#1f2937', // gray-800
    muted: '#f3f4f6', // gray-100
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444', // red-500
    info: '#0ea5e9', // sky-500
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, monospace',
  },
  borderRadius: '0.5rem',
  shadows: true,
};

// Tailwind Component Registry - All components receive ComponentRenderProps
const tailwindComponents: ComponentRegistry = {
  // Layout
  Container: ({ element, children }) => {
    const { maxWidth = 'xl', centered } = element.props as { maxWidth?: string; centered?: boolean };
    return (
      <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${
        maxWidth === 'sm' ? 'max-w-screen-sm' :
        maxWidth === 'md' ? 'max-w-screen-md' :
        maxWidth === 'lg' ? 'max-w-screen-lg' :
        maxWidth === 'xl' ? 'max-w-screen-xl' :
        maxWidth === '2xl' ? 'max-w-screen-2xl' : 'max-w-full'
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
        gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : gap === 'xl' ? 'gap-8' : 'gap-4'
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
        gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : gap === 'xl' ? 'gap-8' : 'gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Grid: ({ element, children }) => {
    const { columns = 3, gap = 'md' } = element.props as { columns?: number; gap?: string };
    return (
      <div
        className={`grid ${
          gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : gap === 'xl' ? 'gap-8' : 'gap-4'
        }`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    );
  },

  Stack: ({ element, children }) => {
    const { direction = 'vertical', spacing = 'md', divider } = element.props as { direction?: string; spacing?: string; divider?: boolean };
    const items = React.Children.toArray(children);
    return (
      <div className={`flex ${direction === 'horizontal' ? '' : 'flex-col'} ${
        spacing === 'xs' ? 'gap-1' : spacing === 'sm' ? 'gap-2' : spacing === 'lg' ? 'gap-6' : 'gap-4'
      }`}>
        {divider ? items.map((child, i) => (
          <React.Fragment key={i}>
            {child}
            {i < items.length - 1 && (
              <div className={direction === 'horizontal' ? 'w-px bg-gray-200 self-stretch' : 'h-px bg-gray-200'} />
            )}
          </React.Fragment>
        )) : children}
      </div>
    );
  },

  Spacer: ({ element }) => {
    const { size = 'md', flexible } = element.props as { size?: string; flexible?: boolean };
    return (
      <div className={flexible ? 'flex-1' : `${
        size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
      }`} />
    );
  },

  Divider: ({ element }) => {
    const { orientation = 'horizontal', variant = 'solid', label } = element.props as { orientation?: string; variant?: string; label?: string };
    if (label) {
      return (
        <div className="flex items-center">
          <div className={`flex-1 h-px bg-gray-200 ${variant === 'dashed' ? 'border-dashed' : ''}`} />
          <span className="px-3 text-sm text-gray-500">{label}</span>
          <div className={`flex-1 h-px bg-gray-200 ${variant === 'dashed' ? 'border-dashed' : ''}`} />
        </div>
      );
    }
    return (
      <div className={orientation === 'horizontal' ? 'h-px w-full bg-gray-200' : 'w-px h-full bg-gray-200'} />
    );
  },

  // Cards
  Card: ({ element, children }) => {
    const { variant = 'elevated', padding = 'md', rounded = 'lg', hoverable, clickable } = element.props as { variant?: string; padding?: string; rounded?: string; hoverable?: boolean; clickable?: boolean };
    return (
      <div className={`${
        variant === 'elevated' ? 'bg-white shadow-lg' :
        variant === 'outlined' ? 'bg-white border border-gray-200' :
        variant === 'filled' ? 'bg-gray-100' : 'bg-transparent'
      } ${
        padding === 'none' ? '' : padding === 'sm' ? 'p-3' : padding === 'lg' ? 'p-6' : 'p-4'
      } ${
        rounded === 'none' ? '' : rounded === 'sm' ? 'rounded-sm' : rounded === 'xl' ? 'rounded-xl' : 'rounded-lg'
      } ${hoverable ? 'hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer' : ''} ${clickable ? 'cursor-pointer active:scale-[0.98]' : ''}`}>
        {children}
      </div>
    );
  },

  CardHeader: ({ element }) => {
    const { title, subtitle, avatar, action } = element.props as { title?: string; subtitle?: string; avatar?: string; action?: React.ReactNode };
    return (
      <div className="flex items-start gap-4 p-4 pb-0">
        {avatar && <img src={avatar} alt="" className="h-10 w-10 rounded-full" />}
        <div className="flex-1">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  },

  CardBody: ({ element, children }) => {
    const { padding = 'md' } = element.props as { padding?: string };
    return (
      <div className={padding === 'none' ? '' : padding === 'sm' ? 'p-3' : padding === 'lg' ? 'p-6' : 'p-4'}>
        {children}
      </div>
    );
  },

  CardFooter: ({ element, children }) => {
    const { align = 'end' } = element.props as { align?: string };
    return (
      <div className={`flex items-center gap-2 p-4 pt-0 ${
        align === 'start' ? 'justify-start' : align === 'center' ? 'justify-center' : align === 'between' ? 'justify-between' : 'justify-end'
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
        color === 'primary' ? 'text-blue-600' : color === 'muted' ? 'text-gray-500' : 'text-gray-900'
      } ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
        {text}
      </Tag>
    );
  },

  Text: ({ element }) => {
    const { content, size = 'md', color = 'default', align = 'left', truncate, lines } = element.props as { content: string; size?: string; color?: string; align?: string; truncate?: boolean; lines?: number };
    return (
      <p
        className={`${
          size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        } ${color === 'muted' ? 'text-gray-500' : color === 'primary' ? 'text-blue-600' : 'text-gray-700'} ${
          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
        } ${truncate ? 'truncate' : ''}`}
        style={lines ? { display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties : undefined}
      >
        {content}
      </p>
    );
  },

  Link: ({ element }) => {
    const { text, href, external, variant = 'default' } = element.props as { text: string; href: string; external?: boolean; variant?: string };
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center gap-1 ${
          variant === 'underline' ? 'underline underline-offset-4' : ''
        } text-blue-600 hover:text-blue-700 transition-colors`}
      >
        {text}
        {external && (
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  },

  // Buttons
  Button: ({ element }) => {
    const { label, variant = 'solid', size = 'md', fullWidth, disabled, loading, leftIcon, rightIcon } = element.props as { label: string; variant?: string; size?: string; fullWidth?: boolean; disabled?: boolean; loading?: boolean; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode };
    return (
      <button
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          size === 'xs' ? 'h-7 px-2 text-xs rounded' :
          size === 'sm' ? 'h-8 px-3 text-sm rounded-md' :
          size === 'lg' ? 'h-11 px-6 text-base rounded-lg' :
          'h-9 px-4 text-sm rounded-md'
        } ${fullWidth ? 'w-full' : ''} ${
          variant === 'solid' ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' :
          variant === 'outline' ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' :
          variant === 'ghost' ? 'text-gray-700 hover:bg-gray-100' :
          'text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline'
        }`}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && leftIcon}
        {label}
        {!loading && rightIcon}
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
        } ${variant === 'solid' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <span className="h-5 w-5">[{icon}]</span>
      </button>
    );
  },

  ButtonGroup: ({ element, children }) => {
    const { attached, orientation = 'horizontal' } = element.props as { attached?: boolean; orientation?: string };
    return (
      <div className={`inline-flex ${orientation === 'vertical' ? 'flex-col' : ''} ${attached ? '-space-x-px' : 'gap-1'}`}>
        {children}
      </div>
    );
  },

  // Form Components
  Input: ({ element }) => {
    const { label, placeholder, type = 'text', size = 'md', variant = 'outline', disabled, error, hint, leftIcon, rightIcon } = element.props as { label?: string; placeholder?: string; type?: string; size?: string; variant?: string; disabled?: boolean; error?: string; hint?: string; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode };
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</span>}
          <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${
              size === 'sm' ? 'h-8 text-sm' : size === 'lg' ? 'h-11' : 'h-9'
            } ${
              variant === 'filled' ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'
            } border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>}
        </div>
        {(hint || error) && (
          <p className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>{error || hint}</p>
        )}
      </div>
    );
  },

  TextArea: ({ element }) => {
    const { label, placeholder, rows = 4, resize = 'vertical', disabled, error, hint } = element.props as { label?: string; placeholder?: string; rows?: number; resize?: string; disabled?: boolean; error?: string; hint?: string };
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${
            resize === 'none' ? 'resize-none' : resize === 'horizontal' ? 'resize-x' : resize === 'both' ? 'resize' : 'resize-y'
          } ${error ? 'border-red-500' : ''}`}
        />
        {(hint || error) && <p className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>{error || hint}</p>}
      </div>
    );
  },

  Select: ({ element }) => {
    const { label, placeholder, options = [], disabled, error } = element.props as { label?: string; placeholder?: string; options?: { value: string; label: string }[]; disabled?: boolean; error?: string };
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <select
          disabled={disabled}
          className={`w-full h-9 px-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
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
    const { label, checked, disabled, size = 'md' } = element.props as { label?: string; checked?: boolean; disabled?: boolean; size?: string };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
            size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
          }`}
          readOnly
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  },

  Radio: ({ element }) => {
    const { label, value, disabled, size = 'md' } = element.props as { label?: string; value?: string; disabled?: boolean; size?: string };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value={value}
          disabled={disabled}
          className={`border-gray-300 text-blue-600 focus:ring-blue-500 ${
            size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
          }`}
          readOnly
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  },

  RadioGroup: ({ element, children }) => {
    const { label, orientation = 'vertical' } = element.props as { label?: string; orientation?: string };
    return (
      <fieldset className="space-y-2">
        {label && <legend className="text-sm font-medium text-gray-700">{label}</legend>}
        <div className={orientation === 'horizontal' ? 'flex gap-4' : 'space-y-2'}>
          {children}
        </div>
      </fieldset>
    );
  },

  Switch: ({ element }) => {
    const { label, checked, disabled, size = 'md' } = element.props as { label?: string; checked?: boolean; disabled?: boolean; size?: string };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <button
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          className={`relative inline-flex ${
            size === 'sm' ? 'h-4 w-7' : size === 'lg' ? 'h-7 w-12' : 'h-5 w-9'
          } items-center rounded-full transition-colors ${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          } disabled:opacity-50`}
        >
          <span className={`inline-block transform transition-transform ${
            size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
          } rounded-full bg-white shadow-lg ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`} />
        </button>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
    );
  },

  Slider: ({ element }) => {
    const { label, min = 0, max = 100, step = 1, showValue } = element.props as { label?: string; min?: number; max?: number; step?: number; showValue?: boolean };
    return (
      <div className="w-full space-y-1.5">
        <div className="flex justify-between">
          {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
          {showValue && <span className="text-sm text-gray-500">50</span>}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    );
  },

  // Data Display
  Badge: ({ element }) => {
    const { text, variant = 'solid', color = 'default', size = 'md', rounded } = element.props as { text: string; variant?: string; color?: string; size?: string; rounded?: boolean };
    return (
      <span className={`inline-flex items-center font-medium ${
        size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-sm'
      } ${rounded ? 'rounded-full' : 'rounded-md'} ${
        variant === 'solid' ? (
          color === 'success' ? 'bg-green-600 text-white' :
          color === 'error' ? 'bg-red-600 text-white' :
          color === 'warning' ? 'bg-yellow-500 text-white' :
          color === 'info' ? 'bg-blue-600 text-white' :
          'bg-gray-900 text-white'
        ) : variant === 'outline' ? (
          color === 'success' ? 'border border-green-600 text-green-600' :
          color === 'error' ? 'border border-red-600 text-red-600' :
          'border border-gray-300 text-gray-700'
        ) : (
          color === 'success' ? 'bg-green-100 text-green-800' :
          color === 'error' ? 'bg-red-100 text-red-800' :
          color === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-700'
        )
      }`}>
        {text}
      </span>
    );
  },

  Avatar: ({ element }) => {
    const { src, name, size = 'md', status } = element.props as { src?: string; name?: string; size?: string; status?: string };
    const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
    const sizeClass = size === 'xs' ? 'h-6 w-6 text-xs' : size === 'sm' ? 'h-8 w-8 text-sm' : size === 'lg' ? 'h-12 w-12 text-lg' : 'h-10 w-10';

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
          <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
            status === 'online' ? 'bg-green-500' : status === 'busy' ? 'bg-red-500' : status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
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
      <div className="flex -space-x-2">
        {visible.map((child, i) => (
          <div key={i} className="ring-2 ring-white rounded-full">{child}</div>
        ))}
        {remaining > 0 && (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 ring-2 ring-white">
            +{remaining}
          </div>
        )}
      </div>
    );
  },

  Icon: ({ element }) => {
    const { name, size = 'md', color = 'default' } = element.props as { name: string; size?: string; color?: string };
    return (
      <span className={`inline-flex ${
        size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
      } ${color === 'primary' ? 'text-blue-600' : color === 'muted' ? 'text-gray-400' : 'text-current'}`}>
        [{name}]
      </span>
    );
  },

  Image: ({ element }) => {
    const { src, alt, fit = 'cover', rounded = 'md', width, height } = element.props as { src: string; alt: string; fit?: string; rounded?: string; width?: number; height?: number };
    return (
      <img
        src={src}
        alt={alt}
        style={{ width, height }}
        className={`${
          fit === 'contain' ? 'object-contain' : fit === 'fill' ? 'object-fill' : 'object-cover'
        } ${
          rounded === 'none' ? '' : rounded === 'sm' ? 'rounded-sm' : rounded === 'full' ? 'rounded-full' : 'rounded-lg'
        }`}
      />
    );
  },

  List: ({ element, children }) => {
    const { variant = 'unordered', spacing = 'sm' } = element.props as { variant?: string; spacing?: string };
    const Tag = variant === 'ordered' ? 'ol' : 'ul';
    return (
      <Tag className={`${
        variant === 'ordered' ? 'list-decimal' : variant === 'unordered' ? 'list-disc' : 'list-none'
      } ${variant !== 'none' ? 'pl-5' : ''} ${
        spacing === 'xs' ? 'space-y-0.5' : spacing === 'lg' ? 'space-y-3' : 'space-y-1'
      }`}>
        {children}
      </Tag>
    );
  },

  ListItem: ({ element, children }) => {
    const { icon } = element.props as { icon?: React.ReactNode };
    return (
      <li className={icon ? 'flex items-start gap-2 list-none' : ''}>
        {icon && <span className="flex-shrink-0 mt-0.5 text-gray-400">{icon}</span>}
        {children}
      </li>
    );
  },

  Table: ({ element, children }) => {
    const { variant = 'simple' } = element.props as { variant?: string };
    return (
      <div className="relative w-full overflow-auto">
        <table className={`w-full text-sm ${
          variant === 'striped' ? '[&_tbody_tr:nth-child(odd)]:bg-gray-50' :
          variant === 'bordered' ? '[&_th]:border [&_td]:border' : ''
        }`}>
          {children}
        </table>
      </div>
    );
  },

  TableHeader: ({ children }) => <thead className="border-b">{children}</thead>,
  TableBody: ({ children }) => <tbody>{children}</tbody>,
  TableRow: ({ element, children }) => {
    const { hoverable, selected } = element.props as { hoverable?: boolean; selected?: boolean };
    return (
      <tr className={`border-b ${hoverable ? 'hover:bg-gray-50' : ''} ${selected ? 'bg-blue-50' : ''}`}>
        {children}
      </tr>
    );
  },
  TableCell: ({ element, children }) => {
    const { header, align = 'left', width } = element.props as { header?: boolean; align?: string; width?: string | number };
    const Tag = header ? 'th' : 'td';
    return (
      <Tag className={`px-4 py-3 ${
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
      } ${header ? 'font-medium text-gray-500' : ''}`} style={{ width }}>
        {children}
      </Tag>
    );
  },

  Metric: ({ element }) => {
    const { label, value, change, changeType = 'neutral', icon } = element.props as { label: string; value: string; change?: string; changeType?: string; icon?: React.ReactNode };
    return (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {change && (
            <span className={`flex items-center text-sm font-medium ${
              changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : ''}
              {change}
            </span>
          )}
        </div>
      </div>
    );
  },

  Progress: ({ element }) => {
    const { value = 0, max = 100, size = 'md', color = 'primary', showValue } = element.props as { value?: number; max?: number; size?: string; color?: string; showValue?: boolean };
    return (
      <div className="flex items-center gap-2 w-full">
        <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${
          size === 'xs' ? 'h-1' : size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3'
        }`}>
          <div
            className={`h-full transition-all ${color === 'success' ? 'bg-green-600' : color === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}
            style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
          />
        </div>
        {showValue && <span className="text-sm text-gray-500">{Math.round((value / max) * 100)}%</span>}
      </div>
    );
  },

  // Feedback
  Alert: ({ element }) => {
    const { title, description, status = 'info', closable } = element.props as { title?: string; description: string; status?: string; closable?: boolean };
    return (
      <div className={`relative rounded-lg p-4 ${
        status === 'success' ? 'bg-green-50 text-green-800' :
        status === 'error' ? 'bg-red-50 text-red-800' :
        status === 'warning' ? 'bg-yellow-50 text-yellow-800' :
        'bg-blue-50 text-blue-800'
      }`}>
        {title && <h5 className="font-medium mb-1">{title}</h5>}
        <p className="text-sm">{description}</p>
        {closable && (
          <button className="absolute right-2 top-2 p-1 hover:opacity-70">×</button>
        )}
      </div>
    );
  },

  Toast: ({ element }) => {
    const { title, description, status = 'info' } = element.props as { title: string; description?: string; status?: string };
    return (
      <div className={`rounded-lg p-4 shadow-lg ${
        status === 'success' ? 'bg-green-600 text-white' :
        status === 'error' ? 'bg-red-600 text-white' :
        'bg-gray-900 text-white'
      }`}>
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
    );
  },

  Skeleton: ({ element }) => {
    const { variant = 'text', width, height, lines = 1 } = element.props as { variant?: string; width?: number; height?: number; lines?: number };
    if (lines > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`animate-pulse bg-gray-200 h-4 rounded ${i === lines - 1 ? 'w-3/5' : 'w-full'}`}
            />
          ))}
        </div>
      );
    }
    return (
      <div
        className={`animate-pulse bg-gray-200 ${
          variant === 'circular' ? 'rounded-full' : variant === 'rectangular' ? '' : 'rounded'
        }`}
        style={{ width, height: height || (variant === 'text' ? '1rem' : undefined) }}
      />
    );
  },

  Spinner: ({ element }) => {
    const { size = 'md', color = 'primary', label } = element.props as { size?: string; color?: string; label?: string };
    return (
      <div className="inline-flex items-center gap-2">
        <svg
          className={`animate-spin ${
            size === 'xs' ? 'h-4 w-4' : size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'
          } ${color === 'primary' ? 'text-blue-600' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {label && <span className="text-sm text-gray-500">{label}</span>}
      </div>
    );
  },

  EmptyState: ({ element }) => {
    const { icon, title, description, actionLabel } = element.props as { icon?: React.ReactNode; title: string; description?: string; actionLabel?: string };
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {icon && <div className="mb-4 text-gray-400">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500 max-w-sm">{description}</p>}
        {actionLabel && (
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            {actionLabel}
          </button>
        )}
      </div>
    );
  },

  // Navigation
  Tabs: ({ element, children }) => {
    const { defaultValue } = element.props as { defaultValue?: string };
    return <div className="w-full" data-default-value={defaultValue}>{children}</div>;
  },
  TabList: ({ children }) => (
    <div className="inline-flex items-center border-b border-gray-200">{children}</div>
  ),
  Tab: ({ element }) => {
    const { value, label, icon, disabled } = element.props as { value: string; label: string; icon?: React.ReactNode; disabled?: boolean };
    return (
      <button
        data-value={value}
        disabled={disabled}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 disabled:opacity-50"
      >
        {icon}
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
      <a href={href} className="text-gray-500 hover:text-gray-700">{label}</a>
    ) : (
      <span className="text-gray-500">{label}</span>
    );
  },

  Pagination: ({ element }) => {
    const { totalPages, currentPage = 1, showFirstLast = true } = element.props as { totalPages: number; currentPage?: number; showFirstLast?: boolean };
    return (
      <nav className="flex items-center gap-1">
        {showFirstLast && (
          <button className="h-8 w-8 flex items-center justify-center rounded border text-sm disabled:opacity-50" disabled={currentPage === 1}>
            ««
          </button>
        )}
        <button className="h-8 w-8 flex items-center justify-center rounded border text-sm disabled:opacity-50" disabled={currentPage === 1}>
          «
        </button>
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
          <button
            key={i}
            className={`h-8 w-8 flex items-center justify-center rounded border text-sm ${
              currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button className="h-8 w-8 flex items-center justify-center rounded border text-sm disabled:opacity-50" disabled={currentPage === totalPages}>
          »
        </button>
        {showFirstLast && (
          <button className="h-8 w-8 flex items-center justify-center rounded border text-sm disabled:opacity-50" disabled={currentPage === totalPages}>
            »»
          </button>
        )}
      </nav>
    );
  },

  NavMenu: ({ element, children }) => {
    const { orientation = 'horizontal' } = element.props as { orientation?: string };
    return (
      <nav className={`flex gap-1 ${orientation === 'vertical' ? 'flex-col' : 'items-center'}`}>
        {children}
      </nav>
    );
  },

  NavItem: ({ element }) => {
    const { label, href = '#', icon, active, badge } = element.props as { label: string; href?: string; icon?: React.ReactNode; active?: boolean; badge?: string };
    return (
      <a
        href={href}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
          active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {icon}
        {label}
        {badge && (
          <span className="ml-auto px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs">
            {badge}
          </span>
        )}
      </a>
    );
  },

  // Overlays (simplified)
  Modal: ({ element, children }) => {
    const { title } = element.props as { title?: string };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
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
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
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
        <button className="px-3 py-2">{trigger}</button>
        <div className="absolute z-50 mt-1 bg-white border rounded-lg shadow-lg hidden group-hover:block min-w-[160px]">
          {children}
        </div>
      </div>
    );
  },

  DropdownItem: ({ element }) => {
    const { label, icon, disabled, destructive } = element.props as { label: string; icon?: React.ReactNode; disabled?: boolean; destructive?: boolean };
    return (
      <button
        disabled={disabled}
        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${destructive ? 'text-red-600' : ''} ${disabled ? 'opacity-50' : ''}`}
      >
        {icon}
        {label}
      </button>
    );
  },

  // Accordion
  Accordion: ({ children }) => <div className="divide-y divide-gray-200 rounded-lg border">{children}</div>,

  AccordionItem: ({ element, children }) => {
    const { title, icon } = element.props as { title: string; icon?: React.ReactNode };
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-gray-50"
        >
          <span className="flex items-center gap-2">{icon}{title}</span>
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="px-4 pb-4 text-sm text-gray-600">{children}</div>}
      </div>
    );
  },

  Collapsible: ({ element, children }) => {
    const { title, defaultOpen = false } = element.props as { title: string; defaultOpen?: boolean };
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
      <div className="rounded-lg border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-3 font-medium"
        >
          {title}
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="px-4 pb-4">{children}</div>}
      </div>
    );
  },

  // Specialized
  Chart: ({ element }) => {
    const { type, height = 200 } = element.props as { type: string; height?: number };
    return (
      <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <span className="text-gray-500">Chart: {type}</span>
      </div>
    );
  },

  Calendar: () => <div className="p-4 border rounded-lg bg-gray-50">Calendar</div>,

  DatePicker: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="date" placeholder={placeholder} className="w-full h-9 px-3 border rounded-md" />
      </div>
    );
  },

  FileUpload: ({ element }) => {
    const { label, accept } = element.props as { label?: string; accept?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="file" accept={accept} className="w-full text-sm" />
      </div>
    );
  },

  Rating: ({ element }) => {
    const { max = 5, value = 0, readonly } = element.props as { max?: number; value?: number; readonly?: boolean };
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <button key={i} disabled={readonly} className={`text-lg ${i < value ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </button>
        ))}
      </div>
    );
  },

  TagInput: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="flex flex-wrap gap-1 p-2 border rounded-md min-h-[40px]">
          <input placeholder={placeholder} className="flex-1 min-w-[100px] outline-none" />
        </div>
      </div>
    );
  },

  ColorPicker: ({ element }) => {
    const { label } = element.props as { label?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="color" className="h-10 w-20 rounded cursor-pointer" />
      </div>
    );
  },

  Timeline: ({ element, children }) => {
    const { orientation = 'vertical' } = element.props as { orientation?: string };
    return (
      <div className={`relative ${orientation === 'horizontal' ? 'flex' : 'space-y-4'}`}>
        {children}
      </div>
    );
  },

  TimelineItem: ({ element }) => {
    const { title, description, time, status = 'upcoming' } = element.props as { title: string; description?: string; time?: string; status?: string };
    return (
      <div className="relative flex gap-4">
        <div className="absolute left-4 top-8 -bottom-4 w-0.5 bg-gray-200 last:hidden" />
        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
          status === 'completed' ? 'bg-green-600 text-white' :
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
            {i < steps.length - 1 && (
              <div className={`bg-gray-200 ${orientation === 'horizontal' ? 'h-0.5 flex-1 mx-2' : 'w-0.5 h-8 ml-4 my-1'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },

  Step: ({ element }) => {
    const { title, description, stepIndex = 0, currentStep = 0 } = element.props as { title: string; description?: string; stepIndex?: number; currentStep?: number };
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
        <div>
          <p className={`text-sm font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>{title}</p>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
    );
  },

  Code: ({ element }) => {
    const { code, language = 'text', showLineNumbers } = element.props as { code: string; language?: string; showLineNumbers?: boolean };
    return (
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code className={`language-${language}`}>
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
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 border rounded">{key}</kbd>
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
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">
          <p>{text}</p>
        </blockquote>
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
    const { label, value, helpText, icon, trend } = element.props as { label: string; value: string; helpText?: string; icon?: React.ReactNode; trend?: { direction: string; value: string } };
    return (
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{label}</span>
          {icon}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {trend && (
            <span className={`flex items-center text-sm font-medium ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
      </div>
    );
  },

  Tag: ({ element }) => {
    const { label, variant = 'subtle', size = 'md', closable } = element.props as { label: string; variant?: string; size?: string; closable?: boolean };
    return (
      <span className={`inline-flex items-center gap-1 ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      } rounded-full font-medium ${
        variant === 'solid' ? 'bg-gray-900 text-white' :
        variant === 'outline' ? 'border border-gray-300 text-gray-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {label}
        {closable && <button className="ml-0.5 text-current hover:opacity-70">×</button>}
      </span>
    );
  },
};

// Registry Definition
export const tailwindRegistry: RegistryDefinition = {
  name: 'tailwind',
  displayName: 'Tailwind CSS',
  description: 'Pure Tailwind CSS components with modern design',
  framework: 'tailwind',
  components: tailwindComponents,
  theme: tailwindTheme,
};

export { tailwindComponents, tailwindTheme };
