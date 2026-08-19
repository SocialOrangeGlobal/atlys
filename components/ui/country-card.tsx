"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const CountryCard = ({ 
  card, 
  idx = 0,
  inModal = false 
}: { 
  card: any, 
  idx?: number,
  inModal?: boolean 
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <Link 
      href={`/visa/${card.slug}`} 
      className={`group relative flex flex-col justify-end w-full h-[380px] sm:h-[400px] rounded-[28px] sm:rounded-[32px] overflow-hidden transition-all duration-500 ease-out bg-neutral-900 contain-paint will-change-transform ${
        inModal 
          ? "shadow-none" 
          : "shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:-translate-y-1.5"
      }`}
    >
      {/* Skeleton Pulse with Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-800 z-0 flex items-center justify-center">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-700"></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#4F46E5] border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}

      {/* Background Image with Smooth Scale Zoom on Hover */}
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={idx < 10}
        unoptimized
        onLoad={() => setIsLoaded(true)}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />

      {/* Top Right Arrow (hidden in modal to avoid colliding with modal close button) */}
      {!inModal && (
        <div className={`absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 shadow-lg ${isLoaded ? 'flex' : 'hidden'}`}>
          <ArrowRight className="w-4 h-4 text-white -rotate-45" />
        </div>
      )}

      {/* Country Info - Flag & Name */}
      <div className={`absolute top-5 left-5 right-14 flex items-center gap-3 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden shrink-0 shadow-lg bg-neutral-800">
          <img
            src={`https://flagcdn.com/w40/${card.code}.png`}
            alt={`${card.name} flag`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-white font-extrabold text-lg sm:text-[19px] leading-tight drop-shadow-md tracking-tight truncate">
          {card.name}
        </h3>
      </div>

      {/* Glassmorphic Details Box at Bottom with Hover Glow */}
      <div className={`relative z-10 m-3 p-3.5 sm:p-4 rounded-[22px] sm:rounded-[24px] bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/35 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] flex flex-col gap-2.5 sm:gap-3 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Type</span>
            <span className="text-xs sm:text-[13px] font-bold text-white drop-shadow-sm">{card.type || "E-VISA"}</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Valid</span>
            <span className="text-xs sm:text-[13px] font-bold text-[#00d65b] drop-shadow-sm">{card.valid || "30 DAYS"}</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/15" />

        <div className="flex items-center justify-between gap-2 min-h-[32px]">
          <div className="flex flex-col gap-0.5 max-w-[65%] min-w-0">
            <span className="text-[9px] text-white/70 uppercase tracking-widest font-bold truncate">
              {card.guaranteedDate ? "Guaranteed On" : "Processing Time"}
            </span>
            <span className="text-[11px] sm:text-[12px] font-bold text-white drop-shadow-sm leading-tight truncate">
              {card.guaranteedDate || "3-5 Business Days"}
            </span>
          </div>
          
          <div className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#4F46E5] text-white text-[11px] sm:text-xs font-bold transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(79,70,229,0.7)] group-hover:scale-105 group-hover:bg-[#4338CA] flex items-center gap-1 shrink-0">
            <span>Apply</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
