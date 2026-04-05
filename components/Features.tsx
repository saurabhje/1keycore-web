"use client";
import { useState } from "react";
import {
  IconLock,
  IconBuilding,
  IconGauge,
  IconRoute,
  IconDatabase,
  IconBarChart,
} from "./icons";

const features = [
  {
    icon: IconLock,
    title: "BYOK Encryption",
    desc: "AES-256 Fernet encryption for all stored keys. Encrypted before persistence, decrypted only in memory at call time.",
    badge: null,
  },
  {
    icon: IconBuilding,
    title: "Multi-tenant Isolation",
    desc: "Complete data separation per organization. Keys, usage data, and configuration are fully isolated — no cross-tenant leakage.",
    badge: null,
  },
  {
    icon: IconGauge,
    title: "Rate Limiting",
    desc: "Granular RPM, TPM, and concurrency controls scoped per user and per tenant. Prevents runaway costs before they happen.",
    badge: null,
  },
  {
    icon: IconRoute,
    title: "Model Routing",
    desc: "Unified interface across OpenAI, Anthropic, Gemini, Groq, Mistral, and Cohere. Switch providers without changing client code.",
    badge: null,
  },
  {
    icon: IconDatabase,
    title: "Semantic Cache",
    desc: "pgvector cosine similarity matching skips redundant LLM calls for semantically equivalent prompts. Cut costs without degrading quality.",
    badge: null,
  },
  {
    icon: IconBarChart,
    title: "Usage Tracking",
    desc: "Token consumption, cost attribution, and latency breakdowns per tenant. Full observability into your LLM spend.",
    badge: "coming soon",
  },
];

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="features"
      style={{ padding: "80px 0", borderBottom: "1px solid var(--border)" }}
    >
      <div className="container mx-auto px-6" style={{ maxWidth: 1100 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--green)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          // capabilities
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
          Everything your infra needs
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 56 }}>
          Production-grade primitives, not demos.
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
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const isHovered = hovered === i;
            return (
              <div
                key={feat.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered ? "var(--bg-3)" : "var(--bg-2)",
                  padding: "clamp(24px, 5vw, 32px) clamp(20px, 4vw, 28px)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.2s",
                }}
              >
                {/* top border reveal */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: isHovered ? "var(--green)" : "transparent",
                    transition: "background 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* icon */}
                <div style={{ marginBottom: 16 }}>
                  <Icon
                    size={20}
                    color={isHovered ? "var(--green)" : "var(--text-3)"}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: 8,
                    letterSpacing: "0.01em",
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>
                  {feat.desc}
                </p>
                {feat.badge && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--teal)",
                      background: "var(--teal-dim)",
                      border: "1px solid rgba(78,205,196,0.18)",
                      padding: "2px 8px",
                      borderRadius: "var(--radius)",
                      marginTop: 12,
                      display: "inline-block",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {feat.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}