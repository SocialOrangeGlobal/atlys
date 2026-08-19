"use client"

import * as React from "react"
import Link from "next/link"
import { User, Search, ShieldCheck, ChevronDown, Map, Calendar } from "lucide-react"
import { Logo } from "@/components/global/logo"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

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
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'pt-4' : 'pt-6'} ${isHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <header 
        className={`
          flex items-center justify-between transition-all duration-500
          ${isScrolled 
            ? 'w-[95%] max-w-[1200px] h-16 rounded-[32px] bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-6' 
            : 'w-[98%] max-w-[1440px] h-18 md:h-20 rounded-[32px] md:rounded-[40px] bg-white/90 backdrop-blur-2xl border border-white/80 px-6 sm:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          }
        `}
      >
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <Logo />
          </Link>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/90 p-1 rounded-full border border-neutral-200/60 shadow-inner">
            <button
              onClick={() => handleTabChange("explore")}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                activeTab === "explore"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => handleTabChange("events")}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                activeTab === "events"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
              }`}
            >
              Events
            </button>
          </nav>
        </div>

        {/* Center Section - Search Bar (Only visible when scrolled) */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${isScrolled ? 'opacity-100 pointer-events-auto translate-y-0 scale-100' : 'opacity-0 pointer-events-none translate-y-2 scale-95'}`}>
           <div className="hidden lg:flex items-center gap-3 bg-white/90 hover:bg-white border border-neutral-200/90 rounded-full px-5 py-2 shadow-sm transition-colors cursor-pointer group">
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-[#4F46E5] transition-colors" />
              <span className="text-[13px] font-bold text-neutral-600">Where to next?</span>
           </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          
          <div className="hidden lg:flex flex-col items-end cursor-pointer group">
            <div className="flex items-center gap-1.5 text-[#00c853] group-hover:text-[#00b048] transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#00c853]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00c853]">Atlys Promise</span>
            </div>
            <span className="text-[12px] font-bold text-neutral-600 group-hover:text-neutral-900 transition-colors">Visas on time, guaranteed</span>
          </div>

          <div className="flex items-center gap-3">
             <button className="hidden sm:flex items-center gap-1 text-[14px] font-bold text-neutral-800 hover:text-black transition-colors">
               EN-IN <ChevronDown className="w-4 h-4 text-neutral-500" />
             </button>
             
             <button className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] group">
               <span className="text-[14px] font-bold">Sign in</span>
               <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                 <User className="w-3.5 h-3.5 text-white" />
               </div>
             </button>
          </div>
          
        </div>
      </header>
    </div>

    {/* Mobile Bottom Navigation Bar */}
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 px-6 py-3 flex items-center justify-around md:hidden pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <button onClick={() => handleTabChange("explore")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-[#4F46E5]' : 'text-neutral-400 hover:text-neutral-600'}`}>
        <Map className="w-6 h-6" />
        <span className="text-[10px] font-bold">Explore</span>
      </button>
      <button onClick={() => handleTabChange("events")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'events' ? 'text-[#4F46E5]' : 'text-neutral-400 hover:text-neutral-600'}`}>
        <Calendar className="w-6 h-6" />
        <span className="text-[10px] font-bold">Events</span>
      </button>
      <button className={`flex flex-col items-center gap-1 transition-colors text-neutral-400 hover:text-neutral-600`}>
        <User className="w-6 h-6" />
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </div>
    </>
  )
}
