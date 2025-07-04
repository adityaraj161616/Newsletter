import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Newsletter from "@/lib/models/newsletter"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email, name, preferences } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    await connectDB()

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email })
    if (existingSubscriber) {
      if (existingSubscriber.status === "active") {
        return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
      } else {
        // Reactivate subscription
        existingSubscriber.status = "active"
        existingSubscriber.preferences = preferences || existingSubscriber.preferences
        await existingSubscriber.save()

        return NextResponse.json({
          message: "Subscription reactivated successfully",
          subscriber: existingSubscriber,
        })
      }
    }

    // Create new subscription
    const subscriber = await Newsletter.create({
      email,
      name: name || "",
      preferences: preferences || {
        frequency: "weekly",
        topics: ["all"],
      },
      status: "active",
      source: "website",
    })

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name || "")
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      {
        message: "Subscribed successfully",
        subscriber,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
