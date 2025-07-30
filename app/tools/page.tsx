"use client"

import { useRef } from "react"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, Users, Calendar, Target, DollarSign, Search, Filter, Clock, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  component: React.ReactNode
}

// ROI Calculator Component
function ROICalculator() {
  const [investment, setInvestment] = useState("")
  const [revenue, setRevenue] = useState("")
  const [roi, setROI] = useState<number | null>(null)

  const calculateROI = () => {
    const inv = Number.parseFloat(investment)
    const rev = Number.parseFloat(revenue)
    if (inv && rev) {
      const roiValue = ((rev - inv) / inv) * 100
      setROI(roiValue)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="investment">Initial Investment ($)</Label>
          <Input
            id="investment"
            type="number"
            placeholder="10000"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="revenue">Total Revenue ($)</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="15000"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={calculateROI} className="w-full">
        Calculate ROI
      </Button>
      {roi !== null && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{roi.toFixed(2)}%</div>
            <div className="text-sm text-gray-600 mt-1">Return on Investment</div>
            <div className="mt-2 text-sm">
              {roi > 0 ? (
                <span className="text-green-600">✅ Profitable investment</span>
              ) : (
                <span className="text-red-600">❌ Loss on investment</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Engagement Rate Calculator
function EngagementCalculator() {
  const [followers, setFollowers] = useState("")
  const [likes, setLikes] = useState("")
  const [comments, setComments] = useState("")
  const [shares, setShares] = useState("")
  const [engagementRate, setEngagementRate] = useState<number | null>(null)

  const calculateEngagement = () => {
    const f = Number.parseFloat(followers)
    const l = Number.parseFloat(likes) || 0
    const c = Number.parseFloat(comments) || 0
    const s = Number.parseFloat(shares) || 0

    if (f) {
      const rate = ((l + c + s) / f) * 100
      setEngagementRate(rate)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="followers">Total Followers</Label>
          <Input
            id="followers"
            type="number"
            placeholder="10000"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="likes">Average Likes</Label>
          <Input id="likes" type="number" placeholder="500" value={likes} onChange={(e) => setLikes(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="comments">Average Comments</Label>
          <Input
            id="comments"
            type="number"
            placeholder="50"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="shares">Average Shares</Label>
          <Input
            id="shares"
            type="number"
            placeholder="25"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={calculateEngagement} className="w-full">
        Calculate Engagement Rate
      </Button>
      {engagementRate !== null && (
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{engagementRate.toFixed(2)}%</div>
            <div className="text-sm text-gray-600 mt-1">Engagement Rate</div>
            <div className="mt-2 text-sm">
              {engagementRate > 3 ? (
                <span className="text-green-600">🔥 Excellent engagement!</span>
              ) : engagementRate > 1 ? (
                <span className="text-yellow-600">👍 Good engagement</span>
              ) : (
                <span className="text-red-600">📈 Room for improvement</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Newsletter Growth Tracker
function GrowthTracker() {
  const [currentSubs, setCurrentSubs] = useState("")
  const [targetSubs, setTargetSubs] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [growthNeeded, setGrowthNeeded] = useState<number | null>(null)

  const calculateGrowth = () => {
    const current = Number.parseFloat(currentSubs)
    const target = Number.parseFloat(targetSubs)
    const time = Number.parseFloat(timeframe)

    if (current && target && time) {
      const needed = (target - current) / time
      setGrowthNeeded(needed)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="current">Current Subscribers</Label>
          <Input
            id="current"
            type="number"
            placeholder="1000"
            value={currentSubs}
            onChange={(e) => setCurrentSubs(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="target">Target Subscribers</Label>
          <Input
            id="target"
            type="number"
            placeholder="10000"
            value={targetSubs}
            onChange={(e) => setTargetSubs(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="timeframe">Timeframe (months)</Label>
          <Input
            id="timeframe"
            type="number"
            placeholder="12"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={calculateGrowth} className="w-full">
        Calculate Growth Needed
      </Button>
      {growthNeeded !== null && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{Math.ceil(growthNeeded)}</div>
            <div className="text-sm text-gray-600 mt-1">New subscribers needed per month</div>
            <div className="mt-2 text-sm">
              <span className="text-blue-600">
                📊 That's about {Math.ceil(growthNeeded / 30)} new subscribers per day
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Content Calendar Generator
function ContentCalendar() {
  const [contentType, setContentType] = useState("")
  const [frequency, setFrequency] = useState("")
  const [topics, setTopics] = useState<string[]>([])

  const generateCalendar = () => {
    const topicSuggestions = [
      "Industry Trends Analysis",
      "Expert Interview",
      "How-to Guide",
      "Case Study",
      "Tool Review",
      "Behind the Scenes",
      "User Generated Content",
      "FAQ Session",
      "Product Update",
      "Community Spotlight",
    ]

    const shuffled = topicSuggestions.sort(() => 0.5 - Math.random())
    setTopics(shuffled.slice(0, 5))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="blog">Blog Posts</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="video">Video Content</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="frequency">Publishing Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={generateCalendar} className="w-full">
        Generate Content Ideas
      </Button>
      {topics.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">Content Ideas for This Month:</h4>
          {topics.map((topic, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500">
              <div className="font-medium">{topic}</div>
              <div className="text-sm text-gray-600 mt-1">
                Week {index + 1} • {contentType} content
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Audience Targeting Tool
function AudienceTargeting() {
  const [industry, setIndustry] = useState("")
  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")
  const [targeting, setTargeting] = useState<any>(null)

  const generateTargeting = () => {
    const suggestions = {
      demographics: ["25-45 years old", "College educated", "Urban/Suburban"],
      interests: ["Professional development", "Industry trends", "Productivity tools"],
      platforms: ["LinkedIn", "Twitter", "Industry forums"],
      content: ["Educational content", "Case studies", "Expert insights"],
      timing: ["Tuesday-Thursday", "9-11 AM", "2-4 PM"],
    }
    setTargeting(suggestions)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="role">Target Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="director">Director</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="individual">Individual Contributor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="experience">Experience Level</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (3-7 years)</SelectItem>
              <SelectItem value="senior">Senior Level (8+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={generateTargeting} className="w-full">
        Generate Targeting Strategy
      </Button>
      {targeting && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(targeting).map(([key, values]: [string, any]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold capitalize mb-2">{key}</h4>
              <ul className="space-y-1">
                {values.map((value: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Revenue Forecasting Tool
function RevenueForecasting() {
  const [subscribers, setSubscribers] = useState("")
  const [conversionRate, setConversionRate] = useState("")
  const [avgRevenue, setAvgRevenue] = useState("")
  const [forecast, setForecast] = useState<any>(null)

  const calculateForecast = () => {
    const subs = Number.parseFloat(subscribers)
    const conversion = Number.parseFloat(conversionRate) / 100
    const revenue = Number.parseFloat(avgRevenue)

    if (subs && conversion && revenue) {
      const monthly = subs * conversion * revenue
      const quarterly = monthly * 3
      const yearly = monthly * 12

      setForecast({
        monthly: monthly.toFixed(2),
        quarterly: quarterly.toFixed(2),
        yearly: yearly.toFixed(2),
        customers: Math.round(subs * conversion),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="subscribers">Total Subscribers</Label>
          <Input
            id="subscribers"
            type="number"
            placeholder="10000"
            value={subscribers}
            onChange={(e) => setSubscribers(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="conversion">Conversion Rate (%)</Label>
          <Input
            id="conversion"
            type="number"
            placeholder="2.5"
            value={conversionRate}
            onChange={(e) => setConversionRate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="revenue">Avg Revenue per Customer ($)</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="99"
            value={avgRevenue}
            onChange={(e) => setAvgRevenue(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={calculateForecast} className="w-full">
        Calculate Revenue Forecast
      </Button>
      {forecast && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{forecast.customers}</div>
            <div className="text-sm text-gray-600">Customers</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">${forecast.monthly}</div>
            <div className="text-sm text-gray-600">Monthly</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">${forecast.quarterly}</div>
            <div className="text-sm text-gray-600">Quarterly</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">${forecast.yearly}</div>
            <div className="text-sm text-gray-600">Yearly</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const tools: Tool[] = [
    {
      id: "roi-calculator",
      name: "ROI Calculator",
      description: "Calculate return on investment for your marketing campaigns and business initiatives.",
      category: "Analytics",
      icon: <Calculator className="w-6 h-6" />,
      difficulty: "Beginner",
      estimatedTime: "2 minutes",
      component: <ROICalculator />,
    },
    {
      id: "engagement-analyzer",
      name: "Engagement Rate Analyzer",
      description: "Analyze your social media engagement rates and get insights for improvement.",
      category: "Analytics",
      icon: <TrendingUp className="w-6 h-6" />,
      difficulty: "Beginner",
      estimatedTime: "3 minutes",
      component: <EngagementCalculator />,
    },
    {
      id: "growth-tracker",
      name: "Newsletter Growth Tracker",
      description: "Track your newsletter growth and set realistic subscriber targets.",
      category: "Growth",
      icon: <Users className="w-6 h-6" />,
      difficulty: "Intermediate",
      estimatedTime: "5 minutes",
      component: <GrowthTracker />,
    },
    {
      id: "content-calendar",
      name: "Content Calendar Generator",
      description: "Generate content ideas and plan your publishing schedule.",
      category: "Content",
      icon: <Calendar className="w-6 h-6" />,
      difficulty: "Beginner",
      estimatedTime: "3 minutes",
      component: <ContentCalendar />,
    },
    {
      id: "audience-targeting",
      name: "Audience Targeting Tool",
      description: "Define and refine your target audience for better marketing results.",
      category: "Marketing",
      icon: <Target className="w-6 h-6" />,
      difficulty: "Intermediate",
      estimatedTime: "10 minutes",
      component: <AudienceTargeting />,
    },
    {
      id: "revenue-forecasting",
      name: "Revenue Forecasting",
      description: "Forecast your revenue based on subscriber growth and conversion rates.",
      category: "Analytics",
      icon: <DollarSign className="w-6 h-6" />,
      difficulty: "Advanced",
      estimatedTime: "5 minutes",
      component: <RevenueForecasting />,
    },
  ]

  const categories = ["All", "Analytics", "Growth", "Content", "Marketing"]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Tools grid animation
      gsap.from(".tool-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: ".tools-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [filteredTools])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedTool) {
    const tool = tools.find((t) => t.id === selectedTool)
    if (!tool) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Button variant="ghost" onClick={() => setSelectedTool(null)} className="mb-6">
            ← Back to Tools
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white">{tool.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                <p className="text-gray-600 mt-1">{tool.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className={getDifficultyColor(tool.difficulty)}>{tool.difficulty}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {tool.estimatedTime}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">{tool.component}</CardContent>
          </Card>
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
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl text-white">
              <Zap className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Tools for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Creator Success
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Free, professional-grade tools to help you grow your audience, analyze performance, and maximize revenue.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tools..."
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
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <Card
                key={tool.id}
                className="tool-card group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <Badge className={getDifficultyColor(tool.difficulty)}>{tool.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{tool.name}</CardTitle>
                  <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {tool.estimatedTime}
                    </div>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      {tool.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tools found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
