'use client'

import React from 'react'

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

export default function TestimonialTicker() {
  // Create a doubled array for seamless looping
  const doubledTestimonials = [...testimonials, ...testimonials]

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
        @keyframes scroll-left-to-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }
        .ticker-animate {
          animation: scroll-left-to-right 120s linear infinite;
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
