"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TypewriterTextProps {
  text?: string
  words?: string[]
  speed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
  className?: string
  loop?: boolean
}

export function TypewriterText({
  text,
  words = [],
  speed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  className,
  loop = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (text) {
      // Single text mode
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, speed)

      return () => clearInterval(timer)
    } else if (words.length > 0) {
      // Multiple words mode
      const currentWord = words[currentIndex]

      const timer = setTimeout(
        () => {
          if (!isDeleting) {
            if (displayText.length < currentWord.length) {
              setDisplayText(currentWord.slice(0, displayText.length + 1))
            } else {
              setTimeout(() => setIsDeleting(true), delayBetweenWords)
            }
          } else {
            if (displayText.length > 0) {
              setDisplayText(displayText.slice(0, -1))
            } else {
              setIsDeleting(false)
              setCurrentIndex((prev) => (prev + 1) % words.length)
            }
          }
        },
        isDeleting ? deleteSpeed : speed,
      )

      return () => clearTimeout(timer)
    }
  }, [displayText, currentIndex, isDeleting, text, words, speed, deleteSpeed, delayBetweenWords])

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default TypewriterText
