"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Hash, ArrowRight, Flame } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const trendingTopics = [
  {
    id: 1,
    name: "AI Content Creation",
    count: 1247,
    growth: "+23%",
    color: "bg-blue-500",
    articles: 45,
  },
  {
    id: 2,
    name: "Creator Economy",
    count: 892,
    growth: "+18%",
    color: "bg-purple-500",
    articles: 32,
  },
  {
    id: 3,
    name: "Newsletter Growth",
    count: 756,
    growth: "+31%",
    color: "bg-green-500",
    articles: 28,
  },
  {
    id: 4,
    name: "Content Strategy",
    count: 634,
    growth: "+15%",
    color: "bg-orange-500",
    articles: 41,
  },
  {
    id: 5,
    name: "Social Media",
    count: 523,
    growth: "+12%",
    color: "bg-pink-500",
    articles: 37,
  },
  {
    id: 6,
    name: "Video Marketing",
    count: 445,
    growth: "+27%",
    color: "bg-red-500",
    articles: 24,
  },
  {
    id: 7,
    name: "Email Marketing",
    count: 389,
    growth: "+19%",
    color: "bg-indigo-500",
    articles: 33,
  },
  {
    id: 8,
    name: "SEO Optimization",
    count: 312,
    growth: "+22%",
    color: "bg-teal-500",
    articles: 29,
  },
]

export default function TrendingTopics() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedTopic, setSelectedTopic] = useState(trendingTopics[0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const scrollContainer = scrollContainerRef.current
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth

        gsap.to(scrollContainer, {
          x: -scrollWidth,
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

      // Stagger animation for topic cards
      gsap.from(".topic-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
            <Flame className="w-4 h-4 mr-1" />
            Trending Now
          </Badge>
          <h2 className="fluid-text-4xl font-serif font-bold text-slate-900 mb-6">What's Hot in Content</h2>
          <p className="fluid-text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Discover the most discussed topics and emerging trends shaping the content landscape today.
          </p>
        </div>

        {/* Horizontal Scrolling Topics */}
        <div className="relative mb-16">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 pb-6 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {trendingTopics.map((topic, index) => (
              <Card
                key={topic.id}
                className={`topic-card flex-shrink-0 w-80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  selectedTopic.id === topic.id ? "ring-2 ring-forest-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${topic.color}`} />
                      <Hash className="w-5 h-5 text-slate-400" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {topic.growth}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{topic.name}</h3>

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {topic.count.toLocaleString()} mentions
                    </div>
                    <div>{topic.articles} articles</div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${topic.color}`}
                      style={{ width: `${Math.min((topic.count / 1500) * 100, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Topic Details */}
        <div className="bg-slate-50 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${selectedTopic.color}`} />
                <Badge className="bg-slate-200 text-slate-800">Featured Topic</Badge>
              </div>

              <h3 className="fluid-text-3xl font-serif font-bold text-slate-900">#{selectedTopic.name}</h3>

              <p className="fluid-text-lg text-slate-600 leading-relaxed">
                Explore the latest insights, strategies, and trends in {selectedTopic.name.toLowerCase()}. Our expert
                analysis covers everything from emerging technologies to proven methodologies.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="fluid-text-2xl font-bold text-slate-900">{selectedTopic.count.toLocaleString()}</div>
                  <div className="text-slate-500">Total Mentions</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="fluid-text-2xl font-bold text-slate-900">{selectedTopic.articles}</div>
                  <div className="text-slate-500">Expert Articles</div>
                </div>
              </div>

              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl group" asChild>
                <Link href={`/topics/${selectedTopic.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  Explore Articles
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div
                    className={`w-20 h-20 ${selectedTopic.color} rounded-2xl mx-auto flex items-center justify-center`}
                  >
                    <Hash className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="fluid-text-4xl font-bold text-slate-900">{selectedTopic.growth}</div>
                    <div className="text-slate-600">Growth This Month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
