// Footer component for Aswang Chronicles
export function Footer() {
  return `
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
                        <a href="https://www.facebook.com/aswangchronicles1" class="social-link" title="Facebook" target="_blank">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://x.com/aswang389519" class="social-link" title="Twitter" target="_blank">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/aswangchronicles/" class="social-link" title="Instagram" target="_blank">
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
            <div class="row">
                <div class="col-12 text-center mt-2">
                    <small style="opacity: 0.5; font-size: 0.7rem;">
                        Developed by <a href="https://titosenpai.com" target="_blank" style="color: inherit; text-decoration: none;">TitoSenpai</a>
                    </small>
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
