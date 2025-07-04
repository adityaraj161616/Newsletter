import Hero from "@/components/sections/hero"
import FeaturedNewsletter from "@/components/sections/featured-newsletter"
import TrendingTopics from "@/components/sections/trending-topics"
import PlaybooksGrid from "@/components/sections/playbooks-grid"
import ToolsPreview from "@/components/sections/tools-preview"
import IncomeReports from "@/components/sections/income-reports"
import TestimonialsCarousel from "@/components/sections/testimonials-carousel"
import NewsletterSignup from "@/components/sections/newsletter-signup"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedNewsletter />
      <TrendingTopics />
      <PlaybooksGrid />
      <ToolsPreview />
      <IncomeReports />
      <TestimonialsCarousel />
      <NewsletterSignup />
    </div>
  )
}
