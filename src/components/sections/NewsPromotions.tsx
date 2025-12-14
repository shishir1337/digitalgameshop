"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { newsItems } from "@/lib/data/news"
import type { NewsItem } from "@/types/news"

export function NewsPromotions() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
            News & Promotions
          </h3>
          <div className="text-sm sm:text-base text-muted-foreground">
            More gaming news and promotions on{" "}
            <Link
              href="https://news.seagm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline inline-flex items-center gap-1 transition-colors"
            >
              SEAGM News
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>

        {/* News Grid - 4 columns, 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newsItems.map((news) => (
            <Link
              key={news.id}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-muted">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

