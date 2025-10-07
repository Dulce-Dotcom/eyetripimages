'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ImageLightbox from './ImageLightbox'
import ParallaxContainer from './ParallaxContainer'

const imageData = [
  // AI Generated Series
  {
    id: 'neuphoria',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ai1"><stop offset="0%" style="stop-color:#cd00ff;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#ai1)"/><circle cx="400" cy="400" r="200" fill="rgba(240,248,255,0.2)"/><path d="M200,200 Q400,100 600,200 Q700,400 600,600 Q400,700 200,600 Q100,400 200,200" fill="rgba(205,0,255,0.3)"/></svg>`),
    title: 'Neuphoria',
    description: 'Art is essentially magic. It has its effect in our subconscious.',
    series: 'AI Generated'
  },
  {
    id: 'missing-piece',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ai2"><stop offset="0%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="50%" style="stop-color:#cd00ff;stop-opacity:0.6" /><stop offset="100%" style="stop-color:#F0F8FF;stop-opacity:0.8" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#ai2)"/><polygon points="400,100 600,300 500,600 300,600 200,300" fill="rgba(205,0,255,0.4)"/></svg>`),
    title: 'The Missing Piece',
    description: 'Always interested in the place where art and philosophy meet.',
    series: 'AI Generated'
  },
  {
    id: 'its-complicated',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ai3"><stop offset="20%" style="stop-color:#F0F8FF;stop-opacity:0.3" /><stop offset="80%" style="stop-color:#01019b;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#ai3)"/><rect x="150" y="150" width="500" height="500" fill="none" stroke="rgba(205,0,255,0.5)" stroke-width="3" rx="50"/><circle cx="400" cy="400" r="100" fill="rgba(240,248,255,0.2)"/></svg>`),
    title: "It's Complicated",
    description: 'Complex layers of meaning and visual depth.',
    series: 'AI Generated'
  },
  // Crush Series
  {
    id: 'crush-07',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="crush1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#01019b;stop-opacity:1" /><stop offset="100%" style="stop-color:#1B2A41;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#crush1)"/><ellipse cx="400" cy="200" rx="300" ry="100" fill="rgba(205,0,255,0.3)" transform="rotate(45 400 400)"/><ellipse cx="400" cy="600" rx="250" ry="80" fill="rgba(240,248,255,0.2)" transform="rotate(-30 400 400)"/></svg>`),
    title: 'Crush #07',
    description: 'From the Crush Series - exploring texture and form.',
    series: 'Crush Series'
  },
  {
    id: 'crush-08',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="crush2"><stop offset="0%" style="stop-color:#1B2A41;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#crush2)"/><path d="M100,400 Q200,100 400,200 Q600,150 700,400 Q600,700 400,600 Q200,650 100,400" fill="rgba(205,0,255,0.25)"/></svg>`),
    title: 'Crush #08',
    description: 'Organic forms compressed and transformed.',
    series: 'Crush Series'
  },
  {
    id: 'crush-09',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="crush3" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#cd00ff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#crush3)"/><circle cx="300" cy="300" r="150" fill="rgba(240,248,255,0.1)"/><circle cx="500" cy="500" r="100" fill="rgba(205,0,255,0.2)"/></svg>`),
    title: 'Crush #09',
    description: 'Abstract beauty from destruction and reformation.',
    series: 'Crush Series'
  },
  // B&W Series
  {
    id: 'alice-nonsense',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bw1"><stop offset="0%" style="stop-color:#F0F8FF;stop-opacity:1" /><stop offset="50%" style="stop-color:#1B2A41;stop-opacity:1" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bw1)"/><rect x="100" y="100" width="600" height="600" fill="none" stroke="rgba(240,248,255,0.6)" stroke-width="2"/><circle cx="400" cy="400" r="200" fill="rgba(240,248,255,0.1)"/></svg>`),
    title: "Alice's Brand of Nonsense",
    description: 'Monochromatic exploration of surreal themes.',
    series: 'B/W'
  },
  {
    id: 'in-plain-sight',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="bw2"><stop offset="30%" style="stop-color:#F0F8FF;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#1B2A41;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(#bw2)"/><polygon points="400,50 750,400 400,750 50,400" fill="rgba(240,248,255,0.3)"/></svg>`),
    title: 'In Plain Sight',
    description: 'Hidden meanings in everyday abstractions.',
    series: 'B/W'
  },
  // Pseudo Color
  {
    id: 'you-have-found-it',
    src: 'data:image/svg+xml;base64,' + btoa(`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pseudo1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#cd00ff;stop-opacity:0.7" /><stop offset="50%" style="stop-color:#1B2A41;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#01019b;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#pseudo1)"/><path d="M0,0 L800,0 L800,400 Q400,200 0,400 Z" fill="rgba(240,248,255,0.2)"/><path d="M0,800 L800,800 L800,400 Q400,600 0,400 Z" fill="rgba(205,0,255,0.3)"/></svg>`),
    title: 'You Have Found It',
    description: 'Discovery through color and form manipulation.',
    series: 'Pseudo Color'
  }
]

type SeriesName = 'AI Generated' | 'Crush Series' | 'B/W' | 'Pseudo Color'

const seriesInfo: Record<SeriesName, { description: string; color: string }> = {
  'AI Generated': {
    description: 'AI is a shiny new toy and many are abusing it. I myself have quickly tired of the novelty, and seek to use it as a tool to create images that are uniquely mine. No text prompts were used in this process.',
    color: 'from-magenta to-hypnotic-white'
  },
  'Crush Series': {
    description: 'An exploration of organic forms under pressure, revealing beauty in transformation and destruction.',
    color: 'from-deep-blue to-dark-grey'
  },
  'B/W': {
    description: 'Monochromatic studies that strip away color to reveal pure form and emotion.',
    color: 'from-hypnotic-white to-dark-grey'
  },
  'Pseudo Color': {
    description: 'Color manipulation that creates new realities from familiar forms.',
    color: 'from-magenta to-deep-blue'
  }
}

export default function ImagesSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150])
  
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
  
  const filteredImages = selectedSeries 
    ? imageData.filter(img => img.series === selectedSeries)
    : imageData
  
  const series = Object.keys(seriesInfo)
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-deep-blue to-dark-grey"
    >
      {/* Animated Background */}
      <ParallaxContainer speed={-0.2} className="absolute inset-0">
        <motion.div 
          style={{ y: backgroundY }}
          className="h-[120vh] w-full"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(205,0,255,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,248,255,0.08),transparent_50%)]" />
        </motion.div>
      </ParallaxContainer>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            IMAGES
          </h2>
          <p className="text-xl md:text-2xl text-hypnotic-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Art is essentially magic. It has its effect in our subconscious. Always interested in the place where art and philosophy meet, 
            I appreciate the notion that art can happen when you get out of the way.
          </p>
        </motion.div>

        {/* Series Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedSeries(null)}
            className={`px-6 py-3 rounded-full border transition-all duration-300 ${
              selectedSeries === null 
                ? 'bg-magenta text-hypnotic-white border-magenta' 
                : 'bg-transparent text-hypnotic-white border-hypnotic-white/30 hover:border-magenta hover:text-magenta'
            }`}
          >
            All Images
          </button>
          {series.map((seriesName) => (
            <button
              key={seriesName}
              onClick={() => setSelectedSeries(seriesName)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedSeries === seriesName 
                  ? 'bg-magenta text-hypnotic-white border-magenta' 
                  : 'bg-transparent text-hypnotic-white border-hypnotic-white/30 hover:border-magenta hover:text-magenta'
              }`}
            >
              {seriesName}
            </button>
          ))}
        </motion.div>

        {/* Series Description */}
        {selectedSeries && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 text-center"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-magenta/20">
              <h3 className={`text-2xl font-semibold bg-gradient-to-r ${seriesInfo[selectedSeries as SeriesName].color} bg-clip-text text-transparent mb-3`}>
                {selectedSeries}
              </h3>
              <p className="text-hypnotic-white/80 text-lg">
                {seriesInfo[selectedSeries as SeriesName].description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-lg bg-dark-grey aspect-square">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-hypnotic-white font-semibold text-lg mb-1">
                    {image.title}
                  </h3>
                  <p className="text-hypnotic-white/70 text-sm mb-2">
                    {image.series}
                  </p>
                  <p className="text-hypnotic-white/80 text-sm line-clamp-2">
                    {image.description}
                  </p>
                </div>

                {/* Series Badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`bg-gradient-to-r ${seriesInfo[image.series as SeriesName].color} text-transparent bg-clip-text font-semibold text-xs px-2 py-1 bg-black/50 backdrop-blur-sm rounded`}>
                    {image.series}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ethics Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-hypnotic-white/10">
            <p className="text-lg text-hypnotic-white/90 mb-4 font-medium">
              I do not use text prompts, and the AI was not trained on other artist's work.
            </p>
            <p className="text-hypnotic-white/70">
              No animals were harmed. All pixels were sustainably sourced.
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
    </section>
  )
}