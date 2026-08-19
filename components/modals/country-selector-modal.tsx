"use client"

import * as React from "react"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

const POPULAR_DESTINATIONS = [
  "United Arab Emirates",
  "Singapore",
  "Malaysia",
  "Vietnam",
  "Sri Lanka",
  "Egypt",
]

export function CountrySelectorModal({
  isOpen,
  setIsOpen,
  onSelect,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  onSelect: (country: string) => void
}) {
  const [search, setSearch] = React.useState("")

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <div className="flex items-center px-4 py-4 border-b border-border-subtle bg-white">
          <Search className="w-5 h-5 text-neutral-body mr-3" />
          <input
            type="text"
            placeholder="Search destination country..."
            className="flex-1 outline-none text-body-lg text-ink placeholder:text-neutral-body/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="p-6 bg-neutral-card-bg/30 max-h-[400px] overflow-y-auto">
          {search.trim() === "" ? (
            <div>
              <p className="text-caption text-neutral-body mb-4 uppercase tracking-wider font-semibold">
                Popular Destinations
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => onSelect(dest)}
                    className="px-4 py-2 rounded-full bg-white border border-border-subtle text-body font-medium hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
               <p className="text-caption text-neutral-body mb-4 uppercase tracking-wider font-semibold">
                Search Results
              </p>
              {/* Dummy results for demonstration */}
              <div className="space-y-2">
                 <button
                  onClick={() => onSelect(search)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-white border border-border-subtle text-body font-medium hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm flex items-center gap-3"
                >
                  <span className="text-2xl">🌍</span>
                  <div className="flex flex-col">
                    <span>{search}</span>
                    <span className="text-caption text-neutral-body font-normal">Processing time: 3-5 days</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
