# Quick Start Guide

Get up and running with the Generative UI Builder in 5 minutes.

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm or pnpm
- Terminal/command line access

## Installation

### 1. Clone & Install

```bash
# Navigate to project directory
cd vercel-ai-demo

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
nano .env.local  # or use your preferred editor
```

**Minimum required**:
```bash
# Required for AI generation features
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key_here
```

**Optional** (for image search):
```bash
# Get from https://unsplash.com/developers
UNSPLASH_ACCESS_KEY=your_unsplash_key_here

# Get from https://www.pexels.com/api/
PEXELS_API_KEY=your_pexels_key_here
```

### 3. Verify MCP Setup

```bash
# Make verification script executable (first time only)
chmod +x scripts/verify-mcp.sh

# Run verification
./scripts/verify-mcp.sh
```

You should see:
```
✓ Node.js version v20.x.x (requires 18+)
✓ npm x.x.x is installed
✓ npx is available
✓ @modelcontextprotocol/sdk vx.x.x is installed
✓ UI Layouts: Package available
✓ Shadcn/UI: Package available
...
✓ All tests passed!
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## First Steps

### Test Cases Mode

1. **Select a Test Case**
   - Click "Test Cases" tab in the sidebar
   - Choose from 50+ examples (Dashboard, Landing Page, Form, etc.)

2. **View the UI**
   - See the rendered component in the preview panel
   - Switch frameworks (Shadcn, Tailwind, Flowbite) using the dropdown

3. **Inspect the JSON**
   - Click "JSON" tab to see the UI tree structure
   - Edit the JSON to customize the UI

### Generate Mode (MCP)

1. **Switch to Generate Tab**
   - Click "Generate (MCP)" in the sidebar

2. **Enter a Description**
   ```
   Create a dashboard with user metrics, charts, and a data table
   ```

3. **Click "Analyze & Generate"**
   - AI analyzes your request
   - MCP discovers components from 9+ libraries
   - Dynamic UI is generated and rendered

4. **View Results**
   - Intent classification
   - Component requirements
   - Discovered components
   - Live UI preview

### MCP Status

1. **Check Server Status**
   - Navigate to "MCP Status" tab
   - Verify servers are connected

2. **Server States**
   - 🟢 **Connected**: Working properly
   - 🟡 **Disconnected**: Will connect on first use
   - 🔴 **Error**: Configuration issue

## Common Tasks

### Test Component Discovery

```bash
# Using curl
curl -X POST http://localhost:3000/api/mcp/discover \
  -H "Content-Type: application/json" \
  -d '{"query": "button", "limit": 10}' | jq

# You should see components from multiple libraries
```

### Check MCP Server Status

```bash
curl http://localhost:3000/api/mcp/status | jq
```

### Test Specific MCP Server

```bash
# Test Shadcn UI
./scripts/verify-mcp.sh shadcn-ui

# Test Material UI
./scripts/verify-mcp.sh mui
```

### Add a New API Key

1. Edit `.env.local`
2. Add the key (e.g., `UNSPLASH_ACCESS_KEY=abc123`)
3. Restart the dev server (`Ctrl+C`, then `npm run dev`)
4. Test image search in the UI

## Troubleshooting

### MCP Servers Show "0 Tools"

```bash
# Clear npx cache
rm -rf ~/.npm/_npx

# Restart dev server
npm run dev
```

### Environment Variables Not Loading

```bash
# Verify .env.local exists in project root
ls -la .env.local

# Check syntax (no spaces around =)
cat .env.local

# Restart dev server
npm run dev
```

### Package Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart
npm run dev
```

### Connection Timeout

```bash
# Pre-cache MCP packages
npx -y @ui-layouts/mcp &
npx -y @jpisnice/shadcn-ui-mcp-server &
npx -y @mui/mcp@latest &
wait

# Restart
npm run dev
```

## Next Steps

- **Learn More**: [MCP Setup Guide](./MCP_SETUP.md)
- **Troubleshooting**: [MCP Troubleshooting](./MCP_TROUBLESHOOTING.md)
- **API Documentation**: [README.md](../README.md#api-routes)
- **Component Catalog**: Browse `src/lib/catalogs/`

## Getting API Keys

### Google AI (Required)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API Key" or "Create API Key"
4. Copy key to `.env.local`:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

### Unsplash (Optional)

1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Click "Register as a developer"
3. Create a new application
4. Copy "Access Key" to `.env.local`:
   ```bash
   UNSPLASH_ACCESS_KEY=your_key_here
   ```

### Pexels (Optional)

1. Visit [Pexels API](https://www.pexels.com/api/)
2. Sign up for a free account
3. Navigate to "Your API Key"
4. Copy key to `.env.local`:
   ```bash
   PEXELS_API_KEY=your_key_here
   ```

## FAQ

**Q: Do I need all API keys?**
A: No, only `GOOGLE_GENERATIVE_AI_API_KEY` is required. Image search keys (Unsplash, Pexels) are optional.

**Q: How do MCP servers work?**
A: MCP servers run via `npx` (on-demand). They connect automatically when needed.

**Q: Can I use this offline?**
A: Partially. Test cases work offline, but MCP discovery and AI generation require internet.

**Q: Why does the first MCP call take time?**
A: `npx` downloads and caches packages. Subsequent calls are instant.

**Q: How do I add a new component library?**
A: See `src/lib/mcp/types.ts` to add new MCP server configurations.

**Q: Can I deploy this?**
A: Yes, but note that MCP servers use `npx` which requires Node.js runtime. Use platforms like Vercel, Railway, or Render.

## Support

- **Documentation**: `docs/` directory
- **Issues**: [GitHub Issues](https://github.com/yourusername/vercel-ai-demo/issues)
- **MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)

## Project Structure

```
vercel-ai-demo/
├── docs/                       # Documentation
│   ├── QUICK_START.md         # This file
│   ├── MCP_SETUP.md           # Detailed MCP setup
│   └── MCP_TROUBLESHOOTING.md # Troubleshooting guide
├── scripts/
│   └── verify-mcp.sh          # MCP verification script
├── src/
│   ├── app/
│   │   ├── api/mcp/           # MCP API routes
│   │   └── page.tsx           # Main UI
│   ├── components/
│   │   ├── builder/           # Builder components
│   │   └── registries/        # Framework registries
│   └── lib/
│       ├── mcp/               # MCP integration
│       ├── registry/          # Registry context
│       └── tests/             # Test cases
├── .env.example               # Environment template
├── .env.local                 # Your API keys (create this)
├── package.json
└── README.md
```

---

**Ready to build?** Start the dev server and explore the test cases!

```bash
npm run dev
```

Visit http://localhost:3000 and start creating!
