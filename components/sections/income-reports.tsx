"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Eye, ArrowRight, Grid, List } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const incomeReports = [
  {
    id: 1,
    siteName: "ContentMaster Pro",
    category: "Newsletter",
    monthlyRevenue: 45000,
    yearlyRevenue: 540000,
    growth: "+23%",
    subscribers: 85000,
    description: "Premium newsletter focused on content marketing strategies",
  },
  {
    id: 2,
    siteName: "CreatorHub",
    category: "Course Platform",
    monthlyRevenue: 32000,
    yearlyRevenue: 384000,
    growth: "+18%",
    subscribers: 12000,
    description: "Online courses for content creators and marketers",
  },
  {
    id: 3,
    siteName: "SocialGrowth",
    category: "SaaS Tool",
    monthlyRevenue: 28000,
    yearlyRevenue: 336000,
    growth: "+31%",
    subscribers: 5500,
    description: "Social media management and analytics platform",
  },
  {
    id: 4,
    siteName: "WritersPro",
    category: "Community",
    monthlyRevenue: 15000,
    yearlyRevenue: 180000,
    growth: "+15%",
    subscribers: 25000,
    description: "Premium community for professional writers",
  },
  {
    id: 5,
    siteName: "VideoCreators",
    category: "Newsletter",
    monthlyRevenue: 22000,
    yearlyRevenue: 264000,
    growth: "+27%",
    subscribers: 42000,
    description: "Weekly insights for video content creators",
  },
]

export default function IncomeReports() {
  const sectionRef = useRef<HTMLElement>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getMaxRevenue = () => {
    return Math.max(...incomeReports.map((report) => report.monthlyRevenue))
  }

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            <DollarSign className="w-4 h-4 mr-1" />
            Income Transparency
          </Badge>
          <h2 className="fluid-text-4xl font-serif font-bold text-slate-900 mb-6">Real Revenue Reports</h2>
          <p className="fluid-text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Get inspired by real income reports from successful content creators and learn what drives their revenue.
          </p>
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")} className="mb-8">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center">
                <Grid className="w-4 h-4 mr-2" />
                Card View
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center">
                <List className="w-4 h-4 mr-2" />
                Table View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {incomeReports.map((report) => (
                <Card
                  key={report.id}
                  className="income-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800">{report.category}</Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {report.growth}
                      </Badge>
                    </div>
                    <CardTitle className="fluid-text-xl font-semibold text-slate-900">{report.siteName}</CardTitle>
                    <p className="text-slate-600 text-sm">{report.description}</p>
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

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-100 rounded-lg">
                        <div className="font-bold text-slate-900">{formatCurrency(report.yearlyRevenue)}</div>
                        <div className="text-xs text-slate-500">Yearly</div>
                      </div>
                      <div className="p-3 bg-slate-100 rounded-lg">
                        <div className="font-bold text-slate-900">{report.subscribers.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">Subscribers</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`/income/${report.id}`}>
                        <Eye className="mr-2 w-4 h-4" />
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-slate-900">Site Name</th>
                        <th className="text-left p-4 font-semibold text-slate-900">Category</th>
                        <th className="text-right p-4 font-semibold text-slate-900">Monthly</th>
                        <th className="text-right p-4 font-semibold text-slate-900">Yearly</th>
                        <th className="text-center p-4 font-semibold text-slate-900">Growth</th>
                        <th className="text-right p-4 font-semibold text-slate-900">Subscribers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeReports.map((report, index) => (
                        <tr
                          key={report.id}
                          className={`income-card ${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 transition-colors`}
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-semibold text-slate-900">{report.siteName}</div>
                              <div className="text-sm text-slate-500">{report.description}</div>
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
                          <td className="p-4 text-right text-slate-900">{report.subscribers.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8" asChild>
            <Link href="/income">
              View All Reports
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
