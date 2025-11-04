'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getImagePath } from '@/lib/assetPath'

export default function EyeTripVRSidebar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isInSection, setIsInSection] = useState(false)
  const immersive3DSectionRef = useRef<HTMLElement | null>(null)

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

    const handleScroll = () => {
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
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDismissed])

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
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-l from-magenta to-magenta/80 p-2 pr-1 rounded-l-lg shadow-2xl hover:pr-2 transition-all duration-300 cursor-pointer group"
            style={{
              boxShadow: '-5px 0 20px rgba(205, 0, 255, 0.5)'
            }}
            aria-label="Open EyeTripVR sidebar"
          >
            <div className="flex items-center gap-1">
              <span className="text-hypnotic-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-l from-deep-blue via-dark-grey to-deep-blue/95 backdrop-blur-sm shadow-2xl rounded-l-2xl border-l-4 border-magenta"
          style={{
            boxShadow: '-10px 0 40px rgba(205, 0, 255, 0.3)'
          }}
        >
          <div className="relative p-6 pr-4 max-w-xs">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-hypnotic-white/60 hover:text-hypnotic-white transition-colors duration-200 p-1"
              aria-label="Close sidebar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
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
            <div className="flex flex-col items-center text-center space-y-4 pt-6">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-32 h-32 relative"
              >
                <img
                  src={getImagePath("eyetripvr-logo2.svg")}
                  alt="EyeTripVR Logo"
                  className="w-full h-full object-contain brightness-0 invert drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-bold text-hypnotic-white">
                  Experience VR
                </h3>
                <p className="text-sm text-hypnotic-white/70 leading-relaxed">
                  Explore immersive virtual reality experiences
                </p>
              </motion.div>

              {/* Button */}
              <motion.a
                href="https://eyetripvr.com/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-magenta to-hypnotic-white text-deep-blue font-bold rounded-full hover:shadow-[0_0_20px_rgba(205,0,255,0.8)] transition-all duration-300 transform hover:scale-105"
              >
                Visit EyeTripVR
              </motion.a>
            </div>

            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-transparent to-transparent rounded-l-2xl pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
