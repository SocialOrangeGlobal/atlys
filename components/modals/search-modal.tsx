"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  X, 
  Clock, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Compass,
  History
} from "lucide-react"
import { CARDS } from "@/lib/data"
import { EVENTS } from "@/lib/events"

const POPULAR_DESTINATIONS = [
  { name: "United Arab Emirates", code: "ae", slug: "united-arab-emirates", tag: "Fast E-Visa", days: "2 Days" },
  { name: "Thailand", code: "th", slug: "thailand", tag: "Top Pick", days: "3 Days" },
  { name: "Singapore", code: "sg", slug: "singapore", tag: "Instant", days: "2 Days" },
  { name: "Vietnam", code: "vn", slug: "vietnam", tag: "Trending", days: "3 Days" },
  { name: "Malaysia", code: "my", slug: "malaysia", tag: "E-Visa", days: "1 Day" },
  { name: "Japan", code: "jp", slug: "japan", tag: "Top Rated", days: "5 Days" },
  { name: "Indonesia", code: "id", slug: "indonesia", tag: "On Arrival", days: "Instant" },
  { name: "Sri Lanka", code: "lk", slug: "sri-lanka", tag: "E-Visa", days: "1 Day" },
  { name: "United States", code: "us", slug: "united-states", tag: "Sticker", days: "Appointment" },
]

export function SearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<"all" | "visas" | "events" | "fast">("all")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [recentSearches, setRecentSearches] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("gg_recent_searches")
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }, [])

  // Auto focus input on modal open & disable body scroll on mobile
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      setSelectedIndex(0)
    } else {
      document.body.style.overflow = ""
      setQuery("")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Save recent search
  const saveRecentSearch = (item: string) => {
    try {
      const filtered = [item, ...recentSearches.filter((s) => s.toLowerCase() !== item.toLowerCase())].slice(0, 5)
      setRecentSearches(filtered)
      localStorage.setItem("gg_recent_searches", JSON.stringify(filtered))
    } catch {
      // ignore
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    try {
      localStorage.removeItem("gg_recent_searches")
    } catch {
      // ignore
    }
  }

  // Filter destinations from CARDS
  const filteredVisas = React.useMemo(() => {
    if (activeCategory === "events") return []
    const cleanQuery = query.toLowerCase().trim()
    
    return CARDS.filter((card) => {
      const matchesText = !cleanQuery || 
        card.name.toLowerCase().includes(cleanQuery) ||
        card.slug.toLowerCase().includes(cleanQuery) ||
        card.type.toLowerCase().includes(cleanQuery) ||
        (card.documentsNeeded && card.documentsNeeded.toLowerCase().includes(cleanQuery))

      if (!matchesText) return false

      if (activeCategory === "fast") {
        return card.type === "E-VISA"
      }
      return true
    }).slice(0, 8)
  }, [query, activeCategory])

  // Filter events from EVENTS
  const filteredEvents = React.useMemo(() => {
    if (activeCategory === "visas" || activeCategory === "fast") return []
    const cleanQuery = query.toLowerCase().trim()

    return EVENTS.filter((event) => {
      if (!cleanQuery) return activeCategory === "events"
      return (
        event.title.toLowerCase().includes(cleanQuery) ||
        event.country.toLowerCase().includes(cleanQuery) ||
        event.category.toLowerCase().includes(cleanQuery)
      )
    }).slice(0, 4)
  }, [query, activeCategory])

  const totalResultsCount = filteredVisas.length + filteredEvents.length

  const handleSelectVisa = (slug: string, name: string) => {
    saveRecentSearch(name)
    setIsOpen(false)
    router.push(`/visa/${slug}`)
  }

  const handleSelectEvent = (slug: string, title: string) => {
    saveRecentSearch(title)
    setIsOpen(false)
    router.push(`/events/${slug}`)
  }

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        setIsOpen(false)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (totalResultsCount > 0 ? (prev + 1) % totalResultsCount : 0))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (totalResultsCount > 0 ? (prev - 1 + totalResultsCount) % totalResultsCount : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (totalResultsCount > 0) {
          if (selectedIndex < filteredVisas.length) {
            const visa = filteredVisas[selectedIndex]
            handleSelectVisa(visa.slug, visa.name)
          } else {
            const eventIndex = selectedIndex - filteredVisas.length
            const event = filteredEvents[eventIndex]
            if (event) {
              handleSelectEvent(event.slug, event.title)
            }
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, totalResultsCount, filteredVisas, filteredEvents])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-start justify-center sm:pt-14 md:pt-20 sm:px-4">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in-0"
      />

      {/* Modal Dialog Card (Full screen sheet on mobile, rounded card on tablet/desktop) */}
      <div className="relative w-full h-[92vh] sm:h-auto sm:max-h-[85vh] sm:max-w-2xl bg-white sm:bg-white/95 sm:backdrop-blur-2xl rounded-t-[28px] sm:rounded-[32px] border border-neutral-200/90 shadow-[0_24px_70px_rgba(0,0,0,0.3)] overflow-hidden z-10 flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-6 sm:zoom-in-95 sm:fade-in-0">
        
        {/* Top Glowing Gradient Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#00d65b] shrink-0" />

        {/* Mobile Drag Indicator Pill */}
        <div className="w-10 h-1 rounded-full bg-neutral-300 mx-auto mt-2 sm:hidden shrink-0" />

        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-6 py-3 sm:py-4 border-b border-neutral-100 bg-white shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4F46E5]/10 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#4F46E5] animate-pulse" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search destination, visa or event..."
            className="w-full bg-transparent text-[14px] sm:text-[17px] font-semibold text-neutral-900 placeholder:text-neutral-400 outline-none truncate"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors shrink-0"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Close button: Touch-friendly X on mobile, ESC badge on desktop */}
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center p-1.5 sm:px-2 sm:py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 rounded-lg sm:rounded-md transition-colors shrink-0"
            title="Close (ESC)"
          >
            <X className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline text-[11px] font-bold text-neutral-500">ESC</span>
          </button>
        </div>

        {/* Filter Categories Pill Bar (Responsive & Smooth Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 bg-neutral-50/90 border-b border-neutral-100 overflow-x-auto no-scrollbar text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeCategory === "all"
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80"
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveCategory("visas")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeCategory === "visas"
                ? "bg-[#4F46E5] text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Visas</span>
          </button>
          <button
            onClick={() => setActiveCategory("fast")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeCategory === "fast"
                ? "bg-[#00d65b] text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Fast (24-48h)</span>
          </button>
          <button
            onClick={() => setActiveCategory("events")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeCategory === "events"
                ? "bg-[#9333EA] text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events</span>
          </button>
        </div>

        {/* Modal Body / Results Area */}
        <div className="overflow-y-auto p-3.5 sm:p-6 space-y-5 flex-1 overscroll-contain">
          
          {/* STATE 1: Empty Query State (Trending + Recent) */}
          {!query.trim() && (
            <div className="space-y-5 sm:space-y-6">
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <History className="w-3.5 h-3.5" />
                      <span>Recent Searches</span>
                    </div>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-[11px] font-semibold text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(term)
                          inputRef.current?.focus()
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-xs font-bold text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Destinations (Responsive List on Mobile, Multi-col Grid on Tablet/Laptop) */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00d65b]" />
                  <span>Popular Destinations</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <button
                      key={dest.slug}
                      onClick={() => handleSelectVisa(dest.slug, dest.name)}
                      className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200/80 hover:border-[#4F46E5]/40 hover:shadow-sm transition-all text-left group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-sm bg-neutral-100 flex items-center justify-center">
                          <img 
                            src={`https://flagcdn.com/w40/${dest.code}.png`} 
                            alt={`${dest.name} flag`}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-bold text-neutral-800 group-hover:text-[#4F46E5] truncate transition-colors">
                            {dest.name}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-medium">
                            <span className="font-bold text-[#00d65b]">{dest.days}</span>
                            <span>•</span>
                            <span className="truncate">{dest.tag}</span>
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Global Getaway Guarantee Badge */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#4F46E5]/5 via-[#9333EA]/5 to-[#00d65b]/5 border border-[#4F46E5]/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4F46E5] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 truncate">Global Getaway Guarantee</div>
                    <div className="text-[11px] text-neutral-500 truncate">Visas on time or 100% money back</div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-[#00d65b] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-[#00d65b]/30 shadow-xs shrink-0 whitespace-nowrap">
                  99.8% Approval
                </span>
              </div>

            </div>
          )}

          {/* STATE 2: Active Results List */}
          {query.trim() && totalResultsCount > 0 && (
            <div className="space-y-4">
              
              {/* Visas Section */}
              {filteredVisas.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
                    <span>Visas & Destinations ({filteredVisas.length})</span>
                    <span className="hidden sm:inline text-[10px] text-neutral-400 lowercase">use ↑↓ and enter to select</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredVisas.map((visa, idx) => {
                      const isSelected = selectedIndex === idx
                      return (
                        <button
                          key={visa.slug}
                          onClick={() => handleSelectVisa(visa.slug, visa.name)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all text-left active:scale-[0.98] ${
                            isSelected 
                              ? "bg-[#4F46E5]/10 border border-[#4F46E5]/30 shadow-sm" 
                              : "bg-white hover:bg-neutral-50 border border-neutral-200/70"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-sm bg-neutral-100 flex items-center justify-center">
                              <img 
                                src={`https://flagcdn.com/w40/${visa.code}.png`} 
                                alt={`${visa.name} flag`}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                <span className={`text-[13px] sm:text-[14px] font-extrabold truncate ${isSelected ? 'text-[#4F46E5]' : 'text-neutral-900'}`}>
                                  {visa.name}
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 shrink-0">
                                  {visa.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-500 font-medium truncate">
                                <span className="flex items-center gap-1 shrink-0">
                                  <Clock className="w-3 h-3 text-neutral-400" />
                                  <span>{visa.valid}</span>
                                </span>
                                <span>•</span>
                                <span className="text-[#00d65b] font-bold truncate">
                                  {visa.guaranteedDate ? `By ${visa.guaranteedDate.split(',')[0]}` : "Fast Delivery"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                            {visa.fees && (
                              <span className="text-[12px] sm:text-[13px] font-black text-neutral-900 whitespace-nowrap">
                                {visa.fees}
                              </span>
                            )}
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                              isSelected ? "bg-[#4F46E5] text-white" : "bg-neutral-100 text-neutral-400"
                            }`}>
                              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {filteredEvents.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1 pt-2">
                    <span>Events & Festivals ({filteredEvents.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredEvents.map((event, idx) => {
                      const absoluteIdx = filteredVisas.length + idx
                      const isSelected = selectedIndex === absoluteIdx
                      return (
                        <button
                          key={event.slug}
                          onClick={() => handleSelectEvent(event.slug, event.title)}
                          onMouseEnter={() => setSelectedIndex(absoluteIdx)}
                          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all text-left active:scale-[0.98] ${
                            isSelected 
                              ? "bg-[#9333EA]/10 border border-[#9333EA]/30 shadow-sm" 
                              : "bg-white hover:bg-neutral-50 border border-neutral-200/70"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shrink-0 border border-neutral-200 shadow-sm bg-neutral-100 flex items-center justify-center">
                              <img 
                                src={`https://flagcdn.com/w40/${event.countryCode}.png`} 
                                alt={`${event.country} flag`}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className={`text-[13px] font-bold truncate ${isSelected ? 'text-[#9333EA]' : 'text-neutral-900'}`}>
                                {event.title}
                              </div>
                              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-500 font-medium truncate">
                                <span className="flex items-center gap-1 shrink-0">
                                  <MapPin className="w-3 h-3 text-neutral-400" />
                                  <span>{event.country}</span>
                                </span>
                                <span>•</span>
                                <span className="text-[#4F46E5] font-semibold">{event.dateDisplay}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                              {event.category}
                            </span>
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                              isSelected ? "bg-[#9333EA] text-white" : "bg-neutral-100 text-neutral-400"
                            }`}>
                              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STATE 3: No Results Found */}
          {query.trim() && totalResultsCount === 0 && (
            <div className="text-center py-8 sm:py-10 px-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400 mb-3 sm:mb-4">
                <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-800 mb-1">
                No destinations found for &quot;{query}&quot;
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
                Try searching for countries like Dubai, Thailand, or Vietnam.
              </p>
              <button
                onClick={() => setQuery("")}
                className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>

        {/* Footer Shortcut Bar (Adaptive: Clean brand note on mobile, full shortcuts on desktop) */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-50/95 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-200 font-bold text-neutral-600">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-200 font-bold text-neutral-600">↵</kbd> to select
            </span>
          </div>
          <span className="sm:hidden text-neutral-500 font-medium">
            Tap any destination to view visa
          </span>
          <span className="font-extrabold tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#00d65b] bg-clip-text text-transparent uppercase">
            GLOBAL GETAWAY
          </span>
        </div>

      </div>
    </div>
  )
}
