import { Hero } from "@/components/sections/Hero"
import { GameCards } from "@/components/sections/GameCards"
import { NewsPromotions } from "@/components/sections/NewsPromotions"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <GameCards />
      <NewsPromotions />
    </main>
  )
}
