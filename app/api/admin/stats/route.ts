import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"
import Article from "@/lib/models/article"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get stats
    const totalUsers = await User.countDocuments()
    const totalArticles = await Article.countDocuments()

    // Mock revenue data (replace with actual subscription data)
    const totalRevenue = 45000
    const monthlyGrowth = 23

    return NextResponse.json({
      totalUsers,
      totalArticles,
      totalRevenue,
      monthlyGrowth,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
