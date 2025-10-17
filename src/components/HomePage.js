// HomePage component for Aswang Chronicles
export function HomePage() {
  return `
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#" data-route="/">
                <img src="/Assets/WebsiteAssets/Logos/Horizontal.png" alt="Aswang Chronicles Logo" class="logo-icon">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <i class="fas fa-bars" style="color: var(--dark-green); font-size: 1.5rem;"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#" data-route="/">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-route="/game">GAME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-route="/archives">ASWANG ARCHIVES</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-route="/contact">CONTACT US</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section" id="home">
        <!-- Floating Horror Elements -->
        <div class="floating-element animate-on-scroll">
            <i class="fas fa-ghost fa-4x"></i>
        </div>
        <div class="floating-element animate-on-scroll">
            <i class="fas fa-skull fa-3x"></i>
        </div>
        <div class="floating-element animate-on-scroll">
            <i class="fas fa-eye fa-3x"></i>
        </div>
        <div class="floating-element animate-on-scroll">
            <i class="fas fa-spider fa-2x"></i>
        </div>
        
        <!-- Blood drip effects -->
        <div class="blood-drip" style="right: 15%; animation-delay: 0s;"></div>
        <div class="blood-drip" style="right: 25%; animation-delay: 2s;"></div>
        <div class="blood-drip" style="right: 35%; animation-delay: 4s;"></div>
        
        <div class="container">
            <div class="hero-content animate-on-scroll">
                <div class="hero-badge">
                    <i class="fas fa-star me-2"></i>
                    Filipino Folklore Experience
                </div>
                <div class="hero-main-title">
                    DISCOVER THE<br>
                    <span class="title-highlight">ASWANG</span><br>
                    CHRONICLES
                </div>
                <div class="hero-subtitle">
                    Immerse yourself in Filipino mythology through interactive storytelling and digital exploration!
                </div>
                <div class="hero-actions">
                    <button class="cta-button primary" data-route="/game">
                        <i class="fas fa-play-circle me-2"></i>
                        Start Your Journey
                    </button>
                    <button class="cta-button secondary" data-route="/archives">
                        <i class="fas fa-book-open me-2"></i>
                        Explore Archives
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section py-5" id="about">
        <div class="container">
            <div class="section-header text-center mb-5">
                <h2 class="section-title animate-on-scroll">Why Aswang Chronicles?</h2>
                <p class="section-subtitle animate-on-scroll"></p>
            </div>

            <!-- Features Grid -->
            <div class="row g-4 mb-5">
                <div class="col-lg-4 col-md-6">
                    <div class="feature-card animate-on-scroll">
                        <div class="feature-icon">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <h4 class="feature-title">Explore Archives</h4>
                        <p class="feature-text">Uncover stories that bridge folklore with modern storytelling.
</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="feature-card animate-on-scroll">
                        <div class="feature-icon">
                            <i class="fas fa-map-marked-alt"></i>
                        </div>
                        <h4 class="feature-title">Interactive Stories</h4>
                        <p class="feature-text">Experience Filipino folklore through immersive, choice-driven narratives that bring ancient tales to life.
</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="feature-card animate-on-scroll">
                        <div class="feature-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h4 class="feature-title">Cultural Learning</h4>
                        <p class="feature-text">Learn about Filipino heritage through engaging content that preserves and celebrates tradition.
</p>
                    </div>
                </div>
            </div>

            <!-- Story Showcase Row -->
            <div class="row align-items-center mb-5">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <div class="story-showcase animate-on-scroll">
                        <img 
                            data-src="/Assets/WebsiteAssets/Fillers/Filler 2.PNG" 
                            alt="Interactive Stories" 
                            class="img-fluid rounded shadow-lg lazy-image"
                            loading="lazy"
                        >
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="content-block animate-on-scroll">
                        <h3 class="content-title">Stories That Come Alive</h3>
                        <p class="content-text">
                            Our interactive narratives put you in control of the story. Make choices that influence the outcome and discover multiple paths through each tale.
                        </p>
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle me-2"></i>Multiple story outcomes</li>
                            <li><i class="fas fa-check-circle me-2"></i>Rich character development</li>
                            <li><i class="fas fa-check-circle me-2"></i>Authentic cultural context</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Mission & Vision Row -->
            <div class="row">
                <div class="col-lg-6 mb-4">
                    <div class="mission-vision-card animate-on-scroll">
                        <div class="card-icon mb-3">
                            <img 
                                data-src="/Assets/WebsiteAssets/Iconmarks/Icon3.PNG" 
                                alt="Mission Icon" 
                                class="icon-img lazy-image"
                                loading="lazy"
                            >
                        </div>
                        <h4 class="card-title">Mission</h4>
                        <p class="card-text">
                            To keep Tagalog folklore alive by blending it with interactive storytelling, digital media, and engaging content that promotes curiosity and cultural pride.

                        </p>
                    </div>
                </div>
                <div class="col-lg-6 mb-4">
                    <div class="mission-vision-card animate-on-scroll">
                        <div class="card-icon mb-3">
                            <img 
                                data-src="/Assets/WebsiteAssets/Iconmarks/Icon2.PNG" 
                                alt="Vision Icon" 
                                class="icon-img lazy-image"
                                loading="lazy"
                            >
                        </div>
                        <h4 class="card-title">Our Vision</h4>
                        <p class="card-text">
                            A future where Philippine folklore isn’t just something you read about in history books but rather a thriving part of pop culture, conversations, and creative works for generations to come.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Welcome Section -->
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="welcome-section-card animate-on-scroll text-center mt-5">
                        <div class="welcome-content">
                            <h3 class="content-title mb-4">Welcome to Our Realm</h3>
                            <div class="welcome-text">
                                <p class="mb-3">
                                    Welcome to a realm where myth meets modern storytelling!
                                </p>
                                <p class="mb-0">
                                    This project is a fictional web graphic hypernarrative designed to reintroduce Tagalog folklore to the digital generation.
                                </p>
                                <p class="mb-0">
                                    Through immersive choice-based stories and folklore archives, we're making sure these age-old tales don't just survive but rather thrive.
                                </p>
                                <p class="mb-0">
                                    Whether you're here to learn, explore, or just have fun with some eerie yet fascinating legends, you're in the right place!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="footer-brand">
                        <img src="/Assets/WebsiteAssets/Logos/Horizontal.png" alt="Aswang Chronicles" class="footer-logo">
                        <p class="footer-description">
                            Preserving Filipino folklore through interactive storytelling and digital exploration.
                        </p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h5 class="footer-title">Explore</h5>
                    <ul class="footer-links">
                        <li><a href="#" data-route="/">Home</a></li>
                        <li><a href="#" data-route="/archives">Aswang Archives</a></li>
                        <li><a href="#" data-route="/contact">Contact Us</a></li>
                        <li><a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test" target="_blank">Play Game</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <h5 class="footer-title">Resources</h5>
                    <ul class="footer-links">
                        <li><a href="#about">About Project</a></li>
                        <li><a href="#" data-route="/archives">Folklore Database</a></li>
                        <li><a href="#">Cultural Guide</a></li>
                        <li><a href="#">Educational Content</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <h5 class="footer-title">Connect</h5>
                    <div class="footer-social">
                        <a href="#" class="social-link" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test" class="social-link" title="Itch.io" target="_blank">
                            <i class="fab fa-itch-io"></i>
                        </a>
                    </div>
                    <p class="footer-contact">
                        <i class="fas fa-envelope me-2"></i>
                        hello@aswangchronicles.com
                    </p>
                </div>
            </div>
            <hr class="footer-divider">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="footer-copyright">
                        &copy; 2025 Aswang Chronicles. All rights reserved.
                    </p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="footer-credits">
                        Made with <i class="fas fa-heart text-red"></i> for Filipino culture
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" title="Back to Top">
        <i class="fas fa-chevron-up"></i>
    </button>
  `;
}