// Simple vanilla router for Aswang Chronicles SPA
class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.contentElement = document.getElementById('app-content') || document.body;
    
    // Listen for route changes
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Handle initial route
    this.handleRoute();
  }

  handleRoute() {
    let path = window.location.pathname;
    
    // Remove base path /iteration1 if present
    const basePath = '/iteration1';
    if (path.startsWith(basePath)) {
      path = path.substring(basePath.length) || '/';
    }
    
    // Handle clean URLs - map them to hash-based routing for SPA
    const routeMap = {
      '/': '/',
      '/game': '/game',
      '/archives': '/archives',
      '/contact': '/contact',
      '/admin': '/admin'
    };
    
    // If path exists in routeMap, use it; otherwise default to home
    path = routeMap[path] || '/';
    
    const route = this.routes[path] || this.routes['/'];
    
    if (route && this.currentRoute !== path) {
      this.currentRoute = path;
      this.loadComponent(route);
      
      // Update browser URL without page reload
      const fullPath = path === '/' ? '/iteration1/' : `/iteration1${path}`;
      if (window.location.pathname !== fullPath) {
        window.history.pushState(null, '', fullPath);
      }
    }
  }

  async loadComponent(component) {
    try {
      // Show loading state
      this.showLoading();
      
      // If component is a function, call it
      if (typeof component === 'function') {
        const html = await component();
        this.renderContent(html);
        this.updateActiveNavigation();
      } else {
        this.renderContent(component);
        this.updateActiveNavigation();
      }
    } catch (error) {
      console.error('Error loading component:', error);
      this.renderContent(this.getErrorPage());
    }
  }

  updateActiveNavigation() {
    // Update active state for navigation links
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const route = link.getAttribute('data-route');
      if (route === currentPath) {
        link.classList.add('active');
      }
    });
  }

  showLoading() {
    this.contentElement.innerHTML = `
      <div class="loading-screen">
        <div class="container text-center d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
          <i class="fas fa-ghost fa-3x mb-4 text-danger" style="animation: float 2s ease-in-out infinite;"></i>
          <h2 style="color: var(--red); font-family: var(--font-header);">Loading Folklore...</h2>
          <div class="spinner-border text-danger mt-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    `;
  }

  getErrorPage() {
    return `
      <div class="error-page">
        <div class="container text-center d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
          <i class="fas fa-skull fa-4x mb-4 text-danger"></i>
          <h1 style="color: var(--red); font-family: var(--font-header);">The Spirits Are Restless</h1>
          <p style="color: var(--light-gray); font-size: 1.2rem;">Something went wrong in the realm of folklore.</p>
          <button class="btn btn-primary mt-3" onclick="window.location.reload()">
            <i class="fas fa-redo me-2"></i>Try Again
          </button>
        </div>
      </div>
    `;
  }

  renderContent(html) {
    if (this.contentElement) {
      this.contentElement.innerHTML = html;
      
      // Remove loading class from body to restore scrolling
      document.body.classList.remove('loading');
      
      // Re-initialize animations for new content
      if (window.initAnimations) {
        window.initAnimations();
      }
      
      // Re-initialize navigation for new content
      if (window.initNavigation) {
        window.initNavigation();
      }
      
      // Re-initialize game controls for new content
      if (this.currentRoute === '/game') {
        import('./gameControls.js').then(module => {
          module.initGameControls();
        }).catch(error => {
          console.warn('Could not load game controls:', error);
        });
      }
      
      // Re-initialize archives modal for new content
      if (this.currentRoute === '/archives') {
        // Add small delay to ensure DOM is fully rendered
        setTimeout(() => {
          import('./archivesModal.js').then(module => {
            module.initArchivesModal();
          }).catch(error => {
            console.warn('Could not load archives modal:', error);
          });
        }, 100);
      }
      
      // Re-initialize lazy loading for new content
      import('./lazyLoader.js').then(module => {
        const lazyLoader = module.getLazyLoader();
        if (lazyLoader) {
          lazyLoader.observeImages();
          lazyLoader.observeAnimations();
        }
      });
      
      // Initialize comment system if on game page
      if (this.currentRoute === '/game') {
        // Add delay to ensure DOM is fully rendered
        setTimeout(() => {
          const commentForm = document.getElementById('commentForm');
          if (commentForm) {
            // Clean up previous comment system if it exists
            if (window.currentCommentSystem) {
              window.currentCommentSystem.destroy()
            }
            
            import('./comments.js').then(module => {
              window.currentCommentSystem = new module.CommentSystem();
              console.log('✅ Comment system initialized');
            }).catch(error => {
              console.error('❌ Could not load comment system:', error);
            });

            // Initialize reporting system
            import('./reportingSystem.js').then(module => {
              console.log('✅ Reporting system initialized');
            }).catch(error => {
              console.error('❌ Could not load reporting system:', error);
            });
          } else {
            console.warn('⚠️ Comment form not found in DOM');
          }
        }, 150);
      }

      // Initialize admin system if on admin page
      if (this.currentRoute === '/admin') {
        // Clean up previous admin system if it exists
        if (window.currentAdminSystem) {
          window.currentAdminSystem.destroy()
        }
        
        import('./adminSystem.js').then(module => {
          window.currentAdminSystem = module.initAdminPage();
        }).catch(error => {
          console.warn('Could not load admin system:', error);
        });
      }
      
      // Initialize share system if on game page
      if (this.currentRoute === '/game') {
        // Add delay to ensure DOM is fully rendered
        setTimeout(() => {
          const shareButtons = document.querySelector('.share-buttons');
          if (shareButtons) {
            import('./share.js').then(module => {
              new module.ShareSystem();
              console.log('✅ Share system initialized');
            }).catch(error => {
              console.error('❌ Could not load share system:', error);
            });
          } else {
            console.warn('⚠️ Share buttons not found in DOM');
          }
        }, 150);
      }
      
      // Notify mobile navigation of route change
      import('./mobileNavigation.js').then(module => {
        const mobileNav = module.getMobileNavigation();
        if (mobileNav) {
          mobileNav.onRouteChange();
        }
      });
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }
  }

  navigateTo(path) {
    const fullPath = path === '/' ? '/iteration1/' : `/iteration1${path}`;
    window.history.pushState(null, '', fullPath);
    this.handleRoute();
  }
}

let router = null;

export function initRouter(routes) {
  router = new Router(routes);
  
  // Make router globally accessible
  window.router = router;
  
  console.log('🧛‍♀️ Router initialized with routes:', Object.keys(routes));
  return router;
}

export function getRouter() {
  return router;
}