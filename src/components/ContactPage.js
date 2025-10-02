// ContactPage component for Aswang Chronicles
export function ContactPage() {
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
                        <a class="nav-link" href="#" data-route="/">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-route="/game">GAME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-route="/archives">ASWANG ARCHIVES</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#" data-route="/contact">CONTACT US</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contact Content -->
    <section class="contact-section section">
        <div class="container">
            <div class="text-center mb-5" style="margin-top: 120px;">
                <h1 class="title-main">CONTACT US</h1>
                <p class="subtitle">Get in touch with the Aswang Chronicles team</p>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-card">
                        <div class="card-body p-5">
                            <div class="row">
                                <div class="col-md-6 mb-4">
                                    <div class="contact-info">
                                        <i class="fas fa-envelope fa-3x mb-3" style="color: var(--red);"></i>
                                        <h4>Email Us</h4>
                                        <p>Send us your questions, feedback, or folklore submissions</p>
                                        <a href="mailto:contact@aswangchronicles.com" class="btn btn-primary">
                                            Send Email
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="contact-info">
                                        <i class="fas fa-gamepad fa-3x mb-3" style="color: var(--red);"></i>
                                        <h4>Play Our Game</h4>
                                        <p>Experience the interactive stories firsthand</p>
                                        <a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test" 
                                           target="_blank" class="btn btn-primary">
                                            Play Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="text-center mt-4">
                                <h5>Follow Our Journey</h5>
                                <p>Stay updated with new stories and folklore discoveries</p>
                                <div class="social-links">
                                    <a href="#" class="social-link me-3">
                                        <i class="fab fa-facebook fa-2x"></i>
                                    </a>
                                    <a href="#" class="social-link me-3">
                                        <i class="fab fa-twitter fa-2x"></i>
                                    </a>
                                    <a href="#" class="social-link">
                                        <i class="fab fa-instagram fa-2x"></i>
                                    </a>
                                </div>
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
                        <li><a href="#" data-route="/">About Project</a></li>
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