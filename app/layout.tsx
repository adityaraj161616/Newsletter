import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { GSAPProvider } from "@/components/providers/gsap-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CourierPress - Premium Newsletter Platform",
  description:
    "Discover the future of content with our premium newsletter platform featuring expert insights, tools, and resources.",
  keywords: "newsletter, content, insights, premium, tools, resources",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <GSAPProvider>
          <AuthProvider>
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </GSAPProvider>
      </body>
    </html>
  )
}
