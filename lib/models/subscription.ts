import mongoose from "mongoose"

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["free", "pro", "team"],
    default: "free",
  },
  status: {
    type: String,
    enum: ["active", "canceled", "past_due", "trialing"],
    default: "active",
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  stripePriceId: String,
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
  trialStart: Date,
  trialEnd: Date,
  usage: {
    articlesRead: {
      type: Number,
      default: 0,
    },
    toolsUsed: {
      type: Number,
      default: 0,
    },
    downloadsThisMonth: {
      type: Number,
      default: 0,
    },
  },
  limits: {
    articlesPerMonth: {
      type: Number,
      default: 5, // Free tier limit
    },
    toolUsagePerMonth: {
      type: Number,
      default: 10, // Free tier limit
    },
    downloadsPerMonth: {
      type: Number,
      default: 2, // Free tier limit
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

subscriptionSchema.pre("save", function (next) {
  this.updatedAt = new Date()

  // Set limits based on plan
  if (this.plan === "pro") {
    this.limits.articlesPerMonth = -1 // Unlimited
    this.limits.toolUsagePerMonth = -1 // Unlimited
    this.limits.downloadsPerMonth = -1 // Unlimited
  } else if (this.plan === "team") {
    this.limits.articlesPerMonth = -1 // Unlimited
    this.limits.toolUsagePerMonth = -1 // Unlimited
    this.limits.downloadsPerMonth = -1 // Unlimited
  }

  next()
})

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema)
