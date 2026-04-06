'use client'
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/CtaFooter";
import Link from "next/link";

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: "var(--font-mono)", fontSize: 12.5,
      color: "var(--green)", background: "var(--green-dim)",
      border: "1px solid rgba(184,245,66,0.15)",
      padding: "1px 7px", borderRadius: 4,
    }}>
      {children}
    </code>
  );
}

function Block({ label, code }: { label: string; code: string }) {
  return (
    <div style={{
      background: "var(--bg-3)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", overflow: "hidden", marginTop: 16, marginBottom: 8,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-2)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", marginLeft: 4, letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <pre style={{
        fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.75,
        color: "var(--text-2)", padding: "20px", overflowX: "auto", margin: 0,
      }}>
        {code}
      </pre>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "48px 1fr",
      gap: "0 32px", paddingTop: 48, paddingBottom: 48,
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 12,
        fontWeight: 600, color: "var(--text-2)",
        letterSpacing: "0.1em", paddingTop: 4,
      }}>
        {n}
      </div>
      <div>
        <h2 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(16px, 2vw, 20px)",
          fontWeight: 700, letterSpacing: "-0.02em",
          color: "var(--text)", marginBottom: 16, lineHeight: 1.3,
        }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://api.1keycore.com";

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "72px 24px 120px" }}>

          {/* Header */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
            color: "var(--green)", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 14,
          }}>
            // docs
          </p>
          <h1 style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "var(--text)", marginBottom: 16, lineHeight: 1.1,
          }}>
            Get started in 3 steps.
          </h1>
          <p style={{
            fontSize: 15, color: "var(--text-2)", lineHeight: 1.75,
            maxWidth: 520, marginBottom: 0,
            borderBottom: "1px solid var(--border)", paddingBottom: 48,
          }}>
            Create an account, register your provider key, then point your
            existing API calls at 1KeyCore. Your code barely changes.
            Your team gets controlled access. You get full visibility.
          </p>

          {/* ── Step 1 ── */}
          <Step n="01" title="Create your account">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 8 }}>
              Sign up at{" "}
              <Link href="/signup" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>
                1keycore.vercel.app/signup
              </Link>
              . This creates your tenant workspace. Every API key, user,
              and usage record lives inside your isolated tenant — nothing
              is shared across organisations.
            </p>
          </Step>

          {/* ── Step 2 ── */}
          <Step n="02" title="Register your provider key">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 4 }}>
              Go to{" "}
              <Link href="/dashboard/keys" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>
                Dashboard → API Keys
              </Link>
              , select your provider, and paste your key. It is encrypted
              with AES-256 before storage and never appears in logs or responses.
              You can register keys for any supported provider.
            </p>
            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
              Supported: <Code>openai</Code> <Code>anthropic</Code> <Code>gemini</Code> <Code>groq</Code> <Code>mistral</Code> <Code>cohere</Code>
            </p>

            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginTop: 20, marginBottom: 0 }}>
              Or register via API directly:
            </p>
            <Block label="shell — register a key" code={`curl -X POST ${API}/keys \\
  -H "Authorization: Bearer <your_jwt>" \\
  -H "Content-Type: application/json" \\
  -d '{"provider": "openai", "key": "sk-..."}'

# Response
{ "id": "key_01", "provider": "openai", "masked": "sk-...a3f9" }`} />
          </Step>

          {/* ── Step 3 ── */}
          <Step n="03" title="Integrate — one line change">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 4 }}>
              Instead of calling your provider directly, call 1KeyCore.
              Use your JWT (from login) as the bearer token.
              Specify the model as normal. The gateway routes the request,
              applies your rate limits, checks the semantic cache, and logs
              the usage — all transparently.
            </p>

            <Block label="shell — send a request" code={`curl -X POST ${API}/chat \\
  -H "Authorization: Bearer <your_jwt>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model":   "gpt-4o",
    "message": "Summarise this contract in 3 bullets"
  }'`} />

            <Block label="response — 200 OK" code={`{
  "response":    "1. The contract grants exclusive rights...",
  "model":       "gpt-4o",
  "tokens":      312,
  "latency_ms":  38,
  "cached":      false
}`} />

            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginTop: 20 }}>
              To get your JWT programmatically:
            </p>
            <Block label="shell — get a token" code={`curl -X POST ${API}/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com", "password": "••••••••"}'

# Response
{ "access_token": "eyJ...", "token_type": "bearer" }`} />

            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginTop: 20 }}>
              That&apos;s it. Every request is now tracked. Head to{" "}
              <Link href="/dashboard/usage" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>
                Dashboard → Usage
              </Link>{" "}
              to see token consumption, cost, and latency broken down by
              user and provider.
            </p>
          </Step>

          {/* Footer nav */}
          <div style={{
            marginTop: 56, display: "flex",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <Link href="/" style={{
              fontFamily: "var(--font-mono)", fontSize: 12,
              color: "var(--text-2)", textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
            >
              ← Back to home
            </Link>
            <Link href="/signup" style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
              color: "#0d0f14", background: "var(--green)",
              textDecoration: "none", padding: "9px 20px",
              borderRadius: "var(--radius)", transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.87")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Create account →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
