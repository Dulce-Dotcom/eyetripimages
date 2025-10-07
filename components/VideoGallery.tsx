'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react'

interface VideoData {
  id: string
  src: string
  title: string
  description?: string
  thumbnail?: string
  isVR?: boolean
}

interface VideoGalleryProps {
  videos: VideoData[]
  className?: string
}

export default function VideoGallery({ videos, className = '' }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.8, 0])

  const handleVideoSelect = (videoId: string) => {
    setActiveVideo(videoId)
    setIsPlaying(true)
    setIsFullscreen(true)
  }

  const handleClose = () => {
    setActiveVideo(null)
    setIsPlaying(false)
    setIsFullscreen(false)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVideo) return
      
      switch (e.key) {
        case 'Escape':
          handleClose()
          break
        case ' ':
          e.preventDefault()
          handlePlayPause()
          break
        case 'm':
        case 'M':
          handleMute()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeVideo, isPlaying, isMuted])

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const activeVideoData = videos.find(v => v.id === activeVideo)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Video Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative cursor-pointer"
            onClick={() => handleVideoSelect(video.id)}
          >
            <div className="relative overflow-hidden rounded-lg bg-dark-grey aspect-video">
              {/* Thumbnail or Video Preview */}
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-deep-blue to-dark-grey flex items-center justify-center">
                  <Play className="w-12 h-12 text-magenta" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 bg-magenta/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-magenta/50">
                  <Play className="w-8 h-8 text-hypnotic-white ml-1" />
                </div>
              </motion.div>
              
              {/* VR Badge */}
              {video.isVR && (
                <div className="absolute top-3 right-3 bg-magenta/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-hypnotic-white text-xs font-semibold">360° VR</span>
                </div>
              )}
            </div>
            
            {/* Video Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-hypnotic-white group-hover:text-magenta transition-colors">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-hypnotic-white/70 text-sm mt-1 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Video Player */}
      <AnimatePresence>
        {isFullscreen && activeVideoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Background Video Effect */}
            <motion.div
              style={{ opacity: backgroundOpacity }}
              className="absolute inset-0"
            >
              <video
                className="w-full h-full object-cover blur-md scale-110"
                src={activeVideoData.src}
                muted
                loop
                autoPlay
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Main Video */}
            <div className="relative z-10 h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-6xl aspect-video"
              >
                <video
                  ref={videoRef}
                  src={activeVideoData.src}
                  className="w-full h-full rounded-lg shadow-2xl"
                  autoPlay
                  muted={isMuted}
                  controls={false}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  {/* Top Controls */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <h2 className="text-hypnotic-white font-semibold text-xl">
                        {activeVideoData.title}
                      </h2>
                      {activeVideoData.description && (
                        <p className="text-hypnotic-white/80 text-sm mt-1">
                          {activeVideoData.description}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={handleClose}
                      className="p-3 bg-black/50 backdrop-blur-sm rounded-lg text-hypnotic-white hover:bg-magenta/20 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  {/* Center Play/Pause */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlayPause}
                      className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-magenta/50 hover:bg-magenta/20 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10 text-hypnotic-white" />
                      ) : (
                        <Play className="w-10 h-10 text-hypnotic-white ml-1" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Bottom Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex gap-2">
                      <button
                        onClick={handleMute}
                        className="p-3 bg-black/50 backdrop-blur-sm rounded-lg text-hypnotic-white hover:bg-magenta/20 transition-colors"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                    
                    {activeVideoData.isVR && (
                      <div className="bg-magenta/90 backdrop-blur-sm rounded-lg px-4 py-2">
                        <span className="text-hypnotic-white font-semibold">360° VR Experience</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}