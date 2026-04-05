'use client'
import PageHeader from "@/components/dashboard/PageHeader";
import Link from "next/link";

const PROVIDERS = ["openai", "anthropic", "gemini", "groq"];

export default function UsagePage() {
  return (
    <div>
      <PageHeader
        label="// usage"
        title="Usage & Cost"
        description="Token consumption, cost, and latency per provider and user. Updated in real time."
      />

      <div style={{ padding: "28px 36px" }}>

        {/* Coming soon state — replace with real charts once backend is wired */}
        <div style={{
          background: "var(--bg-2)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "56px 24px",
          textAlign: "center",
          marginBottom: 20,
        }}>
          {/* Placeholder bar chart illustration */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            gap: 8, height: 72, marginBottom: 24, opacity: 0.25,
          }}>
            {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
              <div key={i} style={{
                width: 20, height: `${h}%`,
                background: i === 5 ? "var(--green)" : "var(--text-3)",
                borderRadius: "2px 2px 0 0",
              }} />
            ))}
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
            color: "var(--teal)", background: "var(--teal-dim)",
            border: "1px solid rgba(78,205,196,0.18)",
            padding: "4px 12px", borderRadius: "var(--radius)",
            letterSpacing: "0.08em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }}/>
            coming soon
          </div>

          <h2 style={{
            fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700,
            color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 8,
          }}>
            Usage analytics in development
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 400, margin: "0 auto 24px" }}>
            Add your API keys now. Token, cost, and latency data will be tracked from your first request and displayed here once this module ships.
          </p>
          <Link href="/dashboard/keys" style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700,
            background: "var(--green)", color: "#0a0c10",
            border: "none", borderRadius: "var(--radius)",
            padding: "10px 20px", textDecoration: "none",
            letterSpacing: "0.02em", transition: "opacity 0.18s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Add a key first
          </Link>
        </div>

        {/* Provider breakdown skeleton */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)",
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
        }}>
          by provider
        </div>
        <div style={{
          border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
            padding: "10px 20px", background: "var(--bg-3)",
            borderBottom: "1px solid var(--border)",
          }}>
            {["Provider", "Requests", "Tokens", "Est. cost"].map(h => (
              <div key={h} style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                {h}
              </div>
            ))}
          </div>
          {PROVIDERS.map((p, i) => (
            <div key={p} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
              alignItems: "center", padding: "14px 20px",
              background: i % 2 === 0 ? "var(--bg-2)" : "var(--bg)",
              borderBottom: i < PROVIDERS.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                color: "var(--teal)", background: "var(--teal-dim)",
                border: "1px solid rgba(78,205,196,0.18)",
                padding: "2px 8px", borderRadius: "var(--radius)", display: "inline-block",
              }}>
                {p}
              </span>
              {["—", "—", "—"].map((v, j) => (
                <span key={j} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>{v}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
