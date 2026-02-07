# MCP Server Setup Guide

This guide explains how to set up and configure MCP (Model Context Protocol) servers for the Generative UI Builder.

## Table of Contents

- [What are MCP Servers?](#what-are-mcp-servers)
- [Configured Servers](#configured-servers)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Testing & Verification](#testing--verification)
- [Server Details](#server-details)
- [Image Server Setup](#image-server-setup)

## What are MCP Servers?

MCP (Model Context Protocol) is a standardized protocol that allows AI assistants to connect to external data sources and tools. In the Generative UI Builder, MCP servers enable:

- **Dynamic Component Discovery**: Search for UI components across 9+ component libraries
- **Real-time Documentation**: Fetch up-to-date docs for any library
- **Asset Integration**: Access icons and images from multiple sources
- **Source Code Fetching**: Retrieve component implementations on-demand

Each MCP server runs as a separate process and communicates via the stdio transport protocol.

## Configured Servers

### Component Libraries (9 servers)

| Server | Status | Tools | Package | Notes |
|--------|--------|-------|---------|-------|
| **UI Layouts** | Working | 4 | `@ui-layouts/mcp` | 50+ searchable UI components |
| **Shadcn/UI** | Working | 4 | `@jpisnice/shadcn-ui-mcp-server` | Radix UI + Tailwind components |
| **Tailwind CSS** | Working | 4 | `tailwindcss-mcp-server` | Utilities, docs, templates |
| **Flowbite** | Working | 3 | `flowbite-mcp` | 60+ Tailwind components |
| **Chakra UI** | Working | 5 | `@chakra-ui/react-mcp` | Accessible React components |
| **Magic UI** | Working | 10 | `@magicuidesign/mcp` | Animated components |
| **Aceternity UI** | Working | 5 | `aceternityui-mcp` | Modern animated UI |
| **Material UI** | Working | 5 | `@mui/mcp` | Google Material Design |
| **Context7** | ✅ Working | 2 | `@upstash/context7-mcp` | Documentation fetcher (API key optional) |

### Icons & Images (5 servers)

| Server | Status | Tools | Package | Notes |
|--------|--------|-------|---------|-------|
| **Lucide Icons** | ✅ Working | 3 | `lucide-icons-mcp` | 1,500+ icons |
| **Heroicons** | ✅ Working | 3 | `heroicons-mcp` | Tailwind team icons |
| **Iconify** | ✅ Working | 4 | `iconify-mcp-server` | 200,000+ icons |
| **Unsplash** | ⚠️ Requires API Key | 3 | `@jeffkit/unsplash-mcp-server` | Stock photos ([Setup Guide](./MCP_IMAGE_SETUP.md#unsplash-setup)) |
| **Pexels** | ⚠️ Requires API Key | 3 | HTTP API | Free stock photos ([Setup Guide](./MCP_IMAGE_SETUP.md#pexels-setup)) |

### Design Tools (1 server)

| Server | Status | Tools | Package | Notes |
|--------|--------|-------|---------|-------|
| **Figma** | Optional | 4 | Figma Desktop | Design token extraction |

## Installation

### Step 1: Install Dependencies

All MCP servers are installed on-demand via `npx`, so no additional installation is required. The first time you use a server, `npx` will download and cache the package.

```bash
# No installation needed - servers are run via npx
# Example: npx -y @ui-layouts/mcp
```

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env.local` and configure your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys (see [Environment Variables](#environment-variables) section).

### Step 3: Start the Development Server

```bash
npm run dev
```

MCP servers will connect automatically when needed.

## Environment Variables

### Required for Full Functionality

#### GOOGLE_GENERATIVE_AI_API_KEY

**Required**: Yes (for AI generation features)

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

How to get:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key and paste it into `.env.local`

#### UNSPLASH_ACCESS_KEY

**Required**: No (optional, for Unsplash image search)

```bash
UNSPLASH_ACCESS_KEY=your_access_key_here
```

How to get:
1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Click "Register as a developer"
3. Create a new application
4. Copy the "Access Key" from your application dashboard
5. Paste it into `.env.local`

**Rate Limits**:
- Demo/Development: 50 requests/hour
- Production: 5,000 requests/hour (requires approval)

#### PEXELS_API_KEY

**Required**: No (optional, for Pexels image search)

```bash
PEXELS_API_KEY=your_api_key_here
```

How to get:
1. Visit [Pexels API](https://www.pexels.com/api/)
2. Click "Get Started" or "Sign Up"
3. Create a free account
4. Navigate to "Your API Key" in the dashboard
5. Copy the API key
6. Paste it into `.env.local`

**Rate Limits**:
- Free tier: 200 requests/hour, 20,000 requests/month

#### CONTEXT7_API_KEY

**Required**: No (optional, for higher rate limits)

```bash
CONTEXT7_API_KEY=your_api_key_here
```

How to get:
1. Visit [Context7 Dashboard](https://context7.com/dashboard)
2. Sign up for a free account
3. Generate an API key
4. Copy the API key
5. Paste it into `.env.local`

**Rate Limits**:
- Without API key: Limited requests per day (suitable for testing)
- With API key: Significantly higher rate limits (recommended for production)

**Status**: ✅ Working - Context7 works without an API key but with lower rate limits. See [CONTEXT7_SETUP.md](./CONTEXT7_SETUP.md) for detailed setup and usage.

### Optional Variables

#### FIGMA_ACCESS_TOKEN

**Required**: Only if using Figma MCP server

```bash
FIGMA_ACCESS_TOKEN=your_figma_token_here
```

How to get:
1. Visit [Figma Settings](https://www.figma.com/settings)
2. Scroll to "Personal Access Tokens"
3. Click "Create a new personal access token"
4. Enter a description (e.g., "MCP Integration")
5. Copy the token
6. Paste it into `.env.local`

**Note**: Figma MCP requires Figma Desktop app running on http://127.0.0.1:3845/mcp

## Testing & Verification

### Quick Test via UI

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Navigate to the "MCP Status" tab or section

4. Check server connection status:
   - **Connected**: Server is running and ready
   - **Disconnected**: Server not started (will connect on first use)
   - **Error**: Configuration or installation issue

### Test via API

```bash
# Check all MCP server status
curl http://localhost:3000/api/mcp/status

# Test component discovery
curl -X POST http://localhost:3000/api/mcp/discover \
  -H "Content-Type: application/json" \
  -d '{"query": "button", "limit": 5}'

# Test documentation fetching (Context7)
curl -X POST http://localhost:3000/api/mcp/docs \
  -H "Content-Type: application/json" \
  -d '{"library": "react", "query": "How to use useState hook?"}'

# Test request analysis
curl -X POST http://localhost:3000/api/mcp/analyze \
  -H "Content-Type: application/json" \
  -d '{"userRequest": "Create a dashboard with metrics"}'
```

### Verify Individual Servers

Use the verification script to test each server:

```bash
# Make the script executable
chmod +x scripts/verify-mcp.sh

# Run verification for all servers
./scripts/verify-mcp.sh

# Run verification for specific server
./scripts/verify-mcp.sh ui-layouts
```

## Server Details

### UI Layouts

**Package**: `@ui-layouts/mcp`

**Tools**:
- `search_components` - Search for components by query
- `get_docs` - Get documentation for a component
- `get_component_meta` - Get metadata for a component
- `get_source_code` - Fetch component source code

**Example Usage**:
```typescript
import { searchUILayouts } from '@/lib/mcp';

const components = await searchUILayouts("card");
```

### Shadcn/UI

**Package**: `@jpisnice/shadcn-ui-mcp-server`

**Tools**:
- `list_components` - List all available components
- `get_component` - Get component details
- `get_component_source` - Fetch component source code
- `get_blocks` - Get pre-built UI blocks

**Example Usage**:
```typescript
import { searchShadcn } from '@/lib/mcp';

const components = await searchShadcn("dialog");
```

### Tailwind CSS

**Package**: `tailwindcss-mcp-server`

**Tools**:
- `get_tailwind_utilities` - Get utility class documentation
- `get_tailwind_colors` - Get color palette
- `generate_component_template` - Generate component templates
- `search_tailwind_docs` - Search Tailwind documentation

**Example Usage**:
```typescript
import { searchTailwind } from '@/lib/mcp';

const templates = await searchTailwind("navbar");
```

### Flowbite

**Package**: `flowbite-mcp`

**Tools**:
- `list_resources` - List all available components
- `get_resource` - Get component HTML and documentation
- `generate_theme` - Generate custom theme configuration

**Example Usage**:
```typescript
import { searchFlowbite } from '@/lib/mcp';

const components = await searchFlowbite("modal");
```

### Chakra UI

**Package**: `@chakra-ui/react-mcp`

**Tools**:
- `list_components` - List all components
- `get_component_example` - Get component usage examples
- `get_component_props` - Get component props documentation
- `get_theme` - Get theme configuration
- `customize_theme` - Generate custom theme

**Example Usage**:
```typescript
import { searchChakraUI } from '@/lib/mcp';

const components = await searchChakraUI("button");
```

### Magic UI

**Package**: `@magicuidesign/mcp`

**Tools** (category-based):
- `getUIComponents` - Get general UI components
- `getLayout` - Layout components
- `getMedia` - Media components
- `getMotion` - Motion/animated components
- `getTextReveal` - Text reveal effects
- `getTextEffects` - Text effects
- `getButtons` - Button components
- `getEffects` - Visual effects
- `getWidgets` - Widget components
- `getDevices` - Device mockups

**Example Usage**:
```typescript
import { searchMagicUI } from '@/lib/mcp';

const components = await searchMagicUI("shimmer");
```

### Aceternity UI

**Package**: `aceternityui-mcp`

**Tools**:
- `search_components` - Search components by query
- `get_component_info` - Get detailed component information
- `get_installation_info` - Get installation instructions
- `list_categories` - List all component categories
- `get_all_components` - Get all available components

**Example Usage**:
```typescript
import { searchAceternityUI } from '@/lib/mcp';

const components = await searchAceternityUI("spotlight");
```

### Material UI (MUI)

**Package**: `@mui/mcp`

**Tools**:
- `list_components` - List all MUI components
- `search_components` - Search components by query
- `get_component_info` - Get component API docs
- `get_customization_guide` - Get theming guide
- `get_setup_guide` - Get setup instructions

**Example Usage**:
```typescript
import { searchMUI } from '@/lib/mcp';

const components = await searchMUI("dataGrid");
```

### Context7

**Package**: `@upstash/context7-mcp` v2.1.1

**Status**: ✅ Working (API key optional)

**Tools**:
- `resolve-library-id` - Resolve library name to Context7 ID
- `query-docs` - Query up-to-date documentation

**Example Usage**:
```typescript
import { fetchContext7Docs } from '@/lib/mcp';

// Fetch React documentation
const docs = await fetchContext7Docs("react", "How to use useState hook?");

// Fetch Next.js documentation
const nextDocs = await fetchContext7Docs("next.js", "app router layouts");

// Fetch Tailwind documentation
const tailwindDocs = await fetchContext7Docs("tailwindcss", "responsive breakpoints");
```

**API Endpoint**:
```bash
POST /api/mcp/docs
{
  "library": "react",
  "query": "How to use useState hook?"
}
```

**Features**:
- Fetches latest documentation from official sources
- Supports version-specific queries
- Returns formatted code examples
- Works with 1000+ popular libraries

**Configuration**:
- API key optional (add `CONTEXT7_API_KEY` to `.env` for higher rate limits)
- See [CONTEXT7_SETUP.md](./CONTEXT7_SETUP.md) for detailed documentation

### Lucide Icons

**Package**: `lucide-icons-mcp`

**Tools**:
- `search_icons` - Search icons by query
- `get_icon` - Get specific icon SVG
- `list_categories` - List all icon categories

**Example Usage**:
```typescript
import { searchLucideIcons } from '@/lib/mcp';

const icons = await searchLucideIcons("arrow");
```

### Heroicons

**Package**: `heroicons-mcp`

**Tools**:
- `search_icons` - Search icons by query
- `get_icon` - Get specific icon (outline/solid/mini)
- `list_icons` - List all available icons

**Example Usage**:
```typescript
import { searchHeroicons } from '@/lib/mcp';

const icons = await searchHeroicons("user");
```

### Iconify

**Transport**: HTTP API

**Tools**:
- `search` - Search across all icon sets
- `collections` - List all icon collections
- `collection` - Get specific collection info
- `icons` - Get icon data

**API URL**: https://api.iconify.design

**Note**: Uses public API, no authentication required.

### Unsplash

**Package**: `@drumnation/unsplash-smart-mcp-server`

**Tools**:
- `search_photos` - Search for photos by query
- `get_random_photo` - Get random photo (optionally by query)
- `get_photo` - Get specific photo by ID

**Example Usage**:
```typescript
import { searchUnsplashImages } from '@/lib/mcp';

const images = await searchUnsplashImages("landscape", 10);
```

**Requires**: `UNSPLASH_ACCESS_KEY` environment variable

### Pexels

**Transport**: HTTP API

**Tools**:
- `search` - Search for photos by query
- `curated` - Get curated photos
- `photo` - Get specific photo by ID

**Example Usage**:
```typescript
import { searchPexelsImages } from '@/lib/mcp';

const images = await searchPexelsImages("nature", 10);
```

**Requires**: `PEXELS_API_KEY` environment variable

### Figma

**Transport**: HTTP (requires Figma Desktop)

**Tools**:
- `get_design_context` - Extract design context from Figma file
- `get_variable_defs` - Get design variables/tokens
- `get_code_connect_map` - Get code-to-design mappings
- `get_metadata` - Get file metadata

**Requires**:
1. Figma Desktop app installed and running
2. `FIGMA_ACCESS_TOKEN` environment variable
3. MCP server running on http://127.0.0.1:3845/mcp

**Status**: Disabled by default (set `enabled: true` in config to activate)

## Image Server Setup

For detailed setup instructions for Unsplash and Pexels image servers, see the dedicated guide:

**[MCP Image Server Setup Guide](./MCP_IMAGE_SETUP.md)**

This guide includes:
- Step-by-step API key setup for Unsplash and Pexels
- Server status detection and troubleshooting
- Testing instructions
- API rate limit information
- Which servers require API keys vs. which work out of the box

**Quick Summary:**

- **Lucide Icons**, **Heroicons**, and **Iconify**: ✅ Work without API keys
- **Unsplash** and **Pexels**: ⚠️ Require free API keys (see [setup guide](./MCP_IMAGE_SETUP.md))

## Troubleshooting

See [MCP_TROUBLESHOOTING.md](./MCP_TROUBLESHOOTING.md) for common issues and solutions.

## Next Steps

- [Troubleshooting Guide](./MCP_TROUBLESHOOTING.md)
- [API Documentation](../README.md#api-routes)
- [Component Catalog](../src/lib/catalogs/)

## Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK for TypeScript](https://github.com/modelcontextprotocol/typescript-sdk)
- [UI Layouts MCP](https://github.com/ui-layouts/mcp)
- [Shadcn UI MCP](https://github.com/Jpisnice/shadcn-ui-mcp-server)
