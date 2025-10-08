'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import ParallaxContainer from './ParallaxContainer'

const heroImages = [
  '/eyetripimages/uploads/2025/02/0421c2GaGv4kq8-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Lava_7444_10_H02_6k_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Foam_5625_9k_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Skylight_7836_02_9k_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Water_7142_03_14k_crop01_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Vortex_9796_03_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/StoneChromism_6128_4k_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Mastamho_7444_12_6k_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/WonkaMeadow_6306_04_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/PileusMax_7409_03_5k_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/mycososm_7563_06_6k_q3b-scaled.jpg',
  '/eyetripimages/uploads/2025/02/DarkAllDay_8314_03_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Elfrida_sunset_5033_03_q3-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Cochise_lightning_4272_03-scaled.jpg',
  '/eyetripimages/uploads/2025/02/Crush_5625_03_q3-scaled.jpg'
]

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  
  useEffect(() => {
    console.log(`🚀 Starting hero slider with ${heroImages.length} images`)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % heroImages.length
        console.log(`→ Image ${prev} to ${next}`)
        return next
      })
    }, 20000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])
  
  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <ParallaxContainer speed={-0.2} className="absolute inset-0">
        <div className="h-[120vh] w-full bg-gradient-to-br from-dark-grey via-dark-grey to-dark-grey">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
              style={{ 
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-b from-hypnotic-white/20 via-transparent to-dark-grey/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(205,0,255,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,248,255,0.05),transparent_50%)]" />
        </div>
      </ParallaxContainer>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto px-8"
          style={{
            scale: textScale,
            opacity: textOpacity,
          }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-6xl md:text-8xl font-extralight text-hypnotic-white mb-6 leading-tight"
          >
            EYETRIP IMAGES
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl font-light text-hypnotic-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Immersive visual experiences that transform perception and expand consciousness through the intersection of art, technology, and human wonder.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="px-8 py-4 border-2 border-hypnotic-white text-hypnotic-white hover:bg-hypnotic-white hover:text-dark-grey transition-all duration-300 font-medium tracking-wide">
              EXPLORE PORTFOLIO
            </button>
            <button className="px-8 py-4 bg-magenta text-hypnotic-white hover:bg-magenta/80 transition-all duration-300 font-medium tracking-wide">
              WATCH EXPERIENCE
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20"
      >
        <button
          onClick={() => setCurrentImageIndex((prev) => prev === 0 ? heroImages.length - 1 : prev - 1)}
          className="p-3 bg-hypnotic-white/10 backdrop-blur-sm rounded-full border border-hypnotic-white/20 hover:bg-hypnotic-white/20 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-hypnotic-white group-hover:text-magenta transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20"
      >
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
          className="p-3 bg-hypnotic-white/10 backdrop-blur-sm rounded-full border border-hypnotic-white/20 hover:bg-hypnotic-white/20 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-hypnotic-white group-hover:text-magenta transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="px-4 py-2 bg-hypnotic-white/10 backdrop-blur-sm rounded-full border border-hypnotic-white/20">
          <span className="text-hypnotic-white text-sm font-light">
            {currentImageIndex + 1} / {heroImages.length}
          </span>
        </div>
      </motion.div>
    </section>
  )
}
