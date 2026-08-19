export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFA]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#4F46E5] border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest animate-pulse">Loading</p>
      </div>
    </div>
  )
}
