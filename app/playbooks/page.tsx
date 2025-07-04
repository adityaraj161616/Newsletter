"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Star, FileText } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const playbooks = [
  {
    id: 1,
    title: "Complete Last-Mile Delivery Optimization Guide",
    description:
      "A comprehensive 50-page guide covering route optimization, delivery windows, and cost reduction strategies.",
    category: "Delivery",
    pages: 50,
    downloads: 2340,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    tags: ["Route Optimization", "Cost Reduction", "Customer Experience"],
  },
  {
    id: 2,
    title: "Supply Chain Risk Management Playbook",
    description:
      "Essential strategies for identifying, assessing, and mitigating supply chain risks in uncertain times.",
    category: "Risk Management",
    pages: 35,
    downloads: 1890,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Risk Assessment", "Contingency Planning", "Supplier Management"],
  },
  {
    id: 3,
    title: "Warehouse Automation Implementation Guide",
    description: "Step-by-step guide to implementing automation technologies in your warehouse operations.",
    category: "Automation",
    pages: 42,
    downloads: 1560,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Automation", "ROI Analysis", "Implementation"],
  },
  {
    id: 4,
    title: "Sustainable Logistics Practices",
    description: "Comprehensive guide to implementing eco-friendly practices across your logistics operations.",
    category: "Sustainability",
    pages: 38,
    downloads: 1230,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Green Logistics", "Carbon Footprint", "Sustainability"],
  },
  {
    id: 5,
    title: "E-commerce Fulfillment Strategies",
    description: "Advanced strategies for optimizing e-commerce fulfillment operations and customer satisfaction.",
    category: "E-commerce",
    pages: 45,
    downloads: 2100,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Fulfillment", "E-commerce", "Customer Service"],
  },
  {
    id: 6,
    title: "International Shipping Compliance",
    description: "Navigate complex international shipping regulations and compliance requirements with confidence.",
    category: "Compliance",
    pages: 55,
    downloads: 980,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Compliance", "International", "Regulations"],
  },
]

const categories = ["All", "Delivery", "Risk Management", "Automation", "Sustainability", "E-commerce", "Compliance"]

export default function PlaybooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPlaybooks, setFilteredPlaybooks] = useState(playbooks)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current?.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Cards animation
      gsap.from(cardsRef.current?.children, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let filtered = playbooks

    if (selectedCategory !== "All") {
      filtered = filtered.filter((playbook) => playbook.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (playbook) =>
          playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          playbook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          playbook.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPlaybooks(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Expert Playbooks</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Download comprehensive guides and strategies from industry leaders to optimize your logistics operations.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search playbooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredPlaybooks.length} of {playbooks.length} playbooks
          </p>
        </div>

        {/* Playbooks Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaybooks.map((playbook) => (
            <Card
              key={playbook.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={playbook.image || "/placeholder.svg"}
                  alt={playbook.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-teal-600 text-white">{playbook.category}</Badge>
                </div>
                {playbook.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-teal-600 hover:bg-gray-100"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download
                  </Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="group-hover:text-teal-600 transition-colors line-clamp-2">
                  {playbook.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">{playbook.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {playbook.pages} pages
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {playbook.downloads.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                    {playbook.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {playbook.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700 group/btn">
                  <Download className="mr-2 w-4 h-4 group-hover/btn:animate-bounce" />
                  Download Playbook
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlaybooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No playbooks found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-teal-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want to contribute your expertise?</h3>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            Share your knowledge with the logistics community. Submit your own playbook and help others optimize their
            operations.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
            Submit a Playbook
          </Button>
        </div>
      </div>
    </div>
  )
}
