import { useState, useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'
import UploadCard from './UploadCard'
import AnalysisResults from './AnalysisResults'

const API_URL = process.env.REACT_APP_BACKEND_URL

export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile]         = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading]               = useState(false)
  const [result, setResult]                 = useState(null)
  const [error, setError]                   = useState('')
  const resultsRef = useRef(null)

  useEffect(() => {
    if (result) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  const handleAnalyze = async () => {
    if (!resumeFile) { setError('Please upload a resume first.'); return }
    setLoading(true); setError(''); setResult(null)

    const fd = new FormData()
    fd.append('resume', resumeFile)
    if (jobDescription.trim()) fd.append('jobDescription', jobDescription)

    try {
      const res  = await fetch(`${API_URL}/api/analyze-resume`, { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || res.statusText)
      setResult(json.data)
    } catch (err) {
      setError(err.message || 'Failed to analyze resume.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#020617_0%,#0a0520_50%,#020617_100%)] text-white overflow-x-hidden antialiased">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,transparent_70%)]" />
        <div className="absolute -bottom-[200px] -left-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,transparent_70%)]" />
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[940px] mx-auto px-6 pt-16 pb-24">

        {/* Header */}
        <div className="text-center mb-[60px]">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.3)] text-[#c4b5fd] text-[13px] font-medium mb-7">
            <Zap size={14} /> Powered by Gemini AI
          </span>
          <h1 className="m-0 mb-[18px] font-black tracking-[-0.03em] leading-[1.08] text-[clamp(2.6rem,7vw,4.2rem)] bg-[linear-gradient(135deg,#ffffff_0%,#e9d5ff_40%,#93c5fd_100%)] bg-clip-text text-transparent">
            Resume Analyzer
          </h1>
          <p className="m-0 mx-auto text-[18px] text-slate-500 max-w-[460px] leading-[1.65]">
            Get your ATS score, skill gap analysis, strengths and weaknesses and feedback instantly.
          </p>
        </div>

        <UploadCard
          resumeFile={resumeFile}
          jobDescription={jobDescription}
          loading={loading}
          error={error}
          onFileSelect={setResumeFile}
          onJobDescriptionChange={setJobDescription}
          onError={setError}
          onAnalyze={handleAnalyze}
        />

        {result && (
          <div ref={resultsRef}>
            <AnalysisResults result={result} />
          </div>
        )}

      </div>
    </div>
  )
}
