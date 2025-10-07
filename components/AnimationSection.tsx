'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoGallery from './VideoGallery'
import ParallaxContainer from './ParallaxContainer'

const animationVideos = [
  {
    id: 'worlds-within-worlds',
    src: 'data:video/mp4;base64,', // Placeholder for development
    title: 'Worlds within Worlds',
    description: 'A snippet from the new animation for art installation at the North County Mall in Escondido, California.',
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="worlds"><stop offset="0%" style="stop-color:#cd00ff;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#worlds)"/><circle cx="400" cy="225" r="150" fill="rgba(240,248,255,0.3)"/><circle cx="400" cy="225" r="100" fill="rgba(205,0,255,0.4)"/><circle cx="400" cy="225" r="50" fill="rgba(240,248,255,0.6)"/><text x="400" y="350" text-anchor="middle" fill="rgba(240,248,255,0.8)" font-size="24" font-family="Arial">WORLDS WITHIN WORLDS</text></svg>`),
    isVR: false
  },
  {
    id: 'gray-area-360',
    src: 'data:video/mp4;base64,', // Placeholder for development
    title: '360° Gray Area Installation',
    description: '360° wrap-around animation projected onto a continuous surface during a show at Gray Area in San Francisco.',
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gray360" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="50%" style="stop-color:#cd00ff;stop-opacity:0.5" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#gray360)"/><circle cx="400" cy="225" r="200" fill="none" stroke="rgba(240,248,255,0.6)" stroke-width="3"/><circle cx="400" cy="225" r="150" fill="none" stroke="rgba(205,0,255,0.4)" stroke-width="2"/><circle cx="400" cy="225" r="100" fill="none" stroke="rgba(240,248,255,0.3)" stroke-width="2"/><text x="400" y="380" text-anchor="middle" fill="rgba(240,248,255,0.8)" font-size="20" font-family="Arial">360° GRAY AREA</text></svg>`),
    isVR: true
  },
  {
    id: 'infinite-zoom',
    src: 'data:video/mp4;base64,', // Placeholder for development
    title: 'Infinite Zoom Experience',
    description: 'An infinite zoom experience that quiets the thinking mind and stimulates creative imagination.',
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="zoom"><stop offset="0%" style="stop-color:#F0F8FF;stop-opacity:0.8" /><stop offset="30%" style="stop-color:#cd00ff;stop-opacity:0.6" /><stop offset="70%" style="stop-color:#1B2A41;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#000000;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#zoom)"/><rect x="300" y="175" width="200" height="100" fill="rgba(240,248,255,0.2)"/><rect x="350" y="200" width="100" height="50" fill="rgba(205,0,255,0.3)"/><rect x="375" y="212" width="50" height="26" fill="rgba(240,248,255,0.4)"/><text x="400" y="380" text-anchor="middle" fill="rgba(240,248,255,0.8)" font-size="20" font-family="Arial">INFINITE ZOOM</text></svg>`),
    isVR: true
  },
  {
    id: 'matrix-fountain',
    src: 'data:video/mp4;base64,', // Placeholder for development
    title: 'Matrix Fountain Flyover',
    description: 'A flyover of the digital painting "Matrix Fountain" with immersive audio.',
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="matrix" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="50%" style="stop-color:#cd00ff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:#1B2A41;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#matrix)"/><path d="M400,50 L350,150 L450,150 Z" fill="rgba(240,248,255,0.3)"/><path d="M400,150 L300,250 L500,250 Z" fill="rgba(205,0,255,0.2)"/><path d="M400,250 L250,350 L550,350 Z" fill="rgba(240,248,255,0.1)"/><text x="400" y="400" text-anchor="middle" fill="rgba(240,248,255,0.8)" font-size="20" font-family="Arial">MATRIX FOUNTAIN</text></svg>`),
    isVR: false
  }
]

export default function AnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  
  // Don't render scroll-dependent animations until mounted
  if (!mounted) {
    return (
      <section 
        ref={containerRef}
        className="relative min-h-screen py-20 overflow-hidden"
      >
        {/* Static fallback during SSR */}
        <div className="h-full w-full bg-gradient-to-br from-deep-blue via-dark-grey to-deep-blue">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(205,0,255,0.1),transparent_70%)]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="block bg-gradient-to-r from-magenta via-hypnotic-white to-magenta bg-clip-text text-transparent">
                ANIMATION
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-hypnotic-white/80 mb-8 leading-relaxed">
              "To animate is to bring life to the lifeless, to give soul to the soulless."
            </p>
            <p className="text-lg md:text-xl text-hypnotic-white/60 leading-relaxed max-w-3xl mx-auto">
              Each frame is meticulously crafted to create immersive experiences that transcend 
              traditional boundaries between digital art and consciousness exploration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <VideoGallery videos={animationVideos} />
            
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-hypnotic-white mb-6">
                Philosophy of Motion
              </h3>
              <div className="space-y-4 text-hypnotic-white/70">
                <p className="leading-relaxed">
                  Animation serves as a bridge between the conscious and unconscious mind, 
                  creating visual narratives that speak directly to our neural pathways.
                </p>
                <p className="leading-relaxed">
                  Through carefully orchestrated movement and color, each piece invites viewers 
                  into altered states of perception, encouraging deeper introspection and wonder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Animated Background */}
      <ParallaxContainer speed={-0.3} className="absolute inset-0">
        <motion.div 
          style={{ y: backgroundY }}
          className="h-[120vh] w-full bg-gradient-to-br from-dark-grey via-deep-blue to-dark-grey"
          suppressHydrationWarning
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(205,0,255,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(240,248,255,0.05),transparent_50%)]" />
        </motion.div>
      </ParallaxContainer>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-16"
          suppressHydrationWarning
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold gradient-text mb-6"
          >
            ANIMATION
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-hypnotic-white/90 mb-6 leading-relaxed">
              I create these animations digitally, using years of practical experience as a visual effects artist in the film industry.
            </p>
            <p className="text-lg md:text-xl text-hypnotic-white/80 leading-relaxed">
              My interest in human consciousness and trance states led me to study hypnotherapy. Combining these interests, 
              my work is focused on how visuals and sound can be used intentionally to affect the viewer's mental state.
            </p>
          </motion.div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-magenta/20">
            <blockquote className="text-2xl md:text-3xl text-hypnotic-white font-light italic mb-6">
              "The Surrealists said that art functions automatically on a subconscious level."
            </blockquote>
            <p className="text-lg md:text-xl text-hypnotic-white/80 max-w-3xl mx-auto leading-relaxed">
              <em>Worlds within Worlds</em> is an experiment in how to maximize this effect. It avoids narrative and 
              literal "meaning" but instead uses evocative imagery and a flow experience to quiet the thinking mind 
              and stimulate creative imagination in the viewer.
            </p>
          </div>
        </motion.div>

        {/* Video Gallery */}
        <VideoGallery videos={animationVideos} />

        {/* Artist Inspiration */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-semibold text-magenta mb-6">
            Artistic Influences
          </h3>
          <p className="text-lg md:text-xl text-hypnotic-white/80 max-w-4xl mx-auto leading-relaxed">
            There are few artists working directly in this space. <strong className="text-hypnotic-white">Brian Eno</strong> is a pioneer and 
            continuing inspiration. <strong className="text-hypnotic-white">Laurie Anderson</strong> is another. The best film makers 
            utilize this function intentionally, with <strong className="text-hypnotic-white">Stanley Kubrick</strong> and{' '}
            <strong className="text-hypnotic-white">Christopher Nolan</strong> being good examples.
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 0.3, 0],
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              rotate: 360
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-2 h-2 bg-magenta/40 rounded-full blur-sm"
          />
        ))}
      </div>
    </section>
  )
}