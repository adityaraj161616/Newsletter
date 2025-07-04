# 🚀 CourierPress - Premium Newsletter Platform

A modern, full-stack newsletter platform built with Next.js 15, featuring expert insights, tools, and resources for content creators.

## ✨ Features

### 🎨 **Modern UI/UX**
- Apple-inspired minimalist design
- Fully responsive (mobile, tablet, desktop, 4K)
- GSAP animations with ScrollTrigger
- Smooth parallax effects and micro-interactions
- Premium color scheme with fluid typography

### 🔐 **Authentication System**
- Email/Password authentication
- Google OAuth integration
- Protected routes and middleware
- Role-based access control (User, Admin, Editor)
- Session management with NextAuth.js

### 📊 **Content Management**
- Rich text editor for articles
- Image upload and management
- Categories and tags system
- Draft/Published workflow
- SEO optimization tools

### 💰 **Subscription Model**
- Free tier with limited access
- Premium subscriptions with Stripe
- Newsletter management
- Usage tracking and analytics
- Automated billing

### 🛠 **Interactive Tools**
- Content ROI Calculator
- Engagement Rate Analyzer
- Newsletter Growth Tracker
- Content Calendar Generator
- Audience Targeting Tool

### 📈 **Admin Dashboard**
- Content management system
- User management
- Analytics and reporting
- Subscription management
- Revenue tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: GSAP 3.x, Framer Motion
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js, Google OAuth
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe (for subscriptions)
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google OAuth credentials
- Stripe account (for payments)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/courierpress.git
cd courierpress
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
Create a `.env.local` file in the root directory:

\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/courierpress
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/courierpress

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (for subscriptions)
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email (for newsletters)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@courierpress.com

# File Upload (optional)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
\`\`\`

### 4. Setup Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 5. Setup MongoDB
**Option A: Local MongoDB**
\`\`\`bash
# Install MongoDB locally
brew install mongodb/brew/mongodb-community
brew services start mongodb/brew/mongodb-community
\`\`\`

**Option B: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `.env.local`

### 6. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Setup Admin User
1. Sign up with your email
2. Go to MongoDB and update your user role to "admin"
3. Access admin dashboard at `/admin`

## 📦 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Other Platforms
- **Netlify**: Use `npm run build` and deploy `out` folder
- **Railway**: Connect GitHub and add environment variables
- **DigitalOcean**: Use App Platform with GitHub integration

## 🔧 Configuration

### Database Models
- **User**: Authentication and profile data
- **Article**: Blog posts and newsletter content
- **Subscription**: User subscription management
- **Tool**: Interactive tools configuration
- **Analytics**: Usage and performance tracking

### API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/articles` - Article CRUD operations
- `/api/users` - User management
- `/api/subscriptions` - Subscription management
- `/api/tools` - Tool usage tracking
- `/api/analytics` - Analytics data

### Subscription Tiers
- **Free**: Limited articles, basic tools
- **Pro ($9/month)**: Unlimited access, premium tools
- **Team ($29/month)**: Multiple users, advanced analytics

## 🎯 Key Features Explained

### Authentication Flow
1. User signs up/in via email or Google
2. JWT token stored in secure httpOnly cookie
3. Protected routes check authentication status
4. Role-based access for admin features

### Content Management
1. Rich text editor with image upload
2. Auto-save drafts to localStorage
3. SEO optimization with meta tags
4. Category and tag management

### Subscription System
1. Stripe integration for payments
2. Webhook handling for subscription events
3. Usage tracking and limits
4. Automated email notifications

### Analytics Dashboard
1. Real-time user analytics
2. Content performance metrics
3. Revenue tracking
4. Subscription analytics

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
\`\`\`bash
# Check MongoDB is running
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb/brew/mongodb-community
\`\`\`

**Google OAuth Error**
- Verify redirect URIs in Google Console
- Check client ID and secret in `.env.local`
- Ensure Google+ API is enabled

**Build Errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Environment Variables Not Loading**
- Restart development server after adding new variables
- Check `.env.local` file is in root directory
- Verify variable names match exactly

## 📚 Documentation

### API Documentation
- [Authentication API](./docs/api/auth.md)
- [Articles API](./docs/api/articles.md)
- [Subscriptions API](./docs/api/subscriptions.md)

### Component Documentation
- [UI Components](./docs/components/ui.md)
- [Animation Components](./docs/components/animations.md)
- [Layout Components](./docs/components/layout.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [GSAP](https://greensock.com/gsap/) - Animation library
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [Stripe](https://stripe.com/) - Payment processing

## 📞 Support

- 📧 Email: support@courierpress.com
- 💬 Discord: [Join our community](https://discord.gg/courierpress)
- 📖 Documentation: [docs.courierpress.com](https://docs.courierpress.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/courierpress/issues)

---

Made with ❤️ by the CourierPress team
