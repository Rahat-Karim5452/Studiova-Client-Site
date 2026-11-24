"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { cn } from "cn"

const image = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600`

const slides = [
  {
    category: "Sound Stages",
    count: "60+ stages",
    location: "Arts District, Los Angeles",
    title: "Stages built for",
    accent: "the stories you tell.",
    description:
      "High-bay stages with cycloramas, DMX grids and drive-in load doors. Production offices and grip packages on request.",
    stats: ["4.9 from 2,400+ shoots", "From $145 / hr", "Drive-in access"],
    image: image(8089249),
    href: `/studios?category=${encodeURIComponent("Film Stage")}`,
  },
  {
    category: "Photo Studios",
    count: "120+ studios",
    location: "Greenpoint, Brooklyn",
    title: "Natural light,",
    accent: "frames worth keeping.",
    description:
      "Sun-drenched lofts with cyc walls, blackout options and a full strobe kit. Hair and makeup stations included.",
    stats: ["4.8 from 1,800+ shoots", "From $95 / hr", "Cyc wall included"],
    image: image(17094501),
    href: `/studios?category=${encodeURIComponent("Photo Studio")}`,
  },
  {
    category: "Podcast Rooms",
    count: "40+ rooms",
    location: "East Austin, Texas",
    title: "Press record,",
    accent: "the room is ready.",
    description:
      "Acoustically treated rooms with broadcast mics, mixers and a producer on call. Publish-ready audio, every session.",
    stats: ["4.9 from 900+ episodes", "From $65 / hr", "Engineer on call"],
    image: image(7383469),
    href: `/studios?category=${encodeURIComponent("Podcast Lounge")}`,
  },
  {
    category: "Music Suites",
    count: "75+ suites",
    location: "Berry Hill, Nashville",
    title: "A studio for",
    accent: "every sound you make.",
    description:
      "Live rooms, iso booths and full backline for writing sessions, tracking days and late-night mixes.",
    stats: ["4.9 from 1,200+ sessions", "From $110 / hr", "Full backline"],
    image: image(8197361),
    href: `/studios?category=${encodeURIComponent("Music Suite")}`,
  },
]

export function Banner() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)

  const goTo = (index: number) => {
    swiperRef.current?.slideToLoop(index)
  }

  return (
    <section className="bg-background p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-[#0b0b0c]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={900}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setActive(swiper.realIndex ?? 0)}
          className="h-[680px] w-full sm:h-[650px] lg:h-[680px]"
        >
          {slides.map((slide, index) => {
            // only the first slide is the page heading
            const Heading = index === 0 ? "h1" : "h2"

            return (
              <SwiperSlide key={slide.title}>
                <div className="relative h-full w-full">
                  {/* Background */}
                  <Image
                    src={slide.image}
                    alt={`${slide.category} in ${slide.location}`}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

                  {/* Hero content */}
                  <div className="relative z-10 flex h-full flex-col p-5 pb-24 sm:p-10 sm:pb-32 lg:p-14 lg:pb-36">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md">
                        <Sparkles className="size-3 text-[#c9ec4a]" />
                        {slide.category}
                        <span className="text-white/40">·</span>
                        {slide.count}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white/85 uppercase backdrop-blur-md">
                        <MapPin className="size-3" />
                        {slide.location}
                      </span>
                    </div>

                    <div className="mt-8 max-w-[46rem] lg:mt-12">
                      <Heading className="font-heading text-[clamp(2.3rem,6.5vw,5.25rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-white">
                        {slide.title}{" "}
                        <span className="font-serif font-normal tracking-[-0.02em] text-[#c9ec4a] italic">
                          {slide.accent}
                        </span>
                      </Heading>

                      <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base">
                        {slide.description}
                      </p>

                      <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                        <Link
                          href={slide.href}
                          className="group inline-flex h-11 items-center gap-3 rounded-full bg-[#c9ec4a] px-5 text-sm font-semibold text-[#15170f] transition-colors hover:bg-[#d8f766] sm:h-12 sm:px-6"
                        >
                          Explore Studios
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                          href="/add-studio"
                          className="inline-flex h-11 items-center rounded-full border border-white/20 bg-black/25 px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:h-12 sm:px-6"
                        >
                          Host Your Space
                        </Link>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-white/80 sm:mt-7 sm:text-sm">
                        {slide.stats.map((stat, statIndex) => (
                          <span key={stat} className="flex items-center gap-2">
                            {statIndex === 0 && (
                              <Star className="size-3.5 fill-[#c9ec4a] text-[#c9ec4a]" />
                            )}
                            {statIndex > 0 && (
                              <span className="h-3 w-px bg-white/25" />
                            )}
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/* Slide controls stay still while the backgrounds crossfade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pt-16 pb-5 sm:px-10 sm:pb-8 lg:px-14 lg:pb-10">
          <div className="pointer-events-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === active
                      ? "w-10 bg-[#c9ec4a]"
                      : "w-6 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <p className="font-mono text-xs tracking-[0.2em] text-white/85">
                <span className="text-white">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="mx-1 text-white/35">/</span>
                {String(slides.length).padStart(2, "0")}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous slide"
                  className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:size-10"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next slide"
                  className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:size-10"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
