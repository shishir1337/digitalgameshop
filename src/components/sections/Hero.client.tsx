"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { hexToRgba } from "@/lib/utils/hex-to-rgba"
import type { Media } from "@/payload-types"

export type HeroSlide = {
  id: string
  image: Media | string
  alt: string
  link: string
  color: string
}

type HeroClientProps = {
  slides: HeroSlide[]
  exclusiveOffers: Array<{
    id: string
    name: string
    sku: string
    image: string
    link: string
    discount: string
  }>
}

export function HeroClient({ slides, exclusiveOffers }: HeroClientProps) {
  const [current, setCurrent] = useState(0)
  const [isLeftHovered, setIsLeftHovered] = useState(false)
  const [isRightHovered, setIsRightHovered] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!slides || slides.length === 0) {
    return null
  }

  const prevIndex = (current - 1 + slides.length) % slides.length
  const nextIndex = (current + 1) % slides.length

  const minSwipeDistance = 50

  const goToPrevious = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return
      setCurrent(index)
    },
    [current],
  )

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext, isPaused])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext])

  const getImageUrl = (image: Media | string): string => {
    if (typeof image === 'string') return image
    if (typeof image === 'object' && image.url) return image.url
    return "/placeholder.svg"
  }

  const currentSlide = slides[current]

  return (
    <section
      ref={containerRef}
      className="relative w-full py-4 sm:py-6 md:py-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero banner carousel"
    >
      {/* Gradient background from hero image color to background */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-in-out"
        style={{
          background: `linear-gradient(to bottom, ${hexToRgba(currentSlide.color, 0.70)}, ${hexToRgba(currentSlide.color, 0.20)}, ${hexToRgba(currentSlide.color, 0.05)}, var(--gradient-end))`,
        }}
      />
      
      <div className="container mx-auto max-w-[1440px] px-2 sm:px-4 relative z-10">
        <div
          className="block md:hidden relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full aspect-[2.5/1] sm:aspect-[2.8/1] rounded-lg sm:rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 group">
            <Link href={currentSlide.link} className="block w-full h-full">
              <Image
                src={getImageUrl(currentSlide.image)}
                alt={currentSlide.alt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="100vw"
                priority
              />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                goToPrevious()
              }}
              className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md z-10 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 border-0 shadow-lg hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                goToNext()
              }}
              className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md z-10 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 border-0 shadow-lg hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="sr-only">Next slide</span>
            </Button>

            <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10 bg-black/30 backdrop-blur-md rounded-full px-2 py-1 shadow-lg">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    goToSlide(index)
                  }}
                  className={`rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                    index === current ? "bg-white w-5 h-1.5 shadow-md" : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === current ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex items-center justify-center gap-2 lg:gap-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative w-[120px] lg:w-[172px] h-[280px] lg:h-[360px] rounded-xl overflow-hidden shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
            onClick={goToPrevious}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                goToPrevious()
              }
            }}
            role="button"
            aria-label="Go to previous slide"
            tabIndex={0}
          >
            <Image
              src={getImageUrl(slides[prevIndex].image)}
              alt={slides[prevIndex].alt}
              fill
              className="object-cover object-right"
              style={{ filter: "grayscale(100%)" }}
              sizes="(max-width: 1024px) 120px, 172px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 transition-opacity duration-300" />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl z-10 transition-all duration-300 ease-out hover:scale-110 ${
                isLeftHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-gray-800" />
              <span className="sr-only">Previous slide</span>
            </Button>
          </div>

          <div
            className="relative w-[700px] lg:w-[1000px] h-[280px] lg:h-[360px] rounded-xl overflow-hidden shrink-0 shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${current + 1} of ${slides.length}: ${currentSlide.alt}`}
          >
            <Link href={currentSlide.link} className="block w-full h-full">
              <Image
                src={getImageUrl(currentSlide.image)}
                alt={currentSlide.alt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 700px, 1000px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <div className="absolute bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    goToSlide(index)
                  }}
                  className={`rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                    index === current
                      ? "bg-white w-6 lg:w-7 h-2 shadow-md"
                      : "bg-white/50 w-2 h-2 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === current ? "true" : "false"}
                />
              ))}
            </div>
          </div>

          <div
            className="relative w-[120px] lg:w-[172px] h-[280px] lg:h-[360px] rounded-xl overflow-hidden shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onMouseEnter={() => setIsRightHovered(true)}
            onMouseLeave={() => setIsRightHovered(false)}
            onClick={goToNext}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                goToNext()
              }
            }}
            role="button"
            aria-label="Go to next slide"
            tabIndex={0}
          >
            <Image
              src={getImageUrl(slides[nextIndex].image)}
              alt={slides[nextIndex].alt}
              fill
              className="object-cover object-left"
              style={{ filter: "grayscale(100%)" }}
              sizes="(max-width: 1024px) 120px, 172px"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-black/40 transition-opacity duration-300" />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl z-10 transition-all duration-300 ease-out hover:scale-110 ${
                isRightHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-gray-800" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Exclusive Offers Section */}
      <div className="container mx-auto max-w-[1440px] px-2 sm:px-4 relative z-10 mt-12 sm:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Exclusive Offers</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Don't miss our limited-time offers! Discover current deals today!
            </p>
          </div>
          <Link
            href="/special_deals"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-all self-start sm:self-auto group/link"
          >
            <span>View more</span>
            <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid Layout: 5 columns, 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {exclusiveOffers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.link}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative w-[54px] h-[54px] shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="54px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-1 line-clamp-1">{offer.sku}</div>
                    <div className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {offer.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg px-3 py-2 border border-primary/20">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide">Promo</div>
                  <div className="text-sm font-bold text-primary">{offer.discount}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

