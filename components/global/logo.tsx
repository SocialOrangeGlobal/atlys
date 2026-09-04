import * as React from "react"

export function Logo({ 
  className = "",
  inverted = false 
}: { 
  className?: string
  inverted?: boolean 
}) {
  const textColor = inverted ? "text-white" : "text-black"
  const lineColor = inverted ? "bg-white" : "bg-black"
  const planeColor = inverted ? "text-white" : "text-black"

  return (
    <div className={`inline-flex items-center select-none group cursor-pointer pt-2.5 sm:pt-3 ${className}`}>
      <div className="flex items-baseline gap-1 sm:gap-1.5 font-black tracking-tight leading-none">
        {/* GLOBAL */}
        <span className={`text-[15px] xs:text-[17px] sm:text-[20px] md:text-[22px] font-black tracking-tighter uppercase ${textColor}`}>
          GLOBAL
        </span>

        {/* GETAWAY Container */}
        <div className="relative inline-flex flex-col">
          {/* Top Line + Aeroplane Container (Left-to-Right Flight) */}
          <div className="absolute -top-[12px] sm:-top-[16px] left-1 sm:left-2 right-[-14px] sm:right-[-18px] flex items-center gap-1 pointer-events-none">
            {/* Sleek Contrail Line */}
            <div className={`h-[1.5px] flex-1 rounded-full ${lineColor}`} />
            
            {/* Aeroplane Flying Left-to-Right */}
            <div className={`shrink-0 ${planeColor} transform rotate-90 group-hover:translate-x-1 transition-transform duration-300`}>
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
          </div>

          {/* GETAWAY (Multi-Color Gradient Text) */}
          <span className="text-[15px] xs:text-[17px] sm:text-[20px] md:text-[22px] font-black tracking-tighter uppercase bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#00d65b] bg-clip-text text-transparent">
            GETAWAY
          </span>
        </div>
      </div>
    </div>
  )
}
