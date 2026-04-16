"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InviteCard } from "../inviteCard";

const NAV = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1" /><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" /><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/keys",
    label: "API Keys",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="7.5" r="3.5" />
        <line x1="8.5" y1="7.5" x2="14" y2="7.5" />
        <line x1="12" y1="7.5" x2="12" y2="9.5" />
        <line x1="10" y1="7.5" x2="10" y2="9" />
      </svg>
    ),
  },
  {
    href: "/dashboard/usage",
    label: "Usage",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="1" y1="14" x2="14" y2="14" />
        <rect x="2" y="8" width="3" height="6" rx="1" />
        <rect x="6" y="4.5" width="3" height="9.5" rx="1" />
        <rect x="10" y="1.5" width="3" height="12.5" rx="1" />
      </svg>
    ),
  },
  {
    label: "Invite members",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor"
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="4" r="2.5" />
        <circle cx="11" cy="4" r="2.5" />
        <path d="M1 13C1 11 2.5 10 5 10" />
        <path d="M11 10C13 10 14 11 14 13" />
        <line x1="8" y1="10" x2="8" y2="13" />
        <line x1="6.5" y1="11.5" x2="9.5" y2="11.5" />
      </svg>
    )
  },
  {
    href: "/docs",
    label: "Docs",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="1" width="11" height="13" rx="1.5" />
        <line x1="5" y1="5" x2="10" y2="5" />
        <line x1="5" y1="7.5" x2="10" y2="7.5" />
        <line x1="5" y1="10" x2="8" y2="10" />
      </svg>
    ),
  },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  // Inside DashboardShell component
  useEffect(() => {
    if (showInvite) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is restored if the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showInvite]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220,
        flexShrink: 0,
        background: "var(--bg-2)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
        className="hidden md:flex"
      >
        {/* Logo */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid var(--border)",
        }}>
          <Link href="/" style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            fontWeight: 700,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}>
            1<span style={{ color: "var(--green)" }}>Key</span>Core
          </Link>
          <div style={{
            marginTop: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 500,
            color: "var(--green)",
            background: "var(--green-dim)",
            border: "1px solid rgba(184,245,66,0.2)",
            padding: "2px 7px",
            borderRadius: "var(--radius)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            Beta
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {NAV.map(item => {
            const isInvite = item.label === "Invite members";

            const active = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : item.href && pathname.startsWith(item.href);
            if (isInvite) {
              return (
                <button
                  key="invite"
                  onClick={() => setShowInvite(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    marginBottom: 2,
                    borderRadius: "var(--radius)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--text-2)",
                    background: "transparent",
                    border: "1px solid transparent",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.background = "var(--bg-3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--text-2)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ color: "var(--text-3)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              )
            };

            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  marginBottom: 2,
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--green)" : "var(--text-2)",
                  background: active ? "var(--green-dim)" : "transparent",
                  border: active ? "1px solid rgba(184,245,66,0.15)" : "1px solid transparent",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--bg-3)"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.background = "transparent"; } }}
              >
                <span style={{ color: active ? "var(--green)" : "var(--text-3)", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user strip */}
        <div style={{
          padding: "14px 16px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 4,
            background: "var(--green-dim)",
            border: "1px solid rgba(184,245,66,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--green)",
            flexShrink: 0,
          }}>
            AC
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>acme-corp</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>admin</div>
          </div>
          <button
            title="Sign out"
            onClick={async () => {
              try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                  method: "POST",
                  credentials: "include"
                });
              } catch (e) {
                console.error("Logout failed", e);
              } finally {
                window.location.href = "/login";
              }
            }}
            style={{ color: "var(--text-3)", display: "flex", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-2)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
              <polyline points="10 10 13 7 10 4" />
              <line x1="13" y1="7" x2="5" y2="7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="flex md:hidden" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 56, background: "rgba(13,15,20,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
      }}>
        <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--text)", textDecoration: "none" }}>
          1<span style={{ color: "var(--green)" }}>Key</span>Core
        </Link>
        <button onClick={() => setMobileOpen(o => !o)} style={{ background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", padding: 4 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen ? <><line x1="3" y1="3" x2="15" y2="15" /><line x1="15" y1="3" x2="3" y2="15" /></> : <><line x1="2" y1="5" x2="16" y2="5" /><line x1="2" y1="9" x2="16" y2="9" /><line x1="2" y1="13" x2="16" y2="13" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="flex md:hidden" style={{
          position: "fixed", top: 56, left: 0, right: 0, bottom: 0, zIndex: 40,
          background: "var(--bg-2)", borderTop: "1px solid var(--border)",
          flexDirection: "column", padding: "12px 10px",
        }}>
          {NAV.map(item => {
            const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href || "#");
            return (
              <Link key={item.label} href={item.href || "#"} onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px", marginBottom: 4, borderRadius: "var(--radius)",
                  textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--green)" : "var(--text-2)",
                  background: active ? "var(--green-dim)" : "transparent",
                }}>
                <span style={{ color: active ? "var(--green)" : "var(--text-3)" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* ── Main content ── */}
      <main style={{ flex: 1, minWidth: 0 }} className="pt-14 md:pt-0">
        {children}
      </main>
      {showInvite && (
        <div
          onClick={() => {
            setShowInvite(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InviteCard onClose={() => setShowInvite(false)} />
        </div>
      )}
    </div>
  );
}
