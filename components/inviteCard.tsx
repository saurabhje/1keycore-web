"use client";
import { useState } from "react";

export function InviteCard({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    // Reset states before closing
    setCode("");
    setCopied(false);
    setError("");
    onClose();
  };

  const generateCode = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/invites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "single" }),
      });

      if (!res.ok) throw new Error("Failed to generate code");
      
      const data = await res.json();
      setCode(data.code);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "var(--bg-2)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        width: "100%",
        maxWidth: 420,
        padding: "28px 28px 24px",
        position: "relative",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* 1. Close Button */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute", top: 14, right: 14,
          background: "none", border: "none",
          color: "var(--text-3)", cursor: "pointer",
          padding: 4, display: "flex", transition: "color 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="3" x2="11" y2="11" /><line x1="11" y1="3" x2="3" y2="11" />
        </svg>
      </button>

      {/* 2. Eyebrow */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)",
        letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8
      }}>
        // invite
      </p>

      {/* 3. Heading */}
      <h2 style={{
        fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700,
        color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6
      }}>
        Invite a team member
      </h2>

      {/* 4. Description */}
      <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 24 }}>
        Share this code with anyone you want to add to your organisation. 
        Single use — expires after one person joins.
      </p>

      {/* 5. Generate / Code Area */}
      {!code ? (
        <button
          onClick={generateCode}
          disabled={loading}
          style={{
            width: "100%", background: "var(--green)", color: "#0d0f14",
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700,
            borderRadius: "var(--radius)", padding: "11px", border: "none",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Generating..." : "Generate invite code"}
        </button>
      ) : (
        <>
          <div style={{
            background: "var(--bg-3)", border: "1px solid rgba(184,245,66,0.3)",
            borderRadius: "var(--radius)", padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 10
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700,
              letterSpacing: "0.16em", color: "var(--green)", flex: 1
            }}>
              {code}
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: "var(--green)", color: "#0d0f14",
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                border: "none", borderRadius: 4, padding: "6px 14px", cursor: "pointer"
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)", marginTop: 8 }}>
            Code is single-use. Generate a new one for each person.
          </p>
        </>
      )}

      {/* Error Message */}
      {error && (
        <p style={{ fontSize: 11, color: "#f87171", fontFamily: "var(--font-mono)", marginTop: 8 }}>
          {error}
        </p>
      )}
    </div>
  );
}