// AswangArchives component for Aswang Chronicles
export function AswangArchives() {
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
                        <a class="nav-link active" href="#" data-route="/archives">ASWANG ARCHIVES</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-route="/contact">CONTACT US</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Archive Header -->
    <section class="archive-header">
        <div class="container">
            <h1 class="archive-title animate-on-scroll">ASWANG ARCHIVES</h1>
            <p class="archive-subtitle animate-on-scroll">Delve into the Dark Legends of Philippine Folklore</p>
        </div>
        
        <!-- Floating Elements -->
        <div class="floating-element"><i class="fas fa-skull fa-3x"></i></div>
        <div class="floating-element"><i class="fas fa-ghost fa-4x"></i></div>
        <div class="floating-element"><i class="fas fa-eye fa-2x"></i></div>
        <div class="floating-element"><i class="fas fa-spider fa-3x"></i></div>
    </section>

    <!-- What is an Aswang Section -->
    <section class="archive-content-section section-bg" id="what-is-aswang">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h2 class="section-title animate-on-scroll">What is an Aswang?</h2>
                    <p class="content-text animate-on-scroll">
                        In Philippine folklore, the aswang is a sinister shapeshifter with traits similar to vampires, werewolves, and ghouls. Since its appearance varies depending on location, there is no single, definitive description. Over time, the term "aswang" has been broadly used to describe most malevolent creatures that lurk in the night, often based on hearsay and evolving regional interpretations.
                    </p>
                </div>
                <div class="col-lg-4">
                    <div class="content-image animate-on-scroll">
                        <img 
                            data-src="/Assets/WebsiteAssets/Background/BG4.PNG" 
                            alt="Aswang Illustration" 
                            class="img-fluid lazy-image"
                            loading="lazy"
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Origins Section -->
    <section class="archive-content-section section-bg-alt" id="origins">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 order-lg-1">
                    <div class="content-image animate-on-scroll">
                        <img 
                            data-src="/Assets/WebsiteAssets/Background/BG3.png" 
                            alt="Origins of Aswang" 
                            class="img-fluid lazy-image"
                            loading="lazy"
                        >
                    </div>
                </div>
                <div class="col-lg-8 order-lg-2">
                    <h2 class="section-title animate-on-scroll">Origins of the Aswang</h2>
                    <p class="content-text animate-on-scroll">
                        The word "aswang" comes from the Filipino term aso-wang, meaning "dog-like," as these creatures are often said to take the form of dogs. According to historian Professor Anthony Lim, the aswang legend may have social and scientific roots. He suggests that supernatural beliefs, including those surrounding the aswang, were introduced to the Philippines during the Malay migration in the 13th century.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Types of Aswang Section -->
    <section class="archive-content-section section-bg" id="types">
        <div class="container">
            <h2 class="section-title animate-on-scroll">Types of Aswang</h2>
            
            <div class="aswang-grid">
                <div class="aswang-card animate-on-scroll">
                    <img 
                        data-src="/Assets/WebsiteAssets/Aswangcards/Berbalang.PNG" 
                        alt="Berbalang" 
                        class="aswang-image lazy-image"
                        loading="lazy"
                    >
                    <div class="image-overlay"></div>
                    <div class="aswang-content">
                        <h3 class="aswang-name">Berbalang</h3>
                        <p class="aswang-description">
                            The Berbalang are mythical creatures in Filipino culture that resemble humans but have vampire-like features, including wings and protruding eyes. They are said to dig up graves to feast on corpses.
                            <br><br>
                            The only known defense against them is the cacao-nut pearl, an opal-like stone sometimes found inside cacao nuts. However, its magical properties only work for the one who originally found it. If passed on, its power fades, and when the finder dies, the pearl loses its glow.
                        </p>
                    </div>
                </div>
                
                <div class="aswang-card animate-on-scroll">
                    <img 
                        data-src="/Assets/WebsiteAssets/Aswangcards/Sigbin.PNG" 
                        alt="Sigbin" 
                        class="aswang-image lazy-image"
                        loading="lazy"
                    >
                    <div class="image-overlay"></div>
                    <div class="aswang-content">
                        <h3 class="aswang-name">Sigbin</h3>
                        <p class="aswang-description">
                            A peculiar form of aswang that resembles a cross between a dog and a kangaroo. It is believed to walk backward with its head tucked between its legs and has the ability to become invisible. Even today, they are often blamed for the mysterious disappearance of chickens and livestock.
                        </p>
                    </div>
                </div>
                
                <div class="aswang-card animate-on-scroll">
                    <img 
                        data-src="/Assets/WebsiteAssets/Aswangcards/Nuno.PNG" 
                        alt="Nuno" 
                        class="aswang-image lazy-image"
                        loading="lazy"
                    >
                    <div class="image-overlay"></div>
                    <div class="aswang-content">
                        <h3 class="aswang-name">Nuno</h3>
                        <p class="aswang-description">
                            The Nuno is a dwarf-like spirit in Philippine mythology, believed to reside in punso (mounds or anthills). Its name literally translates to "Ancestor who dwells in the anthill."
                        </p>
                    </div>
                </div>
                
                <div class="aswang-card animate-on-scroll">
                    <img 
                        data-src="/Assets/WebsiteAssets/Aswangcards/Tiktik .PNG" 
                        alt="Tik-Tik" 
                        class="aswang-image lazy-image"
                        loading="lazy"
                    >
                    <div class="image-overlay"></div>
                    <div class="aswang-content">
                        <h3 class="aswang-name">Tik-Tik / WakWak</h3>
                        <p class="aswang-description">
                            Similar to the manananggal, these bird-like creatures prey on humans. Their name comes from the sound their wings make as they fly.
                            <br><br>
                            If the flapping sound is loud, it means they are far away, but if it becomes softer, they may be dangerously close—ready to strike. These creatures are said to harm their victims before feasting on their hearts.
                        </p>
                    </div>
                </div>
                
                <div class="aswang-card animate-on-scroll">
                    <img 
                        data-src="/Assets/WebsiteAssets/Aswangcards/Mananangal.PNG" 
                        alt="Manananggal" 
                        class="aswang-image lazy-image"
                        loading="lazy"
                    >
                    <div class="image-overlay"></div>
                    <div class="aswang-content">
                        <h3 class="aswang-name">Manananggal</h3>
                        <p class="aswang-description">
                            The manananggal is a type of aswang that can separate its upper body from its lower half and take flight.
                            <br><br>
                            Like the tiktik, these creatures are known for preying on unborn babies by extending their long tongues from rooftops to feed on fetuses.
                            <br><br>
                            To defeat a manananggal, one must find its abandoned lower body during its nightly hunt and sprinkle salt, ashes, or garlic onto the exposed flesh. This prevents the creature from reattaching itself, leaving it vulnerable to sunlight, which ultimately destroys it.
                        </p>
                    </div>
                </div>
                
                <div class="aswang-card animate-on-scroll">
                    <img 
                        data-src="/Assets/WebsiteAssets/Aswangcards/Kapre.PNG" 
                        alt="Kapre" 
                        class="aswang-image lazy-image"
                        loading="lazy"
                    >
                    <div class="image-overlay"></div>
                    <div class="aswang-content">
                        <h3 class="aswang-name">Kapre</h3>
                        <p class="aswang-description">
                            The Kapre is a giant, tree-dwelling creature in Philippine folklore, often depicted as a dark-skinned, cigar-smoking figure with glowing eyes. Unlike other aswang that actively hunt humans, the Kapre is more of a trickster, known for confusing travelers, making them lose their way in the forest, and sometimes forming bonds with humans.
                            <br><br>
                            They are believed to reside in large trees such as balete, mango, or acacia, watching over their territory. While not inherently malevolent, angering a Kapre can lead to misfortune. In some stories, they give enchanted stones to humans they favor, granting them luck or invisibility.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Cultural Impact Section -->
    <section class="impact-section" id="cultural-impact">
        <div class="container">
            <h2 class="section-title animate-on-scroll">The Impact of Aswangs in Filipino Culture and History</h2>
            <p class="content-text text-center animate-on-scroll">
                The aswang isn't just a myth—it's a cultural force that has shaped Filipino fears, traditions, and even history. Used as both folklore and a tool for control, stories of the aswang have been passed down for generations, influencing superstitions, social behaviors, and even historical events.
            </p>
            
            <div class="impact-grid">
                <div class="impact-card animate-on-scroll">
                    <h3 class="impact-title">Fear as Social Control</h3>
                    <p class="impact-text">
                        During the Spanish colonial period, the aswang legend was reportedly used to instill fear in rural communities, discouraging revolts and non-Christian practices.
                    </p>
                </div>
                
                <div class="impact-card animate-on-scroll">
                    <h3 class="impact-title">A Reflection of Society</h3>
                    <p class="impact-text">
                        The aswang has often been tied to social anxieties—fear of the unknown, the outcast, or even powerful women. In some regions, independent women, midwives, and herbalists were even accused of being aswangs.
                    </p>
                </div>
                
                <div class="impact-card animate-on-scroll">
                    <h3 class="impact-title">Shaping Superstitions and Rituals</h3>
                    <p class="impact-text">
                        From keeping garlic at doorways to avoiding travel at night, many Filipino customs stem from a fear of the aswang.
                    </p>
                </div>
                
                <div class="impact-card animate-on-scroll">
                    <h3 class="impact-title">The Aswang in Modern Media</h3>
                    <p class="impact-text">
                        Despite being a creature of the past, the aswang has never completely faded. From classic horror films to pop culture hits like Trese, the aswang remains one of the Philippines' most recognizable supernatural beings. It continues to serve as a symbol of our deep-rooted beliefs, fears, and imagination.
                    </p>
                </div>
            </div>
            
            <div class="text-center mt-5">
                <p class="content-text animate-on-scroll" style="font-size: 1.3rem; font-style: italic; color: var(--red);">
                    The aswang is more than just a monster—it's a mirror of Filipino history and a legend that refuses to be forgotten.
                </p>
            </div>
        </div>
        
        <!-- More Floating Elements -->
        <div class="floating-element"><i class="fas fa-bat fa-2x"></i></div>
        <div class="floating-element"><i class="fas fa-crow fa-3x"></i></div>
        <div class="floating-element"><i class="fas fa-spider fa-2x"></i></div>
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