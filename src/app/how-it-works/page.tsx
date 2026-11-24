import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works",
}

const labelClass =
  "text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase"

const timeline = [
  {
    title: "Request",
    description:
      "Send your dates and hours. The space is held while the host reviews.",
  },
  {
    title: "Host approves",
    description:
      "Your host confirms the booking and the details are locked in.",
  },
  {
    title: "Pay securely",
    description: "Pay the hourly rate and deposit through the platform.",
  },
  {
    title: "Create",
    description:
      "Show up, shoot, and get a receipt for your production budget.",
  },
]

const flow = [
  {
    number: "01",
    title: "Discover spaces",
    description:
      "Filter by category, city, capacity and rate. Every listing is inspected and host-verified before it goes live.",
  },
  {
    number: "02",
    title: "Select shoot hours",
    description:
      "Pick a date and a time window. The calendar checks live availability so you never double-book a stage.",
  },
  {
    number: "03",
    title: "Book instantly",
    description:
      "Reserve in under a minute. Transparent hourly pricing, deposit shown upfront, no agency commission.",
  },
  {
    number: "04",
    title: "Create & produce",
    description:
      "Arrive to a prepped room, a host on call and a downloadable invoice for your production budget.",
  },
]

const creatorPoints = [
  "Search by city, budget, style and amenities",
  "Real photos and verified reviews from real shoots",
  "Book flexible hours that fit your production",
  "Cancel or reschedule with clear, upfront terms",
]

const hostPoints = [
  "List in minutes with flexible availability",
  "Set your own rates, hours, and house rules",
  "Get paid securely with transparent payouts",
  "Host protection and real human support",
]

const protections = [
  {
    number: "01",
    title: "Liability protection",
    description:
      "Every confirmed booking is covered for accidental damage to the property.",
  },
  {
    number: "02",
    title: "Verified host profiles",
    description:
      "Hosts and creators sign in with a verified account before they list or book.",
  },
  {
    number: "03",
    title: "Equipment coverage",
    description:
      "A security deposit and a clear equipment list keep the gear protected.",
  },
  {
    number: "04",
    title: "24/7 creator support",
    description:
      "Our support team is available before, during and after every session.",
  },
]

const faqs = [
  {
    question: "Do they take all amount when I request a booking?",
    answer:
      "No. A request only places a temporary hold. You are charged after the host confirms your dates, and the deposit is shown before you send it.",
  },
  {
    question: "What happens if the host declines my booking request?",
    answer:
      "The hold is released immediately and you are not charged. You can send the same request to another space or adjust your hours.",
  },
  {
    question: "Can I cancel my reservation?",
    answer:
      "Yes. Cancel from My Bookings. Cancellation terms and any refund are shown on the booking before you confirm.",
  },
  {
    question: "How do hosts get paid?",
    answer:
      "Hosts receive the hourly total minus the platform fee after the session is completed. Payouts are sent to the host's connected account.",
  },
  {
    question: "Is my gear and equipment covered?",
    answer:
      "Confirmed bookings include equipment coverage up to the limit shown on the listing. Report any damage through the booking within 24 hours.",
  },
]

export default function HowItWorksPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-14 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <div>
            <p className={labelClass}>How Studiova Works</p>

            <h1 className="mt-5 max-w-3xl font-heading text-[clamp(2.75rem,5.4vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
              Booking a room should feel{" "}
              <span className="font-serif font-normal tracking-[-0.02em] text-brand italic">
                effortless.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Your next room is already out there. We help you find it, book it
              and walk in without the back-and-forth, the hidden fees or the
              last-minute surprises.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/studios"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Explore Studios
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Host Your Space
              </Link>
            </div>
          </div>

          {/* Booking timeline */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
            <p className={labelClass}>Featured Booking Timeline</p>

            <ol className="mt-6 space-y-6">
              {timeline.map((item, index) => (
                <li key={item.title} className="relative flex gap-4">
                  {index < timeline.length - 1 && (
                    <span className="absolute top-4 left-[5px] h-[calc(100%+2rem)] w-px bg-border" />
                  )}
                  <span className="relative mt-1 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/10" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The flow */}
      <section className="mx-auto max-w-7xl border-t border-border px-6 py-14">
        <p className={labelClass}>The Flow</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          From scroll to set-ready
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-border border-t-primary/60 bg-card p-5"
            >
              <span className="font-heading text-lg font-semibold text-primary">
                {step.number}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* For everyone */}
      <section className="mx-auto max-w-7xl border-t border-border px-6 py-14">
        <p className={labelClass}>For Everyone</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              For creators
            </h2>
            <ul className="mt-6 space-y-4">
              {creatorPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              For hosts
            </h2>
            <ul className="mt-6 space-y-4">
              {hostPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="/add-studio"
              className="group mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
            >
              List your space
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protection */}
      <section className="mx-auto max-w-7xl border-t border-border px-6 py-14">
        <p className={labelClass}>Protected</p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Protected on both sides of the door
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Security, transparency and real humans on call, so you can focus on
          the work.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {protections.map((item) => (
            <div
              key={item.number}
              className="rounded-xl border border-border bg-card p-5"
            >
              <span className="font-heading text-lg font-semibold text-brand">
                {item.number}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl border-t border-border px-6 py-14">
        <p className={labelClass}>FAQ</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Questions, answered
        </h2>

        <div className="mt-8 border-t border-border">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-border"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 pt-6 pb-16">
        <div className="flex flex-col gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <h2 className="max-w-2xl font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Still deciding? The rooms speak for themselves.
          </h2>
          <Link
            href="/studios"
            className="group inline-flex h-11 w-fit shrink-0 items-center gap-3 rounded-full bg-primary-foreground px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/80"
          >
            Explore Studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
