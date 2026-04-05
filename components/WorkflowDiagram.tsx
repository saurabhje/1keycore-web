export default function WorkflowDiagram() {
  return (
    <div style={{
      background: "var(--bg-2)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "32px 24px",
      position: "relative",
    }}>
      {/* header label */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
        color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase",
        marginBottom: 28,
      }}>
        // gateway · flow
      </div>

      <svg
        width="100%"
        viewBox="0 0 340 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" stroke="#b8f542" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <marker id="arrowDim" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" stroke="#555870" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <marker id="arrowTeal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" stroke="#4ecdc4" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* ── Step 1: Tenant registers key ── */}
        <g>
          {/* node box */}
          <rect x="20" y="0" width="300" height="72" rx="6"
            fill="#111318" stroke="rgba(184,245,66,0.25)" strokeWidth="1"/>
          {/* step pill */}
          <rect x="32" y="12" width="58" height="18" rx="3"
            fill="rgba(184,245,66,0.1)" stroke="rgba(184,245,66,0.2)" strokeWidth="0.8"/>
          <text x="61" y="24.5" textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600"
            fill="#b8f542" letterSpacing="0.08em">STEP_01</text>
          {/* title */}
          <text x="32" y="48"
            fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="600"
            fill="#e8eaf0">Register API key</text>
          {/* sub */}
          <text x="32" y="63"
            fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="400"
            fill="#555870">AES-256 encrypted · stored per tenant</text>
          {/* key icon — right side */}
          <g transform="translate(290, 36)">
            <circle cx="0" cy="0" r="14" fill="rgba(184,245,66,0.07)" stroke="rgba(184,245,66,0.15)" strokeWidth="0.8"/>
            <circle cx="-3" cy="-1" r="4" stroke="#b8f542" strokeWidth="1.2"/>
            <line x1="1" y1="-1" x2="6" y2="-1" stroke="#b8f542" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="5" y1="-1" x2="5" y2="2" stroke="#b8f542" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="3.5" y1="-1" x2="3.5" y2="1.5" stroke="#b8f542" strokeWidth="1.2" strokeLinecap="round"/>
          </g>
        </g>

        {/* ── Arrow 1 → 2 ── */}
        <line x1="170" y1="72" x2="170" y2="116"
          stroke="#b8f542" strokeWidth="1" strokeDasharray="3 3"
          markerEnd="url(#arrowGreen)"/>
        {/* side label */}
        <text x="178" y="99"
          fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#555870">encrypted</text>

        {/* ── Step 2: 1KeyCore Gateway ── (center, highlighted) */}
        <g>
          <rect x="20" y="116" width="300" height="88" rx="6"
            fill="#0d0f14" stroke="#b8f542" strokeWidth="1.2"/>
          {/* green top bar accent */}
          <rect x="20" y="116" width="300" height="3" rx="0"
            fill="#b8f542" style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}/>
          {/* logo text */}
          <text x="32" y="144"
            fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="700"
            fill="#e8eaf0">1<tspan fill="#b8f542">Key</tspan>Core</text>
          <text x="32" y="160"
            fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#8b8fa8">
            Gateway · Router · Cache · Limiter
          </text>
          {/* mini provider pills */}
          {["openai","anthropic","gemini","groq"].map((p, i) => (
            <g key={p} transform={`translate(${32 + i * 70}, 172)`}>
              <rect width="62" height="18" rx="3"
                fill="rgba(78,205,196,0.08)" stroke="rgba(78,205,196,0.2)" strokeWidth="0.8"/>
              <text x="31" y="12.5" textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#4ecdc4">{p}</text>
            </g>
          ))}
        </g>

        {/* ── Arrow 2 → 3 ── */}
        <line x1="170" y1="204" x2="170" y2="248"
          stroke="#b8f542" strokeWidth="1" strokeDasharray="3 3"
          markerEnd="url(#arrowGreen)"/>
        <text x="178" y="231"
          fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#555870">JWT scoped</text>

        {/* ── Step 3: Employee gets access ── */}
        <g>
          <rect x="20" y="248" width="300" height="72" rx="6"
            fill="#111318" stroke="rgba(184,245,66,0.25)" strokeWidth="1"/>
          <rect x="32" y="260" width="58" height="18" rx="3"
            fill="rgba(184,245,66,0.1)" stroke="rgba(184,245,66,0.2)" strokeWidth="0.8"/>
          <text x="61" y="272.5" textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600"
            fill="#b8f542" letterSpacing="0.08em">STEP_03</text>
          <text x="32" y="296"
            fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="600"
            fill="#e8eaf0">Employee sends request</text>
          <text x="32" y="311"
            fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#555870">Rate-limited · logged · cached</text>
          {/* user icon */}
          <g transform="translate(290, 284)">
            <circle cx="0" cy="0" r="14" fill="rgba(184,245,66,0.07)" stroke="rgba(184,245,66,0.15)" strokeWidth="0.8"/>
            <circle cx="0" cy="-3" r="4" stroke="#b8f542" strokeWidth="1.2"/>
            <path d="M-6 8 C-6 3 6 3 6 8" stroke="#b8f542" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </g>
        </g>

        {/* ── Response arrow back up (right side) ── */}
        {/* vertical return line */}
        <line x1="326" y1="248" x2="326" y2="116"
          stroke="#555870" strokeWidth="0.8" strokeDasharray="3 3"/>
        {/* small caps label */}
        <text x="333" y="190"
          fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#555870"
          transform="rotate(90, 333, 190)">200 OK · response</text>
        {/* top arrowhead going back to tenant */}
        <line x1="326" y1="116" x2="326" y2="90"
          stroke="#555870" strokeWidth="0.8" strokeDasharray="3 3"
          markerEnd="url(#arrowDim)"/>

        {/* ── Step 2 label (STEP_02 pill inside gateway already clear) ── */}
        {/* Step 2 pill overlay */}
        <rect x="32" y="120" width="58" height="18" rx="3"
          fill="rgba(184,245,66,0.1)" stroke="rgba(184,245,66,0.2)" strokeWidth="0.8"/>
        <text x="61" y="132.5" textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600"
          fill="#b8f542" letterSpacing="0.08em">STEP_02</text>
      </svg>

      {/* Bottom stat strip */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: "var(--border)",
        borderRadius: 6, overflow: "hidden",
        border: "1px solid var(--border)", marginTop: 24,
      }}>
        {[
          { v: "6",      l: "providers" },
          { v: "<50ms",  l: "overhead"  },
          { v: "AES-256",l: "encryption"},
        ].map(s => (
          <div key={s.l} style={{ background: "var(--bg)", padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "var(--green)", letterSpacing: "-0.02em" }}>{s.v}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
