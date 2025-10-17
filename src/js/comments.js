// Comment system functionality for Aswang Chronicles Game Page with Firebase Firestore
import { 
  db, 
  COLLECTIONS, 
  handleFirestoreError, 
  isOnline, 
  getFirebaseStatus 
} from './firebase.js'
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  where,
  Timestamp
} from 'firebase/firestore'
import { contentModerator } from './contentModerator.js'

export class CommentSystem {
  constructor() {
    this.comments = []
    this.currentRating = 0
    this.unsubscribe = null
    this.isFirebaseEnabled = false
    
    this.init()
  }

  async init() {
    // Wait for DOM elements to be available
    await this.waitForElements()
    
    this.setupEventListeners()
    
    // Check Firebase status
    const firebaseStatus = getFirebaseStatus()
    this.isFirebaseEnabled = firebaseStatus.isInitialized
    
    this.updateConnectionStatus('connecting', 'Connecting to database...')
    
    if (this.isFirebaseEnabled) {
      console.log('🔥 Firebase enabled - using Firestore for comments')
      await this.setupFirestoreListener()
      this.updateConnectionStatus('online', 'Live comments - Real-time updates')
    } else {
      console.warn('⚠️ Firebase not available - using localStorage fallback')
      this.comments = this.loadCommentsFromStorage()
      this.renderComments()
      this.updateConnectionStatus('local', 'Offline mode - Local storage')
    }
    
    this.updateStats()
  }

  async waitForElements() {
    // Wait for essential DOM elements to be available
    const maxWait = 5000 // 5 seconds max wait
    const checkInterval = 100 // Check every 100ms
    let waited = 0

    while (waited < maxWait) {
      const commentsList = document.getElementById('commentsList')
      const commentsEmpty = document.getElementById('commentsEmpty')
      const commentForm = document.getElementById('commentForm')

      if (commentsList && commentsEmpty && commentForm) {
        console.log('✅ Comment system DOM elements ready')
        return
      }

      await new Promise(resolve => setTimeout(resolve, checkInterval))
      waited += checkInterval
    }

    console.warn('⚠️ Comment system DOM elements not found after waiting')
  }

  updateConnectionStatus(status, message) {
    const statusElement = document.getElementById('firebaseStatus')
    if (statusElement) {
      statusElement.className = `firebase-status ${status}`
      statusElement.querySelector('.status-text').textContent = message
    }
  }

  setupEventListeners() {
    // Star rating
    document.addEventListener('click', (e) => {
      // Check if event and target exist and have the matches method
      if (!e || !e.target || typeof e.target.matches !== 'function') {
        return;
      }
      
      if (e.target.matches('.star')) {
        this.handleStarClick(e.target)
      }
    })

    // Character counter
    document.addEventListener('input', (e) => {
      // Check if event and target exist and have the matches method
      if (!e || !e.target || typeof e.target.matches !== 'function') {
        return;
      }
      
      if (e.target.matches('#commentText')) {
        this.updateCharacterCount(e.target)
      }
    })

    // Form submission
    document.addEventListener('submit', (e) => {
      if (e.target.matches('#commentForm')) {
        e.preventDefault()
        this.handleCommentSubmission(e.target)
      }
    })

    // Star hover effects
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches('.star')) {
        this.handleStarHover(e.target)
      }
    })

    document.addEventListener('mouseout', (e) => {
      if (e.target.matches('.star-rating')) {
        this.resetStarHover()
      }
    })
  }

  handleStarClick(star) {
    const rating = parseInt(star.dataset.rating)
    this.currentRating = rating
    this.updateStarDisplay(rating)
    this.updateRatingText(rating)
  }

  handleStarHover(star) {
    const rating = parseInt(star.dataset.rating)
    this.updateStarDisplay(rating, true)
  }

  resetStarHover() {
    this.updateStarDisplay(this.currentRating)
  }

  updateStarDisplay(rating, isHover = false) {
    const stars = document.querySelectorAll('.star')
    stars.forEach((star, index) => {
      const starRating = index + 1
      if (starRating <= rating) {
        star.classList.add('active')
      } else {
        star.classList.remove('active')
      }
    })
  }

  updateRatingText(rating) {
    const ratingText = document.getElementById('ratingText')
    const ratingLabels = {
      1: 'Poor - Needs improvement',
      2: 'Fair - Could be better',
      3: 'Good - Enjoyable experience',
      4: 'Very Good - Really liked it',
      5: 'Excellent - Absolutely amazing!'
    }
    ratingText.textContent = ratingLabels[rating] || 'Click to rate'
  }

  updateCharacterCount(textarea) {
    const charCount = document.getElementById('charCount')
    const remaining = textarea.value.length
    charCount.textContent = remaining
    
    // Change color based on character count
    if (remaining > 450) {
      charCount.style.color = 'var(--red)'
    } else if (remaining > 400) {
      charCount.style.color = 'var(--yellow)'
    } else {
      charCount.style.color = 'var(--light-green)'
    }
  }

  async handleCommentSubmission(form) {
    const formData = new FormData(form)
    const playerName = document.getElementById('playerName').value.trim()
    const commentText = document.getElementById('commentText').value.trim()
    const favoriteAspect = document.getElementById('favoriteAspect').value

    // Validation
    if (!playerName || !commentText || this.currentRating === 0) {
      this.showNotification('Please fill in all required fields and provide a rating.', 'error')
      return
    }

    if (commentText.length < 10) {
      this.showNotification('Please write a more detailed review (at least 10 characters).', 'error')
      return
    }

    // Content moderation check
    const moderation = contentModerator.moderateComment(playerName, commentText)
    
    // If comment is rejected, show moderation message
    if (!moderation.isApproved) {
      const moderationMessage = contentModerator.getModerationMessage(moderation)
      this.showNotification(moderationMessage || 'Comment violates community guidelines', 'error')
      return
    }

    // Create comment object
    const comment = {
      playerName: this.sanitizeInput(playerName),
      commentText: this.sanitizeInput(commentText),
      rating: this.currentRating,
      favoriteAspect: favoriteAspect,
      timestamp: Date.now(),
      // For Firestore
      createdAt: this.isFirebaseEnabled ? serverTimestamp() : new Date().toISOString(),
      // Moderation data
      moderation: {
        score: moderation.score,
        severity: moderation.severity,
        flags: moderation.flags,
        approved: moderation.isApproved,
        reviewedAt: new Date().toISOString()
      },
      status: moderation.autoAction === 'review' ? 'pending_review' : 'approved'
    }

    try {
      if (this.isFirebaseEnabled && isOnline()) {
        // Save to Firestore
        await this.saveCommentToFirestore(comment)
        
        if (comment.status === 'pending_review') {
          this.showNotification('Thank you for your review! It is awaiting moderation and will appear once approved.', 'info')
        } else {
          this.showNotification('Thank you for your review! Your feedback helps improve our game.', 'success')
        }
      } else {
        // Fallback to localStorage (local comments bypass moderation)
        comment.id = Date.now().toString()
        comment.date = new Date().toISOString()
        comment.status = 'approved' // Local comments are auto-approved
        this.comments.unshift(comment)
        this.saveCommentsToStorage()
        this.renderComments()
        this.updateStats()
        this.showNotification('Review saved locally. It will sync when you\'re back online.', 'success')
      }
      
      this.resetForm()
      
    } catch (error) {
      console.error('Error saving comment:', error)
      this.showNotification('Failed to save review. Please try again.', 'error')
    }
  }

  async saveCommentToFirestore(comment) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.COMMENTS), comment)
      console.log('Comment saved to Firestore with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Firestore save error:', error)
      throw new Error(handleFirestoreError(error))
    }
  }

  async setupFirestoreListener() {
    // Temporarily disabled real-time listener due to Firestore permission issues
    // Using simple query instead until Firebase rules are updated
    console.log('🔄 Loading comments with simple query (permissions workaround)')
    
    try {
      const q = query(
        collection(db, COLLECTIONS.COMMENTS),
        limit(50) // Limit to last 50 comments for performance
      )

      // Use simple query instead of real-time listener
      const querySnapshot = await getDocs(q)
      const comments = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        comments.push({
          id: doc.id,
          ...data,
          // Convert Firestore timestamp to JavaScript Date
          date: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
          timestamp: data.createdAt?.toDate?.()?.getTime() || data.timestamp || Date.now()
        })
      })
      
      // Sort manually by timestamp descending
      comments.sort((a, b) => b.timestamp - a.timestamp)
      
      this.comments = comments
      this.renderComments()
      this.updateStats()
      
      // Update status to show successful connection
      this.updateConnectionStatus('online', `Comments loaded (${comments.length} reviews)`)
      
      console.log(`🔥 Loaded ${comments.length} comments from Firestore`)
      
    } catch (error) {
      console.error('Failed to load comments:', error)
      this.updateConnectionStatus('offline', 'Failed to connect - Using offline data')
      // Fallback to localStorage
      this.comments = this.loadCommentsFromStorage()
      this.renderComments()
      this.updateStats()
    }
  }

  sanitizeInput(input) {
    // Basic XSS prevention
    return input.replace(/[<>]/g, '')
  }

  resetForm() {
    document.getElementById('commentForm').reset()
    this.currentRating = 0
    this.updateStarDisplay(0)
    this.updateRatingText(0)
    document.getElementById('charCount').textContent = '0'
    document.getElementById('charCount').style.color = 'var(--light-green)'
  }

  renderComments() {
    const commentsList = document.getElementById('commentsList')
    const commentsEmpty = document.getElementById('commentsEmpty')

    // Check if elements exist (component might not be mounted)
    if (!commentsList || !commentsEmpty) {
      console.warn('Comments elements not found - component may not be mounted')
      return
    }

    // Filter comments to only show approved or pending review (hide rejected)
    const visibleComments = this.comments.filter(comment => 
      !comment.status || comment.status === 'approved' || comment.status === 'pending_review'
    )

    if (visibleComments.length === 0) {
      commentsList.style.display = 'none'
      commentsEmpty.style.display = 'block'
      return
    }

    commentsList.style.display = 'block'
    commentsEmpty.style.display = 'none'

    commentsList.innerHTML = visibleComments.map(comment => this.renderComment(comment)).join('')
    
    // Trigger scroll animations for new comment elements
    setTimeout(() => {
      if (window.initScrollAnimations) {
        window.initScrollAnimations()
      }
    }, 100)
  }

  renderComment(comment) {
    const date = new Date(comment.date)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const stars = Array.from({length: 5}, (_, i) => 
      `<span class="star${i < comment.rating ? ' active' : ''}">★</span>`
    ).join('')

    const favoriteAspectLabels = {
      'story': 'Engaging Storyline',
      'choices': 'Multiple Choice Paths',
      'folklore': 'Filipino Folklore Elements',
      'characters': 'Character Development',
      'atmosphere': 'Atmosphere & Design',
      'educational': 'Educational Value'
    }

    const favoriteAspectDisplay = comment.favoriteAspect ? 
      `<span class="favorite-aspect">${favoriteAspectLabels[comment.favoriteAspect]}</span>` : ''

    // Check if comment is pending review
    const isPending = comment.status === 'pending_review'
    const moderationBadge = isPending 
      ? '<span class="badge bg-warning text-dark ms-2"><i class="fas fa-clock"></i> Pending Review</span>'
      : ''

    return `
      <div class="comment-item animate-on-scroll ${isPending ? 'opacity-75 border-warning' : ''}">
        <div class="comment-header">
          <div class="comment-author">
            <div class="author-avatar">${comment.playerName.charAt(0).toUpperCase()}</div>
            <div>
              <div class="author-name">
                ${comment.playerName}
                ${moderationBadge}
              </div>
              <div class="comment-rating">${stars}</div>
            </div>
          </div>
          <div class="comment-date">${formattedDate}</div>
        </div>
        <div class="comment-text ${isPending ? 'text-muted' : ''}">${comment.commentText}</div>
        <div class="comment-meta">
          <div>${favoriteAspectDisplay}</div>
          <div>Rating: ${comment.rating}/5 stars</div>
          ${isPending ? '<div class="text-warning"><i class="fas fa-info-circle"></i> This review is awaiting moderation</div>' : ''}
        </div>
      </div>
    `
  }

  updateStats() {
    const totalComments = this.comments.length
    const averageRating = totalComments > 0 ? 
      (this.comments.reduce((sum, comment) => sum + comment.rating, 0) / totalComments).toFixed(1) : 0.0
    const recommendPercent = totalComments > 0 ? 
      Math.round((this.comments.filter(comment => comment.rating >= 4).length / totalComments) * 100) : 0

    // Check if elements exist before updating
    const totalCommentsEl = document.getElementById('totalComments')
    const averageRatingEl = document.getElementById('averageRating')
    const recommendPercentEl = document.getElementById('recommendPercent')

    if (totalCommentsEl) totalCommentsEl.textContent = totalComments
    if (averageRatingEl) averageRatingEl.textContent = averageRating
    if (recommendPercentEl) recommendPercentEl.textContent = `${recommendPercent}%`
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.comment-notification')
    if (existingNotification) {
      existingNotification.remove()
    }

    const notification = document.createElement('div')
    notification.className = `comment-notification ${type}`
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--dark-green)' : 'var(--red)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: var(--font-body);
        max-width: 300px;
        animation: slideIn 0.3s ease;
      ">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
        ${message}
      </div>
    `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)
  }

  loadCommentsFromStorage() {
    try {
      const saved = localStorage.getItem('aswang-chronicles-comments')
      return saved ? JSON.parse(saved) : this.getDefaultComments()
    } catch (error) {
      console.warn('Error loading comments from localStorage:', error)
      return this.getDefaultComments()
    }
  }

  saveCommentsToStorage() {
    try {
      localStorage.setItem('aswang-chronicles-comments', JSON.stringify(this.comments))
    } catch (error) {
      console.warn('Error saving comments to localStorage:', error)
    }
  }

  // Clean up Firestore listener when component is destroyed
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
      console.log('🔥 Firestore listener unsubscribed')
    }
  }

  getDefaultComments() {
    // Some example comments to demonstrate the system
    return [
      {
        id: '1',
        playerName: 'Maria Santos',
        commentText: 'Amazing interactive experience! The way Filipino folklore is presented is both educational and engaging. The multiple choice paths really make you think about the consequences of your decisions.',
        rating: 5,
        favoriteAspect: 'folklore',
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        timestamp: Date.now() - 86400000 * 2
      },
      {
        id: '2',
        playerName: 'Carlos Rivera',
        commentText: 'Great concept and execution! Love how it preserves our cultural stories in a modern format. The atmosphere design really captures the mysterious essence of aswang legends.',
        rating: 4,
        favoriteAspect: 'atmosphere',
        date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        timestamp: Date.now() - 86400000 * 5
      },
      {
        id: '3',
        playerName: 'Anna Chen',
        commentText: 'As someone not familiar with Filipino folklore, this was an excellent introduction. The educational value is incredible while still being entertaining.',
        rating: 5,
        favoriteAspect: 'educational',
        date: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
        timestamp: Date.now() - 86400000 * 7
      }
    ]
  }
}

// CSS for notification animation
const style = document.createElement('style')
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(style)