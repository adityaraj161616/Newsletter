import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import Stripe from "stripe"

/**
 * POST /api/payments/create-checkout
 * Body: { priceId: string; plan: "pro" | "team" }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { priceId, plan } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: "priceId is required" }, { status: 400 })
    }

    /* --------------------------------------------------------------------- */
    /*  Create Stripe instance only after we know we have a secret key       */
    /* --------------------------------------------------------------------- */
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe secret key missing - set STRIPE_SECRET_KEY env-var" }, { status: 500 })
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2023-10-16",
    })

    const checkout = await stripe.checkout.sessions.create({
      customer_email: session.user.email!,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: { userId: session.user.id, plan },
      subscription_data: {
        metadata: { userId: session.user.id, plan },
      },
    })

    return NextResponse.json({ url: checkout.url })
  } catch (err) {
    console.error("create-checkout error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
