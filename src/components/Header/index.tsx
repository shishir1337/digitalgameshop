"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Menu,
  ChevronDown,
  ChevronRight,
  Monitor,
  Globe,
  Smartphone,
  Gamepad2,
  CreditCard,
  Gift,
  Key,
  Video,
  Music,
  ShoppingCart,
  Wrench,
  Code,
  Users,
  Tag,
  Repeat,
  TrendingUp,
  Film,
  Radio,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Category data structure
const categories = {
  Game: ["pc", "webgame", "mobile", "playstation", "xbox", "Nintendo switch"],
  Card: [
    "Mobile Game Cards",
    "Game Cards",
    "Payment cards",
    "Gift Cards",
    "Game Console",
    "Game CD-Key",
    "Video Streaming",
    "Music",
    "Shopping",
    "Tools",
    "Software",
    "social App",
    "Freebie Codes",
    "Subscription",
  ],
  "Direct Top-Up": [
    "Mobile Game Top-up",
    "Game Direct Top-Up",
    "China Direct Top-Up",
    "Video Streaming",
    "Entertainment",
    "Live streaming",
  ],
} as const

// Icon mapping for subcategories
const subcategoryIcons: Record<string, LucideIcon> = {
  // Game category
  pc: Monitor,
  webgame: Globe,
  mobile: Smartphone,
  playstation: Gamepad2,
  xbox: Gamepad2,
  "Nintendo switch": Gamepad2,
  // Card category
  "Mobile Game Cards": Smartphone,
  "Game Cards": CreditCard,
  "Payment cards": CreditCard,
  "Gift Cards": Gift,
  "Game Console": Gamepad2,
  "Game CD-Key": Key,
  "Video Streaming": Video,
  Music: Music,
  Shopping: ShoppingCart,
  Tools: Wrench,
  Software: Code,
  "social App": Users,
  "Freebie Codes": Tag,
  Subscription: Repeat,
  // Direct Top-Up category
  "Mobile Game Top-up": Smartphone,
  "Game Direct Top-Up": Gamepad2,
  "China Direct Top-Up": Globe,
  Entertainment: Film,
  "Live streaming": Radio,
}

// Helper function to get icon for subcategory
function getSubcategoryIcon(subcategory: string): LucideIcon {
  return subcategoryIcons[subcategory] || Globe
}

// Helper function to create category URL
function getCategoryUrl(category: string, subcategory: string): string {
  return `/category/${category.toLowerCase()}/${subcategory
    .toLowerCase()
    .replace(/\s+/g, "-")}`
}

// Mobile Menu Component
function MobileMenu() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  )

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[320px] sm:w-[400px] flex flex-col p-0 data-[state=open]:duration-700 data-[state=closed]:duration-400"
      >
        <SheetHeader className="border-b border-border/40 px-6 py-5">
          <SheetTitle className="text-left text-2xl font-bold text-primary">
          SEAGM
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
          {/* Mobile Search */}
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-11 w-full pr-11 text-base"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-9 w-9 rounded-md"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Categories */}
          <nav className="flex flex-col gap-2">
            {Object.entries(categories).map(([category, subcategories]) => (
              <Collapsible
                key={category}
                open={openCategories[category]}
                onOpenChange={() => toggleCategory(category)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-base font-semibold transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 uppercase">
                  <span>{category}</span>
                  <div className="transition-transform duration-300 ease-in-out">
                    {openCategories[category] ? (
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    ) : (
                      <ChevronRight className="h-4 w-4 rotate-0" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=open]:duration-300 data-[state=closed]:duration-200">
                  <div className="flex flex-col gap-1 py-2 pl-4 pr-2">
                    {subcategories.map((subcategory) => {
                      const Icon = getSubcategoryIcon(subcategory)
                      return (
                        <Link
                          key={subcategory}
                          href={getCategoryUrl(category, subcategory)}
                          className="flex items-center gap-3 rounded-md px-4 py-2.5 text-sm text-muted-foreground transition-all duration-150 hover:bg-accent hover:text-accent-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Close sheet when link is clicked
                            const sheetClose = document.querySelector('[data-slot="sheet-close"]') as HTMLElement
                            if (sheetClose) {
                              setTimeout(() => sheetClose.click(), 100)
                            }
                          }}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="whitespace-nowrap">{subcategory}</span>
                        </Link>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </nav>

          {/* Mobile Sign In Button */}
          <div className="mt-auto border-t border-border/40 pt-6 pb-2">
            <Button variant="outline" className="w-full h-11 text-base font-medium" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md border-b border-border/40">
      <div className="container mx-auto max-w-[1440px] flex h-16 items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8">
        {/* Left Side: Mobile Menu, Logo, and Navigation */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Button */}
          <MobileMenu />

          {/* Logo/Site Title */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80 rounded-md px-1 -ml-1"
          >
            <span className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
            SEAGM
            </span>
          </Link>

          {/* Desktop Categories with Navigation Menu */}
          <NavigationMenu className="hidden md:flex max-w-max ml-2 lg:ml-4">
            <NavigationMenuList className="gap-1">
              {Object.entries(categories).map(([category, subcategories]) => (
                <NavigationMenuItem key={category}>
                  <NavigationMenuTrigger className="h-9 px-4 text-sm font-medium transition-all hover:bg-accent/50 uppercase">
                    {category}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {subcategories.map((subcategory) => {
                        const Icon = getSubcategoryIcon(subcategory)
                        return (
                          <li key={subcategory}>
                            <NavigationMenuLink asChild className="flex-row">
                              <Link
                                href={getCategoryUrl(category, subcategory)}
                                className="flex flex-row items-center gap-2 select-none rounded-md px-3 py-2.5 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98]"
                              >
                                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span className="font-medium leading-tight whitespace-nowrap">
                                  {subcategory}
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side: Search and Sign In */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <div className="relative hidden sm:flex items-center md:max-w-sm lg:max-w-md">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-9 w-full pr-9 transition-all focus-visible:ring-2"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 h-9 w-9 rounded-l-none hover:bg-transparent"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden h-9 w-9"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Sign In Button */}
          <Button
            variant="outline"
            className="h-9 px-3 sm:px-4 text-sm font-medium transition-all hover:bg-accent active:scale-95"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
