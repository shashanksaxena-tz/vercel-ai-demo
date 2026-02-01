# Context7 Quick Start Guide

## TL;DR

Context7 is **working and ready to use** without any additional setup! 🎉

## 30-Second Test

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Test the API:
   ```bash
   curl -X POST -H "Content-Type: application/json" \
     -d '{"library":"react","query":"useState hook"}' \
     http://localhost:3000/api/mcp/docs
   ```

3. You should see React documentation! ✅

## What is Context7?

Context7 fetches **up-to-date documentation** for any library. It solves the "outdated training data" problem by pulling docs directly from official sources.

### Example Response

```json
{
  "library": "react",
  "query": "useState hook",
  "documentation": "### Basic useState Hook Declaration in React\n\nSource: https://react.dev/reference/react/useState\n\nInitialize state variables in a React functional component using the useState Hook...",
  "timing": 4547
}
```

## Usage in Code

```typescript
import { fetchContext7Docs } from '@/lib/mcp/mcp-client';

// Fetch docs for any library
const docs = await fetchContext7Docs('react', 'How to use useState?');
const nextDocs = await fetchContext7Docs('next.js', 'app router');
const tailwindDocs = await fetchContext7Docs('tailwindcss', 'dark mode');
```

## Supported Libraries

Context7 works with **1000+ libraries** including:

- **React** ecosystem (React, Next.js, Remix, Gatsby)
- **Vue** ecosystem (Vue 3, Nuxt, Vite)
- **CSS** frameworks (Tailwind, Bootstrap, MUI, Chakra)
- **Databases** (MongoDB, PostgreSQL, Supabase, Firebase)
- **Backend** (Express, Fastify, NestJS, Prisma)
- And many more!

## Do I Need an API Key?

**No!** Context7 works without an API key, but with limited rate limits.

### Free Tier (No API Key)
- ✅ Works immediately
- ⚠️ Limited requests per day
- 👍 Perfect for testing and development

### Paid Tier (With API Key)
- 🚀 Much higher rate limits
- 💼 Recommended for production
- 🔑 Get your key at [context7.com/dashboard](https://context7.com/dashboard)

To add an API key:
```bash
# Add to .env file
CONTEXT7_API_KEY=your_api_key_here
```

## Status Check

MCP servers are **lazy-loaded** - they connect when first used, not at startup.

```bash
# Status will show "disconnected" until first use
curl http://localhost:3000/api/mcp/status | grep context7

# After making a docs request, tools will appear
curl -X POST -H "Content-Type: application/json" \
  -d '{"library":"react","query":"hooks"}' \
  http://localhost:3000/api/mcp/docs
```

## Common Questions

### Why does status show "0 tools"?

MCP servers are lazy-loaded. Make your first request and tools will appear!

### What if I hit rate limits?

Add `CONTEXT7_API_KEY` to your `.env` file for higher limits.

### Can I query specific versions?

Yes! Context7 supports version-specific queries:
```json
{
  "library": "next.js",
  "query": "Next.js 14 app router middleware"
}
```

### How current is the documentation?

Context7 fetches from official sources, so it's as current as the official docs!

## Next Steps

- 📖 **Detailed Setup**: See [CONTEXT7_SETUP.md](./CONTEXT7_SETUP.md)
- 🔧 **MCP Overview**: See [MCP_SETUP.md](./MCP_SETUP.md)
- 🐛 **Troubleshooting**: See [CONTEXT7_SETUP.md#troubleshooting](./CONTEXT7_SETUP.md#troubleshooting)

## That's It!

Context7 is ready to use. No installation, no configuration required. Just start querying! 🎉

```bash
# Try it now!
npm run dev

# Then in another terminal:
curl -X POST -H "Content-Type: application/json" \
  -d '{"library":"tailwindcss","query":"responsive design"}' \
  http://localhost:3000/api/mcp/docs
```
