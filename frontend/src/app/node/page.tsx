"use client";

import Link from "next/link";
import { Activity, Cpu, Info, Server, Signal, Wifi } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";

export default function NodePage() {
  const { servers, nodeId, algorithm } = useSimulation();

  const healthyCount = servers.filter((s) => s.healthy).length;
  const algoLabel = algorithm.replace(/_/g, " ");
  const feedLive = Boolean(nodeId || servers.length > 0);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-500/30">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#030712]/80 backdrop-blur-2xl z-30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
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
                Nodes
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              LB_INSTANCE{" "}
              <span className="text-slate-300">
                {nodeId || "awaiting heartbeat…"}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 relative z-10">
          {[
            { label: "Dashboard", href: "/" },
            { label: "Nodes", href: "/node" },
            { label: "Docs", href: "/docs" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-blue-400 transition-all flex items-center gap-2"
            >
              {item.label === "Docs" ? (
                <Info className="w-3.5 h-3.5" />
              ) : (
                <div className="w-1 h-1 rounded-full bg-slate-700" />
              )}
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/50 border border-white/10 px-5 py-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Wifi className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                Telemetry
              </p>
              <p className="font-mono text-sm font-black text-white truncate flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full shrink-0 ${feedLive ? "bg-green-400 shadow-[0_0_8px_#4ade80]" : "bg-slate-600"}`}
                />
                {feedLive ? "Live" : "Waiting"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900/50 border border-white/10 px-5 py-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                Routing
              </p>
              <p className="font-mono text-sm font-black text-white truncate capitalize">
                {algoLabel}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900/50 border border-white/10 px-5 py-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Signal className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                Backends
              </p>
              <p className="font-mono text-sm font-black text-white">
                {healthyCount}/{servers.length} healthy
              </p>
            </div>
          </div>
        </div>

        {/* Backend pool — minimal table */}
        <div className="rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white uppercase italic">
                  Backend pool
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Same cluster as the dashboard · toggle servers from home
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 transition-colors"
            >
              Open dashboard →
            </Link>
          </div>

          {servers.length === 0 ? (
            <div className="px-8 py-14 text-center">
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                No server list yet. Start the backend on{" "}
                <code className="text-slate-400 font-mono text-xs bg-black/40 px-2 py-1 rounded">
                  localhost:8001
                </code>{" "}
                and open the dashboard once so heartbeats populate this view.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    <th className="px-8 py-4 font-black">Server</th>
                    <th className="px-4 py-4 font-black">Status</th>
                    <th className="px-4 py-4 font-black text-right">Load</th>
                    <th className="px-8 py-4 font-black text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {servers.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-4 text-slate-200 font-black tracking-wide">
                        {s.id}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${s.healthy ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${s.healthy ? "bg-green-400" : "bg-red-500"}`}
                          />
                          {s.healthy ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-slate-300">
                        {s.active_connections ?? 0}
                        <span className="text-slate-600 ml-1">
                          / {s.max_capacity ?? "—"}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right text-slate-300">
                        {typeof s.latency === "number"
                          ? `${(s.latency * 1000).toFixed(0)} ms`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
