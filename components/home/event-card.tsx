"use client"

import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  event: {
    title: string;
    slug: string;
    country: string;
    countryCode: string;
    image: string;
    dateDisplay: string;
    daysBeforeVisa: number;
    goingCount: number;
    avatars: string[];
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.slug}`} className="flex flex-col gap-4 w-full group cursor-pointer">
      {/* Main Card */}
      <div className="relative w-full h-[460px] rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 ease-out hover:shadow-md border border-black/5 bg-neutral-100 contain-paint will-change-transform">
        
        {/* Background Image */}
        <Image 
          src={event.image} 
          alt={event.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Premium Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8 text-center items-center z-10">
          
          {/* Flag (Mocked with Circle for now) */}
          <div className="w-5 h-5 rounded-full overflow-hidden mb-3 border border-white shadow-sm shrink-0 bg-neutral-200">
             <img src={`https://flagcdn.com/w40/${event.countryCode}.png`} alt={event.country} className="w-full h-full object-cover" />
          </div>

          <p className="text-[13px] font-bold text-white mb-1">Get {event.country} visa for</p>
          <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight uppercase mb-2 max-w-[240px]">
            {event.title}
          </h3>
          <p className="text-[13px] font-bold text-white/90 mb-6">Starting from {event.dateDisplay}</p>
          
          <div className="px-5 py-2.5">
            <p className="text-[11px] font-extrabold text-white tracking-widest uppercase">
              Get Visa {event.daysBeforeVisa} Days Before Event
            </p>
          </div>
        </div>
      </div>

      {/* Avatars section below the card */}
      <div className="flex items-center justify-center gap-3 px-4 pt-1">
        <div className="flex -space-x-2">
          {event.avatars.map((avatar, idx) => (
            <img 
              key={idx} 
              src={avatar} 
              alt="User" 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm z-10" 
              style={{ zIndex: 10 - idx }}
            />
          ))}
        </div>
        <p className="text-[11px] font-semibold text-neutral-600">
          <span className="text-black font-extrabold">{event.goingCount}+</span> are going for this event
        </p>
      </div>
    </Link>
  )
}
