"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthInput, AuthButton, AuthDivider } from "@/components/AuthInput";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  general?: string;
}

const PASSWORD_RULES = [
  { label: "8+ characters",       test: (p: string) => p.length >= 8          },
  { label: "uppercase letter",    test: (p: string) => /[A-Z]/.test(p)        },
  { label: "number",              test: (p: string) => /[0-9]/.test(p)        },
];

export default function SignupPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [loading,  setLoading]  = useState(false);
  const [pwFocused, setPwFocused] = useState(false);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!name.trim())                          e.name     = "Name is required";
    if (!email)                                e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))      e.email    = "Enter a valid email";
    if (!password)                             e.password = "Password is required";
    else if (password.length < 8)              e.password = "At least 8 characters";
    if (confirm !== password)                  e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ general: data?.detail ?? "Registration failed — try again" });
        return;
      }

      router.push("/dashboard");
    } catch {
      setErrors({ general: "Network error — check your connection" });
    } finally {
      setLoading(false);
    }
  }

  const strength = PASSWORD_RULES.filter(r => r.test(password)).length;

  return (
    <AuthCard>
      {/* Heading */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "var(--font-mono)",
          fontSize: 20,
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          marginBottom: 6,
        }}>
          Create your account
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
          Get your team on the gateway in minutes
        </p>
      </div>

      {/* General error */}
      {errors.general && (
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "#f87171",
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.2)",
          borderRadius: "var(--radius)",
          padding: "10px 14px",
          marginBottom: 20,
        }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="name"
          label="Full name"
          type="text"
          placeholder="Ada Lovelace"
          value={name}
          onChange={e => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <AuthInput
          id="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          onFocus={() => setPwFocused(true)}
          onBlur={() => setPwFocused(false)}
        />

        {/* Password strength meter — shown while focused or has value */}
        {(pwFocused || password.length > 0) && (
          <div style={{ marginTop: -8, marginBottom: 16 }}>
            {/* Bars */}
            <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
              {PASSWORD_RULES.map((rule, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 2,
                    background: i < strength
                      ? strength === 1 ? "#f87171"
                        : strength === 2 ? "#f59e0b"
                        : "var(--green)"
                      : "var(--border)",
                    transition: "background 0.25s",
                  }}
                />
              ))}
            </div>
            {/* Rule hints */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {PASSWORD_RULES.map((rule, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: rule.test(password) ? "var(--green)" : "var(--text-3)",
                    transition: "color 0.2s",
                  }}
                >
                  {rule.test(password) ? "✓" : "·"} {rule.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <AuthInput
          id="confirm"
          label="Confirm password"
          type="password"
          placeholder="••••••••••"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <AuthButton loading={loading}>Create account</AuthButton>
      </form>

      <AuthDivider label="already have an account" />

      <Link
        href="/login"
        style={{
          display: "block",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--text-2)",
          textDecoration: "none",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "11px",
          transition: "border-color 0.18s, color 0.18s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          e.currentTarget.style.color = "var(--text)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-2)";
        }}
      >
        Sign in instead
      </Link>
    </AuthCard>
  );
}
