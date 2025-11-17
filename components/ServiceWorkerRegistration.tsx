'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker to clear cache
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[App] Service Worker registered:', registration.scope)
          
          // Force immediate activation
          registration.update()
          
          // Check for updates every 10 seconds
          setInterval(() => {
            registration.update()
          }, 10000)
        })
        .catch((error) => {
          console.error('[App] Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
