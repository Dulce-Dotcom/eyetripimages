'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Camera, Zap, Palette, Layers, Home, Mountain } from 'lucide-react'

const navigationItems = [
  { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
  { id: 'immersive', label: '3D Experience', icon: Mountain, href: '#immersive' },
  { id: 'animation', label: 'Animation', icon: Layers, href: '#animation' },
  { id: 'images', label: 'Images', icon: Camera, href: '#images' },
  { id: 'gigapixel', label: 'Gigapixel', icon: Layers, href: '#gigapixel' },
  { id: 'lightning', label: 'Lightning', icon: Zap, href: '#lightning' },
  { id: 'photography', label: 'Photography', icon: Palette, href: '#photography' }
]

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll-based visibility and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide/show header based on scroll direction
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)

      // Detect active section
      const sections = navigationItems.map(item => ({
        ...item,
        element: document.querySelector(item.href) || document.querySelector(`[data-section="${item.id}"]`)
      }))

      let currentSection = 'hero'
      sections.forEach(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section.id
          }
        }
      })
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Smooth scroll to section
  const scrollToSection = (href: string, sectionId: string) => {
    const element = document.querySelector(href) || document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-hypnotic-white/10 backdrop-blur-md border-b border-hypnotic-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
              style={{ opacity: 1 }} // Fallback for static builds
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold gradient-text cursor-pointer"
                onClick={() => scrollToSection('#hero', 'hero')}
              >
                EyeTrip
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href, item.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-electric-blue to-neon-green text-hypnotic-white' 
                        : 'text-hypnotic-white/70 hover:text-hypnotic-white hover:bg-hypnotic-white/10'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span className="hidden lg:block">{item.label}</span>
                  </motion.button>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-hypnotic-white hover:bg-hypnotic-white/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-deep-blue/80 backdrop-blur-sm"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute right-0 top-16 bottom-0 w-80 bg-hypnotic-white/95 backdrop-blur-lg border-l border-hypnotic-white/20"
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id
                    
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 4 }}
                        onClick={() => scrollToSection(item.href, item.id)}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-r from-electric-blue to-neon-green text-hypnotic-white' 
                            : 'text-deep-blue hover:bg-electric-blue/10'
                          }
                        `}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    )
                  })}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-deep-blue/20">
                  <p className="text-sm text-deep-blue/60 text-center">
                    Navigate through David's visual journey
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}