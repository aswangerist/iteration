// Image optimization script for LCP improvement
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

class LCPImageOptimizer {
  constructor() {
    this.largeImages = [
      'Assets/WebsiteAssets/Filler 2.PNG',
      'Assets/WebsiteAssets/Mananangal.PNG', 
      'Assets/WebsiteAssets/Berbalang.PNG',
      'Assets/WebsiteAssets/Filler 3.PNG',
      'Assets/WebsiteAssets/Sigbin.PNG',
      'Assets/WebsiteAssets/Tiktik .PNG',
      'Assets/WebsiteAssets/Filler 1.PNG'
    ];
  }

  async optimizeForLCP() {
    console.log('🚀 Optimizing images for LCP improvement...\n');

    for (const imagePath of this.largeImages) {
      const fullPath = path.join('public', imagePath);
      
      if (fs.existsSync(fullPath)) {
        await this.createOptimizedVersions(fullPath, imagePath);
      }
    }
  }

  async createOptimizedVersions(inputPath, relativePath) {
    const dir = path.dirname(inputPath);
    const name = path.basename(inputPath, path.extname(inputPath));
    
    try {
      // Create WebP version (80% smaller)
      const webpPath = path.join(dir, `${name}.webp`);
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);

      // Create compressed JPEG fallback
      const jpegPath = path.join(dir, `${name}-optimized.jpg`);
      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(jpegPath);

      // Create thumbnail for lazy loading
      const thumbPath = path.join(dir, `${name}-thumb.webp`);
      await sharp(inputPath)
        .resize(50, 50, { fit: 'cover' })
        .webp({ quality: 60 })
        .blur(2)
        .toFile(thumbPath);

      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(webpPath).size;
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${relativePath}`);
      console.log(`   📦 Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   🗜️  WebP: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)`);
      console.log('');

    } catch (error) {
      console.error(`❌ Error optimizing ${relativePath}:`, error.message);
    }
  }
}

// Usage instructions
console.log(`
🎯 LCP Image Optimization Setup:

1. Install Sharp: npm install sharp
2. Run this script: node optimize-lcp-images.js
3. Update image references in your code to use .webp versions
4. Implement picture element with fallbacks

Expected LCP improvement: 1-2 seconds
`);

const optimizer = new LCPImageOptimizer();
// Uncomment to run: optimizer.optimizeForLCP();