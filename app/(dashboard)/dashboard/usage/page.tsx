'use client'
import PageHeader from "@/components/dashboard/PageHeader";
import Link from "next/link";
import { useEffect, useState } from "react";

// Inline helper for relative time
function timeAgo(dateString: string) {
  if (!dateString) return "—";
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

// Inline formatters
const formatCost = (cost?: number) => cost != null ? `$${Number(cost).toFixed(2)}` : "—";
const formatNumber = (num?: number) => num != null ? num.toLocaleString() : "—";

export default function UsagePage() {
  const [data, setData] = useState<{ byModel: any[], byUser: any[], logs: any[] }>({ 
  byModel: [], 
  byUser: [], 
  logs: [] 
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const opts: RequestInit = { credentials: "include" };
        const [resModel, resUser, resLogs] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/usage/by-model`, opts),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/usage/by-user`, opts),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/usage/logs?limit=20`, opts)
        ]);

        const [byModel, byUser, logs] = await Promise.all([
          resModel.ok ? resModel.json() : [],
          resUser.ok ? resUser.json() : [],
          resLogs.ok ? resLogs.json() : []
        ]);

        // Sort models by tokens desc by default
        const sortedModels = (Array.isArray(byModel) ? byModel : []).sort(
          (a, b) => (b.tokens || 0) - (a.tokens || 0)
        );

        setData({
          byModel: sortedModels,
          byUser: Array.isArray(byUser) ? byUser : [],
          logs: Array.isArray(logs) ? logs : []
        });
      } catch (error) {
        console.error("Failed to fetch usage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsage();
  }, []);

  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .loading { animation: pulse 1.5s ease-in-out infinite; }
        .truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
      `}} />

      <PageHeader
        label="// usage"
        title="Usage & Cost"
        description="Token consumption, cost, and latency per provider and user. Updated in real time."
      />

      <div style={{ padding: "28px 36px", display: "flex", flexDirection: "column", gap: 36 }}>

        {/* SECTION A: BY MODEL */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
          }}>
            // by model
          </div>
          <div className={loading ? "loading" : ""} style={{
            border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr",
              padding: "10px 20px", background: "var(--bg-3)",
              borderBottom: "1px solid var(--border)",
            }}>
              {["Provider / Model", "Requests", "Tokens", "Est. cost", "Avg latency"].map(h => (
                <div key={h} style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                  color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {h}
                </div>
              ))}
            </div>
            {data.byModel.length === 0 && !loading && (
              <div style={{ padding: "20px", textAlign: "center", color: "var(--text-3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>No model data found.</div>
            )}
            {data.byModel.map((row: any, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr",
                alignItems: "center", padding: "14px 20px",
                background: i % 2 === 0 ? "var(--bg-2)" : "var(--bg)",
                borderBottom: i < data.byModel.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                    color: "var(--teal)", background: "var(--teal-dim)",
                    border: "1px solid rgba(78,205,196,0.18)",
                    padding: "2px 8px", borderRadius: "var(--radius)", display: "inline-block",
                  }}>
                    {row.provider || row.model || "unknown"}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{formatNumber(row.requests)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{formatNumber(row.tokens)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{formatCost(row.estimated_cost_usd)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{row.avg_latency_ms != null ? `${Math.round(row.avg_latency_ms)}ms` : "—"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: BY USER */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
          }}>
            // by user
          </div>
          <div className={loading ? "loading" : ""} style={{
            border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
              padding: "10px 20px", background: "var(--bg-3)",
              borderBottom: "1px solid var(--border)",
            }}>
              {["User", "Requests", "Tokens", "Est. cost"].map(h => (
                <div key={h} style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                  color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {h}
                </div>
              ))}
            </div>
            {data.byUser.length === 0 && !loading && (
              <div style={{ padding: "20px", textAlign: "center", color: "var(--text-3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>No user data found.</div>
            )}
            {data.byUser.map((row: any, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
                alignItems: "center", padding: "14px 20px",
                background: i % 2 === 0 ? "var(--bg-2)" : "var(--bg)",
                borderBottom: i < data.byUser.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div className="truncate" title={row.email || row.user_id}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                    color: "var(--teal)", background: "var(--teal-dim)",
                    border: "1px solid rgba(78,205,196,0.18)",
                    padding: "2px 8px", borderRadius: "var(--radius)", display: "inline-block",
                  }}>
                    {row.email || row.user_id || "unknown"}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{formatNumber(row.requests)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{formatNumber(row.tokens)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{formatCost(row.estimated_cost_usd)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION C: RECENT REQUESTS */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
          }}>
            // recent requests
          </div>
          <div className={loading ? "loading" : ""} style={{
            border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 1fr 1fr 1fr",
              padding: "10px 20px", background: "var(--bg-3)",
              borderBottom: "1px solid var(--border)",
            }}>
              {["Time", "Model", "Tokens", "Latency", "Cache", "Cost"].map(h => (
                <div key={h} style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                  color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {h}
                </div>
              ))}
            </div>
            {data.logs.length === 0 && !loading && (
              <div style={{ padding: "20px", textAlign: "center", color: "var(--text-3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>No recent logs found.</div>
            )}
            {data.logs.map((row: any, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 1fr 1fr 1fr",
                alignItems: "center", padding: "14px 20px",
                background: i % 2 === 0 ? "var(--bg-2)" : "var(--bg)",
                borderBottom: i < data.logs.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
                  {timeAgo(row.created_at)}
                </span>
                <span className="truncate" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>
                  {row.model || "—"}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
                  {formatNumber(row.tokens_used)}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
                  {row.latency_ms != null ? `${row.latency_ms}ms` : "—"}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", display: "flex", alignItems: "center", gap: 6 }}>
                  {row.cache_success ? (
                    <>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} /> hit
                    </>
                  ) : (
                    <span style={{ color: "var(--text-3)" }}>miss</span>
                  )}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
                  {formatCost(row.estimated_cost_usd)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}