"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Calculator,
  TrendingUp,
  DollarSign,
  BarChart3,
  Zap,
  Search,
  ExternalLink,
  Mail,
  Target,
  PieChart,
  Calendar,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const tools = [
  {
    id: 1,
    title: "ROI Calculator",
    description: "Calculate the return on investment for your content marketing efforts with detailed breakdowns.",
    category: "Analytics",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    featured: true,
    slug: "roi-calculator",
    component: "ROICalculator",
  },
  {
    id: 2,
    title: "Engagement Rate Analyzer",
    description: "Analyze and optimize your social media engagement rates across all platforms.",
    category: "Social Media",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    slug: "engagement-analyzer",
    component: "EngagementAnalyzer",
  },
  {
    id: 3,
    title: "Newsletter Growth Tracker",
    description: "Track and predict your newsletter subscriber growth with advanced analytics.",
    category: "Email Marketing",
    icon: Mail,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    slug: "newsletter-tracker",
    component: "NewsletterTracker",
  },
  {
    id: 4,
    title: "Content Calendar Generator",
    description: "Generate optimized content calendars for consistent publishing across platforms.",
    category: "Planning",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    slug: "content-calendar",
    component: "ContentCalendar",
  },
  {
    id: 5,
    title: "Audience Targeting Tool",
    description: "Identify and target your ideal audience segments with precision.",
    category: "Marketing",
    icon: Target,
    color: "text-red-600",
    bgColor: "bg-red-50",
    slug: "audience-targeting",
    component: "AudienceTargeting",
  },
  {
    id: 6,
    title: "Revenue Forecasting",
    description: "Predict future revenue based on current growth trends and market analysis.",
    category: "Analytics",
    icon: PieChart,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    slug: "revenue-forecasting",
    component: "RevenueForecasting",
  },
]

const categories = ["All", "Analytics", "Social Media", "Email Marketing", "Planning", "Marketing"]

// Tool Components
const ROICalculator = () => {
  const [investment, setInvestment] = useState(1000)
  const [revenue, setRevenue] = useState(3000)
  const [timeframe, setTimeframe] = useState(12)

  const roi = ((revenue - investment) / investment) * 100
  const monthlyROI = roi / timeframe

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="investment">Initial Investment ($)</Label>
          <Input
            id="investment"
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            placeholder="1000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="revenue">Total Revenue ($)</Label>
          <Input
            id="revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            placeholder="3000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeframe">Timeframe (months)</Label>
          <Input
            id="timeframe"
            type="number"
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value))}
            placeholder="12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-green-600">{roi.toFixed(1)}%</CardTitle>
          <CardDescription>Total ROI</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-blue-600">{monthlyROI.toFixed(1)}%</CardTitle>
          <CardDescription>Monthly ROI</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-purple-600">
            ${(revenue - investment).toLocaleString()}
          </CardTitle>
          <CardDescription>Net Profit</CardDescription>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">ROI Analysis</h4>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Investment Performance:</strong>{" "}
            {roi > 100 ? "Excellent" : roi > 50 ? "Good" : roi > 0 ? "Positive" : "Needs Improvement"}
          </p>
          <p>
            <strong>Recommendation:</strong>{" "}
            {roi > 100
              ? "Scale this investment strategy"
              : roi > 50
                ? "Continue with current approach"
                : roi > 0
                  ? "Optimize for better returns"
                  : "Reconsider investment strategy"}
          </p>
        </div>
      </div>
    </div>
  )
}

const EngagementAnalyzer = () => {
  const [followers, setFollowers] = useState(10000)
  const [likes, setLikes] = useState(500)
  const [comments, setComments] = useState(50)
  const [shares, setShares] = useState(25)

  const engagementRate = ((likes + comments + shares) / followers) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="followers">Total Followers</Label>
          <Input
            id="followers"
            type="number"
            value={followers}
            onChange={(e) => setFollowers(Number(e.target.value))}
            placeholder="10000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="likes">Average Likes per Post</Label>
          <Input
            id="likes"
            type="number"
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
            placeholder="500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="comments">Average Comments per Post</Label>
          <Input
            id="comments"
            type="number"
            value={comments}
            onChange={(e) => setComments(Number(e.target.value))}
            placeholder="50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shares">Average Shares per Post</Label>
          <Input
            id="shares"
            type="number"
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            placeholder="25"
          />
        </div>
      </div>

      <Card className="text-center p-6">
        <CardTitle className="text-4xl font-bold text-blue-600 mb-2">{engagementRate.toFixed(2)}%</CardTitle>
        <CardDescription className="text-lg">Engagement Rate</CardDescription>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <CardTitle className="text-xl font-bold text-green-600">{likes.toLocaleString()}</CardTitle>
          <CardDescription>Avg Likes</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-xl font-bold text-purple-600">{comments.toLocaleString()}</CardTitle>
          <CardDescription>Avg Comments</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-xl font-bold text-orange-600">{shares.toLocaleString()}</CardTitle>
          <CardDescription>Avg Shares</CardDescription>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Engagement Analysis</h4>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Performance:</strong>{" "}
            {engagementRate > 6
              ? "Excellent (6%+)"
              : engagementRate > 3
                ? "Good (3-6%)"
                : engagementRate > 1
                  ? "Average (1-3%)"
                  : "Below Average (<1%)"}
          </p>
          <p>
            <strong>Industry Benchmark:</strong> Most accounts see 1-3% engagement rate
          </p>
          <p>
            <strong>Tip:</strong> Focus on creating more interactive content to boost engagement
          </p>
        </div>
      </div>
    </div>
  )
}

const NewsletterTracker = () => {
  const [currentSubscribers, setCurrentSubscribers] = useState(1000)
  const [monthlyGrowth, setMonthlyGrowth] = useState([5])
  const [openRate, setOpenRate] = useState([25])

  const projectedGrowth = currentSubscribers * (1 + monthlyGrowth[0] / 100)
  const yearlyProjection = currentSubscribers * Math.pow(1 + monthlyGrowth[0] / 100, 12)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subscribers">Current Subscribers</Label>
          <Input
            id="subscribers"
            type="number"
            value={currentSubscribers}
            onChange={(e) => setCurrentSubscribers(Number(e.target.value))}
            placeholder="1000"
          />
        </div>
        <div className="space-y-2">
          <Label>Monthly Growth Rate: {monthlyGrowth[0]}%</Label>
          <Slider
            value={monthlyGrowth}
            onValueChange={setMonthlyGrowth}
            max={20}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Open Rate: {openRate[0]}%</Label>
        <Slider value={openRate} onValueChange={setOpenRate} max={50} min={5} step={1} className="w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-blue-600">
            {Math.round(projectedGrowth).toLocaleString()}
          </CardTitle>
          <CardDescription>Next Month Projection</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-green-600">
            {Math.round(yearlyProjection).toLocaleString()}
          </CardTitle>
          <CardDescription>12-Month Projection</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-purple-600">{openRate[0]}%</CardTitle>
          <CardDescription>Open Rate</CardDescription>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Growth Analysis</h4>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Growth Rate:</strong>{" "}
            {monthlyGrowth[0] > 10
              ? "Exceptional"
              : monthlyGrowth[0] > 5
                ? "Strong"
                : monthlyGrowth[0] > 2
                  ? "Steady"
                  : "Slow"}
          </p>
          <p>
            <strong>Open Rate:</strong>{" "}
            {openRate[0] > 25 ? "Excellent" : openRate[0] > 20 ? "Good" : openRate[0] > 15 ? "Average" : "Needs Work"}
          </p>
          <p>
            <strong>Yearly Growth:</strong> +
            {Math.round(((yearlyProjection - currentSubscribers) / currentSubscribers) * 100)}%
          </p>
        </div>
      </div>
    </div>
  )
}

const ContentCalendar = () => {
  const [postsPerWeek, setPostsPerWeek] = useState(5)
  const [platforms, setPlatforms] = useState(3)

  const monthlyPosts = postsPerWeek * 4
  const totalContent = monthlyPosts * platforms

  const contentTypes = [
    "Educational Posts",
    "Behind-the-Scenes",
    "User-Generated Content",
    "Product Updates",
    "Industry News",
    "Tips & Tricks",
    "Case Studies",
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="posts">Posts per Week</Label>
          <Input
            id="posts"
            type="number"
            value={postsPerWeek}
            onChange={(e) => setPostsPerWeek(Number(e.target.value))}
            placeholder="5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platforms">Number of Platforms</Label>
          <Input
            id="platforms"
            type="number"
            value={platforms}
            onChange={(e) => setPlatforms(Number(e.target.value))}
            placeholder="3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-blue-600">{monthlyPosts}</CardTitle>
          <CardDescription>Posts per Month</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-green-600">{totalContent}</CardTitle>
          <CardDescription>Total Content Pieces</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-purple-600">{Math.round(totalContent / 7)}</CardTitle>
          <CardDescription>Content per Day</CardDescription>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Suggested Content Mix</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {contentTypes.map((type, index) => (
            <div key={type} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-800">Content Calendar Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Plan content 2-4 weeks in advance</li>
          <li>• Batch create similar content types</li>
          <li>• Leave 20% flexibility for trending topics</li>
          <li>• Track performance and adjust strategy</li>
        </ul>
      </div>
    </div>
  )
}

const AudienceTargeting = () => {
  const [ageRange, setAgeRange] = useState([25, 45])
  const [interests, setInterests] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState(1000)

  const estimatedReach = Math.round((budget / 2) * 1000 * (1 + Math.random() * 0.5))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Age Range: {ageRange[0]} - {ageRange[1]} years
          </Label>
          <Slider value={ageRange} onValueChange={setAgeRange} max={65} min={18} step={1} className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Monthly Budget ($)</Label>
          <Input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            placeholder="1000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interests">Interests (comma-separated)</Label>
          <Input
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="technology, business, marketing"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Target Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="United States, Canada"
          />
        </div>
      </div>

      <Card className="text-center p-6">
        <CardTitle className="text-4xl font-bold text-green-600 mb-2">{estimatedReach.toLocaleString()}</CardTitle>
        <CardDescription className="text-lg">Estimated Monthly Reach</CardDescription>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <CardTitle className="text-xl font-bold text-blue-600">
            ${((budget / estimatedReach) * 1000).toFixed(3)}
          </CardTitle>
          <CardDescription>Cost per 1K Reach</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-xl font-bold text-purple-600">
            {Math.round(estimatedReach * 0.02).toLocaleString()}
          </CardTitle>
          <CardDescription>Est. Clicks (2% CTR)</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-xl font-bold text-orange-600">
            {Math.round(estimatedReach * 0.002).toLocaleString()}
          </CardTitle>
          <CardDescription>Est. Conversions (0.2%)</CardDescription>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Targeting Recommendations</h4>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Age Group:</strong> {ageRange[0]}-{ageRange[1]} years is{" "}
            {ageRange[1] - ageRange[0] > 20 ? "broad" : "focused"} targeting
          </p>
          <p>
            <strong>Budget Efficiency:</strong>{" "}
            {budget > 2000 ? "High budget allows for extensive testing" : "Consider starting with broader targeting"}
          </p>
          <p>
            <strong>Tip:</strong> Start broad and narrow down based on performance data
          </p>
        </div>
      </div>
    </div>
  )
}

const RevenueForecasting = () => {
  const [currentRevenue, setCurrentRevenue] = useState(10000)
  const [growthRate, setGrowthRate] = useState([15])
  const [marketSize, setMarketSize] = useState(1000000)

  const monthlyGrowth = currentRevenue * (growthRate[0] / 100)
  const yearlyProjection = currentRevenue * Math.pow(1 + growthRate[0] / 100, 12)
  const marketPenetration = (yearlyProjection / marketSize) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="revenue">Current Monthly Revenue ($)</Label>
          <Input
            id="revenue"
            type="number"
            value={currentRevenue}
            onChange={(e) => setCurrentRevenue(Number(e.target.value))}
            placeholder="10000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="market">Total Market Size ($)</Label>
          <Input
            id="market"
            type="number"
            value={marketSize}
            onChange={(e) => setMarketSize(Number(e.target.value))}
            placeholder="1000000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Monthly Growth Rate: {growthRate[0]}%</Label>
        <Slider value={growthRate} onValueChange={setGrowthRate} max={50} min={0} step={1} className="w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-green-600">
            ${Math.round(yearlyProjection).toLocaleString()}
          </CardTitle>
          <CardDescription>12-Month Projection</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-blue-600">
            ${Math.round(monthlyGrowth).toLocaleString()}
          </CardTitle>
          <CardDescription>Monthly Growth</CardDescription>
        </Card>
        <Card className="text-center p-4">
          <CardTitle className="text-2xl font-bold text-purple-600">{marketPenetration.toFixed(2)}%</CardTitle>
          <CardDescription>Market Penetration</CardDescription>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Revenue Forecast Analysis</h4>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Growth Trajectory:</strong>{" "}
            {growthRate[0] > 20
              ? "Aggressive growth"
              : growthRate[0] > 10
                ? "Strong growth"
                : growthRate[0] > 5
                  ? "Steady growth"
                  : "Conservative growth"}
          </p>
          <p>
            <strong>Market Opportunity:</strong>{" "}
            {marketPenetration < 1
              ? "Large untapped market"
              : marketPenetration < 5
                ? "Good growth potential"
                : "Significant market share"}
          </p>
          <p>
            <strong>Annual Revenue Growth:</strong> +
            {Math.round(((yearlyProjection - currentRevenue * 12) / (currentRevenue * 12)) * 100)}%
          </p>
        </div>
      </div>
    </div>
  )
}

const toolComponents = {
  ROICalculator,
  EngagementAnalyzer,
  NewsletterTracker,
  ContentCalendar,
  AudienceTargeting,
  RevenueForecasting,
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredTools, setFilteredTools] = useState(tools)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
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

      // Cards animation with hover effects
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
  }, [filteredTools])

  useEffect(() => {
    let filtered = tools

    if (selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredTools(filtered)
  }, [searchTerm, selectedCategory])

  const renderToolComponent = (componentName: string) => {
    const Component = toolComponents[componentName as keyof typeof toolComponents]
    return Component ? <Component /> : <div>Tool component not found</div>
  }

  if (selectedTool) {
    const tool = tools.find((t) => t.component === selectedTool)
    if (!tool) return <div>Tool not found</div>

    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button variant="outline" onClick={() => setSelectedTool(null)} className="mb-4">
              ← Back to Tools
            </Button>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-12 h-12 ${tool.bgColor} rounded-xl flex items-center justify-center`}>
                <tool.icon className={`w-6 h-6 ${tool.color}`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">{renderToolComponent(tool.component)}</CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Powerful calculators and analyzers to optimize your content strategy and maximize your impact.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
        </div>

        {/* Tools Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-lg"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <tool.icon className={`w-8 h-8 ${tool.color}`} />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className="bg-purple-600 text-white">{tool.category}</Badge>
                  {tool.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">{tool.title}</CardTitle>
                <CardDescription className="text-center">{tool.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 group/btn"
                    onClick={() => setSelectedTool(tool.component)}
                  >
                    <Calculator className="mr-2 w-4 h-4" />
                    Use Tool
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>

                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                      Instant Results
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1 text-blue-500" />
                      Data-Driven
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calculator className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Featured Tool Spotlight */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Tool Spotlight: ROI Calculator</h3>
            <p className="text-purple-100 mb-6 text-lg">
              Our most popular tool helps content creators calculate accurate return on investment using real-time data
              and advanced analytics algorithms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">99.2%</div>
                <div className="text-purple-100">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-purple-100">Calculations Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15%</div>
                <div className="text-purple-100">Average ROI Improvement</div>
              </div>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => setSelectedTool("ROICalculator")}
            >
              Try It Now
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
