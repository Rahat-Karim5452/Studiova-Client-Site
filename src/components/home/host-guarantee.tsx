import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

const guarantees = [
  {
    value: "$1M",
    title: "Liability protection",
    description:
      "Every confirmed booking is covered by our $1M production liability shield — gear, guests and set included.",
    label: "Coverage per booking",
  },
  {
    value: "100%",
    title: "Verified host profiles",
    description:
      "Hosts pass ID, address and equipment checks before a listing is published on Studiova.",
    label: "ID-verified hosts",
  },
  {
    value: "24h",
    title: "Equipment safety",
    description:
      "Damage waivers and gear checklists on every space, plus a 24-hour dispute window after wrap.",
    label: "Dispute window",
  },
  {
    value: "6 min",
    title: "24/7 creator support",
    description:
      "Real humans on call before, during and after your shoot. Average first reply under six minutes.",
    label: "Average response",
  },
]

export function HostGuarantee() {
  return (
    <section className="w-full border-t border-border bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-brand" />
          Host Guarantee &amp; Creator Support
        </p>

        <h2 className="mt-4 max-w-3xl font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-foreground">
          The safety net under every shoot
        </h2>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            A booking on Studiova is insured, verified and supported — for the
            host and the crew walking in.
          </p>
          <Link
            href="/how-it-works"
            className="group inline-flex h-10 w-fit shrink-0 items-center gap-3 rounded-full border border-border px-4 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Our standards
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck className="size-5" />
                </span>
                <span className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {item.value}
                </span>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <div className="mt-auto pt-6">
                <p className="border-t border-border pt-4 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
