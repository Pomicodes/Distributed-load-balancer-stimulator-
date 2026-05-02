"use client";

import React from 'react';
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
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const DocSection = ({ title, icon: Icon, children }: any) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl mb-10 shadow-2xl relative overflow-hidden group"
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
  <div className="p-8 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
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
        <div className="font-mono text-xs text-blue-400/90 whitespace-pre-wrap">
          {formula}
        </div>
      </div>
    )}
  </div>
);

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-900/10 blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/5 blur-[120px] opacity-30" />
      </div>

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

        <DocSection title="Distributed Core" icon={Network}>
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

        <DocSection title="Routing Logic" icon={GitBranch}>
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

        <DocSection title="Fault Mitigation" icon={ShieldCheck}>
          <p>
            Our simulation engine incorporates a stochastic failure injector. Each backend node possesses a 'Failure Probability' attribute, which is monitored by the coordination layer.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-950/50 border border-white/5">
              <Zap className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h5 className="font-bold text-white mb-1">Instant Failover</h5>
                <p className="text-sm text-slate-500 leading-relaxed">When a node transitions to 'Unhealthy', all distributed LB nodes detect the state change via Redis within milliseconds.</p>
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

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-500 text-sm font-bold tracking-widest uppercase">Distributed Simulator Lab</span>
          </div>
          <div className="flex gap-10">
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
