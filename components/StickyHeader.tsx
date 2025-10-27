'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Camera, Zap, Palette, Layers, Home, Mountain, User, Lightbulb, ChevronDown, Sparkles, Eye, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import AboutModal from './AboutModal'
import PhilosophyModal from './PhilosophyModal'

const navigationStructure = [
  { id: 'home', label: 'Home', icon: Home, href: '#hero', type: 'link' as const },
  {
    id: 'main',
    label: 'Main',
    icon: Layers,
    type: 'dropdown' as const,
    items: [
      { id: 'immersive', label: 'Immersive', icon: Mountain, href: '#immersive' },
      { id: 'animation', label: 'Animation', icon: Layers, href: '#animation' },
      { id: 'images', label: 'Images', icon: Camera, href: '#images' },
      { id: 'gigapixel', label: 'Gigapixel', icon: Layers, href: '#gigapixel' },
      { id: 'lightning', label: 'Lightning', icon: Zap, href: '#lightning' },
      { id: 'photography', label: 'Photography', icon: Palette, href: '#photography' }
    ]
  },
  {
    id: 'whatitmeans',
    label: 'What It Means',
    icon: Lightbulb,
    href: '#whatitmeans',
    type: 'dropdown' as const,
    items: [
      { id: 'wonder', label: 'Wonder, Curiosity and Awe', icon: Sparkles, modalType: 'wonder' },
      { id: 'power', label: 'Power to Transform', icon: Lightbulb, modalType: 'power' },
      { id: 'seeit', label: 'Now That You See It', icon: Eye, modalType: 'seeit' }
    ]
  },
  { id: 'about', label: 'About', icon: User, type: 'modal' as const },
  { id: 'eyetripvr', label: 'EyeTripVR', icon: ExternalLink, href: 'https://eyetripvr.com', type: 'external' as const }
]

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [philosophyModal, setPhilosophyModal] = useState<'wonder' | 'power' | 'seeit' | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Always show at top of page
          if (currentScrollY < 100) {
            setIsVisible(true)
          }
          // Show when scrolling up (current position is less than last position)
          else if (currentScrollY < lastScrollY) {
            setIsVisible(true)
          }
          // Hide when scrolling down
          else if (currentScrollY > lastScrollY) {
            setIsVisible(false)
          }
          
          setLastScrollY(currentScrollY)
          
          // Also show header when user stops scrolling
          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            setIsVisible(true)
          }, 200) // Show header 200ms after scrolling stops
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [lastScrollY])

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null)
    if (activeDropdown) {
      window.addEventListener('click', handleClickOutside)
      return () => window.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
      setActiveDropdown(null)
    }
  }

  const handleNavClick = (item: any) => {
    if (item.type === 'link') scrollToSection(item.href)
    else if (item.type === 'modal') { setIsAboutOpen(true); setIsMenuOpen(false) }
    else if (item.type === 'external') { window.open(item.href, '_blank'); setIsMenuOpen(false) }
    else if (item.type === 'dropdown' && item.href) scrollToSection(item.href)
  }

  const handleSubItemClick = (subItem: any) => {
    if (subItem.modalType) {
      setPhilosophyModal(subItem.modalType)
      setIsMenuOpen(false)
      setActiveDropdown(null)
    } else if (subItem.href) scrollToSection(subItem.href)
  }

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-hypnotic-white/10 backdrop-blur-md border-b border-hypnotic-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2" style={{ opacity: 1 }}>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="cursor-pointer relative h-8 w-24"
                onClick={() => scrollToSection('#hero')}
              >
                <Image
                  src="/images/eyetripvr-logo3.svg"
                  alt="EyeTrip Logo"
                  fill
                  className="object-contain filter brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  priority
                />
              </motion.div>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationStructure.map((item) => {
                const Icon = item.icon
                if (item.type === 'dropdown') {
                  return (
                    <div key={item.id} className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (item.href) scrollToSection(item.href)
                          setActiveDropdown(activeDropdown === item.id ? null : item.id)
                        }}
                        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-200 text-hypnotic-white/70 hover:text-hypnotic-white hover:bg-hypnotic-white/10"
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                        <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                      </motion.button>
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-hypnotic-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-hypnotic-white/20 overflow-hidden"
                          >
                            {item.items?.map((subItem) => {
                              const SubIcon = subItem.icon
                              return (
                                <motion.button
                                  key={subItem.id}
                                  whileHover={{ x: 4, backgroundColor: 'rgba(0, 238, 255, 0.1)' }}
                                  onClick={() => handleSubItemClick(subItem)}
                                  className="w-full flex items-center space-x-3 px-4 py-3 text-left text-deep-blue hover:bg-electric-blue/10 transition-all duration-200"
                                >
                                  <SubIcon size={18} />
                                  <span className="text-sm font-sans font-medium">{subItem.label}</span>
                                </motion.button>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-200 text-hypnotic-white/70 hover:text-hypnotic-white hover:bg-hypnotic-white/10"
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    {item.type === 'external' && <ExternalLink size={12} />}
                  </motion.button>
                )
              })}
            </nav>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-hypnotic-white hover:bg-hypnotic-white/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-deep-blue/80 backdrop-blur-sm" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute right-0 top-16 bottom-0 w-80 bg-hypnotic-white/95 backdrop-blur-lg border-l border-hypnotic-white/20 overflow-y-auto"
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {navigationStructure.map((item) => {
                    const Icon = item.icon
                    if (item.type === 'dropdown') {
                      return (
                        <div key={item.id} className="space-y-1">
                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => {
                              if (item.href) scrollToSection(item.href)
                              setActiveDropdown(activeDropdown === item.id ? null : item.id)
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 text-deep-blue hover:bg-electric-blue/10 font-sans font-bold"
                          >
                            <div className="flex items-center space-x-3">
                              <Icon size={20} />
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                          </motion.button>
                          <AnimatePresence>
                            {activeDropdown === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-4 pl-4 border-l-2 border-electric-blue/30 space-y-1 overflow-hidden"
                              >
                                {item.items?.map((subItem) => {
                                  const SubIcon = subItem.icon
                                  return (
                                    <motion.button
                                      key={subItem.id}
                                      whileHover={{ x: 4 }}
                                      onClick={() => handleSubItemClick(subItem)}
                                      className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-all duration-200 text-deep-blue/80 hover:bg-electric-blue/10 text-sm font-sans"
                                    >
                                      <SubIcon size={16} />
                                      <span>{subItem.label}</span>
                                    </motion.button>
                                  )
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    }
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 4 }}
                        onClick={() => handleNavClick(item)}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-deep-blue hover:bg-electric-blue/10 font-sans font-medium"
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                        {item.type === 'external' && <ExternalLink size={16} />}
                      </motion.button>
                    )
                  })}
                </nav>
                <div className="mt-8 pt-6 border-t border-deep-blue/20">
                  <p className="text-sm font-sans text-deep-blue/60 text-center">Navigate through David's visual journey</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <PhilosophyModal isOpen={philosophyModal === 'wonder'} onClose={() => setPhilosophyModal(null)} title="Wonder, Curiosity and Awe" content="wonder" />
      <PhilosophyModal isOpen={philosophyModal === 'power'} onClose={() => setPhilosophyModal(null)} title="Power to Transform" content="power" />
      <PhilosophyModal isOpen={philosophyModal === 'seeit'} onClose={() => setPhilosophyModal(null)} title="Now That You See It" content="seeit" />
    </>
  )
}
