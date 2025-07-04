"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"

export default function FeaturedCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(cardRef.current, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Hover effect
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const card = cardRef.current
      if (card) {
        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
        }
      }
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-sm bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="relative">
        <img
          src="/placeholder.svg?height=200&width=400"
          alt="Featured Article"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-forest-600 text-white font-medium">Latest Issue</Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Jan 15, 2024
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />8 min read
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight group-hover:text-forest-700 transition-colors duration-300">
          The Future of AI-Powered Content Creation
        </h3>

        <p className="text-slate-600 leading-relaxed text-pretty">
          Discover how artificial intelligence is revolutionizing the way we create, distribute, and consume content in
          the digital age.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <div className="font-medium text-slate-900">Sarah Chen</div>
            <div className="text-sm text-slate-500">Senior Editor</div>
          </div>
        </div>

        <Button
          className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl group/btn transition-all duration-300"
          asChild
        >
          <Link href="/articles/ai-powered-content-creation" className="flex items-center justify-center">
            Read Full Article
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
