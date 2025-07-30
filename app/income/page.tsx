"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Search, Filter, Grid3X3, List, ExternalLink } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface IncomeReport {
  id: string
  name: string
  description: string
  category: string
  monthlyRevenue: number
  yearlyRevenue: number
  subscribers: number
  openRate: number
  clickRate: number
  growthRate: number
  image: string
  tags: string[]
  founded: string
  founder: string
  primaryRevenue: string
  tools: string[]
  keyInsights: string[]
}

export default function IncomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("revenue")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [reports, setReports] = useState<IncomeReport[]>([])
  const [loading, setLoading] = useState(true)
  const pageRef = useRef<HTMLDivElement>(null)

  const categories = ["All", "Newsletter", "Course Platform", "SaaS Tool", "Content Creator", "Agency", "E-commerce"]

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setReports([
        {
          id: "morning-brew",
          name: "Morning Brew",
          description:
            "Daily business newsletter with 4M+ subscribers delivering the most important business news in a witty, conversational tone.",
          category: "Newsletter",
          monthlyRevenue: 2500000,
          yearlyRevenue: 30000000,
          subscribers: 4200000,
          openRate: 42,
          clickRate: 8.5,
          growthRate: 15,
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
          tags: ["Newsletter", "Business News", "Daily", "B2B"],
          founded: "2015",
          founder: "Alex Lieberman & Austin Rief",
          primaryRevenue: "Advertising & Sponsorships",
          tools: ["ConvertKit", "Typeform", "Slack", "Notion"],
          keyInsights: [
            "Consistent daily publishing builds habit",
            "Personality-driven content increases engagement",
            "Premium advertising rates through quality audience",
          ],
        },
        {
          id: "convertkit",
          name: "ConvertKit",
          description:
            "Email marketing platform specifically designed for creators, bloggers, and online entrepreneurs.",
          category: "SaaS Tool",
          monthlyRevenue: 2800000,
          yearlyRevenue: 33600000,
          subscribers: 45000,
          openRate: 28,
          clickRate: 6.2,
          growthRate: 22,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          tags: ["Email Marketing", "SaaS", "Creator Tools", "Automation"],
          founded: "2013",
          founder: "Nathan Barry",
          primaryRevenue: "Monthly Subscriptions",
          tools: ["Ruby on Rails", "PostgreSQL", "Stripe", "Intercom"],
          keyInsights: [
            "Creator-focused features drive premium pricing",
            "Educational content marketing builds trust",
            "Freemium model accelerates user acquisition",
          ],
        },
        {
          id: "pat-flynn",
          name: "Smart Passive Income",
          description:
            "Pat Flynn's business teaching entrepreneurs how to build online businesses through courses, podcasts, and coaching.",
          category: "Content Creator",
          monthlyRevenue: 180000,
          yearlyRevenue: 2160000,
          subscribers: 250000,
          openRate: 35,
          clickRate: 12,
          growthRate: 8,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          tags: ["Education", "Courses", "Podcast", "Coaching"],
          founded: "2008",
          founder: "Pat Flynn",
          primaryRevenue: "Course Sales & Affiliate Marketing",
          tools: ["Teachable", "ConvertKit", "Libsyn", "WordPress"],
          keyInsights: [
            "Transparency builds massive trust with audience",
            "Multiple revenue streams reduce risk",
            "Community building drives long-term value",
          ],
        },
        {
          id: "beehiiv",
          name: "beehiiv",
          description:
            "Newsletter platform built by the Morning Brew team, focusing on monetization and growth tools for creators.",
          category: "SaaS Tool",
          monthlyRevenue: 450000,
          yearlyRevenue: 5400000,
          subscribers: 12000,
          openRate: 31,
          clickRate: 7.8,
          growthRate: 45,
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
          tags: ["Newsletter Platform", "SaaS", "Creator Economy", "Monetization"],
          founded: "2021",
          founder: "Tyler Denk & Jake Hurd",
          primaryRevenue: "Platform Subscriptions",
          tools: ["React", "Node.js", "PostgreSQL", "AWS"],
          keyInsights: [
            "Creator-first approach differentiates from competitors",
            "Built-in monetization tools increase platform value",
            "Rapid growth through creator network effects",
          ],
        },
        {
          id: "the-hustle",
          name: "The Hustle",
          description:
            "Business and tech newsletter acquired by HubSpot, known for its irreverent tone and millennial-focused content.",
          category: "Newsletter",
          monthlyRevenue: 800000,
          yearlyRevenue: 9600000,
          subscribers: 2100000,
          openRate: 38,
          clickRate: 9.2,
          growthRate: 12,
          image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
          tags: ["Newsletter", "Business", "Tech", "Millennial"],
          founded: "2016",
          founder: "Sam Parr & John Havel",
          primaryRevenue: "Advertising & Events",
          tools: ["Mailchimp", "WordPress", "Google Analytics", "Slack"],
          keyInsights: [
            "Unique voice cuts through newsletter noise",
            "Event monetization complements advertising",
            "Strategic acquisition maximized exit value",
          ],
        },
        {
          id: "creator-economy-report",
          name: "Creator Economy Report",
          description: "Weekly newsletter analyzing the creator economy with data-driven insights and trend analysis.",
          category: "Newsletter",
          monthlyRevenue: 25000,
          yearlyRevenue: 300000,
          subscribers: 15000,
          openRate: 45,
          clickRate: 15,
          growthRate: 25,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          tags: ["Creator Economy", "Data Analysis", "Trends", "Weekly"],
          founded: "2022",
          founder: "ConvertKit Research Team",
          primaryRevenue: "Sponsorships & Premium Subscriptions",
          tools: ["ConvertKit", "Airtable", "Figma", "Notion"],
          keyInsights: [
            "Data-driven content commands premium rates",
            "Niche focus enables higher engagement",
            "Research-backed insights build authority",
          ],
        },
        {
          id: "gumroad",
          name: "Gumroad",
          description:
            "Platform enabling creators to sell digital products directly to their audience with simple setup and payment processing.",
          category: "E-commerce",
          monthlyRevenue: 1200000,
          yearlyRevenue: 14400000,
          subscribers: 85000,
          openRate: 25,
          clickRate: 5.5,
          growthRate: 18,
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
          tags: ["E-commerce", "Digital Products", "Creator Tools", "Marketplace"],
          founded: "2011",
          founder: "Sahil Lavingia",
          primaryRevenue: "Transaction Fees",
          tools: ["Ruby on Rails", "Stripe", "AWS", "PostgreSQL"],
          keyInsights: [
            "Simple setup removes barriers for creators",
            "Transaction-based model aligns with creator success",
            "Community features increase platform stickiness",
          ],
        },
        {
          id: "substack",
          name: "Substack",
          description:
            "Newsletter platform that enables writers to build paid subscriber bases with built-in payment processing.",
          category: "SaaS Tool",
          monthlyRevenue: 2000000,
          yearlyRevenue: 24000000,
          subscribers: 500000,
          openRate: 40,
          clickRate: 8,
          growthRate: 30,
          image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
          tags: ["Newsletter Platform", "Paid Subscriptions", "Writing", "Publishing"],
          founded: "2017",
          founder: "Chris Best, Hamish McKenzie & Jairaj Sethi",
          primaryRevenue: "Platform Fees (10%)",
          tools: ["React", "Node.js", "Stripe", "PostgreSQL"],
          keyInsights: [
            "Writer-first approach attracts quality creators",
            "Built-in monetization simplifies creator journey",
            "Network effects drive platform growth",
          ],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        // Hero animation
        gsap.from(".hero-content", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })

        // Cards animation
        gsap.from(".report-card", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reports-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }, pageRef)

      return () => ctx.revert()
    }
  }, [loading, reports])

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || report.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case "revenue":
        return b.monthlyRevenue - a.monthlyRevenue
      case "growth":
        return b.growthRate - a.growthRate
      case "subscribers":
        return b.subscribers - a.subscribers
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`
    }
    return num.toString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading income reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center hero-content">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl text-white">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Creator Income
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Transparency Reports
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Real revenue data from successful creators, newsletters, and platforms. Learn from their strategies and
            growth tactics.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Sort by Revenue</SelectItem>
                <SelectItem value="growth">Sort by Growth</SelectItem>
                <SelectItem value="subscribers">Sort by Subscribers</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
            <TabsContent value="grid">
              <div className="reports-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedReports.map((report) => (
                  <Card
                    key={report.id}
                    className="report-card group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative">
                      <img
                        src={report.image || "/placeholder.svg"}
                        alt={report.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800">{report.category}</Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                          {report.name}
                        </CardTitle>
                        <Link href={`/income/${report.id}`}>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </Link>
                      </div>
                      <CardDescription className="text-sm line-clamp-2">{report.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Revenue Bar */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Monthly Revenue</span>
                            <span className="text-lg font-bold text-green-600">
                              {formatCurrency(report.monthlyRevenue)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${Math.min((report.monthlyRevenue / 3000000) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-sm font-bold text-blue-600">{formatNumber(report.subscribers)}</div>
                            <div className="text-xs text-gray-500">Subscribers</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-purple-600">{report.openRate}%</div>
                            <div className="text-xs text-gray-500">Open Rate</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-orange-600">+{report.growthRate}%</div>
                            <div className="text-xs text-gray-500">Growth</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {report.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monthly Revenue
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subscribers
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Growth Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedReports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={report.image || "/placeholder.svg"}
                                  alt={report.name}
                                  className="w-10 h-10 rounded-lg object-cover mr-3"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{report.name}</div>
                                  <div className="text-sm text-gray-500">{report.founder}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{report.category}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-green-600">
                                {formatCurrency(report.monthlyRevenue)}
                              </div>
                              <div className="text-xs text-gray-500">{formatCurrency(report.yearlyRevenue)}/year</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {formatNumber(report.subscribers)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-sm font-medium text-green-600">+{report.growthRate}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link href={`/income/${report.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {sortedReports.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
