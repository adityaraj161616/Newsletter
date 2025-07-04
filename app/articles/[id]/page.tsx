"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  ArrowLeft,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  ThumbsUp,
  User,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Article {
  _id: string
  title: string
  content: string
  excerpt: string
  author: {
    _id: string
    name: string
    email: string
    image?: string
  }
  category: string
  tags: string[]
  image?: string
  readTime: number
  views: number
  likes: number
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface Comment {
  _id: string
  content: string
  author: {
    name: string
    image?: string
  }
  createdAt: string
  likes: number
}

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchArticle()
      fetchComments()
    }
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data.article)

        // Track view
        await fetch(`/api/articles/${params.id}/view`, { method: "POST" })
      } else {
        router.push("/articles")
      }
    } catch (error) {
      console.error("Error fetching article:", error)
      router.push("/articles")
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}/comments`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleLike = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to like articles.",
      })
      return
    }

    try {
      const response = await fetch(`/api/articles/${params.id}/like`, {
        method: "POST",
      })

      if (response.ok) {
        setLiked(!liked)
        if (article) {
          setArticle({
            ...article,
            likes: liked ? article.likes - 1 : article.likes + 1,
          })
        }
      }
    } catch (error) {
      console.error("Error liking article:", error)
    }
  }

  const handleBookmark = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to bookmark articles.",
      })
      return
    }

    try {
      const response = await fetch(`/api/articles/${params.id}/bookmark`, {
        method: "POST",
      })

      if (response.ok) {
        setBookmarked(!bookmarked)
        toast({
          title: bookmarked ? "Bookmark removed" : "Article bookmarked",
          description: bookmarked ? "Article removed from bookmarks" : "Article saved to your bookmarks",
        })
      }
    } catch (error) {
      console.error("Error bookmarking article:", error)
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = article?.title || ""

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "Article link copied to clipboard",
        })
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to comment.",
      })
      return
    }

    if (!newComment.trim()) return

    try {
      const response = await fetch(`/api/articles/${params.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments([data.comment, ...comments])
        setNewComment("")
        toast({
          title: "Comment posted",
          description: "Your comment has been added successfully.",
        })
      }
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Button asChild>
            <Link href="/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-teal-600 transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/articles">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-teal-600 text-white">{article.category}</Badge>
            {article.featured && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>

          {/* Author Info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={article.author.image || "/placeholder.svg"} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-gray-900">{article.author.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {article.views.toLocaleString()} views
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {article.likes.toLocaleString()} likes
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.image && (
          <div className="mb-8">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 pt-8 border-t flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={liked ? "default" : "outline"}
                      onClick={handleLike}
                      className="flex items-center space-x-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{liked ? "Liked" : "Like"}</span>
                    </Button>

                    <Button
                      variant={bookmarked ? "default" : "outline"}
                      onClick={handleBookmark}
                      className="flex items-center space-x-2"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>{bookmarked ? "Saved" : "Save"}</span>
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="mt-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                {session ? (
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="flex space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user.image || ""} />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          rows={3}
                        />
                        <div className="mt-2 flex justify-end">
                          <Button type="submit" disabled={!newComment.trim()}>
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">Sign in to join the conversation</p>
                    <Button asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment._id} className="flex space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.author.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{comment.author.name}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {comments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage src={article.author.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900 mb-2">{article.author.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Content Creator & Industry Expert</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">Get the latest articles delivered to your inbox.</p>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">Subscribe</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
