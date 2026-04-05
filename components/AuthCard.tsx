import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 16,
          fontWeight: 700,
          color: "var(--text)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
          marginBottom: 32,
          display: "block",
        }}
      >
        1<span style={{ color: "var(--green)" }}>Key</span>Core
      </Link>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--bg-2)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "36px 32px",
        }}
      >
        {children}
      </div>

      {/* Footer note */}
      <p
        style={{
          marginTop: 24,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-2)",
          textAlign: "center",
        }}
      >
        By continuing, you agree to our{" "}
        <Link
          href="#"
          style={{ color: "var(--text-2)", textDecoration: "none" }}
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          style={{ color: "var(--text-2)", textDecoration: "none" }}
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
