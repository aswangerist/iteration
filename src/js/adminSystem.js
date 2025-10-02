// Admin page functionality for content moderation
import { 
  db, 
  COLLECTIONS, 
  handleFirestoreError,
  getFirebaseStatus 
} from './firebase.js'
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

export class AdminSystem {
  constructor() {
    this.isAuthenticated = false
    this.adminKey = import.meta.env.VITE_ADMIN_KEY || 'aswang_admin_2024' // Fallback for safety
    this.sessionTimeout = (import.meta.env.VITE_SESSION_TIMEOUT_MINUTES || 60) * 60 * 1000 // Convert to milliseconds
    this.maxLoginAttempts = import.meta.env.VITE_MAX_LOGIN_ATTEMPTS || 3
    this.loginAttempts = 0
    this.comments = []
    this.reports = []
    this.unsubscribes = []
    this.stats = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      reports: 0
    }
    
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.checkExistingAuth()
  }

  checkExistingAuth() {
    const storedAuth = sessionStorage.getItem('admin_authenticated')
    const loginTime = sessionStorage.getItem('admin_login_time')
    
    if (storedAuth === 'true' && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime)
      
      // Check if session has expired
      if (timeElapsed < this.sessionTimeout) {
        this.isAuthenticated = true
        this.showDashboard()
        this.loadDashboardData()
        
        // Set up session timeout
        this.setSessionTimeout(this.sessionTimeout - timeElapsed)
      } else {
        // Session expired, clear storage
        this.clearAuthSession()
        this.showNotification('Session expired. Please login again.', 'warning')
      }
    }
  }

  setupEventListeners() {
    // Admin login form
    const loginForm = document.getElementById('adminLoginForm')
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this.handleLogin()
      })
    }

    // Password toggle
    const togglePassword = document.getElementById('togglePassword')
    if (togglePassword) {
      togglePassword.addEventListener('click', () => {
        const passwordInput = document.getElementById('adminKey')
        const icon = togglePassword.querySelector('i')
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text'
          icon.classList.replace('fa-eye', 'fa-eye-slash')
        } else {
          passwordInput.type = 'password'
          icon.classList.replace('fa-eye-slash', 'fa-eye')
        }
      })
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn')
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.handleLogout()
      })
    }

    // Settings sliders
    const approvalThreshold = document.getElementById('approvalThreshold')
    if (approvalThreshold) {
      // Set initial value from environment
      const envApprovalThreshold = import.meta.env.VITE_AUTO_APPROVAL_THRESHOLD || 75
      approvalThreshold.value = envApprovalThreshold
      document.getElementById('approvalValue').textContent = envApprovalThreshold
      
      approvalThreshold.addEventListener('input', (e) => {
        document.getElementById('approvalValue').textContent = e.target.value
      })
    }

    const rejectionThreshold = document.getElementById('rejectionThreshold')
    if (rejectionThreshold) {
      // Set initial value from environment
      const envRejectionThreshold = import.meta.env.VITE_AUTO_REJECTION_THRESHOLD || 50
      rejectionThreshold.value = envRejectionThreshold
      document.getElementById('rejectionValue').textContent = envRejectionThreshold
      
      rejectionThreshold.addEventListener('input', (e) => {
        document.getElementById('rejectionValue').textContent = e.target.value
      })
    }

    // Refresh comments button
    const refreshBtn = document.getElementById('refreshComments')
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.loadAllComments()
      })
    }

    // Status filter
    const statusFilter = document.getElementById('statusFilter')
    if (statusFilter) {
      statusFilter.addEventListener('change', () => {
        this.filterComments()
      })
    }

    // Tab click handlers with proper Bootstrap tab support
    console.log('🔄 Setting up tab handlers...')
    
    // Handle direct tab clicks
    document.addEventListener('click', (e) => {
      const tabButton = e.target.closest('button[data-bs-toggle="tab"]')
      if (!tabButton) return
      
      console.log(`🔄 Tab button clicked: ${tabButton.id}`)
      
      // Add small delay to ensure Bootstrap tab switch completes
      setTimeout(() => {
        if (tabButton.id === 'pending-tab') {
          this.loadPendingComments()
        } else if (tabButton.id === 'reports-tab') {
          this.loadUserReports()
        } else if (tabButton.id === 'all-comments-tab') {
          console.log('🔄 Loading all comments from tab click')
          this.loadAllComments()
        }
      }, 50)
    })

    // Handle Bootstrap tab shown events
    document.addEventListener('shown.bs.tab', (e) => {
      const targetId = e.target.id
      console.log(`🔄 Bootstrap tab shown event: ${targetId}`)
      
      if (targetId === 'all-comments-tab') {
        console.log('🔄 Loading all comments from Bootstrap event')
        this.loadAllComments()
      } else if (targetId === 'pending-tab') {
        this.loadPendingComments()
      } else if (targetId === 'reports-tab') {
        this.loadUserReports()
      }
    })
  }

  handleLogin() {
    const adminKeyInput = document.getElementById('adminKey')
    const errorDiv = document.getElementById('authError')
    
    // Check if too many failed attempts
    if (this.loginAttempts >= this.maxLoginAttempts) {
      errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        Too many failed attempts. Please refresh the page to try again.
      `
      errorDiv.style.display = 'block'
      adminKeyInput.disabled = true
      return
    }
    
    if (adminKeyInput.value === this.adminKey) {
      this.isAuthenticated = true
      this.loginAttempts = 0
      
      // Store authentication with timestamp
      sessionStorage.setItem('admin_authenticated', 'true')
      sessionStorage.setItem('admin_login_time', Date.now().toString())
      
      errorDiv.style.display = 'none'
      adminKeyInput.disabled = false
      
      this.showDashboard()
      this.loadDashboardData()
      
      // Set up session timeout
      this.setSessionTimeout(this.sessionTimeout)
      
      this.showNotification(
        `Welcome to Admin Panel (${import.meta.env.VITE_ENVIRONMENT || 'development'})`, 
        'success'
      )
    } else {
      this.loginAttempts++
      const remainingAttempts = this.maxLoginAttempts - this.loginAttempts
      
      errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        Invalid admin key. ${remainingAttempts} attempts remaining.
      `
      errorDiv.style.display = 'block'
      adminKeyInput.value = ''
      adminKeyInput.focus()
    }
  }

  handleLogout() {
    this.isAuthenticated = false
    this.clearAuthSession()
    
    // Clean up listeners
    this.unsubscribes.forEach(unsubscribe => unsubscribe())
    this.unsubscribes = []
    
    // Clear session timeout
    if (this.sessionTimeoutId) {
      clearTimeout(this.sessionTimeoutId)
    }
    
    this.showAuthForm()
    this.showNotification('Logged out successfully', 'info')
  }

  clearAuthSession() {
    sessionStorage.removeItem('admin_authenticated')
    sessionStorage.removeItem('admin_login_time')
    this.loginAttempts = 0
    
    // Re-enable login form
    const adminKeyInput = document.getElementById('adminKey')
    if (adminKeyInput) {
      adminKeyInput.disabled = false
    }
  }

  setSessionTimeout(timeout) {
    if (this.sessionTimeoutId) {
      clearTimeout(this.sessionTimeoutId)
    }
    
    this.sessionTimeoutId = setTimeout(() => {
      this.showNotification('Session expired due to inactivity', 'warning')
      this.handleLogout()
    }, timeout)
  }

  showDashboard() {
    document.getElementById('adminAuth').style.display = 'none'
    document.getElementById('adminDashboard').style.display = 'block'
    
    // Initialize Bootstrap tabs after dashboard is shown
    setTimeout(() => {
      this.initializeTabs()
    }, 100)
  }

  initializeTabs() {
    console.log('🔄 Initializing Bootstrap tabs...')
    
    // Ensure Bootstrap is available
    if (typeof window.bootstrap === 'undefined') {
      console.warn('⚠️ Bootstrap JavaScript not loaded - using fallback tab handling')
      this.initializeFallbackTabs()
      return
    }
    
    // Initialize tab elements
    const tabElements = document.querySelectorAll('#adminTabs button[data-bs-toggle="tab"]')
    tabElements.forEach(tabElement => {
      // Initialize Bootstrap Tab
      const tab = new window.bootstrap.Tab(tabElement)
      
      // Add click event listener
      tabElement.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(`🔄 Tab clicked: ${tabElement.id}`)
        
        // Use Bootstrap's show method
        tab.show()
        
        // Load content based on tab
        setTimeout(() => {
          this.handleTabSwitch(tabElement.id)
        }, 50)
      })
    })
    
    console.log('✅ Bootstrap tabs initialized successfully')
  }

  initializeFallbackTabs() {
    console.log('🔄 Setting up fallback tab handling...')
    
    const tabElements = document.querySelectorAll('#adminTabs button[data-bs-toggle="tab"]')
    const tabPanes = document.querySelectorAll('.tab-pane')
    
    tabElements.forEach(tabElement => {
      tabElement.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(`🔄 Fallback tab clicked: ${tabElement.id}`)
        
        // Remove active class from all tabs
        tabElements.forEach(el => el.classList.remove('active'))
        tabPanes.forEach(pane => {
          pane.classList.remove('show', 'active')
        })
        
        // Add active class to clicked tab
        tabElement.classList.add('active')
        
        // Show corresponding tab pane
        const targetId = tabElement.getAttribute('data-bs-target')
        const targetPane = document.querySelector(targetId)
        if (targetPane) {
          targetPane.classList.add('show', 'active')
        }
        
        // Load content
        setTimeout(() => {
          this.handleTabSwitch(tabElement.id)
        }, 50)
      })
    })
    
    console.log('✅ Fallback tabs initialized successfully')
  }

  handleTabSwitch(tabId) {
    console.log(`🔄 Handling tab switch to: ${tabId}`)
    
    switch (tabId) {
      case 'pending-tab':
        this.loadPendingComments()
        break
      case 'reports-tab':
        this.loadUserReports()
        break
      case 'all-comments-tab':
        this.loadAllComments()
        break
      case 'settings-tab':
        this.updateSystemStatus()
        break
      default:
        console.warn(`Unknown tab: ${tabId}`)
    }
  }

  showAuthForm() {
    document.getElementById('adminAuth').style.display = 'flex'
    document.getElementById('adminDashboard').style.display = 'none'
  }

  async loadDashboardData() {
    console.log('🔄 Loading dashboard data...')
    await this.loadStats()
    await this.loadPendingComments()
    
    // Ensure all comments are loaded after a short delay
    setTimeout(() => {
      console.log('🔄 Loading all comments from dashboard init')
      this.loadAllComments()
    }, 200)
    
    this.updateSystemStatus()
  }

  async loadStats() {
    try {
      // Load all comments to calculate stats - use simple query
      const q = query(collection(db, COLLECTIONS.COMMENTS))
      const snapshot = await getDocs(q)
      
      this.stats = {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        reports: 0
      }

      snapshot.forEach((doc) => {
        const comment = doc.data()
        this.stats.total++
        
        switch (comment.status) {
          case 'pending_review':
            this.stats.pending++
            break
          case 'approved':
            this.stats.approved++
            break
          case 'rejected':
            this.stats.rejected++
            break
          default:
            this.stats.approved++ // Default to approved for legacy comments
        }
      })

      // Load reports count
      const reportsQuery = query(collection(db, 'reports'))
      const reportsSnapshot = await getDocs(reportsQuery)
      this.stats.reports = reportsSnapshot.size

      this.updateStatsDisplay()

    } catch (error) {
      console.error('Error loading stats:', error)
      this.showNotification('Failed to load statistics', 'error')
    }
  }

  updateStatsDisplay() {
    document.getElementById('totalCommentsCount').textContent = this.stats.total
    document.getElementById('pendingCount').textContent = this.stats.pending
    document.getElementById('approvedCount').textContent = this.stats.approved
    document.getElementById('reportsCount').textContent = this.stats.reports
    document.getElementById('pendingBadge').textContent = this.stats.pending
    document.getElementById('reportsBadge').textContent = this.stats.reports
  }

  async loadPendingComments() {
    try {
      console.log('🔄 Loading pending comments...')
      // Use simpler query without composite index requirement
      const q = query(
        collection(db, COLLECTIONS.COMMENTS),
        where('status', '==', 'pending_review')
      )

      const snapshot = await getDocs(q)
      const pendingComments = []
      
      snapshot.forEach((doc) => {
        pendingComments.push({ id: doc.id, ...doc.data() })
      })

      // Sort manually by createdAt descending
      pendingComments.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0)
        const dateB = b.createdAt?.toDate?.() || new Date(0)
        return dateB - dateA
      })

      console.log(`📊 Found ${pendingComments.length} pending comments`)
      this.renderPendingComments(pendingComments)

    } catch (error) {
      console.error('Error loading pending comments:', error)
      this.showNotification('Failed to load pending comments', 'error')
    }
  }

  renderPendingComments(comments) {
    const container = document.getElementById('pendingComments')
    
    if (comments.length === 0) {
      container.innerHTML = `
        <div class="text-center text-muted py-4">
          <i class="fas fa-inbox fa-3x mb-3"></i>
          <p>No comments pending review</p>
        </div>
      `
      return
    }

    container.innerHTML = comments.map(comment => this.renderModerationCard(comment, 'pending')).join('')
    
    // Add event listeners
    comments.forEach(comment => {
      this.attachModerationListeners(comment.id)
    })
  }

  renderModerationCard(comment, type) {
    const moderation = comment.moderation || {}
    const date = comment.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()
    
    return `
      <div class="card bg-dark border-secondary mb-3" data-comment-id="${comment.id}">
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <strong class="text-warning">${this.escapeHtml(comment.playerName)}</strong>
                  <div class="rating-display mt-1">
                    ${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}
                    <small class="text-muted ms-2">${comment.rating}/5</small>
                  </div>
                </div>
                <small class="text-muted">${date}</small>
              </div>
              
              <p class="text-light mb-2">"${this.escapeHtml(comment.commentText || comment.comment)}"</p>
              
              ${comment.favoriteAspect ? `
                <div class="mb-2">
                  <span class="badge bg-info">${comment.favoriteAspect}</span>
                </div>
              ` : ''}
            </div>
            
            <div class="col-md-4">
              <div class="mb-3">
                <h6 class="text-light">Moderation Score</h6>
                <div class="d-flex gap-2 flex-wrap mb-2">
                  <span class="badge bg-${this.getSeverityColor(moderation.severity)}">
                    Score: ${moderation.score || 'N/A'}
                  </span>
                  <span class="badge bg-secondary">${moderation.severity || 'unknown'}</span>
                </div>
                
                ${moderation.flags?.length ? `
                  <div class="mb-2">
                    ${moderation.flags.map(flag => `<span class="badge bg-info">${flag}</span>`).join(' ')}
                  </div>
                ` : ''}
                
                ${moderation.issues?.length ? `
                  <div class="mb-2">
                    <small class="text-danger">Issues: ${moderation.issues.join(', ')}</small>
                  </div>
                ` : ''}
              </div>
              
              <div class="d-grid gap-2">
                ${type === 'pending' ? `
                  <button class="btn btn-success btn-sm approve-btn" data-comment-id="${comment.id}">
                    <i class="fas fa-check me-1"></i> Approve
                  </button>
                  <button class="btn btn-warning btn-sm reject-btn" data-comment-id="${comment.id}">
                    <i class="fas fa-times me-1"></i> Reject
                  </button>
                ` : ''}
                <button class="btn btn-danger btn-sm delete-btn" data-comment-id="${comment.id}">
                  <i class="fas fa-trash me-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  getSeverityColor(severity) {
    switch (severity) {
      case 'severe': return 'danger'
      case 'moderate': return 'warning'
      case 'mild': return 'info'
      case 'clean': return 'success'
      default: return 'secondary'
    }
  }

  attachModerationListeners(commentId) {
    const approveBtn = document.querySelector(`.approve-btn[data-comment-id="${commentId}"]`)
    const rejectBtn = document.querySelector(`.reject-btn[data-comment-id="${commentId}"]`)
    const deleteBtn = document.querySelector(`.delete-btn[data-comment-id="${commentId}"]`)

    if (approveBtn) {
      approveBtn.addEventListener('click', () => this.approveComment(commentId))
    }
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => this.rejectComment(commentId))
    }
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.deleteComment(commentId))
    }
  }

  async approveComment(commentId) {
    try {
      await updateDoc(doc(db, COLLECTIONS.COMMENTS, commentId), {
        status: 'approved',
        'moderation.approved': true,
        'moderation.reviewedAt': new Date().toISOString(),
        'moderation.reviewedBy': 'admin'
      })

      this.showNotification('Comment approved successfully', 'success')
      this.loadPendingComments()
      this.loadAllComments()
      this.loadStats()

    } catch (error) {
      console.error('Error approving comment:', error)
      this.showNotification('Failed to approve comment', 'error')
    }
  }

  async rejectComment(commentId) {
    try {
      await updateDoc(doc(db, COLLECTIONS.COMMENTS, commentId), {
        status: 'rejected',
        'moderation.approved': false,
        'moderation.reviewedAt': new Date().toISOString(),
        'moderation.reviewedBy': 'admin'
      })

      this.showNotification('Comment rejected successfully', 'success')
      this.loadPendingComments()
      this.loadAllComments()
      this.loadStats()

    } catch (error) {
      console.error('Error rejecting comment:', error)
      this.showNotification('Failed to reject comment', 'error')
    }
  }

  async deleteComment(commentId) {
    if (!confirm('Are you sure you want to permanently delete this comment?')) {
      return
    }

    try {
      await deleteDoc(doc(db, COLLECTIONS.COMMENTS, commentId))
      
      this.showNotification('Comment deleted successfully', 'success')
      this.loadPendingComments()
      this.loadAllComments()
      this.loadStats()

    } catch (error) {
      console.error('Error deleting comment:', error)
      this.showNotification('Failed to delete comment', 'error')
    }
  }

  async loadUserReports() {
    try {
      console.log('🔄 Loading user reports...')
      // Use simpler query to avoid index requirements
      const q = query(collection(db, 'reports'))
      const snapshot = await getDocs(q)
      const reports = []
      
      snapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() })
      })

      // Sort manually by reportedAt descending
      reports.sort((a, b) => {
        const dateA = a.reportedAt?.toDate?.() || new Date(0)
        const dateB = b.reportedAt?.toDate?.() || new Date(0)
        return dateB - dateA
      })

      console.log(`📊 Found ${reports.length} user reports`)
      this.renderUserReports(reports)

    } catch (error) {
      console.error('Error loading reports:', error)
      this.showNotification('Failed to load user reports', 'error')
    }
  }

  renderUserReports(reports) {
    const container = document.getElementById('userReports')
    
    if (reports.length === 0) {
      container.innerHTML = `
        <div class="text-center text-muted py-4">
          <i class="fas fa-shield-check fa-3x mb-3"></i>
          <p>No reports to review</p>
        </div>
      `
      return
    }

    container.innerHTML = reports.map(report => `
      <div class="card bg-dark border-secondary mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="text-warning">Report: ${report.reason}</h6>
            <small class="text-muted">${report.reportedAt?.toDate?.()?.toLocaleDateString()}</small>
          </div>
          <p class="text-light">Comment ID: <code>${report.commentId}</code></p>
          ${report.details ? `<p class="text-muted">"${this.escapeHtml(report.details)}"</p>` : ''}
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-primary resolve-report-btn" data-report-id="${report.id}">
              <i class="fas fa-check me-1"></i> Resolve
            </button>
            <button class="btn btn-sm btn-outline-info view-comment-btn" data-comment-id="${report.commentId}">
              <i class="fas fa-eye me-1"></i> View Comment
            </button>
          </div>
        </div>
      </div>
    `).join('')
  }

  async loadAllComments() {
    try {
      console.log('🔄 Loading all comments for all comments tab...')
      // Use simple query without orderBy to avoid index requirements
      const q = query(collection(db, COLLECTIONS.COMMENTS))
      const snapshot = await getDocs(q)
      const allComments = []
      
      snapshot.forEach((doc) => {
        allComments.push({ id: doc.id, ...doc.data() })
      })

      // Sort manually by createdAt descending
      allComments.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0)
        const dateB = b.createdAt?.toDate?.() || new Date(0)
        return dateB - dateA
      })

      console.log(`📊 Loaded ${allComments.length} total comments for all comments tab`)
      this.allComments = allComments
      
      // If no comments found, show appropriate message
      if (allComments.length === 0) {
        const container = document.getElementById('allComments')
        if (container) {
          container.innerHTML = `
            <div class="text-center text-muted py-4">
              <i class="fas fa-comments fa-3x mb-3"></i>
              <p>No comments found</p>
              <small class="text-muted">Comments will appear here once users start leaving feedback</small>
            </div>
          `
        }
        return
      }
      
      this.filterComments()

    } catch (error) {
      console.error('❌ Error loading all comments:', error)
      this.showNotification('Failed to load comments: ' + error.message, 'error')
      
      // Show error in the container
      const container = document.getElementById('allComments')
      if (container) {
        container.innerHTML = `
          <div class="text-center text-danger py-4">
            <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
            <p>Failed to load comments</p>
            <small>${error.message}</small>
          </div>
        `
      }
    }
  }

  filterComments() {
    const statusFilter = document.getElementById('statusFilter')
    const filterValue = statusFilter?.value || 'all'
    
    let filteredComments = this.allComments || []
    console.log(`🔍 Filtering ${filteredComments.length} comments with filter: ${filterValue}`)
    
    if (filterValue !== 'all') {
      filteredComments = filteredComments.filter(comment => comment.status === filterValue)
    }

    console.log(`📋 Showing ${filteredComments.length} filtered comments`)
    this.renderAllComments(filteredComments)
  }

  renderAllComments(comments) {
    const container = document.getElementById('allComments')
    
    if (!container) {
      console.error('❌ allComments container not found!')
      return
    }
    
    console.log(`🎨 Rendering ${comments.length} comments in all comments tab`)
    
    if (comments.length === 0) {
      const totalComments = this.allComments?.length || 0
      container.innerHTML = `
        <div class="text-center text-muted py-4">
          <i class="fas fa-comments fa-3x mb-3"></i>
          <p>${totalComments === 0 ? 'No comments found' : 'No comments match the selected filter'}</p>
          <small class="text-muted">${totalComments === 0 ? 'Comments will appear here once users start leaving feedback' : `Total comments loaded: ${totalComments}`}</small>
        </div>
      `
      return
    }

    container.innerHTML = comments.map(comment => this.renderModerationCard(comment, 'all')).join('')
    
    // Add event listeners
    comments.forEach(comment => {
      this.attachModerationListeners(comment.id)
    })
    
    console.log('✅ All comments rendered successfully')
  }

  updateSystemStatus() {
    const firebaseStatus = getFirebaseStatus()
    
    document.getElementById('firebaseStatus').textContent = firebaseStatus.isInitialized ? 'Connected' : 'Disconnected'
    document.getElementById('firebaseStatus').className = `badge bg-${firebaseStatus.isInitialized ? 'success' : 'danger'}`
    
    document.getElementById('moderationStatus').textContent = 'Active'
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString()
    
    // Add environment info to system status
    const envInfo = document.createElement('div')
    envInfo.innerHTML = `
      <div class="mt-3 pt-3 border-top border-secondary">
        <h6 class="text-light">Environment Info</h6>
        <div class="mb-2">
          <div class="d-flex justify-content-between">
            <span class="text-light">Environment:</span>
            <span class="badge bg-${import.meta.env.VITE_ENVIRONMENT === 'production' ? 'success' : 'warning'}">${import.meta.env.VITE_ENVIRONMENT || 'development'}</span>
          </div>
        </div>
        <div class="mb-2">
          <div class="d-flex justify-content-between">
            <span class="text-light">App Version:</span>
            <span class="text-muted">${import.meta.env.VITE_APP_VERSION || '1.0.0'}</span>
          </div>
        </div>
        <div class="mb-2">
          <div class="d-flex justify-content-between">
            <span class="text-light">Auto-Approval:</span>
            <span class="text-muted">${import.meta.env.VITE_AUTO_APPROVAL_THRESHOLD || 75}+ points</span>
          </div>
        </div>
        <div class="mb-2">
          <div class="d-flex justify-content-between">
            <span class="text-light">Auto-Rejection:</span>
            <span class="text-muted">${import.meta.env.VITE_AUTO_REJECTION_THRESHOLD || 50}- points</span>
          </div>
        </div>
        <div class="mb-2">
          <div class="d-flex justify-content-between">
            <span class="text-light">Rate Limit:</span>
            <span class="text-muted">${import.meta.env.VITE_RATE_LIMIT_COMMENTS_PER_HOUR || 5}/hour</span>
          </div>
        </div>
      </div>
    `
    
    // Add environment info only once
    const systemStatusCard = document.querySelector('#settings .card:last-child .card-body')
    if (systemStatusCard && !systemStatusCard.querySelector('.border-top')) {
      systemStatusCard.appendChild(envInfo)
    }
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.admin-notification')
    if (existing) existing.remove()

    const notification = document.createElement('div')
    notification.className = 'admin-notification'
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 300px;
      ">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
      </div>
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 4000)
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  // Cleanup method
  destroy() {
    this.unsubscribes.forEach(unsubscribe => unsubscribe())
    sessionStorage.removeItem('admin_authenticated')
  }
}

// Initialize admin system when page loads
export function initAdminPage() {
  return new AdminSystem()
}