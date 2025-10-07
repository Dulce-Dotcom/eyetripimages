'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    })

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative">
      {children}
    </div>
  )
}