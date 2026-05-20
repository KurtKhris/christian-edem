'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  subLabel?: string;
}

export default function MetricCard({ label, value, icon, gradient, glowColor, subLabel }: MetricCardProps) {
  return (
    <div className="dash-metric-card" style={{ '--metric-glow': glowColor } as React.CSSProperties}>
      <div className="dash-metric-bg-icon">{icon}</div>
      <div className="dash-metric-icon" style={{ background: gradient }}>{icon}</div>
      <div className="dash-metric-value">{value}</div>
      <div className="dash-metric-label">{label}</div>
      {subLabel && <div className="dash-metric-sub">{subLabel}</div>}
      <div className="dash-metric-bar" style={{ background: gradient }} />
    </div>
  );
}
