# EyeTrip Images Portfolio

A Next.js portfolio website showcasing immersive visual experiences.

## Live Site
🚀 [https://dulce-dotcom.github.io/eyetripimages/](https://dulce-dotcom.github.io/eyetripimages/)

## GitHub Pages Deployment

This site is configured for GitHub Pages deployment with the following setup:

### Configuration Files
- `next.config.js` - Configured for static export with proper base path
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- `package.json` - Updated with deployment scripts

### Setup Steps

1. **Repository Settings**
   - Go to Settings > Pages in your GitHub repository
   - Select "GitHub Actions" as the source
   - The site will automatically deploy on pushes to the `master` branch

2. **Local Development**
   ```bash
   npm install
   npm run dev
   ```

3. **Manual Deployment**
   ```bash
   npm run build
   npm run export
   ```

### Important Notes

- All image and video paths are configured with the `/eyetripimages` base path for GitHub Pages
- The site uses static export mode for GitHub Pages compatibility
- Images are set to unoptimized mode for static hosting

### Project Structure

- `/components` - React components for different portfolio sections
- `/app` - Next.js app directory with pages and global styles
- `/public` - Static assets including images and videos
- `/uploads/2025/02/` - Portfolio images organized by date

### Technologies

- Next.js 14
- Tailwind CSS
- Framer Motion
- TypeScript
- Lucide React Icons

### Sections

1. **Hero Slider** - Rotating background images with site introduction
2. **Gigapixel Section** - Ultra-high resolution stitched photography
3. **Lightning Section** - Storm photography from Arizona
4. **Photo Section** - General photography portfolio
5. **Video Gallery** - Video content and animations
6. **Animation Section** - Interactive animations and effects
7. **Immersive 3D Section** - 3D experiences and video backgrounds