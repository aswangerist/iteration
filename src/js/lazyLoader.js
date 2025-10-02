// Lazy loading utilities for Aswang Chronicles
export class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.animationObserver = null;
    this.init();
  }

  init() {
    this.setupImageLazyLoading();
    this.setupAnimationObserver();
  }

  setupImageLazyLoading() {
    // Intersection Observer for lazy loading images
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          this.imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.1
    });
  }

  setupAnimationObserver() {
    // Intersection Observer for animations
    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Keep observing for repeated animations if needed
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    
    if (src) {
      // Create a new image to preload
      const imageLoader = new Image();
      
      imageLoader.onload = () => {
        // Add fade-in animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.src = src;
        if (srcset) img.srcset = srcset;
        
        // Remove lazy loading attributes
        delete img.dataset.src;
        delete img.dataset.srcset;
        
        // Fade in the image
        requestAnimationFrame(() => {
          img.style.opacity = '1';
        });
        
        img.classList.remove('lazy-image');
        img.classList.add('loaded');
      };
      
      imageLoader.onerror = () => {
        // Handle error - show placeholder or default image
        img.src = this.getPlaceholderImage();
        img.classList.add('error');
      };
      
      imageLoader.src = src;
    }
  }

  getPlaceholderImage() {
    // Return a base64 encoded placeholder or default image
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==';
  }

  observeImages() {
    // Observe all lazy images on the page
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      this.imageObserver.observe(img);
    });
  }

  observeAnimations() {
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
      this.animationObserver.observe(el);
    });
  }

  // Create optimized image element
  static createLazyImage(src, alt = '', className = '', sizes = '') {
    return `
      <img 
        class="lazy-image ${className}" 
        data-src="${src}"
        ${sizes ? `data-srcset="${sizes}"` : ''}
        alt="${alt}"
        loading="lazy"
        style="opacity: 0; transition: opacity 0.3s ease;"
        onload="this.style.opacity = 1;"
      />
    `;
  }

  // Preload critical images
  static preloadCriticalImages(imageUrls) {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static measureImageLoad(imageSrc) {
    const startTime = performance.now();
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const loadTime = performance.now() - startTime;
        console.log(`🖼️ Image loaded: ${imageSrc} (${loadTime.toFixed(2)}ms)`);
        resolve(loadTime);
      };
      img.src = imageSrc;
    });
  }

  static logWebVitals() {
    // Log Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Safely handle potentially undefined values
          const value = entry.value !== undefined ? entry.value.toFixed(2) : 'N/A';
          console.log(`📊 ${entry.name}: ${value}`);
        }
      });
      
      try {
        observer.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (e) {
        console.log('Performance observer not supported');
      }
    }
  }
}

// Initialize lazy loader singleton
let lazyLoaderInstance = null;

export function initLazyLoading() {
  if (!lazyLoaderInstance) {
    lazyLoaderInstance = new LazyLoader();
  }
  
  // Observe images and animations on page load/change
  lazyLoaderInstance.observeImages();
  lazyLoaderInstance.observeAnimations();
  
  return lazyLoaderInstance;
}

export function getLazyLoader() {
  return lazyLoaderInstance;
}