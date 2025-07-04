"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Users,
  Search,
  Grid,
  List,
  ExternalLink,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TypewriterText } from "@/components/animations/typewriter-text"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const incomeReports = [
  {
    id: 1,
    name: "Morning Brew",
    description: "Daily business newsletter with 4M+ subscribers delivering witty financial news and insights.",
    monthlyRevenue: 2500000,
    yearlyRevenue: 30000000,
    subscribers: 4200000,
    category: "Newsletter",
    tags: ["Business", "Finance", "Daily"],
    growth: 15.2,
    openRate: 42,
    clickRate: 8.5,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    founded: "2015",
    team: "50+",
    primaryRevenue: "Advertising",
    revenueBreakdown: {
      advertising: 70,
      subscriptions: 20,
      affiliate: 10,
    },
  },
  {
    id: 2,
    name: "ConvertKit",
    description: "Email marketing platform specifically designed for creators, bloggers, and online entrepreneurs.",
    monthlyRevenue: 2000000,
    yearlyRevenue: 24000000,
    subscribers: 500000,
    category: "SaaS Tool",
    tags: ["Email Marketing", "Creator Tools", "SaaS"],
    growth: 22.8,
    openRate: 38,
    clickRate: 12.3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    founded: "2013",
    team: "100+",
    primaryRevenue: "Subscriptions",
    revenueBreakdown: {
      subscriptions: 85,
      services: 10,
      affiliate: 5,
    },
  },
  {
    id: 3,
    name: "Pat Flynn - Smart Passive Income",
    description: "Online business education platform teaching entrepreneurs how to build passive income streams.",
    monthlyRevenue: 150000,
    yearlyRevenue: 1800000,
    subscribers: 250000,
    category: "Course Platform",
    tags: ["Education", "Entrepreneurship", "Passive Income"],
    growth: 8.5,
    openRate: 45,
    clickRate: 15.2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    founded: "2008",
    team: "15",
    primaryRevenue: "Courses",
    revenueBreakdown: {
      courses: 60,
      affiliate: 25,
      consulting: 15,
    },
  },
  {
    id: 4,
    name: "The Hustle",
    description: "Business and tech newsletter delivering daily news with personality to millions of professionals.",
    monthlyRevenue: 800000,
    yearlyRevenue: 9600000,
    subscribers: 2100000,
    category: "Newsletter",
    tags: ["Business", "Technology", "News"],
    growth: 12.3,
    openRate: 39,
    clickRate: 7.8,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
    founded: "2016",
    team: "30+",
    primaryRevenue: "Advertising",
    revenueBreakdown: {
      advertising: 75,
      events: 15,
      products: 10,
    },
  },
  {
    id: 5,
    name: "Gumroad",
    description:
      "Platform enabling creators to sell digital products directly to their audience with minimal friction.",
    monthlyRevenue: 1200000,
    yearlyRevenue: 14400000,
    subscribers: 1000000,
    category: "Marketplace",
    tags: ["Digital Products", "Creator Economy", "E-commerce"],
    growth: 18.7,
    openRate: 35,
    clickRate: 9.2,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    founded: "2011",
    team: "25",
    primaryRevenue: "Transaction Fees",
    revenueBreakdown: {
      fees: 80,
      subscriptions: 15,
      services: 5,
    },
  },
  {
    id: 6,
    name: "Ali Abdaal",
    description: "Productivity guru and YouTuber teaching evidence-based productivity and study techniques.",
    monthlyRevenue: 200000,
    yearlyRevenue: 2400000,
    subscribers: 180000,
    category: "Content Creator",
    tags: ["Productivity", "Education", "YouTube"],
    growth: 25.4,
    openRate: 48,
    clickRate: 18.5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
    founded: "2017",
    team: "8",
    primaryRevenue: "Courses",
    revenueBreakdown: {
      courses: 50,
      youtube: 30,
      affiliate: 20,
    },
  },
  {
    id: 7,
    name: "Substack",
    description: "Newsletter platform empowering writers to build paid subscriber bases and monetize their content.",
    monthlyRevenue: 5000000,
    yearlyRevenue: 60000000,
    subscribers: 15000000,
    category: "Platform",
    tags: ["Newsletter", "Publishing", "Subscriptions"],
    growth: 35.2,
    openRate: 41,
    clickRate: 11.7,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    founded: "2017",
    team: "80+",
    primaryRevenue: "Platform Fees",
    revenueBreakdown: {
      fees: 90,
      pro: 8,
      services: 2,
    },
  },
  {
    id: 8,
    name: "Tim Ferriss",
    description: "Author and podcaster sharing life optimization strategies and interviewing world-class performers.",
    monthlyRevenue: 300000,
    yearlyRevenue: 3600000,
    subscribers: 500000,
    category: "Content Creator",
    tags: ["Lifestyle", "Optimization", "Podcast"],
    growth: 6.8,
    openRate: 52,
    clickRate: 22.1,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
    founded: "2007",
    team: "12",
    primaryRevenue: "Books & Products",
    revenueBreakdown: {
      books: 40,
      podcast: 35,
      investments: 25,
    },
  },
]

const categories = ["All", "Newsletter", "SaaS Tool", "Course Platform", "Marketplace", "Platform", "Content Creator"]
const sortOptions = [
  { value: "revenue-desc", label: "Revenue (High to Low)" },
  { value: "revenue-asc", label: "Revenue (Low to High)" },
  { value: "growth-desc", label: "Growth Rate (High to Low)" },
  { value: "subscribers-desc", label: "Subscribers (High to Low)" },
  { value: "name-asc", label: "Name (A to Z)" },
]

export default function IncomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("revenue-desc")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [filteredReports, setFilteredReports] = useState(incomeReports)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current?.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Cards staggered animation
      gsap.from(cardsRef.current?.children, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredReports])

  useEffect(() => {
    let filtered = incomeReports

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((report) => report.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "revenue-desc":
          return b.monthlyRevenue - a.monthlyRevenue
        case "revenue-asc":
          return a.monthlyRevenue - b.monthlyRevenue
        case "growth-desc":
          return b.growth - a.growth
        case "subscribers-desc":
          return b.subscribers - a.subscribers
        case "name-asc":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredReports(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  const totalRevenue = filteredReports.reduce((sum, report) => sum + report.monthlyRevenue, 0)
  const averageGrowth = filteredReports.reduce((sum, report) => sum + report.growth, 0) / filteredReports.length

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <TypewriterText text="Creator Income Reports" speed={100} />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transparent revenue breakdowns from successful creators, newsletters, and platforms in the creator economy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">${(totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-600">Combined Monthly Revenue</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{averageGrowth.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Average Growth Rate</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {(filteredReports.reduce((sum, report) => sum + report.subscribers, 0) / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Total Subscribers</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{filteredReports.length}</div>
              <div className="text-sm text-gray-600">Featured Reports</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
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
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex-1"
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="flex-1"
              >
                <List className="w-4 h-4 mr-2" />
                Table
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredReports.length} of {incomeReports.length} reports
          </div>
        </div>

        {/* Content */}
        <Tabs value={viewMode} className="space-y-8">
          {/* Grid View */}
          <TabsContent value="grid">
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={report.image || "/placeholder.svg"}
                      alt={report.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900">{report.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                        {report.growth > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${report.growth > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {report.growth}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="group-hover:text-purple-600 transition-colors">{report.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{report.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Revenue Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Monthly Revenue</span>
                        <span className="font-semibold">${(report.monthlyRevenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((report.monthlyRevenue / 5000000) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Subscribers</div>
                        <div className="font-semibold">{(report.subscribers / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Open Rate</div>
                        <div className="font-semibold">{report.openRate}%</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {report.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button asChild className="w-full group/btn">
                      <Link href={`/income/${report.id}`}>
                        View Full Report
                        <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Table View */}
          <TabsContent value="table">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold">Name</th>
                        <th className="text-left p-4 font-semibold">Category</th>
                        <th className="text-right p-4 font-semibold">Monthly Revenue</th>
                        <th className="text-right p-4 font-semibold">Subscribers</th>
                        <th className="text-right p-4 font-semibold">Growth</th>
                        <th className="text-right p-4 font-semibold">Open Rate</th>
                        <th className="text-center p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report, index) => (
                        <tr key={report.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={report.image || "/placeholder.svg"}
                                alt={report.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-semibold">{report.name}</div>
                                <div className="text-sm text-gray-600 truncate max-w-xs">{report.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{report.category}</Badge>
                          </td>
                          <td className="p-4 text-right font-semibold">
                            ${(report.monthlyRevenue / 1000).toFixed(0)}K
                          </td>
                          <td className="p-4 text-right">{(report.subscribers / 1000).toFixed(0)}K</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              {report.growth > 0 ? (
                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-600" />
                              )}
                              <span className={report.growth > 0 ? "text-green-600" : "text-red-600"}>
                                {report.growth}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">{report.openRate}%</td>
                          <td className="p-4 text-center">
                            <Button size="sm" asChild>
                              <Link href={`/income/${report.id}`}>View</Link>
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

        {/* No Results */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Want to be featured?</h3>
          <p className="text-purple-100 mb-6 text-lg max-w-2xl mx-auto">
            Share your income report with the creator community and inspire others with your journey.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            Submit Your Report
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
