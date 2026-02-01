'use client';

/**
 * Placeholder Components
 *
 * Provides fallback component implementations for frameworks
 * that are not yet fully implemented.
 */

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { UIFramework } from '@/types';
import type { FrameworkInfo } from './framework-registry';

/**
 * Create a placeholder registry for unavailable frameworks
 */
export function createPlaceholderRegistry(
  framework: UIFramework,
  info: FrameworkInfo
): ComponentRegistry {
  return {
    Container: ({ children }: ComponentRenderProps) => (
      <div className="mx-auto max-w-4xl px-4">{children}</div>
    ),
    Stack: ({ children }: ComponentRenderProps) => (
      <div className="flex flex-col gap-4">{children}</div>
    ),
    Row: ({ children }: ComponentRenderProps) => (
      <div className="flex flex-row gap-4">{children}</div>
    ),
    Column: ({ children }: ComponentRenderProps) => (
      <div className="flex flex-col gap-4">{children}</div>
    ),
    Grid: ({ element, children }: ComponentRenderProps) => {
      const { columns = 3 } = element.props as { columns?: number };
      return (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {children}
        </div>
      );
    },
    Text: ({ element }: ComponentRenderProps) => {
      const { text } = element.props as { text?: string };
      return <p className="text-gray-700">{text}</p>;
    },
    Heading: ({ element }: ComponentRenderProps) => {
      const { text, level = 2 } = element.props as {
        text?: string;
        level?: number;
      };
      const sizeClasses: Record<number, string> = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-base',
      };
      const className = `font-bold text-gray-900 ${sizeClasses[level] || sizeClasses[2]}`;
      switch (level) {
        case 1: return <h1 className={className}>{text}</h1>;
        case 2: return <h2 className={className}>{text}</h2>;
        case 3: return <h3 className={className}>{text}</h3>;
        case 4: return <h4 className={className}>{text}</h4>;
        case 5: return <h5 className={className}>{text}</h5>;
        case 6: return <h6 className={className}>{text}</h6>;
        default: return <h2 className={className}>{text}</h2>;
      }
    },
    Button: ({ element }: ComponentRenderProps) => {
      const { label, variant } = element.props as {
        label?: string;
        variant?: string;
      };
      return (
        <button
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            variant === 'outline'
              ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {label}
        </button>
      );
    },
    Card: ({ element, children }: ComponentRenderProps) => {
      const { title, description } = element.props as {
        title?: string;
        description?: string;
      };
      return (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {description && (
            <p className="text-gray-500 text-sm mb-4">{description}</p>
          )}
          {children}
        </div>
      );
    },
    CardHeader: ({ element }: ComponentRenderProps) => {
      const { title, subtitle } = element.props as {
        title?: string;
        subtitle?: string;
      };
      return (
        <div className="pb-4 border-b">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      );
    },
    CardBody: ({ children }: ComponentRenderProps) => (
      <div className="py-4">{children}</div>
    ),
    CardFooter: ({ children }: ComponentRenderProps) => (
      <div className="pt-4 border-t flex gap-2 justify-end">{children}</div>
    ),
    Input: ({ element }: ComponentRenderProps) => {
      const { label, placeholder, type = 'text' } = element.props as {
        label?: string;
        placeholder?: string;
        type?: string;
      };
      return (
        <div className="space-y-1.5">
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}</label>
          )}
          <input
            type={type}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    },
    TextArea: ({ element }: ComponentRenderProps) => {
      const { label, placeholder, rows = 4 } = element.props as {
        label?: string;
        placeholder?: string;
        rows?: number;
      };
      return (
        <div className="space-y-1.5">
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}</label>
          )}
          <textarea
            placeholder={placeholder}
            rows={rows}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    },
    Select: ({ element }: ComponentRenderProps) => {
      const { label, options = [], placeholder } = element.props as {
        label?: string;
        options?: { value: string; label: string }[];
        placeholder?: string;
      };
      return (
        <div className="space-y-1.5">
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}</label>
          )}
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    },
    Badge: ({ element }: ComponentRenderProps) => {
      const { text, color = 'gray' } = element.props as {
        text?: string;
        color?: string;
      };
      const colorClasses: Record<string, string> = {
        gray: 'bg-gray-100 text-gray-800',
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
      };
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            colorClasses[color] || colorClasses.gray
          }`}
        >
          {text}
        </span>
      );
    },
    Alert: ({ element }: ComponentRenderProps) => {
      const { title, description, status = 'info' } = element.props as {
        title?: string;
        description?: string;
        status?: string;
      };
      const statusColors: Record<string, string> = {
        info: 'bg-blue-50 text-blue-800 border-blue-200',
        success: 'bg-green-50 text-green-800 border-green-200',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        error: 'bg-red-50 text-red-800 border-red-200',
      };
      return (
        <div
          className={`p-4 rounded-lg border ${
            statusColors[status] || statusColors.info
          }`}
        >
          {title && <h4 className="font-medium">{title}</h4>}
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
      );
    },
    Divider: () => <hr className="my-4 border-gray-200" />,
    Spacer: ({ element }: ComponentRenderProps) => {
      const { size = 'md' } = element.props as { size?: string };
      const sizeClasses: Record<string, string> = {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-8',
        xl: 'h-16',
      };
      return <div className={sizeClasses[size] || sizeClasses.md} />;
    },
    Avatar: ({ element }: ComponentRenderProps) => {
      const { src, name, size = 'md' } = element.props as {
        src?: string;
        name?: string;
        size?: string;
      };
      const sizeClasses: Record<string, string> = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
      };
      const initials = name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${
            sizeClasses[size] || sizeClasses.md
          } rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600`}
        >
          {initials || '?'}
        </div>
      );
    },
    Icon: ({ element }: ComponentRenderProps) => {
      const { name, size = 'md' } = element.props as { name?: string; size?: string };
      const sizeClasses: Record<string, string> = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      };
      return (
        <span
          className={`${sizeClasses[size] || sizeClasses.md} inline-flex items-center justify-center`}
        >
          [{name}]
        </span>
      );
    },
    Image: ({ element }: ComponentRenderProps) => {
      const { src, alt, width, height } = element.props as {
        src?: string;
        alt?: string;
        width?: number | string;
        height?: number | string;
      };
      return (
        <img
          src={src}
          alt={alt || ''}
          style={{ width, height }}
          className="object-cover rounded-lg"
        />
      );
    },
    List: ({ children }: ComponentRenderProps) => (
      <ul className="space-y-1 list-disc pl-5">{children}</ul>
    ),
    ListItem: ({ element, children }: ComponentRenderProps) => {
      const { text } = element.props as { text?: string };
      return <li>{text || children}</li>;
    },
    // Add placeholder message component
    PlaceholderMessage: () => (
      <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-500 text-sm">
          {info.displayName} components are coming soon.
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Currently using placeholder components.
        </p>
      </div>
    ),
  };
}
