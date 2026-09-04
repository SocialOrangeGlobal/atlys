"use client"

import * as React from "react"
import Link from "next/link"
import { User, Search, ShieldCheck, ChevronDown, Map, Calendar } from "lucide-react"
import { Logo } from "@/components/global/logo"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { SearchModal } from "@/components/modals/search-modal"
import { SignInModal } from "@/components/modals/sign-in-modal"

export function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  let activeTab = searchParams.get('tab') || 'explore'
  if (pathname.startsWith('/events')) {
    activeTab = 'events'
  } else if (pathname.startsWith('/visa')) {
    activeTab = 'explore'
  }

  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isSignInOpen, setIsSignInOpen] = React.useState(false)

  // Global Keyboard shortcut: Cmd+K / Ctrl+K to open Search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    let lastScrollY = window.scrollY
    const isDetailPage = pathname.startsWith('/visa') || pathname.startsWith('/events')

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      if (isDetailPage) {
        // On detail pages with their own sticky sub-navigation, hide main navbar when scrolled past hero
        if (currentScrollY > 150) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
      } else {
        // On home page, hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleTabChange = (tab: "explore" | "events") => {
    if (pathname === '/') {
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', tab)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    } else {
      router.push(`/?tab=${tab}`)
    }
  }

  return (
    <>
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'pt-2.5 sm:pt-4' : 'pt-3 sm:pt-6'} ${isHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <header 
        className={`
          flex items-center justify-between transition-all duration-500 relative
          ${isScrolled 
            ? 'w-[96%] max-w-[1240px] h-15 sm:h-16 rounded-[28px] sm:rounded-[32px] bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-3.5 sm:px-6 md:px-8' 
            : 'w-[98%] max-w-[1440px] h-16 sm:h-18 md:h-20 rounded-[28px] sm:rounded-[32px] md:rounded-[40px] bg-white/90 backdrop-blur-2xl border border-white/80 px-3.5 sm:px-6 md:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          }
        `}
      >
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 shrink-0">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Nav Tabs (Hides on laptop when scrolled to make room for Search bar) */}
          <nav className={`items-center gap-1 bg-neutral-100/90 p-1 rounded-full border border-neutral-200/60 shadow-inner transition-all duration-300 ${
            isScrolled ? 'hidden xl:flex' : 'hidden md:flex'
          }`}>
            <button
              onClick={() => handleTabChange("explore")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === "explore"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => handleTabChange("events")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === "events"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
              }`}
            >
              Events
            </button>
          </nav>
        </div>

        {/* Center Section - Search Bar (Visible when scrolled, interactive pill with brand theme & shortcuts) */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-20 pointer-events-none ${
          isScrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}>
           <button 
             onClick={() => setIsSearchOpen(true)}
             className="hidden md:flex items-center gap-2.5 sm:gap-3 bg-white/95 hover:bg-white border border-neutral-200/90 hover:border-[#4F46E5]/40 rounded-full pl-3.5 sm:pl-4 pr-2.5 sm:pr-3 py-1.5 sm:py-2 shadow-sm hover:shadow-[0_4px_24px_rgba(79,70,229,0.15)] transition-all duration-300 cursor-pointer group pointer-events-auto whitespace-nowrap active:scale-95"
             title="Search destinations, visas & events (⌘K)"
           >
              <div className="w-6 h-6 rounded-full bg-[#4F46E5]/10 group-hover:bg-[#4F46E5] flex items-center justify-center transition-all shrink-0">
                <Search className="w-3.5 h-3.5 text-[#4F46E5] group-hover:text-white transition-colors" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-bold text-neutral-800 group-hover:text-neutral-900">Where to next?</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 hidden lg:inline" />
              <span className="text-[11px] sm:text-[12px] font-medium text-neutral-400 group-hover:text-neutral-600 hidden lg:inline">Search visas</span>
              <kbd className="text-[10px] font-extrabold text-neutral-400 bg-neutral-100 group-hover:bg-[#4F46E5]/10 group-hover:text-[#4F46E5] px-1.5 py-0.5 rounded-md border border-neutral-200 transition-colors ml-0.5">
                ⌘K
              </kbd>
           </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 shrink-0">
          
          {/* Promise Badge (Only on large screens to prevent navbar crowding on 1024px laptop) */}
          <div className="hidden xl:flex flex-col items-end cursor-pointer group shrink-0">
            <div className="flex items-center gap-1.5 text-[#00c853] group-hover:text-[#00b048] transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#00c853]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00c853]">Global Getaway Promise</span>
            </div>
            <span className="text-[12px] font-bold text-neutral-600 group-hover:text-neutral-900 transition-colors">Visas on time, guaranteed</span>
          </div>

          {/* Quick Search Trigger (Visible when NOT scrolled on desktop) */}
          {!isScrolled && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-200/60 text-neutral-600 hover:text-neutral-900 transition-all text-[12px] font-bold shrink-0 group hover:border-[#4F46E5]/30 active:scale-95"
              title="Search destinations & events (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#4F46E5] transition-colors" />
              <span className="hidden lg:inline text-neutral-600 group-hover:text-neutral-900">Search</span>
              <kbd className="text-[10px] font-extrabold text-neutral-400 bg-white px-1.5 py-0.5 rounded border border-neutral-200 group-hover:border-[#4F46E5]/30">
                ⌘K
              </kbd>
            </button>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
             {/* Mobile Search Button (Compact & responsive on mobile) */}
             <button
               onClick={() => setIsSearchOpen(true)}
               className="flex md:hidden items-center justify-center w-8 h-8 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 hover:text-[#4F46E5] transition-all shrink-0 active:scale-90"
               aria-label="Search destinations"
               title="Search"
             >
               <Search className="w-4 h-4" />
             </button>

             <button className="hidden sm:flex items-center gap-1 text-[13px] sm:text-[14px] font-bold text-neutral-800 hover:text-black transition-colors shrink-0">
               EN-IN <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
             </button>
             
             {/* Sign in Button - Compact & Never Wraps on Mobile */}
             <button 
               onClick={() => setIsSignInOpen(true)}
               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-neutral-900 hover:bg-black text-white rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] group shrink-0 whitespace-nowrap active:scale-95"
             >
               <span className="text-[12px] sm:text-[14px] font-bold">Sign in</span>
               <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
                 <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
               </div>
             </button>
          </div>
          
        </div>
      </header>
    </div>

    {/* Search & Sign In Modals */}
    <SearchModal isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    <SignInModal isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />

    {/* Mobile Bottom Navigation Bar */}
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 px-6 py-3 flex items-center justify-around md:hidden pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <button onClick={() => handleTabChange("explore")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-[#4F46E5]' : 'text-neutral-400 hover:text-neutral-600'}`}>
        <Map className="w-6 h-6" />
        <span className="text-[10px] font-bold">Explore</span>
      </button>
      <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1 transition-colors text-neutral-400 hover:text-[#4F46E5]">
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-bold">Search</span>
      </button>
      <button onClick={() => handleTabChange("events")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'events' ? 'text-[#4F46E5]' : 'text-neutral-400 hover:text-neutral-600'}`}>
        <Calendar className="w-6 h-6" />
        <span className="text-[10px] font-bold">Events</span>
      </button>
      <button onClick={() => setIsSignInOpen(true)} className="flex flex-col items-center gap-1 transition-colors text-neutral-400 hover:text-neutral-600">
        <User className="w-6 h-6" />
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </div>
    </>
  )
}

