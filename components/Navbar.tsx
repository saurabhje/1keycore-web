"use client";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { label: "Docs",    href: "/docs"},
];

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      borderBottom: "1px solid var(--border)",
      background: "rgba(13,15,20,0.92)",
      backdropFilter: "blur(12px)",
    }}>
      <div className="container mx-auto px-6" style={{ maxWidth: 1100 }}>
        <div className="flex items-center justify-between" style={{ height: 60 }}>

          {/* Logo */}
          <Link href="/" style={{
            fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700,
            color: "var(--text)", textDecoration: "none", letterSpacing: "-0.02em",
          }}>
            1<span style={{ color: "var(--green)" }}>Key</span>Core
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 400,
                  color: "var(--text-2)", textDecoration: "none", letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
              >
                {label}
              </Link>
            ))}
            {!isLoggedIn && (
            <Link href="/login" style={{
              fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500,
              color: "var(--text-2)", textDecoration: "none", letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
            >
              Sign in
            </Link>
          )}

            <Link 
            href={isLoggedIn ? "/dashboard" : "/signup"}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
              background: "var(--green)", color: "#0d0f14",
              padding: "8px 18px", borderRadius: "var(--radius)",
              textDecoration: "none", letterSpacing: "0.03em",
              transition: "opacity 0.2s, transform 0.15s", display: "inline-block",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", padding: 4 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen
                ? <><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></>
                : <><line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="17" y2="14"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="flex md:hidden" style={{
          flexDirection: "column",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-2)",
          padding: "12px 24px 20px",
          gap: 4,
        }}>
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-2)",
                textDecoration: "none", padding: "10px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {label}
            </Link>
          ))}
          {!isLoggedIn && (
          <Link href="/login" onClick={() => setMobileOpen(false)} style={{
            fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-2)",
            textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--border)",
          }}>
            Sign in
          </Link>
            )}

          <Link 
          href={isLoggedIn ? "/dashboard" : "/signup"}
          onClick={() => setMobileOpen(false)} style={{
            display: "inline-block", marginTop: 12,
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600,
            background: "var(--green)", color: "#0d0f14",
            padding: "11px 20px", borderRadius: "var(--radius)",
            textDecoration: "none", textAlign: "center",
          }}>
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
          </Link>
        </div>
      )}
    </nav>
  );
}
