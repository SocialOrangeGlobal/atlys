"use client"

import * as React from "react"
import Link from "next/link"
import { User, Search, ShieldCheck, ChevronDown, Map, Calendar } from "lucide-react"
import { Logo } from "@/components/global/logo"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { SearchModal } from "@/components/modals/search-modal"
import { SignInModal } from "@/components/modals/sign-in-modal"
import { TrackApplicationModal } from "@/components/modals/track-modal"

function NavbarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [mounted, setMounted] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isSignInOpen, setIsSignInOpen] = React.useState(false)
  const [isTrackOpen, setIsTrackOpen] = React.useState(false)
  const [user, setUser] = React.useState<{ name: string; phone: string } | null>(null)

  const syncUser = React.useCallback(() => {
    try {
      const saved = localStorage.getItem("gg_user_session")
      if (saved) {
        setUser(JSON.parse(saved))
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [])

  React.useEffect(() => {
    setMounted(true)
    syncUser()

    const handleAuth = () => syncUser()
    window.addEventListener("gg_auth_changed", handleAuth)
    return () => window.removeEventListener("gg_auth_changed", handleAuth)
  }, [syncUser])

  let activeTab = searchParams.get('tab') || 'explore'
  if (pathname.startsWith('/events')) {
    activeTab = 'events'
  } else if (pathname.startsWith('/visa')) {
    activeTab = 'explore'
  }

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
        // On home page, keep navbar visible at all times, smoothly transitioning to compact frosted pill
        setIsHidden(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const effectiveScrolled = mounted && isScrolled
  const effectiveHidden = mounted && isHidden

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
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${effectiveScrolled ? 'pt-2.5 sm:pt-4' : 'pt-3 sm:pt-6'} ${effectiveHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <header
          className={`
          flex items-center justify-between transition-all duration-500 relative
          ${effectiveScrolled
              ? 'w-[96%] max-w-[1240px] h-15 sm:h-16 rounded-[28px] sm:rounded-[32px] bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-3.5 sm:px-5 md:px-6 lg:px-8'
              : 'w-[98%] max-w-[1440px] h-16 sm:h-18 md:h-20 rounded-[28px] sm:rounded-[32px] md:rounded-[40px] bg-white/90 backdrop-blur-2xl border border-white/80 px-3.5 sm:px-5 md:px-6 lg:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
            }
        `}
        >
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 shrink-0">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>

            {/* Nav Tabs (Hides on laptop when scrolled to make room for Search bar) */}
            <nav className={`items-center gap-1 bg-neutral-100/90 p-1 rounded-full border border-neutral-200/60 shadow-inner transition-all duration-300 ${effectiveScrolled ? 'hidden xl:flex' : 'hidden md:flex'
              }`}>
              <button
                onClick={() => handleTabChange("explore")}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${activeTab === "explore"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                  }`}
              >
                Explore
              </button>
              <button
                onClick={() => handleTabChange("events")}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${activeTab === "events"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                  }`}
              >
                Events
              </button>
            </nav>
          </div>

          {/* Center Section - Search Bar (Visible when scrolled, interactive pill with brand theme & shortcuts) */}
          <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-20 pointer-events-none ${effectiveScrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
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
            {/* Quick Search Trigger (Visible when NOT scrolled on desktop) */}
            {!effectiveScrolled && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-200/60 text-neutral-600 hover:text-neutral-900 transition-all text-[12px] font-bold shrink-0 group hover:border-[#4F46E5]/30 active:scale-95"
                title="Search destinations & events (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#4F46E5] transition-colors" />
                <span className="hidden xl:inline text-neutral-600 group-hover:text-neutral-900">Search</span>
                <kbd className="text-[10px] font-extrabold text-neutral-400 bg-white px-1.5 py-0.5 rounded border border-neutral-200 group-hover:border-[#4F46E5]/30">
                  ⌘K
                </kbd>
              </button>
            )}

            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Mobile/Tablet Search Button (Compact & responsive on mobile & tablet) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex lg:hidden items-center justify-center w-8 h-8 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 hover:text-[#4F46E5] transition-all shrink-0 active:scale-90"
                aria-label="Search destinations"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button className="hidden xl:flex items-center gap-1 text-[13px] sm:text-[14px] font-bold text-neutral-800 hover:text-black transition-colors shrink-0">
                EN-IN <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>
              {/* Track Visa Action (Visible on large desktop to keep tablet navbar uncluttered) */}
              <button
                type="button"
                onClick={() => setIsTrackOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-[12px] sm:text-[13px] font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-[#00d65b] animate-pulse" />
                <span>Track Visa</span>
              </button>

              {/* Sign in / Profile Button */}
              {user ? (
                <div className="flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200/80 p-1 pl-3 rounded-full transition-all border border-neutral-200/80">
                  <span className="text-[12px] sm:text-[13px] font-bold text-neutral-800 truncate max-w-[90px]">{user.name}</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("gg_user_session")
                      window.dispatchEvent(new Event("gg_auth_changed"))
                    }}
                    title="Sign Out"
                    className="w-6 h-6 rounded-full bg-white text-neutral-600 hover:text-red-600 flex items-center justify-center text-[10px] font-bold shadow-xs cursor-pointer ml-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSignInOpen(true)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-neutral-900 hover:bg-black text-white rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] group shrink-0 whitespace-nowrap active:scale-95 cursor-pointer"
                >
                  <span className="text-[12px] sm:text-[14px] font-bold">Sign in</span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              )}
            </div>

          </div>
        </header>
      </div>

      {/* Search, Track & Sign In Modals */}
      <SearchModal isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      <SignInModal isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
      <TrackApplicationModal isOpen={isTrackOpen} setIsOpen={setIsTrackOpen} />

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 px-4 py-2.5 flex items-center justify-around md:hidden pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <button onClick={() => handleTabChange("explore")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-[#4F46E5]' : 'text-neutral-400 hover:text-neutral-600'}`}>
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-bold">Explore</span>
        </button>
        <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1 transition-colors text-neutral-400 hover:text-[#4F46E5]">
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold">Search</span>
        </button>
        <button onClick={() => setIsTrackOpen(true)} className="flex flex-col items-center gap-1 transition-colors text-neutral-400 hover:text-[#00d65b]">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-bold">Track</span>
        </button>
        <button onClick={() => handleTabChange("events")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'events' ? 'text-[#4F46E5]' : 'text-neutral-400 hover:text-neutral-600'}`}>
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Events</span>
        </button>
        <button onClick={() => setIsSignInOpen(true)} className="flex flex-col items-center gap-1 transition-colors text-neutral-400 hover:text-neutral-600">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">{user ? "Account" : "Sign In"}</span>
        </button>
      </div>
    </>
  )
}

export function Navbar() {
  return (
    <React.Suspense fallback={null}>
      <NavbarContent />
    </React.Suspense>
  )
}
