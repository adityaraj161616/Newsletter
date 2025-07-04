"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([leftContentRef.current, rightContentRef.current], {
        opacity: 0,
        y: 60,
      })

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 })

      // Animate left content
      tl.to(leftContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        // Animate right content
        .to(
          rightContentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )

      // Headline animation
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.8,
          },
        )
      }

      // Subheading animation
      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 1.2,
          },
        )
      }

      // CTA buttons animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1.5,
          },
        )
      }

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1.8,
          },
        )
      }

      // Video parallax effect
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.1,
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Mouse move parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window

        const xPercent = (clientX / innerWidth - 0.5) * 2
        const yPercent = (clientY / innerHeight - 0.5) * 2

        gsap.to(rightContentRef.current, {
          x: xPercent * 20,
          y: yPercent * 10,
          duration: 0.8,
          ease: "power2.out",
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Parallax Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: "100px 100px",
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-8">
            <div className="space-y-6">
              <h1
                ref={headlineRef}
                className="fluid-text-5xl lg:fluid-text-6xl font-serif font-bold text-white leading-tight"
              >
                <span className="block">Charter is your guide</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  to the future of work.
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <p ref={subheadingRef} className="fluid-text-xl text-slate-300 leading-relaxed max-w-lg text-pretty">
                Join 100k+ Charter newsletter subscribers who get our reporting and analysis of workplace trends,
                management tips, and industry intelligence.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-xl group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  asChild
                >
                  <Link href="/signup" className="flex items-center">
                    Sign up for free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-400 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl bg-transparent group"
                  asChild
                >
                  <Link href="/articles" className="flex items-center">
                    <Play className="mr-2 w-5 h-5" />
                    Explore Content
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-purple-400 mr-2" />
                  <div className="fluid-text-2xl font-bold text-white">100K+</div>
                </div>
                <div className="text-slate-400 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
                  <div className="fluid-text-2xl font-bold text-white">500+</div>
                </div>
                <div className="text-slate-400 text-sm">Articles</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-pink-400 mr-2" />
                  <div className="fluid-text-2xl font-bold text-white">50+</div>
                </div>
                <div className="text-slate-400 text-sm">Tools</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Card */}
          <div ref={rightContentRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone mockups like Charterworks */}
              <div className="relative z-10 space-y-4">
                {/* Main phone */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-gray-500">9:00</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-4 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">Future of Work Speed Round</h3>

                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-4 mb-4">
                    <div className="w-full h-24 bg-white/20 rounded-lg"></div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span>Deutsche Bank's return-to-office mandate has sparked significant debate</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>New concerns about feasibility of requiring three days</span>
                    </div>
                  </div>
                </div>

                {/* Secondary phone */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500 absolute -right-8 -top-8 z-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-gray-500">9:00</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-4 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">AI and Work Radar</h3>

                  <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 mb-4">
                    <div className="w-full h-24 bg-white/20 rounded-lg"></div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span>One helpful prompt to get ChatGPT to summarize</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>New York Times: "Act as if you are my executive assistant"</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}
