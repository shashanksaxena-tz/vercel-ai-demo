# MCP Image Servers - Quick Start

**Quick reference for setting up Unsplash and Pexels image servers.**

## TL;DR

Only **2 out of 5** image servers need API keys:

- ✅ **Lucide Icons** - Works without setup
- ✅ **Heroicons** - Works without setup
- ✅ **Iconify** - Works without setup
- ⚠️ **Unsplash** - Needs free API key
- ⚠️ **Pexels** - Needs free API key

## 3-Minute Setup

### 1. Get Unsplash API Key (2 minutes)

```bash
# 1. Visit https://unsplash.com/developers
# 2. Click "Register as a developer"
# 3. Create a new application
# 4. Copy the "Access Key"
```

Add to `.env.local`:
```bash
UNSPLASH_ACCESS_KEY=paste_your_key_here
```

### 2. Get Pexels API Key (1 minute)

```bash
# 1. Visit https://www.pexels.com/api/
# 2. Sign up (free)
# 3. Copy your API key from the dashboard
```

Add to `.env.local`:
```bash
PEXELS_API_KEY=paste_your_key_here
```

### 3. Restart Server

```bash
# Stop server (Ctrl+C), then:
npm run dev
```

### 4. Test (Optional)

```bash
node test-image-servers.mjs
```

## Rate Limits (Free Tier)

| Service | Per Hour | Per Month | Notes |
|---------|----------|-----------|-------|
| **Unsplash** | 50 | ~36,000 | Can request production access for 5,000/hr |
| **Pexels** | 200 | 20,000 | Forever free |

## Troubleshooting

### Problem: Empty results from image search

**Check your `.env.local` file:**

```bash
# ❌ Wrong (empty value)
UNSPLASH_ACCESS_KEY=

# ✅ Correct
UNSPLASH_ACCESS_KEY=A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6
```

### Problem: Changes not taking effect

```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Problem: 401 Unauthorized

- Verify you copied the **Access Key** (not Secret Key) for Unsplash
- Check if your API key is valid at the respective dashboard
- Try regenerating the key

## API Endpoints

```bash
# Search Unsplash only
curl "http://localhost:3000/api/mcp/images?query=sunset&sources=unsplash"

# Search Pexels only
curl "http://localhost:3000/api/mcp/images?query=nature&sources=pexels"

# Search both
curl "http://localhost:3000/api/mcp/images?query=landscape&sources=unsplash,pexels&limit=20"
```

## Need More Help?

- **Full Setup Guide**: [`MCP_IMAGE_SETUP.md`](./MCP_IMAGE_SETUP.md)
- **Main MCP Guide**: [`MCP_SETUP.md`](./MCP_SETUP.md)
- **Troubleshooting**: [`MCP_TROUBLESHOOTING.md`](./MCP_TROUBLESHOOTING.md)

## Resources

- Unsplash API: https://unsplash.com/developers
- Pexels API: https://www.pexels.com/api/
- Unsplash Docs: https://unsplash.com/documentation
- Pexels Docs: https://www.pexels.com/api/documentation/
