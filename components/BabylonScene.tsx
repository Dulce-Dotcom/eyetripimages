'use client'

import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
  StandardMaterial,
  Color3
} from '@babylonjs/core'

interface BabylonSceneProps {
  scrollProgress: MotionValue<number> | number
}

export default function BabylonScene({ scrollProgress }: BabylonSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine | null>(null)
  const sceneRef = useRef<Scene | null>(null)
  const meshRef = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Create engine and scene
    const engine = new Engine(canvasRef.current, true)
    const scene = new Scene(engine)
    
    engineRef.current = engine
    sceneRef.current = scene

    // Create camera
    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      10,
      Vector3.Zero(),
      scene
    )
    camera.attachControl(canvasRef.current, true)

    // Create light
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    // Create abstract torus mesh
    const torus = MeshBuilder.CreateTorus(
      'torus',
      {
        diameter: 3,
        thickness: 0.8,
        tessellation: 32
      },
      scene
    )
    meshRef.current = torus

    // Create gradient material
    const material = new StandardMaterial('torusMaterial', scene)
    material.diffuseColor = new Color3(0.8, 0, 1) // New magenta #cd00ff
    material.specularColor = new Color3(0.004, 0.004, 0.608) // New deep blue #01019b
    material.emissiveColor = new Color3(0.02, 0.05, 0.1)
    torus.material = material

    // Create additional geometric elements
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1.5 }, scene)
    sphere.position.x = 4
    sphere.position.y = 2
    
    const sphereMaterial = new StandardMaterial('sphereMaterial', scene)
    sphereMaterial.diffuseColor = new Color3(0.004, 0.004, 0.608) // New deep blue #01019b
    sphereMaterial.emissiveColor = new Color3(0.8, 0, 1) // New magenta glow #cd00ff
    sphere.material = sphereMaterial

    // Base rotation animation
    let baseRotationY = 0
    const animate = () => {
      baseRotationY += 0.01
      if (torus) {
        torus.rotation.y = baseRotationY
        torus.rotation.x = Math.sin(baseRotationY * 0.5) * 0.3
      }
      if (sphere) {
        sphere.rotation.y = -baseRotationY * 0.7
        sphere.position.y = 2 + Math.sin(baseRotationY * 2) * 0.5
      }
    }

    // Listen to scroll progress changes
    let unsubscribe: (() => void) | undefined
    if (typeof scrollProgress === 'object' && 'on' in scrollProgress) {
      unsubscribe = scrollProgress.on('change', (value: number) => {
        if (torus && sphere && material && sphereMaterial) {
          // Use scroll progress to control rotation speed and intensity
          torus.rotation.z = value * Math.PI * 2 // Full rotation
          
          // Modify material properties based on scroll
          material.emissiveColor = new Color3(
            0.02 + (value * 0.3), // Red increases with scroll
            0.05 + (value * 0.2), // Green increases slightly
            0.1 + (value * 0.4)   // Blue increases more
          )
          
          sphereMaterial.emissiveColor = new Color3(
            0.6 + (value * 0.4),
            value * 0.3,
            0.4 + (value * 0.6)
          )
        }
      })
    }

    // Start render loop
    engine.runRenderLoop(() => {
      animate()
      scene.render()
    })

    // Handle resize
    const handleResize = () => {
      engine.resize()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
      window.removeEventListener('resize', handleResize)
      
      if (engineRef.current) {
        engineRef.current.dispose()
        engineRef.current = null
      }
      
      if (sceneRef.current) {
        sceneRef.current.dispose()
        sceneRef.current = null
      }
    }
  }, [scrollProgress])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full touch-none"
      style={{
        outline: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    />
  )
}