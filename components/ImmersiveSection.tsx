'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Eye, Globe, Monitor, X, Play } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/assetPath'

export default function ImmersiveSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoLightbox, setVideoLightbox] = useState<string | null>(null)
  const [vrVideoLoaded, setVrVideoLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 bg-gradient-to-b from-deep-blue via-dark-grey to-deep-blue"
      data-section="immersive"
      id="immersive"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/uploads/2025/02/Foam_5625_9k_q3-scaled.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/80 via-transparent to-deep-blue/80" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Immersive
          </h2>
          <p className="text-xl md:text-2xl text-hypnotic-white/90 max-w-4xl mx-auto leading-relaxed">
            Immersive experience is a natural fit for what I am doing. I have created versions of my animation as 360º fully immersive environments, cylindrical displays, and rectangular theatrical experiences.
          </p>
        </motion.div>

        {/* VR Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 bg-hypnotic-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-hypnotic-white/10"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 rounded-full bg-gradient-to-r from-electric-blue to-neon-green">
              <Eye size={40} className="text-hypnotic-white" />
            </div>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-6 text-hypnotic-white">
            VR Experience
          </h3>
          
          <div className="text-center mb-8">
            <p className="text-2xl md:text-3xl font-bold text-electric-blue mb-4">
              The Future!
            </p>
            <p className="text-lg text-hypnotic-white/80 max-w-3xl mx-auto mb-8">
              If you happen to have goggles, you can get the VR experience here. Phones also work if you have the YouTube app.
            </p>
            <p className="text-sm text-hypnotic-white/60 italic max-w-2xl mx-auto">
              View with VR goggles, or with a phone: Click + drag for a full 360° view, or orient your phone to look around (YouTube app required)
            </p>
          </div>

          {/* YouTube VR Video Embed Placeholder */}
          <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-deep-blue/50">
            {!vrVideoLoaded ? (
              <div 
                className="w-full h-full flex items-center justify-center cursor-pointer group"
                onClick={() => setVrVideoLoaded(true)}
              >
                <div className="text-center">
                  <div className="bg-electric-blue/80 group-hover:bg-electric-blue rounded-full p-6 inline-flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-4">
                    <Play size={48} className="text-white" fill="white" />
                  </div>
                  <p className="text-hypnotic-white text-lg font-semibold">Click to Load VR Video</p>
                </div>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Sqi6uv_6xF4"
                title="EyeTrip Images Video 5 - 360° VR Experience"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            )}
          </div>
        </motion.div>

        {/* Installations Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <div className="flex items-center justify-center mb-12">
            <div className="p-4 rounded-full bg-gradient-to-r from-magenta to-electric-blue">
              <Globe size={40} className="text-hypnotic-white" />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-hypnotic-white">
            Installations
          </h3>
          
          <p className="text-xl text-hypnotic-white/90 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
            A limitation with VR goggles is that only one person can experience it at a time, so I started experimenting with custom screens and projection installations.
          </p>

          {/* Installation Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* San Francisco Installation */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-hypnotic-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-hypnotic-white/10 hover:border-electric-blue/30 transition-all duration-300 cursor-pointer"
              onClick={() => setVideoLightbox('HP7PfdBBQbs')}
            >
              {/* Image */}
              <div className="relative w-full h-64 bg-deep-blue/50 group">
                <Image
                  src={getImagePath('GAshow2_thumb5.jpg')}
                  alt="San Francisco Installation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-electric-blue/80 group-hover:bg-electric-blue rounded-full p-4 group-hover:scale-110 transition-all duration-300">
                    <Play size={32} className="text-white" fill="white" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Monitor size={24} className="text-electric-blue mr-3" />
                  <h4 className="text-xl font-bold text-hypnotic-white">
                    San Francisco, California
                  </h4>
                </div>
                <p className="text-hypnotic-white/80 mb-4">
                  360º wrap-around projection screen installation
                </p>
                <p className="text-hypnotic-white/70 text-sm mb-2">
                  This was a temporary installation, created during my residency with the Gray Area Arts and Technology Incubator Program in 2023.
                </p>
                <p className="text-hypnotic-white/60 text-sm italic">
                  Created as a proof-of-concept for the use of custom projection screens for this purpose.
                </p>
              </div>
            </motion.div>

            {/* Escondido Installation */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-hypnotic-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-hypnotic-white/10 hover:border-neon-green/30 transition-all duration-300 cursor-pointer"
              onClick={() => setVideoLightbox('sgsqatF1MvE')}
            >
              {/* Image */}
              <div className="relative w-full h-64 bg-deep-blue/50 group">
                <Image
                  src={getImagePath('IMG_6905_02hi.jpg')}
                  alt="Escondido Installation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-neon-green/80 group-hover:bg-neon-green rounded-full p-4 group-hover:scale-110 transition-all duration-300">
                    <Play size={32} className="text-white" fill="white" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Monitor size={24} className="text-neon-green mr-3" />
                  <h4 className="text-xl font-bold text-hypnotic-white">
                    Escondido, California
                  </h4>
                </div>
                <p className="text-hypnotic-white/80 mb-4">
                  360º wrap-around projection screen installation
                </p>
                <p className="text-hypnotic-white/70 text-sm mb-2">
                  This is a permanent installation, funded through a major grant from the Escondido Community Foundation. It is in a public space in the North County Mall, allowing people to discover it spontaneously.
                </p>
                <p className="text-hypnotic-white/60 text-sm italic">
                  Viewers can spend as much time as they choose experiencing the exhibit.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Circular Screen Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-electric-blue/10 to-neon-green/10 backdrop-blur-sm rounded-2xl p-8 border border-hypnotic-white/10"
          >
            <p className="text-lg text-hypnotic-white/90 leading-relaxed mb-6">
              I created the{' '}
              <a 
                href="https://youtu.be/HP7PfdBBQbs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-electric-blue hover:text-neon-green transition-colors underline"
              >
                circular screen
              </a>
              {' '}as a way to allow many people to experience an immersive version of the animation. A fully spherical environment would be possible, since the animation exists for that, but the cylindrical screen design is more accessible.
            </p>
            <p className="text-lg text-hypnotic-white/90 leading-relaxed">
              As it turns out, the overhead circular screen allows viewers to spend time focused on the experience if they choose, or simply pass through. The piece can exist in a high traffic area. Rather than needing to be sectioned off with controlled access, it is freely available.
            </p>
          </motion.div>
        </motion.div>

        {/* Visual Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-electric-blue via-neon-green to-magenta">
            <div className="bg-deep-blue rounded-full px-8 py-4">
              <p className="text-hypnotic-white font-medium">
                Experience art in new dimensions
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {videoLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setVideoLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setVideoLightbox(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300"
              >
                <X size={24} />
              </button>

              {/* YouTube Embed */}
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoLightbox}?autoplay=1`}
                title="Installation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
