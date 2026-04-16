"use client";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import { useEffect, useState } from "react";

const QUICK_LINKS = [
  { href: "/dashboard/keys",  label: "Add your first API key",     desc: "Connect OpenAI, Anthropic, Gemini and more" },
  { href: "/docs",            label: "Read the quickstart",          desc: "Make your first gateway request in 2 minutes" },
  { href: "/dashboard/usage", label: "View usage breakdown",         desc: "Tokens, cost, and latency per user" },
];

// Helper to format large numbers like 1.2M or 340k
const formatCompact = (num?: number | null) => {
  if (num == null) return "—";
  return Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(num);
};

const formatCurrency = (num?: number | null) => {
  if (num == null) return "—";
  return `$${num.toFixed(2)}`;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usage/summary`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getValue = (val: any, formatter: (v: any) => string = String) => {
    if (loading || error || val == null) return "—";
    return formatter(val);
  };

  // Dynamically build the cards based on state
  const STAT_CARDS = [
    { 
      label: "Total requests", 
      value: getValue(stats.total_requests, (v) => v.toLocaleString()), 
      sub: "lifetime" 
    },
    { 
      label: "Tokens used", 
      value: getValue(stats.total_tokens, formatCompact), 
      sub: "this month" 
    },
    { 
      label: "Estimated cost", 
      value: getValue(stats.estimated_cost_usd, formatCurrency), 
      sub: "this month" 
    },
    { 
      label: "Cache hit rate", 
      value: getValue(stats.cache_hit_rate, (v) => `${v}%`), 
      sub: "this month" 
    },
    { 
      label: "Cache savings", 
      value: getValue(stats.estimated_savings_usd, formatCurrency), 
      sub: "saved this month" 
    },
    { 
      label: "Active keys", 
      value: getValue(stats.active_api_keys), 
      sub: "across providers" 
    },
  ];

  return (
    <div>
      {/* Inject skeleton keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .loading-skeleton {
          animation: skeleton-pulse 1.5s ease-in-out infinite;
        }
      `}} />

      <PageHeader
        label="// overview"
        title="Dashboard"
        description="Welcome to 1KeyCore. Start by adding a provider API key."
      />

      {/* Stat grid */}
      <div style={{ padding: "28px 36px", borderBottom: "1px solid var(--border)" }}>
        <div 
          className={loading ? "loading-skeleton" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {STAT_CARDS.map(s => (
            <div key={s.label} style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "20px 20px 16px",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 26,
                fontWeight: 700,
                color: s.label === "Cache savings" ? "var(--green)" : "var(--text)", // Added a nice accent for savings
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-2)",
              }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div style={{ padding: "28px 36px" }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-3)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}>
          get started
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {QUICK_LINKS.map((ql, i) => (
            <Link
              key={ql.href}
              href={ql.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 20px",
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                transition: "border-color 0.18s, background 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(184,245,66,0.25)"; e.currentTarget.style.background = "var(--bg-3)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-2)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--green)",
                  background: "var(--green-dim)",
                  border: "1px solid rgba(184,245,66,0.18)",
                  padding: "2px 7px",
                  borderRadius: "var(--radius)",
                  minWidth: 24,
                  textAlign: "center",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>
                    {ql.label}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-2)" }}>
                    {ql.desc}
                  </div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="7" x2="12" y2="7"/><polyline points="8 3 12 7 8 11"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}