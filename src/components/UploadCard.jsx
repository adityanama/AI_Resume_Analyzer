import { Briefcase, AlertCircle, Target } from 'lucide-react'
import GlassCard from './GlassCard'
import DropZone from './DropZone'

export default function UploadCard({
  resumeFile, jobDescription, loading, error,
  onFileSelect, onJobDescriptionChange, onError, onAnalyze,
}) {
  const btnClassName = [
    'flex items-center justify-center gap-[10px] w-full p-4 rounded-[14px] border-0',
    'text-base font-semibold tracking-[0.01em] cursor-pointer transition-all duration-200 mt-2',
    loading || !resumeFile
      ? 'bg-[#0f172a] text-slate-500 cursor-not-allowed'
      : 'text-white bg-gradient-to-br from-[#7c3aed] to-[#2563eb] hover:from-[#6d28d9] hover:to-[#1d4ed8] hover:shadow-[0_8px_32px_rgba(124,58,237,0.45)] hover:-translate-y-px',
  ].join(' ')

  return (
    <GlassCard className="p-9 mb-7">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6 mb-7">
        <DropZone file={resumeFile} onFileSelect={onFileSelect} onError={onError} />

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-[0.08em]">
            <Briefcase size={13} className="text-[#a78bfa]" />
            Job Description
            <span className="text-slate-400 font-normal normal-case">(Optional)</span>
          </div>
          <textarea
            className="w-full min-h-[182px] py-[14px] px-4 bg-white/[0.03] border border-white/[0.08] rounded-[14px] text-slate-300 text-sm leading-[1.6] resize-none outline-none transition-[border-color,background,box-shadow] duration-200 block placeholder:text-slate-500 focus:border-[rgba(124,58,237,0.45)] focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/[0.12] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[rgba(124,58,237,0.5)] [&::-webkit-scrollbar-thumb]:hover:cursor-pointer"
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Paste the job description for tailored skill-gap analysis…"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-[10px] px-4 py-3 mb-4 bg-red-500/[0.08] border border-red-500/20 rounded-xl text-[#f87171] text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <button className={btnClassName} onClick={onAnalyze} disabled={loading || !resumeFile}>
        {loading ? (
          <>
            <div className="w-[18px] h-[18px] rounded-full border-[2.5px] border-white/20 border-t-white animate-[spin_0.7s_linear_infinite] shrink-0" />
            Analyzing Resume…
          </>
        ) : (
          <>
            <Target size={18} />
            Analyze Resume
          </>
        )}
      </button>
    </GlassCard>
  )
}
