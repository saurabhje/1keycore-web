export default function CodeBlock() {
  const s = {
    method: { color: "#c4ff45" } as React.CSSProperties,
    path:   { color: "var(--text)" } as React.CSSProperties,
    key:    { color: "#82cfff" } as React.CSSProperties,
    str:    { color: "#a8e6cf" } as React.CSSProperties,
    num:    { color: "#f08d49" } as React.CSSProperties,
    dim:    { color: "var(--text-3)" } as React.CSSProperties,
    arrow:  { color: "#4ecdc4", fontWeight: 600 } as React.CSSProperties,
    ok:     { color: "#b8f542" } as React.CSSProperties,
  };

  return (
    <div style={{ background:"var(--bg-3)", border:"1px solid var(--border)", borderRadius:"var(--radius)", overflow:"hidden", fontFamily:"var(--font-mono)", fontSize:12.5, lineHeight:1.7 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderBottom:"1px solid var(--border)", background:"var(--bg-2)" }}>
        <span style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57", display:"inline-block" }} />
        <span style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e", display:"inline-block" }} />
        <span style={{ width:10, height:10, borderRadius:"50%", background:"#28c840", display:"inline-block" }} />
        <span style={{ fontSize:11, color:"var(--text-3)", marginLeft:6, letterSpacing:"0.04em" }}>gateway · request</span>
      </div>
      <div style={{ padding:"20px", overflowX:"auto" }}>
        <pre style={{ margin:0 }}><span style={s.method}>POST</span>{" "}<span style={s.path}>/chat</span>{"\n"}<span style={s.key}>Authorization:</span>{" "}<span style={s.str}>Bearer &lt;jwt&gt;</span>{"\n\n"}<span style={s.dim}>{"{"}</span>{"\n"}{"  "}<span style={s.key}>&quot;model&quot;</span><span style={s.dim}>:</span>{"   "}<span style={s.str}>&quot;gpt-4o&quot;</span><span style={s.dim}>,</span>{"\n"}{"  "}<span style={s.key}>&quot;message&quot;</span><span style={s.dim}>:</span>{" "}<span style={s.str}>&quot;summarize this contract&quot;</span>{"\n"}<span style={s.dim}>{"}"}</span>{"\n\n"}<span style={s.arrow}>{"→"}</span>{" "}<span style={s.ok}>200 OK</span>{"\n"}<span style={s.dim}>{"{"}</span>{"\n"}{"  "}<span style={s.key}>&quot;response&quot;</span><span style={s.dim}>:</span>{" "}<span style={s.str}>&quot;The contract outlines...&quot;</span><span style={s.dim}>,</span>{"\n"}{"  "}<span style={s.key}>&quot;model&quot;</span><span style={s.dim}>:</span>{"    "}<span style={s.str}>&quot;gpt-4o&quot;</span><span style={s.dim}>,</span>{"\n"}{"  "}<span style={s.key}>&quot;tokens&quot;</span><span style={s.dim}>:</span>{"   "}<span style={s.num}>312</span><span style={s.dim}>,</span>{"\n"}{"  "}<span style={s.key}>&quot;latency_ms&quot;</span><span style={s.dim}>:</span>{" "}<span style={s.num}>38</span>{"\n"}<span style={s.dim}>{"}"}</span></pre>
      </div>
    </div>
  );
}
