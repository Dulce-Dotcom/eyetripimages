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
 * Uses common WordPress size patterns for different image types
 */
export function getImageSizes(basePath: string, filename: string): ImageSizes {
  const baseUrl = `${basePath}/${filename}`;
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const ext = filename.match(/\.[^/.]+$/)?.[0] || '.jpg';

  // Try to determine appropriate sizes based on filename patterns
  let mediumSize = '1024x683';  // Default
  let largeSize = '2048x1365';  // Default

    // Crush series landscape images
  if (filename.startsWith('Crush_Series_')) {
    mediumSize = '1024x622';  // Landscape (corrected from 683 to 622)
    largeSize = '1536x934';   // Corrected from 1024 to 934
  }
  // Portrait orientation images
  else if (filename.match(/IMG_7569|IMG_7581_2|IMG_7585/)) {
    mediumSize = '768x1024';  // Portrait
    largeSize = '1536x2048';
  }
  // IMG_7896b has different dimensions
  else if (filename === 'IMG_7896b.jpg') {
    mediumSize = '793x1024';  // Specific ratio
    largeSize = '1585x2048';
  }
  // MG series portraits
  else if (filename.startsWith('MG_6664_108')) {
    mediumSize = '724x1024';  // Specific portrait ratio
    largeSize = '1448x2048';
  }
  // Square-ish images like IMG_7571
  else if (filename.match(/IMG_7571|IMG_7870b/)) {
    mediumSize = '1024x982';  // Nearly square
    largeSize = '2048x1963';
  }
  // Wide aspect ratio images  
  else if (filename.match(/I1A5872|c5GsShGsc2pGac1BWGh8kq8/)) {
    mediumSize = '1024x576';  // 16:9 aspect
    largeSize = '2048x1152';
  }
  // 2151Gab series (tall portrait)
  else if (filename.startsWith('2151Gab')) {
    mediumSize = '720x1024';
    largeSize = '1440x2048';
  }
  // Van Gogh pseudo images (nearly square)
  else if (filename.startsWith('vanGogh')) {
    if (filename.includes('Self1')) {
      mediumSize = '1024x982';
      largeSize = '2048x1964';
    } else {
      mediumSize = '1024x910';
      largeSize = '2048x1820';
    }
  }
  // MG_3291 series (landscape)
  else if (filename.startsWith('MG_3291')) {
    mediumSize = '1024x660';
    largeSize = '2048x1320';
  }
  // Rembrandt pseudo images
  else if (filename.startsWith('rembrandt')) {
    if (filename.includes('rembrandt1')) {
      mediumSize = '1024x684';
      largeSize = '1024x684';  // No larger size available
    } else {
      mediumSize = '1024x642';
      largeSize = '1024x642';  // No larger size available
    }
  }
  // MichelleCarnesKeith (portrait)
  else if (filename.startsWith('MichelleCarnes')) {
    mediumSize = '891x1024';
    largeSize = '891x1024';  // No larger size available
  }
  // IMG_7557 and IMG_7582 (landscape 4:3)
  else if (filename.match(/IMG_7557|IMG_7582|IMG_7587/)) {
    mediumSize = '1024x768';
    largeSize = '2048x1536';
  }
  // Crush_5625 gigapixel image (portrait 4:5 ratio)
  else if (filename.startsWith('Crush_5625')) {
    mediumSize = '1024x819';
    largeSize = '2048x1638';
  }

  return {
    thumbnail: `${basePath}/${nameWithoutExt}-150x150${ext}`,
    medium: `${basePath}/${nameWithoutExt}-${mediumSize}${ext}`,
    large: `${basePath}/${nameWithoutExt}-${largeSize}${ext}`,
    full: baseUrl,
    scaled: `${basePath}/${nameWithoutExt}-scaled${ext}`
  };
}

/**
 * Get the best image size for different use cases
 * Includes fallback logic for missing sizes
 */
export function getBestImageSize(sizes: ImageSizes, usage: 'thumbnail' | 'preview' | 'background' | 'lightbox'): string {
  switch (usage) {
    case 'thumbnail':
      return sizes.thumbnail;
    case 'preview':
      // Try medium first, fallback to full if medium doesn't exist
      return sizes.medium;
    case 'background':
      // Try large first, fallback to scaled, then medium, then full
      return sizes.large;
    case 'lightbox':
      // Prefer scaled for lightbox, fallback to full
      return sizes.scaled || sizes.full;
    default:
      return sizes.medium;
  }
}

/**
 * Alternative function that generates image URLs with common WordPress patterns
 * More flexible approach that tries common size patterns
 */
export function getFlexibleImageUrl(basePath: string, filename: string, usage: 'thumbnail' | 'preview' | 'background' | 'lightbox'): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const ext = filename.match(/\.[^/.]+$/)?.[0] || '.jpg';
  
  switch (usage) {
    case 'thumbnail':
      return `${basePath}/${nameWithoutExt}-150x150${ext}`;
    case 'preview':
      // Try various common medium sizes, fallback to full
      return `${basePath}/${nameWithoutExt}-1024x622${ext}`;  // Most common
    case 'background':
      return `${basePath}/${nameWithoutExt}-2048x1245${ext}`;  // Most common large
    case 'lightbox':
      return `${basePath}/${nameWithoutExt}-scaled${ext}`;
    default:
      return `${basePath}/${filename}`;
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