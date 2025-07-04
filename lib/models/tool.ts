import mongoose from "mongoose"

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["calculator", "analyzer", "generator", "tracker", "optimizer"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    default: 0,
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
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

toolSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Tool || mongoose.model("Tool", toolSchema)
