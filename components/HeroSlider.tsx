'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParallaxContainer from './ParallaxContainer'

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Text animation transforms
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  
  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Layer 1 - Background with slow parallax */}
      <ParallaxContainer speed={-0.2} className="absolute inset-0">
        <div className="h-[120vh] w-full bg-gradient-to-br from-deep-blue via-dark-grey to-deep-blue">
          {/* Background texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(205,0,255,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,248,255,0.08),transparent_50%)]" />
          {/* Additional visual interest */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(205,0,255,0.05)_50%,transparent_60%)]" />
        </div>
      </ParallaxContainer>
      
      {/* Layer 2 - Main Text Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div 
          style={{ 
            scale: textScale,
            opacity: textOpacity 
          }}
          className="text-center px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 gradient-text leading-tight"
          >
            EYETRIP
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-hypnotic-white mb-8 tracking-wider"
          >
            IMAGES
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-2xl md:text-3xl text-magenta/90 font-light mb-4 tracking-widest"
          >
            Worlds within Worlds
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-lg md:text-xl text-hypnotic-white/80 max-w-2xl mx-auto tracking-wide"
          >
            Art and Animation by David Aughenbaugh
          </motion.p>
        </motion.div>
      </div>
      
      {/* Layer 3 - Foreground Magenta Elements with fast parallax */}
      <ParallaxContainer speed={0.5} className="absolute inset-0 pointer-events-none z-5">
        <div className="h-[120vh] w-full relative">
          {/* Floating geometric shapes */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-magenta/30 rotate-45 rounded-lg"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2.5, delay: 1.2 }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-magenta/20 rounded-full blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 3, delay: 1.5 }}
            className="absolute top-1/2 right-1/4 w-1 h-40 bg-gradient-to-b from-magenta/50 to-transparent"
          />
        </div>
      </ParallaxContainer>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-hypnotic-white/60 text-sm tracking-widest mb-4">SCROLL</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-magenta to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}