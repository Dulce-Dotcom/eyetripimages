'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ZoomIn, Info, Maximize } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
import ParallaxContainer from './ParallaxContainer'

const gigapixelImages = [
  {
    id: 'disappearing-mist',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="50%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="100%" style="stop-color:#cd00ff;stop-opacity:0.3" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#grad1)"/><circle cx="400" cy="300" r="150" fill="rgba(240,248,255,0.1)"/><circle cx="1200" cy="700" r="200" fill="rgba(205,0,255,0.15)"/></svg>`),
    title: 'Disappearing into the Mist',
    dimensions: '22,396 x 12,441 pixels',
    description: 'Ultra-high resolution capture revealing infinite detail in atmospheric conditions.',
    megapixels: '278.9 MP',
    printSize: '75 x 42 feet at 300 DPI'
  },
  {
    id: 'into-fog',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad2"><stop offset="0%" style="stop-color:#F0F8FF;stop-opacity:0.8" /><stop offset="70%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#grad2)"/><polygon points="0,800 400,600 800,750 1200,500 1600,700 1600,1000 0,1000" fill="rgba(205,0,255,0.2)"/></svg>`),
    title: 'Into the Fog',
    dimensions: '31,165 x 17,941 pixels',
    description: 'Panoramic stitched photography revealing layers within layers of natural beauty.',
    megapixels: '559.2 MP',
    printSize: '104 x 60 feet at 300 DPI'
  },
  {
    id: 'side-barn',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#grad3)"/><rect x="200" y="100" width="1200" height="800" fill="none" stroke="rgba(205,0,255,0.3)" stroke-width="4"/><rect x="400" y="200" width="800" height="600" fill="rgba(240,248,255,0.05)"/></svg>`),
    title: 'Side of a Barn',
    dimensions: '35,436 x 43,265 pixels',
    description: 'Architectural details captured at unprecedented resolution.',
    megapixels: '1,533.2 MP',
    printSize: '118 x 144 feet at 300 DPI'
  },
  {
    id: 'uplift',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad4" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="30%" style="stop-color:#cd00ff;stop-opacity:0.4" /><stop offset="70%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="100%" style="stop-color:#F0F8FF;stop-opacity:0.6" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#grad4)"/><path d="M0,1000 Q400,200 800,600 T1600,300 L1600,1000 Z" fill="rgba(205,0,255,0.2)"/></svg>`),
    title: 'Uplift',
    dimensions: '72,468 x 41,769 pixels',
    description: 'Geological formations in extraordinary detail, revealing textures invisible to the naked eye.',
    megapixels: '3,027.1 MP',
    printSize: '241 x 139 feet at 300 DPI'
  },
  {
    id: 'matrix-fountain',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad5"><stop offset="0%" style="stop-color:#cd00ff;stop-opacity:0.6" /><stop offset="50%" style="stop-color:#1B2A41;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#grad5)"/><circle cx="800" cy="500" r="300" fill="none" stroke="rgba(240,248,255,0.3)" stroke-width="2"/><circle cx="800" cy="500" r="200" fill="none" stroke="rgba(205,0,255,0.4)" stroke-width="3"/><circle cx="800" cy="500" r="100" fill="rgba(240,248,255,0.1)"/></svg>`),
    title: 'Matrix Fountain',
    dimensions: '57,344 x 36,864 pixels',
    description: 'Digital painting captured in gigapixel resolution for infinite exploration.',
    megapixels: '2,115.1 MP',
    printSize: '191 x 123 feet at 300 DPI'
  }
]

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
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const titleScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Create spring animations for smooth mouse following
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)
  
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
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-dark-grey to-deep-blue"
      onMouseMove={handleMouseMove}
    >
      {/* Multi-layered Parallax Background */}
      <ParallaxContainer speed={-0.4} className="absolute inset-0">
        <motion.div 
          style={{ y: backgroundY }}
          className="h-[140vh] w-full"
          suppressHydrationWarning
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-dark-grey to-deep-blue" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(205,0,255,0.1),transparent_60%)]" />
        </motion.div>
      </ParallaxContainer>
      
      <ParallaxContainer speed={-0.2} className="absolute inset-0">
        <div className="h-[120vh] w-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(240,248,255,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(205,0,255,0.08),transparent_70%)]" />
        </div>
      </ParallaxContainer>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          style={{ scale: titleScale, opacity: titleOpacity }}
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
            className="text-xl md:text-2xl text-hypnotic-white/90 mb-4"
          >
            Stitched Photography
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-hypnotic-white/80 max-w-4xl mx-auto leading-relaxed"
          >
            These images are made from many individual frames, combined to create one large image. 
            As a result, they can contain far more detail than a normal photograph. Some are over a gigapixel in size. 
            They can be printed very large. The largest one shown here would be 32 feet across, if it were printed at 300 dpi.
          </motion.p>
        </motion.div>

        {/* Gigapixel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {gigapixelImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => openLightbox(index)}
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-dark-grey">
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Zoom Indicator */}
                <motion.div 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-magenta/90 backdrop-blur-sm rounded-full p-3 border border-hypnotic-white/20">
                    <ZoomIn className="w-6 h-6 text-hypnotic-white" />
                  </div>
                </motion.div>

                {/* Detail Level Indicator */}
                <motion.div 
                  className="absolute top-4 left-4 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-magenta/30">
                    <span className="text-magenta font-bold text-sm">{image.megapixels}</span>
                  </div>
                </motion.div>

                {/* Interactive Zoom Preview on Hover */}
                {hoveredImage === image.id && (
                  <motion.div
                    style={{
                      x: cursorX,
                      y: cursorY,
                    }}
                    className="absolute w-32 h-32 pointer-events-none border-2 border-magenta/60 rounded-lg bg-magenta/10 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    suppressHydrationWarning
                  >
                    <div className="absolute inset-1 border border-hypnotic-white/30 rounded" />
                  </motion.div>
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
              <motion.div 
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-magenta/30">
                  <Maximize className="w-4 h-4 text-magenta" />
                  <span className="text-hypnotic-white text-sm">Explore Detail</span>
                </div>
              </motion.div>
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
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-hypnotic-white/10">
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

      {/* Floating Detail Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 0.2, 0],
              x: [
                Math.random() * 100 + '%', 
                Math.random() * 100 + '%', 
                Math.random() * 100 + '%'
              ],
              y: [
                Math.random() * 100 + '%', 
                Math.random() * 100 + '%', 
                Math.random() * 100 + '%'
              ]
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-magenta/60 rounded-full"
          />
        ))}
      </div>
    </section>
  )
}