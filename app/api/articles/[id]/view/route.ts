import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Article from "@/lib/models/article"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    await Article.findByIdAndUpdate(params.id, {
      $inc: { views: 1 },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking view:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
