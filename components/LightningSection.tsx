'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, Camera, Calendar, MapPin } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
import { getAssetPath } from '@/lib/assetPath'


const lightningImagesData = [
  {
    id: 'corkscrew-miss',
  src: getAssetPath('/uploads/2025/02/L0271c2_02_6k_02_2kq1.jpg'),
    title: 'Corkscrew Near Miss',
    description: 'A powerful lightning strike with unique spiral formation captured near Wilcox, Arizona.',
    location: 'Wilcox, Arizona',
    year: 2023
  },
  {
    id: 'triple-strike',
  src: getAssetPath('/uploads/2025/02/Cochise_lightning_4255_02.jpg'),
    title: 'Triple Lightning Strike',
    description: 'A powerful triple lightning strike near Wilcox, Arizona.',
    location: 'Wilcox, Arizona',
    year: 2023
  },
  {
    id: 'windmill-double',
  src: getAssetPath('/uploads/2025/02/Cochise_lightning_4272_03-scaled.jpg'),
    title: 'Double Strike at Windmill',
    description: 'A powerful double lightning strike near a windmill in Cochise, Arizona.',
    location: 'Cochise, Arizona',
    year: 2023
  },
  {
    id: 'serpentine-strike',
  src: getAssetPath('/uploads/2025/02/Cochise_lightning_4315_02.jpg'),
    title: 'Serpentine Strike',
    description: 'An interestingly shaped lightning strike near a windmill in Cochise, Arizona.',
    location: 'Cochise, Arizona',
    year: 2023
  },
  {
    id: 'kid-gloves',
  src: getAssetPath('/uploads/2025/02/Cochise_lightning_5213_03-scaled.jpg'),
    title: 'Kid Gloves',
    description: 'Let\'s not hurt the windmill - a delicate strike formation.',
    location: 'Cochise, Arizona',
    year: 2023
  },
  {
    id: 'elfrida-sunset',
  src: getAssetPath('/uploads/2025/02/Elfrida_sunset_5033_03_q3-scaled.jpg'),
    title: 'Purple Glow Over Tucson',
    description: 'Lightning casts an eerie purple glow, amid the warm illumination of Tucson.',
    location: 'Tucson, Arizona',
    year: 2023
  }
]

// Image paths are already processed with getAssetPath
const lightningImages = lightningImagesData

export default function LightningSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Simplified transforms for better performance
  const lightningOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  const openLightbox = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex)
    setLightboxOpen(true)
  }
  
  const closeLightbox = () => {
    setLightboxOpen(false)
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightningImages.length)
  }
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lightningImages.length) % lightningImages.length)
  }
  
  // Don't render scroll-dependent animations until mounted
  if (!mounted) {
    return (
      <section 
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-hypnotic-white"
      >
        {/* Static fallback during SSR */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-hypnotic-white via-deep-blue to-hypnotic-white opacity-60" />
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              <div className="mb-8">
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4">
                  <span className="block bg-gradient-to-r from-hypnotic-white via-magenta to-hypnotic-white bg-clip-text text-transparent leading-none">
                    LIGHTNING
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-hypnotic-white/80 font-light tracking-wide">
                  Arizona Storm Chasing Heritage
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
      className="relative min-h-screen overflow-hidden bg-hypnotic-white"
    >
      {/* Simplified Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hypnotic-white via-deep-blue/10 to-hypnotic-white" />

      {/* Subtle Lightning Flash Effect - Reduced frequency */}
      <motion.div 
        className="absolute inset-0 bg-hypnotic-white/20 pointer-events-none"
        animate={{ 
          opacity: [0, 0.1, 0, 0, 0.05, 0] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.div 
          style={{ opacity: lightningOpacity }}
          className="flex-1 flex items-center justify-center px-6"
          suppressHydrationWarning
        >
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <Zap className="w-16 h-16 mx-auto text-magenta mb-6" />
              <h2 className="text-6xl md:text-8xl font-bold mb-6">
                <span 
                  className="bg-gradient-to-r from-magenta via-hypnotic-white to-deep-blue bg-clip-text text-transparent"
                  style={{
                    WebkitTextStroke: '2px white',
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  LIGHTNING
                </span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-dark-grey leading-relaxed font-semibold">
                Lightning Photography
              </p>
              <p className="text-lg md:text-xl text-dark-grey/90 leading-relaxed">
                Three generations of Aughenbaugh's have been making pilgrimages to southern Arizona, 
                beginning when my father Byron started college in Tucson in 1956.
              </p>
              <p className="text-lg md:text-xl text-dark-grey/80 leading-relaxed">
                It is quite possible that by the time he died in 2023, Byron had the largest portfolio of 
                lightning photography in the world. I started going on these trips as a baby, 
                and it has been a joy for my son Daniel and I to carry on the tradition.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lightningImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative cursor-pointer opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openLightbox(index)}
                >
                  {/* Simplified Hover Effect */}
                  <div className="absolute -inset-2 rounded-lg bg-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-dark-grey border-2 border-dark-grey/20 shadow-lg">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125 group-hover:brightness-110"
                    />
                    
                    {/* Electric Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-grey/70 via-transparent to-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Lightning Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <div className="bg-magenta/90 backdrop-blur-sm rounded-full p-2">
                        <Zap className="w-5 h-5 text-hypnotic-white" />
                      </div>
                    </div>
                    
                    {/* Image Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-dark-grey/90 to-transparent">
                      <h3 className="text-hypnotic-white font-bold text-lg mb-2">
                        {image.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-hypnotic-white/80 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{image.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{image.year}</span>
                        </div>
                      </div>
                      <p className="text-hypnotic-white/90 text-sm leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Family Legacy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="py-20"
        >
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="bg-dark-grey/80 backdrop-blur-sm rounded-2xl p-12 border border-magenta/20">
              <h3 className="text-4xl font-bold text-magenta mb-8">
                A Family Tradition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-5xl font-bold text-hypnotic-white mb-2">1956</div>
                  <div className="text-hypnotic-white/70">First Arizona Trip</div>
                  <div className="text-sm text-hypnotic-white/60 mt-1">Byron Aughenbaugh</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-hypnotic-white mb-2">67</div>
                  <div className="text-hypnotic-white/70">Years of Tradition</div>
                  <div className="text-sm text-hypnotic-white/60 mt-1">3 Generations</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-hypnotic-white mb-2">2023</div>
                  <div className="text-hypnotic-white/70">Legacy Continues</div>
                  <div className="text-sm text-hypnotic-white/60 mt-1">David & Daniel</div>
                </div>
              </div>
              <p className="text-lg text-hypnotic-white/90 leading-relaxed">
                From father to son to grandson, the pursuit of capturing nature's most dramatic electrical displays 
                continues as both art and pilgrimage through the monsoon seasons of Arizona.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={lightningImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      {/* Minimal Lightning Particles - Reduced for Performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: 25 + (i * 20) + '%',
              top: 20 + (i * 15) + '%'
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          >
            <Zap className="w-5 h-5 text-magenta/30" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}