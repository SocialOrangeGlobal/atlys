import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore Visa Map",
  description: "Browse destinations across the globe with interactive real-time visa requirements and processing times.",
}

export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
