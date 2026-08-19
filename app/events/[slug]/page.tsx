"use client"

import { Navbar } from "@/components/global/navbar"
import { Footer } from "@/components/global/footer"
import Image from "next/image"
import { EVENTS } from "@/lib/events"
import { notFound, useParams } from "next/navigation"
import { Clock, Zap, ShieldCheck, Minus, Plus, Calendar, ArrowRight, Users, FileText, Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React, { useState } from "react"

export default function EventVisaPage() {
  const params = useParams()
  const slug = params.slug as string
  const event = EVENTS.find(e => e.slug === slug)

  if (!event) return notFound()

  const displayName = event.country.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')

  const [travellers, setTravellers] = useState(1)
  const [isFast, setIsFast] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("info")

  React.useEffect(() => {
    const sections = ["info", "documents", "process", "reviews", "faqs"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(`[data-id="${activeSection}"]`) as HTMLElement
      if (activeEl) {
        const containerLeft = scrollContainerRef.current.getBoundingClientRect().left
        const containerWidth = scrollContainerRef.current.offsetWidth
        const elLeft = activeEl.getBoundingClientRect().left
        const elWidth = activeEl.offsetWidth
        
        const scrollPos = scrollContainerRef.current.scrollLeft + (elLeft - containerLeft) - (containerWidth / 2) + (elWidth / 2)
        
        scrollContainerRef.current.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        })
      }
    }
  }, [activeSection])

  const navItems = [
    { id: "info", label: "Visa Info" },
    { id: "documents", label: "Documents" },
    { id: "process", label: "Visa Process" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-clip">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36">
        <div className="relative w-full h-auto min-h-[440px] sm:min-h-[500px] md:min-h-[560px] py-8 sm:py-14 md:py-20 px-3 sm:px-6 md:px-10 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-[#111] overflow-hidden flex flex-col items-center justify-center text-white shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover opacity-30 mix-blend-overlay"
              priority
            />
          </div>

          {/* Top Badge */}
          <div className="relative sm:absolute top-auto sm:top-6 left-auto sm:left-1/2 sm:-translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full py-1.5 px-3 sm:px-4 border border-white/15 w-max max-w-[92vw] shadow-md mb-3 sm:mb-0">
            <div className="flex -space-x-2 shrink-0">
              {event.avatars.slice(0, 3).map((av, i) => (
                <img key={i} src={av} alt="avatar" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black object-cover" />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap text-white/90">{event.goingCount} going for this event</span>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl px-2 sm:px-4 mt-1 sm:mt-8 md:mt-10">
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-serif mb-1.5 sm:mb-2 tracking-tight">
              <span className="text-white/80 font-normal block text-xs sm:text-base md:text-2xl mb-0.5 sm:mb-1 uppercase tracking-widest">{displayName} visa for</span>
              <span className="text-[#00d65b] font-bold block text-xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-tight drop-shadow-md">{event.title}</span>
            </h1>

            <p className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-neutral-300 mt-2 sm:mt-4 md:mt-6">
              Happening on <span className="text-white font-bold">{event.dateDisplay}, 2026</span>
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-1 sm:gap-6 md:gap-12 mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-5 md:pt-6 border-t border-white/15 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto text-center">
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-0.5 sm:mb-1">Valid</p>
                <p className="font-bold text-xs sm:text-sm md:text-base">1 YEARS</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-0.5 sm:mb-1">Purpose</p>
                <p className="font-bold text-xs sm:text-sm md:text-base">TOURISM</p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-0.5 sm:mb-1">Max Stay</p>
                <p className="font-bold text-xs sm:text-sm md:text-base">90 DAYS</p>
              </div>
            </div>

            <p className="font-semibold text-[11px] sm:text-xs md:text-sm text-neutral-300 mt-4 sm:mt-6 md:mt-8">
              Get visa <span className="text-white font-bold">{event.daysBeforeVisa} days</span> before event
            </p>

            <a href="#documents" className="mt-3 sm:mt-4 w-full sm:w-auto inline-block">
              <button className="w-full sm:w-auto bg-white text-black font-bold px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-full hover:scale-105 transition-all text-xs sm:text-sm md:text-base shadow-xl">
                Check Required Documents
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. STICKY SUB-NAVIGATION */}
      <div className="sticky top-0 z-[60] bg-white/95 backdrop-blur-xl border-b border-neutral-200/80 shadow-sm mt-4 md:mt-8 w-full transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-13 sm:h-14 md:h-16">
          <nav ref={scrollContainerRef} className="flex items-center gap-4 sm:gap-6 md:gap-8 h-full overflow-x-auto hide-scrollbar w-full md:w-auto pr-4 md:pr-0 scroll-smooth">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                className={`text-xs sm:text-sm h-full flex items-center whitespace-nowrap shrink-0 transition-colors ${
                  activeSection === item.id 
                    ? "font-bold text-[#4F46E5] border-b-2 border-[#4F46E5]" 
                    : "font-medium text-neutral-500 hover:text-black"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-neutral-500 uppercase">ETA Guaranteed</span>
              <span className="text-xs font-bold text-neutral-900">in exactly 3 days</span>
            </div>
            <button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg">
              Start Application
            </button>
          </div>
        </div>
      </div>

      {/* 3. VISA INFORMATION SPLIT LAYOUT */}
      <section id="info" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-7">
            {/* Partner Banner */}
            <div className="bg-[#F8F8F8] rounded-[20px] sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 md:mb-12 border border-neutral-100">
              <div>
                <p className="font-bold text-sm sm:text-base text-neutral-900">We partnered with leading travel brands</p>
                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 sm:mt-1">to deliver visas faster, simpler, and with higher approval rates.</p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <img src="/mmt-logo.avif" alt="MakeMyTrip" className="h-5 sm:h-6 w-auto object-contain mix-blend-multiply" />
                <img src="/bluchip-text.avif" alt="IndiGo" className="h-5 sm:h-6 w-auto object-contain" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-2">Visa Information</h2>
            <p className="text-neutral-500 font-medium text-sm sm:text-base mb-6 sm:mb-10">A 100% online visa application process</p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-[#F8F8F8] rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex sm:flex-col justify-between sm:justify-between items-center sm:items-start min-h-[90px] sm:min-h-[160px] md:min-h-[180px] border border-neutral-100/80">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 order-2 sm:order-1" />
                <div className="order-1 sm:order-2">
                  <p className="text-[11px] sm:text-xs font-bold text-neutral-500 mb-0.5 sm:mb-1">Length of Stay</p>
                  <p className="font-extrabold text-base sm:text-lg">90 days</p>
                </div>
              </div>
              <div className="bg-[#F8F8F8] rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex sm:flex-col justify-between sm:justify-between items-center sm:items-start min-h-[90px] sm:min-h-[160px] md:min-h-[180px] border border-neutral-100/80">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 order-2 sm:order-1" />
                <div className="order-1 sm:order-2">
                  <p className="text-[11px] sm:text-xs font-bold text-neutral-500 mb-0.5 sm:mb-1">Validity</p>
                  <p className="font-extrabold text-base sm:text-lg">1 years</p>
                </div>
              </div>
              <div className="bg-[#F8F8F8] rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex sm:flex-col justify-between sm:justify-between items-center sm:items-start min-h-[90px] sm:min-h-[160px] md:min-h-[180px] border border-neutral-100/80">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 order-2 sm:order-1" />
                <div className="order-1 sm:order-2">
                  <p className="text-[11px] sm:text-xs font-bold text-neutral-500 mb-0.5 sm:mb-1">Entry</p>
                  <p className="font-extrabold text-base sm:text-lg">Multiple</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Pricing Card) */}
          <div className="lg:col-span-5 relative w-full">
            <div className="lg:sticky lg:top-24 z-20">
              <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">

                {/* Top Tabs */}
                <div className="flex items-stretch border-b border-neutral-100 bg-neutral-50/50 cursor-pointer text-center">
                  <div onClick={() => setIsFast(false)} className={`flex-1 py-2.5 px-2 sm:py-3 sm:px-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold transition-colors ${!isFast ? 'text-[#4F46E5] bg-white border-b-2 border-[#4F46E5]' : 'text-neutral-500 hover:bg-neutral-100/50'}`}>
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 21st Aug
                  </div>
                  <div onClick={() => setIsFast(true)} className={`flex-1 py-2.5 px-2 sm:py-3 sm:px-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold transition-colors border-l border-neutral-100 ${isFast ? 'text-[#4F46E5] bg-white border-b-2 border-[#4F46E5]' : 'text-neutral-500 hover:bg-neutral-100/50'}`}>
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Get visa {event.daysBeforeVisa} days before event
                  </div>
                </div>

                {/* Pricing Content */}
                <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-neutral-100 text-sm sm:text-base">
                    <div className="flex items-center gap-2 sm:gap-3 font-bold">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" /> Travellers
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button onClick={() => setTravellers(Math.max(1, travellers - 1))} className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-4 text-center">{travellers}</span>
                      <button onClick={() => setTravellers(travellers + 1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-neutral-100 text-sm sm:text-base">
                    <div className="flex items-center gap-2 sm:gap-3 font-bold shrink-0 pr-2">
                      <div className="w-5 flex justify-center"><span className="text-base sm:text-lg">🏛️</span></div> Government Fees
                    </div>
                    <span className="font-bold">₹{1 * travellers}</span>
                  </div>

                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-neutral-100 text-sm sm:text-base">
                    <div className="flex items-center gap-2 sm:gap-3 font-bold text-[#4F46E5] shrink-0 pr-2">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> Atlys Fees
                    </div>
                    <span className="font-bold text-[#4F46E5]">₹{(isFast ? 5888 : 3528) * travellers}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2">
                    <div className="flex items-center gap-2 sm:gap-3 font-extrabold text-sm sm:text-base md:text-lg shrink-0 pr-2">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" /> Total Amount
                    </div>
                    <span className="font-extrabold text-base sm:text-lg md:text-xl truncate">₹{((isFast ? 5889 : 3529) * travellers).toLocaleString()}</span>
                  </div>

                  <button className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md hover:shadow-lg mt-2 text-sm sm:text-base">
                    Start Application
                  </button>
                </div>
              </div>

              {/* Atlys Protect Promo */}
              <div className="mt-4 bg-[#1e293b] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 text-white flex items-start gap-3 sm:gap-4 shadow-sm">
                <img src="/sheild.avif" alt="Shield" className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm sm:text-base">Atlys Protect</h4>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Included</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Up to <strong className="text-white">$100</strong> ticket refund if a visa delay makes you miss the event.
                  </p>
                </div>
              </div>

              {/* Have Queries Contact Box */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-neutral-200 rounded-[20px] p-4 gap-3 sm:gap-4 shadow-sm">
                <div>
                  <p className="text-xs sm:text-sm font-bold">Have Queries?</p>
                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">Documents, process, price, etc.</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://wa.me/+919689002372?text=Hi,%20Need%20assistance%20for%20South Africa%20visa%20application" className="flex h-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ease-in-out gap-2 border w-8 shrink-0 text-[#25D366] border-[#25D366] hover:bg-[#25D366] hover:text-white" target="_blank" aria-label="Chat on WhatsApp">
                    <svg fill="none" height="16" viewBox="0 0 24 25" width="24"><g clipPath="url(#clip0_15320_4260)"><path clipRule="evenodd" d="M20.5031 3.50437C18.2473 1.24567 15.2471 0.00114597 12.0504 0C5.4634 0 0.102564 5.36027 0.100272 11.949C0.099126 14.0553 0.649764 16.1111 1.69546 17.9229L0 24.1157L6.33491 22.4541C8.0802 23.4064 10.0455 23.9077 12.0453 23.9083H12.0504C18.6363 23.9083 23.9977 18.5475 24 11.9587C24.0011 8.76553 22.7595 5.76365 20.5031 3.50494V3.50437ZM12.0504 21.8903H12.0464C10.2644 21.8897 8.51627 21.4107 6.991 20.5059L6.62828 20.2905L2.86893 21.2766L3.87223 17.6112L3.63615 17.2353C2.64203 15.6539 2.1166 13.8261 2.11775 11.9496C2.12004 6.47357 6.57556 2.01805 12.0545 2.01805C14.7073 2.01919 17.201 3.05343 19.0763 4.9311C20.9517 6.8082 21.9837 9.30413 21.9825 11.9576C21.9802 17.4342 17.5247 21.8897 12.0504 21.8897V21.8903ZM17.4983 14.4518C17.1998 14.3023 15.7319 13.5803 15.4579 13.4806C15.1841 13.3809 14.9853 13.3311 14.7864 13.6301C14.5876 13.9293 14.0152 14.6019 13.841 14.8007C13.6668 15.0001 13.4926 15.0248 13.1941 14.8752C12.8956 14.7257 11.9335 14.4105 10.7927 13.3935C9.9052 12.6016 9.3058 11.6241 9.13167 11.325C8.95747 11.0259 9.11333 10.8643 9.26227 10.7159C9.39633 10.5819 9.5608 10.367 9.71033 10.1928C9.85993 10.0186 9.9092 9.89373 10.0089 9.69487C10.1086 9.49547 10.0587 9.32133 9.98427 9.17173C9.90973 9.0222 9.31273 7.55247 9.06347 6.95487C8.82107 6.37273 8.57473 6.4518 8.39193 6.44206C8.21773 6.43346 8.01893 6.43175 7.81953 6.43175C7.62013 6.43175 7.29693 6.50623 7.02307 6.80533C6.7492 7.1044 5.97794 7.82693 5.97794 9.29607C5.97794 10.7652 7.04773 12.1857 7.19727 12.3851C7.3468 12.5845 9.30293 15.6001 12.2979 16.8939C13.0102 17.2015 13.5665 17.3855 14.0003 17.523C14.7154 17.7505 15.3663 17.7184 15.8808 17.6416C16.4544 17.5557 17.6473 16.9191 17.896 16.2217C18.1447 15.5244 18.1447 14.9262 18.0702 14.8019C17.9957 14.6775 17.7963 14.6025 17.4978 14.4529L17.4983 14.4518Z" fill="currentColor" fillRule="evenodd"></path></g><defs><clipPath id="clip0_15320_4260"><rect fill="white" height="24.1333" width="24"></rect></clipPath></defs></svg>
                  </a>
                  <div className="border border-[#4F46E5] text-[#4F46E5] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                    +91 22-6423-1551
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. DOCUMENTS SECTION */}
      <section id="documents" className="bg-[#FAFAFA] py-14 sm:py-16 md:py-24 scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1440px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-6 sm:mb-8 text-center">Only 1 document required</h2>

          <div className="flex flex-row justify-center items-center gap-6 sm:gap-12 mb-8 sm:mb-10 border-b border-neutral-200 pb-6 sm:pb-8 max-w-sm sm:max-w-md mx-auto text-center">
            <div>
              <p className="font-bold text-base sm:text-lg text-neutral-900">03 MIN</p>
              <p className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">FASTEST TIME TAKEN<br />TO APPLY</p>
            </div>
            <div className="w-px h-10 sm:h-12 bg-neutral-200 shrink-0" />
            <div>
              <p className="font-bold text-base sm:text-lg text-neutral-900">07 MIN</p>
              <p className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">AVG. TIME TAKEN<br />TO APPLY</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex flex-col items-center bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 mb-8 sm:mb-10 w-full max-w-[280px] sm:max-w-[320px] shadow-sm border border-neutral-100">
              <div className="w-28 h-36 sm:w-32 sm:h-44 mb-4 sm:mb-6 relative">
                <Image src="https://media.atlys.com/b2c/clp/version-3/passport.png?tr=orig" alt="Passport" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
              </div>

              <h4 className="font-bold text-base sm:text-lg mb-1">Passport</h4>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">Scan or Upload. We handle the rest</p>
            </div>
          </div>

          <div className="text-center">
            <button className="w-full sm:w-auto bg-white border-2 border-black text-black font-bold px-8 sm:px-10 py-3.5 rounded-full hover:bg-neutral-50 transition-all text-xs sm:text-sm shadow-sm">
              Start Application
            </button>
          </div>
        </div>
      </section>

      {/* 5. ETA BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-16">
        <div className="w-full max-w-[1440px] mx-auto bg-[#111] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] py-10 px-5 sm:py-14 sm:px-8 md:py-20 md:px-12 text-center text-white shadow-xl">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3 sm:mb-4">
            Get your visa on or before <span className="text-[#00d65b]">21st Aug, 11:05 pm</span>
          </h2>
          <p className="text-neutral-400 font-medium text-xs sm:text-sm md:text-base max-w-lg mx-auto">No ambiguity. Know exactly when your visa will arrive before you apply.</p>
        </div>
      </section>

      {/* 6. THE VISA PROCESS */}
      <section id="process" className="bg-white py-14 sm:py-16 md:py-24 scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1440px] mx-auto overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-8 sm:mb-12 text-center md:text-left md:ml-6 lg:ml-10">The visa process</h2>

          {/* Desktop View (Winding Path Image) */}
          <div className="hidden md:block relative w-full max-w-[1000px] mx-auto aspect-[16/8]">
            <Image src="/visa-process-evisas.avif" alt="Winding Process Path" fill sizes="100vw" className="object-contain object-center" />
          </div>

          {/* Mobile View (Vertical Stack) */}
          <div className="md:hidden space-y-6 sm:space-y-8 relative z-10 pl-2 max-w-md mx-auto">
            <div className="absolute top-4 bottom-4 left-[23px] w-px border-l-2 border-dashed border-neutral-200" />

            {[
              {
                step: 1,
                title: "Provide documents to submit application.",
                desc: "We handle the rest.",
                icon: <div className="w-12 h-16 bg-neutral-100 rounded flex items-center justify-center border border-neutral-200"><Users className="w-5 h-5 text-neutral-400" /></div>
              },
              {
                step: 2,
                title: "Atlys thoroughly review everything",
                desc: "No scope for error.",
                icon: <div className="w-12 h-12 rounded-full border-[3px] border-blue-500 flex items-center justify-center font-bold text-xs bg-white text-blue-600">7320</div>
              },
              {
                step: 3,
                title: "We submit application to the embassy",
                desc: "We proactively follow up to provide constant updates",
                icon: <div className="bg-blue-50 p-2 rounded text-[10px] text-blue-800 font-medium w-full">Visa is being <span className="font-bold">processed</span></div>
              },
              {
                step: 4,
                title: "Visa delivered on time",
                desc: "Or before time.",
                icon: <FileText className="w-10 h-10 text-neutral-300" strokeWidth={1} />
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 sm:gap-6 relative">
                <div className="w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg shrink-0 z-10 relative mt-1">
                  {item.step}
                </div>
                <div className="flex-1 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-neutral-100">
                  <h4 className="font-bold text-sm sm:text-base leading-snug mb-1 text-neutral-900">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mb-3 sm:mb-4 pr-2">{item.desc}</p>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-24 pb-20 sm:pb-24 md:pb-32 bg-white">
        <div className="max-w-[1000px] mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 text-center mb-8 sm:mb-12 md:mb-16">Visa application made simple and reliable</h2>

          <div className="bg-[#F8F8F8] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] p-4 sm:p-8 md:p-12 relative overflow-hidden border border-neutral-100">
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center font-bold border-b border-neutral-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
              <div className="col-span-6"></div>
              <div className="col-span-3 text-center text-sm sm:text-lg md:text-xl text-neutral-900 font-extrabold">atlys<span className="text-[#4F46E5]">✈</span></div>
              <div className="col-span-3 text-center text-xs sm:text-base text-neutral-400 font-medium">Others</div>
            </div>

            {[
              "Real-time tracking of your visa",
              "Precise ETA, no guesswork",
              "Transparent pricing; no hidden fees",
              "100% digital process"
            ].map((feature, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 sm:gap-4 items-center py-3.5 sm:py-5 border-b border-neutral-200/60 last:border-0 relative z-10">
                <div className="col-span-6 text-xs sm:text-sm font-medium text-neutral-700 pr-1 sm:pr-2 leading-tight sm:leading-normal">{feature}</div>
                <div className="col-span-3 flex justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#00d65b] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="col-span-3 flex justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 text-red-400 flex items-center justify-center">
                    <span className="text-base sm:text-lg leading-none mb-0.5 font-bold">×</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Black Promo Banner */}
          <div className="w-full max-w-[1000px] mx-auto bg-[#111] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] py-10 px-5 sm:py-14 sm:px-8 md:py-16 md:px-8 text-center text-white mt-8 sm:mt-12 shadow-2xl">
            <div className="flex justify-center mb-4 sm:mb-6">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3 sm:mb-4">
              Visa not on time? <span className="text-[#00d65b]">No charge.</span>
            </h2>
            <p className="text-neutral-400 font-medium text-xs sm:text-sm md:text-base max-w-md mx-auto">When we don't keep our promise, we don't expect anything back.</p>
          </div>
        </div>
      </section>

      {/* 8. REVIEWS */}
      <section id="reviews" className="bg-[#111] text-white py-14 sm:py-16 md:py-24 scroll-mt-20">
        <div className="w-full max-w-[1440px] mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <svg className="w-5 h-8 sm:w-6 sm:h-10 text-neutral-400" viewBox="0 0 24 40" fill="currentColor"><path d="M10,0 C10,0 20,10 20,20 C20,30 10,40 10,40 C10,40 15,30 15,20 C15,10 10,0 10,0 Z" /></svg>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-tight">4.6 Rating Across All Platforms</h2>
            <svg className="w-5 h-8 sm:w-6 sm:h-10 text-neutral-400 rotate-180" viewBox="0 0 24 40" fill="currentColor"><path d="M10,0 C10,0 20,10 20,20 C20,30 10,40 10,40 C10,40 15,30 15,20 C15,10 10,0 10,0 Z" /></svg>
          </div>
          <p className="text-neutral-400 font-medium text-xs sm:text-sm md:text-base mb-6 sm:mb-8">Highest rating for any visa platform in India</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-16">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800"><span className="text-green-500">★</span> Trustpilot</div>
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">🍎 App Store</div>
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">▶ Google Play</div>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 hide-scrollbar snap-x px-2 sm:px-4 md:px-0">
            {[
              { init: "PK", name: "Pradeep Khandelwal", date: "20th Apr 26", text: "Within factions of minutes, I received the South African visa . You are super professional Thank you.", platform: "App Store", color: "bg-blue-100 text-blue-600" },
              { init: "UZ", name: "ucmaspune zoom", date: "5th Mar 26", text: "excellent initiative. My South Africa visa was a breeze....did not know things could be that easy. So was Ethiopia", platform: "Google Play", color: "bg-green-100 text-green-600" },
              { init: "SA", name: "Sankathy", date: "22nd Feb 26", text: "Atlys has upped their game by providing backend support on call and also emergency support in case of any issues with visa documents. Have used their services for gettin...", platform: "App Store", color: "bg-blue-100 text-blue-600" },
              { init: "BP", name: "Bijoy Peter Alappattu", date: "12th Jan 26", text: "I was trying south africa visa to attend a conference. Several weeks tried through VFS and Akbar Travels and was not getting processed. Finally approached Atlys and the...", platform: "Trustpilot", color: "bg-green-100 text-green-600" }
            ].map((rev, i) => (
              <div key={i} className="min-w-[260px] sm:min-w-[280px] w-[260px] sm:w-[280px] md:min-w-[320px] md:w-[320px] text-left border border-neutral-800 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 snap-center bg-[#181818] flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${rev.color}`}>{rev.init}</div>
                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-neutral-300">{rev.platform === 'App Store' ? 'A' : rev.platform === 'Google Play' ? 'G' : '★'}</div>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base mb-1.5 sm:mb-2 truncate text-white">{rev.name}</h4>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#00d65b] text-xs sm:text-sm">★</span>)}
                    </div>
                    <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">{rev.text}</p>
                </div>
                {rev.text.endsWith("...") && <button className="text-blue-400 text-xs sm:text-sm font-bold mt-3 sm:mt-4 text-left hover:underline">read more</button>}
              </div>
            ))}
            <div className="w-2 shrink-0 md:hidden" />
          </div>
        </div>
      </section>

      {/* 9. GOVERNMENT RELATIONS */}
      <section className="py-14 sm:py-16 md:py-24 pb-20 sm:pb-24 md:pb-32 bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1440px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-2 sm:mb-4">Government Relations</h2>
          <p className="text-neutral-500 font-medium text-xs sm:text-sm md:text-base mb-8 sm:mb-12 md:mb-16">Our atlys ambassadors forming government relations</p>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 hide-scrollbar snap-x px-2 sm:px-4 md:px-0 justify-start md:justify-center">
            {[
              { img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=800&fit=crop", name: "Achal Uppal", title: "Atlys Ambassador" },
              { img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=800&fit=crop", name: "H.E. Marje Luup", title: "Ambassador of Estonia" },
              { img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&h=800&fit=crop", name: "Mohak Nahta", title: "CEO" },
            ].map((gov, i) => (
              <div key={i} className="min-w-[240px] sm:min-w-[280px] md:min-w-[360px] snap-center shrink-0">
                <div className="w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-[20px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden mb-3 sm:mb-4 md:mb-6 relative shadow-md">
                  <Image src={gov.img} alt={gov.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover w-auto h-auto" />
                </div>
                <h4 className="font-bold text-base sm:text-lg text-neutral-900">{gov.name}</h4>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium">{gov.title}</p>
              </div>
            ))}
            <div className="w-2 shrink-0 md:hidden" />
          </div>
        </div>
      </section>

      {/* 10. FAQS SECTION */}
      <section id="faqs" className="border-t border-neutral-100 bg-white py-14 sm:py-16 md:py-24 scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 tracking-tight mb-2 sm:mb-4">FAQs</h2>
            <p className="text-xs sm:text-sm text-neutral-500">Everything you need to know about the {event.title} visa</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {[
              {
                q: `How long does the ${displayName} visa take?`,
                a: `With Atlys, your visa is typically approved within 2 business days. We recommend applying at least a week before ${event.title} to account for peak event seasons.`
              },
              {
                q: `What is the validity of the ${displayName} visa?`,
                a: `The visa is valid for 90 days from the date of issue. You can easily stay for the entire duration of the event.`
              },
              {
                q: `What documents do I need to attend the event?`,
                a: `For the visa, you only need your Passport and a Photo. You may also need to carry your event tickets when passing through immigration.`
              },
              {
                q: `What happens if my visa gets rejected before the event?`,
                a: `Atlys has a 99.8% approval rate. In the rare case of rejection, we offer a full refund of our service fee.`
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-neutral-200/80 py-1">
                <AccordionTrigger className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 hover:text-[#4F46E5] data-[state=open]:text-[#4F46E5] text-left transition-colors">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-6">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  )
}
