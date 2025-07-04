"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, DollarSign, Users, Calendar, Globe, Mail, BarChart3, PieChart, Target, Zap } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface IncomeReport {
  id: number
  siteName: string
  category: string
  monthlyRevenue: number
  yearlyRevenue: number
  growth: string
  subscribers: number
  description: string
  image: string
  tags: string[]
  launchDate: string
  traffic: number
  fullDescription: string
  revenueBreakdown: {
    subscriptions: number
    advertising: number
    affiliates: number
    products: number
  }
  keyMetrics: {
    openRate: string
    clickRate: string
    conversionRate: string
    churnRate: string
  }
  strategies: string[]
  tools: string[]
  challenges: string[]
  advice: string[]
}

// Mock data - in real app this would come from API
const getReportById = (id: number): IncomeReport | null => {
  const reports: IncomeReport[] = [
    {
      id: 1,
      siteName: "ContentMaster Pro",
      category: "Newsletter",
      monthlyRevenue: 45000,
      yearlyRevenue: 540000,
      growth: "+23%",
      subscribers: 85000,
      description: "Premium newsletter focused on content marketing strategies and growth hacking techniques.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      tags: ["Content Marketing", "Growth", "B2B"],
      launchDate: "2022-03-15",
      traffic: 125000,
      fullDescription:
        "ContentMaster Pro started as a simple weekly newsletter sharing content marketing tips. Over 18 months, it has grown into a comprehensive resource for content marketers, featuring in-depth case studies, exclusive interviews with industry leaders, and actionable strategies that subscribers can implement immediately.",
      revenueBreakdown: {
        subscriptions: 32000,
        advertising: 8000,
        affiliates: 3500,
        products: 1500,
      },
      keyMetrics: {
        openRate: "42%",
        clickRate: "8.5%",
        conversionRate: "3.2%",
        churnRate: "2.1%",
      },
      strategies: [
        "Focus on actionable, implementable content over theory",
        "Build relationships with industry leaders for exclusive interviews",
        "Create detailed case studies with real numbers and results",
        "Segment audience based on experience level and interests",
        "Offer premium tiers with additional resources and community access",
      ],
      tools: [
        "ConvertKit for email marketing",
        "Typeform for surveys and feedback",
        "Canva for visual content creation",
        "Google Analytics for traffic analysis",
        "Stripe for payment processing",
      ],
      challenges: [
        "Maintaining consistent quality while scaling content production",
        "Balancing free value with premium offerings",
        "Managing subscriber expectations and feedback",
        "Competing with larger, established publications",
      ],
      advice: [
        "Start with a clear niche and gradually expand",
        "Consistency is more important than perfection",
        "Build genuine relationships with your audience",
        "Don't be afraid to share real numbers and failures",
        "Invest in good tools early to save time later",
      ],
    },
    // Add more reports as needed
  ]

  return reports.find((report) => report.id === id) || null
}

export default function IncomeReportDetail() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<IncomeReport | null>(null)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = Number.parseInt(params.id as string)
    const reportData = getReportById(id)
    setReport(reportData)
    setLoading(false)
  }, [params.id])

  useEffect(() => {
    if (!loading && report) {
      const ctx = gsap.context(() => {
        // Animate sections
        gsap.from(".detail-section", {
          y: 60,
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

        // Animate revenue breakdown bars
        gsap.from(".breakdown-bar", {
          width: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".revenue-breakdown",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [loading, report])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Report Not Found</h1>
          <p className="text-slate-600 mb-8">The income report you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/income">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Reports
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={report.image || "/placeholder.svg"}
            alt={report.siteName}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/income">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Reports
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 backdrop-blur-sm">
                {report.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{report.siteName}</h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">{report.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {report.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(report.monthlyRevenue)}</div>
                  <div className="text-slate-400 text-sm">Monthly Revenue</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-400 mb-1">{report.growth}</div>
                  <div className="text-slate-400 text-sm">Growth Rate</div>
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <img
                src={report.image || "/placeholder.svg"}
                alt={report.siteName}
                className="w-full max-w-md mx-auto lg:ml-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div className="detail-section">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
                <p className="text-lg text-slate-700 leading-relaxed">{report.fullDescription}</p>
              </div>

              {/* Revenue Breakdown */}
              <div className="detail-section revenue-breakdown">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Revenue Breakdown</h2>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Subscriptions</span>
                        <span className="font-bold text-slate-900">
                          {formatCurrency(report.revenueBreakdown.subscriptions)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="breakdown-bar h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${(report.revenueBreakdown.subscriptions / report.monthlyRevenue) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Advertising</span>
                        <span className="font-bold text-slate-900">
                          {formatCurrency(report.revenueBreakdown.advertising)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="breakdown-bar h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                          style={{ width: `${(report.revenueBreakdown.advertising / report.monthlyRevenue) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Affiliates</span>
                        <span className="font-bold text-slate-900">
                          {formatCurrency(report.revenueBreakdown.affiliates)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="breakdown-bar h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                          style={{ width: `${(report.revenueBreakdown.affiliates / report.monthlyRevenue) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Products</span>
                        <span className="font-bold text-slate-900">
                          {formatCurrency(report.revenueBreakdown.products)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="breakdown-bar h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          style={{ width: `${(report.revenueBreakdown.products / report.monthlyRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Strategies */}
              <div className="detail-section">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Growth Strategies</h2>
                <div className="space-y-4">
                  {report.strategies.map((strategy, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-slate-700">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="detail-section">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Tools & Technology</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.tools.map((tool, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                      <Zap className="w-5 h-5 text-blue-500" />
                      <span className="text-slate-700">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="detail-section">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Challenges</h2>
                <div className="space-y-4">
                  {report.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                      <Target className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advice */}
              <div className="detail-section">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Advice</h2>
                <div className="space-y-4">
                  {report.advice.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                        ✓
                      </div>
                      <p className="text-slate-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Key Metrics */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Open Rate</span>
                    <span className="font-bold">{report.keyMetrics.openRate}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-600">Click Rate</span>
                    <span className="font-bold">{report.keyMetrics.clickRate}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-600">Conversion Rate</span>
                    <span className="font-bold">{report.keyMetrics.conversionRate}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-600">Churn Rate</span>
                    <span className="font-bold">{report.keyMetrics.churnRate}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-slate-600">Subscribers</span>
                    </div>
                    <span className="font-bold">{formatNumber(report.subscribers)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-slate-600">Monthly Traffic</span>
                    </div>
                    <span className="font-bold">{formatNumber(report.traffic)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="text-slate-600">Launch Date</span>
                    </div>
                    <span className="font-bold">{new Date(report.launchDate).toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="text-slate-600">Yearly Revenue</span>
                    </div>
                    <span className="font-bold">{formatCurrency(report.yearlyRevenue)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Want to share your story?</h3>
                  <p className="text-slate-600 mb-4 text-sm">Submit your income report and inspire other creators.</p>
                  <Button className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
