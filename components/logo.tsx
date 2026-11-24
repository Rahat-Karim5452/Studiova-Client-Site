import Link from "next/link"
import { Aperture } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
        <Aperture className="size-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
          StudioSpace
        </span>
        <span className="mt-1 text-[8px] font-semibold tracking-[0.22em] text-muted-foreground uppercase sm:text-[9px]">
          Creative Space Network
        </span>
      </span>
    </Link>
  )
}
