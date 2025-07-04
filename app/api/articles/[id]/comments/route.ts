import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/db"
import Comment from "@/lib/models/comment"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const comments = await Comment.find({ article: params.id })
      .populate("author", "name image")
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await request.json()

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 })
    }

    await connectDB()

    const comment = await Comment.create({
      content: content.trim(),
      author: session.user.id,
      article: params.id,
    })

    await comment.populate("author", "name image")

    return NextResponse.json({ comment }, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
