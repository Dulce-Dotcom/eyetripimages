// Image utility functions for EyeTrip Images portfolio
// Handles WordPress media library sizing conventions

export interface ImageSizes {
  thumbnail: string;    // 150x150
  medium: string;       // ~1024px width
  large: string;        // ~2048px width  
  full: string;         // Original size
  scaled?: string;      // WordPress scaled version
}

/**
 * Generate all available image sizes from a base filename
 * Based on WordPress media library conventions from eyetripimages.com
 */
export function getImageSizes(basePath: string, filename: string): ImageSizes {
  const baseUrl = `${basePath}/${filename}`;
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const ext = filename.match(/\.[^/.]+$/)?.[0] || '.jpg';

  return {
    thumbnail: `${basePath}/${nameWithoutExt}-150x150${ext}`,
    medium: `${basePath}/${nameWithoutExt}-1024x683${ext}`, // Common medium size
    large: `${basePath}/${nameWithoutExt}-2048x1365${ext}`, // Common large size
    full: baseUrl,
    scaled: `${basePath}/${nameWithoutExt}-scaled${ext}`
  };
}

/**
 * Get the best image size for different use cases
 */
export function getBestImageSize(sizes: ImageSizes, usage: 'thumbnail' | 'preview' | 'background' | 'lightbox'): string {
  switch (usage) {
    case 'thumbnail':
      return sizes.thumbnail;
    case 'preview':
      return sizes.medium;
    case 'background':
      return sizes.large;
    case 'lightbox':
      return sizes.scaled || sizes.full;
    default:
      return sizes.medium;
  }
}

/**
 * Image data for 2025 collection from eyetripimages.com
 * Organized by category matching the portfolio sections
 */
export const eyeTripImages2025 = {
  // Crush Series - Abstract digital art
  crushSeries: [
    'Crush_Series_0701.jpg',
    'Crush_Series_0801.jpg', 
    'Crush_Series_0901.jpg',
    'Crush_Series_1001.jpg',
    'Crush_Series_1101.jpg',
    'Crush_Series_1201.jpg',
    'Crush_Series_1301.jpg',
    'Crush_Series_1401.jpg',
    'Crush_Series_1501.jpg',
    'Crush_Series_1601.jpg',
    'Crush_Series_1701.jpg',
    'Crush_Series_1801.jpg',
    'Crush_Series_1901.jpg',
    'Crush_Series_2001.jpg',
    'Crush_Series_2101.jpg',
    'Crush_Series_2201.jpg',
    'Crush_Series_2301.jpg',
    'Crush_Series_2401.jpg'
  ],

  // Photography series
  photography: [
    'IMG_7557_01b.jpg',
    'IMG_7569.jpg', 
    'IMG_7571.jpg',
    'IMG_7581_2.jpg',
    'IMG_7582.jpg',
    'IMG_7585.jpg',
    'IMG_7587.jpg',
    'IMG_7870b.jpg',
    'IMG_7896b.jpg'
  ],

  // Mixed digital art and composites  
  digitalArt: [
    'MG_3291_bw_038kq8.jpg',
    'MG_6664_108GaGc1Gac1Gav24kBW38kq8.jpg',
    'I1A5872_08bw_028kq8.jpg',
    'c5GsShGsc2pGac1BWGh8kq8.jpg',
    'rembrandt1_pseudo_2up_02.jpg',
    'rembrandt2_pseudo_2up_01.jpg',
    'vanGoghMother_pseudo_2up_01.jpg',
    'vanGoghSelf1_pseudo_2up_text_02.jpg',
    'MichelleCarnesKeith_pseudo_2up_02.jpg'
  ],

  // Gigapixel and high-resolution works
  gigapixel: [
    'Crush_5625_8x10GsGh8kq8.jpg',
    '2151Gab5225GvbShc2pGaGvbc1vGabAll15kBW_01Gh2k.jpg'
  ]
};

/**
 * Get image metadata including titles and descriptions
 */
export interface ImageMetadata {
  filename: string;
  title: string;
  description?: string;
  category: keyof typeof eyeTripImages2025;
  dimensions?: string;
  megapixels?: string;
  year: number;
}

/**
 * Enhanced image metadata for portfolio display
 */
export const imageMetadata2025: ImageMetadata[] = [
  // Crush Series
  {
    filename: 'Crush_Series_0701.jpg',
    title: 'Crush Series #07',
    description: 'Abstract digital composition exploring texture and form',
    category: 'crushSeries',
    year: 2025
  },
  {
    filename: 'Crush_Series_1201.jpg', 
    title: 'Crush Series #12',
    description: 'Dynamic interplay of color and geometric abstraction',
    category: 'crushSeries',
    year: 2025
  },
  {
    filename: 'Crush_Series_2401.jpg',
    title: 'Crush Series #24', 
    description: 'Final piece in the exploration of digital materiality',
    category: 'crushSeries',
    year: 2025
  },

  // Photography  
  {
    filename: 'IMG_7571.jpg',
    title: 'Portrait Study',
    description: 'Contemporary portrait photography with dramatic lighting',
    category: 'photography',
    year: 2025
  },
  {
    filename: 'IMG_7896b.jpg',
    title: 'Urban Reflection',
    description: 'Street photography capturing fleeting moments',
    category: 'photography', 
    year: 2025
  },

  // Digital Art
  {
    filename: 'MG_6664_108GaGc1Gac1Gav24kBW38kq8.jpg',
    title: 'Algorithmic Vision', 
    description: 'AI-assisted digital art exploring perception and reality',
    category: 'digitalArt',
    year: 2025
  },
  {
    filename: 'vanGoghSelf1_pseudo_2up_text_02.jpg',
    title: 'Van Gogh Reimagined',
    description: 'Digital reinterpretation of classic self-portrait',
    category: 'digitalArt', 
    year: 2025
  },

  // Gigapixel
  {
    filename: 'Crush_5625_8x10GsGh8kq8.jpg',
    title: 'Gigapixel Crush',
    description: 'Ultra high-resolution digital composition for large-scale printing', 
    category: 'gigapixel',
    dimensions: '32,768 x 24,576 pixels',
    megapixels: '805.3 MP',
    year: 2025
  }
];

/**
 * Get random images for backgrounds and previews
 */
export function getRandomImages(category?: keyof typeof eyeTripImages2025, count: number = 6): string[] {
  const allImages = category ? eyeTripImages2025[category] : Object.values(eyeTripImages2025).flat();
  return allImages.sort(() => Math.random() - 0.5).slice(0, count);
}

/**
 * Base path for 2025 images
 */
export const IMAGES_2025_PATH = '/uploads/2025/05';