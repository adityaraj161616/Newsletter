"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturedNewsletter() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger animation
      gsap.from(cardsRef.current?.children, {
        y: 100,
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

  const newsletters = [
    {
      id: 1,
      title: "Weekly Insights",
      description: "Deep-dive analysis on the latest trends in content creation and digital marketing.",
      subscribers: "45K",
      frequency: "Weekly",
      category: "Analysis",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: 2,
      title: "Creator Spotlight",
      description: "Exclusive interviews and behind-the-scenes stories from top content creators.",
      subscribers: "32K",
      frequency: "Bi-weekly",
      category: "Interviews",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: 3,
      title: "Tool Reviews",
      description: "Comprehensive reviews of the latest tools and platforms for content creators.",
      subscribers: "28K",
      frequency: "Monthly",
      category: "Reviews",
      color: "bg-green-50 text-green-700 border-green-200",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-forest-100 text-forest-800 border-forest-200">Newsletter Collection</Badge>
          <h2 className="fluid-text-4xl font-serif font-bold text-slate-900 mb-6">
            Stay Informed with Our Newsletters
          </h2>
          <p className="fluid-text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Choose from our curated collection of newsletters, each designed to keep you at the forefront of your
            industry.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id} className="card-hover border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={newsletter.color}>{newsletter.category}</Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {newsletter.frequency}
                  </div>
                </div>

                <CardTitle className="fluid-text-2xl font-serif text-slate-900">{newsletter.title}</CardTitle>

                <p className="text-slate-600 leading-relaxed text-pretty">{newsletter.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-500">
                    <Users className="w-4 h-4 mr-1" />
                    {newsletter.subscribers} subscribers
                  </div>
                  <div className="flex items-center text-forest-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Growing
                  </div>
                </div>

                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl group">
                  Subscribe Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl px-8 bg-transparent"
            asChild
          >
            <Link href="/newsletters">View All Newsletters</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
