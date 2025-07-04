import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  image: String,
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  readTime: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  newsletter: {
    type: String,
    enum: ["weekly-insights", "creator-spotlight", "tool-reviews"],
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

articleSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

export default mongoose.models.Article || mongoose.model("Article", articleSchema)
