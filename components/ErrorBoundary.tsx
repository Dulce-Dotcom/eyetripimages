'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log detailed error info
    console.log('===== ERROR BOUNDARY CAUGHT =====')
    console.log('Error name:', error.name)
    console.log('Error message:', error.message)
    console.log('Error stack:', error.stack)
    console.log('Component stack:', errorInfo.componentStack)
    console.log('================================')
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a chunk loading error (browser cache issue)
      const isChunkError = this.state.error?.message?.includes('chunk') || 
                          this.state.error?.message?.includes('Loading') ||
                          this.state.error?.name === 'ChunkLoadError'
      
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-dark-grey">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-hypnotic-white mb-4">
              {isChunkError ? 'Please Clear Your Browser Cache' : 'Something went wrong'}
            </h2>
            {isChunkError && (
              <p className="text-hypnotic-white/70 mb-6 text-sm">
                Safari cached an old version of the site. Please clear your cache:
                <br /><br />
                Settings → Safari → Clear History and Website Data
              </p>
            )}
            <button
              onClick={() => {
                // Force a hard reload that bypasses cache
                window.location.href = window.location.href + '?t=' + Date.now()
              }}
              className="px-6 py-3 bg-magenta text-hypnotic-white rounded-lg hover:bg-magenta/80 transition-colors"
            >
              {isChunkError ? 'Reload (Bypass Cache)' : 'Reload Page'}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
