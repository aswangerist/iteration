const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const inputDir = 'public/Assets/WebsiteAssets';
  const outputDir = 'public/Assets/WebsiteAssets-optimized';
  
  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    
    console.log('🎨 Starting image optimization...');
    console.log(`📁 Input: ${inputDir}`);
    console.log(`📁 Output: ${outputDir}`);
    
    // Get original size
    const originalStats = await getFolderSize(inputDir);
    console.log(`📊 Original size: ${(originalStats / 1024 / 1024).toFixed(2)} MB`);
    
    // Optimize images
    const files = await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });
    
    // Generate WebP versions for modern browsers
    console.log('🚀 Generating WebP versions...');
    await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: `${outputDir}/webp`,
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });
    
    // Get optimized size
    const optimizedStats = await getFolderSize(outputDir);
    const savings = ((originalStats - optimizedStats) / originalStats * 100).toFixed(2);
    
    console.log(`✅ Optimization complete!`);
    console.log(`📊 Optimized size: ${(optimizedStats / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Space saved: ${savings}%`);
    console.log(`📝 Files processed: ${files.length}`);
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

async function getFolderSize(dirPath) {
  const files = await fs.readdir(dirPath);
  let size = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);
    
    if (stats.isDirectory()) {
      size += await getFolderSize(filePath);
    } else {
      size += stats.size;
    }
  }
  
  return size;
}

optimizeImages();