# MCP Images API

This API provides stock image search functionality from Unsplash and Pexels.

## Endpoint

```
GET /api/mcp/images?query=<search>&limit=<number>&sources=<unsplash,pexels>
```

## Query Parameters

- `query` (required): Search query for images
- `limit` (optional): Maximum number of results (default: 20)
- `sources` (optional): Comma-separated list of sources (default: "unsplash,pexels")

## Configuration

### Unsplash Setup

1. Create an account at [https://unsplash.com/developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your **Access Key** (NOT the Secret Key)
4. Add to `.env`:
   ```
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

**Important**: The Unsplash Access Key should be approximately 43 characters long and look like: `AbCdEf1234567890AbCdEf1234567890AbCdEf12345`

### Pexels Setup

1. Create an account at [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. Get your API key from the dashboard
3. Add to `.env`:
   ```
   PEXELS_API_KEY=your_api_key_here
   ```

## Current Status

- **Pexels**: ✅ Working (using direct HTTP API)
- **Unsplash**: ⚠️ Requires valid API key

## MCP Server Details

### Unsplash MCP Server

- **Package**: `@jeffkit/unsplash-mcp-server`
- **Transport**: stdio
- **Tools**: `search_photos`
- **Response Format**: text (JSON with photo URLs)

### Pexels Integration

- **Type**: Direct HTTP API (not MCP server)
- **API Endpoint**: `https://api.pexels.com/v1`
- **Authentication**: Header-based API key

## Troubleshooting

### Unsplash Returns 0 Images

1. Check if `UNSPLASH_ACCESS_KEY` is set in `.env`
2. Verify the API key is valid by testing directly:
   ```bash
   curl -H "Authorization: Client-ID YOUR_ACCESS_KEY" \
     "https://api.unsplash.com/search/photos?query=nature&per_page=1"
   ```
3. Make sure you're using the **Access Key**, not the Secret Key
4. Check Unsplash API rate limits (50 requests/hour for free tier)

### Pexels Returns 0 Images

1. Check if `PEXELS_API_KEY` is set in `.env`
2. Verify the API key with:
   ```bash
   curl -H "Authorization: YOUR_API_KEY" \
     "https://api.pexels.com/v1/search?query=nature&per_page=1"
   ```
3. Check Pexels API rate limits

## Response Format

```json
{
  "images": [
    {
      "id": "string",
      "url": "string",
      "thumbnailUrl": "string",
      "alt": "string",
      "photographer": "string",
      "width": number,
      "height": number,
      "source": "unsplash" | "pexels",
      "attribution": {
        "name": "string",
        "platform": "string",
        "url": "string"
      }
    }
  ],
  "sources": ["unsplash", "pexels"],
  "totalCount": number,
  "timing": number
}
```

## Attribution

All images must include proper attribution to the photographer and platform. The `attribution` object provides the necessary information for display.
