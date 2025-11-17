'use client'

import React, { useState, useEffect } from 'react'

const testimonials = [
  "I get completely mesmerized - James C.",
  "Calmed me right down. And I needed calming - Jim C.",
  "My mind is completely blown. - Jim C.",
  "Spectacular... uplifting - Sara S.",
  "Brilliant joyful hypnotic art ! - Sara S.",
  "Great images! - Ken V.",
  "Amazing journey! - Robert P.",
  "Wild and beautiful - Rob P.",
  "Awesome! A true mind-bending experience. - Judy O.",
  "Wow! That's beautiful! - Mary J.",
  "So beautiful! - Jon F.",
  "Stunning! Visuals and music. - Vicki S.",
  "So unbelievably wonderful. - Vicki S.",
  "So cool - Claudia M."
]

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function TestimonialTicker() {
  const [mounted, setMounted] = useState(false)
  const [shuffledTestimonials, setShuffledTestimonials] = useState(testimonials)

  useEffect(() => {
    setMounted(true)
    // Randomize testimonials on client-side mount
    setShuffledTestimonials(shuffleArray(testimonials))
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <section
        style={{
          width: '100vw',
          height: 120,
          position: 'relative',
          overflow: 'hidden'
        }}
        aria-label="Testimonials"
      />
    )
  }

  // Create a doubled array for seamless looping
  const doubledTestimonials = [...shuffledTestimonials, ...shuffledTestimonials]

  return (
    <section
      style={{
        width: '100vw',
        height: 120,
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Testimonials"
      className="relative bg-gradient-to-b from-deep-blue via-dark-grey to-deep-blue"
    >
      <style jsx>{`
        @keyframes scroll-right-to-left {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .ticker-animate {
          animation: scroll-right-to-left 120s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Testimonial Ticker */}
      <div className="absolute inset-0 z-10 flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap ticker-animate">
          {doubledTestimonials.map((testimonial, index) => (
            <span
              key={index}
              className="inline-block px-8 text-xl md:text-2xl lg:text-3xl font-bold text-hypnotic-white"
              style={{
                textShadow: '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
              }}
            >
              {testimonial}
              <span className="mx-8 text-electric-blue">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect at edges */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgb(18, 18, 18), transparent)'
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgb(18, 18, 18), transparent)'
        }}
      />
    </section>
  )
}
