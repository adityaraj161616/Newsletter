"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, FileText, Users, TrendingUp, Plus, Eye, Heart } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const stats = [
    {
      title: "Total Articles",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Total Views",
      value: "45.2K",
      change: "+23%",
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Subscribers",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Engagement",
      value: "89%",
      change: "+5%",
      icon: Heart,
      color: "text-red-600",
    },
  ]

  const recentArticles = [
    {
      id: 1,
      title: "The Future of Last-Mile Delivery",
      status: "Published",
      views: "2.3K",
      likes: 45,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Supply Chain Optimization Strategies",
      status: "Draft",
      views: "0",
      likes: 0,
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "AI in Logistics: A Complete Guide",
      status: "Published",
      views: "1.8K",
      likes: 32,
      date: "2024-01-12",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session.user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your content today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Articles</CardTitle>
                  <CardDescription>Your latest content and performance</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/articles/new">
                    <Plus className="w-4 h-4 mr-2" />
                    New Article
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{article.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <Badge variant={article.status === "Published" ? "default" : "secondary"}>
                            {article.status}
                          </Badge>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {article.likes}
                          </span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/dashboard/articles/new">
                    <FileText className="w-4 h-4 mr-2" />
                    Write New Article
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/dashboard/playbooks/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Playbook
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/dashboard/tools/new">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Create Tool
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/dashboard/analytics">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Article published: "AI in Logistics"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">New subscriber: john@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Comment on "Supply Chain Guide"</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
