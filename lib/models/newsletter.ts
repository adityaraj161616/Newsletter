import mongoose from "mongoose"

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "unsubscribed", "bounced"],
    default: "active",
  },
  preferences: {
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "weekly",
    },
    topics: [
      {
        type: String,
        enum: [
          "all",
          "content-strategy",
          "creator-economy",
          "newsletter-growth",
          "social-media",
          "email-marketing",
          "seo",
          "analytics",
          "tools",
        ],
        default: "all",
      },
    ],
  },
  source: {
    type: String,
    enum: ["website", "popup", "article", "social", "referral"],
    default: "website",
  },
  tags: [String],
  lastEmailSent: Date,
  emailsSent: {
    type: Number,
    default: 0,
  },
  emailsOpened: {
    type: Number,
    default: 0,
  },
  emailsClicked: {
    type: Number,
    default: 0,
  },
  unsubscribedAt: Date,
  unsubscribeReason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

newsletterSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// Indexes for performance
newsletterSchema.index({ email: 1 })
newsletterSchema.index({ status: 1 })
newsletterSchema.index({ createdAt: -1 })

export default mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema)
