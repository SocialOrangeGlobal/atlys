"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const CountryCard = ({ card, idx }: { card: any, idx: number }) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <Link 
      href={`/visa/${card.slug}`} 
      className="group relative flex flex-col justify-end w-full h-[400px] rounded-[32px] overflow-hidden hover:-translate-y-2 transition-all duration-500 ease-out shadow-sm hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] bg-neutral-200 contain-paint will-change-transform"
    >
      {/* Skeleton Pulse with Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#E5E7EB] z-0 flex items-center justify-center">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-300"></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#4F46E5] border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}

      {/* Background Image */}
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={idx < 10}
        unoptimized
        onLoad={() => setIsLoaded(true)}
        className={`object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />

      {/* Top Right Arrow */}
      <div className={`absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 ${isLoaded ? 'block' : 'hidden'}`}>
        <ArrowRight className="w-5 h-5 text-white -rotate-45" />
      </div>

      {/* Country Info - Flag & Name */}
      <div className={`absolute top-6 left-5 right-12 flex items-center gap-3 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-8 h-8 rounded-full border border-white/40 overflow-hidden shrink-0 shadow-lg bg-neutral-300">
            <img
              src={`https://flagcdn.com/w40/${card.code}.png`}
              alt={`${card.name} flag`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-white font-extrabold text-[19px] leading-tight drop-shadow-md tracking-tight truncate">
            {card.name}
          </h3>
      </div>

      {/* Glassmorphic Details Box at Bottom */}
      <div className={`relative z-10 m-3 p-4 rounded-[24px] bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-700 group-hover:bg-white/20 group-hover:border-white/40 flex flex-col gap-3 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Type</span>
            <span className="text-[13px] font-bold text-white drop-shadow-sm">{card.type}</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Valid</span>
            <span className="text-[13px] font-bold text-[#00d65b] drop-shadow-sm">{card.valid}</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/20" />

        <div className="flex items-end justify-between min-h-[36px]">
          <div className="flex flex-col gap-0.5 max-w-[65%]">
            <span className="text-[9px] text-white/70 uppercase tracking-widest font-bold">Guaranteed On</span>
            <span className="text-[12px] font-bold text-white drop-shadow-sm leading-tight">{card.guaranteedDate}</span>
          </div>
          
          <div className="px-4 py-2 rounded-full bg-[#4F46E5] text-white text-[12px] font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-[0_0_15px_rgba(79,70,229,0.5)] shrink-0">
            Apply
          </div>
        </div>
      </div>
    </Link>
  )
}
