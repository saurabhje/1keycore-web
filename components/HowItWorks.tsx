"use client";
import { useState } from "react";

const steps = [
  {
    num: "STEP_01",
    title: "Register your API keys",
    desc: "Tenants onboard their LLM provider keys — encrypted at rest with AES-256 Fernet. Keys are never exposed in logs or responses.",
  },
  {
    num: "STEP_02",
    title: "Issue employee access",
    desc: "Employees receive scoped JWT tokens. Define model access, rate limits, and cost budgets per user or team — no key sharing required.",
  },
  {
    num: "STEP_03",
    title: "Gateway handles the rest",
    desc: "Routing, rate limiting, semantic caching, and usage tracking happen transparently. Full audit trail per tenant, per user, per call.",
  },
];

export default function HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="how"
      style={{ padding: "80px 0", borderBottom: "1px solid var(--border)" }}
    >
      <div className="container mx-auto px-6" style={{ maxWidth: 1100 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--green)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          // how it works
        </p>
        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          Three steps to production
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-2)",
            marginBottom: 56,
            lineHeight: 1.75,
          }}
        >
          From zero to a fully controlled LLM gateway in minutes.
        </p>

        <div
          style={{
            display: "grid",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "var(--bg-3)" : "var(--bg-2)",
                padding: "clamp(24px, 5vw, 36px) clamp(20px, 4vw, 32px)",
                transition: "background 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* top border reveal on hover */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: hovered === i ? "var(--green)" : "transparent",
                  transition: "background 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: hovered === i ? 1 : 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--green)",
                  letterSpacing: "0.1em",
                  background: "var(--green-dim)",
                  border: "1px solid rgba(184,245,66,0.18)",
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65}}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
