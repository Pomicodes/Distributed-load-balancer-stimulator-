"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSimulation } from '@/hooks/useSimulation';
import { 
  Activity, 
  Server as ServerIcon, 
  Cpu, 
  Zap, 
  Play, 
  Square, 
  Settings2,
  BarChart3,
  Globe,
  Database,
  ArrowUpRight,
  Info,
  Terminal,
  Shield
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animated Particle Component ---
const RequestParticle = ({ targetId, startPos }: { targetId: string, startPos: { x: number, y: number } }) => {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const targetElement = document.getElementById(`server-${targetId}`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const parentRect = targetElement.offsetParent?.getBoundingClientRect();
      if (parentRect) {
        setTargetPos({
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2
        });
      }
    }
  }, [targetId]);

  if (targetPos.x === 0) return null;

  return (
    <motion.div
      initial={{ x: startPos.x, y: startPos.y, opacity: 1, scale: 1 }}
      animate={{ 
        x: targetPos.x, 
        y: targetPos.y, 
        opacity: [1, 1, 0],
        scale: [1, 1.5, 0.5] 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute w-2 h-2 bg-blue-400 rounded-full blur-[2px] shadow-[0_0_10px_#60a5fa] z-50 pointer-events-none"
    />
  );
};

export default function Dashboard() {
  const { 
    servers, 
    metrics, 
    isRunning, 
    nodeId, 
    algorithm, 
    startSimulation, 
    stopSimulation, 
    changeAlgorithm,
    toggleServer 
  } = useSimulation();

  const [trafficRate, setTrafficRate] = useState(10);
  const [pattern, setPattern] = useState('constant');
  const [particles, setParticles] = useState<{id: number, target: string}[]>([]);
  const particleIdCounter = useRef(0);

  // Simulate particle generation based on RPS
  useEffect(() => {
    if (!isRunning || servers.length === 0) return;
    
    const interval = setInterval(() => {
      // Pick a random healthy server to "target" for the visual
      const healthyServers = servers.filter(s => s.healthy);
      if (healthyServers.length === 0) return;
      
      const targetServer = healthyServers[Math.floor(Math.random() * healthyServers.length)];
      const newParticle = { 
        id: particleIdCounter.current++, 
        target: targetServer.id 
      };
      
      setParticles(prev => [...prev.slice(-15), newParticle]);
    }, Math.max(100, 1000 / (trafficRate / 2))); // Scale visual particles with traffic rate

    return () => clearInterval(interval);
  }, [isRunning, trafficRate, servers]);

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* HUD Header */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#030712]/80 backdrop-blur-2xl z-30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-white/10 shadow-2xl">
              <Activity className="w-7 h-7 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                Aether<span className="text-blue-500">Flow</span>
              </h1>
              <div className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Distributed OS
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              SYSTEM_NODE: <span className="text-slate-300">{nodeId || 'BOOTING...'}</span>
              <span className="mx-2 text-slate-800">|</span>
              <Shield className="w-3 h-3" />
              SECURITY: <span className="text-green-500/70">ENCRYPTED</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8 relative z-10">
          <div className="hidden lg:flex items-center gap-8">
            {['Dashboard', 'Analytics', 'Nodes', 'Docs'].map((item) => (
              <a 
                key={item} 
                href={item === 'Docs' ? '/docs' : '#'} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-blue-400 transition-all flex items-center gap-2"
              >
                {item === 'Docs' ? <Info className="w-3.5 h-3.5" /> : <div className="w-1 h-1 rounded-full bg-slate-700" />}
                {item}
              </a>
            ))}
          </div>
          
          <div className="h-6 w-px bg-white/10" />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => isRunning ? stopSimulation() : startSimulation(pattern, trafficRate)}
              className={`group relative flex items-center gap-3 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${
                isRunning 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' 
                  : 'bg-white text-black hover:bg-blue-50 shadow-[0_0_30px_rgba(255,255,255,0.15)]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isRunning ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="relative z-10">{isRunning ? 'Halt System' : 'Launch Ingress'}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row p-8 gap-8 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.1),transparent_70%)] pointer-events-none" />
        
        {/* Command Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 relative z-10">
          
          {/* Algorithm Controller */}
          <div className="p-7 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-slate-100 font-black text-[11px] uppercase tracking-[0.2em]">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Settings2 className="w-4 h-4" />
                </div>
                Routing Logic
              </div>
            </div>
            <div className="space-y-3">
              {['round_robin', 'least_connections', 'weighted_round_robin', 'consistent_hashing'].map((algo) => (
                <button
                  key={algo}
                  onClick={() => changeAlgorithm(algo)}
                  className={`group relative w-full px-5 py-4 rounded-2xl text-[10px] text-left transition-all duration-300 border ${
                    algorithm === algo 
                      ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                      : 'bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'
                  }`}
                >
                  <span className="relative z-10 font-black uppercase tracking-[0.15em]">
                    {algo.replace(/_/g, ' ')}
                  </span>
                  {algorithm === algo && (
                    <motion.div layoutId="activeAlgo" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl -z-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Flow Parameters */}
          <div className="p-7 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-8 text-slate-100 font-black text-[11px] uppercase tracking-[0.2em]">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                <Zap className="w-4 h-4" />
              </div>
              Flow Dynamics
            </div>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {['constant', 'burst', 'poisson'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className={`py-3 rounded-xl text-[9px] font-black text-center transition-all border ${
                    pattern === p 
                      ? 'bg-white text-black border-white shadow-lg' 
                      : 'bg-slate-950/40 border-white/5 text-slate-600 hover:text-slate-400'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Throughput</span>
                <span className="text-base font-mono font-black text-blue-400">{trafficRate} <span className="text-[10px] text-slate-600">RPS</span></span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={trafficRate} 
                onChange={(e) => setTrafficRate(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* System Vitals Chart */}
          <div className="p-7 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex-1 flex flex-col">
             <div className="flex items-center gap-3 mb-8 text-slate-100 font-black text-[11px] uppercase tracking-[0.2em]">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              Real-time Vitals
            </div>
            <div className="flex-1 w-full flex items-end">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={metrics.length > 0 ? metrics : Array(10).fill({ rps: 0 })}>
                  <defs>
                    <linearGradient id="colorRps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="rps" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorRps)" 
                    strokeWidth={3} 
                    isAnimationActive={false} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </aside>

        {/* Center: Holographic Topology */}
        <div className="flex-1 flex flex-col gap-8 relative z-10 overflow-hidden">
          
          {/* Dynamic Stats Strip */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Cluster Size', value: servers.length, icon: Database, color: 'text-blue-400', bg: 'bg-blue-400/5' },
              { label: 'Total Conns', value: servers.reduce((acc, s) => acc + (s.active_connections || 0), 0), icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/5' },
              { label: 'System Uptime', value: '99.9%', icon: Globe, color: 'text-green-400', bg: 'bg-green-400/5' },
              { label: 'Avg Latency', value: `${(servers.reduce((acc, s) => acc + (s.latency || 0), 0) / (servers.length || 1) * 1000).toFixed(0)}ms`, icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-400/5' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-8 py-6 rounded-3xl bg-slate-900/30 border border-white/5 shadow-2xl flex items-center gap-6"
              >
                <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} border border-white/5`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1.5">{stat.label}</p>
                  <p className="text-2xl font-mono font-black text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central Topology Engine */}
          <div className="flex-1 bg-slate-900/10 border border-white/5 rounded-[4rem] relative overflow-hidden p-8 lg:p-16 min-h-[600px] flex flex-col">
            {/* Grid Floor */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(45deg)] opacity-40" />
            
            <div className="relative z-20 flex flex-col h-full items-center justify-between">
              
              {/* Load Balancer Core Visualizer */}
              <div id="lb-core" className="flex flex-col items-center">
                <motion.div 
                  animate={{ 
                    rotateY: isRunning ? [0, 360] : 0,
                    scale: isRunning ? [1, 1.05, 1] : 1
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="relative cursor-pointer"
                >
                  <div className="absolute -inset-10 bg-blue-500/20 blur-[60px] opacity-40 animate-pulse" />
                  <div className="relative p-10 rounded-[3rem] bg-[#0f172a] border-2 border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)] flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/40">
                      <Globe className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-1">Central Hub</span>
                      <span className="text-[12px] font-mono font-black text-white">{nodeId || 'BOOTING...'}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Particle Layer */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <AnimatePresence>
                  {particles.map(p => (
                    <RequestParticle 
                      key={p.id} 
                      targetId={p.target} 
                      startPos={{ 
                        x: typeof window !== 'undefined' ? window.innerWidth / 2 - 200 : 0, 
                        y: 150 
                      }} 
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Server Nodes Architecture */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full mt-auto">
                <AnimatePresence>
                  {servers.map((server) => (
                    <motion.div
                      layout
                      key={server.id}
                      id={`server-${server.id}`}
                      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotateX: 0,
                        y: server.healthy ? [0, -10, 0] : 0
                      }}
                      transition={{ 
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: Math.random() * 2 } 
                      }}
                      className={`group relative p-8 rounded-[3rem] border transition-all duration-700 ${
                        server.healthy 
                          ? 'bg-slate-900/60 border-white/5 hover:border-blue-500/40 hover:bg-slate-800/80 shadow-2xl' 
                          : 'bg-red-950/5 border-red-900/20 grayscale opacity-40'
                      }`}
                    >
                      {/* Active Indicator Glow */}
                      {server.healthy && server.active_connections > 0 && (
                        <div className="absolute inset-0 bg-blue-500/5 blur-[30px] animate-pulse" />
                      )}

                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className={`p-4 rounded-2xl ${server.healthy ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                          <ServerIcon className="w-6 h-6" />
                        </div>
                        <button 
                          onClick={() => toggleServer(server.id)}
                          className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl transition-all ${
                            server.healthy 
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${server.healthy ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-red-500'}`} />
                          {server.healthy ? 'Online' : 'Dead'}
                        </button>
                      </div>
                      
                      <div className="space-y-6 relative z-10">
                        <div>
                          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{server.id}</h3>
                          <div className="relative w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              animate={{ width: `${(server.active_connections / server.max_capacity) * 100}%` }}
                              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${
                                server.active_connections > 80 ? 'bg-gradient-to-r from-orange-600 to-red-500' : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                              }`}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm">
                            <span className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1.5">Load</span>
                            <span className={`text-sm font-mono font-black ${server.active_connections > 80 ? 'text-orange-400' : 'text-slate-200'}`}>
                              {server.active_connections}<span className="text-[10px] text-slate-600 ml-1">sessions</span>
                            </span>
                          </div>
                          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm">
                            <span className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1.5">Latency</span>
                            <span className="text-sm font-mono font-black text-slate-200">
                              {(server.latency * 1000).toFixed(0)}<span className="text-[10px] text-slate-600 ml-1">ms</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Futuristic Command Bar */}
      <footer className="h-14 border-t border-white/5 bg-[#030712] flex items-center px-10 text-[10px] font-mono gap-10 text-slate-600 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-pulse" />
          <span className="font-black tracking-[0.2em]">NETWORK_CORE: SYNCHRONIZED</span>
        </div>
        <div className="w-px h-5 bg-white/5" />
        <div className="flex items-center gap-3">
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" />
          <span className="uppercase tracking-[0.2em] font-black text-slate-500">Gateway: Upstash_Redis_v4 [Secure]</span>
        </div>
        <div className="flex-1 flex justify-end gap-10 uppercase tracking-[0.3em] font-black">
          <span className="text-slate-800">Cluster_Encryption: TLS_1.3</span>
          <span className="text-blue-900/50">Project_Distributed_Systems_Lab // 2026</span>
        </div>
      </footer>
    </div>
  );
}
