import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/db"
import Subscription from "@/lib/models/subscription"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    let subscription = await Subscription.findOne({ user: session.user.id })

    // Create free subscription if none exists
    if (!subscription) {
      subscription = await Subscription.create({
        user: session.user.id,
        plan: "free",
        status: "active",
      })
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { plan } = await request.json()

    await connectDB()

    const subscription = await Subscription.findOneAndUpdate(
      { user: session.user.id },
      {
        plan,
        status: "active",
        updatedAt: new Date(),
      },
      { upsert: true, new: true },
    )

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Error updating subscription:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
