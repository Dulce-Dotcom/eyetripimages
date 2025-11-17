'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getImagePath } from '@/lib/assetPath'

export default function EyeTripVRSidebar() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isInSection, setIsInSection] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const immersive3DSectionRef = useRef<HTMLElement | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const prefersReducedMotion = useReducedMotion()
  
  // Prevent hydration errors by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Detect if mobile device (runs only on client)
  useEffect(() => {
    if (!mounted) return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mounted])

  useEffect(() => {
    // Find the Immersive3D section by looking for the element with specific content
    const findImmersive3DSection = () => {
      const sections = Array.from(document.querySelectorAll('section'))
      for (const section of sections) {
        if (section.textContent?.includes('NEUROAESTHETICS')) {
          return section
        }
      }
      return null
    }

    immersive3DSectionRef.current = findImmersive3DSection()

    // Debounced scroll handler for better mobile performance
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (!immersive3DSectionRef.current) return

        const section = immersive3DSectionRef.current
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Check if Immersive3D section is in viewport
        const inSection = rect.top <= windowHeight && rect.bottom >= 0
        setIsInSection(inSection)

        // Show sidebar when in section and not dismissed
        if (inSection && !isDismissed) {
          setIsVisible(true)
        } else if (!inSection) {
          setIsVisible(false)
        }
      }, isMobile ? 150 : 50) // Longer debounce on mobile
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isDismissed, isMobile, mounted])

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return null
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleOpen = () => {
    setIsDismissed(false)
    setIsVisible(true)
  }

  return (
    <>
      {/* Arrow Tab - Always visible when in section */}
      <AnimatePresence>
        {isInSection && isDismissed && (
          <motion.button
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 100, 
              damping: 20 
            }}
            onClick={handleOpen}
            className="fixed right-0 top-[25%] -translate-y-1/2 z-50 bg-gradient-to-l from-magenta to-magenta/80 p-2 pr-1 rounded-l-lg shadow-lg md:shadow-2xl hover:pr-2 transition-all duration-300 cursor-pointer group"
            style={{
              boxShadow: isMobile ? '-3px 0 10px rgba(205, 0, 255, 0.3)' : '-5px 0 20px rgba(205, 0, 255, 0.5)'
            }}
            aria-label="Open EyeTripVR sidebar"
          >
            <div className="flex items-center gap-1">
              <span className="text-hypnotic-white text-xs font-bold whitespace-nowrap transition-opacity duration-300">
                VR
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-hypnotic-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 20,
            duration: 0.5 
          }}
          className="fixed right-0 top-[25%] -translate-y-1/2 z-50 bg-gradient-to-l from-deep-blue via-dark-grey to-deep-blue/95 md:backdrop-blur-sm shadow-xl md:shadow-2xl rounded-l-2xl border-l-4 border-magenta"
          style={{
            boxShadow: isMobile ? '-5px 0 20px rgba(205, 0, 255, 0.2)' : '-10px 0 40px rgba(205, 0, 255, 0.3)'
          }}
        >
          <div className="relative p-8 pr-6 w-[380px] md:w-[420px]">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-hypnotic-white/60 hover:text-hypnotic-white transition-colors duration-200 p-1 z-10"
              aria-label="Close sidebar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center space-y-6 pt-8">
              {/* Logo with Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-40 h-40 md:w-48 md:h-48 relative"
              >
                <motion.img
                  src={getImagePath("eyetripimagesvr-tall.svg")}
                  alt="EyeTripVR Logo"
                  className="w-full h-full object-contain brightness-0 invert md:drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                  animate={!prefersReducedMotion && !isMobile ? { 
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Main Headline Banner */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-3 relative"
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-magenta via-hypnotic-white to-magenta leading-tight"
                  animate={!prefersReducedMotion && !isMobile ? { 
                    backgroundPosition: ['0%', '100%', '0%'],
                  } : {}}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% auto',
                    textShadow: isMobile ? 'none' : '0 0 20px rgba(205, 0, 255, 0.5)'
                  }}
                >
                  STEP INSIDE THE ARTWORKS
                </motion.h3>
                <p className="text-base md:text-lg text-hypnotic-white/90 leading-relaxed font-medium">
                  Experience award-winning infinite zoom animations in immersive VR
                </p>
              </motion.div>

              {/* Primary CTA Button */}
              <motion.a
                href="https://eyetripvr.com/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-2 w-full px-8 py-4 bg-gradient-to-r from-magenta to-hypnotic-white text-deep-blue text-lg font-bold rounded-full hover:shadow-[0_0_30px_rgba(205,0,255,0.9)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                whileTap={isMobile ? { scale: 0.95 } : {}}
              >
                Enter VR Experience
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </motion.a>

              {/* Secondary Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-sm text-hypnotic-white/60 italic"
              >
                Best experienced with VR headset
              </motion.p>
            </div>

            {/* Decorative glow - Simplified on mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-transparent to-transparent rounded-l-2xl pointer-events-none" />
            {!isMobile && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-transparent to-transparent rounded-l-2xl pointer-events-none"
                animate={!prefersReducedMotion ? { 
                  opacity: [0.3, 0.6, 0.3],
                } : {}}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
