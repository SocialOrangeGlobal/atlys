import React from "react"
import { Navbar } from "@/components/global/navbar"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { FilterBar } from "@/components/global/filter-bar"
import { SmoothScroll } from "@/components/global/smooth-scroll"
import { FloatingButtons } from "@/components/global/floating-buttons"
import { HeroCinematicBackground } from "@/components/home/hero-cinematic-background"
import dynamic from 'next/dynamic'

const CountryGrid = dynamic(() => import('@/components/home/country-grid').then(mod => mod.CountryGrid), { ssr: true })
const EventsGrid = dynamic(() => import('@/components/home/events-grid').then(mod => mod.EventsGrid), { ssr: true })
const Footer = dynamic(() => import('@/components/global/footer').then(mod => mod.Footer), { ssr: true })

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || 'explore';
  const isEvents = tab === 'events';

  return (
    <SmoothScroll>
      <main className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans selection:bg-[#4F46E5] selection:text-white relative overflow-x-clip">

        <Navbar />

        {/* Massive Hero Section with Cinematic Background */}
        <section className="relative pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-28 md:pb-36 px-3 sm:px-4 md:px-6 flex flex-col items-center text-center z-30 w-full overflow-hidden">
          <HeroCinematicBackground tab={tab as string} />

          {/* Hero Pill */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md mb-6 sm:mb-8 hover:scale-105 transition-transform cursor-pointer relative z-10">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00d65b]" />
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
              {isEvents ? "Official Travel Partner For Global Events" : "The Smartest & Fastest Way To Get A Visa"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tighter text-white mb-4 sm:mb-6 max-w-5xl leading-[1.12] sm:leading-[1.08] drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)] relative z-10 px-2">
            {isEvents ? (
              <>
                Global events &amp; <br className="hidden sm:block" /> travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#00d65b] to-[#818CF8] animate-gradient bg-[length:200%_auto]">visas.</span>
              </>
            ) : (
              <>
                Borderless travel <br className="hidden sm:block" /> starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#00d65b] to-[#818CF8] animate-gradient bg-[length:200%_auto]">here.</span>
              </>
            )}
          </h1>
          <div className="relative z-10 w-[92vw] max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6 py-2.5 sm:py-3.5">
            <p className="text-xs sm:text-base md:text-lg text-neutral-100 font-medium leading-relaxed drop-shadow-sm">
              {isEvents
                ? "Conferences, world summits, sports & music festivals. Get guaranteed on-time visas delivered before your event date."
                : "Experience the fastest, most reliable way to get your visa. Smart, streamlined applications with guaranteed on-time delivery."}
            </p>
          </div>
        </section>

        {/* Filter Bar — placed OUTSIDE the hero section to avoid overflow clipping on dropdowns */}
        <div className="relative z-[60] w-full max-w-4xl mx-auto flex justify-center px-3 sm:px-4 md:px-6 -mt-14 sm:-mt-20 md:-mt-28 mb-8 sm:mb-10 md:mb-12 drop-shadow-2xl">
          <FilterBar tab={tab as string} />
        </div>

        {/* Bento Grid Section */}
        <section className="px-4 md:px-6 pb-32 relative z-20 pt-4 sm:pt-6 md:pt-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
                {tab === 'events' ? 'Popular Events' : 'Popular Destinations'}
              </h2>
              <Link href="#" className="hidden md:flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-[#4F46E5] transition-colors group px-5 py-2.5 bg-white border border-neutral-200 rounded-full shadow-sm hover:shadow-md">
                View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <React.Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <div key={i} className="w-full h-[320px] bg-neutral-200 animate-pulse rounded-[32px]"></div>
                ))}
              </div>
            }>
              {tab === 'events' ? <EventsGrid /> : <CountryGrid />}
            </React.Suspense>
          </div>
        </section>

        <FloatingButtons />

        <Footer />
      </main>
    </SmoothScroll>
  )
}
