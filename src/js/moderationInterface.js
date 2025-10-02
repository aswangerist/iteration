// Admin moderation interface for Aswang Chronicles
import { 
  db, 
  COLLECTIONS, 
  handleFirestoreError 
} from './firebase.js'
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { contentModerator } from './contentModerator.js'

export class ModerationInterface {
  constructor() {
    this.pendingComments = []
    this.flaggedComments = []
    this.isAdminMode = false
    this.init()
  }

  init() {
    this.checkAdminAccess()
    this.setupEventListeners()
  }

  checkAdminAccess() {
    // Simple admin check - in production, use proper authentication
    const adminKey = localStorage.getItem('aswang_admin_key')
    this.isAdminMode = adminKey === 'aswang_admin_2024' // Change this in production
    
    if (this.isAdminMode) {
      this.createAdminPanel()
      this.loadPendingComments()
    }
  }

  setupEventListeners() {
    // Admin panel toggle
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+M to toggle admin mode
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault()
        this.promptAdminAccess()
      }
    })
  }

  promptAdminAccess() {
    const adminKey = prompt('Enter admin key:')
    if (adminKey) {
      localStorage.setItem('aswang_admin_key', adminKey)
      this.checkAdminAccess()
    }
  }

  createAdminPanel() {
    // Create admin panel if it doesn't exist
    if (document.getElementById('adminPanel')) return

    const adminPanel = document.createElement('div')
    adminPanel.id = 'adminPanel'
    adminPanel.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      ">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0"><i class="fas fa-shield-alt"></i> Admin Panel</h5>
          <button id="closeAdminPanel" class="btn btn-sm btn-outline-light">×</button>
        </div>
        
        <div class="mb-3">
          <div class="d-flex gap-2">
            <button id="loadPendingBtn" class="btn btn-sm btn-warning">
              <i class="fas fa-clock"></i> Pending (<span id="pendingCount">0</span>)
            </button>
            <button id="loadFlaggedBtn" class="btn btn-sm btn-danger">
              <i class="fas fa-flag"></i> Flagged (<span id="flaggedCount">0</span>)
            </button>
          </div>
        </div>
        
        <div id="moderationQueue" style="max-height: 400px; overflow-y: auto;">
          <p class="text-muted">No items to review</p>
        </div>
        
        <div class="mt-3 text-small">
          <div>Press Ctrl+Shift+M to toggle this panel</div>
          <div class="text-muted">Admin mode active</div>
        </div>
      </div>
    `

    document.body.appendChild(adminPanel)

    // Event listeners
    document.getElementById('closeAdminPanel').addEventListener('click', () => {
      adminPanel.remove()
      localStorage.removeItem('aswang_admin_key')
      this.isAdminMode = false
    })

    document.getElementById('loadPendingBtn').addEventListener('click', () => {
      this.loadPendingComments()
    })

    document.getElementById('loadFlaggedBtn').addEventListener('click', () => {
      this.loadFlaggedComments()
    })
  }

  async loadPendingComments() {
    try {
      const q = query(
        collection(db, COLLECTIONS.COMMENTS),
        where('status', '==', 'pending_review'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(q)
      this.pendingComments = []
      
      snapshot.forEach((doc) => {
        this.pendingComments.push({ id: doc.id, ...doc.data() })
      })

      document.getElementById('pendingCount').textContent = this.pendingComments.length
      this.renderModerationQueue('pending')

    } catch (error) {
      console.error('Error loading pending comments:', error)
      this.showAdminNotification('Failed to load pending comments', 'error')
    }
  }

  async loadFlaggedComments() {
    try {
      const q = query(
        collection(db, COLLECTIONS.COMMENTS),
        where('moderation.score', '<', 60),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(q)
      this.flaggedComments = []
      
      snapshot.forEach((doc) => {
        const comment = { id: doc.id, ...doc.data() }
        if (comment.moderation?.score < 60) {
          this.flaggedComments.push(comment)
        }
      })

      document.getElementById('flaggedCount').textContent = this.flaggedComments.length
      this.renderModerationQueue('flagged')

    } catch (error) {
      console.error('Error loading flagged comments:', error)
      this.showAdminNotification('Failed to load flagged comments', 'error')
    }
  }

  renderModerationQueue(type) {
    const queue = type === 'pending' ? this.pendingComments : this.flaggedComments
    const queueContainer = document.getElementById('moderationQueue')

    if (queue.length === 0) {
      queueContainer.innerHTML = `<p class="text-muted">No ${type} items to review</p>`
      return
    }

    queueContainer.innerHTML = queue.map(comment => this.renderModerationItem(comment, type)).join('')

    // Add event listeners for moderation actions
    queue.forEach(comment => {
      const approveBtn = document.getElementById(`approve-${comment.id}`)
      const rejectBtn = document.getElementById(`reject-${comment.id}`)
      const deleteBtn = document.getElementById(`delete-${comment.id}`)

      if (approveBtn) {
        approveBtn.addEventListener('click', () => this.approveComment(comment.id))
      }
      if (rejectBtn) {
        rejectBtn.addEventListener('click', () => this.rejectComment(comment.id))
      }
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => this.deleteComment(comment.id))
      }
    })
  }

  renderModerationItem(comment, type) {
    const moderation = comment.moderation || {}
    const date = comment.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()
    
    return `
      <div class="border rounded p-2 mb-2 bg-dark">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <strong class="text-warning">${comment.playerName}</strong>
          <small class="text-muted">${date}</small>
        </div>
        
        <div class="mb-2">
          <div class="rating-display">
            ${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}
          </div>
        </div>
        
        <p class="text-light mb-2">"${comment.commentText}"</p>
        
        <div class="mb-2">
          <div class="d-flex gap-2 flex-wrap">
            <span class="badge bg-${moderation.severity === 'severe' ? 'danger' : moderation.severity === 'moderate' ? 'warning' : 'info'}">
              Score: ${moderation.score || 'N/A'}
            </span>
            <span class="badge bg-secondary">${moderation.severity || 'unknown'}</span>
            ${moderation.flags?.map(flag => `<span class="badge bg-info">${flag}</span>`).join('') || ''}
          </div>
        </div>
        
        ${moderation.issues?.length ? `
          <div class="mb-2">
            <small class="text-danger">Issues: ${moderation.issues.join(', ')}</small>
          </div>
        ` : ''}
        
        <div class="d-flex gap-2">
          ${type === 'pending' ? `
            <button id="approve-${comment.id}" class="btn btn-sm btn-success">
              <i class="fas fa-check"></i> Approve
            </button>
            <button id="reject-${comment.id}" class="btn btn-sm btn-warning">
              <i class="fas fa-times"></i> Reject
            </button>
          ` : ''}
          <button id="delete-${comment.id}" class="btn btn-sm btn-danger">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `
  }

  async approveComment(commentId) {
    try {
      await updateDoc(doc(db, COLLECTIONS.COMMENTS, commentId), {
        status: 'approved',
        'moderation.approved': true,
        'moderation.reviewedAt': new Date().toISOString(),
        'moderation.reviewedBy': 'admin'
      })

      this.showAdminNotification('Comment approved', 'success')
      this.loadPendingComments() // Refresh the queue

    } catch (error) {
      console.error('Error approving comment:', error)
      this.showAdminNotification('Failed to approve comment', 'error')
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

      this.showAdminNotification('Comment rejected', 'success')
      this.loadPendingComments() // Refresh the queue

    } catch (error) {
      console.error('Error rejecting comment:', error)
      this.showAdminNotification('Failed to reject comment', 'error')
    }
  }

  async deleteComment(commentId) {
    if (!confirm('Are you sure you want to permanently delete this comment?')) {
      return
    }

    try {
      await deleteDoc(doc(db, COLLECTIONS.COMMENTS, commentId))
      
      this.showAdminNotification('Comment deleted', 'success')
      this.loadPendingComments() // Refresh the queue
      this.loadFlaggedComments() // Refresh flagged queue too

    } catch (error) {
      console.error('Error deleting comment:', error)
      this.showAdminNotification('Failed to delete comment', 'error')
    }
  }

  showAdminNotification(message, type = 'info') {
    // Simple notification for admin actions
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed;
      top: 50px;
      right: 10px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
      color: white;
      padding: 8px 12px;
      border-radius: 5px;
      z-index: 10001;
      font-size: 14px;
    `
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 3000)
  }

  // Public method to enable admin mode programmatically
  enableAdminMode(adminKey = 'aswang_admin_2024') {
    localStorage.setItem('aswang_admin_key', adminKey)
    this.checkAdminAccess()
  }

  // Public method to disable admin mode
  disableAdminMode() {
    const adminPanel = document.getElementById('adminPanel')
    if (adminPanel) {
      adminPanel.remove()
    }
    localStorage.removeItem('aswang_admin_key')
    this.isAdminMode = false
  }
}

// Singleton instance
export const moderationInterface = new ModerationInterface()