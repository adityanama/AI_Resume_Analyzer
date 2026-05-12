export const SENIORITY = {
  junior:  { label: 'Junior',    c: '#38bdf8', bg: 'rgba(56,189,248,0.12)',  b: 'rgba(56,189,248,0.3)' },
  mid:     { label: 'Mid-Level', c: '#a78bfa', bg: 'rgba(167,139,250,0.12)', b: 'rgba(167,139,250,0.3)' },
  senior:  { label: 'Senior',    c: '#fb923c', bg: 'rgba(251,146,60,0.12)',  b: 'rgba(251,146,60,0.3)' },
  lead:    { label: 'Lead',      c: '#f472b6', bg: 'rgba(244,114,182,0.12)', b: 'rgba(244,114,182,0.3)' },
  unknown: { label: 'Unknown',   c: '#94a3b8', bg: 'rgba(148,163,184,0.12)', b: 'rgba(148,163,184,0.3)' },
}

export default function ScoreRing({ score }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[164px] h-[164px] shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[42px] font-extrabold text-white leading-none">{score}</span>
          <span className="text-[11px] text-slate-600 tracking-[0.1em] mt-[3px]">/ 100</span>
        </div>
      </div>
      <span
        className="text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-[5px] rounded-full"
        style={{ color, border: `1px solid ${color}45`, background: `${color}18` }}
      >
        {label}
      </span>
    </div>
  )
}
