"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthInput, AuthButton } from "@/components/AuthInput";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function LoginPageContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [loading,  setLoading]  = useState(false);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!email)                            e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))  e.email    = "Enter a valid email";
    if (!password)                         e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ general: data?.detail ?? "Invalid email or password" });
        return;
      }
      window.location.href = "/";
    } catch {
      setErrors({ general: "Network error — check your connection" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700,
          color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6,
        }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
          Sign in to your workspace
        </p>
      </div>

      {errors.general && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: "#f87171",
          background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
          borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: 20,
        }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="email" label="Email" type="email"
          placeholder="you@company.com" value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email} autoComplete="email"
        />
        <AuthInput
          id="password" label="Password" type="password"
          placeholder="••••••••••" value={password}
          onChange={e => setPassword(e.target.value)}
          error={errors.password} autoComplete="current-password"
        />

        <div style={{ textAlign: "right", marginTop: -8, marginBottom: 4 }}>
          <Link href="#" style={{
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)",
            textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton loading={loading}>Sign in</AuthButton>
      </form>

      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)",
        textAlign: "center", marginTop: 24,
      }}>
        No account?{" "}
        <Link href="/signup" style={{
          color: "var(--green)", textDecoration: "none", fontWeight: 600, transition: "opacity 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Create one
        </Link>
      </p>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
