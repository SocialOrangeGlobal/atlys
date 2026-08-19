"use client"

import React from "react"
import { ArrowRight, Plane } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { CARDS } from "@/lib/data"
import { CountryCard } from "@/components/ui/country-card"

export function CountryGrid() {
  const searchParams = useSearchParams()

  const typeFilter = searchParams.get("type")
  const docsFilter = searchParams.get("docs")
  const deliveryFilter = searchParams.get("delivery")
  const holidaysFilter = searchParams.get("holidays")

  const [visibleCount, setVisibleCount] = React.useState(10)
  const loaderRef = React.useRef<HTMLDivElement | null>(null)

  const filteredCards = React.useMemo(() => {
    return CARDS.filter(card => {
      // 1. Visa Type Filter
      if (typeFilter && typeFilter !== 'all') {
        if (card.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
      }

      // 2. Documents Filter (Exact match for just "Passport")
      if (docsFilter === 'passport') {
        if (card.documentsNeeded?.trim().toLowerCase() !== 'passport') return false;
      }

      // Helper: Parse guaranteed date (e.g., "17 Aug 2026, 11:51 AM" -> Date object)
      let cardDate: Date | null = null;
      if (card.guaranteedDate) {
        const dateString = card.guaranteedDate.split(',')[0];
        cardDate = new Date(dateString);
      }

      // 3. Delivery Time Filter
      if (deliveryFilter && deliveryFilter !== 'all') {
        if (!cardDate) return false;

        // Use an anchor date close to the mock dataset to calculate days difference
        const today = new Date("17 Aug 2026");
        const diffTime = cardDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (deliveryFilter === 'instant' && diffDays > 0) return false;
        if (deliveryFilter === '24h' && diffDays > 1) return false;
        if (deliveryFilter === '3-5d' && (diffDays < 2 || diffDays > 5)) return false;
        if (deliveryFilter === '6-7d' && (diffDays < 6 || diffDays > 7)) return false;
        if (deliveryFilter === '8-30d' && diffDays < 8) return false;
      }

      // 4. Holidays Calendar Filter
      if (holidaysFilter && holidaysFilter !== 'all') {
        if (!cardDate) return false;

        // Convert "19-aug-2026" to a real Javascript Date "19 Aug 2026"
        const [day, monthStr, yearStr] = holidaysFilter.split('-');
        const monthMap: Record<string, string> = { jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun", jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec" };
        const holidayDate = new Date(`${day} ${monthMap[monthStr] || 'Aug'} ${yearStr || '2026'}`);

        // Only show countries where the visa arrives ON or BEFORE the requested holiday date
        if (cardDate.getTime() > holidayDate.getTime()) return false;
      }

      return true;
    })
  }, [typeFilter, docsFilter, deliveryFilter, holidaysFilter])

  // Reset pagination when filters change
  React.useEffect(() => {
    setVisibleCount(10)
  }, [filteredCards])

  // Infinite Scroll Observer with optimized delay
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        // Small delay to make the loading visible but smooth
        setTimeout(() => {
          setVisibleCount(prev => prev + 10)
        }, 300)
      }
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    })

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredCards.length > 0 ? (
        filteredCards.slice(0, visibleCount).map((card, idx) => (
          <CountryCard key={card.slug} card={card} idx={idx} />
        ))
      ) : (
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No destinations found</h3>
          <p className="text-neutral-500 font-medium">Try adjusting your filters to see more results.</p>
        </div>
      )}

      {/* Infinite Scroll Loader */}
      {visibleCount < filteredCards.length && (
        <div ref={loaderRef} className="col-span-full py-8 flex justify-center items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-[#4F46E5] border-t-transparent animate-spin"></div>
            </div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest animate-pulse">Loading more destinations...</p>
          </div>
        </div>
      )}
    </div>
  )
}
