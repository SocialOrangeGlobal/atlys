"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Search, CheckCircle2, Clock, ShieldCheck, Download, AlertCircle, ArrowRight, Plane } from "lucide-react"

interface TrackingStatus {
  id: string
  applicant: string
  destination: string
  flag: string
  appliedDate: string
  eta: string
  status: "submitted" | "verified" | "processing" | "approved"
}

const DEMO_APPLICATIONS: Record<string, TrackingStatus> = {
  "GG-884291": {
    id: "GG-884291",
    applicant: "Rahul Sharma",
    destination: "Thailand",
    flag: "th",
    appliedDate: "05 Sep 2026",
    eta: "08 Sep 2026, 04:30 PM",
    status: "processing"
  },
  "GG-771920": {
    id: "GG-771920",
    applicant: "Priya Patel",
    destination: "United Arab Emirates",
    flag: "ae",
    appliedDate: "03 Sep 2026",
    eta: "05 Sep 2026, 11:00 AM",
    status: "approved"
  }
}

export function TrackApplicationModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const [appId, setAppId] = React.useState("GG-884291")
  const [result, setResult] = React.useState<TrackingStatus | null>(DEMO_APPLICATIONS["GG-884291"])
  const [error, setError] = React.useState(false)

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const cleanId = appId.trim().toUpperCase()
    if (DEMO_APPLICATIONS[cleanId]) {
      setResult(DEMO_APPLICATIONS[cleanId])
      setError(false)
    } else {
      // Mock result for custom IDs
      if (cleanId.length >= 4) {
        setResult({
          id: cleanId,
          applicant: "Traveller",
          destination: "Vietnam",
          flag: "vn",
          appliedDate: "Yesterday",
          eta: "In 2 Business Days",
          status: "verified"
        })
        setError(false)
      } else {
        setError(true)
      }
    }
  }

  const steps = [
    { key: "submitted", title: "Application Submitted", desc: "Documents and fees received" },
    { key: "verified", title: "AI Document Verification", desc: "Passport & photo specifications passed" },
    { key: "processing", title: "Embassy Processing", desc: "Under official government immigration review" },
    { key: "approved", title: "Visa Approved & Issued", desc: "Digital e-Visa delivered to email" }
  ]

  const getStepIndex = (status: TrackingStatus["status"]) => {
    switch (status) {
      case "submitted": return 0
      case "verified": return 1
      case "processing": return 2
      case "approved": return 3
      default: return 1
    }
  }

  const currentStepIdx = result ? getStepIndex(result.status) : 0

  // Prevent background page from scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] w-[92vw] max-h-[85vh] sm:max-h-[88vh] flex flex-col p-0 border border-neutral-200/90 shadow-[0_24px_80px_rgba(0,0,0,0.22)] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white">
        {/* Accent Bar */}
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#4F46E5] via-[#00d65b] to-[#4F46E5]" />

        <div
          className="p-6 sm:p-8 overflow-y-auto overscroll-contain flex-1 min-h-0 custom-scrollbar pr-5 sm:pr-7 mr-1 my-1"
          onWheel={(e) => e.stopPropagation()}
        >
          <DialogHeader className="mb-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-bold tracking-wider uppercase mb-2 w-max">
              <ShieldCheck className="w-3.5 h-3.5" /> Live Status Tracker
            </div>
            <DialogTitle className="text-2xl font-black text-neutral-900 tracking-tight">
              Track Visa Application
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm font-medium text-neutral-500">
              Enter your Global Gateway reference ID or passport number to check real-time status.
            </DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g. GG-884291"
                value={appId}
                onChange={(e) => {
                  setAppId(e.target.value)
                  setError(false)
                }}
                className="w-full pl-4 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm font-bold text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 outline-none transition-all uppercase"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Preset Pill Demo */}
          <div className="flex items-center gap-2 mb-6 text-[11px] font-medium text-neutral-500">
            <span>Try sample IDs:</span>
            <button
              type="button"
              onClick={() => { setAppId("GG-884291"); setResult(DEMO_APPLICATIONS["GG-884291"]); setError(false); }}
              className="px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold transition-colors"
            >
              GG-884291 (In Review)
            </button>
            <button
              type="button"
              onClick={() => { setAppId("GG-771920"); setResult(DEMO_APPLICATIONS["GG-771920"]); setError(false); }}
              className="px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold transition-colors"
            >
              GG-771920 (Approved)
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs font-semibold mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Reference ID not found. Please verify your reference number or try a sample ID above.</span>
            </div>
          )}

          {/* Results Card */}
          {result && !error && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-5 sm:p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w80/${result.flag}.png`}
                    alt={result.destination}
                    className="w-10 h-7 rounded-lg object-cover border border-neutral-200 shadow-xs"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-neutral-900">{result.destination} e-Visa</h4>
                    <p className="text-[11px] font-medium text-neutral-500">Ref: {result.id} • {result.applicant}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Guaranteed ETA</span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#00d65b]">{result.eta}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4 relative pl-3">
                <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-neutral-200" />
                {steps.map((step, idx) => {
                  const isDone = idx <= currentStepIdx
                  const isCurrent = idx === currentStepIdx

                  return (
                    <div key={step.key} className="flex items-start gap-4 relative">
                      <div className={`w-4 h-4 rounded-full mt-1 shrink-0 flex items-center justify-center transition-colors z-10 ${isDone
                        ? "bg-[#00d65b] text-white ring-4 ring-[#00d65b]/20"
                        : "bg-neutral-200 text-neutral-400"
                        }`}>
                        {isDone && <CheckCircle2 className="w-3 h-3" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs sm:text-[13px] font-bold ${isCurrent ? "text-[#4F46E5]" : isDone ? "text-neutral-900" : "text-neutral-400"}`}>
                            {step.title}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bottom Action if Approved */}
              {result.status === "approved" ? (
                <button
                  type="button"
                  className="w-full py-3 rounded-2xl bg-[#00d65b] hover:bg-[#00c052] text-white font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[#00d65b]/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Official e-Visa PDF
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4F46E5]" />
                    <span className="font-semibold">SMS & Email updates are active</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">24/7 Monitored</span>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
