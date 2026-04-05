'ise client';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/CtaFooter";

function CodeSnippet({ label, code }: { label: string; code: string }) {
  return (
    <div style={{
      background: "var(--bg-3)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", overflow: "hidden", marginBottom: 24,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-2)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", marginLeft: 6, letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <pre style={{
        fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.7,
        color: "var(--text-2)", padding: "18px 20px", overflowX: "auto", margin: 0,
      }}>
        {code}
      </pre>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
          color: "var(--green)", background: "var(--green-dim)",
          border: "1px solid rgba(184,245,66,0.2)",
          padding: "3px 10px", borderRadius: "var(--radius)", letterSpacing: "0.08em",
        }}>
          {String(n).padStart(2, "0")}
        </span>
        <h2 style={{
          fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700,
          color: "var(--text)", letterSpacing: "-0.02em",
        }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default function QuickstartPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 96px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            <Link href="/docs" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-2)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >
              Docs
            </Link>
            <span style={{ color: "var(--text-3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>Quickstart</span>
          </div>

          {/* Title */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
            color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10,
          }}>
            // quickstart
          </p>
          <h1 style={{
            fontFamily: "var(--font-mono)", fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 14,
          }}>
            Your first gateway request
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 40 }}>
            From zero to a working LLM call through the 1KeyCore gateway in under 2 minutes.
            You need a 1KeyCore account and at least one provider API key.
          </p>

          <Step n={1} title="Create an account">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
              Sign up at{" "}
              <Link href="/signup" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>/signup</Link>
              {" "}— this gives you a tenant workspace. You&apos;ll land on the dashboard.
            </p>
          </Step>

          <Step n={2} title="Add a provider key">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
              Go to{" "}
              <Link href="/dashboard/keys" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>Dashboard → API Keys</Link>
              , select your provider, paste your key, and click Save. It is AES-256 encrypted before storage — we never log the raw value.
            </p>
          </Step>

          <Step n={3} title="Get your JWT">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
              After login, your session cookie holds the JWT. To use it in direct API calls, exchange it:
            </p>
            <CodeSnippet label="shell" code={`curl -X POST ${"`"}${process.env.NEXT_PUBLIC_API_URL ?? "https://api.1keycore.com"}/auth/token${"`"} \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com", "password": "••••••••"}'

# Response
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}`} />
          </Step>

          <Step n={4} title="Make your first request">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
              Send a POST to <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)", background: "var(--green-dim)", padding: "1px 6px", borderRadius: 3 }}>/chat</code> with your JWT and the model you want to use. The gateway routes it to the right provider automatically.
            </p>
            <CodeSnippet label="shell" code={`curl -X POST ${"`"}${process.env.NEXT_PUBLIC_API_URL ?? "https://api.1keycore.com"}/chat${"`"} \\
  -H "Authorization: Bearer <your_jwt>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model":   "gpt-4o",
    "message": "Summarise this contract in 3 bullets"
  }'`} />
            <CodeSnippet label="response · 200 OK" code={`{
  "response":    "1. The contract grants...",
  "model":       "gpt-4o",
  "tokens":      312,
  "latency_ms":  38,
  "cached":      false
}`} />
          </Step>

          <Step n={5} title="Invite your team">
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8 }}>
              Team member invitations and scoped JWT issuance are coming in the next release. For now, share the workspace credentials with your team — each session gets its own token, tracked separately in usage.
            </p>
          </Step>

          {/* Next steps */}
          <div style={{
            marginTop: 16, padding: "24px", background: "var(--bg-2)",
            border: "1px solid var(--border)", borderRadius: "var(--radius)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              next steps
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "← Back to docs",        href: "/docs"           },
                { label: "Go to dashboard →",      href: "/dashboard"      },
                { label: "Add another key →",      href: "/dashboard/keys" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)",
                  textDecoration: "none", transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--green)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
