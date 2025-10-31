import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '../components/SmoothScrollProvider'

const notoSans = Noto_Sans({ 
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

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
    <html lang="en" className={notoSans.variable}>
      <body className="antialiased relative font-sans">
        <SmoothScrollProvider>
          <div className="relative">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}