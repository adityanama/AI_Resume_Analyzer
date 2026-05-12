export default function SectionHead({ icon, children }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white mb-[18px]">
      {icon}{children}
    </div>
  )
}
