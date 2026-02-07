/**
 * Multi-Layer Component Cache
 *
 * Implements aggressive caching strategy for MCP component metadata and source code:
 * - Layer 1: In-memory cache (instant access)
 * - Layer 2: Server-side cache (5-minute TTL, Node.js compatible)
 * - Layer 3: IndexedDB (source code storage, browser-only)
 *
 * Performance targets:
 * - Cache hit rate: > 95%
 * - Lookup latency: < 10ms (memory), < 50ms (server cache)
 */

import type { MCPComponentMetadata } from '../ai/dynamic-prompts';

/**
 * Cache entry with TTL
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // milliseconds
}

/**
 * Component metadata cache key
 */
type ComponentCacheKey = `${string}::${string}`; // framework::componentName

/**
 * Cache statistics for monitoring
 */
export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

/**
 * In-memory cache
 */
class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private hits = 0;
  private misses = 0;

  set(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return null;
    }

    // Check TTL
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }

  // LRU eviction
  evictOldest(count: number = 10): void {
    if (this.cache.size <= count) return;

    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toEvict = entries.slice(0, count);
    toEvict.forEach(([key]) => this.cache.delete(key));
  }
}

/**
 * Server-side cache (Node.js compatible, in-memory with TTL)
 * Replaces LocalStorage for server-side rendering compatibility
 */
class ServerSideCache<T> {
  private cache = new Map<string, CacheEntry<T>>();

  constructor(private prefix: string) {}

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  set(key: string, data: T, ttl: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    this.cache.set(this.getKey(key), entry);
  }

  get(key: string): T | null {
    const entry = this.cache.get(this.getKey(key));
    if (!entry) return null;

    // Check TTL
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(this.getKey(key));
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(this.getKey(key));
  }

  clear(): void {
    const keys = Array.from(this.cache.keys());
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        this.cache.delete(key);
      }
    });
  }
}

/**
 * IndexedDB cache for source code (larger data, browser-only)
 * Falls back to no-op in Node.js environment
 */
class IndexedDBCache {
  private dbName = 'mcp-component-cache';
  private storeName = 'source-code';
  private db: IDBDatabase | null = null;
  private isBrowser = typeof window !== 'undefined' && typeof indexedDB !== 'undefined';

  async init(): Promise<void> {
    if (!this.isBrowser) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async set(key: string, data: string, ttl: number): Promise<void> {
    if (!this.isBrowser) return;

    if (!this.db) await this.init();
    if (!this.db) throw new Error('IndexedDB not available');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const entry: CacheEntry<string> = {
        data,
        timestamp: Date.now(),
        ttl,
      };

      const request = store.put(entry, key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get(key: string): Promise<string | null> {
    if (!this.isBrowser) return null;

    if (!this.db) await this.init();
    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onerror = () => resolve(null);
      request.onsuccess = () => {
        const entry = request.result as CacheEntry<string> | undefined;

        if (!entry) {
          resolve(null);
          return;
        }

        // Check TTL
        if (Date.now() - entry.timestamp > entry.ttl) {
          this.delete(key);
          resolve(null);
          return;
        }

        resolve(entry.data);
      };
    });
  }

  async delete(key: string): Promise<void> {
    if (!this.isBrowser) return;

    if (!this.db) await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(): Promise<void> {
    if (!this.isBrowser) return;

    if (!this.db) await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

/**
 * Component Cache Manager
 * Orchestrates multi-layer caching
 */
export class ComponentCacheManager {
  private metadataMemoryCache = new MemoryCache<MCPComponentMetadata>();
  private metadataServerCache = new ServerSideCache<MCPComponentMetadata>('mcp-metadata');
  private sourceCodeCache = new IndexedDBCache();

  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get component metadata (multi-layer lookup)
   */
  async getMetadata(framework: string, componentName: string): Promise<MCPComponentMetadata | null> {
    const key: ComponentCacheKey = `${framework}::${componentName}`;

    // Layer 1: Memory
    let metadata = this.metadataMemoryCache.get(key);
    if (metadata) {
      return metadata;
    }

    // Layer 2: Server-side cache
    metadata = this.metadataServerCache.get(key);
    if (metadata) {
      // Promote to memory cache
      this.metadataMemoryCache.set(key, metadata, this.defaultTTL);
      return metadata;
    }

    return null;
  }

  /**
   * Set component metadata (write to all layers)
   */
  async setMetadata(
    framework: string,
    componentName: string,
    metadata: MCPComponentMetadata,
    ttl: number = this.defaultTTL
  ): Promise<void> {
    const key: ComponentCacheKey = `${framework}::${componentName}`;

    // Write to both memory and server-side cache
    this.metadataMemoryCache.set(key, metadata, ttl);
    this.metadataServerCache.set(key, metadata, ttl);
  }

  /**
   * Get component source code
   */
  async getSourceCode(framework: string, componentName: string): Promise<string | null> {
    const key: ComponentCacheKey = `${framework}::${componentName}`;
    return await this.sourceCodeCache.get(key);
  }

  /**
   * Set component source code
   */
  async setSourceCode(
    framework: string,
    componentName: string,
    sourceCode: string,
    ttl: number = this.defaultTTL
  ): Promise<void> {
    const key: ComponentCacheKey = `${framework}::${componentName}`;
    await this.sourceCodeCache.set(key, sourceCode, ttl);
  }

  /**
   * Batch get metadata
   */
  async getBatchMetadata(
    requests: Array<{ framework: string; componentName: string }>
  ): Promise<Map<string, MCPComponentMetadata>> {
    const results = new Map<string, MCPComponentMetadata>();

    await Promise.all(
      requests.map(async ({ framework, componentName }) => {
        const metadata = await this.getMetadata(framework, componentName);
        if (metadata) {
          results.set(`${framework}::${componentName}`, metadata);
        }
      })
    );

    return results;
  }

  /**
   * Preload top components for a framework
   */
  async preloadFramework(
    framework: string,
    topComponents: Array<{ name: string; metadata: MCPComponentMetadata }>,
    ttl: number = this.defaultTTL
  ): Promise<void> {
    await Promise.all(
      topComponents.map(({ name, metadata }) =>
        this.setMetadata(framework, name, metadata, ttl)
      )
    );

    console.log(`[ComponentCache] Preloaded ${topComponents.length} components for ${framework}`);
  }

  /**
   * Clear all caches
   */
  async clearAll(): Promise<void> {
    this.metadataMemoryCache.clear();
    this.metadataServerCache.clear();
    await this.sourceCodeCache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return this.metadataMemoryCache.getStats();
  }

  /**
   * Evict old entries (LRU)
   */
  evictOld(count: number = 10): void {
    this.metadataMemoryCache.evictOldest(count);
  }
}

/**
 * Global singleton instance
 */
export const componentCache = new ComponentCacheManager();
