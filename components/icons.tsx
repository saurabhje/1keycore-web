type IconProps = { size?: number; color?: string };

export function IconLock({ size = 20, color = "var(--text-2)" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="12" height="9" rx="2" />
      <path d="M7 9V6a3 3 0 1 1 6 0v3" />
    </svg>
  );
}

export function IconBuilding({ size = 20, color = "var(--text-2)" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="14" rx="1" />
      <rect x="10" y="7" width="7" height="10" rx="1" />
      <line x1="6" y1="7" x2="7" y2="7" />
      <line x1="6" y1="10" x2="7" y2="10" />
      <line x1="13" y1="10" x2="14" y2="10" />
      <line x1="13" y1="13" x2="14" y2="13" />
    </svg>
  );
}

export function IconGauge({ size = 20, color = "var(--text-2)" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 13.5A7 7 0 1 1 16.5 13.5" />
      <line x1="10" y1="10" x2="13.5" y2="6.5" />
      <circle cx="10" cy="10" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

export function IconRoute({ size = 20, color = "var(--text-2)" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4.5" cy="5.5" r="2" />
      <circle cx="15.5" cy="14.5" r="2" />
      <path d="M4.5 7.5v2a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4" />
      <path d="M13.5 14.5h4" />
    </svg>
  );
}

export function IconDatabase({ size = 20, color = "var(--text-2)" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="10" cy="5.5" rx="6.5" ry="2.5" />
      <path d="M3.5 5.5v4c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-4" />
      <path d="M3.5 9.5v4c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-4" />
    </svg>
  );
}

export function IconBarChart({ size = 20, color = "var(--text-2)" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="17" x2="17" y2="17" />
      <rect x="4" y="10" width="3" height="7" rx="1" />
      <rect x="8.5" y="6" width="3" height="11" rx="1" />
      <rect x="13" y="3" width="3" height="14" rx="1" />
    </svg>
  );
}
