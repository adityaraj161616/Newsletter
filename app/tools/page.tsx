"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Truck,
  BarChart3,
  Zap,
  Search,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const tools = [
  {
    id: 1,
    title: "Delivery Time Estimator",
    description: "Calculate accurate delivery times based on distance, traffic patterns, and historical data.",
    category: "Delivery",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    featured: true,
    slug: "delivery-time-estimator",
  },
  {
    id: 2,
    title: "Route Optimization Calculator",
    description: "Find the most efficient routes for multiple stops and reduce fuel costs.",
    category: "Optimization",
    icon: MapPin,
    color: "text-green-600",
    bgColor: "bg-green-50",
    slug: "route-optimizer",
  },
  {
    id: 3,
    title: "Shipping Cost Calculator",
    description: "Compare shipping rates across carriers and find the best pricing options.",
    category: "Cost Analysis",
    icon: DollarSign,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    slug: "shipping-cost-calculator",
  },
  {
    id: 4,
    title: "Warehouse Space Optimizer",
    description: "Maximize your warehouse efficiency with intelligent space allocation algorithms.",
    category: "Warehouse",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    slug: "warehouse-optimizer",
  },
  {
    id: 5,
    title: "Fleet Performance Tracker",
    description: "Monitor and analyze your fleet's performance metrics in real-time.",
    category: "Fleet Management",
    icon: Truck,
    color: "text-red-600",
    bgColor: "bg-red-50",
    slug: "fleet-tracker",
  },
  {
    id: 6,
    title: "Demand Forecasting Tool",
    description: "Predict future demand patterns using advanced machine learning algorithms.",
    category: "Analytics",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    slug: "demand-forecasting",
  },
]

const categories = ["All", "Delivery", "Optimization", "Cost Analysis", "Warehouse", "Fleet Management", "Analytics"]

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredTools, setFilteredTools] = useState(tools)
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
  }, [])

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

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Logistics Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Powerful calculators and tools to optimize your logistics operations and make data-driven decisions.
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
                  className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
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
                  <Badge className="bg-teal-600 text-white">{tool.category}</Badge>
                  {tool.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-teal-600 transition-colors">{tool.title}</CardTitle>
                <CardDescription className="text-center">{tool.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 group/btn" asChild>
                    <Link href={`/tools/${tool.slug}`}>
                      <Calculator className="mr-2 w-4 h-4" />
                      Use Tool
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Tool Spotlight: Delivery Time Estimator</h3>
            <p className="text-teal-100 mb-6 text-lg">
              Our most popular tool helps logistics professionals calculate accurate delivery times using real-time
              traffic data, historical patterns, and machine learning algorithms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">99.2%</div>
                <div className="text-teal-100">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-teal-100">Calculations Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15%</div>
                <div className="text-teal-100">Average Cost Savings</div>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
              <Link href="/tools/delivery-time-estimator">
                Try It Now
                <ExternalLink className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
