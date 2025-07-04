"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Twitter, Linkedin, Github, Mail, ArrowRight, Heart, Sparkles } from "lucide-react"
import { gsap } from "gsap"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo glow animation
      gsap.to(".footer-logo", {
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const footerLinks = {
    Platform: [
      { name: "Articles", href: "/articles" },
      { name: "Playbooks", href: "/playbooks" },
      { name: "Tools", href: "/tools" },
      { name: "Income Reports", href: "/income" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "API", href: "/api" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  }

  return (
    <footer ref={footerRef} className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-forest-600 text-white border-forest-500">
                <Sparkles className="w-4 h-4 mr-1" />
                Stay Updated
              </Badge>
              <h3 className="fluid-text-3xl font-serif font-bold">Never Miss an Insight</h3>
              <p className="fluid-text-lg text-slate-300">
                Get weekly insights, exclusive tools, and expert strategies delivered to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-forest-500 focus:ring-forest-500"
              />
              <Button className="bg-forest-600 hover:bg-forest-700 whitespace-nowrap px-6">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="footer-logo w-12 h-12 bg-gradient-to-br from-slate-800 to-forest-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-serif font-bold group-hover:text-forest-400 transition-colors duration-300">
                CourierPress
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-md">
              The premier platform for content creators, offering expert insights, powerful tools, and transparent
              income reports to help you succeed in the creator economy.
            </p>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-3 rounded-xl"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-3 rounded-xl"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-3 rounded-xl"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-3 rounded-xl"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-semibold text-white text-lg">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">© 2024 CourierPress. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for creators worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
