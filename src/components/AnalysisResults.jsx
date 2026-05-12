import {
  CheckCircle, XCircle, TrendingUp, AlertCircle, Zap, Star, BarChart2,
} from 'lucide-react'
import GlassCard from './GlassCard'
import SectionHead from './SectionHead'
import ScoreRing, { SENIORITY } from './ScoreRing'

export default function AnalysisResults({ result }) {
  const sen = SENIORITY[result.seniority_level] ?? SENIORITY.unknown

  return (
    <div className="animate-[fadeUp_0.5s_ease_forwards] flex flex-col gap-[22px]">

      {/* Score + Summary */}
      <GlassCard className="p-9">
        <div className="flex flex-wrap items-center gap-9">
          <ScoreRing score={result.ats_score} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-[14px]">
              <h2 className="m-0 text-[22px] font-bold flex items-center gap-[9px]">
                <BarChart2 size={20} className="text-[#a78bfa]" />
                Analysis Results
              </h2>
              <span
                className="px-[13px] py-1 rounded-full text-[11px] font-bold"
                style={{ background: sen.bg, border: `1px solid ${sen.b}`, color: sen.c }}
              >
                {sen.label}
              </span>
            </div>
            <p className="m-0 text-slate-400 leading-[1.75] text-[15px]">{result.overall_summary}</p>
          </div>
        </div>
      </GlassCard>

      {/* Key + Missing Skills */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[22px]">
        <GlassCard className="p-[26px]">
          <SectionHead icon={<CheckCircle size={14} className="text-[#34d399]" />}>
            Key Skills
          </SectionHead>
          <div className="flex flex-wrap gap-2">
            {result.key_skills.map((s, i) => (
              <span key={i} className="px-[14px] py-[5px] rounded-full text-[13px] font-medium bg-emerald-400/10 border border-emerald-400/25 text-[#6ee7b7]">
                {s}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-[26px]">
          <SectionHead icon={<XCircle size={14} className="text-[#f87171]" />}>
            Missing Skills
          </SectionHead>
          <div className="flex flex-wrap gap-2">
            {result.missing_skills.length > 0
              ? result.missing_skills.map((s, i) => (
                  <span key={i} className="px-[14px] py-[5px] rounded-full text-[13px] font-medium bg-red-500/10 border border-red-500/25 text-red-300">
                    {s}
                  </span>
                ))
              : <span className="text-slate-400 text-sm">No missing skills identified</span>
            }
          </div>
        </GlassCard>
      </div>

      {/* Strengths + Weaknesses */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[22px]">
        <GlassCard className="p-[26px]">
          <SectionHead icon={<TrendingUp size={14} className="text-[#60a5fa]" />}>
            Strengths
          </SectionHead>
          <div className="flex flex-col gap-3">
            {result.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <Star size={14} className="text-[#60a5fa] shrink-0 mt-[3px]" />
                <span className="text-slate-300 text-sm leading-[1.55]">{s}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-[26px]">
          <SectionHead icon={<AlertCircle size={14} className="text-[#fbbf24]" />}>
            Areas to Improve
          </SectionHead>
          <div className="flex flex-col gap-3">
            {result.weaknesses.map((w, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <span className="text-[#fbbf24] font-bold shrink-0 mt-[2px] text-base">›</span>
                <span className="text-slate-300 text-sm leading-[1.55]">{w}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Suggestions */}
      <GlassCard className="p-[26px]">
        <SectionHead icon={<Zap size={14} className="text-[#facc15]" />}>
          Feedback
        </SectionHead>
        <div className="flex flex-col gap-[10px]">
          {result.suggestions.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-[14px] py-[14px] px-4 bg-white/[0.03] border border-white/[0.05] rounded-xl transition-[background] duration-150 hover:bg-white/[0.06]"
            >
              <div className="w-[26px] h-[26px] shrink-0 flex items-center justify-center rounded-full bg-[rgba(124,58,237,0.18)] border border-[rgba(124,58,237,0.35)] text-[#c4b5fd] text-xs font-bold">
                {i + 1}
              </div>
              <p className="m-0 text-slate-300 text-sm leading-[1.65]">{s}</p>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  )
}
