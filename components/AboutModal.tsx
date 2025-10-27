'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, Facebook, Youtube } from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Prevent body scroll when modal is open
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

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Handle wheel event to prevent body scroll
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep-blue/90 backdrop-blur-md overflow-hidden"
          onClick={onClose}
          onWheel={(e) => e.preventDefault()}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-gradient-to-br from-hypnotic-white via-hypnotic-white to-electric-blue/10 rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-deep-blue/20 hover:bg-deep-blue/30 text-deep-blue backdrop-blur-sm transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-8 md:p-12 custom-scrollbar" style={{ scrollBehavior: 'smooth' }}>
              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                  David Aughenbaugh
                </h1>
                <p className="text-lg text-deep-blue/80 max-w-3xl mx-auto leading-relaxed">
                  (b. 1961, Arizona, USA) is an artist, using his skills as a visual effects professional and his knowledge of hypnotherapy to create images and animated works designed to have specific effects on the mental state of the viewer, characterized by quieting the thinking mind, relaxing the body and activating the creative imagination.
                </p>
                <p className="text-md text-deep-blue/70 mt-4">
                  As a visual effects artist, he was part of the team which won an <span className="font-semibold text-electric-blue">Oscar for Visual Effects</span> on the film "First Man" in 2019. He continues to use his knowledge of art and technology to create works by following his own instincts and artistic curiosity.
                </p>
              </motion.div>

              {/* Flow State Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12 bg-electric-blue/5 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-4">Flow State</h2>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  Exponential functions in math can make your brain hurt, but in art they can be transformative. I am interested in human consciousness and I create animations that use exponential growth to affect the viewer. The animations themselves are abstract, colorful and feature an infinite zoom experience, with a seemingly impossible amount of detail.
                </p>
                <p className="text-deep-blue/80 leading-relaxed">
                  The resulting effect puts the viewer into a relaxed flow state of quiet focus and immersion.
                </p>
              </motion.section>

              {/* One Step Removed Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-12 bg-neon-green/5 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-4">One Step…Removed</h2>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  Fractal mathematics seems to be integral to nature. It can be found everywhere, in the unfolding curve of a fern or the veins in a leaf, branching of rivers or the texture of rocks. It appears to be underneath these shapes, to inspire them, but is not directly expressed. It is interpreted, randomized, one level removed.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  It is also in our brains. Somehow we are imprinted on them. We see beauty in a fractal. We become engrossed. It's almost addictive. I am using this technology to create images that are not fractals, but also one level removed. I have developed a flexible process which I use to express my own creativity in ways that I find thrilling.
                </p>
                <p className="text-deep-blue/80 leading-relaxed">
                  Evocative of water color or acrylic paints, these digitally created images use cutting edge computer technology including artificial intelligence together with my own creativity and discernment as an artist.
                </p>
              </motion.section>

              {/* Visual Effects and Hypnotherapy Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-12 bg-magenta/5 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-4">Visual Effects and Hypnotherapy</h2>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  As an artist, photographer and musician living in Berkeley California, my interest in human consciousness and trance states led me to study hypnotherapy. Combining these interests my work now focuses on how visuals and sound can be used intentionally to affect the viewer's mental state. Flow states are of particular interest.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  This work builds upon my previous work as an animator and visual effects artist for film, television and games, where my achievements include an Oscar in 2019 for "First Man" as part of the visual effects team, and working on the first VR film to be nominated for an Oscar with "Pearl" in 2017. Operating near the cutting edge of technology, my experience includes computer animation for TV in the 1980's, and streaming video on the web in the 1990's. I was an early adopter utilizing AI as a tool in my artistic practice beginning in 2021.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  I was raised by a photographer. My artistic vision developed early, being raised in a home where every vacation centered on photography, and slide-show critique sessions were a daily part of life.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  Later I became interested in working with extremely large, stitched photographic images. By stitching together many source images, I could create a single photograph large enough to be printed the size of a wall, and still have full detail. With an image like that, viewers are encouraged to approach the image and get lost in the detail. It's that 'getting lost' part that attracted me.
                </p>
                <p className="text-deep-blue/80 leading-relaxed">
                  That work evolved, became abstract, and somehow with literal meaning stripped away, became more potent, and it has grown from there. When I started animating these images, my hypnotherapy training allowed me to see the effect it was having.
                </p>
              </motion.section>

              {/* Experience Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-12 bg-electric-blue/5 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-4">Experience</h2>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  In addition to giving people an enjoyable experience of art, I seek to help people experience a flow state. We are all familiar with flow states, but they can be elusive. My work encourages people to pay attention to their mental states, and facilitates present-moment awareness.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  This is subtle, however…The viewer need not think about it.
                </p>
                <p className="text-sm text-deep-blue/60 italic">
                  I do not use text prompts, and the AI was not trained on other artist's work. No animals were harmed. All pixels were sustainably sourced.
                </p>
              </motion.section>

              {/* Footer with Social Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-8 border-t border-deep-blue/20"
              >
                <p className="text-deep-blue/80 mb-2">David Aughenbaugh</p>
                <p className="text-deep-blue/60 mb-6">Berkeley, California</p>
                
                <div className="flex justify-center space-x-6">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/eyetripimages/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gradient-to-r from-electric-blue to-magenta text-hypnotic-white hover:shadow-lg transition-shadow"
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/dav.aughenbaugh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gradient-to-r from-electric-blue to-neon-green text-hypnotic-white hover:shadow-lg transition-shadow"
                  >
                    <Facebook size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="http://www.youtube.com/@EyeTripImages"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gradient-to-r from-magenta to-electric-blue text-hypnotic-white hover:shadow-lg transition-shadow"
                  >
                    <Youtube size={24} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
