'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { getImagePath, getVideoPath } from '@/lib/assetPath'

export default function EyeTripVRSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Track scrolling state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])
  
  // Parallax movements for floating icons
  const icon1Y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const icon1X = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const icon1RotateRaw = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  const icon2Y = useTransform(scrollYProgress, [0, 1], [-80, 120])
  const icon2X = useTransform(scrollYProgress, [0, 1], [60, -40])
  const icon2RotateRaw = useTransform(scrollYProgress, [0, 1], [0, -360])
  
  const icon3Y = useTransform(scrollYProgress, [0, 1], [120, -80])
  const icon3X = useTransform(scrollYProgress, [0, 1], [-40, 60])
  const icon3RotateRaw = useTransform(scrollYProgress, [0, 1], [0, 270])
  
  const icon4Y = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const icon4X = useTransform(scrollYProgress, [0, 1], [40, -60])
  const icon4RotateRaw = useTransform(scrollYProgress, [0, 1], [0, -270])
  
  // Motion values for rotation that can be animated to 0
  const icon1Rotate = useMotionValue(0)
  const icon2Rotate = useMotionValue(0)
  const icon3Rotate = useMotionValue(0)
  const icon4Rotate = useMotionValue(0)
  
  // Update rotation based on scroll or return to upright
  useEffect(() => {
    if (isScrolling) {
      const unsubscribe1 = icon1RotateRaw.on('change', (v) => icon1Rotate.set(v))
      const unsubscribe2 = icon2RotateRaw.on('change', (v) => icon2Rotate.set(v))
      const unsubscribe3 = icon3RotateRaw.on('change', (v) => icon3Rotate.set(v))
      const unsubscribe4 = icon4RotateRaw.on('change', (v) => icon4Rotate.set(v))
      return () => {
        unsubscribe1()
        unsubscribe2()
        unsubscribe3()
        unsubscribe4()
      }
    } else {
      // Animate back to upright (0 degrees) with spring animation
      const spring = { type: 'spring', stiffness: 100, damping: 20 }
      icon1Rotate.set(0)
      icon2Rotate.set(0)
      icon3Rotate.set(0)
      icon4Rotate.set(0)
    }
  }, [isScrolling, icon1RotateRaw, icon2RotateRaw, icon3RotateRaw, icon4RotateRaw, icon1Rotate, icon2Rotate, icon3Rotate, icon4Rotate])
  
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  if (!mounted) {
    return (
      <section 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-deep-blue"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96">
            <Image
              src={getImagePath("eyetripvr-logo3.svg")}
              alt="EyeTripVR Logo"
              fill
              className="object-contain filter brightness-0 invert drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-deep-blue"
    >
      {/* Background Video - Same as 3D Section */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={getVideoPath("stumpy_rect_16_9_4ktest.mp4")} type="video/mp4" />
        </video>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-deep-blue/60" />
      </div>
      
      {/* Floating Icon - Blue (Top Left) */}
      <motion.div
        style={{ 
          y: icon1Y, 
          x: icon1X,
          rotate: icon1Rotate
        }}
        className="absolute top-[10%] left-[15%] z-10 w-20 h-20 md:w-32 md:h-32"
        animate={!isScrolling ? { rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        suppressHydrationWarning
      >
        <Image
          src={getImagePath("eyetripvr-iconb.svg")}
          alt="EyeTripVR Icon Blue"
          fill
          className="object-contain drop-shadow-[0_4px_12px_rgba(0,238,255,0.5)]"
        />
      </motion.div>
      
      {/* Floating Icon - Green (Top Right) */}
      <motion.div
        style={{ 
          y: icon2Y, 
          x: icon2X,
          rotate: icon2Rotate
        }}
        className="absolute top-[20%] right-[10%] z-10 w-24 h-24 md:w-36 md:h-36"
        animate={!isScrolling ? { rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        suppressHydrationWarning
      >
        <Image
          src={getImagePath("eyetripvr-icong.svg")}
          alt="EyeTripVR Icon Green"
          fill
          className="object-contain drop-shadow-[0_4px_12px_rgba(0,255,136,0.5)]"
        />
      </motion.div>
      
      {/* Floating Icon - Purple (Bottom Left) */}
      <motion.div
        style={{ 
          y: icon3Y, 
          x: icon3X,
          rotate: icon3Rotate
        }}
        className="absolute bottom-[15%] left-[10%] z-10 w-28 h-28 md:w-40 md:h-40"
        animate={!isScrolling ? { rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        suppressHydrationWarning
      >
        <Image
          src={getImagePath("eyetripvr-iconp.svg")}
          alt="EyeTripVR Icon Purple"
          fill
          className="object-contain drop-shadow-[0_4px_12px_rgba(205,0,255,0.5)]"
        />
      </motion.div>
      
      {/* Floating Icon - Yellow (Bottom Right) */}
      <motion.div
        style={{ 
          y: icon4Y, 
          x: icon4X,
          rotate: icon4Rotate
        }}
        className="absolute bottom-[20%] right-[15%] z-10 w-20 h-20 md:w-32 md:h-32"
        animate={!isScrolling ? { rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        suppressHydrationWarning
      >
        <Image
          src={getImagePath("eyetripvr-icony.svg")}
          alt="EyeTripVR Icon Yellow"
          fill
          className="object-contain drop-shadow-[0_4px_12px_rgba(255,234,0,0.5)]"
        />
      </motion.div>
      
      {/* Center Logo */}
      <motion.div 
        style={{ 
          scale: logoScale,
          opacity: logoOpacity
        }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        suppressHydrationWarning
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem]">
          <Image
            src={getImagePath("eyetripvr-logo3.svg")}
            alt="EyeTripVR Logo"
            fill
            className="object-contain filter brightness-0 invert drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
            priority
          />
        </div>
      </motion.div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-deep-blue/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-deep-blue/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,238,255,0.05),transparent_70%)]" />
      </div>
      
      {/* Call to Action Button */}
      <motion.div 
        style={{ opacity: logoOpacity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30"
        suppressHydrationWarning
      >
        <motion.a
          href="https://eyetripvr.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-electric-blue via-neon-green to-magenta rounded-full text-deep-blue font-bold text-lg shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300"
        >
          <span>Experience EyeTripVR</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  )
}
