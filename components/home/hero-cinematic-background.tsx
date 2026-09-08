"use client"

import * as React from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

// All small-sized, high-speed optimized videos (< 8MB each, zero lag)
const EXPLORE_VIDEOS = [
  {
    title: "Aviation & Skies",
    src: "/videos/18662635-hd_1920_1080_60fps.mp4",
  },
  {
    title: "Tropical Coastal gateways",
    src: "/videos/11110914-hd_1920_1080_30fps.mp4",
  },
  {
    title: "Heritage & Horizons",
    src: "/videos/12050199_1920_1080_30fps.mp4",
  },
  {
    title: "Metropolitan Nights",
    src: "/videos/20186336-hd_1920_1080_60fps.mp4",
  },
]

const EVENT_VIDEOS = [
  {
    title: "World Summits & Festivals",
    src: "/videos/2055056-hd_1920_802_25fps.mp4",
  },
  {
    title: "Global Arena & Crowds",
    src: "/videos/20186336-hd_1920_1080_60fps.mp4",
  },
  {
    title: "Continental Travel",
    src: "/videos/18662635-hd_1920_1080_60fps.mp4",
  },
]

interface HeroCinematicBackgroundProps {
  tab?: string
}

export function HeroCinematicBackground({
  tab = "explore",
}: HeroCinematicBackgroundProps) {
  const isEvents = tab === "events"
  const videoPlaylist = isEvents ? EVENT_VIDEOS : EXPLORE_VIDEOS

  const [activeVideoIdx, setActiveVideoIdx] = React.useState(0)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Reset index when switching tabs
  React.useEffect(() => {
    setActiveVideoIdx(0)
  }, [tab])

  // Smooth auto-rotation between videos every 12 seconds
  React.useEffect(() => {
    if (videoPlaylist.length <= 1) return

    const timer = setInterval(() => {
      setActiveVideoIdx((idx) => (idx + 1) % videoPlaylist.length)
    }, 12000)

    return () => clearInterval(timer)
  }, [videoPlaylist.length])

  const currentVideo = videoPlaylist[activeVideoIdx] || videoPlaylist[0]

  // Ultra-crisp transitions: zero blur, smooth cinematic opacity & subtle scale punch
  const videoVariants: Variants = {
    enter: {
      opacity: 0,
      scale: 1.04,
    },
    center: {
      opacity: 1,
      scale: 1.0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: {
        duration: 0.9,
        ease: "easeIn",
      },
    },
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      {/* ─── 1. Background Video with Smooth Fade into Page Background ─── */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentVideo.src}
            variants={videoVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full will-change-[transform,opacity]"
          >
            <video
              ref={videoRef}
              src={currentVideo.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ filter: "blur(2.5px)" }}
              className="w-full h-full object-cover brightness-[0.90] contrast-[1.05] saturate-[1.06] scale-105 will-change-transform"
            />
          </motion.div>
        </AnimatePresence>

        {/* ─── Subtle Anamorphic Light Streak on Video Switch ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`light-sweep-${activeVideoIdx}`}
            initial={{
              x: "-120%",
              opacity: 0,
            }}
            animate={{
              x: "130%",
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 1.0,
              ease: "easeOut",
            }}
            className="absolute -inset-y-24 -inset-x-32 pointer-events-none z-10 rotate-[-18deg] bg-gradient-to-r from-transparent via-[#00d65b]/20 via-cyan-400/20 to-transparent mix-blend-screen"
          />
        </AnimatePresence>

        {/* Preload playlist videos */}
        <div className="hidden" aria-hidden="true">
          {videoPlaylist.map((v, i) =>
            i !== activeVideoIdx ? (
              <video key={v.src} src={v.src} preload="auto" muted />
            ) : null
          )}
        </div>
      </div>

      {/* ─── Center Ambient Gradient (Ensures Hero Text & Subtitle are always crystal clear) ─── */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* ─── 2. Top Header Tint (Ensures Floating Navbar & Headline are Razor-Sharp) ─── */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/75 via-black/40 to-transparent pointer-events-none" />

      {/* ─── 3. Seamless Bottom Gradient Blend into Bento Grid (#FAFAFA) ─── */}
      <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-b from-transparent via-[#FAFAFA]/65 via-[#FAFAFA]/92 to-[#FAFAFA] pointer-events-none z-10" />
    </div>
  )
}
