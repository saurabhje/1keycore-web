"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/CtaFooter";

const SECTIONS = [
  {
    slug: "quickstart",
    title: "Quickstart",
    desc: "Register your API key and make your first gateway request in under 2 minutes.",
  },
  {
    slug: "authentication",
    title: "Authentication",
    desc: "How JWT tokens are issued, scoped, and validated on every request.",
  },
  {
    slug: "endpoints",
    title: "API Reference",
    desc: "Full reference for POST /chat, GET /usage, POST /keys, and more.",
  },
  {
    slug: "providers",
    title: "Supported Providers",
    desc: "OpenAI, Anthropic, Gemini, Groq, Mistral, Cohere — configuration and model IDs.",
  },
  {
    slug: "rate-limiting",
    title: "Rate Limiting",
    desc: "RPM, TPM, and concurrency limits — how to set them per user and per tenant.",
  },
  {
    slug: "semantic-cache",
    title: "Semantic Cache",
    desc: "How pgvector cosine similarity matching skips redundant LLM calls.",
  },
];

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <div className="container mx-auto px-6" style={{ maxWidth: 900, padding: "64px 24px 96px" }}>

          {/* Header */}
          <div style={{ marginBottom: 56, borderBottom: "1px solid var(--border)", paddingBottom: 40 }}>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
              color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12,
            }}>
              // documentation
            </p>
            <h1 style={{
              fontFamily: "var(--font-mono)", fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 12,
            }}>
              1KeyCore Docs
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 520 }}>
              Everything you need to integrate the gateway, manage keys, and give your team controlled LLM access.
            </p>

            {/* Coming soon notice */}
            <div style={{
              marginTop: 24,
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-mono)", fontSize: 12,
              color: "var(--teal)", background: "var(--teal-dim)",
              border: "1px solid rgba(78,205,196,0.18)",
              padding: "8px 14px", borderRadius: "var(--radius)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
              Full docs are being written. Pages marked with · are coming soon.
            </div>
          </div>

          {/* Section cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {SECTIONS.map((s, i) => {
              const isReady = i === 0; // only quickstart is "ready" for now
              return (
                  <div
                    key={s.slug}
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "24px",
                      position: "relative",
                      overflow: "hidden",
                      opacity: isReady ? 1 : 0.8,
                      transition: "border-color 0.18s, background 0.18s",
                    }}
                    onMouseEnter={e => { if (isReady) { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,245,66,0.25)"; (e.currentTarget as HTMLDivElement).style.background = "var(--bg-3)"; }}}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.background = "var(--bg-2)"; }}
                  >
                  {/* top accent on ready sections */}
                  {isReady && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--green)", borderRadius: 0 }} />
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                      color: isReady ? "var(--green)" : "var(--text-2)",
                      background: isReady ? "var(--green-dim)" : "var(--bg-3)",
                      border: `1px solid ${isReady ? "rgba(184,245,66,0.2)" : "var(--border)"}`,
                      padding: "2px 7px", borderRadius: "var(--radius)",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                      {isReady ? "ready" : "soon"}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600,
                    color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 8,
                  }}>
                    {isReady
                      ? <Link href={`/docs/${s.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{s.title}</Link>
                      : s.title
                    }
                  </h2>
                  <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.65 }}>{s.desc}</p>

                  {isReady && (
                    <Link href={`/docs/${s.slug}`} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                      color: "var(--green)", textDecoration: "none", marginTop: 16,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      Read →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Back to dashboard */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <Link href="/dashboard" style={{
              fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
            >
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
