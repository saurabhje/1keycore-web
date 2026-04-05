"use client";
import { useEffect, useRef, useState } from "react";

const BAD_ITEMS = [
  "Raw API keys shared across team",
  "No visibility into who spends what",
  "Duplicate calls, no caching",
  "One leaked key = full exposure",
];
const GOOD_ITEMS = [
  "Scoped JWT per employee",
  "Per-user cost & token breakdown",
  "Semantic cache cuts repeat calls",
  "Revoke one token, keys stay safe",
];

function CheckIcon({ bad }: { bad?: boolean }) {
  return bad ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#f87171" strokeWidth="1.4" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#b8f542" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <polyline points="2,7 5.5,11 12,3" />
    </svg>
  );
}

function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

export default function ValuePanel() {
  const [saving,    setSaving]    = useState(0);
  const [cacheHit,  setCacheHit]  = useState(0);
  const [blocked,   setBlocked]   = useState(0);
  const [providers, setProviders] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const TARGETS = { saving: 148, cache: 35, blocked: 47, providers: 4 };
    const steps = 56;
    let step = 0;
    const iv = setInterval(() => {
      step++;
      const e = ease(Math.min(step / steps, 1));
      setSaving(Math.round(TARGETS.saving * e));
      setCacheHit(Math.round(TARGETS.cache * e));
      setBlocked(Math.round(TARGETS.blocked * e));
      setProviders(Math.round(TARGETS.providers * e));
      if (step >= steps) clearInterval(iv);
    }, 25);
    return () => clearInterval(iv);
  }, []);

  const barW = Math.round((saving / 420) * 100);

  return (
    <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", fontFamily: "var(--font-mono)" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", background: "var(--bg)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "vp-pulse 2s ease-in-out infinite" }} />
          without vs with 1keycore
        </span>
        <span style={{ fontSize: 11, color: "var(--teal)", background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.18)", padding: "3px 8px", borderRadius: 3, letterSpacing: "0.05em" }}>
          12 employees · 1 month
        </span>
      </div>

      {/* Before / After */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Before */}
        <div style={{ padding: "16px 16px 14px", background: "var(--bg-2)" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-3)", display: "inline-block" }} />
            without
          </div>
          {BAD_ITEMS.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 9, fontSize: 12, lineHeight: 1.6, color: "var(--text-2)" }}>
              <CheckIcon bad />
              <span>{item}</span>
            </div>
          ))}
        </div>
        {/* After */}
        <div style={{ padding: "16px 16px 14px", background: "#0e1210" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, color: "var(--green)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            with
          </div>
          {GOOD_ITEMS.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 9, fontSize: 12, lineHeight: 1.6, color: "#c8cad6" }}>
              <CheckIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Savings meter */}
      <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.06em", marginBottom: 2 }}>estimated monthly savings</div>
            <div style={{ fontSize: 9, color: "var(--text-3)" }}>from cache hits + rate limiting</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--green)", letterSpacing: "-0.03em", lineHeight: 1 }}>${saving}</div>
            <div style={{ fontSize: 9, color: "var(--text-3)", marginTop: 3 }}>vs $420 unmanaged</div>
          </div>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: `${barW}%`, background: "var(--green)", borderRadius: 3, transition: "width 0.05s linear" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--text-3)" }}>
          <span>$0</span><span>$420 unmanaged</span>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
        {[
          { n: `${cacheHit}%`, l: "cache hit rate" },
          { n: String(blocked),   l: "calls blocked"  },
          { n: String(providers), l: "providers routed"},
        ].map(s => (
          <div key={s.l} style={{ background: "var(--bg)", padding: "12px 14px" }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--green)" }}>{s.n}</div>
            <div style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes vp-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  );
}
