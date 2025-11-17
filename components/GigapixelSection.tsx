'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ZoomIn, Info, Maximize } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
import ParallaxContainer from './ParallaxContainer'
import { getAssetPath } from '@/lib/assetPath'


const gigapixelImagesData = [
  {
    id: 'disappearing-mist',
  src: getAssetPath('/uploads/2025/02/I1A2429_018kcapq8-1-scaled.jpg'),
    title: 'Disappearing into the Mist',
    dimensions: '22,396 x 12,441 pixels',
    description: 'The afternoon sun catches that last bit of rock at Point Lobos, California, as the evening mist drifts in and engulfs the scene.',
    megapixels: '278.9 MP',
    printSize: '75" x 42" (6.2\' x 3.5\') at 300 DPI'
  },
  {
    id: 'into-fog',
  src: getAssetPath('/uploads/2025/02/I1A2511_108kcapq8-scaled.jpg'),
    title: 'Into the Fog',
    dimensions: '31,165 x 17,941 pixels',
    description: 'A railroad trestle emerges from the swirling morning fog at Goleta, California.',
    megapixels: '559.2 MP',
    printSize: '104" x 60" (8.7\' x 5\') at 300 DPI'
  },
  {
    id: 'side-barn',
  src: getAssetPath('/uploads/2025/02/I1A2582_078kcapq8-scaled.jpg'),
    title: 'Side of a Barn',
    dimensions: '35,436 x 43,265 pixels',
    description: 'Dramatic simplicity, limited color palette, and empty space--with an invitation to walk closer and explore the detail.',
    megapixels: '1,533.2 MP',
    printSize: '118" x 144" (9.8\' x 12\') at 300 DPI'
  },
  {
    id: 'uplift',
  src: getAssetPath('/uploads/2025/02/I1A4878_058kcapq8-scaled.jpg'),
    title: 'Uplift',
    dimensions: '72,468 x 41,769 pixels',
    description: 'A study in parallels between the clouds, the trees and the hillside, with detail down to the very blades of grass.',
    megapixels: '3,027.1 MP',
    printSize: '241" x 139" (20\' x 11.6\') at 300 DPI'
  },
  {
    id: 'follow-the-rainbow',
  src: getAssetPath('/uploads/2025/02/I1A5872_088kcapq8-scaled.jpg'),
    title: 'Follow the Rainbow',
    dimensions: '57,344 x 36,864 pixels',
    description: 'A panoramic view of multiple storms in southeastern Arizona at sunset.',
    megapixels: '2,115.1 MP',
    printSize: '191" x 123" (15.9\' x 10.3\') at 300 DPI'
  },
  {
    id: 'fossil-falls',
  src: getAssetPath('/uploads/2025/02/MG_7379_03_6k_q3-scaled.jpg'),
    title: 'Fossil Falls Cliff Face',
    dimensions: '19,395 x 11,011 pixels',
    description: 'Lava cliff face baked in the sun to deep reds, with blues and greens coming from minerals in the stone',
    megapixels: '213.6 MP',
    printSize: '65" x 37" (5.4\' x 3.1\') at 300 DPI'
  },
  {
    id: 'mycocosm',
  src: getAssetPath('/uploads/2025/02/mycososm_7563_06_6k_q3b-scaled.jpg'),
    title: 'Mycocosm',
    dimensions: '19,187 x 13,865 pixels',
    description: 'A varied landscape and a thriving community of moss, lichen, and fungus.',
    megapixels: '266.1 MP',
    printSize: '64" x 46" (5.3\' x 3.8\') at 300 DPI'
  },
  {
    id: 'crossings-carlsbad',
  src: getAssetPath('/uploads/2025/02/N9A0528_01-scaled.jpg'),
    title: 'Crossings at Carlsbad',
    dimensions: '10,563 x 3,861 pixels',
    description: 'A beautifully designed landscape captured in stunning panoramic detail.',
    megapixels: '40.8 MP',
    printSize: '35" x 13" (2.9\' x 1.1\') at 300 DPI'
  }
]

// Image paths are already processed with getAssetPath
const gigapixelImages = gigapixelImagesData

export default function GigapixelSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
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
  
  // Title animations
  const titleScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  // Improved mouse tracking for hover effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const openLightbox = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex)
    setLightboxOpen(true)
  }
  
  const closeLightbox = () => {
    setLightboxOpen(false)
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gigapixelImages.length)
  }
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gigapixelImages.length) % gigapixelImages.length)
  }
  
  const handleMouseMove = (e: React.MouseEvent, imageId?: string) => {
    if (imageId && hoveredImage === imageId) {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }
  
  return (
    <section 
      id="gigapixel"
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-dark-grey to-[#8b0050]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          style={{ scale: titleScale }}
          className="text-center mb-20"
          suppressHydrationWarning
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold gradient-text mb-6"
          >
            GIGAPIXEL
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white font-semibold mb-4"
          >
            Stitched Photography
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed"
          >
            These images are made from many individual frames, combined to create one large image. 
            As a result, they can contain far more detail than a normal photograph. Some are over a gigapixel in size. 
            They can be printed very large. The largest one shown here would be 241 inches (20 feet) across, if it were printed at 300 dpi.
          </motion.p>
        </motion.div>

        {/* Gigapixel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {gigapixelImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onMouseMove={(e) => handleMouseMove(e, image.id)}
              onClick={() => openLightbox(index)}
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-dark-grey">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-hypnotic-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                  <div className="bg-magenta/90 backdrop-blur-sm rounded-full p-3 border border-hypnotic-white/20">
                    <ZoomIn className="w-6 h-6 text-hypnotic-white" />
                  </div>
                </div>

                {/* Detail Level Indicator */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-hypnotic-white/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-magenta/30">
                    <span className="text-magenta font-bold text-sm">{image.megapixels}</span>
                  </div>
                </div>

                {/* Interactive Zoom Preview */}
                {hoveredImage === image.id && (
                  <div
                    className="absolute w-32 h-32 pointer-events-none border-2 border-magenta/70 rounded-lg bg-magenta/20 backdrop-blur-sm shadow-lg shadow-magenta/20"
                    style={{
                      left: Math.max(8, Math.min(mousePos.x - 64, 300)), // Keep within image bounds
                      top: Math.max(8, Math.min(mousePos.y - 64, 150)),
                      transform: 'translate(0, 0)', // Ensure smooth positioning
                    }}
                  >
                    <div className="absolute inset-2 border border-hypnotic-white/50 rounded" />
                    <div className="absolute inset-4 border border-magenta/30 rounded" />
                  </div>
                )}
              </div>

              {/* Image Information */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-hypnotic-white mb-2 group-hover:text-magenta transition-colors">
                  {image.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-hypnotic-white/70">Dimensions</p>
                    <p className="text-hypnotic-white font-mono">{image.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-hypnotic-white/70">Print Size</p>
                    <p className="text-hypnotic-white">{image.printSize}</p>
                  </div>
                </div>
                <p className="text-hypnotic-white/80 mt-3 leading-relaxed">
                  {image.description}
                </p>
              </div>

              {/* Click to Explore Indicator */}
              <div 
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-center gap-2 bg-hypnotic-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-magenta/30">
                  <Maximize className="w-4 h-4 text-magenta" />
                  <span className="text-hypnotic-white text-sm">Explore Detail</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-hypnotic-white/30 backdrop-blur-sm rounded-2xl p-8 border border-deep-blue/10">
            <h3 className="text-3xl font-semibold text-magenta mb-6">
              Unprecedented Detail
            </h3>
            <p className="text-lg text-hypnotic-white/80 max-w-3xl mx-auto leading-relaxed mb-6">
              Each gigapixel image contains billions of pixels, revealing details invisible to the naked eye. 
              The stitching process combines hundreds of individual photographs into a single, massive image file.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-hypnotic-white mb-1">3.0+ GP</p>
                <p className="text-hypnotic-white/60">Largest Image</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-hypnotic-white mb-1">241'</p>
                <p className="text-hypnotic-white/60">Max Print Width</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-hypnotic-white mb-1">500+</p>
                <p className="text-hypnotic-white/60">Source Images</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Resolution Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-br from-magenta/20 to-electric-blue/20 backdrop-blur-sm rounded-2xl p-8 border border-magenta/30">
            <h3 className="text-2xl font-semibold text-hypnotic-white mb-6">
              Beyond Gigapixel: Extreme Resolution
            </h3>
            <div className="space-y-6 text-left max-w-4xl mx-auto">
              <div className="bg-hypnotic-white/10 rounded-lg p-6 border border-magenta/20">
                <h4 className="text-xl font-bold text-magenta mb-3">Matrix Flyover Video</h4>
                <p className="text-hypnotic-white/90 leading-relaxed">
                  The Matrix Flyover video is based on an image with an effective resolution of 384,480 x 256,244 pixels, 
                  or <span className="font-bold text-magenta">98.5 gigapixels</span>. That would be 108.6 feet long and 71.1 feet high, at 300 dpi.
                </p>
              </div>
              <div className="bg-hypnotic-white/10 rounded-lg p-6 border border-electric-blue/20">
                <h4 className="text-xl font-bold text-electric-blue mb-3">Super Zoom Animations</h4>
                <p className="text-hypnotic-white/90 leading-relaxed">
                  The Super Zoom animations are based on images, that if printed would be larger than the Milky Way Galaxy. 
                  The horizontal resolution of the Scraptangle image is equivalent to{' '}
                  <span className="font-bold text-electric-blue">125,728,547,573,089,599,609,375,000 pixels</span>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={gigapixelImages.map(img => ({
          ...img,
          dimensions: `${img.dimensions} (${img.megapixels})`
        }))}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-magenta/30 rounded-full animate-pulse"
            style={{
              left: 20 + (i * 30) + '%',
              top: 30 + (i * 20) + '%',
              animationDelay: `${i * 2}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </section>
  )
}