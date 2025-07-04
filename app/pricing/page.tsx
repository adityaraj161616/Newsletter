"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceId: null,
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "5 articles per month",
      "Basic tools access",
      "2 playbook downloads",
      "Community access",
      "Email support",
    ],
    limitations: ["Limited article access", "Basic tool features only", "No premium content"],
    popular: false,
    color: "border-gray-200",
  },
  {
    id: "pro",
    name: "Pro",
    price: 9,
    priceId: "price_pro_monthly", // Replace with actual Stripe price ID
    description: "For serious content creators",
    icon: Zap,
    features: [
      "Unlimited articles",
      "All premium tools",
      "Unlimited downloads",
      "Priority support",
      "Advanced analytics",
      "Early access to features",
      "Weekly expert calls",
    ],
    limitations: [],
    popular: true,
    color: "border-teal-500 ring-2 ring-teal-500",
  },
  {
    id: "team",
    name: "Team",
    price: 29,
    priceId: "price_team_monthly", // Replace with actual Stripe price ID
    description: "For teams and agencies",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom integrations",
      "Dedicated account manager",
      "Custom reporting",
      "White-label options",
      "API access",
    ],
    limitations: [],
    popular: false,
    color: "border-purple-500",
  },
]

export default function PricingPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = async (plan: (typeof plans)[0]) => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to subscribe to a plan.",
      })
      return
    }

    if (plan.id === "free") {
      toast({
        title: "You're already on the free plan",
        description: "Upgrade to Pro or Team for more features.",
      })
      return
    }

    setLoading(plan.id)

    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: plan.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Error creating checkout:", error)
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of content creators who trust CourierPress to grow their audience and revenue.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={billingCycle === "monthly" ? "text-gray-900 font-semibold" : "text-gray-500"}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={billingCycle === "yearly" ? "text-gray-900 font-semibold" : "text-gray-500"}>Yearly</span>
            {billingCycle === "yearly" && <Badge className="bg-green-100 text-green-800">Save 20%</Badge>}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            const yearlyPrice = Math.round(plan.price * 12 * 0.8) // 20% discount
            const displayPrice = billingCycle === "yearly" ? yearlyPrice : plan.price

            return (
              <Card
                key={plan.id}
                className={`relative ${plan.color} ${plan.popular ? "scale-105" : ""} transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-teal-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${displayPrice}</span>
                    {plan.price > 0 && (
                      <span className="text-gray-500">/{billingCycle === "yearly" ? "year" : "month"}</span>
                    )}
                  </div>
                  {billingCycle === "yearly" && plan.price > 0 && (
                    <p className="text-sm text-green-600 mt-1">Save ${plan.price * 12 - yearlyPrice} per year</p>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? (
                      "Processing..."
                    ) : plan.id === "free" ? (
                      "Current Plan"
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  {plan.id === "free" && !session && (
                    <p className="text-center text-sm text-gray-500">
                      <Link href="/signup" className="text-teal-600 hover:text-teal-500">
                        Sign up
                      </Link>{" "}
                      to get started
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the
                next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a
                full refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure
                Stripe integration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Our Free plan gives you access to limited features forever. You can upgrade to Pro or Team at any time
                to unlock all features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time from your dashboard. You'll continue to have access
                until the end of your billing period.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Growing?</h3>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have transformed their content strategy with CourierPress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent"
              asChild
            >
              <Link href="/articles">Explore Content</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
