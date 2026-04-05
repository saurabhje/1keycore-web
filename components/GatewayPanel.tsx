"use client";
import { useEffect, useRef, useState } from "react";

const ROWS = [
  { initials: "AK", user: "a.kumar",  prompt: "Summarise Q3 earnings call",   model: "gpt-4o",          color: "#74c365", bg: "rgba(116,195,101,0.1)",  border: "rgba(116,195,101,0.2)",  ms: 28 },
  { initials: "SP", user: "s.park",   prompt: "Draft reply to legal notice",   model: "claude-3-5",      color: "#cf8c5d", bg: "rgba(207,140,93,0.1)",   border: "rgba(207,140,93,0.2)",   ms: 41 },
  { initials: "RJ", user: "r.jones",  prompt: "Translate contract to French",  model: "gemini-1.5-pro",  color: "#6495ed", bg: "rgba(100,149,237,0.1)",  border: "rgba(100,149,237,0.2)",  ms: 35 },
  { initials: "ML", user: "m.liu",    prompt: "Generate unit tests for auth",  model: "groq-llama3",     color: "#4ecdc4", bg: "rgba(78,205,196,0.1)",   border: "rgba(78,205,196,0.2)",   ms: 12 },
  { initials: "TN", user: "t.nair",   prompt: "Explain this Python traceback", model: "gpt-4o-mini",     color: "#74c365", bg: "rgba(116,195,101,0.1)",  border: "rgba(116,195,101,0.2)",  ms: 19 },
  { initials: "CB", user: "c.brooks", prompt: "Write onboarding email flow",   model: "claude-3-haiku",  color: "#cf8c5d", bg: "rgba(207,140,93,0.1)",   border: "rgba(207,140,93,0.2)",   ms: 33 },
];

type Row = typeof ROWS[number] & { id: number };

export default function GatewayPanel() {
  const [feed, setFeed]   = useState<Row[]>([]);
  const [tokens, setTokens] = useState(0);
  const counter = useRef(0);
  const idxRef  = useRef(0);

  function addRow() {
    const base = ROWS[idxRef.current % ROWS.length];
    idxRef.current++;
    const row: Row = { ...base, id: counter.current++ };
    setFeed(prev => [row, ...prev].slice(0, 5));
    setTokens(t => t + Math.floor(Math.random() * 600 + 200));
  }

  useEffect(() => {
    addRow(); addRow(); addRow();
    const t = setInterval(addRow, 2200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tokenStr = tokens >= 1000 ? (tokens / 1000).toFixed(1) + "k" : String(tokens);

  return (
    <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", fontFamily: "var(--font-mono)" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "var(--bg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "gw-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>gateway · live</span>
        </div>
        <span style={{ fontSize: 10, color: "var(--green)", background: "var(--green-dim)", border: "1px solid rgba(184,245,66,0.2)", padding: "3px 8px", borderRadius: 4, letterSpacing: "0.06em" }}>
          3 tenants active
        </span>
      </div>

      {/* Feed */}
      <div>
        {feed.map(row => (
          <div
            key={row.id}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", animation: "gw-slide 0.3s ease forwards" }}
          >
            {/* Avatar */}
            <div style={{ width: 26, height: 26, borderRadius: 4, background: "var(--bg-3)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, color: "var(--text-2)", flexShrink: 0 }}>
              {row.initials}
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.user} · acme-corp
              </div>
              <div style={{ fontSize: 11, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>
                {row.prompt}
              </div>
            </div>
            {/* Model tag */}
            <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 3, letterSpacing: "0.04em", flexShrink: 0, color: row.color, background: row.bg, border: `1px solid ${row.border}` }}>
              {row.model}
            </span>
            {/* Latency */}
            <span style={{ fontSize: 9, color: "var(--text-3)", flexShrink: 0, minWidth: 32, textAlign: "right" }}>{row.ms}ms</span>
            {/* Status dot */}
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block", flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* Token usage bar */}
      <div style={{ padding: "14px 18px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-3)", marginBottom: 8 }}>
          <span>token usage · today</span>
          <span>{tokenStr} / 2M</span>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, display: "flex", gap: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "38%", background: "var(--green)",  borderRadius: 1, opacity: 0.85 }} />
          <div style={{ height: "100%", width: "22%", background: "var(--teal)",   borderRadius: 1, opacity: 0.7  }} />
          <div style={{ height: "100%", width: "14%", background: "var(--text-2)", borderRadius: 1, opacity: 0.5  }} />
        </div>
      </div>

      {/* Tenant strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", background: "var(--bg)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>org</span>
        {[
          { name: "acme-corp", active: true },
          { name: "devstudio", active: false },
          { name: "nexgen",    active: false },
        ].map(t => (
          <span
            key={t.name}
            style={{
              fontSize: 9, padding: "2px 8px", borderRadius: 3,
              border: t.active ? "1px solid rgba(184,245,66,0.25)" : "1px solid var(--border)",
              color:  t.active ? "var(--green)" : "var(--text-2)",
              background: t.active ? "var(--green-glow)" : "transparent",
            }}
          >
            {t.name}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes gw-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes gw-slide  { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
