import HeroSlider from '../components/HeroSlider'
import Immersive3DSection from '../components/Immersive3DSection'
import ImmersiveSection from '../components/ImmersiveSection'
import TestimonialTicker from '../components/TestimonialTicker'
import OutrunGrid3DSliver from '../components/OutrunGrid3DSliver'
import AnimationSection from '../components/AnimationSection'
import ImagesSection from '../components/ImagesSection'
import GigapixelSection from '../components/GigapixelSection'
import LightningSection from '../components/LightningSection'
import PhotoSection from '../components/PhotoSection'
import WhatItMeansSection from '../components/WhatItMeansSection'
import EyeTripVRSection from '../components/EyeTripVRSection'
import FeaturedTestimonial from '../components/FeaturedTestimonial'
import StickyHeader from '../components/StickyHeader'
import CopyrightFooter from '../components/CopyrightFooter'

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main className="min-h-screen">
        {/* Hero - Immersive Introduction */}
        <HeroSlider />
      
      {/* Immersive 3D Experience - Neuroaesthetics Core */}
      <Immersive3DSection />
      
      {/* Testimonial Ticker */}
      <TestimonialTicker />
      
      {/* Immersive VR and Installations */}
      <ImmersiveSection />
      
      {/* Outrun 3D Grid Sliver */}
      <OutrunGrid3DSliver />
      
      {/* Portfolio Showcase Sections */}
      <AnimationSection />
      
      
      <ImagesSection />

      
      <GigapixelSection />
      <LightningSection />
      <PhotoSection />
      
      {/* What It Means - Philosophy Section */}
      <WhatItMeansSection />
      
      {/* Featured Testimonial */}
      <FeaturedTestimonial />
      
      {/* EyeTripVR Section */}
      <EyeTripVRSection />
      </main>
      <CopyrightFooter />
    </>
  )
}