"use client"

import Link from "next/link"
import { Map } from "lucide-react"

export function FloatingButtons() {
  return (
    <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 md:bottom-8 md:right-8 z-40 pointer-events-auto">
      <Link
        href="/map"
        className="group relative flex items-center gap-2.5 px-5 py-3 bg-white/95 hover:bg-white text-neutral-900 rounded-full backdrop-blur-xl border border-neutral-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all duration-300"
        title="Open interactive visa world map"
      >
        {/* Subtle live radar dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d65b] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d65b]" />
        </span>

        <Map className="w-4 h-4 text-neutral-900 group-hover:text-black group-hover:-translate-y-0.5 group-hover:rotate-6 transition-transform duration-300" />
        <span className="text-sm font-bold text-neutral-900 group-hover:text-black tracking-wide">Map</span>
      </Link>
    </div>
  )
}
