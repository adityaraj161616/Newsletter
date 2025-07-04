"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter, Star, Users, Clock, FileText, Video, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const playbooks = [
  {
    id: 1,
    title: "Newsletter Growth Playbook",
    description: "Complete guide to growing your newsletter from 0 to 10,000 subscribers in 6 months",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&q=80",
    price: "$49",
    originalPrice: "$99",
    category: "Growth",
    format: "PDF + Templates",
    pages: 127,
    downloads: 2847,
    rating: 4.9,
    features: [
      "Step-by-step growth framework",
      "50+ proven subject lines",
      "Email templates library",
      "Analytics tracking guide",
    ],
    tags: ["Newsletter", "Growth", "Email Marketing"],
    difficulty: "Beginner",
    timeToComplete: "2-3 weeks",
  },
  {
    id: 2,
    title: "Content Monetization Masterclass",
    description: "Turn your content into multiple revenue streams with proven strategies from top creators",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop&q=80",
    price: "$79",
    originalPrice: "$149",
    category: "Monetization",
    format: "Video Course + PDF",
    pages: 89,
    downloads: 1923,
    rating: 4.8,
    features: [
      "7 monetization strategies",
      "Pricing psychology guide",
      "Sales funnel templates",
      "Case study breakdowns",
    ],
    tags: ["Monetization", "Content", "Sales"],
    difficulty: "Intermediate",
    timeToComplete: "3-4 weeks",
  },
  {
    id: 3,
    title: "Social Media Authority Blueprint",
    description: "Build a powerful personal brand and become a thought leader in your industry",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&q=80",
    price: "$39",
    originalPrice: "$79",
    category: "Branding",
    format: "PDF + Worksheets",
    pages: 95,
    downloads: 3421,
    rating: 4.7,
    features: [
      "Personal branding framework",
      "Content calendar templates",
      "Engagement strategies",
      "Platform-specific guides",
    ],
    tags: ["Social Media", "Branding", "Authority"],
    difficulty: "Beginner",
    timeToComplete: "1-2 weeks",
  },
  {
    id: 4,
    title: "AI Tools for Creators",
    description: "Comprehensive guide to AI tools that will 10x your content creation productivity",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&q=80",
    price: "$59",
    originalPrice: "$119",
    category: "Tools",
    format: "Interactive Guide",
    pages: 156,
    downloads: 1654,
    rating: 4.9,
    features: ["50+ AI tool reviews", "Workflow automation guides", "Prompt libraries", "ROI calculators"],
    tags: ["AI", "Tools", "Productivity"],
    difficulty: "Intermediate",
    timeToComplete: "2-3 weeks",
  },
  {
    id: 5,
    title: "Community Building Secrets",
    description: "Create and scale engaged communities that drive business growth",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&q=80",
    price: "$69",
    originalPrice: "$129",
    category: "Community",
    format: "PDF + Video",
    pages: 112,
    downloads: 987,
    rating: 4.8,
    features: ["Community launch framework", "Engagement strategies", "Moderation guidelines", "Monetization tactics"],
    tags: ["Community", "Engagement", "Growth"],
    difficulty: "Advanced",
    timeToComplete: "4-6 weeks",
  },
  {
    id: 6,
    title: "Email Automation Mastery",
    description: "Set up automated email sequences that convert subscribers into customers",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=250&fit=crop&q=80",
    price: "$89",
    originalPrice: "$179",
    category: "Automation",
    format: "Course + Templates",
    pages: 134,
    downloads: 2156,
    rating: 4.9,
    features: ["12 email sequence templates", "Automation workflows", "A/B testing guides", "Performance tracking"],
    tags: ["Email", "Automation", "Conversion"],
    difficulty: "Intermediate",
    timeToComplete: "3-4 weeks",
  },
]

const categories = ["All", "Growth", "Monetization", "Branding", "Tools", "Community", "Automation"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function PlaybooksGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [filteredPlaybooks, setFilteredPlaybooks] = useState(playbooks)

  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      )

      // Filters animation
      gsap.fromTo(
        filtersRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
      )

      // Grid animation
      gsap.fromTo(
        ".playbook-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const filtered = playbooks.filter((playbook) => {
      const matchesSearch =
        playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playbook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playbook.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || playbook.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "All" || playbook.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    setFilteredPlaybooks(filtered)
  }, [searchTerm, selectedCategory, selectedDifficulty])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFormatIcon = (format: string) => {
    if (format.includes("Video")) return <Video className="w-4 h-4" />
    if (format.includes("Interactive")) return <Zap className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Download Premium Playbooks</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Battle-tested strategies and frameworks from successful creators. Get the exact playbooks that have
            generated millions in revenue.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search playbooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-slate-200 focus:border-slate-400"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaybooks.map((playbook) => (
            <Card
              key={playbook.id}
              className="playbook-card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={playbook.image || "/placeholder.svg"}
                  alt={playbook.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getDifficultyColor(playbook.difficulty)}>{playbook.difficulty}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-slate-700">
                    {playbook.format.split(" ")[0]}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                    {playbook.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 line-clamp-3">{playbook.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{playbook.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{playbook.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{playbook.timeToComplete}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {playbook.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {playbook.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900">{playbook.price}</span>
                    <span className="text-lg text-slate-400 line-through">{playbook.originalPrice}</span>
                  </div>
                  <Button className="group bg-slate-900 hover:bg-slate-800 text-white">
                    <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bundle Offer */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Get All Playbooks Bundle</h3>
          <p className="text-xl text-slate-300 mb-6">Save 60% when you get all 6 premium playbooks together</p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className="text-4xl font-bold">$199</span>
            <span className="text-2xl text-slate-400 line-through">$499</span>
            <Badge className="bg-green-500 text-white text-lg px-3 py-1">Save $300</Badge>
          </div>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-4">
            Get Complete Bundle
          </Button>
        </div>

        {/* No Results */}
        {filteredPlaybooks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No playbooks found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
