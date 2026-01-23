# AI UI Playground

A powerful AI-driven UI generator that renders structured JSON into pixel-perfect React components across multiple design systems.

![AI UI Playground](https://github.com/vercel-labs/json-render/assets/placeholder.png)

## Features

- **Schema-Agnostic UI**: Generates a single JSON structure that works with any UI library.
- **Multi-Registry Support**: Switch between 6 design systems instantly:
  - **shadcn/ui** (Default)
  - **Material UI** (MUI)
  - **Chakra UI**
  - **Ant Design**
  - **Magic UI** (Animated)
  - **Aceternity UI** (Modern)
- **AI Integration**: Uses Gemini 2.0 Flash for ultra-fast, context-aware UI generation.
- **Safe & Predictable**: No `eval()` or dangerous HTML injection. Just data mapping.
- **Live Playground**: Interactive builder with code view, device preview, and theme switching.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI SDK**: Vercel AI SDK + Google Gemini
- **Core Engine**: `json-render`
- **UI Libraries**: shadcn/ui, MUI, Chakra, AntD, MagicUI, Aceternity

## Getting Started

### Prerequisites

- Node.js 18+
- NPM or PNPM
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-ui-playground.git
   cd ai-ui-playground
   ```

2. Install dependencies (Legacy peer deps required for React 19 compatibility):
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: Shared components and UI elements
- `src/registries`: The heart of the project. Contains the component mappings for each library.
  - `src/registries/shadcn`: shadcn/ui implementation
  - `src/registries/mui`: Material UI implementation
  - ...
- `src/lib/catalog.ts`: Zod schema definitions for all supported components.
- `src/lib/gemini.ts`: AI model configuration.

## How It Works

1. **Prompt**: User enters "Create a login form".
2. **Generation**: AI generates a JSON tree adhering to `catalog.ts` schema.
3. **Rendering**: `RendererCanvas` traverses the JSON and renders the corresponding component from the active **Registry**.
4. **Switching**: changing the registry key re-renders the same JSON with new components.

## License

MIT
