'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoGallery from './VideoGallery'
import ParallaxContainer from './ParallaxContainer'

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : ''
}

// Helper function to get YouTube thumbnail with fallback
const getYouTubeThumbnail = (videoId: string): string => {
  // Use hqdefault.jpg which is more reliable than maxresdefault.jpg
  // Could also fallback to: mqdefault.jpg (320x180) or default.jpg (120x90)
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const animationVideos = [
  {
    id: '4NkV3ScBIkE',
    src: 'https://www.youtube.com/watch?v=4NkV3ScBIkE',
    title: 'EyeTrip Images Video 1',
    description: 'David\'s latest animation work showcasing immersive digital art experiences.',
    thumbnail: getYouTubeThumbnail('4NkV3ScBIkE'),
    isYouTube: true,
    isVR: false
  },
  {
    id: 'HP7PfdBBQbs',
    src: 'https://www.youtube.com/watch?v=HP7PfdBBQbs',
    title: 'EyeTrip Images Video 2',
    description: 'Exploring the intersection of technology and artistic expression.',
    thumbnail: getYouTubeThumbnail('HP7PfdBBQbs'),
    isYouTube: true,
    isVR: false
  },
  {
    id: 'MgHV5QwewSU',
    src: 'https://www.youtube.com/watch?v=MgHV5QwewSU',
    title: 'EyeTrip Images Video 3',
    description: 'Immersive digital art that transforms perception and consciousness.',
    thumbnail: getYouTubeThumbnail('MgHV5QwewSU'),
    isYouTube: true,
    isVR: false
  },
  {
    id: 'YNfWPdRHRJQ',
    src: 'https://www.youtube.com/watch?v=YNfWPdRHRJQ',
    title: 'EyeTrip Images Video 4',
    description: 'Journey through consciousness-expanding visual experiences.',
    thumbnail: getYouTubeThumbnail('YNfWPdRHRJQ'),
    isYouTube: true,
    isVR: false
  },
  {
    id: 'Sqi6uv_6xF4',
    src: 'https://www.youtube.com/watch?v=Sqi6uv_6xF4',
    title: 'EyeTrip Images Video 5',
    description: 'Neuroaesthetic art designed to stimulate wonder and awe.',
    thumbnail: getYouTubeThumbnail('Sqi6uv_6xF4'),
    isYouTube: true,
    isVR: false
  },
  {
    id: 'JVpk01w-1-M',
    src: 'https://www.youtube.com/watch?v=JVpk01w-1-M',
    title: 'EyeTrip Images Video 6',
    description: 'Digital art installation showcasing the power of immersive media.',
    thumbnail: getYouTubeThumbnail('JVpk01w-1-M'),
    isYouTube: true,
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
        className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-deep-blue to-hypnotic-white"
      >
        {/* Static fallback during SSR */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="block bg-gradient-to-r from-magenta via-hypnotic-white to-magenta bg-clip-text text-transparent">
                ANIMATION
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-dark-grey/80 mb-8 leading-relaxed">
              "To animate is to bring life to the lifeless, to give soul to the soulless."
            </p>
            <p className="text-lg md:text-xl text-dark-grey/60 leading-relaxed max-w-3xl mx-auto">
              Each frame is meticulously crafted to create immersive experiences that transcend 
              traditional boundaries between digital art and consciousness exploration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <VideoGallery videos={animationVideos} />
            
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-dark-grey mb-6">
                Philosophy of Motion
              </h3>
              <div className="space-y-4 text-dark-grey/70">
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
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-deep-blue to-hypnotic-white"
    >
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
          <div className="bg-hypnotic-white/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-magenta/20">
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
          <p className="text-lg md:text-xl text-dark-grey/80 max-w-4xl mx-auto leading-relaxed">
            There are few artists working directly in this space. <strong className="text-dark-grey">Brian Eno</strong> is a pioneer and 
            continuing inspiration. <strong className="text-dark-grey">Laurie Anderson</strong> is another. The best film makers 
            utilize this function intentionally, with <strong className="text-dark-grey">Stanley Kubrick</strong> and{' '}
            <strong className="text-dark-grey">Christopher Nolan</strong> being good examples.
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