'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function FeaturedTestimonial() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Opening Quote Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-gradient-to-br from-magenta to-electric-blue p-4 rounded-full">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Testimonial Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-hypnotic-white leading-relaxed mb-12 italic"
          >
            "Your work is offering aesthetic experiences that are creating neuromodulation in some really interesting ways."
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="inline-block">
              <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-magenta to-electric-blue bg-clip-text text-transparent mb-2">
                Susan Magsamen
              </p>
              <p className="text-lg text-hypnotic-white/70">
                Co-author of <span className="italic">Your Brain on Art: How the Arts Transform Us</span>
              </p>
            </div>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 h-px bg-gradient-to-r from-transparent via-magenta to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
