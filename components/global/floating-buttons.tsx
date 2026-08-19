"use client"

import React from "react"
import Link from "next/link"
import { Map, Plane, CheckCircle2 } from "lucide-react"

export function FloatingButtons() {
  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="relative bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-1.5 flex items-center gap-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 group hover:-translate-y-1">
        
        {/* Track Button -> Home */}
        <Link href="/" className="relative flex gap-2 items-center px-6 py-2.5 hover:bg-neutral-100 rounded-full transition-colors overflow-hidden">
          <div className="flex items-end gap-[3px] h-3.5">
            <div className="w-[3px] h-2 bg-[#00d65b] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
            <div className="w-[3px] h-3.5 bg-[#00d65b] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_delay-75]" />
            <div className="w-[3px] h-1.5 bg-[#00d65b] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_delay-150]" />
          </div>
          <span className="text-sm font-bold text-neutral-900 tracking-wide">Track</span>
        </Link>
        
        <div className="w-[1px] h-5 bg-neutral-200 mx-1" />
        
        {/* Map Button -> /map */}
        <Link href="/map" className="relative flex gap-2 items-center px-6 py-2.5 bg-neutral-900 hover:bg-black rounded-full transition-all overflow-hidden group/map shadow-md">
          <Map className="w-4 h-4 text-white group-hover/map:-translate-y-0.5 group-hover/map:rotate-6 transition-transform duration-300" />
          <span className="text-sm font-bold text-white tracking-wide">Map</span>
        </Link>
      </div>
    </div>
  )
}
