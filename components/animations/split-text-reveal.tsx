"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface SplitTextRevealProps {
  text?: string
  children?: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export function SplitTextReveal({
  text,
  children,
  className,
  delay = 0,
  duration = 1,
  stagger = 0.05,
}: SplitTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current
      const textContent = text || element.textContent || ""

      // Split text into spans
      element.innerHTML = textContent
        .split("")
        .map((char) => `<span style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`)
        .join("")

      const chars = element.querySelectorAll("span")

      // Set initial state
      gsap.set(chars, {
        y: 100,
        opacity: 0,
        rotationX: -90,
      })

      // Animate in
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      })
    }
  }, [text, delay, duration, stagger])

  return (
    <div ref={textRef} className={cn("inline-block", className)}>
      {!text && children}
    </div>
  )
}

export default SplitTextReveal
