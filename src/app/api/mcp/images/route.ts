/**
 * MCP Images Discovery API
 *
 * GET /api/mcp/images?query=<search>
 *
 * Searches for photos across multiple stock photo services:
 * - Unsplash (via MCP)
 * - Pexels (via public API at https://api.pexels.com)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  mcpClient,
  MCP_SERVERS,
  connectToServer,
  searchUnsplashImages,
  type MCPServerType,
  type ImageMetadata,
} from '@/lib/mcp';

// Initialize MCP connections on first request
let initialized = false;

async function ensureInitialized() {
  if (initialized) return;

  // Only initialize Unsplash if we have a valid API key
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.warn('[MCP Images] UNSPLASH_ACCESS_KEY not configured - Unsplash images disabled');
    initialized = true;
    return;
  }

  const servers: MCPServerType[] = ['unsplash'];

  const results = await Promise.allSettled(
    servers
      .filter((s) => MCP_SERVERS[s]?.enabled)
      .map(async (s) => {
        // Build config with runtime API key
        const config = { ...MCP_SERVERS[s] };

        if (s === 'unsplash') {
          // Override args to include the API key at runtime
          config.args = [
            '-y',
            '@jeffkit/unsplash-mcp-server',
            '--access-key',
            process.env.UNSPLASH_ACCESS_KEY || '',
            '--response-format',
            'text',
          ];
        }

        const result = await connectToServer(s, config);
        console.log(`[MCP Images] ${s} connection:`, result.status, `Tools: ${result.tools.length}`);
        if (result.error) {
          console.error(`[MCP Images] ${s} error:`, result.error);
        }
        return result;
      })
  );

  console.log('[MCP Images] Initialization complete:', results);
  initialized = true;
}

/**
 * Search photos from Pexels API
 */
async function searchPexels(query: string, perPage: number = 10): Promise<ImageMetadata[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn('PEXELS_API_KEY not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': apiKey,
          'Accept': 'application/json',
        },
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      console.error('Pexels API error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    if (!data.photos || !Array.isArray(data.photos)) {
      return [];
    }

    return data.photos.map((photo: {
      id: number;
      src: { large: string; medium: string };
      alt: string;
      photographer: string;
      width: number;
      height: number;
    }) => ({
      id: String(photo.id),
      url: photo.src.large,
      thumbnailUrl: photo.src.medium,
      alt: photo.alt || 'Pexels photo',
      photographer: photo.photographer,
      width: photo.width,
      height: photo.height,
      source: 'pexels',
      attribution: {
        name: photo.photographer,
        platform: 'Pexels',
        url: `https://www.pexels.com/photo/${photo.id}`,
      },
    }));
  } catch (error) {
    console.error('Pexels search error:', error);
    return [];
  }
}

/**
 * Wrap Unsplash results to include attribution info
 */
function addUnsplashAttribution(images: ImageMetadata[]): ImageMetadata[] {
  return images.map((image) => ({
    ...image,
    attribution: {
      name: image.photographer,
      platform: 'Unsplash',
      url: `https://unsplash.com/photos/${image.id}`,
    },
  }));
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    await ensureInitialized();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const sources = searchParams.get('sources')?.split(',') || ['unsplash', 'pexels'];

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const results: ImageMetadata[] = [];
    const perSourceLimit = Math.ceil(limit / sources.length);

    // Search in parallel across all sources
    const searches = sources.map(async (source) => {
      try {
        switch (source) {
          case 'unsplash':
            console.log(`[MCP Images] Searching Unsplash for: ${query}`);
            const unsplashImages = await searchUnsplashImages(query, perSourceLimit);
            console.log(`[MCP Images] Unsplash returned ${unsplashImages.length} images`);
            return addUnsplashAttribution(unsplashImages);
          case 'pexels':
            console.log(`[MCP Images] Searching Pexels for: ${query}`);
            const pexelsImages = await searchPexels(query, perSourceLimit);
            console.log(`[MCP Images] Pexels returned ${pexelsImages.length} images`);
            return pexelsImages;
          default:
            return [];
        }
      } catch (error) {
        console.error(`[MCP Images] Error searching ${source}:`, error);
        return [];
      }
    });

    const searchResults = await Promise.all(searches);
    for (const images of searchResults) {
      results.push(...images);
    }

    // Apply limit
    const limitedResults = results.slice(0, limit);

    return NextResponse.json({
      images: limitedResults,
      sources,
      totalCount: results.length,
      timing: Date.now() - startTime,
    });
  } catch (error) {
    console.error('Images API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Image search failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
