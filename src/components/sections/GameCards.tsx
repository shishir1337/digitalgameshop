"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { gameCardData } from "@/lib/data/game-cards"
import type { Product, GameCardCategory } from "@/types/game-cards"

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={product.link}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all duration-200 group hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative w-[60px] h-[60px] shrink-0 rounded-lg overflow-hidden bg-muted ring-1 ring-border group-hover:ring-primary/20 transition-all duration-200">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="60px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{product.region}</div>
      </div>
    </Link>
  )
}

function CategoryCard({ category }: { category: GameCardCategory }) {
  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground uppercase tracking-tight">{category.title}</h3>
        <Link
          href={category.viewMoreLink}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-all group"
        >
          <span>View more</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products Grid - 3 columns, 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 flex-1">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export function GameCards() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* First Row: Popular Game Card & Popular Game Top-Up */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <CategoryCard category={gameCardData[0]} />
          <CategoryCard category={gameCardData[1]} />
        </div>

        {/* Second Row: New Game Card & New Game Top-Up */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <CategoryCard category={gameCardData[2]} />
          <CategoryCard category={gameCardData[3]} />
        </div>
      </div>
    </section>
  )
}

