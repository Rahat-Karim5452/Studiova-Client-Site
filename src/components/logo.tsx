import Link from "next/link"

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Studiova home"
    >
      <span className="relative flex size-10 items-center justify-center rounded-[13px] bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:-rotate-3">
        <svg viewBox="0 0 40 40" className="size-6" aria-hidden="true">
          <path
            d="M27.5 12.5H15a5 5 0 1 0 0 10h10a5 5 0 1 1 0 10H12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="10.5" r="3" className="fill-brand" />
          <circle
            cx="12.5"
            cy="32"
            r="2.3"
            className="fill-brand"
            opacity="0.65"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-bold tracking-[-0.04em] text-foreground sm:text-[1.35rem]">
          Studiova
        </span>
        <span className="mt-1 text-[8px] font-semibold tracking-[0.22em] text-muted-foreground uppercase sm:text-[9px]">
          Creative Space Network
        </span>
      </span>
    </Link>
  )
}
