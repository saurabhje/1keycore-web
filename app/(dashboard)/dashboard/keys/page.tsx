"use client";
import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";

const PROVIDERS = [
  { value: "openai",    label: "OpenAI",     hint: "sk-..." },
  { value: "anthropic", label: "Anthropic",  hint: "sk-ant-..." },
  { value: "gemini",    label: "Gemini",     hint: "AIza..." },
  { value: "groq",      label: "Groq",       hint: "gsk_..." },
  { value: "mistral",   label: "Mistral",    hint: "..." },
  { value: "cohere",    label: "Cohere",     hint: "..." },
];

interface SavedKey {
  id: string;
  provider: string;
  masked: string;
  addedAt: string;
}

// Mock existing keys — replace with real fetch from GET /keys
const MOCK_KEYS: SavedKey[] = [
  { id: "key_01", provider: "openai",    masked: "sk-...a3f9", addedAt: "2025-04-01" },
  { id: "key_02", provider: "anthropic", masked: "sk-ant-...c7d2", addedAt: "2025-04-02" },
];

type SubmitState = "idle" | "loading" | "success" | "error";

export default function KeysPage() {
  const [provider,    setProvider]    = useState("openai");
  const [rawKey,      setRawKey]      = useState("");
  const [keyFocused,  setKeyFocused]  = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg,    setErrorMsg]    = useState("");
  const [keys,        setKeys]        = useState<SavedKey[]>(MOCK_KEYS);
  const [revoking,    setRevoking]    = useState<string | null>(null);
  const [showForm,    setShowForm]    = useState(false);

  const selectedProvider = PROVIDERS.find(p => p.value === provider)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rawKey.trim()) return;
    setSubmitState("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ provider, key: rawKey }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.detail ?? "Failed to save key");
        setSubmitState("error");
        return;
      }

      const saved: SavedKey = await res.json();
      setKeys(prev => [saved, ...prev]);
      setRawKey("");
      setSubmitState("success");
      setShowForm(false);
      setTimeout(() => setSubmitState("idle"), 3000);
    } catch {
      setErrorMsg("Network error — check your connection");
      setSubmitState("error");
    }
  }

  async function handleRevoke(id: string) {
    setRevoking(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setKeys(prev => prev.filter(k => k.id !== id));
    } catch {
      // silent fail for now
    } finally {
      setRevoking(null);
    }
  }

  const inputBorder = (focused: boolean, err: boolean) =>
    err ? "rgba(248,113,113,0.5)" : focused ? "rgba(184,245,66,0.4)" : "var(--border)";

  return (
    <div>
      <PageHeader
        label="// api keys"
        title="Provider Keys"
        description="Your keys are AES-256 encrypted before storage and never appear in logs or responses."
        action={
          <button
            onClick={() => setShowForm(o => !o)}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
              background: showForm ? "var(--bg-3)" : "var(--green)",
              color: showForm ? "var(--text-2)" : "#0a0c10",
              border: showForm ? "1px solid var(--border)" : "none",
              borderRadius: "var(--radius)",
              padding: "9px 18px", cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "all 0.18s",
            }}
          >
            {showForm ? "Cancel" : "+ Add key"}
          </button>
        }
      />

      <div style={{ padding: "28px 36px" }}>

        {/* ── Add key form ── */}
        {showForm && (
          <div style={{
            background: "var(--bg-2)",
            border: "1px solid rgba(184,245,66,0.2)",
            borderRadius: "var(--radius)",
            padding: "24px",
            marginBottom: 24,
          }}>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
              color: "var(--green)", letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: 20,
            }}>
              // new key
            </p>

            {/* Security notice */}
            <div style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              background: "var(--bg-3)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "12px 14px", marginBottom: 20,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="7" cy="7" r="6"/>
                <line x1="7" y1="5" x2="7" y2="7.5"/><circle cx="7" cy="9.5" r="0.5" fill="var(--text-3)" stroke="none"/>
              </svg>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", lineHeight: 1.75 }}>
                Key is sent over TLS, encrypted with AES-256 Fernet, and stored as ciphertext. We never log raw key values.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Provider select */}
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: "block", fontFamily: "var(--font-mono)", fontSize: 12,
                  fontWeight: 500, color: "var(--text-2)", letterSpacing: "0.06em",
                  textTransform: "uppercase", marginBottom: 7,
                }}>
                  Provider
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {PROVIDERS.map(p => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setProvider(p.value)}
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                          padding: "6px 14px", borderRadius: "var(--radius)", cursor: "pointer",
                          border: provider === p.value
                            ? "1px solid rgba(184,245,66,0.35)"
                            : "1px solid var(--border)",
                          background: provider === p.value ? "var(--green-dim)" : "var(--bg-3)",
                          color: provider === p.value ? "var(--green)" : "var(--text-2)",
                          transition: "all 0.15s",
                        }}
                      >
                        {p.label}
                      </button>
                  ))}
                </div>
              </div>

              {/* Key input */}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="api-key" style={{
                  display: "block", fontFamily: "var(--font-mono)", fontSize: 12,
                  fontWeight: 500, color: "var(--text-2)", letterSpacing: "0.06em",
                  textTransform: "uppercase", marginBottom: 7,
                }}>
                  API Key
                </label>
                <input
                  id="api-key"
                  type="password"
                  placeholder={selectedProvider.hint}
                  value={rawKey}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={e => setRawKey(e.target.value)}
                  onFocus={() => setKeyFocused(true)}
                  onBlur={() => setKeyFocused(false)}
                  style={{
                    width: "100%", fontFamily: "var(--font-mono)", fontSize: 13,
                    color: "var(--text)", background: "var(--bg-3)",
                    border: `1px solid ${inputBorder(keyFocused, submitState === "error")}`,
                    borderRadius: "var(--radius)", padding: "11px 14px",
                    outline: "none", transition: "border-color 0.18s",
                    letterSpacing: "0.04em",
                  }}
                />
                {submitState === "error" && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#f87171", marginTop: 5 }}>
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitState === "loading" || !rawKey.trim()}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700,
                  background: !rawKey.trim() ? "rgba(184,245,66,0.3)" : "var(--green)",
                  color: "#0a0c10", border: "none",
                  borderRadius: "var(--radius)", padding: "11px 24px",
                  cursor: !rawKey.trim() ? "not-allowed" : "pointer",
                  letterSpacing: "0.02em", transition: "opacity 0.18s",
                  opacity: submitState === "loading" ? 0.7 : 1,
                }}
              >
                {submitState === "loading" ? "Encrypting & saving..." : "Save key"}
              </button>
            </form>
          </div>
        )}

        {/* ── Success toast ── */}
        {submitState === "success" && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-mono)", fontSize: 12,
            color: "var(--green)", background: "var(--green-dim)",
            border: "1px solid rgba(184,245,66,0.2)",
            borderRadius: "var(--radius)", padding: "10px 16px", marginBottom: 20,
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1.5,6.5 5,10 11.5,3"/>
            </svg>
            Key encrypted and saved successfully.
          </div>
        )}

        {/* ── Key list ── */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)",
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
        }}>
          saved keys · {keys.length}
        </div>

        {keys.length === 0 ? (
          <div style={{
            background: "var(--bg-2)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "40px 24px",
            textAlign: "center",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-2)", marginBottom: 12 }}>
              No keys added yet
            </div>
            <button
              onClick={() => setShowForm(true)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                color: "var(--green)", background: "var(--green-dim)",
                border: "1px solid rgba(184,245,66,0.2)",
                borderRadius: "var(--radius)", padding: "8px 18px", cursor: "pointer",
              }}
            >
              Add your first key
            </button>
          </div>
        ) : (
          <div style={{
            border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            {/* Table header */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
              padding: "10px 20px",
              background: "var(--bg-3)",
              borderBottom: "1px solid var(--border)",
            }}>
              {["Provider", "Key", "Added", ""].map(h => (
                <div key={h} style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500,
                  color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {h}
                </div>
              ))}
            </div>

            {keys.map((key, i) => {
              const provLabel = PROVIDERS.find(p => p.value === key.provider)?.label ?? key.provider;
              return (
                <div
                  key={key.id}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
                    alignItems: "center",
                    padding: "14px 20px",
                    background: i % 2 === 0 ? "var(--bg-2)" : "var(--bg)",
                    borderBottom: i < keys.length - 1 ? "1px solid var(--border)" : "none",
                    transition: "background 0.15s",
                  }}
                >
                  {/* Provider badge */}
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                    color: "var(--teal)", background: "var(--teal-dim)",
                    border: "1px solid rgba(78,205,196,0.18)",
                    padding: "2px 8px", borderRadius: "var(--radius)",
                    display: "inline-block",
                  }}>
                    {provLabel}
                  </span>

                  {/* Masked key */}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", letterSpacing: "0.04em" }}>
                    {key.masked}
                  </span>

                  {/* Added date */}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
                    {key.addedAt}
                  </span>

                  {/* Revoke */}
                  <button
                    onClick={() => handleRevoke(key.id)}
                    disabled={revoking === key.id}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                      color: revoking === key.id ? "var(--text-3)" : "#f87171",
                      background: "none", border: "1px solid transparent",
                      borderRadius: "var(--radius)", padding: "4px 10px",
                      cursor: revoking === key.id ? "wait" : "pointer",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)"; e.currentTarget.style.background = "rgba(248,113,113,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "none"; }}
                  >
                    {revoking === key.id ? "..." : "Revoke"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
