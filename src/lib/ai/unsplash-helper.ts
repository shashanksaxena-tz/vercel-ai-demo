/**
 * Unsplash API Helper - Fetch contextually relevant images
 */

import { createApi } from 'unsplash-js';

// Initialize Unsplash client (only if API key is available)
const unsplash = process.env.UNSPLASH_ACCESS_KEY
  ? createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
    })
  : null;

/**
 * Get a relevant image URL from Unsplash based on search query
 * Falls back to Lorem Picsum if Unsplash is not configured
 */
export async function getRelevantImageUrl(
  query: string,
  width: number = 800,
  height: number = 600
): Promise<string> {
  // If Unsplash is not configured, use Lorem Picsum with seed
  if (!unsplash) {
    const seed = query.replace(/\s+/g, '-').toLowerCase();
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  }

  try {
    // Search for photos on Unsplash
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 1,
      orientation: width > height ? 'landscape' : width < height ? 'portrait' : 'squarish',
    });

    if (result.type === 'success' && result.response.results.length > 0) {
      const photo = result.response.results[0];
      // Use the regular URL with specified dimensions
      return `${photo.urls.raw}&w=${width}&h=${height}&fit=crop`;
    }

    // No results found, use Lorem Picsum fallback
    const seed = query.replace(/\s+/g, '-').toLowerCase();
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  } catch (error) {
    console.error('Unsplash API error:', error);
    // On error, fall back to Lorem Picsum
    const seed = query.replace(/\s+/g, '-').toLowerCase();
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  }
}

/**
 * Get a relevant avatar image URL
 */
export async function getRelevantAvatarUrl(name: string, size: number = 100): Promise<string> {
  // For avatars, search for "portrait" to get relevant faces
  return getRelevantImageUrl(`portrait ${name}`, size, size);
}
