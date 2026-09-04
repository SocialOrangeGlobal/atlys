import type { Metadata } from "next"
import { EVENTS } from "@/lib/events"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = EVENTS.find((e) => e.slug === slug)
  const eventTitle = event ? event.title : slug.replace(/-/g, " ").toUpperCase()

  return {
    title: `${eventTitle} — Event Visa Guide`,
    description: `Fast and guaranteed visa processing for ${eventTitle} with Global Getaway.`,
  }
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
