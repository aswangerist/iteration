// Share functionality for Aswang Chronicles Game Page
export class ShareSystem {
  constructor() {
    this.gameTitle = 'Aswang Chronicles - Interactive Filipino Folklore Experience'
    this.gameDescription = 'Immerse yourself in Filipino folklore through an interactive narrative game. Make choices that influence the story and discover the rich cultural heritage of the Philippines.'
    this.gameUrl = window.location.origin + '/game'
    this.gameImage = window.location.origin + '/Assets/WebsiteAssets/Logos/Horizontal.png'
    
    this.initGlobalFunctions()
  }

  initGlobalFunctions() {
    // Make share functions globally available for onclick handlers
    window.shareOnFacebook = () => this.shareOnFacebook()
    window.shareOnTwitter = () => this.shareOnTwitter()
    window.shareOnWhatsApp = () => this.shareOnWhatsApp()
    window.shareOnLinkedIn = () => this.shareOnLinkedIn()
    window.shareOnReddit = () => this.shareOnReddit()
    window.copyGameLink = () => this.copyGameLink()
  }

  shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.gameUrl)}&quote=${encodeURIComponent(this.gameTitle + ' - ' + this.gameDescription)}`
    this.openShareWindow(url, 'Facebook')
    this.trackShare('facebook')
  }

  shareOnTwitter() {
    const text = `🧛‍♀️ Just discovered ${this.gameTitle}! An amazing interactive journey through Filipino folklore. Check it out! #AswangChronicles #FilipinoFolklore #InteractiveStory`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.gameUrl)}`
    this.openShareWindow(url, 'Twitter')
    this.trackShare('twitter')
  }

  shareOnWhatsApp() {
    const text = `🧛‍♀️ Check out Aswang Chronicles - an interactive Filipino folklore experience! ${this.gameDescription} Play now: ${this.gameUrl}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    this.openShareWindow(url, 'WhatsApp')
    this.trackShare('whatsapp')
  }

  shareOnLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.gameUrl)}&title=${encodeURIComponent(this.gameTitle)}&summary=${encodeURIComponent(this.gameDescription)}`
    this.openShareWindow(url, 'LinkedIn')
    this.trackShare('linkedin')
  }

  shareOnReddit() {
    const url = `https://reddit.com/submit?url=${encodeURIComponent(this.gameUrl)}&title=${encodeURIComponent(this.gameTitle)}&text=${encodeURIComponent(this.gameDescription)}`
    this.openShareWindow(url, 'Reddit')
    this.trackShare('reddit')
  }

  async copyGameLink() {
    const copyBtn = document.querySelector('.share-btn.copy-link')
    const originalText = copyBtn.innerHTML
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        await navigator.clipboard.writeText(this.gameUrl)
      } else {
        // Fallback for older browsers
        this.fallbackCopyToClipboard(this.gameUrl)
      }
      
      // Update button to show success
      copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>'
      copyBtn.classList.add('copied')
      
      // Show success notification
      this.showNotification('Link copied to clipboard! Share it with your friends.', 'success')
      
      // Reset button after 2 seconds
      setTimeout(() => {
        copyBtn.innerHTML = originalText
        copyBtn.classList.remove('copied')
      }, 2000)
      
      this.trackShare('copy-link')
      
    } catch (error) {
      console.error('Failed to copy link:', error)
      this.showNotification('Failed to copy link. Please copy manually: ' + this.gameUrl, 'error')
    }
  }

  fallbackCopyToClipboard(text) {
    // Create temporary textarea element
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
    } catch (error) {
      throw new Error('Fallback copy failed')
    } finally {
      document.body.removeChild(textArea)
    }
  }

  openShareWindow(url, platform) {
    const width = 600
    const height = 400
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2
    
    const windowFeatures = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      toolbar=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      status=no
    `.replace(/\s/g, '')
    
    const shareWindow = window.open(url, `share-${platform.toLowerCase()}`, windowFeatures)
    
    // Focus the new window if possible
    if (shareWindow) {
      shareWindow.focus()
    }
  }

  trackShare(platform) {
    // Track sharing analytics (can be extended with actual analytics)
    console.log(`🧛‍♀️ Game shared on ${platform}`)
    
    // Update local storage for share statistics
    try {
      const shareStats = JSON.parse(localStorage.getItem('aswang-share-stats') || '{}')
      shareStats[platform] = (shareStats[platform] || 0) + 1
      shareStats.total = (shareStats.total || 0) + 1
      shareStats.lastShared = new Date().toISOString()
      localStorage.setItem('aswang-share-stats', JSON.stringify(shareStats))
    } catch (error) {
      console.warn('Could not save share statistics:', error)
    }
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.share-notification')
    if (existingNotification) {
      existingNotification.remove()
    }

    const notification = document.createElement('div')
    notification.className = 'share-notification'
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
        animation: slideInShare 0.3s ease;
        border: 2px solid ${type === 'success' ? 'var(--yellow)' : 'white'};
      ">
        <i class="fas fa-${type === 'success' ? 'share-alt' : 'exclamation-triangle'} me-2"></i>
        ${message}
      </div>
    `

    document.body.appendChild(notification)

    // Auto remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutShare 0.3s ease'
        setTimeout(() => notification.remove(), 300)
      }
    }, 4000)
  }

  getShareStats() {
    try {
      return JSON.parse(localStorage.getItem('aswang-share-stats') || '{}')
    } catch (error) {
      return {}
    }
  }

  // Check if Web Share API is supported (for mobile devices)
  isWebShareSupported() {
    return navigator.share !== undefined
  }

  async nativeShare() {
    if (this.isWebShareSupported()) {
      try {
        await navigator.share({
          title: this.gameTitle,
          text: this.gameDescription,
          url: this.gameUrl
        })
        this.trackShare('native-share')
        return true
      } catch (error) {
        console.warn('Native share failed:', error)
        return false
      }
    }
    return false
  }
}

// Add CSS animations for notifications
const style = document.createElement('style')
style.textContent = `
  @keyframes slideInShare {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutShare {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)