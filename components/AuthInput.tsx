"use client";
import { useState, InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthInput({ label, error, id, ...props }: AuthInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 16 }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 500,
          color: error ? "#f87171" : "var(--text-2)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e)  => { setFocused(false); props.onBlur?.(e); }}
        style={{
          width: "100%",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--text)",
          background: "var(--bg-3)",
          border: `1px solid ${error ? "rgba(248,113,113,0.5)" : focused ? "rgba(184,245,66,0.4)" : "var(--border)"}`,
          borderRadius: "var(--radius)",
          padding: "11px 14px",
          outline: "none",
          transition: "border-color 0.18s",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      />
      {error && (
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "#f87171",
          marginTop: 5,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}

interface AuthButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}

export function AuthButton({ children, loading, type = "submit", onClick }: AuthButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.03em",
        background: loading ? "rgba(184,245,66,0.6)" : "var(--green)",
        color: "#0a0c10",
        border: "none",
        borderRadius: "var(--radius)",
        padding: "12px",
        cursor: loading ? "wait" : "pointer",
        opacity: hovered && !loading ? 0.88 : 1,
        transform: hovered && !loading ? "translateY(-1px)" : "translateY(0)",
        transition: "opacity 0.18s, transform 0.15s, background 0.18s",
        marginTop: 8,
      }}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "20px 0",
    }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--text-3)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}
