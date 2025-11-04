'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Award, Film, Gamepad2, Newspaper } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/assetPath'

interface PressModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PressModal({ isOpen, onClose }: PressModalProps) {
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
                  Press & Recognition
                </h1>
                <p className="text-lg text-deep-blue/80 max-w-3xl mx-auto leading-relaxed">
                  David Aughenbaugh's work spans film, television, games, and immersive art installations
                </p>
              </motion.div>

              {/* World Within Worlds Installation */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12 bg-magenta/5 rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  <Newspaper size={28} className="text-magenta mr-3" />
                  <h2 className="text-3xl font-bold text-deep-blue">World Within Worlds Installation</h2>
                </div>
                
                {/* Escondido Installation Video */}
                <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-lg bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/sgsqatF1MvE"
                    title="World Within Worlds - Escondido Installation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  <strong>Worlds within worlds</strong> is an immersive art project by David Aughenbaugh, including music by various artists. It is a presentation of original abstract animation in open public space, using projection and custom screens. The work is designed to have specific effects on the viewer's mental state, quieting the thinking mind and promoting a flow state of active imagination.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  <strong>Location:</strong> North County Mall, 272 E Via Rancho Pkwy, Escondido, CA 92025 – lower level
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  This is a permanent installation, funded through a major grant from the Escondido Community Foundation. It is in a public space in the North County Mall, allowing people to discover it spontaneously.
                </p>
                <div className="mt-6">
                  <a
                    href="https://escondidocommunityfoundation.org/public-art/world-within-worlds/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-electric-blue hover:text-magenta transition-colors font-semibold"
                  >
                    <span>Read More at Escondido Community Foundation</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.section>

              {/* Instagram Posts Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mb-12 bg-electric-blue/5 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-6">Recent Updates</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Instagram Post 1 */}
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-deep-blue/70 font-semibold">Installation Showcase</p>
                      <a
                        href="https://www.instagram.com/p/DNy1RKMYjzh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-magenta hover:text-electric-blue transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <iframe
                      src="https://www.instagram.com/p/DNy1RKMYjzh/embed"
                      width="100%"
                      height="500"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      className="rounded-lg"
                    />
                  </div>

                  {/* Instagram Post 2 */}
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-deep-blue/70 font-semibold">Behind the Scenes</p>
                      <a
                        href="https://www.instagram.com/p/DGi6E1mv8x1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-magenta hover:text-electric-blue transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <iframe
                      src="https://www.instagram.com/p/DGi6E1mv8x1/embed"
                      width="100%"
                      height="500"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      className="rounded-lg"
                    />
                  </div>
                </div>

                {/* Instagram Reel */}
                <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-deep-blue/70 font-semibold">Installation Experience</p>
                    <a
                      href="https://www.instagram.com/reel/DG1pxo3y_cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-magenta hover:text-electric-blue transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <iframe
                    src="https://www.instagram.com/reel/DG1pxo3y_cl/embed"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency
                    className="rounded-lg"
                  />
                </div>
              </motion.section>

              {/* Gray Area Residency */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-12 bg-neon-green/5 rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  <Award size={28} className="text-neon-green mr-3" />
                  <h2 className="text-3xl font-bold text-deep-blue">Gray Area Arts & Technology</h2>
                </div>
                
                {/* Gray Area SF Installation Video */}
                <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-lg bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/HP7PfdBBQbs"
                    title="Gray Area San Francisco Installation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  <strong>Cultural Incubator Resident - 2023</strong>
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  David Aughenbaugh was part of Gray Area's Cultural Incubator Program, a creative accelerator that propels interdisciplinary creators through strategic mentorship, hands-on professional development, and collaborative support. During his residency, he created a temporary 360º wrap-around projection screen installation as a proof-of-concept for custom projection screens.
                </p>
                <p className="text-deep-blue/80 leading-relaxed mb-4">
                  The overhead circular screen allows many people to experience an immersive version of the animation simultaneously. This allows viewers to spend time focused on the experience if they choose, or simply pass through, making it accessible in high traffic areas.
                </p>
                <div className="mt-6">
                  <a
                    href="https://grayarea.org/create/cultural-incubator/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-electric-blue hover:text-neon-green transition-colors font-semibold"
                  >
                    <span>Learn More About Gray Area</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.section>

              {/* Film & Television Credits */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mb-12 bg-electric-blue/5 rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <Film size={28} className="text-electric-blue mr-3" />
                  <h2 className="text-3xl font-bold text-deep-blue">Film & Television</h2>
                </div>
                
                <div className="mb-6 p-6 bg-gradient-to-r from-magenta/10 to-electric-blue/10 rounded-lg border-l-4 border-magenta">
                  <div className="flex items-start space-x-4">
                    <Award size={32} className="text-magenta flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-deep-blue mb-2">Academy Award Winner</h3>
                      <p className="text-deep-blue/80 leading-relaxed">
                        <strong>First Man (2018)</strong> - Oscar for Best Visual Effects as part of the visual effects team
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-6 bg-gradient-to-r from-neon-green/10 to-electric-blue/10 rounded-lg border-l-4 border-neon-green">
                  <div className="flex items-start space-x-4">
                    <Award size={32} className="text-neon-green flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-deep-blue mb-2">VR Pioneer</h3>
                      <p className="text-deep-blue/80 leading-relaxed">
                        <strong>Pearl (2016)</strong> - Lighting artist for the first VR film nominated for an Academy Award
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-deep-blue mb-3">Selected Credits:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Atlas (2024)',
                      'The Out-Laws (2023)',
                      'The Machine (2023)',
                      'Echo 3 (2022-2023)',
                      'Day Shift (2022)',
                      'The Captain (2019)',
                      'Bad Times at the El Royale (2018)',
                      'The Mummy (2017)',
                      'The Fate of the Furious (2017)',
                      'Fences (2016)',
                      'Central Intelligence (2016)',
                      'Ride Along 2 (2016)',
                      'Sisters (2015)',
                      'The Darkest Hour (2011)',
                      '2012 (2009)'
                    ].map((credit, index) => (
                      <div key={index} className="flex items-center space-x-2 text-deep-blue/70">
                        <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                        <span className="text-sm">{credit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="https://www.imdb.com/name/nm1879698/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-electric-blue hover:text-magenta transition-colors font-semibold"
                  >
                    <span>Full IMDb Profile</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.section>

              {/* Video Game Industry */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-12 bg-magenta/5 rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <Gamepad2 size={28} className="text-magenta mr-3" />
                  <h2 className="text-3xl font-bold text-deep-blue">Video Game Industry</h2>
                </div>

                <p className="text-deep-blue/80 leading-relaxed mb-6">
                  David Aughenbaugh served seven years in the computer games industry as an animator and digital video specialist at <strong>Dynamix/Sierra On-Line</strong> from 1992 to 1999. 
                </p>

                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-semibold text-deep-blue mb-3">Notable Game Credits:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Ghostbusters: The Video Game (2009, 2019 Remaster)',
                      'Empire Earth II (2005)',
                      'Starsiege (1999)',
                      'Gabriel Knight 3 (1999)',
                      'Cyberstorm 2: Corporate Wars (1998)',
                      'Viper Racing (1998)',
                      '3-D Ultra Pinball Series',
                      'Front Page Sports Series',
                      'Earthsiege / Earthsiege 2',
                      'MissionForce: CyberStorm (1996)',
                      'Rama (1996)',
                      'Metaltech: Earthsiege (1994)',
                      'Betrayal at Krondor (1993)',
                      'Space Quest V (1993)',
                      'The Adventures of Willy Beamish (1993)'
                    ].map((credit, index) => (
                      <div key={index} className="flex items-center space-x-2 text-deep-blue/70">
                        <div className="w-2 h-2 bg-magenta rounded-full"></div>
                        <span className="text-sm">{credit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-deep-blue/70 text-sm italic mb-6">
                  "David Aughenbaugh served seven years in the computer games industry as an animator and digital video specialist. He escaped in 1999 to pursue a career as a papaya farmer, but ended up working on computer games, just without the benefits package." - MobyGames
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.mobygames.com/person/4315/david-aughenbaugh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-electric-blue hover:text-magenta transition-colors font-semibold"
                  >
                    <span>MobyGames Profile</span>
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://dynamix.fandom.com/wiki/David_Aughenbaugh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-electric-blue hover:text-magenta transition-colors font-semibold"
                  >
                    <span>Dynamix Wiki</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.section>

              {/* Career Highlights */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mb-12 bg-neon-green/5 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-6">Career Timeline</h2>
                
                <div className="space-y-4">
                  {[
                    { year: '2024', event: 'World Within Worlds - Permanent Installation, Escondido, CA' },
                    { year: '2023', event: 'Gray Area Cultural Incubator Resident, San Francisco, CA' },
                    { year: '2019', event: 'Academy Award for First Man - Best Visual Effects' },
                    { year: '2018', event: 'Founded Eye Trip Images' },
                    { year: '2017', event: 'Pearl - First VR Film Nominated for Oscar' },
                    { year: '2015', event: 'NASA Ames Research Center - Animation for Airspace Relationships' },
                    { year: '2014-Present', event: 'Factory VFX - Senior Compositor' },
                    { year: '2009-2011', event: 'PDI/Dreamworks' },
                    { year: '2000-2005', event: 'Papaya Farmer & Freelance Work' },
                    { year: '1992-1999', event: 'Dynamix/Sierra On-Line - Animator & Digital Video Specialist' },
                    { year: '1989-1991', event: 'American Film Technologies - Animator' },
                    { year: '1985', event: ' Sculpture, San Diego State University' },
                    { year: '1979', event: 'Escondido High School' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 border-l-2 border-electric-blue/30 pl-4 hover:border-magenta/50 transition-colors">
                      <span className="text-electric-blue font-bold min-w-[60px]">{item.year}</span>
                      <p className="text-deep-blue/80">{item.event}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Footer Note */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-8 border-t border-deep-blue/20"
              >
                <p className="text-sm text-deep-blue/60 italic mb-2">
                  "Father (Byron Aughenbaugh) was a professional photographer, specializing in lightning photography."
                </p>
                <p className="text-sm text-deep-blue/60">
                  For press inquiries and more information, visit{' '}
                  <a
                    href="https://eyetripimages.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-blue hover:text-magenta transition-colors underline"
                  >
                    eyetripimages.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
