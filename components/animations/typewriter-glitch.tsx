"use client"

import { useState, useEffect } from "react"

interface TypewriterGlitchProps {
  text: string
  className?: string
  delay?: number
  typeSpeed?: number
  glitchDuration?: number
}

export default function TypewriterGlitch({
  text,
  className = "",
  delay = 0,
  typeSpeed = 100,
  glitchDuration = 500,
}: TypewriterGlitchProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isSettled, setIsSettled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping || isSettled) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typeSpeed)

      return () => clearTimeout(timer)
    } else {
      // Start glitch effect
      const glitchTimer = setTimeout(() => {
        setIsGlitching(true)

        const settleTimer = setTimeout(() => {
          setIsGlitching(false)
          setIsSettled(true)
        }, glitchDuration)

        return () => clearTimeout(settleTimer)
      }, 300)

      return () => clearTimeout(glitchTimer)
    }
  }, [currentIndex, text, typeSpeed, isTyping, isSettled, glitchDuration])

  return (
    <span className={`${className} ${isGlitching ? "glitch-text glitching" : ""}`} data-text={displayText}>
      {displayText}
      {!isSettled && <span className="animate-pulse">|</span>}
    </span>
  )
}
