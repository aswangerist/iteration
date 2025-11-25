// Navigation component for Aswang Chronicles
export function Navigation(activePage = '/') {
  const isActive = (page) => activePage === page ? 'active' : '';
  
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
                        <a class="nav-link ${isActive('/')}" href="#" data-route="/">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${isActive('/game')}" href="#" data-route="/game">GAME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${isActive('/archives')}" href="#" data-route="/archives">ASWANG ARCHIVES</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${isActive('/contact')}" href="#" data-route="/contact">CONTACT US</a>
                    </li>
                    ${activePage === '/admin' ? `
                    <li class="nav-item">
                        <a class="nav-link active" href="#" data-route="/admin">
                            <i class="fas fa-shield-alt"></i> ADMIN
                        </a>
                    </li>
                    ` : ''}
                </ul>
            </div>
        </div>
    </nav>
  `;
}
