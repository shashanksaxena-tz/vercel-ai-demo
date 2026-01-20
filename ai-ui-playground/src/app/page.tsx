"use client";

import { useState, useCallback } from "react";
import {
  Canvas,
} from "@/components/ai-elements/canvas";
import {
  PromptInput,
  PromptInputAttachments,
  PromptInputAttachment,
  PromptInputProvider,
} from "@/components/ai-elements/prompt-input";
import {
  InputGroupTextarea,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorShortcut,
} from "@/components/ai-elements/model-selector";
import { Panel } from "@/components/ai-elements/panel";
import { Node, NodeHeader, NodeTitle, NodeContent, NodeFooter } from "@/components/ai-elements/node";
import { Controls } from "@/components/ai-elements/controls";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { CornerDownLeftIcon, SearchIcon, SparklesIcon, ZapIcon, BrainIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      title: "User Prompt",
      description: "Direct input from the playground",
      icon: <SparklesIcon className="size-4 text-blue-500" />,
      content: "Explain quantum entanglement in simple terms."
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 450, y: 50 },
    data: {
      title: "Search Tool",
      description: "Web search capability",
      icon: <SearchIcon className="size-4 text-orange-500" />,
      content: "Searching for 'quantum entanglement' basics..."
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 450, y: 250 },
    data: {
      title: "Reasoning Engine",
      description: "Chain of thought processing",
      icon: <BrainIcon className="size-4 text-purple-500" />,
      content: "1. Define quantum state\n2. Explain superposition\n3. Connect two particles"
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 800, y: 150 },
    data: {
      title: "Final Response",
      description: "LLM generated output",
      icon: <ZapIcon className="size-4 text-green-500" />,
      content: "Quantum entanglement is a physical phenomenon..."
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
];

const CustomNode = ({ data }: { data: any }) => (
  <Node handles={{ source: true, target: true }} className="w-64">
    <NodeHeader>
      <div className="flex items-center gap-2">
        {data.icon}
        <div className="flex flex-col">
          <NodeTitle className="text-sm font-semibold">{data.title}</NodeTitle>
          <div className="text-[10px] text-muted-foreground leading-tight">{data.description}</div>
        </div>
      </div>
    </NodeHeader>
    <NodeContent>
      <div className="text-xs text-foreground whitespace-pre-wrap">{data.content}</div>
    </NodeContent>
    <NodeFooter className="flex justify-between items-center py-1.5 px-3">
      <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">Status: Ready</span>
      <div className="flex gap-1">
        <div className="size-1.5 rounded-full bg-green-500" />
      </div>
    </NodeFooter>
  </Node>
);

const nodeTypes = {
  custom: CustomNode,
};

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedModel, setSelectedModel] = useState("GPT-4o");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handlePromptSubmit = (message: { text: string }) => {
    // Add a new node for the prompt
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      position: { x: 100, y: 100 + (nodes.length * 50) },
      data: {
        title: "New Query",
        description: "User input",
        icon: <CodeIcon className="size-4 text-blue-500" />,
        content: message.text,
      }
    };
    setNodes((nds) => nds.concat(newNode as any));
  };

  return (
    <div className="flex h-screen w-full flex-col bg-zinc-50 dark:bg-black overflow-hidden">
      {/* Header Panel */}
      <Panel className="absolute top-4 left-4 z-50 flex items-center gap-2 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <ModelSelector>
          <ModelSelectorTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 px-3 h-8">
              <ModelSelectorLogo provider="openai" />
              <span className="font-medium text-sm">{selectedModel}</span>
            </Button>
          </ModelSelectorTrigger>
          <ModelSelectorContent className="w-[300px]">
            <ModelSelectorInput placeholder="Search models..." />
            <ModelSelectorList>
              <ModelSelectorGroup heading="OpenAI">
                <ModelSelectorItem onSelect={() => setSelectedModel("GPT-4o")}>
                  <ModelSelectorLogo provider="openai" className="mr-2" />
                  <ModelSelectorName>GPT-4o</ModelSelectorName>
                  <ModelSelectorShortcut>⌘1</ModelSelectorShortcut>
                </ModelSelectorItem>
                <ModelSelectorItem onSelect={() => setSelectedModel("GPT-4 Turbo")}>
                  <ModelSelectorLogo provider="openai" className="mr-2" />
                  <ModelSelectorName>GPT-4 Turbo</ModelSelectorName>
                  <ModelSelectorShortcut>⌘2</ModelSelectorShortcut>
                </ModelSelectorItem>
              </ModelSelectorGroup>
              <ModelSelectorGroup heading="Anthropic">
                <ModelSelectorItem onSelect={() => setSelectedModel("Claude 3.5 Sonnet")}>
                  <ModelSelectorLogo provider="anthropic" className="mr-2" />
                  <ModelSelectorName>Claude 3.5 Sonnet</ModelSelectorName>
                  <ModelSelectorShortcut>⌘3</ModelSelectorShortcut>
                </ModelSelectorItem>
              </ModelSelectorGroup>
            </ModelSelectorList>
          </ModelSelectorContent>
        </ModelSelector>
      </Panel>

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <Canvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
        </Canvas>
      </div>

      {/* Bottom Interaction Area */}
      <div className="w-full p-4 flex justify-center bg-transparent pointer-events-none absolute bottom-0 left-0 right-0">
        <div className="w-full max-w-2xl pointer-events-auto">
          <PromptInputProvider>
            <PromptInput
              className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border shadow-2xl rounded-2xl overflow-hidden"
              onSubmit={handlePromptSubmit}
            >
              <div className="flex flex-col w-full">
                <PromptInputAttachments>
                  {(file: any) => <PromptInputAttachment data={file} key={file.id} />}
                </PromptInputAttachments>
                <div className="flex items-end gap-2 p-3">
                  <InputGroupTextarea
                    placeholder="Enter a prompt to evolve the chain..."
                    className="min-h-[44px] max-h-32 resize-none bg-transparent border-none focus-visible:ring-0 px-1 py-2 text-sm"
                  />
                  <InputGroupButton
                    className="size-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all active:scale-95"
                    type="submit"
                  >
                    <CornerDownLeftIcon className="size-4" />
                  </InputGroupButton>
                </div>
              </div>
            </PromptInput>
          </PromptInputProvider>
        </div>
      </div>
    </div>
  );
}
