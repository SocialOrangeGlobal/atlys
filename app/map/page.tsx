"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Globe, MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { Logo } from "@/components/global/logo"

// Dynamically import the leaflet map with ssr: false
const LeafletMap = dynamic(() => import('@/components/global/leaflet-map'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 text-neutral-400 gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-neutral-300 border-t-[#4F46E5] animate-spin" />
      <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Loading interactive map...</span>
    </div>
  )
})

export default function MapPage() {
  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-[#FAFAFA] font-sans selection:bg-[#4F46E5] selection:text-white">

      {/* Floating Top Navigation Bar */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-40 flex items-center justify-between pointer-events-none">
        
        {/* Left: Back / Home Button + Brand Logo */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 text-neutral-900 hover:bg-white transition-all shadow-md hover:shadow-lg active:scale-95 group text-xs sm:text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Explore</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <Link href="/" className="hidden sm:flex items-center px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-md hover:bg-white transition-colors">
            <Logo className="scale-90 origin-left" />
          </Link>
        </div>

        {/* Floating Status Pill */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-md text-neutral-900 pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d65b] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d65b]" />
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-neutral-800">40+ Visa Destinations</span>
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div className="absolute inset-0 w-full h-full">
        <LeafletMap />
      </div>
    </main>
  )
}
