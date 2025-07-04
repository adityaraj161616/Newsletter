"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Crown,
  Star,
  Calendar,
  CreditCard,
  Download,
  Mail,
  Users,
  TrendingUp,
  Settings,
  Bell,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Subscription {
  id: string
  plan: "free" | "pro" | "team"
  status: "active" | "canceled" | "past_due"
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

interface Usage {
  articlesRead: number
  articlesLimit: number
  toolsUsed: number
  toolsLimit: number
  downloadsUsed: number
  downloadsLimit: number
}

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<Usage | null>(null)
  const [loading, setLoading] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)

  useEffect(() => {
    fetchSubscriptionData()
  }, [])

  const fetchSubscriptionData = async () => {
    try {
      // Mock data - replace with actual API calls
      setSubscription({
        id: "sub_123",
        plan: "pro",
        status: "active",
        currentPeriodEnd: "2024-02-15",
        cancelAtPeriodEnd: false,
      })

      setUsage({
        articlesRead: 45,
        articlesLimit: 100,
        toolsUsed: 12,
        toolsLimit: 50,
        downloadsUsed: 8,
        downloadsLimit: 25,
      })
    } catch (error) {
      console.error("Error fetching subscription data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      // API call to cancel subscription
      toast({
        title: "Subscription Canceled",
        description: "Your subscription will remain active until the end of the current billing period.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReactivateSubscription = async () => {
    try {
      // API call to reactivate subscription
      toast({
        title: "Subscription Reactivated",
        description: "Your subscription has been successfully reactivated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  const planFeatures = {
    free: {
      name: "Free",
      price: "$0",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      features: ["5 articles per month", "Basic tools access", "Community support", "Weekly newsletter"],
    },
    pro: {
      name: "Pro",
      price: "$9",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Unlimited articles",
        "All premium tools",
        "Priority support",
        "Daily insights",
        "Exclusive content",
        "Advanced analytics",
      ],
    },
    team: {
      name: "Team",
      price: "$29",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Custom integrations",
        "Dedicated support",
        "White-label options",
      ],
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your subscription details.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentPlan = subscription?.plan || "free"
  const planInfo = planFeatures[currentPlan]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Subscription Management</h1>
          <p className="text-xl text-gray-600">Manage your Charter subscription and preferences</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Current Plan */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${planInfo.bgColor} rounded-xl flex items-center justify-center`}>
                          <Crown className={`w-6 h-6 ${planInfo.color}`} />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{planInfo.name} Plan</span>
                            {currentPlan !== "free" && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                          </CardTitle>
                          <CardDescription>
                            {currentPlan === "free" ? "Free forever" : `${planInfo.price}/month`}
                          </CardDescription>
                        </div>
                      </div>
                      {currentPlan === "free" && (
                        <Button asChild>
                          <Link href="/pricing">Upgrade</Link>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Plan Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {planInfo.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {subscription && subscription.plan !== "free" && (
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Next billing date:</span>
                            <span className="font-medium">
                              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span>Status:</span>
                            <Badge
                              className={
                                subscription.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {subscription.status}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Articles Read</span>
                      </div>
                      <span className="font-semibold">{usage?.articlesRead || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Tools Used</span>
                      </div>
                      <span className="font-semibold">{usage?.toolsUsed || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Downloads</span>
                      </div>
                      <span className="font-semibold">{usage?.downloadsUsed || 0}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Account</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium">{session.user?.name}</div>
                      <div className="text-gray-600">{session.user?.email}</div>
                    </div>
                    <div className="text-xs text-gray-500">Member since {new Date().toLocaleDateString()}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>Articles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Used this month</span>
                      <span className="font-medium">
                        {usage?.articlesRead || 0} / {usage?.articlesLimit === -1 ? "∞" : usage?.articlesLimit}
                      </span>
                    </div>
                    {usage?.articlesLimit !== -1 && (
                      <Progress value={((usage?.articlesRead || 0) / (usage?.articlesLimit || 1)) * 100} />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span>Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Used this month</span>
                      <span className="font-medium">
                        {usage?.toolsUsed || 0} / {usage?.toolsLimit === -1 ? "∞" : usage?.toolsLimit}
                      </span>
                    </div>
                    {usage?.toolsLimit !== -1 && (
                      <Progress value={((usage?.toolsUsed || 0) / (usage?.toolsLimit || 1)) * 100} />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-green-500" />
                    <span>Downloads</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Used this month</span>
                      <span className="font-medium">
                        {usage?.downloadsUsed || 0} / {usage?.downloadsLimit === -1 ? "∞" : usage?.downloadsLimit}
                      </span>
                    </div>
                    {usage?.downloadsLimit !== -1 && (
                      <Progress value={((usage?.downloadsUsed || 0) / (usage?.downloadsLimit || 1)) * 100} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>Your activity over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Usage analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subscription && subscription.plan !== "free" ? (
                    <>
                      <div className="flex justify-between">
                        <span>Current Plan</span>
                        <span className="font-medium">{planInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount</span>
                        <span className="font-medium">{planInfo.price}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Payment</span>
                        <span className="font-medium">
                          {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="border-t pt-4 space-y-2">
                        {subscription.cancelAtPeriodEnd ? (
                          <Button onClick={handleReactivateSubscription} className="w-full">
                            Reactivate Subscription
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={handleCancelSubscription}
                            className="w-full bg-transparent"
                          >
                            Cancel Subscription
                          </Button>
                        )}
                        <Button variant="outline" asChild className="w-full bg-transparent">
                          <Link href="/pricing">Change Plan</Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">You're currently on the free plan</p>
                      <Button asChild>
                        <Link href="/pricing">Upgrade to Pro</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No payment history available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Manage how you receive updates from Charter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive weekly newsletters and important updates</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified about new articles and features</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
