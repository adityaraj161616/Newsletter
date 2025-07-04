"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator",
    company: "CreativeHub",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "CourierPress has completely transformed how I approach content strategy. The insights are invaluable and the tools save me hours every week.",
    category: "Content Strategy",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Newsletter Owner",
    company: "TechInsights",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The growth strategies I learned from CourierPress helped me scale from 1K to 50K subscribers in just 6 months. Absolutely game-changing.",
    category: "Growth",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Marketing Director",
    company: "StartupFlow",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The income reports provide incredible transparency and inspiration. It's amazing to see what's possible in the creator economy.",
    category: "Business",
  },
  {
    id: 4,
    name: "David Kim",
    role: "YouTuber",
    company: "TechReviews",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The tools section is a goldmine. I use the engagement calculator and ROI tracker weekly to optimize my content performance.",
    category: "Analytics",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Course Creator",
    company: "LearnWithLisa",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "CourierPress keeps me ahead of industry trends. The expert insights have directly contributed to my business growth.",
    category: "Education",
  },
]

export default function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".testimonial-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">
            <Star className="w-4 h-4 mr-1" />
            Success Stories
          </Badge>
          <h2 className="fluid-text-4xl font-serif font-bold text-slate-900 mb-6">What Our Community Says</h2>
          <p className="fluid-text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Join thousands of creators who have transformed their content strategy with CourierPress.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative mb-12">
          <Card className="testimonial-card max-w-4xl mx-auto border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center space-y-6">
                <Quote className="w-12 h-12 text-slate-300 mx-auto" />

                <blockquote className="fluid-text-2xl font-serif text-slate-900 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 text-slate-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900 text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-slate-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                    <Badge className="mt-1 bg-slate-100 text-slate-700">{testimonials[currentIndex].category}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:-left-16">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg border-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:-right-16">
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg border-slate-200 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-slate-900 w-8" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="fluid-text-3xl font-bold text-slate-900">50K+</div>
            <div className="text-slate-600">Happy Subscribers</div>
          </div>
          <div className="space-y-2">
            <div className="fluid-text-3xl font-bold text-slate-900">4.9/5</div>
            <div className="text-slate-600">Average Rating</div>
          </div>
          <div className="space-y-2">
            <div className="fluid-text-3xl font-bold text-slate-900">95%</div>
            <div className="text-slate-600">Satisfaction Rate</div>
          </div>
          <div className="space-y-2">
            <div className="fluid-text-3xl font-bold text-slate-900">2M+</div>
            <div className="text-slate-600">Tools Used</div>
          </div>
        </div>
      </div>
    </section>
  )
}
