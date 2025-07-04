import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/db"
import Article from "@/lib/models/article"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // In a real app, you'd track individual user likes
    // For now, just increment the like count
    await Article.findByIdAndUpdate(params.id, {
      $inc: { likes: 1 },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error liking article:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
