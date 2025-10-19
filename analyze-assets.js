// Asset Optimization Recommendations Script
import fs from 'fs';
import path from 'path';

class AssetOptimizer {
  constructor() {
    this.assetsPath = 'public/Assets';
    this.analysis = {
      totalFiles: 0,
      totalSize: 0,
      largeFiles: [],
      duplicates: [],
      unnecessaryFiles: [],
      optimizationPotential: 0
    };
  }

  analyzeAssets() {
    console.log('🔍 Analyzing assets for optimization opportunities...\n');
    
    this.scanDirectory(this.assetsPath);
    this.identifyOptimizations();
    this.generateReport();
  }

  scanDirectory(dirPath) {
    try {
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      
      files.forEach(file => {
        const fullPath = path.join(dirPath, file.name);
        
        if (file.isDirectory()) {
          this.scanDirectory(fullPath);
        } else {
          this.analyzeFile(fullPath);
        }
      });
    } catch (error) {
      console.error('Error scanning directory:', error.message);
    }
  }

  analyzeFile(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const size = stats.size;
      const ext = path.extname(filePath).toLowerCase();
      const relativePath = path.relative('public', filePath);
      
      this.analysis.totalFiles++;
      this.analysis.totalSize += size;

      // Flag large files (>5MB)
      if (size > 5 * 1024 * 1024) {
        this.analysis.largeFiles.push({
          path: relativePath,
          size: (size / 1024 / 1024).toFixed(2) + ' MB',
          extension: ext,
          optimization: this.getOptimizationSuggestion(ext, size)
        });
      }

      // Flag potentially unnecessary files
      if (this.isUnnecessaryFile(filePath)) {
        this.analysis.unnecessaryFiles.push({
          path: relativePath,
          size: (size / 1024 / 1024).toFixed(2) + ' MB',
          reason: this.getUnnecessaryReason(filePath)
        });
        this.analysis.optimizationPotential += size;
      }

    } catch (error) {
      console.error('Error analyzing file:', filePath, error.message);
    }
  }

  getOptimizationSuggestion(ext, size) {
    const sizeMB = size / 1024 / 1024;
    
    switch (ext) {
      case '.png':
        return sizeMB > 2 ? 'Convert to WebP, compress to 80% quality' : 'Convert to WebP';
      case '.jpg':
      case '.jpeg':
        return sizeMB > 2 ? 'Compress to 80% quality, consider WebP' : 'Consider WebP format';
      case '.dll':
      case '.so':
      case '.dylib':
        return 'Remove if not used in web deployment';
      case '.wav':
      case '.mp3':
        return sizeMB > 1 ? 'Compress audio, reduce bitrate' : 'Consider compression';
      default:
        return 'Review necessity for web deployment';
    }
  }

  isUnnecessaryFile(filePath) {
    const fileName = path.basename(filePath).toLowerCase();
    const ext = path.extname(filePath).toLowerCase();
    
    // Python libraries (likely unnecessary for web)
    if (fileName.includes('librenpython') || fileName.includes('python')) {
      return true;
    }

    // Development files
    if (['.pyc', '.pyo', '.pdb', '.map'].includes(ext)) {
      return true;
    }

    // Backup files
    if (fileName.includes('backup') || fileName.includes('~') || fileName.endsWith('.bak')) {
      return true;
    }

    return false;
  }

  getUnnecessaryReason(filePath) {
    const fileName = path.basename(filePath).toLowerCase();
    
    if (fileName.includes('librenpython') || fileName.includes('python')) {
      return 'Python runtime library - not needed for web deployment';
    }
    
    if (fileName.includes('backup')) {
      return 'Backup file - not needed in production';
    }
    
    return 'Potentially unnecessary for web deployment';
  }

  identifyOptimizations() {
    // Calculate potential savings
    const largeImageSavings = this.analysis.largeFiles
      .filter(f => ['.png', '.jpg', '.jpeg'].includes(path.extname(f.path).toLowerCase()))
      .reduce((sum, file) => {
        const sizeMB = parseFloat(file.size);
        return sum + (sizeMB * 0.6); // Estimate 60% size reduction
      }, 0);

    this.analysis.optimizationPotential += largeImageSavings * 1024 * 1024; // Convert to bytes
  }

  generateReport() {
    const totalSizeMB = (this.analysis.totalSize / 1024 / 1024).toFixed(2);
    const potentialSavingsMB = (this.analysis.optimizationPotential / 1024 / 1024).toFixed(2);
    
    console.log('📊 ASSET OPTIMIZATION ANALYSIS');
    console.log('================================\n');
    
    console.log(`📁 Total Files: ${this.analysis.totalFiles}`);
    console.log(`📦 Total Size: ${totalSizeMB} MB`);
    console.log(`💾 Potential Savings: ${potentialSavingsMB} MB\n`);

    if (this.analysis.largeFiles.length > 0) {
      console.log('🚨 LARGE FILES (>5MB):');
      console.log('=====================');
      this.analysis.largeFiles.forEach(file => {
        console.log(`📄 ${file.path} (${file.size})`);
        console.log(`   💡 ${file.optimization}\n`);
      });
    }

    if (this.analysis.unnecessaryFiles.length > 0) {
      console.log('🗑️  UNNECESSARY FILES:');
      console.log('====================');
      this.analysis.unnecessaryFiles.forEach(file => {
        console.log(`📄 ${file.path} (${file.size})`);
        console.log(`   🔍 ${file.reason}\n`);
      });
    }

    console.log('🎯 OPTIMIZATION PRIORITIES:');
    console.log('==========================');
    console.log('1. Remove Python libraries (save ~112 MB)');
    console.log('2. Optimize large PNG images (save ~50-70 MB)');
    console.log('3. Convert images to WebP format');
    console.log('4. Remove development/backup files');
    console.log(`\n💡 Total potential savings: ${potentialSavingsMB} MB (${((this.analysis.optimizationPotential / this.analysis.totalSize) * 100).toFixed(1)}%)`);
  }
}

// Run analysis
const optimizer = new AssetOptimizer();
optimizer.analyzeAssets();