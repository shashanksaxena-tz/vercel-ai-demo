'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  Code2,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Layers,
  Terminal,
  Cpu,
  GitBranch,
  Box,
} from 'lucide-react';

// Glowing card with mouse tracking
function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative rounded-2xl bg-neutral-900/50 border border-white/5 p-px overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative rounded-2xl bg-neutral-900/80 backdrop-blur-xl h-full">
        {children}
      </div>
    </div>
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl" />

      {/* Radial glow from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent blur-3xl" />
    </div>
  );
}

// Floating particles effect
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Step component with neon effect
function Step({ number, title, description, icon: Icon }: {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: number * 0.1 }}
      className="relative"
    >
      <GlowCard>
        <div className="p-6">
          {/* Number badge */}
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-black text-sm font-bold shadow-lg shadow-cyan-500/30">
            {number}
          </div>

          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
        </div>
      </GlowCard>
    </motion.div>
  );
}

// Feature card
function FeatureCard({ title, description, icon: Icon }: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <GlowCard>
      <div className="p-6">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm">{description}</p>
      </div>
    </GlowCard>
  );
}

// Typing animation component
function TypeWriter({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-cyan-400"
    >
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 align-middle"
      />
    </motion.span>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <GridBackground />
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <span className="font-mono font-bold text-lg">json-render</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/vercel-labs/json-render"
              className="text-sm text-neutral-400 hover:text-white transition-colors font-mono"
            >
              GitHub
            </Link>
            <Link
              href="/playground"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Launch App
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center pt-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono mb-8"
          >
            <Cpu className="w-4 h-4" />
            <span>Powered by Vercel AI SDK</span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-2 font-mono">
              <span className="text-white">AI → </span>
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                JSON
              </span>
              <span className="text-white"> → </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UI
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-neutral-500 font-mono mt-4">
              Safe. Predictable. Beautiful.
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto mt-8 leading-relaxed"
          >
            A schema-agnostic architecture where AI generates structured JSON
            and your registries render it with any design system.
            <span className="text-cyan-400"> No eval(). No XSS. </span>
            Just clean data to beautiful interfaces.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              href="/playground"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold text-lg shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Try Playground
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://github.com/vercel-labs/json-render"
              className="flex items-center gap-3 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <GitBranch className="w-5 h-5" />
              View Source
            </Link>
          </motion.div>

          {/* Supported design systems */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-sm text-neutral-500 mb-4 font-mono">SUPPORTED REGISTRIES</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'shadcn/ui', color: 'border-neutral-500' },
                { name: 'Material UI', color: 'border-blue-500' },
                { name: 'Chakra UI', color: 'border-teal-500' },
                { name: 'Ant Design', color: 'border-sky-500' },
                { name: 'Magic UI', color: 'border-purple-500' },
                { name: 'Aceternity', color: 'border-cyan-500' },
              ].map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                  className={`px-4 py-2 rounded-lg bg-white/5 border ${item.color} border-opacity-30 text-sm font-mono text-neutral-300 hover:text-white transition-colors`}
                >
                  {item.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-cyan-500/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-cyan-500" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">// HOW IT WORKS</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-mono">
              <span className="text-white">From </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Prompt</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pixel</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Step
              number={1}
              title="User Prompts"
              description="Natural language input: 'Create a sales dashboard with metrics'"
              icon={Terminal}
            />
            <Step
              number={2}
              title="AI Generates JSON"
              description="Gemini outputs structured JSON following your component schema"
              icon={Cpu}
            />
            <Step
              number={3}
              title="Registry Maps"
              description="Your registry maps JSON to real React components"
              icon={Layers}
            />
            <Step
              number={4}
              title="UI Renders"
              description="Beautiful UI appears. Switch themes without regenerating."
              icon={Box}
            />
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">// THE MAGIC</p>
              <h2 className="text-4xl font-bold tracking-tight font-mono mb-6">
                <span className="text-white">One JSON.</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Six Design Systems.
                </span>
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                The AI generates a single JSON structure. Your registries interpret it differently,
                rendering the same data with completely different visual identities.
              </p>

              <div className="space-y-4">
                {[
                  'Schema-agnostic: AI only knows your vocabulary',
                  'Sandboxed: Unknown components safely ignored',
                  'Predictable: Output always matches schema',
                  'Runtime switching: Change UI without regenerating',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-neutral-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - code preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlowCard>
                <div className="p-1">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-neutral-500 text-xs font-mono">generated-ui.json</span>
                  </div>

                  {/* Code */}
                  <pre className="p-4 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-neutral-500">{'{'}</span>{'\n'}
                      <span className="text-purple-400">  "type"</span><span className="text-neutral-500">:</span> <span className="text-cyan-400">"Stack"</span><span className="text-neutral-500">,</span>{'\n'}
                      <span className="text-purple-400">  "key"</span><span className="text-neutral-500">:</span> <span className="text-cyan-400">"dashboard"</span><span className="text-neutral-500">,</span>{'\n'}
                      <span className="text-purple-400">  "props"</span><span className="text-neutral-500">:</span> <span className="text-neutral-500">{'{'}</span> <span className="text-purple-400">"gap"</span><span className="text-neutral-500">:</span> <span className="text-orange-400">4</span> <span className="text-neutral-500">{'}'}</span><span className="text-neutral-500">,</span>{'\n'}
                      <span className="text-purple-400">  "children"</span><span className="text-neutral-500">:</span> <span className="text-neutral-500">[</span>{'\n'}
                      <span className="text-neutral-500">    {'{'}</span>{'\n'}
                      <span className="text-purple-400">      "type"</span><span className="text-neutral-500">:</span> <span className="text-cyan-400">"Metric"</span><span className="text-neutral-500">,</span>{'\n'}
                      <span className="text-purple-400">      "props"</span><span className="text-neutral-500">:</span> <span className="text-neutral-500">{'{'}</span>{'\n'}
                      <span className="text-purple-400">        "label"</span><span className="text-neutral-500">:</span> <span className="text-cyan-400">"Revenue"</span><span className="text-neutral-500">,</span>{'\n'}
                      <span className="text-purple-400">        "value"</span><span className="text-neutral-500">:</span> <span className="text-cyan-400">"$45,231"</span><span className="text-neutral-500">,</span>{'\n'}
                      <span className="text-purple-400">        "trend"</span><span className="text-neutral-500">:</span> <span className="text-orange-400">12.5</span>{'\n'}
                      <span className="text-neutral-500">      {'}'}</span>{'\n'}
                      <span className="text-neutral-500">    {'}'}</span>{'\n'}
                      <span className="text-neutral-500">  ]</span>{'\n'}
                      <span className="text-neutral-500">{'}'}</span>
                    </code>
                  </pre>
                </div>
              </GlowCard>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-2 top-8 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30"
              >
                MUI
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-2 top-1/3 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-500/30"
              >
                Chakra
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -right-2 bottom-1/4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/30"
              >
                Aceternity
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">// FEATURES</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-mono">
              <span className="text-white">Built for </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Security</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={Shield}
              title="Sandboxed Generation"
              description="No eval(), no dangerouslySetInnerHTML. AI outputs data, your code renders it safely."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Rendering"
              description="JSON is fast to parse. No compilation, no build step. Just map and render."
            />
            <FeatureCard
              icon={Layers}
              title="Runtime Theme Switching"
              description="Switch between 6 design systems without regenerating. Same JSON, different UI."
            />
            <FeatureCard
              icon={Code2}
              title="Type-Safe Registries"
              description="TypeScript interfaces ensure your registry matches your schema perfectly."
            />
            <FeatureCard
              icon={GitBranch}
              title="Composable Components"
              description="Nested children, recursive structures. Build complex UIs from simple atoms."
            />
            <FeatureCard
              icon={Sparkles}
              title="AI-Powered"
              description="Gemini generates intelligent, context-aware UIs based on your prompts."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">// GET STARTED</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-mono mb-6">
              <span className="text-white">Ready to </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Build?</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              Try the playground now. Enter a prompt, watch AI generate JSON,
              and see it render across 6 different design systems.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/playground"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold text-xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <Terminal className="w-6 h-6" />
                Launch Playground
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <span className="font-mono font-bold">json-render</span>
          </div>
          <p className="text-sm text-neutral-500 font-mono">
            Built with Next.js + Tailwind + Framer Motion
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500 font-mono">
            <Link href="https://github.com/vercel-labs/json-render" className="hover:text-cyan-400 transition-colors">
              GitHub
            </Link>
            <Link href="https://vercel.com" className="hover:text-cyan-400 transition-colors">
              Vercel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
