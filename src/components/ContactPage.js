// ContactPage component for Aswang Chronicles
import { Navigation } from './Navigation.js';
import { Footer } from './Footer.js';

export function ContactPage() {
  return `
    ${Navigation('/contact')}

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
                                <div class="social-links d-flex justify-content-center">
                                    <a href="https://www.facebook.com/aswangchronicles1" class="social-link me-3">
                                        <i class="fab fa-facebook fa-2x"></i>
                                    </a>
                                    <a href="https://x.com/aswang389519" class="social-link me-3">
                                        <i class="fab fa-twitter fa-2x"></i>
                                    </a>
                                    <a href="https://www.instagram.com/aswangchronicles/" class="social-link">
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

    ${Footer()}
  `;
}