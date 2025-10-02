// Animation effects for Aswang Chronicles
export function initAnimations() {
  // Parallax effect for floating elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    const speed = 0.5;

    parallax.forEach(element => {
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Typing effect for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typing effect when page loads
  const heroTitle = document.querySelector('.hero-main-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }

  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.mission-vision-card, .about-image').forEach(el => {
    observer.observe(el);
  });

  console.log('Animations initialized');
}

// Utility function to add glow effect to elements
export function addGlowEffect(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.style.animation = 'glow 4s ease-in-out infinite alternate';
  });
}