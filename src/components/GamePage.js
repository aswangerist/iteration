// GamePage component for Aswang Chronicles
export function GamePage() {
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
                        <a class="nav-link active" href="#" data-route="/game">GAME</a>
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

    <!-- Game Embed Section -->
    <section class="game-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="game-embed-section animate-on-scroll">
                        <div class="text-center mb-4">
                            <h1 class="game-embed-title">Aswang Chronicles: Spoon Test</h1>
                            <p class="game-embed-subtitle">Experience the prototype of our interactive Filipino folklore adventure</p>
                        </div>
                        <div class="game-embed-container">
                            <iframe 
                                frameborder="0" 
                                src="https://itch.io/embed-upload/14090605?color=1e1e1e" 
                                width="1080" 
                                height="800"
                                class="game-embed-iframe"
                                title="Aswang Chronicles: Spoon Test"
                                loading="lazy"
                                allow="autoplay; fullscreen; camera 'none'; microphone 'none'; geolocation 'none'; midi 'none'; accelerometer 'none'; gyroscope 'none'; xr-spatial-tracking 'none'; cross-origin-isolated 'none'"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation">
                                <a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test">Play Aswang Chronicles: Spoon Test on itch.io</a>
                            </iframe>
                        </div>
                        <div class="text-center mt-4">
                            <button onclick="enterGameFullscreen()" class="btn-play-fullscreen">
                                <i class="fas fa-expand me-2"></i>
                                Play in Full Screen
                            </button>
                            <a href="https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test" target="_blank" class="btn-play-itch ms-3">
                                <i class="fab fa-itch-io me-2"></i>
                                Play on Itch.io
                            </a>
                        </div>
                        
                        <!-- Background Toggle -->
                        <div class="text-center mt-4">
                            <div class="background-toggle-container">
                                <label class="background-toggle-label">
                                    <input type="checkbox" id="backgroundToggle" class="background-toggle-checkbox">
                                    <span class="background-toggle-slider"></span>
                                    <span class="background-toggle-text">
                                        <i class="fas fa-moon me-2"></i>
                                        Dark Mode for Better Gaming
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Second Game Embed Section -->
    <section class="game-section py-5 bg-dark">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="game-embed-section animate-on-scroll">
                        <div class="text-center mb-4">
                            <h2 class="game-embed-title">Aswang Chronicles: Left In the Shadows</h2>
                            <p class="game-embed-subtitle">Discover another chapter in our Filipino folklore collection</p>
                        </div>
                        <div class="second-game-embed-container">
                            <iframe 
                                frameborder="0" 
                                src="https://itch.io/embed-upload/15242150?color=333333" 
                                allowfullscreen="" 
                                width="1080" 
                                height="600"
                                class="second-game-embed-iframe"
                                title="Aswang Chronicles: Left In the Shadows"
                                loading="lazy"
                                allow="autoplay; fullscreen; camera 'none'; microphone 'none'; geolocation 'none'; midi 'none'; accelerometer 'none'; gyroscope 'none'; xr-spatial-tracking 'none'; cross-origin-isolated 'none'"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation">
                                <a href="https://aswang-chronicles.itch.io/aswang-chronicles-left-in-the-shadows">Play Aswang Chronicles: Left In the Shadows on itch.io</a>
                            </iframe>
                        </div>
                        <div class="text-center mt-4">
                            <a href="https://aswang-chronicles.itch.io/aswang-chronicles-left-in-the-shadows" target="_blank" class="btn-play-itch">
                                <i class="fab fa-itch-io me-2"></i>
                                Play on Itch.io
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Share Section -->
    <section class="share-section py-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="share-container text-center animate-on-scroll">
                        <h4 class="share-title">Enjoyed the Experience? Share It!</h4>
                        <p class="share-subtitle">Help spread Filipino folklore to the world</p>
                        <div class="share-buttons">
                            <button class="share-btn facebook" onclick="shareOnFacebook()" title="Share on Facebook">
                                <i class="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </button>
                            <button class="share-btn twitter" onclick="shareOnTwitter()" title="Share on Twitter">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </button>
                            <button class="share-btn whatsapp" onclick="shareOnWhatsApp()" title="Share on WhatsApp">
                                <i class="fab fa-whatsapp"></i>
                                <span>WhatsApp</span>
                            </button>
                            <button class="share-btn linkedin" onclick="shareOnLinkedIn()" title="Share on LinkedIn">
                                <i class="fab fa-linkedin-in"></i>
                                <span>LinkedIn</span>
                            </button>
                            <button class="share-btn reddit" onclick="shareOnReddit()" title="Share on Reddit">
                                <i class="fab fa-reddit-alien"></i>
                                <span>Reddit</span>
                            </button>
                            <button class="share-btn copy-link" onclick="copyGameLink()" title="Copy Link">
                                <i class="fas fa-link"></i>
                                <span>Copy Link</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Comments Section -->
    <section class="comments-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="comments-container animate-on-scroll">
                        <div class="comments-header text-center mb-4">
                            <h3 class="comments-title">Player Reviews & Comments</h3>
                            <p class="comments-subtitle">Share your experience with the Aswang Chronicles community</p>
                            <div class="firebase-status" id="firebaseStatus">
                                <i class="fas fa-circle status-indicator"></i>
                                <span class="status-text">Connecting...</span>
                            </div>
                        </div>

                        <!-- Comment Form -->
                        <div class="comment-form-container mb-5">
                            <form class="comment-form" id="commentForm">
                                <div class="form-group mb-3">
                                    <label for="playerName" class="form-label">Player Name</label>
                                    <input type="text" class="form-control comment-input" id="playerName" placeholder="Enter your name..." required maxlength="50">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="gameRating" class="form-label">Rating</label>
                                    <div class="rating-container">
                                        <div class="star-rating" id="starRating">
                                            <span class="star" data-rating="1">★</span>
                                            <span class="star" data-rating="2">★</span>
                                            <span class="star" data-rating="3">★</span>
                                            <span class="star" data-rating="4">★</span>
                                            <span class="star" data-rating="5">★</span>
                                        </div>
                                        <span class="rating-text" id="ratingText">Click to rate</span>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="commentText" class="form-label">Your Review</label>
                                    <textarea class="form-control comment-textarea" id="commentText" rows="4" placeholder="Share your thoughts about Aswang Chronicles..." required maxlength="500"></textarea>
                                    <div class="character-count">
                                        <span id="charCount">0</span>/500 characters
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="favoriteAspect" class="form-label">Favorite Aspect</label>
                                    <select class="form-control comment-select" id="favoriteAspect">
                                        <option value="">Select what you enjoyed most...</option>
                                        <option value="story">Engaging Storyline</option>
                                        <option value="choices">Multiple Choice Paths</option>
                                        <option value="folklore">Filipino Folklore Elements</option>
                                        <option value="characters">Character Development</option>
                                        <option value="atmosphere">Atmosphere & Design</option>
                                        <option value="educational">Educational Value</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn-submit-comment">
                                    <i class="fas fa-paper-plane me-2"></i>
                                    Post Review
                                </button>
                            </form>
                        </div>

                        <!-- Comments Display -->
                        <div class="comments-display">
                            <div class="comments-stats mb-4">
                                <div class="row text-center">
                                    <div class="col-md-4">
                                        <div class="stat-card">
                                            <i class="fas fa-comments stat-icon"></i>
                                            <h4 class="stat-number" id="totalComments">0</h4>
                                            <p class="stat-label">Total Reviews</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="stat-card">
                                            <i class="fas fa-star stat-icon"></i>
                                            <h4 class="stat-number" id="averageRating">0.0</h4>
                                            <p class="stat-label">Average Rating</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="stat-card">
                                            <i class="fas fa-heart stat-icon"></i>
                                            <h4 class="stat-number" id="recommendPercent">0%</h4>
                                            <p class="stat-label">Would Recommend</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="comments-list" id="commentsList">
                                <!-- Comments will be dynamically inserted here -->
                            </div>

                            <div class="comments-empty text-center" id="commentsEmpty">
                                <i class="fas fa-comment-slash fa-3x mb-3"></i>
                                <h5>No reviews yet</h5>
                                <p>Be the first to share your experience with Aswang Chronicles!</p>
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
                        <li><a href="#" data-route="/game">Game</a></li>
                        <li><a href="#" data-route="/archives">Aswang Archives</a></li>
                        <li><a href="#" data-route="/contact">Contact Us</a></li>
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