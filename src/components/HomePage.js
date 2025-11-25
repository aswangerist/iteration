// HomePage component for Aswang Chronicles
import { Navigation } from './Navigation.js';
import { Footer } from './Footer.js';

export function HomePage() {
  return `
    ${Navigation('/')}

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
                            data-src="/Assets/WebsiteAssets/Fillers/Filler 2.webp" 
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

    ${Footer()}
  `;
}