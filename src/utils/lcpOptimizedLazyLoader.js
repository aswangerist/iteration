// LCP-focused lazy loading implementation
export class LCPOptimizedLazyLoader {
  constructor() {
    this.criticalImages = [
      '/Assets/WebsiteAssets/Logos/Horizontal.png', // Logo - always critical
      // Add other above-the-fold images
    ];
    this.init();
  }

  init() {
    // Skip lazy loading for critical images
    this.preloadCriticalImages();
    
    // Implement lazy loading for non-critical images
    this.setupLazyLoading();
    
    // Monitor LCP
    this.monitorLCP();
  }

  preloadCriticalImages() {
    this.criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Use optimized image sources
            const originalSrc = img.dataset.src;
            if (originalSrc) {
              // Try WebP first, fallback to original
              this.loadOptimizedImage(img, originalSrc);
              observer.unobserve(img);
            }
          }
        });
      }, {
        // Load images when they're 300px from viewport (earlier than default)
        rootMargin: '300px 0px',
        threshold: 0.01
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  loadOptimizedImage(img, originalSrc) {
    // Create optimized source paths
    const baseName = originalSrc.substring(0, originalSrc.lastIndexOf('.'));
    const webpSrc = `${baseName}.webp`;
    const optimizedSrc = `${baseName}-optimized.jpg`;

    // Try WebP first
    const webpImg = new Image();
    webpImg.onload = () => {
      img.src = webpSrc;
      img.classList.add('loaded');
    };
    
    webpImg.onerror = () => {
      // Fallback to optimized JPEG
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        img.src = optimizedSrc;
        img.classList.add('loaded');
      };
      
      fallbackImg.onerror = () => {
        // Final fallback to original
        img.src = originalSrc;
        img.classList.add('loaded');
      };
      
      fallbackImg.src = optimizedSrc;
    };
    
    webpImg.src = webpSrc;
  }

  monitorLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('🎯 LCP Element:', lastEntry.element);
        console.log('🎯 LCP Time:', lastEntry.startTime.toFixed(2) + 'ms');
        
        // Analyze LCP element for optimization opportunities
        if (lastEntry.element && lastEntry.element.tagName === 'IMG') {
          console.log('💡 LCP is an image - consider optimizing:', lastEntry.element.src);
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new LCPOptimizedLazyLoader();
  });
}