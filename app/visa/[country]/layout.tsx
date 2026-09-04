import type { Metadata } from "next"
import { CARDS } from "@/lib/data"

type Props = {
  params: Promise<{ country: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params
  const card = CARDS.find((c) => c.slug === country)
  const countryName = card ? card.name : country.replace(/-/g, " ").toUpperCase()

  return {
    title: `Apply for ${countryName} Visa Online — Fast & Guaranteed`,
    description: `Get your ${countryName} visa on time, guaranteed with Global Getaway. 99.8% approval rate, real-time tracking, and simple document upload.`,
  }
}

export default function VisaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
