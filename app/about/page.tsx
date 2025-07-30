"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Heart, Zap, Mail, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pageRef.current) return

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })

      // Stats animation
      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Mission section animation
      gsap.from(".mission-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Values animation
      gsap.from(".value-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Team animation
      gsap.from(".team-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // CTA animation
      gsap.from(".cta-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hero-content text-center">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm mb-6">
              <Heart className="w-4 h-4 mr-2" />
              About WorkFlow
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Shaping the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Work Together
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to help professionals and organizations thrive in the rapidly evolving world of work.
              Through insights, tools, and community, we're building the future of work, today.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100k+</div>
              <div className="text-slate-600">Newsletter Subscribers</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Expert Articles</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-slate-600">Productivity Tools</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-slate-600">Reader Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="mission-content">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At WorkFlow, we believe the future of work should be more human, more flexible, and more fulfilling.
                We're dedicated to providing the insights, tools, and strategies that help individuals and organizations
                navigate the changing landscape of work.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                From AI automation to remote team management, from productivity hacks to leadership strategies, we cover
                everything you need to thrive in the modern workplace.
              </p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                asChild
              >
                <Link href="/articles">
                  Read Our Articles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="mission-content">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we approach the future of work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="value-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Human-Centered</h3>
                <p className="text-slate-600 leading-relaxed">
                  We put people first in everything we do. Technology should serve humans, not the other way around.
                </p>
              </CardContent>
            </Card>

            <Card className="value-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Results-Driven</h3>
                <p className="text-slate-600 leading-relaxed">
                  We focus on actionable insights and practical solutions that deliver real results for our readers.
                </p>
              </CardContent>
            </Card>

            <Card className="value-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Innovation</h3>
                <p className="text-slate-600 leading-relaxed">
                  We embrace change and continuously explore new ways to improve how we work and live.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our diverse team of experts, writers, and innovators are passionate about shaping the future of work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="team-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Sarah Johnson"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Sarah Johnson</h3>
                <p className="text-purple-600 font-medium mb-4">Founder & CEO</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Former McKinsey consultant with 15+ years in organizational transformation and future of work
                  research.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-slate-400 hover:text-purple-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="team-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                  alt="Michael Chen"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Michael Chen</h3>
                <p className="text-blue-600 font-medium mb-4">Head of Research</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  AI researcher and former Google engineer specializing in workplace automation and productivity tools.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-slate-400 hover:text-purple-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="team-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                  alt="Emily Rodriguez"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Emily Rodriguez</h3>
                <p className="text-green-600 font-medium mb-4">Content Director</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Award-winning journalist and author with expertise in remote work, leadership, and workplace culture.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-slate-400 hover:text-purple-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="cta-content">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Shape Your Future of Work?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join our community of forward-thinking professionals and get the insights you need to thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100" asChild>
                <Link href="/pricing">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/articles">Read Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
