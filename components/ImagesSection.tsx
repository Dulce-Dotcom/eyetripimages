'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ImageLightbox from './ImageLightbox'
import ParallaxContainer from './ParallaxContainer'
import { imageMetadata2025, getImageSizes, getBestImageSize, getFlexibleImageUrl, IMAGES_2025_PATH } from '../lib/imageUtils'

// Convert image metadata to component format with real 2025 images
const imageData = imageMetadata2025.map((metadata, index) => {
  // Use the flexible approach for better compatibility with deployment paths
  const sizes = getImageSizes(IMAGES_2025_PATH, metadata.filename);
  
  return {
    id: metadata.filename.replace(/\.[^/.]+$/, ""), // Remove extension for ID
    src: getBestImageSize(sizes, 'preview'), // Medium size for gallery
    lightboxSrc: getBestImageSize(sizes, 'lightbox'), // Large size for lightbox
    title: metadata.title,
    description: metadata.description || 'Digital artwork from the EyeTrip Images collection.',
    series: metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1), // Capitalize category
    year: metadata.year,
    dimensions: metadata.dimensions,
    megapixels: metadata.megapixels
  };
});

// Define series information for the 2025 collection
type SeriesName = 'CrushSeries' | 'Photography' | 'DigitalArt' | 'Gigapixel'

const seriesInfo: Record<SeriesName, { description: string; color: string }> = {
  'CrushSeries': {
    description: 'An exploration of organic forms under pressure, revealing beauty in transformation and destruction. These digital compositions push the boundaries of abstract art.',
    color: 'from-deep-blue to-dark-grey'
  },
  'Photography': {
    description: 'Contemporary portrait and street photography capturing fleeting moments with dramatic lighting and emotional depth.',
    color: 'from-hypnotic-white to-dark-grey'
  },
  'DigitalArt': {
    description: 'AI-assisted digital artworks and digital reinterpretations of classic masterpieces, exploring the intersection of technology and traditional art.',
    color: 'from-magenta to-deep-blue'
  },
  'Gigapixel': {
    description: 'Ultra high-resolution compositions designed for large-scale printing. These works contain extraordinary detail that can be explored at massive sizes.',
    color: 'from-magenta to-hypnotic-white'
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
      id="images"
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-deep-blue to-dark-grey"
    >
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
            <div className="bg-hypnotic-white/20 backdrop-blur-sm rounded-lg p-6 border border-magenta/20">
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
                <div className="absolute inset-0 bg-gradient-to-t from-hypnotic-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
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
                  <span className={`bg-gradient-to-r ${seriesInfo[image.series as SeriesName].color} text-transparent bg-clip-text font-semibold text-xs px-2 py-1 bg-hypnotic-white/50 backdrop-blur-sm rounded`}>
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
          <div className="bg-hypnotic-white/30 backdrop-blur-sm rounded-2xl p-8 border border-deep-blue/10">
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