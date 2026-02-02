# AI UI Playground

A dynamic AI UI generator showcasing `json-render` with 6 UI libraries.

## 🚀 Features

*   **Multiverse Rendering**: Generate a UI once, render it in 6 different design systems:
    *   [shadcn/ui](https://ui.shadcn.com/)
    *   [Material UI](https://mui.com/)
    *   [Chakra UI](https://chakra-ui.com/)
    *   [Ant Design](https://ant.design/)
    *   [Magic UI](https://magicui.design/)
    *   [Aceternity UI](https://ui.aceternity.com/)
*   **AI-Powered Generation**: Uses Google Gemini Flash via Vercel AI SDK to convert natural language into structured UI schema.
*   **Safe & Secure**: No `eval()` or dangerous HTML injection. The AI generates JSON data, and the registry renders React components.
*   **Instant Theming**: Switch libraries at runtime without regeneration.
*   **Interactive**: Generated components support actions (clicks, inputs) that are logged or handled.

## 🛠️ How to Run

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd ai-ui-playground
    ```

2.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Set up Environment**:
    Create a `.env.local` file with your Gemini API key:
    ```bash
    GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## 🏗️ Architecture

The system decouples the **what** (Schema) from the **how** (Registry).

1.  **The Schema (Catalog)**: We define *what* can be built (e.g., "A Card with a Title").
2.  **The Registry (Theme)**: We define *how* it looks for each library.
    *   `Schema: Card` -> `shadcn: <Card>`
    *   `Schema: Card` -> `MUI: <MuiCard>`
3.  **The AI**: It generates pure JSON based on the Schema.
4.  **The Renderer**: Swaps the JSON for the correct Registry components at runtime.
5.  **The Actions**: JSON events (`onClick: "refresh"`) are caught by our `ActionHandler` and executed.

### Diagram
Prompt -> [AI SDK] -> JSON Schema -> [json-render] -> Registry (MUI/Shadcn/etc) -> React DOM

## 👏 Credits

Built with:
*   [Next.js 15](https://nextjs.org/)
*   [Vercel AI SDK](https://sdk.vercel.ai/docs)
*   [json-render](https://github.com/vercel-labs/json-render)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Framer Motion](https://www.framer.com/motion/)
*   And the 6 amazing UI libraries listed above.

## 📄 License

MIT
