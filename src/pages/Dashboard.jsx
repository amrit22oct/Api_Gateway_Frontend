import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const role = localStorage.getItem("role") || "DEVELOPER";

  // Mock metric stats
  const stats = [
    {
      title: "Total API Requests",
      value: "1,284,920",
      change: "+12.5%",
      isPositive: true,
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    {
      title: "Avg Latency",
      value: "22ms",
      change: "-4ms",
      isPositive: true,
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Success Rate",
      value: "99.96%",
      change: "+0.02%",
      isPositive: true,
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Active API Keys",
      value: "14 / 20",
      change: "6 available",
      isPositive: true,
      icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    },
  ];

  // Mock recent API request logs
  const [logs] = useState([
    { id: 1, method: "GET", endpoint: "/api/v1/auth/me", status: 200, latency: "14ms", time: "2 mins ago" },
    { id: 2, method: "POST", endpoint: "/api/v1/gateway/tokens", status: 201, latency: "42ms", time: "5 mins ago" },
    { id: 3, method: "GET", endpoint: "/api/v1/projects", status: 200, latency: "18ms", time: "12 mins ago" },
    { id: 4, method: "DELETE", endpoint: "/api/v1/keys/key_8921", status: 403, latency: "8ms", time: "24 mins ago" },
    { id: 5, method: "GET", endpoint: "/api/v1/analytics/daily", status: 200, latency: "65ms", time: "1 hour ago" },
  ]);

  // Mock active services
  const services = [
    { name: "Auth Service", status: "Healthy", uptime: "99.99%", latency: "12ms" },
    { name: "Billing Gateway", status: "Healthy", uptime: "99.95%", latency: "28ms" },
    { name: "Rate Limiter Proxy", status: "Healthy", uptime: "100%", latency: "4ms" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-900 via-indigo-950/30 to-zinc-900 p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Console Overview</h1>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              v2.4.0
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400">
            Monitor API traffic, manage service keys, and review system latency.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/api-keys"
            className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          >
            + New API Key
          </Link>
          <Link
            to="/projects"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
          >
            Create Project
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg backdrop-blur-xl transition duration-200 hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">{stat.title}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span
                className={`text-xs font-semibold ${
                  stat.isPositive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Gateway Activity Table */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Recent Gateway Traffic</h3>
              <p className="text-xs text-zinc-400">Live incoming API requests routed through DevGate</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Stream
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-zinc-500 uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-semibold">Method</th>
                  <th className="pb-3 font-semibold">Endpoint</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Latency</th>
                  <th className="pb-3 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {logs.map((log) => (
                  <tr key={log.id} className="group transition hover:bg-white/[0.02]">
                    <td className="py-3.5 font-mono">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          log.method === "GET"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : log.method === "POST"
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {log.method}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-zinc-200">{log.endpoint}</td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          log.status < 300 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400">{log.latency}</td>
                    <td className="py-3.5 text-right text-zinc-500">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health & Active Services Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-base font-semibold text-white">Active Microservices</h3>
            <p className="mt-0.5 text-xs text-zinc-400">Internal service health status</p>

            <div className="mt-5 space-y-4">
              {services.map((srv, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/50 p-3.5"
                >
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{srv.name}</p>
                    <p className="text-[10px] text-zinc-500">Latency: {srv.latency}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {srv.status}
                    </span>
                    <p className="text-[10px] text-zinc-500">{srv.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 to-zinc-900 p-5">
            <div className="flex items-center gap-2 text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider">Gateway Tip</span>
            </div>
            <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
              You can set rate-limiting headers per route inside your route configuration file or manage key quotas in the API Keys section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;