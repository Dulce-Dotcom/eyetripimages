# EyeTrip Images

A Next.js portfolio website showcasing the visual art and immersive experiences of David Aughenbaugh. This site serves as the primary online gallery for high-resolution photography, animations, and visual media created for museum installations, VR exhibitions, and public art displays.

## About EyeTrip Images

EyeTrip Images is the visual content portfolio and production hub for David Aughenbaugh's immersive art projects. The work spans multiple mediums including gigapixel photography, lightning photography, animated sequences, and interactive 3D experiences designed to explore neuroaesthetics and visual perception.

### Connection to EyeTrip VR

This site works in conjunction with **[EyeTrip VR](https://eyetripvr.com)**, which showcases the VR installation side of David's work. While eyetripimages.com displays the source photography, animations, and 2D visual content, eyetripvr.com features the immersive VR experiences built from these assets for museums, galleries, and public exhibitions.

**Two complementary platforms:**
- **EyeTripImages.com** - Portfolio of source visual media, photography, and animations
- **EyeTripVR.com** - VR installations and immersive exhibition experiences

## Live Site
🚀 **[https://eyetripimages.com](https://eyetripimages.com)**

## Technologies

- **Next.js 14** - React framework with static export for optimal performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and scroll-based interactions
- **BabylonJS** - 3D WebGL rendering (desktop only, optimized for mobile)
- **Lucide React Icons** - Modern icon system

## Portfolio Sections

1. **Hero Slider** - Cinematic rotating background showcasing featured works
2. **Gigapixel Photography** - Ultra-high resolution panoramic stitched images (50+ megapixels)
3. **Lightning Photography** - Monsoon storm captures from Arizona's Sonoran Desert
4. **Photography Gallery** - Curated portfolio of fine art and experimental photography
5. **Video Gallery** - Motion content, time-lapses, and animated sequences
6. **Animation Section** - Interactive visual effects and generative art
7. **Immersive 3D Section** - "Neuroaesthetics" - WebGL experiences with scroll-driven interactions

## Development

### Local Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Building & Deployment
```bash
# Build static export
npm run build

# Deploy to SiteGround hosting via SSH
./deploy.sh
```

### Project Structure
- `/components` - React components for portfolio sections and UI elements
- `/app` - Next.js app router with layout and page definitions
- `/public` - Static assets (images, videos, service worker)
- `/public/uploads/` - Portfolio media organized by date
- `/lib` - Utility functions for asset paths and image handling

## Mobile Optimization

The site uses responsive design with special considerations for mobile:
- **BabylonJS disabled on mobile** (< 768px width) to prevent GPU memory issues
- **Service worker** for aggressive cache clearing
- **Video backgrounds** as fallback for mobile devices
- **Lazy loading** for images and heavy media assets

## Performance Features

- Static site generation for fast load times
- Optimized image delivery with proper sizing
- Scroll-based animations with `will-change` optimization
- Code splitting and dynamic imports
- Cache-busting with unique build IDs

## Deployment History

Site deployed to **SiteGround** hosting with SSH rsync:
- Port: 18765
- Path: `www/eyetripimages.com/public_html/`
- Build count: 12+ successful deployments
- Cache strategy: Service worker + HTTP headers

---

**Artist**: David Aughenbaugh  
**Portfolio**: [eyetripimages.com](https://eyetripimages.com)  
**VR Exhibitions**: [eyetripvr.com](https://eyetripvr.com)