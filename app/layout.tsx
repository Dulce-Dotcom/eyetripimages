import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '../components/SmoothScrollProvider'
import ErrorBoundary from '../components/ErrorBoundary'
import ClientErrorHandler from './client-error-handler'
import ServiceWorkerRegistration from '../components/ServiceWorkerRegistration'

const notoSans = Noto_Sans({ 
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  title: 'David Aughenbaugh - EyeTrip Images ™',
  description: 'David Aughenbaugh Worlds within Worlds Immersive Animation Images Gigapixel Photography Lightning Photo David Aughenbaugh Worlds within Worlds Immersive Animation',
  keywords: ['David Aughenbaugh', 'EyeTrip Images', 'Gigapixel Photography', 'Lightning Photography', 'Immersive Animation', 'Visual Art', 'Arizona Artist', 'Worlds within Worlds', 'neuroaesthetics', 'VR art'],
  authors: [{ name: 'David Aughenbaugh' }],
  creator: 'David Aughenbaugh',
  publisher: 'EyeTrip Images',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eyetripimages.com/",
    siteName: "EyeTrip Images",
    title: "David Aughenbaugh - EyeTrip Images ™",
    description: "Immersive visual art experiences. High-resolution gigapixel photography, animations, and VR installations that explore neuroaesthetics and visual perception.",
    images: [
      {
        url: "/images/eyetripimages-social-image.png",
        width: 1200,
        height: 630,
        alt: "EyeTrip Images - Immersive Visual Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Aughenbaugh - EyeTrip Images ™",
    description: "Immersive visual art experiences. High-resolution gigapixel photography, animations, and VR installations.",
    images: ["/images/eyetripimages-social-image.png"],
  },
  alternates: {
    canonical: 'https://eyetripimages.com/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="antialiased relative font-sans">
        <ServiceWorkerRegistration />
        <ClientErrorHandler />
        <ErrorBoundary>
          <SmoothScrollProvider>
            <div className="relative">
              {children}
            </div>
          </SmoothScrollProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}