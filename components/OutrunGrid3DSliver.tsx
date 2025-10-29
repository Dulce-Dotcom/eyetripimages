'use client'

import React, { useRef, useEffect, useState } from 'react'
import { getImagePath } from '@/lib/assetPath'

const ICON_PATHS = [
  getImagePath('eyetripvr-iconb.svg'),
  getImagePath('eyetripvr-icong.svg'),
  getImagePath('eyetripvr-iconp.svg'),
  getImagePath('eyetripvr-icony.svg')
]

export default function OutrunGrid3DSliver() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)
  const iconsRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = 200
    canvas.width = width
    canvas.height = height

    let scrollY = 0
    let lastScrollY = 0
    let ticking = false

    // Load all SVG images
    iconsRef.current = ICON_PATHS.map(path => {
      const img = new Image()
      img.src = path
      return img
    })

    // Draw the grid with perspective and waves
    function drawGrid() {
      if (!ctx || !canvas) return

      // Get current dimensions
      width = canvas.width
      height = canvas.height

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#0a0020')
      gradient.addColorStop(0.5, '#1a0a40')
      gradient.addColorStop(1, '#2a0a60')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      const gridSpacing = 40
      const perspectiveDepth = 15
      const horizonY = height * 0.4

      // Draw horizontal lines (going into distance)
      for (let i = 0; i < perspectiveDepth; i++) {
        const depth = i / perspectiveDepth
        const y = horizonY + (height - horizonY) * depth
        const scale = 0.3 + depth * 0.7
        
        // Wave calculation based on scroll only
        const wave = Math.sin(i * 0.3 + scrollY * 0.02) * 20 * scale
        const adjustedY = y + wave

        // Alternating colors for outrun aesthetic
        ctx.strokeStyle = i % 2 === 0 ? '#ff00ff' : '#00ffff'
        ctx.lineWidth = 2 * scale
        ctx.globalAlpha = 0.3 + depth * 0.5

        ctx.beginPath()
        ctx.moveTo(width * (0.5 - scale * 0.6), adjustedY)
        ctx.lineTo(width * (0.5 + scale * 0.6), adjustedY)
        ctx.stroke()
      }

      // Draw vertical lines
      for (let i = -8; i <= 8; i++) {
        ctx.strokeStyle = i % 2 === 0 ? '#ff00ff' : '#00ffff'
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.4

        ctx.beginPath()
        const xTop = width * 0.5 + i * 15
        const xBottom = width * 0.5 + i * 60
        
        ctx.moveTo(xTop, horizonY)
        ctx.lineTo(xBottom, height)
        ctx.stroke()
      }

      // Draw all 4 icons in a row, responsive sizing
      const icons = iconsRef.current
      if (icons.length > 0 && icons.every(img => img.complete)) {
        ctx.globalAlpha = 1
        
        // Responsive icon sizing
        const isMobile = width < 640
        const isTablet = width >= 640 && width < 1024
        
        let iconSize: number
        let spacing: number
        
        if (isMobile) {
          // Mobile: smaller icons, tighter spacing
          iconSize = Math.min(height * 0.7, width * 0.18)
          spacing = iconSize * 0.3
        } else if (isTablet) {
          // Tablet: medium icons
          iconSize = Math.min(height * 0.8, width * 0.15)
          spacing = iconSize * 0.5
        } else {
          // Desktop: full height icons
          iconSize = height * 0.9
          spacing = iconSize * 0.8
        }
        
        // Calculate total width needed for all icons
        const totalWidth = (iconSize * 4) + (spacing * 3)
        const startX = (width - totalWidth) / 2
        const iconY = (height - iconSize) / 2
        
        // Draw each icon
        icons.forEach((img, index) => {
          const iconX = startX + (index * (iconSize + spacing))
          ctx.drawImage(img, iconX, iconY, iconSize, iconSize)
        })
      }

      ctx.globalAlpha = 1
    }

    // Handle scroll events with throttling
    function handleScroll() {
      lastScrollY = window.scrollY || 0
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollY = lastScrollY
          drawGrid()
          ticking = false
        })
        ticking = true
      }
    }

    // Initial draw
    Promise.all(iconsRef.current.map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(true)
        } else {
          img.onload = () => resolve(true)
        }
      })
    })).then(() => {
      drawGrid()
    })

    // Draw immediately in case images are cached
    drawGrid()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = 200
        drawGrid()
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      style={{
        width: '100vw',
        height: 200,
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Outrun 3D Grid Animation"
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </section>
  )
}
