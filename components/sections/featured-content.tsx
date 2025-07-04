"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, User } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const featuredArticles = [
  {
    id: 1,
    title: "The Complete Guide to Last-Mile Delivery Optimization",
    description: "Discover proven strategies to reduce costs and improve delivery times in your last-mile operations.",
    category: "Delivery",
    readTime: "12 min read",
    author: "Sarah Chen",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "Supply Chain Resilience in 2024",
    description: "How leading companies are building anti-fragile supply chains that thrive under pressure.",
    category: "Strategy",
    readTime: "8 min read",
    author: "Marcus Rodriguez",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "AI-Powered Route Optimization",
    description: "Real-world case studies of companies saving millions with intelligent routing algorithms.",
    category: "Technology",
    readTime: "15 min read",
    author: "Dr. Emily Watson",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function FeaturedContent() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Cards stagger animation
      gsap.from(cardsRef.current?.children, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep-dive analysis and actionable strategies from industry leaders
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <Card
              key={article.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    index === 0 ? "h-64 lg:h-80" : "h-48"
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-teal-600 text-white">{article.category}</Badge>
                </div>
                {article.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle
                  className={`group-hover:text-teal-600 transition-colors ${index === 0 ? "text-2xl" : "text-xl"}`}
                >
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600">{article.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                </div>

                <Button variant="ghost" className="group/btn p-0 h-auto text-teal-600 hover:text-teal-700">
                  <Link href={`/articles/${article.id}`} className="flex items-center">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
            <Link href="/articles">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
