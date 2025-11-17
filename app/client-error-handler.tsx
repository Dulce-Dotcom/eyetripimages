'use client'

import { useEffect } from 'react'

export default function ClientErrorHandler() {
  useEffect(() => {
    // Suppress React hydration warnings on mobile
    if (typeof window !== 'undefined') {
      const originalError = console.error
      console.error = (...args) => {
        // Suppress specific hydration warnings but log them for debugging
        if (
          typeof args[0] === 'string' &&
          (args[0].includes('Hydration') ||
           args[0].includes('did not match') ||
           args[0].includes('Text content does not match'))
        ) {
          console.log('Suppressed hydration warning:', args[0])
          return
        }
        originalError.apply(console, args)
      }

      // Global error handler - DON'T prevent default to see actual errors
      const handleError = (event: ErrorEvent) => {
        console.log('===== GLOBAL ERROR =====')
        console.log('Message:', event.message)
        console.log('Filename:', event.filename)
        console.log('Line:', event.lineno, 'Column:', event.colno)
        console.log('Error object:', event.error)
        console.log('=======================')
        // Don't preventDefault - let it propagate to ErrorBoundary
      }

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        console.log('===== UNHANDLED REJECTION =====')
        console.log('Reason:', event.reason)
        console.log('==============================')
        // Don't preventDefault - let it propagate to ErrorBoundary
      }

      window.addEventListener('error', handleError)
      window.addEventListener('unhandledrejection', handleUnhandledRejection)

      return () => {
        console.error = originalError
        window.removeEventListener('error', handleError)
        window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      }
    }
  }, [])

  return null
}
