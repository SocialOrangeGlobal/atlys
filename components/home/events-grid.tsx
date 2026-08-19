"use client"
import React from 'react'
import { EVENTS } from '@/lib/events'
import { EventCard } from './event-card'
import { useSearchParams } from 'next/navigation'

export function EventsGrid() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category') || 'all'

  // Filter events
  const filteredEvents = React.useMemo(() => {
    return EVENTS.filter(event => {
      if (categoryFilter !== 'all' && event.category !== categoryFilter) return false
      return true
    })
  }, [categoryFilter])

  // Group by month
  const groupedByMonth = React.useMemo(() => {
    const groups: Record<string, typeof EVENTS> = {}
    filteredEvents.forEach(event => {
      if (!groups[event.month]) groups[event.month] = []
      groups[event.month].push(event)
    })
    return groups
  }, [filteredEvents])

  if (filteredEvents.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">No events found</h3>
        <p className="text-neutral-500 font-medium">Try selecting a different category.</p>
      </div>
    )
  }

  return (
    <div className="w-full relative py-10">
      
      {/* Total Events Counter */}
      <div className="flex items-center justify-center gap-2 mb-20 text-[28px] md:text-[32px]">
        <span className="font-medium text-black">2026</span>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mx-1" />
        <span className="font-medium text-neutral-500">{filteredEvents.length} Events</span>
      </div>

      {/* Vertical Timeline Track */}
      <div className="absolute left-4 md:left-[120px] top-[120px] bottom-0 w-[1px] bg-neutral-200 hidden md:block" />

      {/* Months Wrapper */}
      <div className="flex flex-col gap-24 md:pl-[60px] md:pr-12">
        {Object.entries(groupedByMonth).map(([month, events]) => (
          <div key={month} className="relative flex flex-col md:flex-row items-start">
            
            {/* Timeline Node & Month Label */}
            <div className="w-full md:w-auto flex items-center md:absolute md:left-0 md:-translate-x-1/2 mb-6 md:mb-0 z-10">
              {/* Line connector from left edge of screen to label */}
              <div className="hidden md:block absolute right-full top-1/2 w-screen h-[1px] bg-neutral-200" />
              
              <div className="px-5 py-1.5 rounded-full bg-black text-white text-[10px] font-bold tracking-widest shadow-md shrink-0 relative z-20">
                {month}
              </div>
              
              {/* Active red connector to cards */}
              <div className="hidden md:block w-[40px] h-[1px] bg-red-600 relative z-20" />
            </div>

            {/* Events Row Grid Container */}
            <div className="w-full md:pl-[140px] pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:pr-12">
                {events.map((event, idx) => (
                  <EventCard key={`${event.title}-${idx}`} event={event} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}
