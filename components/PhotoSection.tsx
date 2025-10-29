'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Camera, Eye, Palette } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
import ParallaxContainer from './ParallaxContainer'
import { getAssetPath } from '@/lib/assetPath'


const photographyImagesData = [
  {
    id: 'crush-texture',
  src: getAssetPath('/uploads/2025/02/Crush_5625_03_q3-scaled.jpg'),
    title: 'Crush #5625',
    description: 'Abstract textural study emphasizing form over content.',
    category: 'Abstract'
  },
  {
    id: 'elfrida-sunset',
  src: getAssetPath('/uploads/2025/02/Elfrida_sunset_5033_03_q3-scaled.jpg'),
    title: 'Elfrida Sunset',
    description: 'Golden hour capturing the subtle interplay of light and landscape.',
    category: 'Landscape'
  },
  {
    id: 'foam-study-1',
  src: getAssetPath('/uploads/2025/02/Foam_5590_03_q3-scaled.jpg'),
    title: 'Foam Study I',
    description: 'Organic patterns in ocean foam revealing natural abstractions.',
    category: 'Abstract'
  },
  {
    id: 'foam-study-2',
  src: getAssetPath('/uploads/2025/02/Foam_5599_06g_q3-scaled.jpg'),
    title: 'Foam Study II',
    description: 'Continued exploration of texture and form in natural patterns.',
    category: 'Abstract'
  },
  {
    id: 'foam-study-3',
  src: getAssetPath('/uploads/2025/02/Foam_5625_9k_q3-scaled.jpg'),
    title: 'Foam Study III',
    description: 'Complex geometries emerging from simple natural processes.',
    category: 'Abstract'
  },
  {
    id: 'foam-study-4',
  src: getAssetPath('/uploads/2025/02/Foam_5662_c4_q3-scaled.jpg'),
    title: 'Foam Study IV',
    description: 'Delicate balance between chaos and order in natural patterns.',
    category: 'Abstract'
  },
  {
    id: 'architectural-forms',
  src: getAssetPath('/uploads/2025/02/I1A1575_02-scaled.jpg'),
    title: 'Architectural Forms',
    description: 'Geometric abstractions found in built environments.',
    category: 'Architecture'
  },
  {
    id: 'lava-texture',
  src: getAssetPath('/uploads/2025/02/Lava_7444_10_H02_6k_q3-scaled.jpg'),
    title: 'Volcanic Texture',
    description: 'The raw power of geological formation captured in detail.',
    category: 'Nature'
  },
  {
    id: 'stone-chromism',
  src: getAssetPath('/uploads/2025/02/StoneChromism_6128_4k_q3-scaled.jpg'),
    title: 'Stone Chromism',
    description: 'Natural color variations revealing geological history.',
    category: 'Abstract'
  },
  {
    id: 'wonka-meadow',
  src: getAssetPath('/uploads/2025/02/WonkaMeadow_6306_04_q3-scaled.jpg'),
    title: 'Wonka Meadow',
    description: 'Whimsical landscape transforming perception of natural forms.',
    category: 'Landscape'
  },
  {
    id: 'vortex-motion',
  src: getAssetPath('/uploads/2025/02/Vortex_9796_03_q3-scaled.jpg'),
    title: 'Vortex Motion',
    description: 'Dynamic energy patterns captured in natural movement.',
    category: 'Abstract'
  },
  {
    id: 'water-symphony',
  src: getAssetPath('/uploads/2025/02/Water_7142_03_14k_crop01_q3-scaled.jpg'),
    title: 'Water Symphony',
    description: 'Fluid dynamics creating abstract compositions.',
    category: 'Nature'
  }
]

// Image paths are already processed with getAssetPath
const photographyImages = photographyImagesData

const categories = ['All', 'Abstract', 'Landscape', 'Architecture', 'Nature']

export default function PhotoSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
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
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const filteredImages = selectedCategory === 'All' 
    ? photographyImages 
    : photographyImages.filter(img => img.category === selectedCategory)
  
  const openLightbox = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex)
    setLightboxOpen(true)
  }
  
  const closeLightbox = () => {
    setLightboxOpen(false)
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-deep-blue to-dark-grey overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="text-center mb-16"
          suppressHydrationWarning
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Camera className="w-12 h-12 mx-auto text-magenta mb-4" />
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              PHOTOGRAPHY
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-hypnotic-white/90 max-w-4xl mx-auto leading-relaxed mb-6"
          >
            Being raised in a home where every vacation centered on photography, and slide-show critique sessions 
            were a daily part of life, I grew up with a camera in my hand.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-hypnotic-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            I am particularly fond of images that verge on abstract, where shape and texture take center stage.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-magenta text-hypnotic-white border-magenta shadow-lg shadow-magenta/20' 
                  : 'bg-transparent text-hypnotic-white border-hypnotic-white/30 hover:border-magenta hover:text-magenta hover:shadow-md hover:shadow-magenta/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Photography Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square bg-dark-grey">
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  whileHover={{ 
                    scale: 1.1,
                    filter: "contrast(1.1) brightness(1.1)"
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                
                {/* Sophisticated Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-transparent to-deep-blue/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                
                {/* Geometric Frame Animation */}
                <motion.div
                  className="absolute inset-4 border-2 border-magenta/0 group-hover:border-magenta/60 rounded"
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                
                {/* Category Badge */}
                <motion.div 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: -10 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-hypnotic-white/70 backdrop-blur-sm rounded-full px-3 py-1 border border-magenta/30">
                    <span className="text-magenta text-xs font-semibold">{image.category}</span>
                  </div>
                </motion.div>
                
                {/* View Icon */}
                <motion.div 
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-magenta/90 backdrop-blur-sm rounded-full p-2">
                    <Eye className="w-5 h-5 text-hypnotic-white" />
                  </div>
                </motion.div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-hypnotic-white/90 to-transparent">
                  <h3 className="text-hypnotic-white font-bold text-lg mb-2">
                    {image.title}
                  </h3>
                  <p className="text-hypnotic-white/80 text-sm leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Artist Philosophy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-hypnotic-white/30 backdrop-blur-sm rounded-2xl p-12 border border-deep-blue/10">
            <div className="flex justify-center mb-6">
              <Palette className="w-10 h-10 text-magenta" />
            </div>
            <h3 className="text-3xl font-semibold text-magenta mb-8">
              The Abstract Eye
            </h3>
            <blockquote className="text-2xl text-hypnotic-white/90 font-light italic mb-6 leading-relaxed max-w-3xl mx-auto">
              "I am particularly fond of images that verge on abstract, where shape and texture take center stage."
            </blockquote>
            <p className="text-lg text-hypnotic-white/80 max-w-4xl mx-auto leading-relaxed">
              Growing up immersed in photography culture, with daily slide-show critiques and vacation adventures 
              centered around capturing the perfect shot, the camera became an extension of creative vision. 
              This lifelong relationship with the medium has evolved into a pursuit of the liminal space where 
              reality transforms into abstraction.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      {/* Floating Camera Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Camera className="w-6 h-6 text-magenta/30" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}