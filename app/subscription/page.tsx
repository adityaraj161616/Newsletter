"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Crown, Check, X, CreditCard, Bell, Settings, Download, BarChart3, Mail, Star } from "lucide-react"
import Link from "next/link"

interface SubscriptionData {
  plan: "free" | "pro" | "team"
  status: "active" | "canceled" | "past_due"
  currentPeriodEnd: string
  usage: {
    articlesRead: number
    toolsUsed: number
    downloadsUsed: number
    articlesLimit: number
    toolsLimit: number
    downloadsLimit: number
  }
}

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState({
    newsletter: true,
    productUpdates: true,
    billing: true,
    marketing: false,
  })

  useEffect(() => {
    // Simulate fetching subscription data
    setTimeout(() => {
      setSubscriptionData({
        plan: "free",
        status: "active",
        currentPeriodEnd: "2024-02-15",
        usage: {
          articlesRead: 8,
          toolsUsed: 3,
          downloadsUsed: 1,
          articlesLimit: 10,
          toolsLimit: 5,
          downloadsLimit: 2,
        },
      })
      setLoading(false)
    }, 1000)
  }, [])

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "10 articles per month",
        "5 tool uses per month",
        "2 downloads per month",
        "Basic newsletter access",
        "Community access",
      ],
      limitations: ["Limited premium content", "No priority support", "Basic analytics"],
    },
    {
      name: "Pro",
      price: "$1",
      period: "first month, then $9/month",
      description: "For serious creators and professionals",
      features: [
        "Unlimited articles",
        "Unlimited tool usage",
        "Unlimited downloads",
        "Premium content access",
        "Priority email support",
        "Advanced analytics",
        "Early access to new features",
        "Ad-free experience",
      ],
      limitations: [],
    },
    {
      name: "Team",
      price: "$29",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Admin dashboard",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced team analytics",
      ],
      limitations: [],
    },
  ]

  const handleUpgrade = async (planName: string) => {
    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: planName.toLowerCase(),
          successUrl: `${window.location.origin}/subscription?success=true`,
          cancelUrl: `${window.location.origin}/subscription?canceled=true`,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    }
  }

  const handleCancelSubscription = async () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      try {
        const response = await fetch("/api/subscriptions/cancel", {
          method: "POST",
        })

        if (response.ok) {
          setSubscriptionData((prev) => (prev ? { ...prev, status: "canceled" } : null))
        }
      } catch (error) {
        console.error("Error canceling subscription:", error)
      }
    }
  }

  const updateNotificationSettings = async (setting: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [setting]: value }))

    try {
      await fetch("/api/user/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [setting]: value }),
      })
    } catch (error) {
      console.error("Error updating notification settings:", error)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Sign In Required</h1>
          <p className="text-xl text-gray-600 mb-8">Please sign in to manage your subscription.</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading subscription details...</p>
        </div>
      </div>
    )
  }

  const currentPlan = plans.find((plan) => plan.name.toLowerCase() === subscriptionData?.plan)
  const usagePercentage = {
    articles: ((subscriptionData?.usage.articlesRead || 0) / (subscriptionData?.usage.articlesLimit || 1)) * 100,
    tools: ((subscriptionData?.usage.toolsUsed || 0) / (subscriptionData?.usage.toolsLimit || 1)) * 100,
    downloads: ((subscriptionData?.usage.downloadsUsed || 0) / (subscriptionData?.usage.downloadsLimit || 1)) * 100,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl text-white">
              <Crown className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Subscription Management</h1>
          <p className="text-xl text-gray-600">Manage your WorkFlow subscription and preferences</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-600" />
                  Current Plan
                </CardTitle>
                <CardDescription>Your current subscription details and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-purple-100 text-purple-800 text-lg px-3 py-1">
                        {currentPlan?.name} Plan
                      </Badge>
                      <Badge
                        variant={subscriptionData?.status === "active" ? "default" : "destructive"}
                        className="capitalize"
                      >
                        {subscriptionData?.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{currentPlan?.description}</p>
                    {subscriptionData?.plan !== "free" && (
                      <p className="text-sm text-gray-500">
                        Next billing date: {new Date(subscriptionData?.currentPeriodEnd || "").toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="space-y-4">
                    {subscriptionData?.plan === "free" ? (
                      <Button onClick={() => handleUpgrade("pro")} className="w-full">
                        Upgrade to Pro for $1
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="outline" onClick={handleCancelSubscription} className="w-full bg-transparent">
                          Cancel Subscription
                        </Button>
                        <Button onClick={() => handleUpgrade("team")} className="w-full">
                          Upgrade to Team
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            {subscriptionData?.plan === "free" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Usage This Month
                  </CardTitle>
                  <CardDescription>Track your usage against plan limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Articles */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Articles Read</span>
                        <span className="text-sm text-gray-500">
                          {subscriptionData?.usage.articlesRead} / {subscriptionData?.usage.articlesLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(usagePercentage.articles, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Tools Used</span>
                        <span className="text-sm text-gray-500">
                          {subscriptionData?.usage.toolsUsed} / {subscriptionData?.usage.toolsLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(usagePercentage.tools, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Downloads */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Downloads</span>
                        <span className="text-sm text-gray-500">
                          {subscriptionData?.usage.downloadsUsed} / {subscriptionData?.usage.downloadsLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(usagePercentage.downloads, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.name.toLowerCase() === subscriptionData?.plan ? "ring-2 ring-purple-500 bg-purple-50" : ""
                  }`}
                >
                  {plan.name === "Pro" && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {plan.name.toLowerCase() === subscriptionData?.plan ? (
                      <Button disabled className="w-full">
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUpgrade(plan.name)}
                        className="w-full"
                        variant={plan.name === "Pro" ? "default" : "outline"}
                      >
                        {subscriptionData?.plan === "free" ? "Upgrade" : "Switch"} to {plan.name}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Billing Information
                </CardTitle>
                <CardDescription>Manage your payment methods and billing history</CardDescription>
              </CardHeader>
              <CardContent>
                {subscriptionData?.plan === "free" ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No billing information on file</p>
                    <Button onClick={() => handleUpgrade("pro")}>Upgrade to Pro for $1</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Payment Method</h4>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Next Payment</h4>
                        <div className="p-3 border rounded-lg">
                          <p className="font-medium">${subscriptionData?.plan === "pro" ? "9.00" : "29.00"}</p>
                          <p className="text-sm text-gray-500">
                            Due {new Date(subscriptionData?.currentPeriodEnd || "").toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline">Update Payment Method</Button>
                      <Button variant="outline">Download Invoice</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newsletter">Newsletter Updates</Label>
                      <p className="text-sm text-gray-500">Weekly newsletter with latest content</p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => updateNotificationSettings("newsletter", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="product">Product Updates</Label>
                      <p className="text-sm text-gray-500">New features and improvements</p>
                    </div>
                    <Switch
                      id="product"
                      checked={notifications.productUpdates}
                      onCheckedChange={(checked) => updateNotificationSettings("productUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="billing">Billing Notifications</Label>
                      <p className="text-sm text-gray-500">Payment confirmations and receipts</p>
                    </div>
                    <Switch
                      id="billing"
                      checked={notifications.billing}
                      onCheckedChange={(checked) => updateNotificationSettings("billing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing">Marketing Communications</Label>
                      <p className="text-sm text-gray-500">Special offers and promotions</p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => updateNotificationSettings("marketing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Change Email
                  </Button>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">This action cannot be undone</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
