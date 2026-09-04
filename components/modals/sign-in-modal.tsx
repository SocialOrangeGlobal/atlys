"use client"

import * as React from "react"
import { Logo } from "@/components/global/logo"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ArrowRight, ShieldCheck, Lock } from "lucide-react"

export function SignInModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const [tab, setTab] = React.useState<"signin" | "signup">("signin")
  const [phone, setPhone] = React.useState("")

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[440px] p-0 border border-neutral-200/90 shadow-[0_24px_80px_rgba(0,0,0,0.22)] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white">
        
        {/* Top Gradient Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#00d65b]" />

        <div className="p-6 sm:p-8">
          
          {/* Header with Logo */}
          <DialogHeader className="flex flex-col items-center text-center mb-6">
            <div className="mb-3">
              <Logo />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
              {tab === "signin" ? "Welcome back" : "Create an account"}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm font-medium text-neutral-500 mt-1">
              {tab === "signin" 
                ? "Enter your mobile number to sign in" 
                : "Get guaranteed on-time visa processing"}
            </DialogDescription>
          </DialogHeader>

          {/* Segmented Tab Switcher */}
          <div className="flex bg-neutral-100 p-1 rounded-full mb-6">
            <button
              onClick={() => setTab("signin")}
              className={`flex-1 py-2 text-xs sm:text-[13px] font-bold rounded-full transition-all duration-300 ${
                tab === "signin"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-2 text-xs sm:text-[13px] font-bold rounded-full transition-all duration-300 ${
                tab === "signup"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            
            {/* Phone Input Box */}
            <div className="flex items-center border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50 hover:bg-white focus-within:bg-white focus-within:border-[#4F46E5] focus-within:ring-4 focus-within:ring-[#4F46E5]/10 transition-all">
              <div className="px-3.5 py-3 border-r border-neutral-200 flex items-center gap-1.5 text-sm font-bold text-neutral-800 bg-neutral-100/70 select-none shrink-0">
                <img 
                  src="https://flagcdn.com/w40/in.png" 
                  alt="India flag" 
                  className="w-4 h-3 rounded-xs object-cover"
                />
                <span>+91</span>
              </div>
              <input
                type="tel"
                placeholder="Mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-sm sm:text-base font-semibold text-neutral-900 placeholder:text-neutral-400 outline-none"
                autoFocus
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-bold shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-bold">
              <span className="bg-white px-3 text-neutral-400">Or continue with</span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-xs sm:text-[13px] font-bold text-neutral-800 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-xs sm:text-[13px] font-bold text-neutral-800 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.92-2.84-.9.04-2 .6-2.65 1.34-.56.63-1.05 1.67-.92 2.69 1.01.08 2.03-.44 2.65-1.19z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Trust Security Footer */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium">
            <Lock className="w-3 h-3 text-[#00d65b]" />
            <span>100% Safe & Secure. We never share your data.</span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
