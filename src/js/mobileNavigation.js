// Mobile navigation enhancements for Aswang Chronicles
export class MobileNavigation {
  constructor() {
    this.isMenuOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.init();
  }

  init() {
    this.setupTouchGestures();
    this.setupMobileMenu();
    this.setupBottomNavigation();
    this.setupScrollBehavior();
  }

  setupTouchGestures() {
    let startX, startY;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Swipe right to open menu (if starting from left edge)
      if (startX < 50 && deltaX > 100 && Math.abs(deltaY) < 100) {
        this.openMobileMenu();
      }
      
      // Swipe left to close menu
      if (this.isMenuOpen && deltaX < -100 && Math.abs(deltaY) < 100) {
        this.closeMobileMenu();
      }
      
      // Swipe down to show navigation
      if (deltaY > 50 && Math.abs(deltaX) < 100) {
        this.showNavigation();
      }
      
      // Swipe up to hide navigation
      if (deltaY < -50 && Math.abs(deltaX) < 100) {
        this.hideNavigation();
      }
    }, { passive: true });
  }

  setupMobileMenu() {
    // Create mobile overlay menu
    const mobileMenuHTML = `
      <div id="mobile-menu-overlay" class="mobile-menu-overlay">
        <div class="mobile-menu-content">
          <div class="mobile-menu-header">
            <img src="/Assets/WebsiteAssets/Logos/Horizontal.png" alt="Aswang Chronicles" class="mobile-logo">
            <button class="mobile-menu-close" aria-label="Close menu">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <nav class="mobile-nav-links">
            <a href="#" data-route="/" class="mobile-nav-link">
              <i class="fas fa-home"></i>
              <span>Home</span>
            </a>
            <a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test" target="_blank" class="mobile-nav-link">
              <i class="fas fa-gamepad"></i>
              <span>Play Game</span>
            </a>
            <a href="#" data-route="/archives" class="mobile-nav-link">
              <i class="fas fa-book-open"></i>
              <span>Aswang Archives</span>
            </a>
            <a href="#" data-route="/contact" class="mobile-nav-link">
              <i class="fas fa-envelope"></i>
              <span>Contact Us</span>
            </a>
          </nav>
          <div class="mobile-menu-footer">
            <p>Preserving Filipino Folklore</p>
            <div class="mobile-social-links">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    
    // Add event listeners
    const menuToggle = document.querySelector('.navbar-toggler');
    const menuClose = document.querySelector('.mobile-menu-close');
    const overlay = document.querySelector('#mobile-menu-overlay');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    if (menuClose) {
      menuClose.addEventListener('click', () => this.closeMobileMenu());
    }
    
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeMobileMenu();
        }
      });
    }
  }

  setupBottomNavigation() {
    // Create bottom navigation for mobile
    const bottomNavHTML = `
      <div id="bottom-navigation" class="bottom-navigation">
        <a href="#" data-route="/" class="bottom-nav-item">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="#" data-route="/archives" class="bottom-nav-item">
          <i class="fas fa-book-open"></i>
          <span>Archives</span>
        </a>
        <a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test" target="_blank" class="bottom-nav-item">
          <i class="fas fa-gamepad"></i>
          <span>Game</span>
        </a>
        <a href="#" data-route="/contact" class="bottom-nav-item">
          <i class="fas fa-envelope"></i>
          <span>Contact</span>
        </a>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
    this.updateActiveBottomNav();
  }

  setupScrollBehavior() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector('.navbar');
      const bottomNav = document.querySelector('#bottom-navigation');
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navigation
        if (navbar) navbar.style.transform = 'translateY(-100%)';
        if (bottomNav) bottomNav.style.transform = 'translateY(100%)';
      } else {
        // Scrolling up - show navigation
        if (navbar) navbar.style.transform = 'translateY(0)';
        if (bottomNav) bottomNav.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const overlay = document.querySelector('#mobile-menu-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.isMenuOpen = true;
    }
  }

  closeMobileMenu() {
    const overlay = document.querySelector('#mobile-menu-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      this.isMenuOpen = false;
    }
  }

  showNavigation() {
    const navbar = document.querySelector('.navbar');
    const bottomNav = document.querySelector('#bottom-navigation');
    
    if (navbar) navbar.style.transform = 'translateY(0)';
    if (bottomNav) bottomNav.style.transform = 'translateY(0)';
  }

  hideNavigation() {
    const navbar = document.querySelector('.navbar');
    const bottomNav = document.querySelector('#bottom-navigation');
    
    if (navbar) navbar.style.transform = 'translateY(-100%)';
    if (bottomNav) bottomNav.style.transform = 'translateY(100%)';
  }

  updateActiveBottomNav() {
    const currentPath = window.location.pathname;
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    bottomNavItems.forEach(item => {
      item.classList.remove('active');
      const route = item.getAttribute('data-route');
      if (route === currentPath) {
        item.classList.add('active');
      }
    });
  }

  // Call this when route changes
  onRouteChange() {
    this.updateActiveBottomNav();
    this.closeMobileMenu();
  }
}

// Initialize mobile navigation
let mobileNavInstance = null;

export function initMobileNavigation() {
  if (!mobileNavInstance) {
    mobileNavInstance = new MobileNavigation();
  }
  return mobileNavInstance;
}

export function getMobileNavigation() {
  return mobileNavInstance;
}