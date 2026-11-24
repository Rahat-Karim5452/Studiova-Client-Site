import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ClosingCta() {
  return (
    <section className="w-full bg-background px-6 py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-border bg-card px-8 py-16 sm:px-12 sm:py-20 lg:px-14 lg:py-24">
        <div className="relative max-w-3xl">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Ready when you are
          </p>

          <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-foreground">
            Your next production is one booking away.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Browse 525+ verified rooms, or turn the space you already own into a
            working studio business.
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
              href="/register"
              className="inline-flex h-12 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
