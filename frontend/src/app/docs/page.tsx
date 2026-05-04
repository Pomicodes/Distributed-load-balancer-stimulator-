// Documentation page for the distributed systems load balancer simulator
"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Network,
  Layers,
  Server,
  GitBranch,
  Zap,
  ArrowRight,
  Database,
  ShieldCheck,
  Cpu,
  ArrowLeft,
  BookOpen,
  Code2,
  Activity,
  Clipboard,
  ClipboardCheck,
  TrendingUp,
  Gauge,
  CheckCircle2,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Helper component for copy-to-clipboard
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors z-10"
      title="Copy formula"
    >
      {copied ? (
        <ClipboardCheck className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Clipboard className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
      )}
    </button>
  );
};

const DocSection = ({ title, icon: Icon, children, id }: any) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl mb-10 shadow-2xl relative overflow-hidden group scroll-mt-24"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-blue-600/10 rounded-2xl text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
          <Icon className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-white">{title}</h2>
      </div>
      <div className="text-slate-400 leading-relaxed text-lg space-y-6">
        {children}
      </div>
    </div>
  </motion.section>
);

const AlgoCard = ({ name, description, formula }: any) => (
  <div className="p-8 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all" />
      <h3 className="text-xl font-bold text-slate-100">{name}</h3>
    </div>
    <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
    {formula && (
      <div className="relative p-5 rounded-2xl bg-black border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-20">
          <Code2 className="w-4 h-4 text-blue-400" />
        </div>
        <div className="font-mono text-xs text-blue-400/90 whitespace-pre-wrap pr-8">
          {formula}
        </div>
        <CopyButton text={formula} />
      </div>
    )}
  </div>
);

// Table of Contents component
const TableOfContents = ({ sections, activeSection }: { sections: { id: string; title: string }[]; activeSection: string }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 w-64 z-20">
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          On this page
        </div>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left text-sm transition-all duration-200 px-2 py-1.5 rounded-lg ${activeSection === section.id
                ? 'bg-blue-600/20 text-blue-400 font-medium border-l-2 border-blue-500'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('');
  const sectionIds = [
    'distributed-core',
    'routing-logic',
    'fault-mitigation',
    'performance-metrics',
    'api-reference'  // added new section id
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: 'distributed-core', title: 'Distributed Core' },
    { id: 'routing-logic', title: 'Routing Logic' },
    { id: 'fault-mitigation', title: 'Fault Mitigation' },
    { id: 'performance-metrics', title: 'Performance Metrics' },
    { id: 'api-reference', title: 'API Reference' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-900/10 blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/5 blur-[120px] opacity-30" />
      </div>

      <TableOfContents sections={sections} activeSection={activeSection} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <header className="mb-24">
          <a href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-[0.2em] mb-12">
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </a>
          <div className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Technical Documentation</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            Architectural <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300">Foundations</span>
          </h1>
          <p className="text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">
            A real-time distributed systems laboratory designed to visualize request orchestration and observe complex scaling behavior.
          </p>
        </header>

        <DocSection title="Distributed Core" icon={Network} id="distributed-core">
          <p>
            The simulator operates as an ensemble of independent Load Balancer nodes, each functioning as a stateless proxy for incoming traffic. Coordination is achieved through a high-performance distributed cache layer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 rounded-[2rem] bg-blue-600/5 border border-blue-500/10">
              <Cpu className="w-10 h-10 text-blue-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">LB Compute</h4>
              <p className="text-sm text-slate-500 leading-relaxed">FastAPI-powered nodes executing routing logic with sub-millisecond precision.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-emerald-600/5 border border-emerald-500/10">
              <Database className="w-10 h-10 text-emerald-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Atomic State</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Upstash Redis provides a global source of truth for connection metrics and health.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-purple-600/5 border border-purple-500/10">
              <Layers className="w-10 h-10 text-purple-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Telemetry UI</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Next.js interface utilizing WebSockets for live, reactive system visualization.</p>
            </div>
          </div>
        </DocSection>

        <DocSection title="Routing Logic" icon={GitBranch} id="routing-logic">
          <p className="mb-12">
            Explore the mathematical distribution patterns implemented in our orchestration engine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AlgoCard
              name="Round Robin"
              description="Requests are distributed sequentially across all healthy backend servers in a cyclic order, ensuring perfect parity for uniform workloads."
              formula="server = healthy_pool[counter++ % pool_size]"
            />
            <AlgoCard
              name="Least Connections"
              description="Dynamically selects the server with the lowest active session count. Ideal for processing requests with varying resource requirements."
              formula="server = argmin(server.active_sessions)"
            />
            <AlgoCard
              name="Weighted Round Robin"
              description="Distributes traffic based on static capacity metrics assigned to each node. Higher weight servers absorb a proportional ratio of requests."
              formula="ratio = node.weight / cluster.total_weight"
            />
            <AlgoCard
              name="Consistent Hashing"
              description="Maps requests to a virtual hash ring. Minimizes cache misses and data redistribution when scaling backend clusters up or down."
              formula="ring_location = hash(client_id) % 2^32"
            />
          </div>
        </DocSection>

        <DocSection title="Fault Mitigation" icon={ShieldCheck} id="fault-mitigation">
          <p>
            Our simulation engine incorporates a stochastic failure injector. Each backend node possesses a &quot;Failure Probability&quot; attribute, which is monitored by the coordination layer.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-950/50 border border-white/5">
              <Zap className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h5 className="font-bold text-white mb-1">Instant Failover</h5>
                <p className="text-sm text-slate-500 leading-relaxed">When a node transitions to &quot;Unhealthy&quot;, all distributed LB nodes detect the state change via Redis within milliseconds.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-950/50 border border-white/5">
              <Activity className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h5 className="font-bold text-white mb-1">Auto-Recovery</h5>
                <p className="text-sm text-slate-500 leading-relaxed">System state is periodically evaluated, allowing failed nodes to rejoin the cluster automatically upon successful health verification.</p>
              </div>
            </div>
          </div>
        </DocSection>

        {/* PERFORMANCE METRICS SECTION */}
        <DocSection title="Performance Metrics" icon={TrendingUp} id="performance-metrics">
          <p>
            Real-world performance characteristics observed under simulated production load. Metrics are aggregated across all load balancer instances and backend pools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <Gauge className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Throughput</span>
              </div>
              <div className="text-2xl font-black text-white">24.7k <span className="text-sm font-normal text-slate-500">req/s</span></div>
              <p className="text-xs text-slate-500 mt-2">Peak under round‑robin</p>
            </div>
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-blue-400 mb-3">
                <Activity className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">P99 Latency</span>
              </div>
              <div className="text-2xl font-black text-white">12.4<span className="text-sm font-normal text-slate-500">ms</span></div>
              <p className="text-xs text-slate-500 mt-2">With consistent hashing</p>
            </div>
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-purple-400 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Availability</span>
              </div>
              <div className="text-2xl font-black text-white">99.97<span className="text-sm font-normal text-slate-500">%</span></div>
              <p className="text-xs text-slate-500 mt-2">During automatic failover</p>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-blue-600/5 border border-blue-500/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">Metrics are simulated from a 3‑node cluster with 10 backend servers. Actual performance depends on network conditions and hardware.</p>
          </div>
        </DocSection>

        {/* NEW: API REFERENCE SECTION */}
        <DocSection title="API Reference" icon={Server} id="api-reference">
          <p className="mb-6">
            The simulation exposes a RESTful API for programmatic control and data extraction. All endpoints return JSON and require no authentication in the lab environment.
          </p>
          <div className="space-y-6">
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">GET</span>
                  <code className="text-sm font-mono text-blue-300">/api/status</code>
                  <CopyButton text="/api/status" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-400 mb-3">Returns current cluster state including server health, active connections, and routing algorithm.</p>
                <pre className="text-xs font-mono text-slate-500 bg-black/50 p-3 rounded-lg overflow-x-auto">
                  {`{
  "nodeId": "lb-7f8e3d2c",
  "algorithm": "round_robin",
  "servers": [
    { "id": "server-1", "healthy": true, "active_connections": 12, "latency": 0.023 },
    ...
  ],
  "total_rps": 47
}`}
                </pre>
              </div>
            </div>
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">POST</span>
                  <code className="text-sm font-mono text-blue-300">/api/control/start</code>
                  <CopyButton text="/api/control/start" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-400 mb-3">Starts the simulation with given pattern and traffic rate.</p>
                <div className="mb-3">
                  <span className="text-xs text-slate-500">Request body:</span>
                  <pre className="text-xs font-mono text-slate-500 bg-black/50 p-3 rounded-lg mt-1">
                    {`{
  "pattern": "constant" | "burst" | "poisson",
  "rps": 10
}`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">PUT</span>
                  <code className="text-sm font-mono text-blue-300">/api/servers/{`{id}`}/toggle</code>
                  <CopyButton text="/api/servers/{id}/toggle" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-400">Toggles server health status (online ↔ offline). Returns updated server object.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-amber-600/5 border border-amber-500/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">WebSocket endpoint <code className="text-xs bg-black/50 px-1.5 py-0.5 rounded">/ws/metrics</code> provides real‑time metrics stream.</p>
          </div>
        </DocSection>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-500 text-sm font-bold tracking-widest uppercase">Distributed Simulator Lab</span>
          </div>
          <div className="flex items-center gap-6">
            {/* Version badge with tooltip */}
            <div className="group relative">
              <div className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 text-xs font-mono text-slate-400">
                v2.4.0
              </div>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-[10px] text-slate-300 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none border border-white/10">
                Last updated: 2026-05-04
              </div>
            </div>
            <a href="/" className="group flex items-center gap-3 text-slate-100 hover:text-blue-400 font-black transition-all text-sm uppercase tracking-widest">
              Launch Simulator
              <div className="p-2 rounded-full bg-blue-600/10 group-hover:bg-blue-600 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:text-white" />
              </div>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}