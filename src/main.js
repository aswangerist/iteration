// Main entry point for Aswang Chronicles Vite application
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap JavaScript for tab functionality
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles/variables.css'
import './styles/main.css'
import './styles/components.css'

// Import JavaScript modules
import { initNavigation } from './js/navigation.js'
import { initAnimations } from './js/animations.js'
import { initRouter } from './js/router.js'
import { initLazyLoading, PerformanceMonitor } from './js/lazyLoader.js'
import { initMobileNavigation } from './js/mobileNavigation.js'
import { CommentSystem } from './js/comments.js'
import { initGameControls } from './js/gameControls.js'

// Import components
import { HomePage } from './components/HomePage.js'
import { GamePage } from './components/GamePage.js'
import { AswangArchives } from './components/AswangArchives.js'
import { ContactPage } from './components/ContactPage.js'
import { AdminPage } from './components/AdminPage.js'

// PWA Registration
import { registerSW } from 'virtual:pwa-register'

// Initialize PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('🧛‍♀️ Aswang Chronicles is now available offline!')
    showOfflineNotification()
  },
})

function showOfflineNotification() {
  const notification = document.createElement('div')
  notification.innerHTML = `
    <div class="pwa-notification" style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--red);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(189, 3, 0, 0.3);
      z-index: 10000;
      font-family: var(--font-body);
      max-width: 300px;
    ">
      <i class="fas fa-ghost me-2"></i>
      <strong>Offline Ready!</strong><br>
      <small>Aswang Chronicles is now available offline</small>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: none;
        border: none;
        color: white;
        float: right;
        font-size: 1.2rem;
        cursor: pointer;
        margin-top: -5px;
      ">&times;</button>
    </div>
  `
  document.body.appendChild(notification)
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  initNavigation()
  initAnimations()
  initLazyLoading()
  initMobileNavigation()
  initGameControls()
  initBackToTop()
  initScrollAnimations()
  
  // Initialize performance monitoring
  PerformanceMonitor.logWebVitals()
  
  // Initialize router with components
  initRouter({
    '/': HomePage,
    '/game': GamePage,
    '/archives': AswangArchives,
    '/contact': ContactPage,
    '/admin': AdminPage
  })
  
  // Initialize game embed functionality
  initGameEmbed()
  
  // Developer console information
  console.log('🧛‍♀️ Aswang Chronicles initialized with Vite + PWA + Lazy Loading + Mobile Navigation + Back to Top + Game Embed!')
  
  // Note about expected warnings
  setTimeout(() => {
    console.group('📋 Developer Notes');
    console.info('Some console warnings are expected from third-party embeds:');
    console.info('• Firebase development mode messages');
    console.info('• Itch.io iframe feature warnings (monetization, xr)');
    console.info('• AudioContext warnings (resolve on user interaction)');
    console.info('These do not affect functionality and can be safely ignored.');
    console.groupEnd();
  }, 2000);
})

// Game Embed functionality
function initGameEmbed() {
  // Handle game embed overlay click
  document.addEventListener('click', (e) => {
    // Check if event and target exist and have the closest method
    if (!e || !e.target || typeof e.target.closest !== 'function') {
      return;
    }
    
    const overlay = e.target.closest('.game-embed-overlay')
    if (overlay) {
      overlay.style.opacity = '0'
      overlay.style.pointerEvents = 'none'
      
      // Focus on the iframe to enable interaction
      const iframe = overlay.parentElement.querySelector('.game-embed-iframe')
      if (iframe) {
        iframe.focus()
      }
    }
  })
  
  // Re-enable overlay when clicking outside the game area
  document.addEventListener('click', (e) => {
    // Check if event and target exist and have the closest method
    if (!e || !e.target || typeof e.target.closest !== 'function') {
      return;
    }
    
    if (!e.target.closest('.game-embed-container')) {
      const overlays = document.querySelectorAll('.game-embed-overlay')
      overlays.forEach(overlay => {
        overlay.style.opacity = ''
        overlay.style.pointerEvents = ''
      })
    }
  })
}

// Back to Top functionality
function initBackToTop() {
  // Create back to top button if it doesn't exist
  let backToTopBtn = document.getElementById('backToTop')
  
  // Show/hide button based on scroll position
  function toggleBackToTop() {
    backToTopBtn = document.getElementById('backToTop')
    if (backToTopBtn) {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible')
      } else {
        backToTopBtn.classList.remove('visible')
      }
    }
  }
  
  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Add event listeners
  window.addEventListener('scroll', toggleBackToTop)
  
  // Use event delegation for button click since it's dynamically loaded
  document.addEventListener('click', (e) => {
    // Check if event and target exist and have the closest method
    if (!e || !e.target || typeof e.target.closest !== 'function') {
      return;
    }
    
    if (e.target.closest('#backToTop')) {
      e.preventDefault()
      scrollToTop()
    }
  })
  
  // Initial check
  toggleBackToTop()
}

// Scroll animations for archive page
function initScrollAnimations() {
  // Create intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // Observe all elements with animate-on-scroll class
  function observeAnimatedElements() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach(el => observer.observe(el))
  }

  // Re-observe when page content changes
  const pageObserver = new MutationObserver(() => {
    observeAnimatedElements()
  })

  pageObserver.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Initial observation
  observeAnimatedElements()
}