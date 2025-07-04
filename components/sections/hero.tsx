"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Users, TrendingUp, Mail, Star } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Set loaded state immediately
    setIsLoaded(true)

    const timer = setTimeout(() => {
      if (!heroRef.current) return

      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set([badgeRef.current, headlineRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
          opacity: 0,
          y: 50,
        })

        gsap.set(".phone-mockup", {
          opacity: 0,
          y: 100,
          scale: 0.8,
        })

        // Main animation timeline
        const tl = gsap.timeline()

        // Badge animation
        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })

        // Headline animation with typewriter effect
        tl.to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        )

        // Subtitle animation
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )

        // CTA buttons animation
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )

        // Stats animation
        tl.to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )

        // Phone mockups animation
        tl.to(
          ".phone-mockup",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=1",
        )

        // Background parallax
        gsap.to(backgroundRef.current, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })

        // Floating elements
        gsap.to(".floating-element", {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-5, 5)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        })
      }, heroRef)

      return () => ctx.revert()
    }, 100) // Small delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </section>
    )
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background Image with Parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/90 to-blue-900/80" />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="floating-element absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            top: "20%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="floating-element absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            top: "60%",
            right: "10%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
          }}
        />
        <div
          className="floating-element absolute w-48 h-48 bg-green-500/10 rounded-full blur-3xl"
          style={{
            bottom: "20%",
            left: "20%",
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <div ref={badgeRef}>
                <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2" />
                  Join 100k+ Newsletter Subscribers
                </Badge>
              </div>

              <div className="space-y-4">
                <div ref={headlineRef}>
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    WorkFlow is your guide
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      to the future of work.
                    </span>
                  </h1>
                </div>

                <div ref={subtitleRef} className="text-xl md:text-2xl text-slate-300 max-w-2xl">
                  Join 100k WorkFlow newsletter subscribers who get our reporting and analysis of workplace trends,
                  management tips, and more.
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-xl group"
                asChild
              >
                <Link href="/pricing">
                  Try WorkFlow Pro for $1
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent group"
                asChild
              >
                <Link href="/signup">
                  <Play className="mr-2 w-5 h-5" />
                  Sign Up for Free
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Users className="w-6 h-6 text-purple-400 mr-2" />
                </div>
                <div className="text-2xl font-bold text-white">100k+</div>
                <div className="text-slate-400 text-sm">Subscribers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400 mr-2" />
                </div>
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-slate-400 text-sm">Open Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Mail className="w-6 h-6 text-green-400 mr-2" />
                </div>
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-slate-400 text-sm">Insights</div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockups */}
          <div ref={phoneRef} className="relative">
            <div className="flex justify-center items-center space-x-4">
              {/* Phone 1 */}
              <div className="phone-mockup relative">
                <div className="w-64 h-[500px] bg-white rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-slate-100 rounded-[2rem] overflow-hidden">
                    <div className="bg-slate-900 text-white p-4 text-center">
                      <div className="text-sm font-semibold">Future of Work Speed Round</div>
                    </div>
                    <div className="p-4">
                      <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop"
                        alt="Newsletter preview"
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                        <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - Center */}
              <div className="phone-mockup relative z-10 transform scale-110">
                <div className="w-64 h-[500px] bg-white rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-slate-100 rounded-[2rem] overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 text-center">
                      <div className="text-sm font-semibold">AI and Work Radar</div>
                    </div>
                    <div className="p-4">
                      <img
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
                        alt="AI Newsletter preview"
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="space-y-2">
                        <div className="text-xs text-purple-600 font-semibold">• One helpful prompt</div>
                        <div className="h-2 bg-slate-300 rounded w-full"></div>
                        <div className="h-2 bg-slate-300 rounded w-4/5"></div>
                        <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 3 */}
              <div className="phone-mockup relative">
                <div className="w-64 h-[500px] bg-white rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-slate-100 rounded-[2rem] overflow-hidden">
                    <div className="bg-orange-500 text-white p-4 text-center">
                      <div className="text-sm font-semibold">Here are this week's best work tips</div>
                    </div>
                    <div className="p-4">
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
                        alt="Tips newsletter preview"
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="space-y-2">
                        <div className="text-xs text-orange-600 font-semibold">• Make it easy for stressed-out</div>
                        <div className="h-2 bg-slate-300 rounded w-full"></div>
                        <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
