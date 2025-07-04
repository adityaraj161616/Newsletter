import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/db"
import Article from "@/lib/models/article"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const articles = await Article.find().populate("author", "name email").sort({ createdAt: -1 }).limit(20).lean()

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Error fetching admin articles:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
