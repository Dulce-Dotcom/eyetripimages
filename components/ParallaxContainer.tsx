'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  speed: number
}

export default function ParallaxContainer({ 
  children, 
  className = '', 
  speed 
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Transform the scroll progress into a Y translation
  // Negative speed creates slower movement (background effect)
  // Positive speed creates faster movement (foreground effect)
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}