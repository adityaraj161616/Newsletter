import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"

export async function POST(req: NextRequest) {
  try {
    // Initialize Stripe inside the handler to avoid build-time errors
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    })

    const body = await req.text()
    const signature = headers().get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    await connectDB()

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        if (session.customer_email) {
          await User.findOneAndUpdate(
            { email: session.customer_email },
            {
              subscription: {
                status: "active",
                plan: session.metadata?.plan || "pro",
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
              },
            },
            { upsert: true },
          )
        }
        break

      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription

        await User.findOneAndUpdate(
          { "subscription.stripeSubscriptionId": subscription.id },
          {
            "subscription.status": subscription.status,
            "subscription.currentPeriodEnd": new Date(subscription.current_period_end * 1000),
          },
        )
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription

        await User.findOneAndUpdate(
          { "subscription.stripeSubscriptionId": deletedSubscription.id },
          {
            "subscription.status": "canceled",
          },
        )
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
