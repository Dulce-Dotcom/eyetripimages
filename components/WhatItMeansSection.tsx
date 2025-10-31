'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Lightbulb } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/assetPath'
import PhilosophyModal from './PhilosophyModal'

export default function WhatItMeansSection() {
  const [activeModal, setActiveModal] = useState<'wonder' | 'power' | 'seeit' | null>(null)

  const cards = [
    {
      id: 'wonder',
      title: 'Wonder, Curiosity and Awe',
      description: 'Following curiosity as an artist, discovering work that overlaps with consciousness and mental states',
      icon: Sparkles,
      gradient: 'from-electric-blue to-neon-green'
    },
    {
      id: 'power',
      title: 'Power to Transform',
      description: 'Neuroaesthetics and the science of how art transforms our brains, bodies, and behavior',
      icon: Lightbulb,
      gradient: 'from-magenta to-electric-blue'
    },
    {
      id: 'seeit',
      title: 'Now That You See It',
      description: 'How the brain makes meaning, creates connections, and claims ownership of discoveries',
      icon: 'custom-eye',
      gradient: 'from-neon-green to-magenta'
    }
  ]

  return (
    <section id="whatitmeans" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-blue via-deep-blue to-black" />
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 w-96 h-96 bg-electric-blue rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-magenta rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            What It Means
          </h2>
          <p className="text-hypnotic-white/70 text-xl max-w-3xl mx-auto">
            Exploring the intersection of art, consciousness, and transformation
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, idx) => {
            const Icon = typeof card.icon === 'string' ? null : card.icon
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal(card.id as 'wonder' | 'power' | 'seeit')}
                className="group relative bg-gradient-to-br from-hypnotic-white/10 to-hypnotic-white/5 backdrop-blur-sm rounded-2xl p-8 border border-hypnotic-white/20 hover:border-hypnotic-white/40 transition-all duration-300"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mb-6 mx-auto rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                >
                  {Icon ? (
                    <Icon size={32} className="text-deep-blue" />
                  ) : (
                    <Image
                      src={getImagePath("eyetripvr-iconb.svg")}
                      alt="Eye Icon"
                      width={48}
                      height={48}
                    />
                  )}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-hypnotic-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-hypnotic-white/70 leading-relaxed">
                  {card.description}
                </p>

                {/* Hover Effect - Corner Accent */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${card.gradient} opacity-20 rounded-tl-full blur-2xl -z-10`}
                />

                {/* Click Indicator */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 text-hypnotic-white/50 text-sm"
                >
                  Click to explore →
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Modals */}
      <PhilosophyModal
        isOpen={activeModal === 'wonder'}
        onClose={() => setActiveModal(null)}
        title="Wonder, Curiosity and Awe"
        content="wonder"
      />
      <PhilosophyModal
        isOpen={activeModal === 'power'}
        onClose={() => setActiveModal(null)}
        title="Power to Transform"
        content="power"
      />
      <PhilosophyModal
        isOpen={activeModal === 'seeit'}
        onClose={() => setActiveModal(null)}
        title="Now That You See It"
        content="seeit"
      />
    </section>
  )
}
