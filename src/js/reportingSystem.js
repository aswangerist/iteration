// User reporting system for Aswang Chronicles
import { 
  db, 
  COLLECTIONS, 
  handleFirestoreError 
} from './firebase.js'
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore'

export class ReportingSystem {
  constructor() {
    this.init()
  }

  init() {
    this.addReportButtons()
  }

  addReportButtons() {
    // Add report buttons to existing comments
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('report-comment-btn')) {
        e.preventDefault()
        const commentId = e.target.dataset.commentId
        this.showReportModal(commentId)
      }
    })

    // Observer to add report buttons to new comments
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList?.contains('comment-item')) {
              this.addReportButtonToComment(node)
            }
          })
        }
      })
    })

    // Start observing the comments list
    const commentsList = document.getElementById('commentsList')
    if (commentsList) {
      observer.observe(commentsList, { childList: true, subtree: true })
    }
  }

  addReportButtonToComment(commentElement) {
    const commentId = commentElement.dataset.commentId
    if (!commentId || commentElement.querySelector('.report-comment-btn')) {
      return // Already has report button or no ID
    }

    const commentActions = commentElement.querySelector('.comment-actions') || 
                          commentElement.querySelector('.comment-meta')
    
    if (commentActions) {
      const reportBtn = document.createElement('button')
      reportBtn.className = 'btn btn-sm btn-outline-secondary report-comment-btn ms-2'
      reportBtn.dataset.commentId = commentId
      reportBtn.innerHTML = '<i class="fas fa-flag"></i> Report'
      reportBtn.title = 'Report inappropriate content'
      
      commentActions.appendChild(reportBtn)
    }
  }

  showReportModal(commentId) {
    // Remove existing modal if present
    const existingModal = document.getElementById('reportModal')
    if (existingModal) {
      existingModal.remove()
    }

    const modal = document.createElement('div')
    modal.id = 'reportModal'
    modal.innerHTML = `
      <div class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header border-secondary">
              <h5 class="modal-title">
                <i class="fas fa-flag text-warning"></i> Report Comment
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>Please help us maintain a safe and respectful community by reporting inappropriate content.</p>
              
              <form id="reportForm">
                <div class="mb-3">
                  <label class="form-label">Reason for reporting:</label>
                  <select class="form-select bg-dark text-light border-secondary" id="reportReason" required>
                    <option value="">Select a reason...</option>
                    <option value="spam">Spam or unwanted commercial content</option>
                    <option value="harassment">Harassment or bullying</option>
                    <option value="inappropriate">Inappropriate or offensive content</option>
                    <option value="misinformation">False or misleading information</option>
                    <option value="copyright">Copyright violation</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                </div>
                
                <div class="mb-3">
                  <label for="reportDetails" class="form-label">Additional details (optional):</label>
                  <textarea 
                    class="form-control bg-dark text-light border-secondary" 
                    id="reportDetails" 
                    rows="3" 
                    placeholder="Please provide any additional context that might help our moderators..."
                    maxlength="500"
                  ></textarea>
                  <div class="form-text text-muted">
                    <span id="reportCharCount">0</span>/500 characters
                  </div>
                </div>
                
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="reportConfirm" required>
                    <label class="form-check-label text-light" for="reportConfirm">
                      I confirm that this report is submitted in good faith and the content violates community guidelines.
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer border-secondary">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-warning" id="submitReport">
                <i class="fas fa-flag"></i> Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Character counter
    const reportDetails = document.getElementById('reportDetails')
    const charCount = document.getElementById('reportCharCount')
    
    reportDetails.addEventListener('input', () => {
      charCount.textContent = reportDetails.value.length
    })

    // Event listeners
    modal.querySelector('[data-bs-dismiss="modal"]').addEventListener('click', () => {
      modal.remove()
    })

    modal.querySelector('.btn-close').addEventListener('click', () => {
      modal.remove()
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })

    document.getElementById('submitReport').addEventListener('click', () => {
      this.submitReport(commentId, modal)
    })

    // Focus on the select element
    document.getElementById('reportReason').focus()
  }

  async submitReport(commentId, modal) {
    const form = document.getElementById('reportForm')
    const reason = document.getElementById('reportReason').value
    const details = document.getElementById('reportDetails').value
    const confirmed = document.getElementById('reportConfirm').checked

    // Validation
    if (!reason) {
      this.showReportNotification('Please select a reason for reporting', 'error')
      return
    }

    if (!confirmed) {
      this.showReportNotification('Please confirm that your report is submitted in good faith', 'error')
      return
    }

    try {
      const report = {
        commentId: commentId,
        reason: reason,
        details: details.trim(),
        reportedAt: serverTimestamp(),
        reporterIP: await this.getReporterInfo(), // For tracking without storing personal data
        status: 'pending',
        resolved: false
      }

      // Save report to Firestore
      await addDoc(collection(db, 'reports'), report)
      
      this.showReportNotification('Thank you for your report. Our team will review it shortly.', 'success')
      modal.remove()
      
      // Disable the report button for this comment temporarily
      this.disableReportButton(commentId)

    } catch (error) {
      console.error('Error submitting report:', error)
      this.showReportNotification('Failed to submit report. Please try again.', 'error')
    }
  }

  async getReporterInfo() {
    // Get basic info for tracking without personal data
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return {
        ip: data.ip,
        userAgent: navigator.userAgent.substring(0, 100), // Truncated
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        ip: 'unknown',
        userAgent: navigator.userAgent.substring(0, 100),
        timestamp: new Date().toISOString()
      }
    }
  }

  disableReportButton(commentId) {
    const reportBtn = document.querySelector(`.report-comment-btn[data-comment-id="${commentId}"]`)
    if (reportBtn) {
      reportBtn.disabled = true
      reportBtn.innerHTML = '<i class="fas fa-check"></i> Reported'
      reportBtn.classList.remove('btn-outline-secondary')
      reportBtn.classList.add('btn-outline-success')
      
      // Store in localStorage to persist across page reloads
      const reportedComments = JSON.parse(localStorage.getItem('reported_comments') || '[]')
      if (!reportedComments.includes(commentId)) {
        reportedComments.push(commentId)
        localStorage.setItem('reported_comments', JSON.stringify(reportedComments))
      }
    }
  }

  checkReportedComments() {
    // Check if comments were already reported and disable buttons
    const reportedComments = JSON.parse(localStorage.getItem('reported_comments') || '[]')
    
    reportedComments.forEach(commentId => {
      this.disableReportButton(commentId)
    })
  }

  showReportNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.report-notification')
    if (existingNotification) {
      existingNotification.remove()
    }

    const notification = document.createElement('div')
    notification.className = 'report-notification'
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: var(--font-body);
        max-width: 350px;
        animation: slideIn 0.3s ease;
      ">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
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

  // Initialize when page loads
  static init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const reportingSystem = new ReportingSystem()
        reportingSystem.checkReportedComments()
      })
    } else {
      const reportingSystem = new ReportingSystem()
      reportingSystem.checkReportedComments()
    }
  }
}

// Auto-initialize
ReportingSystem.init()

// Export singleton
export const reportingSystem = new ReportingSystem()