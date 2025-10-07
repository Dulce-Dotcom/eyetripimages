'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, Camera, Calendar, MapPin } from 'lucide-react'
import ImageLightbox from './ImageLightbox'

const lightningImages = [
  {
    id: 'corkscrew-miss',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lightning1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="100%" style="stop-color:#000000;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#lightning1)"/><path d="M400,50 L380,150 L420,250 L390,350 L410,450 L395,550" fill="none" stroke="rgba(205,0,255,0.9)" stroke-width="4"/><path d="M400,50 L380,150 L420,250 L390,350 L410,450 L395,550" fill="none" stroke="rgba(240,248,255,0.8)" stroke-width="2"/></svg>`),
    title: 'Corkscrew Near Miss',
    description: 'A powerful lightning strike with unique spiral formation captured near Wilcox, Arizona.',
    location: 'Wilcox, Arizona',
    year: '2023'
  },
  {
    id: 'triple-strike',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="lightning2"><stop offset="0%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="100%" style="stop-color:#000000;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#lightning2)"/><path d="M300,50 L290,200 L310,350 L295,500" fill="none" stroke="rgba(205,0,255,0.8)" stroke-width="3"/><path d="M400,50 L380,200 L420,350 L395,500" fill="none" stroke="rgba(240,248,255,0.9)" stroke-width="3"/><path d="M500,50 L490,200 L510,350 L495,500" fill="none" stroke="rgba(205,0,255,0.7)" stroke-width="3"/></svg>`),
    title: 'Triple Lightning Strike',
    description: 'A rare triple lightning strike near Wilcox, demonstrating nature\'s raw electrical power.',
    location: 'Wilcox, Arizona',
    year: '2023'
  },
  {
    id: 'windmill-double',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lightning3" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:#000000;stop-opacity:1" /><stop offset="50%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="100%" style="stop-color:#1B2A41;stop-opacity:0.8" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#lightning3)"/><rect x="350" y="400" width="100" height="200" fill="rgba(240,248,255,0.3)"/><circle cx="400" cy="350" r="50" fill="none" stroke="rgba(240,248,255,0.4)" stroke-width="2"/><path d="M350,50 L340,200 L360,350" fill="none" stroke="rgba(205,0,255,0.9)" stroke-width="4"/><path d="M450,50 L440,200 L460,350" fill="none" stroke="rgba(240,248,255,0.8)" stroke-width="3"/></svg>`),
    title: 'Double Strike at Windmill',
    description: 'Powerful double lightning strike creating dramatic contrast with industrial windmill.',
    location: 'Cochise, Arizona',
    year: '2023'
  },
  {
    id: 'kid-gloves',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="lightning4"><stop offset="20%" style="stop-color:#cd00ff;stop-opacity:0.3" /><stop offset="80%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="100%" style="stop-color:#000000;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#lightning4)"/><rect x="350" y="450" width="100" height="150" fill="rgba(240,248,255,0.2)"/><circle cx="400" cy="400" r="40" fill="none" stroke="rgba(240,248,255,0.3)" stroke-width="2"/><path d="M400,50 Q420,150 390,250 Q410,350 400,400" fill="none" stroke="rgba(240,248,255,0.6)" stroke-width="3"/></svg>`),
    title: 'Kid Gloves',
    description: 'Let\'s not hurt the windmill - a delicate strike formation.',
    location: 'Cochise, Arizona',
    year: '2023'
  },
  {
    id: 'purple-glow',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="lightning5"><stop offset="0%" style="stop-color:#cd00ff;stop-opacity:0.4" /><stop offset="50%" style="stop-color:#1B2A41;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#000000;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#lightning5)"/><rect x="0" y="450" width="800" height="150" fill="rgba(255,100,0,0.2)"/><path d="M400,50 L380,150 L420,250 L390,350 L410,450" fill="none" stroke="rgba(205,0,255,0.8)" stroke-width="5"/><circle cx="400" cy="200" r="100" fill="rgba(205,0,255,0.1)"/></svg>`),
    title: 'Purple Glow Over Tucson',
    description: 'Lightning casts an eerie purple glow, amid the warm illumination of Tucson.',
    location: 'Tucson, Arizona',
    year: '2023'
  },
  {
    id: 'serpentine-strike',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lightning6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="100%" style="stop-color:#000000;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#lightning6)"/><path d="M200,50 Q300,100 250,200 Q400,250 350,350 Q500,400 450,500 Q600,550 550,600" fill="none" stroke="rgba(240,248,255,0.9)" stroke-width="4"/><path d="M200,50 Q300,100 250,200 Q400,250 350,350 Q500,400 450,500 Q600,550 550,600" fill="none" stroke="rgba(205,0,255,0.6)" stroke-width="2"/></svg>`),
    title: 'Serpentine Strike',
    description: 'An interestingly shaped lightning strike creating serpentine patterns.',
    location: 'Cochise, Arizona',
    year: '2023'
  }
]

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
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])
  const lightningOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
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
        className="relative min-h-screen overflow-hidden bg-black"
      >
        {/* Static fallback during SSR */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-black via-deep-blue to-black opacity-60" />
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
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Dynamic Video Background */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/lightning-storm.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Lightning Flash Effect */}
      <motion.div 
        className="absolute inset-0 bg-hypnotic-white"
        animate={{ 
          opacity: [0, 0, 0, 1, 0, 0, 0, 0.7, 0, 0] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          times: [0, 0.1, 0.2, 0.21, 0.22, 0.3, 0.6, 0.61, 0.62, 1]
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.div 
          style={{ y: textY, opacity: lightningOpacity }}
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
                <span className="bg-gradient-to-r from-magenta via-hypnotic-white to-deep-blue bg-clip-text text-transparent">
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
              <p className="text-xl md:text-2xl text-hypnotic-white leading-relaxed">
                Lightning Photography
              </p>
              <p className="text-lg md:text-xl text-hypnotic-white/90 leading-relaxed">
                Three generations of Aughenbaugh's have been making pilgrimages to southern Arizona, 
                beginning when my father Byron started college in Tucson in 1956.
              </p>
              <p className="text-lg md:text-xl text-hypnotic-white/80 leading-relaxed">
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
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  {/* Lightning Strike Animation on Hover */}
                  <motion.div 
                    className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(255, 0, 162, 0)',
                        '0 0 0 4px rgba(255, 0, 162, 0.4)',
                        '0 0 0 0 rgba(255, 0, 162, 0)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-black border border-hypnotic-white/10">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125"
                    />
                    
                    {/* Electric Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Lightning Icon */}
                    <motion.div 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-magenta/90 backdrop-blur-sm rounded-full p-2">
                        <Zap className="w-5 h-5 text-hypnotic-white" />
                      </div>
                    </motion.div>
                    
                    {/* Image Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
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
                </motion.div>
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
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-12 border border-magenta/20">
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

      {/* Ambient Lightning Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Zap className="w-4 h-4 text-magenta/60" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}