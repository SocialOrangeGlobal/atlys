"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

type DropdownState = "delivery" | "type" | "documents" | "holidays" | null

export function FilterBar({ tab = 'explore' }: { tab?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(id)
    }
  }

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    setActiveDropdown(null)
  }

  const currentDelivery = searchParams.get("delivery") || "all"
  const currentType = searchParams.get("type") || "all"
  const currentDocs = searchParams.get("docs") || "all"
  const currentHolidays = searchParams.get("holidays") || "all"
  const currentCategory = searchParams.get("category") || "all"

  const DropdownItem = ({ label, value, current, count }: { label: string, value: string, current: string, count?: number }) => {
    const isActive = current === value
    return (
      <button 
        onClick={() => handleFilter(activeDropdown as string, value)} 
        className="w-full text-left py-[14px] flex items-center group transition-colors"
      >
        <div className="w-6 h-6 mr-1 flex items-center justify-center shrink-0">
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#5079EA]" />}
        </div>
        <span className={`text-[15px] ${isActive ? 'font-bold text-black' : 'font-semibold text-black hover:opacity-70'}`}>
          {label}
        </span>
        {count !== undefined && (
          <span className="ml-1.5 text-[15px] font-semibold text-[#8B939E]">
            • {count}
          </span>
        )}
      </button>
    )
  }

  const CalendarDropdown = () => {
    // Default to August 2026 for consistency with mock data, or use new Date() for today
    const [viewDate, setViewDate] = React.useState(new Date(2026, 7, 1)) 
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

    const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
    const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
    const firstDayIndex = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay() 
    const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1 // Make Monday the first day of the week

    const daysInPrevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate()
    
    const prevDays = Array.from({length: startDay}, (_, i) => daysInPrevMonth - startDay + i + 1)
    const currentDays = Array.from({length: daysInMonth}, (_, i) => i + 1)
    const nextDays = Array.from({length: 42 - (prevDays.length + currentDays.length)}, (_, i) => i + 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthShortNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

    const handleSelect = () => {
      if (!selectedDate) return;
      // Format as "dd-mmm-yyyy" for the URL
      const formatted = `${selectedDate.getDate()}-${monthShortNames[selectedDate.getMonth()]}-${selectedDate.getFullYear()}`;
      handleFilter('holidays', formatted)
    }

    const isSameDate = (d1: Date | null, d2: Date) => {
      if (!d1) return false
      return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
    }

    return (
      <div className="w-[340px] px-5 py-5 flex flex-col items-center">
        <p className="text-sm font-semibold text-center text-neutral-800 mb-4 px-2 leading-tight">
          Check upcoming holidays and plan your trips around long weekends.
        </p>

        {/* Upcoming Holiday Banner */}
        <div className="w-full bg-[#1A1A1A] rounded-2xl p-4 flex items-center justify-between text-white mb-6">
          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-widest text-[#9CA3AF] mb-1">+ UPCOMING +</p>
            <p className="text-[13px] font-bold text-white leading-tight">Long weekend on 4 - 6th Sep</p>
            <p className="text-xs text-[#9CA3AF]">Janmashtami, 4 Sep</p>
          </div>
          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </button>
        </div>

        {/* Dynamic Calendar Header */}
        <div className="w-full flex items-center justify-between px-2 mb-4">
          <button onClick={prevMonth} className="hover:bg-neutral-100 p-1 rounded-full transition-colors"><ChevronDown className="w-4 h-4 rotate-90 text-neutral-600" /></button>
          <span className="text-[15px] font-bold text-black">{monthNames[viewDate.getMonth()]}, {viewDate.getFullYear()}</span>
          <button onClick={nextMonth} className="hover:bg-neutral-100 p-1 rounded-full transition-colors"><ChevronDown className="w-4 h-4 -rotate-90 text-neutral-600" /></button>
        </div>

        {/* Days row */}
        <div className="w-full grid grid-cols-7 gap-1 mb-2 text-center">
          {['Mo','Tu','We','Th','Fr','Sa','Su'].map(day => (
            <span key={day} className="text-xs font-semibold text-[#8B939E]">{day}</span>
          ))}
        </div>

        {/* Dynamic Dates Grid */}
        <div className="w-full grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-2">
          {prevDays.map(d => <span key={`prev-${d}`} className="text-sm font-medium text-neutral-300 py-1.5">{d}</span>)}
          {currentDays.map(d => {
            const thisDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
            const isSelected = isSameDate(selectedDate, thisDate);
            return (
              <button 
                key={`cur-${d}`} 
                onClick={() => setSelectedDate(thisDate)}
                className={`relative text-sm font-semibold rounded-full mx-auto w-8 h-8 flex items-center justify-center transition-all ${
                  isSelected ? 'border-[1.5px] border-[#5079EA] text-[#5079EA]' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {d}
              </button>
            )
          })}
          {nextDays.map(d => <span key={`next-${d}`} className="text-sm font-medium text-neutral-300 py-1.5">{d}</span>)}
        </div>

        {/* Footer */}
        <div className="w-full flex items-center justify-between mt-2 pt-4 border-t border-neutral-100">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-500">Guaranteed visas before</span>
            <span className="text-sm font-bold text-black">
              {selectedDate ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()].slice(0,3)}, ${selectedDate.getFullYear()}` : 'Select a date'}
            </span>
          </div>
          <button 
            disabled={!selectedDate}
            onClick={handleSelect}
            className={`px-6 py-2.5 rounded-[100px] text-sm font-bold transition-all ${
              selectedDate ? 'bg-[#98B0FF] text-white hover:bg-[#86a1f8]' : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            Select
          </button>
        </div>
      </div>
    )
  }

  if (tab === 'events') {
    return (
      <div className="relative z-40 w-full px-4 sm:px-6 pb-2">
        {/* Desktop: single-row pill */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center rounded-[100px] border border-[#D6D9DC] bg-white shadow-[0_15px_20px_0_rgba(31,41,55,0.08)] backdrop-blur-xl overflow-hidden">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'music', label: 'Music' },
              { id: 'sports', label: 'Sports' },
              { id: 'art', label: 'Arts' },
              { id: 'business', label: 'Business' }
            ].map((cat, idx) => {
              const isActive = currentCategory === cat.id;
              return (
                <div key={cat.id} className="flex items-center h-full">
                  <button
                    onClick={() => handleFilter('category', cat.id)}
                    className={`px-6 lg:px-8 py-4 lg:py-5 text-[14px] transition-all flex items-center gap-2 border-b-[3px] whitespace-nowrap ${
                      isActive ? 'font-bold text-neutral-900 border-black pt-[19px]' : 'font-medium text-neutral-500 hover:text-neutral-900 bg-transparent border-transparent pt-[19px]'
                    }`}
                  >
                    {cat.id === 'all' && (<div className="w-5 h-5 bg-black rounded-full text-white flex items-center justify-center shadow-sm shrink-0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h4v4H4z"/><path d="M16 4h4v4h-4z"/><path d="M4 16h4v4H4z"/><path d="M16 16h4v4h-4z"/></svg></div>)}
                    {cat.id === 'music' && (<div className="w-5 h-5 bg-[#FF4F81] rounded-full flex items-center justify-center text-white shadow-sm shrink-0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>)}
                    {cat.id === 'sports' && (<div className="w-5 h-5 bg-[#00D65B] rounded-full flex items-center justify-center text-white shadow-sm shrink-0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>)}
                    {cat.id === 'art' && (<div className="w-5 h-5 bg-[#FF8A00] rounded-full flex items-center justify-center text-white shadow-sm shrink-0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>)}
                    {cat.id === 'business' && (<div className="w-5 h-5 bg-[#4F46E5] rounded-full flex items-center justify-center text-white shadow-sm shrink-0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>)}
                    {cat.label}
                  </button>
                  {idx < 4 && <div className="w-[1px] h-6 bg-neutral-200" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Wrapped pill buttons */}
        <div className="flex md:hidden flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Events', color: 'bg-black' },
            { id: 'music', label: 'Music', color: 'bg-[#FF4F81]' },
            { id: 'sports', label: 'Sports', color: 'bg-[#00D65B]' },
            { id: 'art', label: 'Arts', color: 'bg-[#FF8A00]' },
            { id: 'business', label: 'Business', color: 'bg-[#4F46E5]' }
          ].map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleFilter('category', cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all border ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : cat.color}`} />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative z-40 w-full px-2 sm:px-6 flex justify-center">
      
      {/* Brand Style Pill */}
      <div className="flex items-center rounded-[20px] md:rounded-[1000px] border border-[#D6D9DC] bg-white px-2 sm:px-3 md:px-10 py-2.5 sm:py-3 md:pt-4 md:pb-3.5 shadow-[0_15px_20px_0_rgba(31,41,55,0.08)] w-full sm:w-auto">
        
        {/* Visa Delivery */}
        <div className="relative flex-1 sm:flex-none">
          <div onClick={() => toggleDropdown("delivery")} className="flex cursor-pointer items-center justify-start gap-2 md:gap-3 border-[#D6D9DC] pr-3 md:px-10 md:pl-0 border-r hover:opacity-80 transition-opacity">
            <span className="shrink-0">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#35CC6D"></circle>
                <path d="M10.6641 17H9.99747L10.6641 12.3333H8.3308C7.94414 12.3333 7.9508 12.12 8.07747 11.8933C8.20414 11.6667 8.1108 11.84 8.12414 11.8133C8.98414 10.2933 10.2775 8.02667 11.9975 5H12.6641L11.9975 9.66667H14.3308C14.6575 9.66667 14.7041 9.88667 14.6441 10.0067L14.5975 10.1067C11.9708 14.7 10.6641 17 10.6641 17Z" fill="white"></path>
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-inter mb-0.5 text-[10px] sm:text-xs leading-3 font-medium text-[#69727B]">Visa delivery:</p>
              <span className="flex items-center gap-1 mt-1.5">
                <p className="truncate text-[12px] sm:text-sm font-semibold text-black">
                  {currentDelivery === 'all' ? 'Any Time' : currentDelivery === 'instant' ? 'Instant' : currentDelivery === '24h' ? 'Within 24 Hours' : currentDelivery === '3-5d' ? '3-5 Days' : currentDelivery === '6-7d' ? '6-7 Days' : '8-30 Days'}
                </p>
                <ChevronDown className="w-4 h-4 text-black shrink-0" />
              </span>
            </div>
          </div>
          {/* Dropdown */}
          <div className={`absolute top-[130%] left-0 w-[240px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-[28px] overflow-hidden transition-all duration-300 origin-top-left px-2 py-4 z-50 ${activeDropdown === 'delivery' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <DropdownItem label="Any Time" value="all" current={currentDelivery} count={151} />
            <DropdownItem label="Instant" value="instant" current={currentDelivery} count={2} />
            <DropdownItem label="Within 24 Hours" value="24h" current={currentDelivery} count={4} />
            <DropdownItem label="3-5 Days" value="3-5d" current={currentDelivery} count={28} />
            <DropdownItem label="6-7 Days" value="6-7d" current={currentDelivery} count={27} />
            <DropdownItem label="8-30 Days" value="8-30d" current={currentDelivery} count={90} />
          </div>
        </div>

        {/* Visa Type */}
        <div className="relative flex-1 sm:flex-none">
          <div onClick={() => toggleDropdown("type")} className="flex cursor-pointer items-center justify-start gap-2 md:gap-3 border-[#D6D9DC] pl-3 md:px-10 border-r-0 lg:border-r hover:opacity-80 transition-opacity">
            <span className="shrink-0">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#5079EA"></circle>
                <path d="M5 15.2368H17V16.5H5V15.2368ZM15.6358 13.2474C16.1411 13.38 16.6589 13.0832 16.7979 12.5779C16.9305 12.0726 16.6337 11.5547 16.1284 11.4158L12.7747 10.5189L11.0316 4.82211L9.81263 4.5V9.72947L6.67368 8.88947L6.08632 7.42421L5.17053 7.17789V10.4432L15.6358 13.2474Z" fill="white"></path>
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-inter mb-0.5 text-[10px] sm:text-xs leading-3 font-medium text-[#69727B]">Type:</p>
              <span className="flex items-center gap-1 mt-1.5">
                <p className="truncate text-[12px] sm:text-sm font-semibold text-black">
                  {currentType === 'all' ? 'All Visa Types' : currentType === 'e-visa' ? 'E-Visa' : 'Sticker'}
                </p>
                <ChevronDown className="w-4 h-4 text-black shrink-0" />
              </span>
            </div>
          </div>
          {/* Dropdown */}
          <div className={`absolute top-[130%] right-0 md:-left-8 md:right-auto w-[240px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-[28px] overflow-hidden transition-all duration-300 origin-top-right md:origin-top-left px-2 py-4 z-50 ${activeDropdown === 'type' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <DropdownItem label="All Visa Types" value="all" current={currentType} count={151} />
            <DropdownItem label="E-Visa" value="e-visa" current={currentType} count={135} />
            <DropdownItem label="Sticker" value="sticker" current={currentType} count={16} />
          </div>
        </div>

        {/* Documents */}
        <div className="relative hidden lg:block">
          <div onClick={() => toggleDropdown("documents")} className="flex cursor-pointer items-center justify-start gap-3 border-[#D6D9DC] px-4 md:px-10 border-r min-w-32 md:min-w-40 hover:opacity-80 transition-opacity">
            <span className="shrink-0">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#EAA250"></circle>
                <path d="M15.6 6.2H13.092C12.84 5.504 12.18 5 11.4 5C10.62 5 9.96 5.504 9.708 6.2H7.2C6.54 6.2 6 6.74 6 7.4V15.8C6 16.46 6.54 17 7.2 17H15.6C16.26 17 16.8 16.46 16.8 15.8V7.4C16.8 6.74 16.26 6.2 15.6 6.2ZM11.4 6.2C11.73 6.2 12 6.47 12 6.8C12 7.13 11.73 7.4 11.4 7.4C11.07 7.4 10.8 7.13 10.8 6.8C10.8 6.47 11.07 6.2 11.4 6.2ZM12.6 14.6H8.4V13.4H12.6V14.6ZM14.4 12.2H8.4V11H14.4V12.2ZM14.4 9.8H8.4V8.6H14.4V9.8Z" fill="white"></path>
              </svg>
            </span>
            <div>
              <p className="font-inter mb-0.5 text-xs leading-3 font-medium text-[#69727B]">Documents:</p>
              <span className="flex items-center gap-1.5 mt-1.5">
                <p className="max-w-[160px] truncate text-sm font-semibold text-black">
                  {currentDocs === 'all' ? 'Any Documents' : 'Passport Only'}
                </p>
                <ChevronDown className="w-4 h-4 text-black" />
              </span>
            </div>
          </div>
          {/* Dropdown */}
          <div className={`absolute top-[130%] -left-8 w-[240px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-[28px] overflow-hidden transition-all duration-300 origin-top px-2 py-4 z-50 ${activeDropdown === 'documents' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <DropdownItem label="Any Documents" value="all" current={currentDocs} count={151} />
            <DropdownItem label="Passport Only" value="passport" current={currentDocs} count={18} />
          </div>
        </div>

        {/* Holidays */}
        <div className="relative hidden lg:block">
          <div onClick={() => toggleDropdown("holidays")} className="flex cursor-pointer items-center justify-start gap-3 border-[#D6D9DC] px-4 md:px-10 border-r-0 min-w-32 md:min-w-40 hover:opacity-80 transition-opacity">
            <span className="shrink-0">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#EA5083"></circle>
                <path d="M11.751 12.7064L12.7044 11.753L16.998 16.0486L16.0466 17L11.751 12.7064ZM14.6132 8.88611L16.52 6.97931C13.8865 4.3458 9.61949 4.33913 6.98598 6.96598C9.60616 6.09925 12.5264 6.7993 14.6132 8.88611ZM6.96598 6.98598C4.33913 9.61949 4.3458 13.8865 6.97931 16.52L8.88611 14.6132C6.7993 12.5264 6.09925 9.60616 6.96598 6.98598ZM6.97931 6.97264L6.97264 6.97931C6.71929 8.98611 7.7527 11.5663 9.83951 13.6598L13.6598 9.83951C11.573 7.7527 8.98612 6.71929 6.97931 6.97264Z" fill="white"></path>
              </svg>
            </span>
            <div>
              <p className="font-inter mb-0.5 text-xs leading-3 font-medium text-[#69727B]">Holidays:</p>
              <span className="flex items-center gap-1.5 mt-1.5">
                <p className="max-w-[160px] truncate text-sm font-semibold text-black">
                  {currentHolidays === 'all' ? 'Select Dates' : currentHolidays.replace('-aug', ' Aug')}
                </p>
                <ChevronDown className="w-4 h-4 text-black" />
              </span>
            </div>
          </div>
          {/* Dropdown */}
          <div className={`absolute top-[130%] right-0 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-[28px] overflow-hidden transition-all duration-300 origin-top-right z-50 ${activeDropdown === 'holidays' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <CalendarDropdown />
          </div>
        </div>

      </div>
    </div>
  )
}
