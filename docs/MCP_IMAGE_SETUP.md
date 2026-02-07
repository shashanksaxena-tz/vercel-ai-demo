# MCP Image Server Setup Guide

This guide provides step-by-step instructions for setting up image/media MCP servers (Unsplash and Pexels) for the Generative UI Builder.

## Table of Contents

- [Overview](#overview)
- [Which Servers Need API Keys?](#which-servers-need-api-keys)
- [Server Status Detection](#server-status-detection)
- [Setup Instructions](#setup-instructions)
  - [Unsplash Setup](#unsplash-setup)
  - [Pexels Setup](#pexels-setup)
- [Testing Your Configuration](#testing-your-configuration)
- [Troubleshooting](#troubleshooting)
- [API Rate Limits](#api-rate-limits)

## Overview

The Generative UI Builder supports **4 image/media-related MCP servers**:

| Server | Requires API Key | Status | Package/API |
|--------|------------------|--------|-------------|
| **Lucide Icons** | No | ✅ Working | `lucide-icons-mcp` |
| **Heroicons** | No | ✅ Working | `heroicons-mcp` |
| **Unsplash** | **Yes** ⚠️ | Requires Setup | `@jeffkit/unsplash-mcp-server` |
| **Pexels** | **Yes** ⚠️ | Requires Setup | Pexels HTTP API |

**Important**: Only **Unsplash** and **Pexels** require API keys. The icon servers (Lucide Icons and Heroicons) work out of the box with no configuration needed.

## Which Servers Need API Keys?

### Servers that DON'T need API keys (Working by Default)

1. **Lucide Icons** - 1,500+ beautiful icons, free and open source
2. **Heroicons** - Hand-crafted SVG icons from the Tailwind CSS team
3. **Iconify** - 200,000+ icons from 150+ icon sets (public API)

### Servers that REQUIRE API keys (Need Setup)

1. **Unsplash** - High-quality stock photos with AI-powered search
2. **Pexels** - Free stock photos and videos

## Server Status Detection

### Current Status Handling

The MCP image server connection logic includes proper error handling when API keys are missing:

**In `src/app/api/mcp/images/route.ts`:**

```typescript
// Lines 28-32: Unsplash API key check
if (!process.env.UNSPLASH_ACCESS_KEY) {
  console.warn('[MCP Images] UNSPLASH_ACCESS_KEY not configured - Unsplash images disabled');
  initialized = true;
  return;
}

// Lines 72-77: Pexels API key check
const apiKey = process.env.PEXELS_API_KEY;

if (!apiKey) {
  console.warn('PEXELS_API_KEY not configured');
  return [];
}
```

### How to Check Server Status

**Option 1: Check Server Logs**

When the development server starts, look for these console messages:

```bash
# ✅ Good - Server connected
[MCP Images] unsplash connection: connected Tools: 3

# ⚠️ Warning - API key missing
[MCP Images] UNSPLASH_ACCESS_KEY not configured - Unsplash images disabled
```

**Option 2: Test Image Search API**

```bash
# Test Unsplash (requires API key)
curl "http://localhost:3000/api/mcp/images?query=landscape&sources=unsplash"

# Test Pexels (requires API key)
curl "http://localhost:3000/api/mcp/images?query=nature&sources=pexels"

# Test both (requires both API keys)
curl "http://localhost:3000/api/mcp/images?query=mountains&sources=unsplash,pexels"
```

**Expected Response (with API keys configured):**

```json
{
  "images": [
    {
      "id": "abc123",
      "url": "https://images.unsplash.com/photo-...",
      "thumbnailUrl": "https://images.unsplash.com/photo-...",
      "alt": "Beautiful mountain landscape",
      "photographer": "John Doe",
      "width": 3000,
      "height": 2000,
      "source": "unsplash",
      "attribution": {
        "name": "John Doe",
        "platform": "Unsplash",
        "url": "https://unsplash.com/photos/abc123"
      }
    }
  ],
  "sources": ["unsplash", "pexels"],
  "totalCount": 20,
  "timing": 450
}
```

**Expected Response (without API keys):**

```json
{
  "images": [],
  "sources": ["unsplash", "pexels"],
  "totalCount": 0,
  "timing": 10
}
```

## Setup Instructions

### Unsplash Setup

#### Step 1: Create an Unsplash Developer Account

1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Click **"Register as a developer"** or **"Sign Up"**
3. Log in with your existing Unsplash account or create a new one
4. Accept the API Terms and Conditions

#### Step 2: Create a New Application

1. Once logged in, navigate to **"Your Apps"** in the developer dashboard
2. Click **"New Application"**
3. Fill in the application details:
   - **Application name**: `Generative UI Builder` (or your app name)
   - **Description**: `MCP-powered image search for UI generation`
4. Review and accept the **API Guidelines**
5. Click **"Create application"**

#### Step 3: Copy Your Access Key

1. In your application dashboard, locate the **"Keys"** section
2. Find the **"Access Key"** (NOT the "Secret key")
3. Click the **copy icon** or select and copy the key
4. It should look like: `A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6`

#### Step 4: Add to Environment Variables

1. Open your `.env.local` file in the project root
2. Find the line that says `UNSPLASH_ACCESS_KEY=`
3. Paste your Access Key after the `=` sign:

```bash
UNSPLASH_ACCESS_KEY=A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6
```

4. Save the file

#### Step 5: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run dev
```

### Pexels Setup

#### Step 1: Create a Pexels Account

1. Visit [Pexels API](https://www.pexels.com/api/)
2. Click **"Get Started"** or **"Sign Up"**
3. Create a free account using your email or social login

#### Step 2: Access Your API Key

1. Once logged in, navigate to the **API** section
2. You may need to verify your email address first
3. In your dashboard, look for **"Your API Key"** or **"API Credentials"**
4. Your API key will be displayed immediately (no need to create an application)

#### Step 3: Copy Your API Key

1. Copy the API key shown in your dashboard
2. It should look like: `abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890`

#### Step 4: Add to Environment Variables

1. Open your `.env.local` file in the project root
2. Find the line that says `PEXELS_API_KEY=`
3. Paste your API Key after the `=` sign:

```bash
PEXELS_API_KEY=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

4. Save the file

#### Step 5: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run dev
```

## Testing Your Configuration

### Quick Test Script

Create a test file `test-image-servers.mjs`:

```javascript
// test-image-servers.mjs
async function testImageServers() {
  console.log('Testing MCP Image Servers...\n');

  // Test Unsplash
  console.log('Testing Unsplash...');
  try {
    const unsplashRes = await fetch(
      'http://localhost:3000/api/mcp/images?query=sunset&sources=unsplash&limit=3'
    );
    const unsplashData = await unsplashRes.json();

    if (unsplashData.images && unsplashData.images.length > 0) {
      console.log('✅ Unsplash: Working');
      console.log(`   Found ${unsplashData.images.length} images`);
    } else {
      console.log('❌ Unsplash: No results (check API key)');
    }
  } catch (error) {
    console.log('❌ Unsplash: Error -', error.message);
  }

  console.log('');

  // Test Pexels
  console.log('Testing Pexels...');
  try {
    const pexelsRes = await fetch(
      'http://localhost:3000/api/mcp/images?query=mountains&sources=pexels&limit=3'
    );
    const pexelsData = await pexelsRes.json();

    if (pexelsData.images && pexelsData.images.length > 0) {
      console.log('✅ Pexels: Working');
      console.log(`   Found ${pexelsData.images.length} images`);
    } else {
      console.log('❌ Pexels: No results (check API key)');
    }
  } catch (error) {
    console.log('❌ Pexels: Error -', error.message);
  }

  console.log('');

  // Test both combined
  console.log('Testing Combined Search...');
  try {
    const combinedRes = await fetch(
      'http://localhost:3000/api/mcp/images?query=nature&sources=unsplash,pexels&limit=10'
    );
    const combinedData = await combinedRes.json();

    console.log(`✅ Combined: Found ${combinedData.totalCount} total images`);
    console.log(`   Timing: ${combinedData.timing}ms`);
  } catch (error) {
    console.log('❌ Combined: Error -', error.message);
  }
}

// Run the tests
testImageServers();
```

Run the test:

```bash
node test-image-servers.mjs
```

### Expected Output (Success)

```
Testing MCP Image Servers...

Testing Unsplash...
✅ Unsplash: Working
   Found 3 images

Testing Pexels...
✅ Pexels: Working
   Found 3 images

Testing Combined Search...
✅ Combined: Found 10 total images
   Timing: 532ms
```

### Expected Output (Missing API Keys)

```
Testing MCP Image Servers...

Testing Unsplash...
❌ Unsplash: No results (check API key)

Testing Pexels...
❌ Pexels: No results (check API key)

Testing Combined Search...
✅ Combined: Found 0 total images
   Timing: 12ms
```

## Troubleshooting

### Problem: "UNSPLASH_ACCESS_KEY not configured" warning

**Cause**: The Unsplash API key is missing or empty in your `.env.local` file.

**Solution**:

1. Check your `.env.local` file - line 42 should have a value:
   ```bash
   # ❌ Wrong
   UNSPLASH_ACCESS_KEY=

   # ✅ Correct
   UNSPLASH_ACCESS_KEY=your_actual_key_here
   ```
2. Make sure there are no spaces around the `=` sign
3. Restart your development server after updating

### Problem: "PEXELS_API_KEY not configured" warning

**Cause**: The Pexels API key is missing or empty in your `.env.local` file.

**Solution**:

1. Check your `.env.local` file - line 50 should have a value:
   ```bash
   # ❌ Wrong
   PEXELS_API_KEY=

   # ✅ Correct
   PEXELS_API_KEY=your_actual_key_here
   ```
2. Make sure there are no spaces around the `=` sign
3. Restart your development server after updating

### Problem: Unsplash returns 401 Unauthorized

**Cause**: Invalid or expired API key.

**Solution**:

1. Go to your [Unsplash Developer Dashboard](https://unsplash.com/oauth/applications)
2. Check if your application is still active
3. Verify you copied the **Access Key** (not the Secret Key)
4. If needed, regenerate your Access Key
5. Update `.env.local` with the new key
6. Restart the server

### Problem: Pexels returns 403 Forbidden

**Cause**: Invalid API key or rate limit exceeded.

**Solution**:

1. Verify your API key at [Pexels API Dashboard](https://www.pexels.com/api/)
2. Check if you've exceeded the free tier rate limits (see below)
3. Wait a few minutes and try again
4. If the issue persists, regenerate your API key

### Problem: .env.local changes not taking effect

**Cause**: The development server cached the old environment variables.

**Solution**:

1. **Stop the server** completely (Ctrl+C)
2. **Clear the Next.js cache**:
   ```bash
   rm -rf .next
   ```
3. **Restart the server**:
   ```bash
   npm run dev
   ```

### Problem: "Server not connected" error

**Cause**: The MCP client failed to initialize the connection.

**Solution**:

1. Check server logs for detailed error messages
2. Ensure the package `@jeffkit/unsplash-mcp-server` can be accessed via `npx`
3. Try running manually to test:
   ```bash
   npx -y @jeffkit/unsplash-mcp-server --access-key YOUR_KEY --response-format text
   ```
4. If it fails, check your internet connection and npm registry access

## API Rate Limits

### Unsplash

| Tier | Requests per Hour | Monthly Limit | Notes |
|------|-------------------|---------------|-------|
| **Demo** (Default) | 50 | ~36,000 | Suitable for development |
| **Production** | 5,000 | ~3,600,000 | Requires approval |

**How to Request Production Access**:

1. Go to your [Unsplash Application Dashboard](https://unsplash.com/oauth/applications)
2. Click on your application
3. Submit a production review request
4. Provide details about your app's use case
5. Wait for approval (usually 1-3 business days)

### Pexels

| Tier | Requests per Hour | Monthly Limit | Notes |
|------|-------------------|---------------|-------|
| **Free** | 200 | 20,000 | Forever free |

**Rate Limit Headers** (returned in API responses):

```
X-Ratelimit-Limit: 200
X-Ratelimit-Remaining: 195
X-Ratelimit-Reset: 1234567890
```

### Best Practices to Avoid Rate Limits

1. **Cache responses**: Store frequently requested images locally
2. **Implement request throttling**: Limit concurrent image searches
3. **Use lazy loading**: Only fetch images when needed
4. **Batch requests**: Fetch multiple images in a single request (up to 30 per page)
5. **Respect rate limit headers**: Check remaining quota before making requests

Example rate limit handling:

```typescript
async function searchWithRateLimit(query: string) {
  const response = await fetch('/api/mcp/images?query=' + query);

  // Check rate limit headers
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');

  if (remaining && parseInt(remaining) < 10) {
    console.warn(`Only ${remaining} requests remaining until ${new Date(parseInt(reset) * 1000)}`);
  }

  return response.json();
}
```

## Next Steps

- [Back to MCP Setup Guide](./MCP_SETUP.md)
- [Troubleshooting Common Issues](./MCP_TROUBLESHOOTING.md)
- [Quick Start Guide](./QUICK_START.md)

## Additional Resources

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Pexels API Documentation](https://www.pexels.com/api/documentation/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Image Attribution Guidelines](https://unsplash.com/license)
