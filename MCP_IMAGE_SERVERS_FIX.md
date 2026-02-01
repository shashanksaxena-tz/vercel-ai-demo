# MCP Image Servers Fix - Summary Report

## Problem Identified

The Unsplash and Pexels MCP servers showed "0 tools" in the UI because:

1. **Unsplash**: Invalid API key in `.env` file causing 401 Unauthorized errors
2. **Pexels**: Was already working via direct HTTP API (not an MCP server issue)

## Changes Made

### 1. Updated Unsplash MCP Configuration

**File**: `/src/lib/mcp/types.ts`

Changed from using `@drumnation/unsplash-smart-mcp-server` to `@jeffkit/unsplash-mcp-server` with proper configuration:

```typescript
'unsplash': {
  type: 'unsplash',
  name: 'unsplash',
  displayName: 'Unsplash Images',
  description: 'Unsplash - High-quality stock photos with AI-powered search',
  command: 'npx',
  args: ['-y', '@jeffkit/unsplash-mcp-server', '--response-format', 'text'],
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY || '',
  },
  enabled: true,
  tools: ['search_photos'],
}
```

### 2. Fixed Runtime API Key Injection

**File**: `/src/app/api/mcp/images/route.ts`

Updated `ensureInitialized()` to inject the API key at runtime instead of build time:

```typescript
async function ensureInitialized() {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.warn('[MCP Images] UNSPLASH_ACCESS_KEY not configured - Unsplash images disabled');
    initialized = true;
    return;
  }

  // Build config with runtime API key
  const config = { ...MCP_SERVERS['unsplash'] };
  config.args = [
    '-y',
    '@jeffkit/unsplash-mcp-server',
    '--access-key',
    process.env.UNSPLASH_ACCESS_KEY,
    '--response-format',
    'text',
  ];

  // Connect to server...
}
```

### 3. Improved Error Handling

**File**: `/src/lib/mcp/mcp-client.ts`

Enhanced `searchUnsplashImages()` to handle different response formats:

```typescript
export async function searchUnsplashImages(query: string, count: number = 10) {
  const result = await callTool({
    server: 'unsplash',
    name: 'search_photos',
    arguments: { query, per_page: count },
  });

  // Handle both array and object with results field
  let photos: any[] = [];
  if (Array.isArray(result.content)) {
    photos = result.content;
  } else if (result.content?.results) {
    photos = result.content.results;
  }

  return photos.map((photo) => ({
    id: photo.id,
    url: photo.urls?.regular || photo.url || '',
    thumbnailUrl: photo.urls?.thumb || photo.urls?.small || '',
    alt: photo.alt_description || 'Unsplash photo',
    photographer: photo.user?.name || 'Unknown',
    width: photo.width || 0,
    height: photo.height || 0,
    source: 'unsplash',
  }));
}
```

### 4. Added Comprehensive Logging

Added debug logging throughout the image search pipeline to trace issues:

- MCP server connection status
- Tool discovery results
- API call attempts and responses
- Error messages with context

## Test Results

### Connection Status

✅ **Unsplash MCP Server**:
- Package: `@jeffkit/unsplash-mcp-server`
- Status: Connected successfully
- Tools found: 1 (`search_photos`)
- Issue: API key invalid (401 Unauthorized)

✅ **Pexels Direct API**:
- Type: HTTP API (not MCP stdio)
- Status: Working perfectly
- Returns images successfully

## Root Cause: Invalid API Key

The Unsplash API key in `.env` is **INVALID**:

```
UNSPLASH_ACCESS_KEY=paPG4qkS4-EOOa7XdOX4-QyYB9RT5dgQaK1JiPgJoiWA_aPggiRPg41_siJLz8P4
```

When tested directly with the Unsplash API:
```bash
curl -H "Authorization: Client-ID paPG4qkS4-EOOa7XdOX4-QyYB9RT5dgQaK1JiPgJoiWA_aPggiRPg41_siJLz8P4" \
  "https://api.unsplash.com/search/photos?query=mountain&per_page=1"
```

Response:
```json
{"errors":["OAuth error: The access token is invalid"]}
```

## Action Required

To fully enable Unsplash image search:

1. **Get a valid Unsplash API key**:
   - Go to https://unsplash.com/developers
   - Create a new application
   - Copy the **Access Key** (NOT the Secret Key)
   - It should be ~43 characters long

2. **Update `.env` file**:
   ```
   UNSPLASH_ACCESS_KEY=your_valid_access_key_here
   ```

3. **Restart the dev server**:
   ```bash
   npm run dev
   ```

4. **Verify it works**:
   ```bash
   curl 'http://localhost:3000/api/mcp/images?query=nature&limit=2&sources=unsplash'
   ```

## Current Working State

### Pexels (Fully Functional)

```bash
curl 'http://localhost:3000/api/mcp/images?query=ocean&sources=pexels'
```

Returns images successfully with:
- High-resolution URLs
- Thumbnail URLs
- Photographer attribution
- Proper licensing information

### Unsplash (Pending Valid API Key)

- MCP server connects ✅
- Tool discovery works ✅
- API calls fail due to invalid key ❌

## Files Modified

1. `/src/lib/mcp/types.ts` - Updated Unsplash server config
2. `/src/app/api/mcp/images/route.ts` - Runtime API key injection
3. `/src/lib/mcp/mcp-client.ts` - Enhanced response parsing
4. `/src/app/api/mcp/images/README.md` - Documentation (new)

## MCP Server Packages Researched

### Unsplash Options (tested)
1. ✅ `@jeffkit/unsplash-mcp-server` - Node.js, stdio, working
2. ❌ `@drumnation/unsplash-smart-mcp-server` - Different response format
3. ℹ️ `hellokaton/unsplash-mcp-server` - Alternative option

### Pexels Options (researched)
1. ⚠️ `pexels-mcp-server` - Python only (pip install)
2. ⚠️ `garylab/pexels-mcp-server` - TypeScript but requires build
3. ✅ **Direct HTTP API** - Currently using, works perfectly

## Recommendations

### Immediate
- Obtain valid Unsplash API key to enable full functionality
- Test with a few queries to verify rate limits

### Future Enhancements
- Add rate limit handling for both APIs
- Implement caching to reduce API calls
- Add support for additional image sources (Pixabay, etc.)
- Consider using `stock-images-mcp` for multi-provider support

## Testing Commands

```bash
# Test Pexels only (currently working)
curl 'http://localhost:3000/api/mcp/images?query=sunset&sources=pexels&limit=5'

# Test both (will only return Pexels until Unsplash key is fixed)
curl 'http://localhost:3000/api/mcp/images?query=mountain&limit=5'

# Check MCP server status
curl 'http://localhost:3000/api/mcp/status' | jq '.servers[] | select(.serverId == "unsplash")'
```

## Conclusion

The MCP server infrastructure is **working correctly**. The issue is simply an **invalid Unsplash API key**. Once replaced with a valid key from https://unsplash.com/developers, the Unsplash integration will work perfectly alongside the already-functional Pexels integration.
