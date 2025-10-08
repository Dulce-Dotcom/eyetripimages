import HeroSlider from '../components/HeroSlider'
import Immersive3DSection from '../components/Immersive3DSection'
import AnimationSection from '../components/AnimationSection'
import ImagesSection from '../components/ImagesSection'
import GigapixelSection from '../components/GigapixelSection'
import LightningSection from '../components/LightningSection'
import PhotoSection from '../components/PhotoSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero - Immersive Introduction */}
      <HeroSlider />
      
      {/* Immersive 3D Experience - Neuroaesthetics Core */}
      <Immersive3DSection />
      
      {/* Portfolio Showcase Sections */}
      <AnimationSection />
      
      
      <ImagesSection />

      
      <GigapixelSection />
      <LightningSection />
      <PhotoSection />
      
      {/* Coming Soon - Thematic Philosophy Sections */}
      <section className="h-screen flex items-center justify-center section-padding bg-gradient-to-b from-hypnotic-white via-dark-grey to-deep-blue">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            The Philosophy Continues
          </h2>
          <p className="text-lg md:text-xl text-hypnotic-white/70 max-w-2xl mx-auto mb-8">
            What It Means • Wonder, Curiosity & Awe • Power to Transform • Now That You See It
          </p>
          <p className="text-hypnotic-white/60">
            Thematic philosophy sections & contact coming soon...
          </p>
        </div>
      </section>
    </main>
  )
}