"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface MagneticTextProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticText({ children, className, strength = 0.5 }: MagneticTextProps) {
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = magneticRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) * strength
      const y = (e.clientY - top - height / 2) * strength

      gsap.to(element, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={magneticRef} className={cn("inline-block cursor-pointer", className)}>
      {children}
    </div>
  )
}

export default MagneticText
