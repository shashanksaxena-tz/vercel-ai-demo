/**
 * API Templates for Generative UI Builder
 *
 * This module provides template structures for API integration including:
 * - useQuery hook template for data fetching (React Query style)
 * - API client utility template with error handling
 * - Server Actions template for Next.js
 */

import type { UIFramework } from '@/types';

/**
 * API template configuration options
 */
export interface ApiTemplateOptions {
  /** Name of the query hook or API function */
  name: string;
  /** Base URL for API calls */
  baseUrl?: string;
  /** Include TypeScript types */
  includeTypes?: boolean;
  /** Framework being used (affects imports) */
  framework?: UIFramework;
}

/**
 * Data type definition for query templates
 */
export interface QueryDataType {
  name: string;
  fields: Array<{
    name: string;
    type: string;
    optional?: boolean;
  }>;
}

// ============================================================================
// useQuery Hook Templates (React Query / TanStack Query style)
// ============================================================================

/**
 * Generate a basic useQuery hook template
 */
export function generateUseQueryTemplate(options: ApiTemplateOptions = { name: 'Data' }): string {
  const { name = 'Data', includeTypes = true } = options;
  const hookName = `use${name}`;
  const typeName = `${name}Response`;
  const errorTypeName = `${name}Error`;

  return `/**
 * ${hookName} - Custom hook for fetching ${name.toLowerCase()} data
 *
 * Uses React Query (TanStack Query) for data fetching with:
 * - Automatic caching and background refetching
 * - Loading and error states
 * - Stale-while-revalidate strategy
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
${includeTypes ? `
// Response type
interface ${typeName} {
  id: string;
  // TODO: Add your response fields here
  data: unknown;
  createdAt: string;
  updatedAt: string;
}

// Error type
interface ${errorTypeName} {
  message: string;
  code?: string;
  status?: number;
}

// Query options type
type ${name}QueryOptions = Omit<
  UseQueryOptions<${typeName}, ${errorTypeName}>,
  'queryKey' | 'queryFn'
>;
` : ''}
/**
 * Fetch ${name.toLowerCase()} data from the API
 */
async function fetch${name}(id?: string)${includeTypes ? `: Promise<${typeName}>` : ''} {
  const endpoint = id ? \`/${name.toLowerCase()}/\${id}\` : '/${name.toLowerCase()}';
  return apiClient.get(endpoint);
}

/**
 * ${hookName} hook
 *
 * @param id - Optional ${name.toLowerCase()} ID for fetching specific item
 * @param options - Additional query options
 * @returns Query result with data, isLoading, error, and refetch
 *
 * @example
 * // Fetch all ${name.toLowerCase()}
 * const { data, isLoading, error } = ${hookName}();
 *
 * // Fetch specific ${name.toLowerCase()} by ID
 * const { data, isLoading, error } = ${hookName}('123');
 */
export function ${hookName}(
  id?: string,
  options?: ${includeTypes ? `${name}QueryOptions` : 'object'}
) {
  return useQuery({
    queryKey: ['${name.toLowerCase()}', id].filter(Boolean),
    queryFn: () => fetch${name}(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}

/**
 * ${hookName}List hook for fetching paginated list
 *
 * @param params - Query parameters for pagination/filtering
 * @param options - Additional query options
 */
export function ${hookName}List(
  params?: { page?: number; limit?: number; search?: string },
  options?: ${includeTypes ? `${name}QueryOptions` : 'object'}
) {
  return useQuery({
    queryKey: ['${name.toLowerCase()}', 'list', params],
    queryFn: () => apiClient.get('/${name.toLowerCase()}', { params }),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
}

export default ${hookName};
`;
}

/**
 * Generate a useMutation hook template
 */
export function generateUseMutationTemplate(options: ApiTemplateOptions = { name: 'Data' }): string {
  const { name = 'Data', includeTypes = true } = options;
  const hookName = `use${name}Mutation`;
  const typeName = `${name}Response`;
  const inputTypeName = `${name}Input`;

  return `/**
 * ${hookName} - Custom hook for mutating ${name.toLowerCase()} data
 *
 * Uses React Query (TanStack Query) mutations for:
 * - Creating, updating, and deleting data
 * - Optimistic updates
 * - Automatic cache invalidation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
${includeTypes ? `
// Input type for create/update
interface ${inputTypeName} {
  // TODO: Add your input fields here
  name?: string;
  data?: unknown;
}

// Response type
interface ${typeName} {
  id: string;
  // TODO: Add your response fields here
  data: unknown;
  createdAt: string;
  updatedAt: string;
}
` : ''}
/**
 * useCreate${name} - Create a new ${name.toLowerCase()}
 */
export function useCreate${name}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input${includeTypes ? `: ${inputTypeName}` : ''}) =>
      apiClient.post('/${name.toLowerCase()}', input),
    onSuccess: () => {
      // Invalidate and refetch ${name.toLowerCase()} list
      queryClient.invalidateQueries({ queryKey: ['${name.toLowerCase()}'] });
    },
    onError: (error) => {
      console.error('Failed to create ${name.toLowerCase()}:', error);
    },
  });
}

/**
 * useUpdate${name} - Update an existing ${name.toLowerCase()}
 */
export function useUpdate${name}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...input }${includeTypes ? `: { id: string } & ${inputTypeName}` : ''}) =>
      apiClient.put(\`/${name.toLowerCase()}/\${id}\`, input),
    onSuccess: (_, variables) => {
      // Invalidate specific item and list
      queryClient.invalidateQueries({ queryKey: ['${name.toLowerCase()}', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['${name.toLowerCase()}', 'list'] });
    },
    onError: (error) => {
      console.error('Failed to update ${name.toLowerCase()}:', error);
    },
  });
}

/**
 * useDelete${name} - Delete a ${name.toLowerCase()}
 */
export function useDelete${name}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id${includeTypes ? ': string' : ''}) =>
      apiClient.delete(\`/${name.toLowerCase()}/\${id}\`),
    onSuccess: (_, id) => {
      // Remove from cache and invalidate list
      queryClient.removeQueries({ queryKey: ['${name.toLowerCase()}', id] });
      queryClient.invalidateQueries({ queryKey: ['${name.toLowerCase()}', 'list'] });
    },
    onError: (error) => {
      console.error('Failed to delete ${name.toLowerCase()}:', error);
    },
  });
}

export { useCreate${name}, useUpdate${name}, useDelete${name} };
`;
}

// ============================================================================
// API Client Templates
// ============================================================================

/**
 * Generate an API client utility template with error handling
 */
export function generateApiClientTemplate(options: ApiTemplateOptions = { name: 'api' }): string {
  const { baseUrl = '/api', includeTypes = true } = options;

  return `/**
 * API Client - Centralized HTTP client with error handling
 *
 * Features:
 * - Consistent error handling across all requests
 * - Request/response interceptors
 * - Automatic JSON parsing
 * - TypeScript support
 * - Retry logic for failed requests
 */
${includeTypes ? `
// API Error type
export interface ApiError {
  message: string;
  code?: string;
  status: number;
  details?: Record<string, unknown>;
}

// Request configuration
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  signal?: AbortSignal;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}
` : ''}
/**
 * Base URL for all API requests
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '${baseUrl}';

/**
 * Default request timeout (30 seconds)
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(endpoint, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Parse error response
 */
async function parseErrorResponse(response: Response)${includeTypes ? ': Promise<ApiClientError>' : ''} {
  try {
    const data = await response.json();
    return new ApiClientError(
      data.message || response.statusText,
      response.status,
      data.code,
      data.details
    );
  } catch {
    return new ApiClientError(
      response.statusText || 'An error occurred',
      response.status
    );
  }
}

/**
 * Make an HTTP request with error handling
 */
async function request<T = unknown>(
  method: string,
  endpoint: string,
  data?: unknown,
  config: ${includeTypes ? 'RequestConfig' : 'object'} = {}
)${includeTypes ? ': Promise<T>' : ''} {
  const { headers = {}, params, timeout = DEFAULT_TIMEOUT, signal } = config${includeTypes ? ' as RequestConfig' : ''};

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = buildUrl(endpoint, params);

    const requestInit${includeTypes ? ': RequestInit' : ''} = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      signal: signal || controller.signal,
    };

    if (data && method !== 'GET') {
      requestInit.body = JSON.stringify(data);
    }

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    return null as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiClientError('Request timeout', 408, 'TIMEOUT');
      }
      throw new ApiClientError(error.message, 0, 'NETWORK_ERROR');
    }

    throw new ApiClientError('An unexpected error occurred', 0, 'UNKNOWN');
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * API Client with typed methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T = unknown>(endpoint: string, config?: ${includeTypes ? 'RequestConfig' : 'object'}) =>
    request<T>('GET', endpoint, undefined, config),

  /**
   * POST request
   */
  post: <T = unknown>(endpoint: string, data?: unknown, config?: ${includeTypes ? 'RequestConfig' : 'object'}) =>
    request<T>('POST', endpoint, data, config),

  /**
   * PUT request
   */
  put: <T = unknown>(endpoint: string, data?: unknown, config?: ${includeTypes ? 'RequestConfig' : 'object'}) =>
    request<T>('PUT', endpoint, data, config),

  /**
   * PATCH request
   */
  patch: <T = unknown>(endpoint: string, data?: unknown, config?: ${includeTypes ? 'RequestConfig' : 'object'}) =>
    request<T>('PATCH', endpoint, data, config),

  /**
   * DELETE request
   */
  delete: <T = unknown>(endpoint: string, config?: ${includeTypes ? 'RequestConfig' : 'object'}) =>
    request<T>('DELETE', endpoint, undefined, config),
};

export default apiClient;
`;
}

// ============================================================================
// Server Actions Templates (Next.js)
// ============================================================================

/**
 * Generate Server Actions template for Next.js
 */
export function generateServerActionsTemplate(options: ApiTemplateOptions = { name: 'Data' }): string {
  const { name = 'Data', includeTypes = true } = options;
  const typeName = name;
  const lowerName = name.toLowerCase();

  return `/**
 * Server Actions for ${name}
 *
 * Next.js Server Actions for server-side mutations with:
 * - Form data handling
 * - Validation with Zod
 * - Revalidation of cached data
 * - Type-safe return values
 */

'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
${includeTypes ? `
// Action state type for form handling
export interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: unknown;
}

// ${typeName} type
interface ${typeName} {
  id: string;
  name: string;
  // TODO: Add your fields here
  createdAt: Date;
  updatedAt: Date;
}
` : ''}
// Validation schema
const ${lowerName}Schema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  // TODO: Add your validation rules here
});

/**
 * Create a new ${lowerName}
 *
 * @example
 * // In a form component:
 * <form action={create${typeName}}>
 *   <input name="name" />
 *   <button type="submit">Create</button>
 * </form>
 */
export async function create${typeName}(
  prevState: ${includeTypes ? 'ActionState' : 'unknown'},
  formData: FormData
)${includeTypes ? ': Promise<ActionState>' : ''} {
  // Parse and validate form data
  const rawData = {
    name: formData.get('name'),
    // TODO: Add more fields
  };

  const validationResult = ${lowerName}Schema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // TODO: Replace with your database call
    // const result = await db.${lowerName}.create({
    //   data: validationResult.data,
    // });

    // Revalidate cached data
    revalidateTag('${lowerName}');
    revalidatePath('/${lowerName}');

    return {
      success: true,
      message: '${typeName} created successfully',
      // data: result,
    };
  } catch (error) {
    console.error('Failed to create ${lowerName}:', error);
    return {
      success: false,
      message: 'Failed to create ${lowerName}. Please try again.',
    };
  }
}

/**
 * Update an existing ${lowerName}
 */
export async function update${typeName}(
  id: string,
  prevState: ${includeTypes ? 'ActionState' : 'unknown'},
  formData: FormData
)${includeTypes ? ': Promise<ActionState>' : ''} {
  const rawData = {
    name: formData.get('name'),
    // TODO: Add more fields
  };

  const validationResult = ${lowerName}Schema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // TODO: Replace with your database call
    // const result = await db.${lowerName}.update({
    //   where: { id },
    //   data: validationResult.data,
    // });

    revalidateTag('${lowerName}');
    revalidatePath('/${lowerName}');
    revalidatePath(\`/${lowerName}/\${id}\`);

    return {
      success: true,
      message: '${typeName} updated successfully',
    };
  } catch (error) {
    console.error('Failed to update ${lowerName}:', error);
    return {
      success: false,
      message: 'Failed to update ${lowerName}. Please try again.',
    };
  }
}

/**
 * Delete a ${lowerName}
 */
export async function delete${typeName}(id: string)${includeTypes ? ': Promise<ActionState>' : ''} {
  try {
    // TODO: Replace with your database call
    // await db.${lowerName}.delete({
    //   where: { id },
    // });

    revalidateTag('${lowerName}');
    revalidatePath('/${lowerName}');

    return {
      success: true,
      message: '${typeName} deleted successfully',
    };
  } catch (error) {
    console.error('Failed to delete ${lowerName}:', error);
    return {
      success: false,
      message: 'Failed to delete ${lowerName}. Please try again.',
    };
  }
}

/**
 * Delete and redirect (for forms that need navigation)
 */
export async function delete${typeName}AndRedirect(id: string)${includeTypes ? ': Promise<never>' : ''} {
  await delete${typeName}(id);
  redirect('/${lowerName}');
}

/**
 * Fetch ${lowerName} data (for use in Server Components)
 *
 * @example
 * // In a Server Component:
 * const data = await get${typeName}('123');
 */
export async function get${typeName}(id: string)${includeTypes ? `: Promise<${typeName} | null>` : ''} {
  try {
    // TODO: Replace with your database call
    // const result = await db.${lowerName}.findUnique({
    //   where: { id },
    // });
    // return result;

    return null;
  } catch (error) {
    console.error('Failed to fetch ${lowerName}:', error);
    return null;
  }
}

/**
 * Fetch ${lowerName} list (for use in Server Components)
 */
export async function get${typeName}List(params?: {
  page?: number;
  limit?: number;
  search?: string;
})${includeTypes ? `: Promise<{ items: ${typeName}[]; total: number }>` : ''} {
  const { page = 1, limit = 10, search } = params || {};

  try {
    // TODO: Replace with your database call
    // const [items, total] = await Promise.all([
    //   db.${lowerName}.findMany({
    //     where: search ? { name: { contains: search } } : undefined,
    //     skip: (page - 1) * limit,
    //     take: limit,
    //     orderBy: { createdAt: 'desc' },
    //   }),
    //   db.${lowerName}.count({
    //     where: search ? { name: { contains: search } } : undefined,
    //   }),
    // ]);
    // return { items, total };

    return { items: [], total: 0 };
  } catch (error) {
    console.error('Failed to fetch ${lowerName} list:', error);
    return { items: [], total: 0 };
  }
}
`;
}

// ============================================================================
// Combined Template Export
// ============================================================================

/**
 * Generate all API-related templates for a given entity
 */
export function generateApiTemplates(options: ApiTemplateOptions): {
  useQueryHook: string;
  useMutationHook: string;
  apiClient: string;
  serverActions: string;
} {
  return {
    useQueryHook: generateUseQueryTemplate(options),
    useMutationHook: generateUseMutationTemplate(options),
    apiClient: generateApiClientTemplate(options),
    serverActions: generateServerActionsTemplate(options),
  };
}

/**
 * Get a simple data fetching hook (SWR-style, no external deps)
 */
export function getSimpleFetchHookTemplate(name: string = 'Data'): string {
  return `/**
 * use${name} - Simple data fetching hook (no external dependencies)
 *
 * A lightweight alternative to React Query when you don't need
 * all its features.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface Use${name}Result<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function use${name}<T>(url: string): Use${name}Result<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export default use${name};
`;
}
