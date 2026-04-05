"use client";

interface PageHeaderProps {
  label: string;   // monospace eyebrow, e.g. "// api keys"
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ label, title, description, action }: PageHeaderProps) {
  return (
    <div style={{
      padding: "36px 36px 28px",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap",
    }}>
      <div>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--green)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}>
          {label}
        </p>
        <h1 style={{
          fontFamily: "var(--font-mono)",
          fontSize: 22,
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          marginBottom: description ? 6 : 0,
        }}>
          {title}
        </h1>
        {description && (
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 480 }}>
            {description}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}
