"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mail, Check, Sparkles, Zap, TrendingUp } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const benefits = [
  {
    icon: Sparkles,
    text: "Weekly expert insights delivered to your inbox",
  },
  {
    icon: Zap,
    text: "Exclusive access to premium tools and resources",
  },
  {
    icon: TrendingUp,
    text: "Early access to new features and content",
  },
]

export default function NewsletterSignup() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulse animation for the main card
      gsap.to(".signup-card", {
        scale: 1.02,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Benefits animation
      gsap.from(".benefit-item", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Main content animation
      gsap.from(".signup-content", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="signup-card border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <div className="signup-content text-center space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-forest-100 text-forest-800 border-forest-200">
                    <Mail className="w-4 h-4 mr-1" />
                    Join Our Community
                  </Badge>

                  <h2 className="fluid-text-4xl font-serif font-bold text-slate-900">Stay Ahead of the Curve</h2>

                  <p className="fluid-text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
                    Get weekly insights, exclusive tools, and expert strategies delivered straight to your inbox. Join
                    50,000+ creators who trust CourierPress.
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 h-12 px-4 text-lg border-slate-300 focus:border-forest-500 focus:ring-forest-500"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-xl group whitespace-nowrap"
                      >
                        {isLoading ? (
                          "Subscribing..."
                        ) : (
                          <>
                            Subscribe Free
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-sm text-slate-500">No spam, unsubscribe at any time. We respect your privacy.</p>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="fluid-text-2xl font-bold text-slate-900">Welcome to CourierPress!</h3>
                      <p className="text-slate-600">
                        Check your email for a confirmation link to complete your subscription.
                      </p>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item flex items-center space-x-3 text-left">
                      <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-forest-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-center space-x-8 pt-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 bg-slate-300 rounded-full border-2 border-white" />
                      ))}
                    </div>
                    <span>50K+ subscribers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm" />
                    ))}
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
