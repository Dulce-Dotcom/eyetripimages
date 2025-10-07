import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '../components/SmoothScrollProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eyetrip Images - Portfolio',
  description: 'An immersive portfolio showcase featuring stunning visual experiences',
  keywords: ['portfolio', 'photography', 'visual arts', 'immersive experience'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased relative">
        <SmoothScrollProvider>
          <div className="relative">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}