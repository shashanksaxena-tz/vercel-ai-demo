# 🚀 Quick Fix: Enable Unsplash Images

## Current Status

✅ **Pexels**: Working perfectly
⚠️ **Unsplash**: MCP server working, but API key is invalid

## The Issue

Your current `.env` file has an invalid Unsplash API key:
```
UNSPLASH_ACCESS_KEY=paPG4qkS4-EOOa7XdOX4-QyYB9RT5dgQaK1JiPgJoiWA_aPggiRPg41_siJLz8P4
```

This key returns: `401 Unauthorized` from Unsplash API.

## How to Fix (3 minutes)

### Step 1: Get a Valid API Key

1. Go to https://unsplash.com/developers
2. Sign in or create an account
3. Click "New Application"
4. Accept the terms
5. Fill in the application details:
   - **Application name**: "Generative UI Builder" (or any name)
   - **Description**: "Stock image search for UI generation"
6. Click "Create application"
7. Copy your **Access Key** (looks like: `abcd1234efgh5678ijkl90mnopqrst-uvwxyz123456`)

### Step 2: Update .env File

Replace the invalid key in `.env`:

```bash
# Before (invalid)
UNSPLASH_ACCESS_KEY=paPG4qkS4-EOOa7XdOX4-QyYB9RT5dgQaK1JiPgJoiWA_aPggiRPg41_siJLz8P4

# After (your new key)
UNSPLASH_ACCESS_KEY=your_new_access_key_here
```

### Step 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 4: Test

```bash
curl 'http://localhost:3000/api/mcp/images?query=nature&limit=2'
```

You should now see images from **both** Unsplash and Pexels!

## Verify It's Working

Check the server logs for:
```
[MCP] unsplash: Connected successfully
[MCP] unsplash: Found 1 tools: [ 'search_photos' ]
[MCP Images] Unsplash returned X images
```

## Important Notes

- ⚠️ **Use Access Key, NOT Secret Key** - Unsplash provides both, you need the Access Key
- 📊 **Free tier limits**: 50 requests/hour
- 🔒 **Never commit API keys** - Already in `.gitignore`
- 📖 **API docs**: https://unsplash.com/documentation

## What Was Fixed

The MCP integration code has been updated to:
1. Use the correct Unsplash MCP package (`@jeffkit/unsplash-mcp-server`)
2. Pass API key at runtime (not build time)
3. Handle text/JSON response format
4. Add proper error logging
5. Gracefully fall back to Pexels when Unsplash is unavailable

All you need is a valid API key! 🎉
