"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  BarChart3,
  TrendingUp,
  Zap,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  Target,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const tools = [
  {
    id: 1,
    name: "Content ROI Calculator",
    description: "Calculate the return on investment for your content marketing efforts.",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    usage: 15420,
    category: "Analytics",
  },
  {
    id: 2,
    name: "Engagement Rate Analyzer",
    description: "Analyze and optimize your social media engagement rates.",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    usage: 12890,
    category: "Social Media",
  },
  {
    id: 3,
    name: "Newsletter Growth Tracker",
    description: "Track and predict your newsletter subscriber growth.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    usage: 9750,
    category: "Email Marketing",
  },
  {
    id: 4,
    name: "Content Calendar Generator",
    description: "Generate optimized content calendars for consistent publishing.",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    usage: 8340,
    category: "Planning",
  },
  {
    id: 5,
    name: "Audience Targeting Tool",
    description: "Identify and target your ideal audience segments.",
    icon: Target,
    color: "text-red-600",
    bgColor: "bg-red-50",
    usage: 7120,
    category: "Marketing",
  },
]

export default function ToolsPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const scrollContainer = scrollContainerRef.current
      if (scrollContainer) {
        gsap.to(scrollContainer, {
          x: () => -(scrollContainer.scrollWidth - scrollContainer.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            pin: false,
          },
        })
      }

      // Tool cards entrance animation
      gsap.from(".tool-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Icon animations
      gsap.from(".tool-icon", {
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-200">
            <Wrench className="w-4 h-4 mr-1" />
            Powerful Tools
          </Badge>
          <h2 className="fluid-text-4xl font-serif font-bold text-slate-900 mb-6">Tools That Drive Results</h2>
          <p className="fluid-text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Access our suite of professional tools designed to optimize your content strategy and maximize your impact.
          </p>
        </div>

        {/* Horizontal Scrolling Tools */}
        <div className="relative mb-16">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 pb-6 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="tool-card flex-shrink-0 w-80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="text-center space-y-4">
                  <div
                    className={`tool-icon w-16 h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center mx-auto`}
                  >
                    <tool.icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <Badge className="bg-slate-100 text-slate-700">{tool.category}</Badge>
                  <CardTitle className="fluid-text-xl font-semibold text-slate-900">{tool.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-slate-600 text-center leading-relaxed">{tool.description}</p>

                  <div className="text-center">
                    <div className="fluid-text-2xl font-bold text-slate-900">{tool.usage.toLocaleString()}</div>
                    <div className="text-sm text-slate-500">Times Used</div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl group"
                      asChild
                    >
                      <Link href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Calculator className="mr-2 w-5 h-5" />
                        Use Tool
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>

                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                        Instant
                      </div>
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1 text-blue-500" />
                        Data-Driven
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="fluid-text-3xl font-serif font-bold mb-4">Ready to Optimize Your Content?</h3>
          <p className="fluid-text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who use our tools to make data-driven decisions and achieve better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-8" asChild>
              <Link href="/tools">
                Explore All Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-400 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl px-8 bg-transparent"
              asChild
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
