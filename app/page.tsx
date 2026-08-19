import React from "react"
import { Navbar } from "@/components/global/navbar"
import Link from "next/link"
import { Sparkles, Map, ArrowRight, Plane, FileText, CheckCircle2 } from "lucide-react"
import { FilterBar } from "@/components/global/filter-bar"
import { SmoothScroll } from "@/components/global/smooth-scroll"
import { FloatingButtons } from "@/components/global/floating-buttons"
import dynamic from 'next/dynamic'

const CountryGrid = dynamic(() => import('@/components/home/country-grid').then(mod => mod.CountryGrid), { ssr: true })
const EventsGrid = dynamic(() => import('@/components/home/events-grid').then(mod => mod.EventsGrid), { ssr: true })
const Footer = dynamic(() => import('@/components/global/footer').then(mod => mod.Footer), { ssr: true })

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || 'explore';

  return (
    <SmoothScroll>
      <main className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans selection:bg-[#4F46E5] selection:text-white relative overflow-x-clip">
        
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-tr from-[#4F46E5]/10 to-transparent blur-[120px]" />
         <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-[#00d65b]/10 to-transparent blur-[120px]" />
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 mix-blend-multiply" />
      </div>

      <Navbar />

      {/* Massive Hero Section */}
      <section className="relative pt-40 pb-32 px-4 md:px-6 flex flex-col items-center text-center z-30 w-full">
        
        {/* Floating Badges for Engagement */}
        <div className="absolute top-40 left-[15%] hidden lg:flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40 animate-[float_6s_ease-in-out_infinite] rotate-[-5deg]">
           <div className="bg-[#ecfdf5] p-1.5 rounded-xl"><CheckCircle2 className="w-5 h-5 text-[#00d65b]" /></div>
           <div className="flex flex-col text-left">
             <span className="text-[10px] font-bold text-neutral-500 uppercase">Success Rate</span>
             <span className="text-sm font-extrabold text-neutral-900">99.8%</span>
           </div>
        </div>

        <div className="absolute top-52 right-[15%] hidden lg:flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40 animate-[float_7s_ease-in-out_infinite_reverse] rotate-[5deg]">
           <div className="bg-[#EEF2FF] p-1.5 rounded-xl"><Plane className="w-5 h-5 text-[#4F46E5]" /></div>
           <div className="flex flex-col text-left">
             <span className="text-[10px] font-bold text-neutral-500 uppercase">Delivery</span>
             <span className="text-sm font-extrabold text-neutral-900">On Time</span>
           </div>
        </div>

        {/* Hero Content */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm mb-8 hover:scale-105 transition-transform cursor-pointer">
          <Sparkles className="w-4 h-4 text-[#4F46E5]" />
          <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#00d65b]">The smartest way to get a visa</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tighter text-neutral-900 mb-6 max-w-5xl leading-[1.1]">
          Borderless travel <br className="hidden md:block"/> starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#00d65b] to-[#4F46E5] animate-gradient bg-[length:200%_auto]">here.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mb-14">
          Experience the fastest, most reliable way to get your visa. Smart, streamlined applications with guaranteed on-time delivery.
        </p>

        {/* Main Filter Bar */}
        <div className="relative w-full max-w-4xl mx-auto flex justify-center z-40">
          <FilterBar tab={tab as string} />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="px-4 md:px-6 pb-32 relative z-10 mt-12">
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
