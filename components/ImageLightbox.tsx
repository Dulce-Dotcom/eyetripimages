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
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })

  const currentImage = images[currentIndex]

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setRotation(0)
    setImageLoaded(false)
    setImageDimensions({ width: 0, height: 0 })
  }, [currentIndex, isOpen])

  // Update container dimensions on resize
  useEffect(() => {
    const updateContainerSize = () => {
      setContainerDimensions({
        width: window.innerWidth - 128, // Account for padding
        height: window.innerHeight - 192 // Account for controls and padding
      })
    }
    
    updateContainerSize()
    window.addEventListener('resize', updateContainerSize)
    return () => window.removeEventListener('resize', updateContainerSize)
  }, [])

  // Calculate pan bounds based on image and container dimensions
  const getPanBounds = () => {
    if (!imageDimensions.width || !imageDimensions.height) return { x: 0, y: 0 }
    
    const scaledImageWidth = imageDimensions.width * zoom
    const scaledImageHeight = imageDimensions.height * zoom
    
    const maxX = Math.max(0, (scaledImageWidth - containerDimensions.width) / 2)
    const maxY = Math.max(0, (scaledImageHeight - containerDimensions.height) / 2)
    
    return { x: maxX, y: maxY }
  }

  // Constrain position to image bounds
  const constrainPosition = (newPosition: { x: number; y: number }) => {
    const bounds = getPanBounds()
    return {
      x: Math.max(-bounds.x, Math.min(bounds.x, newPosition.x)),
      y: Math.max(-bounds.y, Math.min(bounds.y, newPosition.y))
    }
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    const panStep = 30
    
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        if (e.shiftKey) {
          // Shift + Arrow for image panning
          e.preventDefault()
          setPosition(prev => constrainPosition({ ...prev, x: prev.x + panStep }))
        } else {
          // Normal arrow for image navigation
          onPrevious()
        }
        break
      case 'ArrowRight':
        if (e.shiftKey) {
          // Shift + Arrow for image panning
          e.preventDefault()
          setPosition(prev => constrainPosition({ ...prev, x: prev.x - panStep }))
        } else {
          // Normal arrow for image navigation
          onNext()
        }
        break
      case 'ArrowUp':
        if (e.shiftKey) {
          e.preventDefault()
          setPosition(prev => constrainPosition({ ...prev, y: prev.y + panStep }))
        }
        break
      case 'ArrowDown':
        if (e.shiftKey) {
          e.preventDefault()
          setPosition(prev => constrainPosition({ ...prev, y: prev.y - panStep }))
        }
        break
      case '=':
      case '+':
        e.preventDefault()
        setZoom(prev => Math.min(prev * 1.2, 5))
        setPosition(prev => constrainPosition(prev))
        break
      case '-':
        e.preventDefault()
        setZoom(prev => Math.max(prev / 1.2, 0.1))
        setPosition(prev => constrainPosition(prev))
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
    e.stopPropagation()
    
    if (e.ctrlKey || e.metaKey) {
      // Zoom with ctrl/cmd + wheel
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      const newZoom = Math.max(0.1, Math.min(5, zoom * delta))
      setZoom(newZoom)
      // Constrain position after zoom change
      setPosition(prev => constrainPosition(prev))
    } else {
      // Pan image with wheel - reduced speed for better control
      const panSpeed = 8
      const deltaX = e.shiftKey ? e.deltaY : 0 // Shift + wheel for horizontal pan
      const deltaY = e.shiftKey ? 0 : e.deltaY // Normal wheel for vertical pan
      
      setPosition(prev => constrainPosition({
        x: prev.x - deltaX * panSpeed / zoom,
        y: prev.y - deltaY * panSpeed / zoom
      }))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Always allow dragging for panning
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition(prev => constrainPosition({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Reset view handler
  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setRotation(0)
  }

  if (!isOpen || !currentImage) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-hypnotic-white/95 backdrop-blur-sm overflow-hidden"
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
        <div className="sticky top-4 left-4 right-4 flex justify-between items-start z-10 mb-4">
          {/* Image Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-hypnotic-white/50 backdrop-blur-sm rounded-lg p-4 max-w-md max-h-40 overflow-y-auto"
          >
            <h3 className="text-gray-700 font-semibold text-lg mb-1">
              {currentImage.title}
            </h3>
            {currentImage.dimensions && (
              <p className="text-gray-600 text-sm mb-2">
                {currentImage.dimensions}
              </p>
            )}
            {currentImage.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
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
              onClick={() => {
                setZoom(prev => Math.max(prev / 1.2, 0.1))
                setPosition(prev => constrainPosition(prev))
              }}
              className="p-2 bg-hypnotic-white/50 backdrop-blur-sm rounded-lg text-deep-blue hover:bg-magenta/20 transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => {
                setZoom(prev => Math.min(prev * 1.2, 5))
                setPosition(prev => constrainPosition(prev))
              }}
              className="p-2 bg-hypnotic-white/50 backdrop-blur-sm rounded-lg text-deep-blue hover:bg-magenta/20 transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setRotation(prev => prev + 90)}
              className="p-2 bg-hypnotic-white/50 backdrop-blur-sm rounded-lg text-deep-blue hover:bg-magenta/20 transition-colors"
              title="Rotate (R)"
            >
              <RotateCw size={20} />
            </button>
                        <button
              onClick={onClose}
              className="p-2 bg-hypnotic-white/50 backdrop-blur-sm rounded-lg text-deep-blue hover:bg-magenta/20 transition-colors"
              title="Close (Escape)"
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
              className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-hypnotic-white/70 backdrop-blur-sm rounded-full text-deep-blue hover:bg-magenta/20 transition-colors z-20 shadow-lg"
              title="Previous (←)"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-hypnotic-white/70 backdrop-blur-sm rounded-full text-deep-blue hover:bg-magenta/20 transition-colors z-20 shadow-lg"
              title="Next (→)"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image container */}
        <div className="flex items-center justify-center min-h-screen p-16 pt-24 pb-24">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: imageLoaded ? 1 : 0.9, 
              opacity: imageLoaded ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'move'
            }}
            onMouseDown={handleMouseDown}
          >
            <motion.img
              src={currentImage.lightboxSrc || currentImage.src}
              alt={currentImage.title}
              className="object-contain select-none"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                maxWidth: zoom > 1 ? 'none' : '100%',
                maxHeight: zoom > 1 ? 'none' : '80vh'
              }}
              onLoad={(e) => {
                setImageLoaded(true)
                const img = e.target as HTMLImageElement
                setImageDimensions({
                  width: img.naturalWidth,
                  height: img.naturalHeight
                })
              }}
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
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-hypnotic-white/70 backdrop-blur-sm rounded-lg px-4 py-2 z-20 shadow-lg"
          >
            <span className="text-deep-blue text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}

        {/* Zoom indicator */}
        {zoom !== 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 right-4 bg-hypnotic-white/70 backdrop-blur-sm rounded-lg px-3 py-2 z-20 shadow-lg"
          >
            <span className="text-deep-blue text-sm">
              {Math.round(zoom * 100)}%
            </span>
          </motion.div>
        )}

        {/* Pan and zoom hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 text-deep-blue/60 text-xs text-center z-20"
        >
          <div className="bg-hypnotic-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="md:hidden">Drag to pan • Pinch to zoom</div>
            <div className="hidden md:block">Drag or scroll to pan • Ctrl+scroll to zoom • Shift+arrows for precise pan</div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}