import { useState, useCallback } from 'react'
import { Upload, FileText, CheckCircle } from 'lucide-react'

export default function DropZone({ file, onFileSelect, onError }) {
  const [dragOver, setDragOver] = useState(false)

  const applyFile = (f) => {
    if (!f) return
    if (f.type !== 'application/pdf') {
      onError('Only PDF files are supported.')
      onFileSelect(null)
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      onError('File size must be less than 5 MB.')
      onFileSelect(null)
      return
    }
    onFileSelect(f)
    onError('')
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    applyFile(e.dataTransfer.files[0])
  }, [])

  const dropClassName = [
    'border-2 rounded-[14px] py-7 px-5 text-center cursor-pointer transition-all duration-200 select-none outline-none',
    dragOver
      ? 'border-solid border-[#7c3aed] bg-[rgba(124,58,237,0.08)] scale-[1.01]'
      : file
      ? 'border-solid border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.04)]'
      : 'border-dashed border-[rgba(255,255,255,0.1)] bg-transparent',
  ].join(' ')

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-[0.08em]">
        <FileText size={13} className="text-[#a78bfa]" />
        Resume
        <span className="text-slate-400 font-normal normal-case">(PDF — max 5 MB)</span>
      </div>

      <div
        role="button" tabIndex={0}
        className={dropClassName}
        onClick={() => document.getElementById('resume-upload').click()}
        onKeyDown={(e) => e.key === 'Enter' && document.getElementById('resume-upload').click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
      >
        <input
          id="resume-upload" type="file" accept=".pdf"
          className="hidden"
          onChange={(e) => applyFile(e.target.files?.[0])}
        />

        {file ? (
          <div className="flex flex-col items-center gap-[10px]">
            <CheckCircle size={44} className="text-[#34d399]" />
            <p className="m-0 text-[#6ee7b7] font-semibold break-all text-sm">{file.name}</p>
            <p className="m-0 text-slate-400 text-xs">{(file.size / 1024).toFixed(0)} KB</p>
            <button
              className="mt-1 text-xs text-slate-500 bg-transparent border-none cursor-pointer underline"
              onClick={(e) => { e.stopPropagation(); onFileSelect(null) }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <Upload size={22} className="text-slate-600" />
            </div>
            <div>
              <p className="m-0 mb-1 text-slate-300 font-medium text-[15px]">Drop your PDF here</p>
              <p className="m-0 text-slate-400 text-[13px]">or click to browse</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
