export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white/[0.04] border border-white/[0.08] backdrop-blur-lg rounded-[20px] ${className}`}>
      {children}
    </div>
  )
}
