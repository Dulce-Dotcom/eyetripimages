'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BabylonScene from './BabylonScene'
import { getVideoPath } from '@/lib/assetPath'

export default function Immersive3DSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Track scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  
  // Transform scroll progress to usable values - only after mounted
  // Reduce number of calculations for better performance
  const rotationProgress = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.3, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.7, 1, 0.8])
  
  // Don't render scroll-dependent animations until mounted
  if (!mounted) {
    return (
      <section 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-deep-blue via-dark-grey to-deep-blue"
      >
        {/* Static fallback during SSR */}
        <div className="absolute inset-0 z-10">
          <BabylonScene scrollProgress={0} />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none">
              <span className="block bg-gradient-to-r from-magenta via-hypnotic-white to-magenta bg-clip-text text-transparent">
                NEURO
              </span>
              <span className="block bg-gradient-to-r from-hypnotic-white via-magenta to-hypnotic-white bg-clip-text text-transparent -mt-4 lg:-mt-8">
                AESTHETICS
              </span>
            </h2>
            <p className="text-lg md:text-xl text-hypnotic-white/70 mt-8 max-w-2xl mx-auto tracking-wider">
              Where neuroscience meets visual artistry in immersive digital experiences
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-5">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-deep-blue/80 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-dark-grey/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(205,0,255,0.1),transparent_70%)]" />
        </div>
      </section>
    )
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-deep-blue via-dark-grey to-deep-blue"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ willChange: 'auto' }}
        >
          <source src={getVideoPath("stumpy_rect_16_9_4ktest.mp4")} type="video/mp4" />
        </video>
      </div>

      {/* 3D Babylon Scene - Background */}
      <motion.div 
        style={{ opacity: sceneOpacity }}
        className="absolute inset-0 z-10"
        suppressHydrationWarning
      >
        <BabylonScene scrollProgress={rotationProgress} />
      </motion.div>
      
      {/* Sticky Text Overlay */}
      <motion.div 
        style={{ 
          opacity: textOpacity
        }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        suppressHydrationWarning
      >
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none"
          >
            <span className="block bg-gradient-to-r from-magenta via-hypnotic-white to-magenta bg-clip-text text-transparent">
              NEURO
            </span>
            <span className="block bg-gradient-to-r from-hypnotic-white via-magenta to-hypnotic-white bg-clip-text text-transparent -mt-4 lg:-mt-8">
              AESTHETICS
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-lg md:text-xl text-hypnotic-white/70 mt-8 max-w-2xl mx-auto tracking-wider"
          >
            Where neuroscience meets visual artistry in immersive digital experiences
          </motion.p>
        </div>
      </motion.div>
      
      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-deep-blue/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-dark-grey/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(205,0,255,0.1),transparent_70%)]" />
      </div>
      
      {/* Interactive Particles Effect */}
      <motion.div 
        style={{ opacity: sceneOpacity }}
        suppressHydrationWarning
        className="absolute inset-0 z-15 pointer-events-none"
      >
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 1200,
              y: Math.random() * 800,
              opacity: 0 
            }}
            animate={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-magenta/60 rounded-full"
            style={{
              boxShadow: `0 0 10px rgba(255, 0, 162, 0.6)`
            }}
          />
        ))}
      </motion.div>
      
      {/* Progress Indicator */}
      <motion.div 
        style={{ 
          scaleX: scrollYProgress,
          opacity: textOpacity
        }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-magenta to-hypnotic-white origin-left z-30"
      />
    </section>
  )
}