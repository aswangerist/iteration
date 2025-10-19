// Performance monitoring and analysis tools
export class PerformanceAnalyzer {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor Web Vitals
    this.observeWebVitals();
    // Monitor resource loading
    this.observeResourceTiming();
    // Monitor bundle sizes
    this.analyzeBundleSizes();
  }

  observeWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      console.log('🎯 LCP:', this.metrics.lcp.toFixed(2) + 'ms');
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      this.metrics.fid = firstInput.processingStart - firstInput.startTime;
      console.log('👆 FID:', this.metrics.fid.toFixed(2) + 'ms');
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      console.log('📐 CLS:', this.metrics.cls.toFixed(3));
    }).observe({ entryTypes: ['layout-shift'] });
  }

  observeResourceTiming() {
    const resources = performance.getEntriesByType('resource');
    const analysis = {
      totalResources: resources.length,
      totalSize: 0,
      slowResources: [],
      largeResources: []
    };

    resources.forEach(resource => {
      const loadTime = resource.responseEnd - resource.startTime;
      const size = resource.transferSize || 0;
      
      analysis.totalSize += size;

      // Flag slow resources (>1s)
      if (loadTime > 1000) {
        analysis.slowResources.push({
          name: resource.name.split('/').pop(),
          loadTime: loadTime.toFixed(2),
          size: (size / 1024).toFixed(2) + ' KB'
        });
      }

      // Flag large resources (>500KB)
      if (size > 500000) {
        analysis.largeResources.push({
          name: resource.name.split('/').pop(),
          size: (size / 1024 / 1024).toFixed(2) + ' MB'
        });
      }
    });

    console.group('📊 Resource Analysis');
    console.log('Total Resources:', analysis.totalResources);
    console.log('Total Transfer Size:', (analysis.totalSize / 1024 / 1024).toFixed(2) + ' MB');
    
    if (analysis.slowResources.length > 0) {
      console.warn('⚠️ Slow Resources (>1s):', analysis.slowResources);
    }
    
    if (analysis.largeResources.length > 0) {
      console.warn('📦 Large Resources (>500KB):', analysis.largeResources);
    }
    console.groupEnd();

    return analysis;
  }

  analyzeBundleSizes() {
    const scripts = document.querySelectorAll('script[src]');
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    console.group('📦 Bundle Analysis');
    console.log('JavaScript files:', scripts.length);
    console.log('CSS files:', stylesheets.length);
    
    // Check for potential optimizations
    const recommendations = [];
    
    if (scripts.length > 10) {
      recommendations.push('Consider bundling more JavaScript files');
    }
    
    if (stylesheets.length > 5) {
      recommendations.push('Consider consolidating CSS files');
    }

    if (recommendations.length > 0) {
      console.warn('💡 Recommendations:', recommendations);
    }
    console.groupEnd();
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      resourceAnalysis: this.observeResourceTiming(),
      recommendations: this.getRecommendations()
    };

    console.group('📈 Performance Report');
    console.table(this.metrics);
    console.log('Full Report:', report);
    console.groupEnd();

    return report;
  }

  getRecommendations() {
    const recommendations = [];

    if (this.metrics.lcp > 2500) {
      recommendations.push('LCP is slow - optimize largest contentful paint');
    }

    if (this.metrics.fid > 100) {
      recommendations.push('FID is high - reduce JavaScript execution time');
    }

    if (this.metrics.cls > 0.1) {
      recommendations.push('CLS is high - fix layout shifts');
    }

    return recommendations;
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.PerformanceAnalyzer = PerformanceAnalyzer;
  
  // Start analysis after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const analyzer = new PerformanceAnalyzer();
      
      // Generate report after 5 seconds
      setTimeout(() => {
        analyzer.generateReport();
      }, 5000);
    }, 1000);
  });
}