'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/assetPath'
import ImageLightbox from './ImageLightbox'

interface PhilosophyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: 'wonder' | 'power' | 'seeit'
}

const modalContent = {
  wonder: {
    sections: [
      {
        title: 'Wonder, Curiosity and Awe',
        image: 'wonder_curiosity_awe.jpg',
        content: [
          'Following my own curiosity as an artist I discovered an area of work which overlapped another fascination: consciousness and mental states.',
          'It feels like a discovery as much as a creation. Enormous and rich with possibilities, somehow it feels important, like it wants to exist. When I start exploring, every answer raises six more questions.'
        ]
      },
      {
        title: 'How Could I Not Pursue This?',
        content: [
          'I have always been an artist and musician, with broad interests in science and technology. Relatively late in life I took a course in hypnotherapy, eventually becoming certified as a clinical hypnotherapist. I couldn\'t have imagined that these things would all come into play at the same time.'
        ]
      },
      {
        title: 'The Work',
        content: [
          'I developed a style of animation that appears to have a distinct effect on the viewer – that of quieting the thinking mind and promoting a flow state of focused attention and creativity.',
          'The animation itself is abstract and colorful, with imagery that is intentionally evocative of familiar things, without ever being explicit. The images emerge through an infinite zoom experience with a seemingly impossible amount of detail.'
        ]
      },
      {
        title: 'The Surrealists',
        content: [
          'said that art functions automatically on a subconscious level. The animations I create are designed to function directly. They avoid anything literal, anything that could be called "meaning" because that kind of interpretation occurs in the thinking part of the brain.',
          'The mind wants to sort and categorize and label. The constant flow of new imagery is more than the mind can capture. Here there is nothing to grab onto. So it sort of overflows. Eventually the mind gives up and goes quiet. This leaves you in a pleasant state, alert but relaxed. Your creative mind is activated and grounded in present-moment awareness. Creativity and inspired problem-solving always occur in some version of this state. For example many people have reported getting their breakthrough ideas while in the shower.'
        ]
      }
    ]
  },
  power: {
    sections: [
      {
        title: 'The crossroads of science, the arts, and technology',
        image: 'power_mycocosm2.jpg',
        content: [
          'Your Brain on Art • NEW YORK TIMES BESTSELLER • A life-altering journey through the science of neuroaesthetics, which offers proof for how our brains and bodies transform when we participate in the arts—and how this knowledge can improve our health, enable us to flourish, and build stronger communities.',
          'I contacted the authors Susan Magsamen and Ivy Ross and told them about my work. Magsamen is in leadership of something called The NeuroArts Blueprint Initiative and she suggested I get involved, and so I did! Here is a description from the website: "Neuroarts is the transdisciplinary study of how the arts and aesthetic experiences measurably change the body, brain, and behavior and how this knowledge is translated into specific practices that advance health and wellbeing."',
          'I am creating animation that is subjectively attractive, but has a deeper function that viewers may recognize. This work is grounded in a long history of art and science that are coming together in ways that are both new, and as old as fire, with humans gathering around it to dance.'
        ]
      }
    ]
  },
  seeit: {
    sections: [
      {
        title: 'Now That You See It',
        image: 'wavehands_orig.jpg',
        content: [
          'I made a drawing in charcoal of the famous wave scene by Hokusai. Everyone has seen some version of this image. As I was looking at my drawing, I saw something that made me laugh. All the little curly wave bits look like Charlie Brown\'s fingers!',
          'Compare my drawing with the Peanuts characters below. See it?',
          'Now that I have seen this, I can\'t look at my drawing without seeing it.',
          'Everyone\'s brain wants to make sense out of what you are seeing, and as soon as you are given a suggestion, your brain fills in the blanks. You can\'t help it.',
          'Have you ever been wine tasting? You know that experience of not quite being able to identify what you are tasting and then the sommelier gives you a word for it. "Yes, that\'s it!" "Raspberries!" or "Vanilla!". Once you have a word for it, you zero in on it with a "Yes!" It is very satisfying, and once you have identified it, you can\'t miss it.',
          'I was at the opening of my show last week, and someone pointed out something in one of my images. "I see a horse head". Once they pointed it out, I could see it very clearly. Now that horse head is part of the image, forever. I can\'t ever un-see it.',
          'That\'s not a bad thing. People find all kinds of things in my images, and I think that is part of why they like them. Just like the wine tasting moment, it is a satisfying experience. Now they have a connection to the image. They created something, and they feel a special kind of ownership.',
          'It also deepens the image for me. I look at the image and I see the horse head, or the gnome face or whatever it is, and I think of the person who pointed it out. I would call that a win-win.'
        ]
      }
    ]
  }
}

export default function PhilosophyModal({ isOpen, onClose, title, content }: PhilosophyModalProps) {
  const contentData = modalContent[content]
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<any>(null)

  const openLightbox = (image: string, imageTitle: string) => {
    setLightboxImage({
      id: 'philosophy-image',
      src: getImagePath(image),
      title: imageTitle,
    })
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

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
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                  {title}
                </h1>
              </motion.div>

              {/* Content Sections */}
              {contentData.sections.map((section, idx) => (
                <motion.section
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="mb-8 bg-electric-blue/5 rounded-xl p-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                    {section.title}
                  </h2>
                  {'image' in section && section.image && (
                    <div 
                      className="relative w-full h-96 mb-6 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                      onClick={() => openLightbox(section.image!, section.title)}
                    >
                      <Image
                        src={getImagePath(section.image)}
                        alt={section.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Zoom indicator overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <ZoomIn className="w-8 h-8 text-deep-blue" />
                        </div>
                      </div>
                    </div>
                  )}
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-deep-blue/80 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </motion.section>
              ))}
            </div>
          </motion.div>

          {/* Lightbox */}
          {lightboxImage && (
            <ImageLightbox
              images={[lightboxImage]}
              currentIndex={0}
              isOpen={lightboxOpen}
              onClose={closeLightbox}
              onNext={() => {}}
              onPrevious={() => {}}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
