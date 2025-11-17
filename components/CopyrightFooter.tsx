'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Mail, Copyright } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/assetPath'

export default function CopyrightFooter() {
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState(2025)

  useEffect(() => {
    setMounted(true)
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-deep-blue via-dark-grey to-hypnotic-white border-t border-hypnotic-white/20"
      style={{ opacity: 1 }} // Fallback for static builds
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
            style={{ opacity: 1, transform: 'translateY(0px)' }} // Fallback for static builds
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="relative h-8 w-32"
              >
                <Image
                  src={getImagePath("eyetripimages-wide.svg")}
                  alt="EyeTrip Images Logo"
                  fill
                  className="object-contain filter brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  priority
                />
              </motion.div>
            </div>
            <p className="text-hypnotic-white/70 text-sm leading-relaxed">
              Exploring the intersection of art, technology, and human perception through 
              immersive visual experiences and cutting-edge presentations.
            </p>
          </motion.div>

          {/* Artist Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
            style={{ opacity: 1, transform: 'translateY(0px)' }} // Fallback for static builds
          >
            <h4 className="text-lg font-semibold text-hypnotic-white">Artist</h4>
            <div className="space-y-2 text-sm">
              <p className="text-hypnotic-white/70">
                <span className="font-medium text-hypnotic-white">David Aughenbaugh</span>
                <br />
                Visual Artist & Photographer
              </p>
              <div className="flex items-center space-x-2 text-hypnotic-white/60">
                <Globe size={14} />
                <span>Arizona, USA</span>
              </div>
              <div className="flex items-center space-x-2 text-hypnotic-white/60">
                <Mail size={14} />
                <span>eyetripimages.com</span>
              </div>
            </div>
          </motion.div>

          {/* Technology & Methods */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
            style={{ opacity: 1, transform: 'translateY(0px)' }} // Fallback for static builds
          >
            <h4 className="text-lg font-semibold text-hypnotic-white">Techniques</h4>
            <div className="space-y-2 text-sm text-hypnotic-white/70">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-electric-blue/20 rounded-lg text-xs">Gigapixel Stitching</span>
                <span className="px-2 py-1 bg-neon-green/20 rounded-lg text-xs">Lightning Photography</span>
                <span className="px-2 py-1 bg-vibrant-purple/20 rounded-lg text-xs">3D Visualization</span>
                <span className="px-2 py-1 bg-hypnotic-pink/20 rounded-lg text-xs">Abstract Textures</span>
                <span className="px-2 py-1 bg-electric-blue/20 rounded-lg text-xs">Neuroaesthetics</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-hypnotic-white/20"
          style={{ opacity: 1, transform: 'translateY(0px)' }} // Fallback for static builds
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-hypnotic-white/60">
              <Copyright size={16} />
              <span>
                {currentYear} David Aughenbaugh - EyeTrip Images. All rights reserved.
              </span>
            </div>
          </div>

          {/* Legal Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-xs text-hypnotic-white/40 text-center md:text-left"
            style={{ opacity: 1 }} // Fallback for static builds
          >
            <p>
              All photographs and artwork are original creations by the artist. 
              Unauthorized reproduction or distribution is prohibited. 
              For licensing inquiries, please contact eyetripimages.com.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
