// Navigation functionality for Aswang Chronicles
export function initNavigation() {
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile navigation toggle
  const navToggler = document.querySelector('.navbar-toggler');
  const navCollapse = document.querySelector('.navbar-collapse');
  
  if (navToggler && navCollapse) {
    navToggler.addEventListener('click', () => {
      navCollapse.classList.toggle('show');
    });
  }

  // Handle route navigation for buttons and links
  document.addEventListener('click', (e) => {
    // Check if event and target exist and have the closest method
    if (!e || !e.target || typeof e.target.closest !== 'function') {
      return;
    }
    
    // Check if the clicked element or its parent has data-route attribute
    const routeElement = e.target.closest('[data-route]');
    if (routeElement) {
      e.preventDefault();
      const route = routeElement.getAttribute('data-route');
      
      // Use router to navigate
      if (window.router) {
        window.router.navigateTo(route);
      } else {
        // Fallback - update URL manually
        window.history.pushState({}, '', route);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  });

  console.log('Navigation initialized with route handling');
}