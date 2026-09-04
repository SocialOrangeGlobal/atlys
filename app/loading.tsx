import { Logo } from "@/components/global/logo"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFA]/85 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center space-y-6">
        <Logo />
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-3 border-neutral-200"></div>
          <div className="absolute inset-0 rounded-full border-3 border-[#4F46E5] border-t-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest animate-pulse">Loading destination...</p>
      </div>
    </div>
  )
}
