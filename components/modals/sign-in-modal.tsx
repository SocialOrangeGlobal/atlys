"use client"

import * as React from "react"
import { Logo } from "@/components/global/logo"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function SignInModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const [tab, setTab] = React.useState<"signin" | "signup">("signin")

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <Logo />
          </div>
          <DialogTitle className="text-center">
            {tab === "signin" ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex bg-neutral-card-bg p-1 rounded-full mb-6 mt-2">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 py-2 text-caption font-semibold rounded-full transition-all ${
              tab === "signin"
                ? "bg-white text-ink shadow-sm"
                : "text-neutral-body hover:text-ink"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-caption font-semibold rounded-full transition-all ${
              tab === "signup"
                ? "bg-white text-ink shadow-sm"
                : "text-neutral-body hover:text-ink"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex border border-border-subtle rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
            <div className="bg-neutral-card-bg px-4 py-3 border-r border-border-subtle flex items-center text-body font-medium text-ink">
              +91
            </div>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full px-4 py-3 outline-none text-body text-ink placeholder:text-neutral-body/60"
            />
          </div>

          <Button variant="accent" className="w-full">
            Continue
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-neutral-bg px-2 text-neutral-body">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full font-medium">
            Google
          </Button>
          <Button variant="outline" className="w-full font-medium">
            Apple
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
