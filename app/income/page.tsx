"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DollarSign, Eye, ArrowRight, Grid, List, Search, Filter } from "lucide-react"
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
}

const incomeReports: IncomeReport[] = [
  {
    id: 1,
    siteName: "ContentMaster Pro",
    category: "Newsletter",
    monthlyRevenue: 45000,
    yearlyRevenue: 540000,
    growth: "+23%",
    subscribers: 85000,
    description: "Premium newsletter focused on content marketing strategies and growth hacking techniques.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    tags: ["Content Marketing", "Growth", "B2B"],
    launchDate: "2022-03-15",
    traffic: 125000,
  },
  {
    id: 2,
    siteName: "CreatorHub Academy",
    category: "Course Platform",
    monthlyRevenue: 32000,
    yearlyRevenue: 384000,
    growth: "+18%",
    subscribers: 12000,
    description: "Comprehensive online courses for content creators and digital marketers.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    tags: ["Education", "Courses", "Creator Economy"],
    launchDate: "2021-08-20",
    traffic: 89000,
  },
  {
    id: 3,
    siteName: "SocialGrowth Suite",
    category: "SaaS Tool",
    monthlyRevenue: 28000,
    yearlyRevenue: 336000,
    growth: "+31%",
    subscribers: 5500,
    description: "All-in-one social media management and analytics platform for creators.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop",
    tags: ["SaaS", "Social Media", "Analytics"],
    launchDate: "2023-01-10",
    traffic: 67000,
  },
  {
    id: 4,
    siteName: "WritersPro Community",
    category: "Community",
    monthlyRevenue: 15000,
    yearlyRevenue: 180000,
    growth: "+15%",
    subscribers: 25000,
    description: "Exclusive community for professional writers and content creators.",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
    tags: ["Community", "Writing", "Networking"],
    launchDate: "2022-06-05",
    traffic: 45000,
  },
  {
    id: 5,
    siteName: "VideoCreators Weekly",
    category: "Newsletter",
    monthlyRevenue: 22000,
    yearlyRevenue: 264000,
    growth: "+27%",
    subscribers: 42000,
    description: "Weekly insights and strategies for video content creators and YouTubers.",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=200&fit=crop",
    tags: ["Video", "YouTube", "Content Creation"],
    launchDate: "2022-11-12",
    traffic: 78000,
  },
  {
    id: 6,
    siteName: "AITools Directory",
    category: "Directory",
    monthlyRevenue: 18500,
    yearlyRevenue: 222000,
    growth: "+42%",
    subscribers: 8200,
    description: "Curated directory of AI tools for content creators and marketers.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    tags: ["AI", "Tools", "Directory"],
    launchDate: "2023-05-18",
    traffic: 156000,
  },
  {
    id: 7,
    siteName: "DesignSystem Pro",
    category: "Digital Product",
    monthlyRevenue: 12800,
    yearlyRevenue: 153600,
    growth: "+19%",
    subscribers: 3400,
    description: "Premium design systems and UI kits for web designers and developers.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop",
    tags: ["Design", "UI/UX", "Templates"],
    launchDate: "2023-02-28",
    traffic: 34000,
  },
  {
    id: 8,
    siteName: "PodcastGrowth Lab",
    category: "Course Platform",
    monthlyRevenue: 26500,
    yearlyRevenue: 318000,
    growth: "+25%",
    subscribers: 15600,
    description: "Complete podcast growth course and community for aspiring podcasters.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=200&fit=crop",
    tags: ["Podcast", "Audio", "Growth"],
    launchDate: "2022-09-14",
    traffic: 52000,
  },
]

export default function IncomePage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("revenue")
  const [filteredReports, setFilteredReports] = useState<IncomeReport[]>(incomeReports)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate revenue bars
      gsap.from(".revenue-bar", {
        width: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate cards
      gsap.from(".income-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate stats
      gsap.from(".stat-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let filtered = incomeReports

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter((report) => report.category === categoryFilter)
    }

    // Sort reports
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "revenue":
          return b.monthlyRevenue - a.monthlyRevenue
        case "growth":
          return (
            Number.parseFloat(b.growth.replace("%", "").replace("+", "")) -
            Number.parseFloat(a.growth.replace("%", "").replace("+", ""))
          )
        case "subscribers":
          return b.subscribers - a.subscribers
        case "name":
          return a.siteName.localeCompare(b.siteName)
        default:
          return 0
      }
    })

    setFilteredReports(filtered)
  }, [searchTerm, categoryFilter, sortBy])

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

  const getMaxRevenue = () => {
    return Math.max(...filteredReports.map((report) => report.monthlyRevenue))
  }

  const getTotalRevenue = () => {
    return filteredReports.reduce((sum, report) => sum + report.monthlyRevenue, 0)
  }

  const getAverageGrowth = () => {
    const growthRates = filteredReports.map((report) =>
      Number.parseFloat(report.growth.replace("%", "").replace("+", "")),
    )
    return (growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length).toFixed(1)
  }

  const categories = ["all", ...Array.from(new Set(incomeReports.map((report) => report.category)))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 backdrop-blur-sm">
            <DollarSign className="w-4 h-4 mr-2" />
            Income Transparency Reports
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Real Revenue
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              From Real Creators
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Get inspired by transparent income reports from successful content creators, newsletters, and digital
            products. Learn what drives their revenue and growth strategies.
          </p>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="stat-item text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{formatCurrency(getTotalRevenue())}</div>
              <div className="text-slate-400">Total Monthly Revenue</div>
            </div>
            <div className="stat-item text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">+{getAverageGrowth()}%</div>
              <div className="text-slate-400">Average Growth Rate</div>
            </div>
            <div className="stat-item text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{incomeReports.length}</div>
              <div className="text-slate-400">Featured Reports</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filters and Search */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Monthly Revenue</SelectItem>
                    <SelectItem value="growth">Growth Rate</SelectItem>
                    <SelectItem value="subscribers">Subscribers</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="grid" className="flex items-center">
                    <Grid className="w-4 h-4 mr-2" />
                    Cards
                  </TabsTrigger>
                  <TabsTrigger value="table" className="flex items-center">
                    <List className="w-4 h-4 mr-2" />
                    Table
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Content */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReports.map((report) => (
                  <Card
                    key={report.id}
                    className="income-card group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={report.image || "/placeholder.svg"}
                        alt={report.siteName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm">{report.category}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 backdrop-blur-sm">
                          {report.growth}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-4">
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {report.siteName}
                      </CardTitle>
                      <p className="text-slate-600 text-sm line-clamp-2">{report.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {report.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">Monthly Revenue</span>
                          <span className="font-bold text-slate-900">{formatCurrency(report.monthlyRevenue)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="revenue-bar h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                            style={{ width: `${(report.monthlyRevenue / getMaxRevenue()) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="font-bold text-slate-900 text-sm">{formatCurrency(report.yearlyRevenue)}</div>
                          <div className="text-xs text-slate-500">Yearly</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="font-bold text-slate-900 text-sm">{formatNumber(report.subscribers)}</div>
                          <div className="text-xs text-slate-500">Subscribers</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="font-bold text-slate-900 text-sm">{formatNumber(report.traffic)}</div>
                          <div className="text-xs text-slate-500">Traffic</div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full group bg-transparent" asChild>
                        <Link href={`/income/${report.id}`}>
                          <Eye className="mr-2 w-4 h-4" />
                          View Full Report
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="text-left p-4 font-semibold text-slate-900">Site</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Category</th>
                          <th className="text-right p-4 font-semibold text-slate-900">Monthly</th>
                          <th className="text-right p-4 font-semibold text-slate-900">Yearly</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Growth</th>
                          <th className="text-right p-4 font-semibold text-slate-900">Subscribers</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReports.map((report, index) => (
                          <tr
                            key={report.id}
                            className={`income-card ${
                              index % 2 === 0 ? "bg-white" : "bg-slate-50"
                            } hover:bg-slate-100 transition-colors`}
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={report.image || "/placeholder.svg"}
                                  alt={report.siteName}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-semibold text-slate-900">{report.siteName}</div>
                                  <div className="text-sm text-slate-500 line-clamp-1">{report.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className="bg-blue-100 text-blue-800">{report.category}</Badge>
                            </td>
                            <td className="p-4 text-right font-semibold text-slate-900">
                              {formatCurrency(report.monthlyRevenue)}
                            </td>
                            <td className="p-4 text-right font-semibold text-slate-900">
                              {formatCurrency(report.yearlyRevenue)}
                            </td>
                            <td className="p-4 text-center">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {report.growth}
                              </Badge>
                            </td>
                            <td className="p-4 text-right text-slate-900">{formatNumber(report.subscribers)}</td>
                            <td className="p-4 text-center">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/income/${report.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
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

          {filteredReports.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 text-lg mb-4">No reports found matching your criteria</div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
