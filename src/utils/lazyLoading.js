// Image lazy loading utility
export class LazyImageLoader {
  constructor() {
    this.imageObserver = null;
    this.init();
  }

  init() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      }, {
        // Load images when they're 50px away from viewport
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }

    this.observeImages();
  }

  observeImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      if (this.imageObserver) {
        this.imageObserver.observe(img);
      } else {
        // Fallback for browsers without Intersection Observer
        this.loadImage(img);
      }
    });
  }

  loadImage(img) {
    // Create new image element for preloading
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      // Replace data-src with src when image is loaded
      img.src = img.dataset.src;
      img.classList.add('loaded');
      img.classList.remove('loading');
    };

    imageLoader.onerror = () => {
      img.classList.add('error');
      img.classList.remove('loading');
    };

    // Add loading class for CSS transitions
    img.classList.add('loading');
    
    // Start loading
    imageLoader.src = img.dataset.src;
  }

  // Method to observe new images added dynamically
  observeNewImages() {
    this.observeImages();
  }
}

// WebP support detection
export function supportsWebP() {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Optimize image format selection
export async function getOptimizedImageSrc(baseSrc) {
  const webpSupported = await supportsWebP();
  
  if (webpSupported) {
    // Try to use WebP version if available
    const webpSrc = baseSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpSrc;
  }
  
  return baseSrc;
}

// Initialize lazy loading
export function initLazyLoading() {
  return new LazyImageLoader();
}