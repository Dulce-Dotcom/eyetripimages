'use client'

import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

interface ImageData {
  id: string
  src: string
  lightboxSrc?: string // High resolution version for lightbox
  title: string
  dimensions?: string
  description?: string
  year?: number
  megapixels?: string
}

interface ImageLightboxProps {
  images: ImageData[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function ImageLightbox({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious 
}: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const currentImage = images[currentIndex]

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setRotation(0)
    setImageLoaded(false)
  }, [currentIndex, isOpen])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        onPrevious()
        break
      case 'ArrowRight':
        onNext()
        break
      case '=':
      case '+':
        e.preventDefault()
        setZoom(prev => Math.min(prev * 1.2, 5))
        break
      case '-':
        e.preventDefault()
        setZoom(prev => Math.max(prev / 1.2, 0.1))
        break
      case '0':
        e.preventDefault()
        setZoom(1)
        setPosition({ x: 0, y: 0 })
        break
      case 'r':
      case 'R':
        e.preventDefault()
        setRotation(prev => prev + 90)
        break
    }
  }, [isOpen, onClose, onNext, onPrevious])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
      // Zoom with ctrl/cmd + wheel
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (!isOpen || !currentImage) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Loading indicator */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-magenta border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          {/* Image Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md"
          >
            <h3 className="text-hypnotic-white font-semibold text-lg mb-1">
              {currentImage.title}
            </h3>
            {currentImage.dimensions && (
              <p className="text-hypnotic-white/70 text-sm mb-2">
                {currentImage.dimensions}
              </p>
            )}
            {currentImage.description && (
              <p className="text-hypnotic-white/80 text-sm">
                {currentImage.description}
              </p>
            )}
          </motion.div>

          {/* Control buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            <button
              onClick={() => setZoom(prev => Math.max(prev / 1.2, 0.1))}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-hypnotic-white hover:bg-magenta/20 transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => setZoom(prev => Math.min(prev * 1.2, 5))}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-hypnotic-white hover:bg-magenta/20 transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setRotation(prev => prev + 90)}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-hypnotic-white hover:bg-magenta/20 transition-colors"
              title="Rotate (R)"
            >
              <RotateCw size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-hypnotic-white hover:bg-magenta/20 transition-colors"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-hypnotic-white hover:bg-magenta/20 transition-colors z-10"
              title="Previous (←)"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-hypnotic-white hover:bg-magenta/20 transition-colors z-10"
              title="Next (→)"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image container */}
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: imageLoaded ? 1 : 0.9, 
              opacity: imageLoaded ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            style={{
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
            onMouseDown={handleMouseDown}
          >
            <motion.img
              src={currentImage.lightboxSrc || currentImage.src}
              alt={currentImage.title}
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2"
          >
            <span className="text-hypnotic-white text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}

        {/* Zoom indicator */}
        {zoom !== 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
          >
            <span className="text-hypnotic-white text-sm">
              {Math.round(zoom * 100)}%
            </span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}