// GamePage component for Aswang Chronicles
import { Navigation } from './Navigation.js';
import { Footer } from './Footer.js';
import { GAMES } from '../data/gameData.js';

export function GamePage() {
  const gameEmbeds = GAMES.map((game, index) => `
    <section class="game-section py-5 ${index % 2 === 1 ? 'bg-dark' : ''}">
        <div class="container">
            <div class="row ${index > 0 ? 'mt-5' : ''}">
                <div class="col-12">
                    <div class="game-embed-section animate-on-scroll">
                        <div class="text-center mb-4">
                            <h${index === 0 ? '1' : '2'} class="game-embed-title">${game.title}</h${index === 0 ? '1' : '2'}>
                            <p class="game-embed-subtitle">${game.subtitle}</p>
                        </div>
                        <div class="${game.containerClass}">
                            <iframe 
                                frameborder="0" 
                                src="${game.iframeSrc}" 
                                allowfullscreen="" 
                                width="1080" 
                                height="800"
                                class="${game.iframeClass}"
                                title="${game.title}"
                                loading="lazy"
                                allow="autoplay; fullscreen; camera 'none'; microphone 'none'; geolocation 'none'; midi 'none'; accelerometer 'none'; gyroscope 'none'; xr-spatial-tracking 'none'; cross-origin-isolated 'none'"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation">
                                <a href="${game.itchUrl}">Play ${game.title} on itch.io</a>
                            </iframe>
                        </div>
                        <div class="text-center mt-4">
                            <button onclick="enterGameFullscreen('${game.gameKey}')" class="btn-play-fullscreen">
                                <i class="fas fa-expand me-2"></i>
                                Play in Full Screen
                            </button>
                            <a href="${game.itchUrl}" target="_blank" class="btn-play-itch ms-3">
                                <i class="fab fa-itch-io me-2"></i>
                                Play on Itch.io
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `).join('');

  return `
    ${Navigation('/game')}

    ${gameEmbeds}

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

    ${Footer()}
  `;
}