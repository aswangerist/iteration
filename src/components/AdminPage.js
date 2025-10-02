// Admin Page for Aswang Chronicles Content Moderation
export function AdminPage() {
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
                        <a class="nav-link" href="#" data-route="/contact">CONTACT US</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#" data-route="/admin">
                            <i class="fas fa-shield-alt"></i> ADMIN
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Admin Authentication Section -->
    <section id="adminAuth" class="py-5" style="min-height: 80vh; display: flex; align-items: center;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="card bg-dark border-secondary">
                        <div class="card-body p-4">
                            <div class="text-center mb-4">
                                <i class="fas fa-shield-alt fa-3x text-warning mb-3"></i>
                                <h2 class="text-light">Admin Access</h2>
                                <p class="text-muted">Content Moderation Panel</p>
                            </div>
                            
                            <form id="adminLoginForm">
                                <div class="mb-3">
                                    <label for="adminKey" class="form-label text-light">Admin Key</label>
                                    <div class="input-group">
                                        <input type="password" 
                                               class="form-control bg-dark text-light border-secondary" 
                                               id="adminKey" 
                                               placeholder="Enter admin key"
                                               required>
                                        <button class="btn btn-outline-secondary" 
                                                type="button" 
                                                id="togglePassword">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <button type="submit" class="btn btn-warning w-100">
                                    <i class="fas fa-sign-in-alt me-2"></i>
                                    Access Admin Panel
                                </button>
                            </form>
                            
                            <div id="authError" class="alert alert-danger mt-3" style="display: none;">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                Invalid admin key. Access denied.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Admin Dashboard (Hidden by default) -->
    <section id="adminDashboard" class="py-5" style="display: none;">
        <div class="container">
            <!-- Header -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 class="text-light">
                                <i class="fas fa-shield-alt text-warning me-2"></i>
                                Admin Dashboard
                            </h1>
                            <p class="text-muted">Content Moderation & Management</p>
                        </div>
                        <button id="logoutBtn" class="btn btn-outline-danger">
                            <i class="fas fa-sign-out-alt me-2"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="card bg-dark border-secondary h-100">
                        <div class="card-body text-center">
                            <i class="fas fa-comments fa-2x text-primary mb-2"></i>
                            <h3 class="text-light" id="totalCommentsCount">0</h3>
                            <p class="text-muted mb-0">Total Comments</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card bg-dark border-warning h-100">
                        <div class="card-body text-center">
                            <i class="fas fa-clock fa-2x text-warning mb-2"></i>
                            <h3 class="text-light" id="pendingCount">0</h3>
                            <p class="text-muted mb-0">Pending Review</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card bg-dark border-danger h-100">
                        <div class="card-body text-center">
                            <i class="fas fa-flag fa-2x text-danger mb-2"></i>
                            <h3 class="text-light" id="reportsCount">0</h3>
                            <p class="text-muted mb-0">User Reports</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card bg-dark border-success h-100">
                        <div class="card-body text-center">
                            <i class="fas fa-check-circle fa-2x text-success mb-2"></i>
                            <h3 class="text-light" id="approvedCount">0</h3>
                            <p class="text-muted mb-0">Approved</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Tabs -->
            <div class="row">
                <div class="col-12">
                    <ul class="nav nav-tabs nav-dark mb-4" id="adminTabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active bg-dark text-light border-secondary" 
                                    id="pending-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#pending" 
                                    type="button" 
                                    role="tab">
                                <i class="fas fa-clock me-2"></i>
                                Pending Review
                                <span class="badge bg-warning text-dark ms-2" id="pendingBadge">0</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link bg-dark text-light border-secondary" 
                                    id="reports-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#reports" 
                                    type="button" 
                                    role="tab">
                                <i class="fas fa-flag me-2"></i>
                                User Reports
                                <span class="badge bg-danger ms-2" id="reportsBadge">0</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link bg-dark text-light border-secondary" 
                                    id="all-comments-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#all-comments" 
                                    type="button" 
                                    role="tab">
                                <i class="fas fa-list me-2"></i>
                                All Comments
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link bg-dark text-light border-secondary" 
                                    id="settings-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#settings" 
                                    type="button" 
                                    role="tab">
                                <i class="fas fa-cog me-2"></i>
                                Settings
                            </button>
                        </li>
                    </ul>

                    <div class="tab-content" id="adminTabContent">
                        <!-- Pending Review Tab -->
                        <div class="tab-pane fade show active" id="pending" role="tabpanel">
                            <div class="card bg-dark border-secondary">
                                <div class="card-header bg-dark border-secondary">
                                    <h5 class="mb-0 text-light">
                                        <i class="fas fa-clock text-warning me-2"></i>
                                        Comments Pending Review
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div id="pendingComments">
                                        <div class="text-center text-muted py-4">
                                            <i class="fas fa-inbox fa-3x mb-3"></i>
                                            <p>No comments pending review</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- User Reports Tab -->
                        <div class="tab-pane fade" id="reports" role="tabpanel">
                            <div class="card bg-dark border-secondary">
                                <div class="card-header bg-dark border-secondary">
                                    <h5 class="mb-0 text-light">
                                        <i class="fas fa-flag text-danger me-2"></i>
                                        User Reports
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div id="userReports">
                                        <div class="text-center text-muted py-4">
                                            <i class="fas fa-shield-check fa-3x mb-3"></i>
                                            <p>No reports to review</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- All Comments Tab -->
                        <div class="tab-pane fade" id="all-comments" role="tabpanel">
                            <div class="card bg-dark border-secondary">
                                <div class="card-header bg-dark border-secondary d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0 text-light">
                                        <i class="fas fa-list text-info me-2"></i>
                                        All Comments
                                    </h5>
                                    <div class="d-flex gap-2">
                                        <select class="form-select form-select-sm bg-dark text-light border-secondary" id="statusFilter">
                                            <option value="all">All Status</option>
                                            <option value="approved">Approved</option>
                                            <option value="pending_review">Pending</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                        <button class="btn btn-sm btn-outline-info" id="refreshComments">
                                            <i class="fas fa-sync-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="allComments">
                                        <div class="text-center text-muted py-4">
                                            <i class="fas fa-comments fa-3x mb-3"></i>
                                            <p>Loading comments...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Settings Tab -->
                        <div class="tab-pane fade" id="settings" role="tabpanel">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="card bg-dark border-secondary">
                                        <div class="card-header bg-dark border-secondary">
                                            <h5 class="mb-0 text-light">
                                                <i class="fas fa-filter text-info me-2"></i>
                                                Moderation Settings
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <label class="form-label text-light">Auto-Approval Threshold</label>
                                                <input type="range" class="form-range" id="approvalThreshold" min="50" max="100" value="75">
                                                <div class="d-flex justify-content-between">
                                                    <small class="text-muted">50</small>
                                                    <small class="text-light" id="approvalValue">75</small>
                                                    <small class="text-muted">100</small>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label text-light">Auto-Rejection Threshold</label>
                                                <input type="range" class="form-range" id="rejectionThreshold" min="0" max="70" value="50">
                                                <div class="d-flex justify-content-between">
                                                    <small class="text-muted">0</small>
                                                    <small class="text-light" id="rejectionValue">50</small>
                                                    <small class="text-muted">70</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card bg-dark border-secondary">
                                        <div class="card-header bg-dark border-secondary">
                                            <h5 class="mb-0 text-light">
                                                <i class="fas fa-chart-bar text-success me-2"></i>
                                                System Status
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <div class="d-flex justify-content-between">
                                                    <span class="text-light">Firebase Connection:</span>
                                                    <span class="badge bg-success" id="firebaseStatus">Connected</span>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <div class="d-flex justify-content-between">
                                                    <span class="text-light">Moderation System:</span>
                                                    <span class="badge bg-success" id="moderationStatus">Active</span>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <div class="d-flex justify-content-between">
                                                    <span class="text-light">Last Updated:</span>
                                                    <span class="text-muted" id="lastUpdated">Just now</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer mt-auto">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <h5 class="footer-title">Aswang Chronicles</h5>
                    <p class="footer-description">
                        Preserving and sharing Filipino folklore through interactive storytelling and immersive experiences.
                    </p>
                </div>
                <div class="col-md-4 mb-4">
                    <h5 class="footer-title">Admin Panel</h5>
                    <p class="footer-description">
                        Secure content moderation system for maintaining community standards and cultural respect.
                    </p>
                </div>
                <div class="col-md-4 mb-4">
                    <h5 class="footer-title">Contact</h5>
                    <p class="footer-contact">
                        <i class="fas fa-envelope me-2"></i>
                        admin@aswangchronicles.com
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
                        Admin Panel v1.0
                    </p>
                </div>
            </div>
        </div>
    </footer>
  `;
}