"use client";
import { useState } from "react";

const providers = ["openai", "anthropic", "gemini", "groq", "mistral", "cohere"];

const stats = [
  { num: "6", label: "providers supported" },
  { num: "<50ms", label: "gateway overhead" },
  { num: "100%", label: "tenant isolation" },
];

export default function ProvidersStats() {
  const [hoveredPill, setHoveredPill] = useState<number | null>(null);

  return (
    <>
      {/* Providers */}
      <section style={{ padding: "64px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container mx-auto px-6" style={{ maxWidth: 1100 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 28,
            }}
          >
            supported providers
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {providers.map((p, i) => (
              <span
                key={p}
                onMouseEnter={() => setHoveredPill(i)}
                onMouseLeave={() => setHoveredPill(null)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: hoveredPill === i ? "var(--green)" : "var(--text-2)",
                  border: hoveredPill === i
                    ? "1px solid rgba(184,245,66,0.3)"
                    : "1px solid var(--border)",
                  padding: "7px 18px",
                  borderRadius: "var(--radius)",
                  background: hoveredPill === i ? "var(--green-glow)" : "var(--bg-2)",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  cursor: "default",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          background: "var(--bg-2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "40px 32px",
              borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700,
                color: "var(--green)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-2)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
