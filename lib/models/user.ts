import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "credentials"
    },
  },
  image: String,
  provider: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials",
  },
  role: {
    type: String,
    enum: ["user", "admin", "editor"],
    default: "user",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  subscriptions: [
    {
      newsletter: String,
      subscribedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  preferences: {
    emailFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "weekly",
    },
    topics: [String],
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

userSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.User || mongoose.model("User", userSchema)
