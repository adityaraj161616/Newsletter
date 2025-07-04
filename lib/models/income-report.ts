import mongoose from "mongoose"

const incomeReportSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
  },
  url: String,
  description: String,
  category: {
    type: String,
    required: true,
  },
  revenueMonthly: {
    type: Number,
    required: true,
  },
  revenueYearly: {
    type: Number,
    required: true,
  },
  revenueStreams: [
    {
      source: String,
      amount: Number,
      percentage: Number,
    },
  ],
  metrics: {
    pageViews: Number,
    subscribers: Number,
    conversionRate: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  reportDate: {
    type: Date,
    required: true,
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

incomeReportSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.IncomeReport || mongoose.model("IncomeReport", incomeReportSchema)
