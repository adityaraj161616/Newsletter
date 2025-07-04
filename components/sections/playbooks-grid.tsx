"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

interface Playbook {
  slug: string
  title: string
  description: string
  cover: string
  tags: string[]
}

const playbooks: Playbook[] = [
  {
    slug: "newsletter-growth",
    title: "Newsletter Growth Engine",
    description: "Strategies to acquire & retain 10k subscribers in 6 months.",
    cover: "/placeholder.svg?height=300&width=480",
    tags: ["Growth", "Email"],
  },
  {
    slug: "content-monetization",
    title: "Content Monetization Blueprint",
    description: "Proven paths to $10k M-R-R for small creator teams.",
    cover: "/placeholder.svg?height=300&width=480",
    tags: ["Monetization", "Strategy"],
  },
  // …add more playbooks here
]

export default function PlaybooksGrid() {
  useEffect(() => {
    gsap.from(".playbook-card", {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#playbooks-grid",
        start: "top 85%",
      },
    })
  }, [])

  return (
    <section id="playbooks-grid" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">Download Premium Playbooks</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {playbooks.map((p) => (
          <Card key={p.slug} className="playbook-card group relative overflow-hidden transition-shadow hover:shadow-lg">
            <Link href={`/playbooks/${p.slug}`} className="absolute inset-0 z-10" />

            <Image
              src={p.cover || "/placeholder.svg"}
              alt={p.title}
              width={480}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />

            <CardContent className="space-y-2 p-4">
              <h3 className="line-clamp-2 text-lg font-semibold">{p.title}</h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 p-4">
              {p.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
