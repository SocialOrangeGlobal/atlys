"use client"

import { Navbar } from "@/components/global/navbar"
import { Footer } from "@/components/global/footer"
import Image from "next/image"
import { CARDS } from "@/lib/data"
import { notFound, useParams } from "next/navigation"
import { Check, Clock, ShieldCheck, Zap, FileText, Star, ArrowRight, Users, Globe2, ChevronRight, Sparkles, BadgeCheck } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SignInModal } from "@/components/modals/sign-in-modal"
import React from "react"

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 1800
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Fade-in wrapper ─── */
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── Stagger children ─── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
}

export default function VisaPage() {
  const params = useParams()
  const countrySlug = params.country as string
  const country = CARDS.find(c => c.slug === countrySlug)
  if (!country) return notFound()

  const displayName = country.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')

  const [isSignInOpen, setIsSignInOpen] = React.useState(false)

  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1.05, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Active nav tracking
  const [activeSection, setActiveSection] = React.useState("visa-info")
  React.useEffect(() => {
    const sections = ["visa-info", "process", "requirements", "trust", "faqs"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
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
    { id: "visa-info", label: "Visa Info" },
    { id: "process", label: "Process" },
    { id: "requirements", label: "Requirements" },
    { id: "trust", label: "Trust" },
    { id: "faqs", label: "FAQs" },
  ]

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-clip selection:bg-[#4F46E5] selection:text-white">
      <Navbar />

      {/* ╔══════════════════════════════════════════════════════╗
          ║                   HERO SECTION                      ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative w-full min-h-[560px] md:min-h-[640px] flex flex-col items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={country.image}
            alt={country.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Cinematic Dark Overlays for maximum text & CTA contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full flex flex-col items-center text-center text-white px-4 sm:px-6 my-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-3.5 sm:mb-5 shadow-lg"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d65b] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d65b]" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-white/90">Visas on time, guaranteed</span>
          </motion.div>

          {/* Flag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl mb-3 sm:mb-4"
          >
            <img src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`} alt={displayName} className="w-full h-full object-cover" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2.5 sm:mb-3 drop-shadow-2xl"
          >
            {displayName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Visa</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg font-medium text-white/80 mb-5 sm:mb-7 max-w-xl px-4"
          >
            Get your visa approved in as fast as 2 days. AI-powered, hassle-free.
          </motion.p>

          {/* Quick Stats Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-flex flex-row items-center justify-center gap-6 sm:gap-10 md:gap-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-full px-6 sm:px-10 md:px-12 py-3 sm:py-3.5 mb-7 sm:mb-9 shadow-2xl w-auto max-w-xl mx-auto"
          >
            <div className="text-center">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60">Type</p>
              <p className="font-extrabold text-sm sm:text-base md:text-lg text-white">{country.type}</p>
            </div>
            <div className="w-px h-6 sm:h-7 bg-white/20 shrink-0" />
            <div className="text-center">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60">Valid</p>
              <p className="font-extrabold text-sm sm:text-base md:text-lg text-white">{country.valid || "90 Days"}</p>
            </div>
            <div className="w-px h-6 sm:h-7 bg-white/20 shrink-0" />
            <div className="text-center">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60">Price</p>
              <p className="font-extrabold text-sm sm:text-base md:text-lg text-white">{country.fees || "Free"}</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            type="button"
            onClick={() => setIsSignInOpen(true)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-900 font-extrabold text-base sm:text-lg rounded-full px-8 sm:px-10 py-3.5 sm:py-4 shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.55)] transition-all cursor-pointer border border-white/40 mb-4"
          >
            <span>Start Application</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║               STICKY SUB-NAVIGATION                 ║
          ╚══════════════════════════════════════════════════════╝ */}
      <div className="sticky top-0 z-[60] bg-white/95 backdrop-blur-xl border-b border-neutral-200/80 w-full shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-6 py-2.5 px-4 sm:px-6">
          <div ref={scrollContainerRef} className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto hide-scrollbar scroll-smooth">
            {navItems.map(item => (
              <a
                key={item.id}
                data-id={item.id}
                href={`#${item.id}`}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex flex-col text-right pr-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 leading-tight">Total Price</span>
              <span className="text-sm font-extrabold text-neutral-900 leading-tight">{country.fees || "₹2,500"}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsSignInOpen(true)}
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Start Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">

        {/* ╔══════════════════════════════════════════════════════╗
            ║           VISA INFORMATION COMPARISON               ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section id="visa-info" className="scroll-mt-20">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Why Global Getaway
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">Visa Information</h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto">Clear, transparent pricing. No hidden fees, no surprises.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Global Getaway Card */}
            <FadeIn delay={0.1}>
              <div className="relative bg-white rounded-[32px] border-2 border-[#4F46E5]/20 p-8 shadow-[0_0_0_1px_rgba(79,70,229,0.05),0_20px_60px_-10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_0_1px_rgba(79,70,229,0.1),0_30px_80px_-10px_rgba(79,70,229,0.15)] transition-all duration-500 group">
                {/* Recommended badge */}
                <div className="absolute -top-4 left-8 px-4 py-1.5 bg-[#4F46E5] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" /> Recommended
                </div>

                <div className="flex items-center gap-3 mb-8 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-extrabold text-sm shadow-md">GG</div>
                  <div>
                    <h3 className="font-extrabold text-lg text-neutral-900">Global Getaway</h3>
                    <p className="text-xs text-neutral-500 font-medium">Official visa partner</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <span className="text-sm text-neutral-500 font-medium">Visa price</span>
                    <span className="font-extrabold text-xl text-neutral-900">{country.fees || "Free"}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <span className="text-sm text-neutral-500 font-medium">Processing time</span>
                    <span className="font-extrabold text-[#00d65b] flex items-center gap-1.5"><Zap className="w-4 h-4" /> 2 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <span className="text-sm text-neutral-500 font-medium">Max stay</span>
                    <span className="font-extrabold">30 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <span className="text-sm text-neutral-500 font-medium">Validity</span>
                    <span className="font-extrabold">{country.valid || "90 Days"}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-neutral-500 font-medium">Guarantee</span>
                    <span className="font-extrabold text-[#00d65b] flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> On-time</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold rounded-2xl py-4 mt-8 transition-colors shadow-lg shadow-[#4F46E5]/20"
                >
                  Start Application
                </motion.button>
              </div>
            </FadeIn>

            {/* Others Card */}
            <FadeIn delay={0.25}>
              <div className="relative bg-neutral-50 rounded-[32px] border border-neutral-200 p-8 opacity-70 hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-500 font-extrabold text-sm">?</div>
                  <div>
                    <h3 className="font-extrabold text-lg text-neutral-900">Other Websites</h3>
                    <p className="text-xs text-neutral-500 font-medium">No guarantees</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <span className="text-sm text-neutral-500 font-medium">Visa price</span>
                    <span className="font-extrabold text-xl text-neutral-900 line-through decoration-red-400">₹4,500+</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <span className="text-sm text-neutral-500 font-medium">Processing time</span>
                    <span className="font-extrabold text-red-500">5–10 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <span className="text-sm text-neutral-500 font-medium">Max stay</span>
                    <span className="font-extrabold">30 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <span className="text-sm text-neutral-500 font-medium">Validity</span>
                    <span className="font-extrabold">30 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-neutral-500 font-medium">Guarantee</span>
                    <span className="font-extrabold text-red-400">None</span>
                  </div>
                </div>

                <button className="w-full bg-neutral-200 text-neutral-500 font-bold rounded-2xl py-4 mt-8 cursor-not-allowed">
                  Not Available
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║                THE VISA PROCESS                     ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section id="process" className="scroll-mt-20">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ecfdf5] text-[#00d65b] text-[11px] font-bold tracking-widest uppercase mb-4">
                <Zap className="w-3.5 h-3.5" /> Simple & Fast
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">The visa process</h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto">Three simple steps. No embassy visits, no paperwork headaches.</p>
            </div>
          </FadeIn>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                icon: <FileText className="w-7 h-7" />,
                title: "Upload Documents",
                desc: "Snap a photo of your passport. Our AI reads and fills everything automatically.",
                color: "#4F46E5",
                bg: "#EEF2FF",
              },
              {
                step: "02",
                icon: <Users className="w-7 h-7" />,
                title: "Expert Review",
                desc: "Our visa specialists review your application for 100% accuracy before submission.",
                color: "#F59E0B",
                bg: "#FFFBEB",
              },
              {
                step: "03",
                icon: <Check className="w-7 h-7" />,
                title: "Visa Approved",
                desc: "Receive your approved visa directly in your email. Ready to travel!",
                color: "#00d65b",
                bg: "#ecfdf5",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="relative bg-white rounded-[32px] border border-neutral-200 p-8 hover:shadow-xl hover:border-neutral-300 transition-all duration-500 group h-full">
                  {/* Step number */}
                  <span className="absolute top-6 right-6 text-[80px] font-black text-neutral-100 leading-none select-none group-hover:text-neutral-200 transition-colors">{item.step}</span>

                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: item.bg, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-neutral-900 mb-3">{item.title}</h3>
                    <p className="text-[15px] text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Connector arrow (hidden on last) */}
                  {i < 2 && (
                    <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-neutral-200 items-center justify-center shadow-sm">
                      <ChevronRight className="w-5 h-5 text-neutral-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║                  REQUIREMENTS                       ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section id="requirements" className="scroll-mt-20">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-500 text-[11px] font-bold tracking-widest uppercase mb-4">
                <FileText className="w-3.5 h-3.5" /> Documents
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">What you'll need</h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto">Minimal documentation required. We've simplified the process.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-[32px] p-8 hover:shadow-xl transition-all duration-500 group relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#4F46E5]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#4F46E5]/10 transition-colors" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe2 className="w-7 h-7 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-neutral-900 mb-3">Valid Passport</h3>
                  <p className="text-[15px] text-neutral-500 font-medium leading-relaxed mb-6">
                    Must be valid for at least 6 months from your date of travel to {displayName}. Machine-readable passport required.
                  </p>
                  <div className="space-y-2">
                    {["PDF or JPEG scan accepted", "All pages must be clear", "Min. 2 blank pages required"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-neutral-600">
                        <div className="w-5 h-5 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#4F46E5]" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-[32px] p-8 hover:shadow-xl transition-all duration-500 group relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00d65b]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#00d65b]/10 transition-colors" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#ecfdf5] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-[#00d65b]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-neutral-900 mb-3">Passport Photo</h3>
                  <p className="text-[15px] text-neutral-500 font-medium leading-relaxed mb-6">
                    Recent passport-size photograph with white background. Our AI can auto-crop and adjust your photo.
                  </p>
                  <div className="space-y-2">
                    {["White background", "No glasses or headwear", "Taken within last 6 months"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-neutral-600">
                        <div className="w-5 h-5 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#00d65b]" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║              TRUST & SOCIAL PROOF                   ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section id="trust" className="scroll-mt-20">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold tracking-widest uppercase mb-4">
                <Star className="w-3.5 h-3.5" /> Trusted
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">Government Relations</h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto">Official partnerships with governments across the globe.</p>
            </div>
          </FadeIn>

          {/* Stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { value: 99, suffix: ".8%", label: "Approval Rate" },
              { value: 2, suffix: "M+", label: "Visas Processed" },
              { value: 150, suffix: "+", label: "Countries" },
              { value: 4, suffix: ".9★", label: "User Rating" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-neutral-500 font-bold">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Government Photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=300&fit=crop",
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-56 md:h-72 bg-neutral-200 rounded-3xl overflow-hidden relative group">
                  <Image src={img} alt="Government relations" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║                     CTA BANNER                      ║
            ╚══════════════════════════════════════════════════════╝ */}
        <FadeIn>
          <section className="relative bg-neutral-900 rounded-[48px] p-12 md:p-16 overflow-hidden text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F46E5]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#00d65b]/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Ready to get your {displayName} visa?</h2>
                <p className="text-neutral-400 text-lg font-medium max-w-lg">Join 2M+ travellers who trust Global Getaway for their visa applications. Get started in under 2 minutes.</p>
              </div>
              <motion.button
                type="button"
                onClick={() => setIsSignInOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black font-extrabold rounded-full px-10 py-5 text-lg shadow-lg shrink-0 cursor-pointer"
              >
                Apply Now <ArrowRight className="w-5 h-5 inline-block ml-1" />
              </motion.button>
            </div>
          </section>
        </FadeIn>

        {/* ╔══════════════════════════════════════════════════════╗
            ║                       FAQS                          ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section id="faqs" className="scroll-mt-20">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold tracking-widest uppercase mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Support
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">Frequently asked questions</h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto">Everything you need to know about getting your {displayName} visa.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: `Do Indians need a visa for ${displayName}?`,
                    a: `Yes, Indian passport holders need a valid e-Visa to enter ${displayName}. You can apply easily through Global Getaway and receive your approved visa via email.`
                  },
                  {
                    q: `How long does the ${displayName} visa take?`,
                    a: `With Global Getaway, your visa is typically approved within 2 business days. During peak season, it may take up to 3 business days.`
                  },
                  {
                    q: `What is the validity of the ${displayName} e-Visa?`,
                    a: `The ${displayName} e-Visa is valid for ${country.valid || "90 days"} from the date of issue. You can stay for a maximum of 30 days per visit.`
                  },
                  {
                    q: `What documents are needed for the ${displayName} e-Visa?`,
                    a: `You need: ${country.documentsNeeded || "Passport, Photo"}. All documents can be uploaded digitally — no physical copies required.`
                  },
                  {
                    q: `Can I track my ${displayName} visa application status?`,
                    a: `Yes! Global Getaway provides real-time tracking for all applications. You'll receive notifications at every step via email and SMS.`
                  },
                  {
                    q: `What happens if my visa gets rejected?`,
                    a: `Global Getaway has a 99.8% approval rate. In the rare case of rejection, we offer a full refund of our service fee.`
                  },
                  {
                    q: `Is emergency processing available?`,
                    a: `${country.emergencyAssistance ? "Yes, emergency/express processing is available for " + displayName + ". Contact our 24/7 support team for priority handling." : "Standard processing applies. Contact our support for urgent requests."}`
                  },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </section>

      </div>

      <Footer />
      <SignInModal isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
    </main>
  )
}
