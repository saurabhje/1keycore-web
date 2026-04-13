"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: "block",
      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
      color: "var(--text-2)", letterSpacing: "0.06em",
      textTransform: "uppercase", marginBottom: 7,
    }}>
      {children}
    </label>
  );
}

function Input({
  id, value, onChange, placeholder, type = "text", maxLength,
}: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id} type={type} value={value} placeholder={placeholder}
      maxLength={maxLength}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", fontFamily: "var(--font-mono)", fontSize: 13,
        color: "var(--text)", background: "var(--bg-3)",
        border: `1px solid ${focused ? "rgba(185, 245, 66, 0.53)" : "var(--border)"}`,
        borderRadius: "var(--radius)", padding: "11px 14px",
        outline: "none", transition: "border-color 0.18s",
      }}
    />
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#f87171", marginTop: 5 }}>
      {msg}
    </p>
  );
}

function PrimaryBtn({
  children, loading, disabled, onClick, type = "submit",
}: {
  children: React.ReactNode; loading?: boolean; disabled?: boolean;
  onClick?: () => void; type?: "submit" | "button";
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type} onClick={onClick}
      disabled={loading || disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", fontFamily: "var(--font-mono)", fontSize: 13,
        fontWeight: 700, letterSpacing: "0.03em",
        background: loading || disabled ? "rgba(184,245,66,0.45)" : "var(--green)",
        color: "#0d0f14", border: "none",
        borderRadius: "var(--radius)", padding: "12px",
        cursor: loading || disabled ? "not-allowed" : "pointer",
        opacity: hov && !loading && !disabled ? 0.88 : 1,
        transform: hov && !loading && !disabled ? "translateY(-1px)" : "translateY(0)",
        transition: "opacity 0.18s, transform 0.15s",
        marginTop: 8,
      }}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

function ErrorBanner({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 12, color: "#f87171",
      background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
      borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: 20,
    }}>
      {msg}
    </div>
  );
}

function CreateOrg() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErr, setFieldErr] = useState<{ name?: string; slug?: string }>({});

  function toSlug(v: string) {
    return v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 32);
  }

  function handleNameChange(v: string) {
    setName(v);
    if (!slugManual) setSlug(toSlug(v));
  }

  function handleSlugChange(v: string) {
    setSlugManual(true);
    setSlug(toSlug(v));
  }

  function validate() {
    const e: { name?: string; slug?: string } = {};
    if (!name.trim()) e.name = "Organisation name is required";
    if (!slug) e.slug = "Slug is required";
    else if (slug.length < 2) e.slug = "Slug must be at least 2 characters";
    setFieldErr(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: name.trim(), slug }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d?.detail ?? "Failed to create organisation");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Network error — check your connection");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ErrorBanner msg={error} />

      <div style={{ marginBottom: 16 }}>
        <Label><label htmlFor="org-name">Organisation name</label></Label>
        <Input
          id="org-name" value={name} onChange={handleNameChange}
          placeholder="Acme Corp"
        />
        <FieldError msg={fieldErr.name} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <Label><label htmlFor="org-slug">Slug</label></Label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: 14, top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-mono)", fontSize: 12,
            color: "var(--text-3)", pointerEvents: "none",
            userSelect: "none",
          }}>
            1keycore.app/
          </span>
          <input
            id="org-slug" type="text" value={slug}
            onChange={e => handleSlugChange(e.target.value)}
            maxLength={32}
            style={{
              width: "100%", fontFamily: "var(--font-mono)", fontSize: 13,
              color: "var(--text)", background: "var(--bg-3)",
              border: `1px solid ${fieldErr.slug ? "rgba(248,113,113,0.5)" : "var(--border)"}`,
              borderRadius: "var(--radius)", padding: "11px 14px 11px 128px",
              outline: "none", transition: "border-color 0.18s",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,245,66,0.4)")}
            onBlur={e  => (e.currentTarget.style.borderColor = fieldErr.slug ? "rgba(248,113,113,0.5)" : "var(--border)")}
          />
        </div>
        <FieldError msg={fieldErr.slug} />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", marginTop: 5 }}>
          Lowercase letters, numbers, and hyphens only.
        </p>
      </div>

      <PrimaryBtn loading={loading}>Create organisation</PrimaryBtn>
    </form>
  );
}

function JoinOrg() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErr, setFieldErr] = useState("");

  function validate() {
    if (!code.trim()) { setFieldErr("Invite code is required"); return false; }
    if (code.trim().length < 6) { setFieldErr("That doesn't look like a valid code"); return false; }
    setFieldErr("");
    return true;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ invite_code: code.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d?.detail ?? "Invalid or expired invite code");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Network error — check your connection");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ErrorBanner msg={error} />

      <div style={{ marginBottom: 24 }}>
        <Label><label htmlFor="invite-code">Invite code</label></Label>
        <input
          id="invite-code" type="text" value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="XXXX-XXXX-XXXX"
          maxLength={20}
          style={{
            width: "100%", fontFamily: "var(--font-mono)", fontSize: 15,
            letterSpacing: "0.14em", color: "var(--text)",
            background: "var(--bg-3)",
            border: `1px solid ${fieldErr ? "rgba(248,113,113,0.5)" : "var(--border)"}`,
            borderRadius: "var(--radius)", padding: "13px 14px",
            outline: "none", transition: "border-color 0.18s",
            textAlign: "center",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,245,66,0.4)")}
          onBlur={e  => (e.currentTarget.style.borderColor = fieldErr ? "rgba(248,113,113,0.5)" : "var(--border)")}
        />
        <FieldError msg={fieldErr} />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", marginTop: 5, textAlign: "center" }}>
          Ask your organisation admin for an invite code.
        </p>
      </div>

      <PrimaryBtn loading={loading} disabled={code.trim().length < 6}>
        Join organisation
      </PrimaryBtn>
    </form>
  );
}


type Tab = "create" | "join";

export default function OnboardingPage() {
  const [tab, setTab] = useState<Tab>("create");

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700,
        color: "var(--text)", textDecoration: "none",
        letterSpacing: "-0.02em", marginBottom: 12, display: "block",
      }}>
        1<span style={{ color: "var(--green)" }}>Key</span>Core
      </Link>

      {/* Step indicator */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)",
        letterSpacing: "0.08em", marginBottom: 32,
      }}>
        step 2 of 2 — set up your workspace
      </div>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: 440,
        background: "var(--bg-2)", border: "1px solid var(--border)",
        borderRadius: 8, overflow: "hidden",
      }}>

        {/* Tab switcher */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}>
          {([
            { id: "create" as Tab, label: "Create org" },
            { id: "join"   as Tab, label: "Join org"   },
          ] as { id: Tab; label: string }[]).map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                color: tab === t.id ? "var(--green)" : "var(--text-3)",
                background: tab === t.id ? "var(--bg-2)" : "transparent",
                border: "none",
                borderBottom: tab === t.id
                  ? "2px solid var(--green)"
                  : "2px solid transparent",
                padding: "14px 0",
                cursor: "pointer", transition: "color 0.15s, background 0.15s",
                letterSpacing: "0.04em",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "32px 32px 28px" }}>
          {tab === "create" ? (
            <>
              <h1 style={{
                fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700,
                color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6,
              }}>
                Create your organisation
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28 }}>
                This will be your team&apos;s workspace. You can invite
                members and manage their access after setup.
              </p>
              <CreateOrg />
            </>
          ) : (
            <>
              <h1 style={{
                fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700,
                color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6,
              }}>
                Join an organisation
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28 }}>
                Enter the invite code your admin sent you.
                You&apos;ll be added to their workspace immediately.
              </p>
              <JoinOrg />
            </>
          )}
        </div>

        <div style={{
          padding: "14px 32px 20px",
          borderTop: "1px solid var(--border)",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--text-3)", textAlign: "center",
          }}>
            You can create or join more organisations later from settings.
          </p>
        </div>
      </div>

      {/* Escape hatch */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--text-3)", marginTop: 20, textAlign: "center",
      }}>
        Something wrong?{" "}
        <Link href="/login" style={{ color: "var(--text-2)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
        >
          Sign in with a different account
        </Link>
      </p>
    </div>
  );
}