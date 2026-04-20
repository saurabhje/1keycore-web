"use client";
import { useState } from "react";
import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Docs",     href: "/docs"    },
  ],
  Account: [
    { label: "Sign up",  href: "/signup"    },
    { label: "Sign in",  href: "/login"     },
    { label: "Dashboard",href: "/dashboard" },
  ],
  Source: [
    { label: "GitHub",   href: "https://github.com/", external: true },
    { label: "Twitter",  href: "https://x.com/", external: true },
  ],
};

export function CTASection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle"|"loading"|"done"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
      <div className="container mx-auto px-6" style={{ maxWidth: 640 }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
          color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12,
        }}>
          // early access
        </p>
        <h2 style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 12,
        }}>
          Be first through the door
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 40, lineHeight: 1.75 }}>
          Drop your email and you&apos;ll be among the first to get access when the dashboard is ready.
        </p>

        {state === "done" ? (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-mono)", fontSize: 13,
            color: "var(--green)", background: "var(--green-dim)",
            border: "1px solid rgba(184,245,66,0.2)",
            padding: "14px 24px", borderRadius: "var(--radius)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            You&apos;re on the list — we&apos;ll be in touch.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, maxWidth: 480, margin: "0 auto", flexWrap: "wrap" }}>
              <input
                type="email" required placeholder="you@company.com"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 13,
                  background: "var(--bg-2)", color: "var(--text)",
                  border: "1px solid var(--border)",
                  padding: "13px 16px", borderRadius: "var(--radius)",
                  outline: "none", flex: "1 1 220px", minWidth: 0,
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,245,66,0.4)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button type="submit" disabled={state === "loading"} style={{
                fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700,
                background: state === "loading" ? "rgba(184,245,66,0.7)" : "var(--green)",
                color: "#0a0c10", border: "none", padding: "13px 28px",
                borderRadius: "var(--radius)", cursor: state === "loading" ? "wait" : "pointer",
                letterSpacing: "0.02em", whiteSpace: "nowrap",
              }}>
                {state === "loading" ? "Joining..." : "Get Early Access"}
              </button>
            </form>
            {state === "error" && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#f87171", marginTop: 10 }}>
                Something went wrong. Try again.
              </p>
            )}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", marginTop: 16 }}>
              Or{" "}
              <Link href="/signup" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>
                create an account
              </Link>
              {" "}if you&apos;re ready to start.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="container mx-auto px-6" style={{ maxWidth: 1100 }}>

        {/* Top — logo + link columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr repeat(3, 1fr)",
          gap: 40,
          padding: "48px 0 40px",
          borderBottom: "1px solid var(--border)",
        }}
        className="grid-cols-1 sm:grid-cols-4"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{
              fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700,
              color: "var(--text)", textDecoration: "none", letterSpacing: "-0.02em",
              display: "block", marginBottom: 12,
            }}>
              1<span style={{ color: "var(--green)" }}>Key</span>Core
            </Link>
            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 200 }}>
              One gateway. Every LLM provider. Full control over your team&apos;s AI usage.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: 14,
              }}>
                {group}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)",
                      textDecoration: "none", transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
