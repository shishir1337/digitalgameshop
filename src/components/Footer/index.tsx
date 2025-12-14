"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, HelpCircle, Shield, FileText } from "lucide-react"

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { name: "Game Cards", href: "/card" },
      { name: "Direct Top-Up", href: "/direct-topup" },
      { name: "Special Deals", href: "/special_deals" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Order Status", href: "/orders" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "News & Blog", href: "https://news.seagm.com" },
      { name: "Careers", href: "/careers" },
      { name: "Partners", href: "/partners" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Refund Policy", href: "/refund" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/seagm" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/seagm" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/seagm" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/seagm" },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight text-primary">
                  SEAGM
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Your trusted gaming partner for digital game cards, top-ups, and gift cards. 
                Shop with confidence and enjoy instant delivery.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 group"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                {footerLinks.shop.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                {footerLinks.support.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                {footerLinks.company.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                {footerLinks.legal.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} SEAGM. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Privacy
                </Link>
                <span className="text-border">•</span>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Terms
                </Link>
                <span className="text-border">•</span>
                <Link
                  href="/cookies"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Cookies
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <HelpCircle className="h-4 w-4 text-primary" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
