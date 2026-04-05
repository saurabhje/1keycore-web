"use client";
import { useState } from "react";
import GatewayPanel from "./GatewayPanel";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<"idle"|"loading"|"done"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    // wire to your API: await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`, ...)
    await new Promise(r => setTimeout(r, 800)); // placeholder
    setState("done");
  }

  return (
    <section style={{ padding: "96px 0 80px", borderBottom: "1px solid var(--border)" }}>
      <div className="container mx-auto px-6" style={{ maxWidth: 1100 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 68 }}>

          {/* ── Left copy ── */}
          <div>
            {/* Badge */}
            <div
              className="fade fade-d1"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                color: "var(--green)", background: "var(--green-dim)",
                border: "1px solid rgba(184,245,66,0.2)",
                padding: "5px 12px", borderRadius: "var(--radius)",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
              AI Infrastructure Layer
            </div>

            {/* Headline */}
            <h1
              className="fade fade-d2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 700, lineHeight: 1.12,
                letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 20,
              }}
            >
              One key.<br />
              <span style={{ color: "var(--green)" }}>Every model.</span><br />
              Full control.
            </h1>

            {/* Sub */}
            <p
              className="fade fade-d3"
              style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 36, maxWidth: 420 }}
            >
              Plug in your LLM API keys once. Give your team controlled,
              audited access to any provider — with rate limiting, caching,
              and full usage visibility.
            </p>

            {/* Waitlist form */}
                        <div
              className="fade fade-d4 flex flex-wrap"
              style={{ gap: 12 }}
            >
              <Link
                href="#"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  background: "var(--green)",
                  color: "#0a0c10",
                  padding: "8px 18px",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s, transform 0.15s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.87";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start Building
              </Link>
              <Link
                href="#"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 500,
                  background: "transparent",
                  color: "var(--text-2)",
                  border: "1px solid var(--border)",
                  padding: "8px 18px",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "border-color 0.2s, color 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-2)";
                }}
              >
                View Docs
              </Link>
            </div>
          </div>
          
          <div className="fade fade-d5" style={{ borderRadius: 8}}>
            <Image
              src="/hero.svg"
              alt="1KeyCore gateway architecture"
              width={680}
              height={380}  
              style={{ width: "115%", height: "auto", maxWidth: "none" }} priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
