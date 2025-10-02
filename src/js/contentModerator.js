// Content moderation system for Aswang Chronicles
export class ContentModerator {
  constructor() {
    // Load thresholds from environment variables
    this.autoApprovalThreshold = parseInt(import.meta.env.VITE_AUTO_APPROVAL_THRESHOLD) || 75
    this.autoRejectionThreshold = parseInt(import.meta.env.VITE_AUTO_REJECTION_THRESHOLD) || 50
    this.rateLimitPerHour = parseInt(import.meta.env.VITE_RATE_LIMIT_COMMENTS_PER_HOUR) || 5
    
    // Profanity filter - Common inappropriate words
    this.profanityList = [
      // English profanity (mild - add more as needed)
      'stupid', 'idiot', 'moron', 'dumb', 'hate', 'suck', 'worst', 'terrible',
      'awful', 'horrible', 'disgusting', 'pathetic', 'loser', 'fail', 'trash',
      
      // Common spam indicators
      'click here', 'visit my', 'free money', 'win now', 'buy now', 'discount',
      'limited time', 'act now', 'special offer', 'guaranteed', 'amazing deal',
      
      // Inappropriate content indicators
      'inappropriate', 'offensive', 'harassment', 'bully', 'threat'
    ]
    
    // Spam patterns
    this.spamPatterns = [
      /(.)\1{4,}/g,                    // Repeated characters (5+ times)
      /[A-Z]{10,}/g,                   // Excessive caps (10+ consecutive)
      /(https?:\/\/[^\s]+)/g,          // URLs
      /(\b\w+\b)(\s+\1){2,}/gi,        // Repeated words (3+ times)
      /[!@#$%^&*()]{5,}/g,             // Excessive special characters
      /\b\d{4,}\b/g,                   // Phone numbers or long numbers
      /@\w+/g,                         // Email patterns
    ]
    
    // Positive/Cultural keywords that should boost score
    this.positiveKeywords = [
      'amazing', 'awesome', 'great', 'excellent', 'fantastic', 'wonderful',
      'love', 'beautiful', 'creative', 'inspiring', 'educational', 'cultural',
      'folklore', 'heritage', 'traditional', 'filipino', 'philippines', 'culture',
      'story', 'narrative', 'legend', 'myth', 'aswang', 'interactive', 'engaging'
    ]
  }

  // Main moderation function
  moderateComment(playerName, commentText) {
    const moderation = {
      isApproved: true,
      score: 100, // Start with perfect score, deduct points for issues
      issues: [],
      flags: [],
      severity: 'clean', // clean, mild, moderate, severe
      autoAction: 'approve' // approve, review, reject
    }

    // Check player name
    const nameIssues = this.checkPlayerName(playerName)
    if (nameIssues.length > 0) {
      moderation.issues.push(...nameIssues)
      moderation.score -= 20
    }

    // Check comment content
    const contentIssues = this.checkCommentContent(commentText)
    if (contentIssues.length > 0) {
      moderation.issues.push(...contentIssues)
      moderation.score -= contentIssues.length * 15
    }

    // Check for spam patterns
    const spamIssues = this.checkSpamPatterns(commentText)
    if (spamIssues.length > 0) {
      moderation.issues.push(...spamIssues)
      moderation.score -= spamIssues.length * 25
    }

    // Check for profanity
    const profanityIssues = this.checkProfanity(commentText)
    if (profanityIssues.length > 0) {
      moderation.issues.push(...profanityIssues)
      moderation.score -= profanityIssues.length * 30
    }

    // Boost score for positive/cultural content
    const positiveBoost = this.checkPositiveContent(commentText)
    if (positiveBoost > 0) {
      moderation.score = Math.min(100, moderation.score + positiveBoost)
      moderation.flags.push('positive_content')
    }

    // Determine severity and action
    moderation.severity = this.determineSeverity(moderation.score)
    moderation.autoAction = this.determineAutoAction(moderation.score, moderation.issues)
    moderation.isApproved = moderation.autoAction === 'approve'

    return moderation
  }

  checkPlayerName(playerName) {
    const issues = []
    
    // Check for suspicious patterns
    if (/^(admin|mod|test|spam|bot)/i.test(playerName)) {
      issues.push('suspicious_name_pattern')
    }
    
    // Check for excessive numbers
    if (/\d{4,}/.test(playerName)) {
      issues.push('excessive_numbers_in_name')
    }
    
    // Check for excessive special characters
    if (/[^a-zA-Z0-9\s]{3,}/.test(playerName)) {
      issues.push('excessive_special_chars_in_name')
    }
    
    return issues
  }

  checkCommentContent(commentText) {
    const issues = []
    
    // Check comment length quality
    if (commentText.length < 20) {
      issues.push('very_short_comment')
    }
    
    // Check for excessive punctuation
    if (/[!?]{3,}/.test(commentText)) {
      issues.push('excessive_punctuation')
    }
    
    // Check for all caps (more than 70% uppercase)
    const upperCount = (commentText.match(/[A-Z]/g) || []).length
    const letterCount = (commentText.match(/[A-Za-z]/g) || []).length
    if (letterCount > 0 && (upperCount / letterCount) > 0.7) {
      issues.push('excessive_caps')
    }
    
    return issues
  }

  checkSpamPatterns(commentText) {
    const issues = []
    
    this.spamPatterns.forEach(pattern => {
      if (pattern.test(commentText)) {
        switch (pattern.source) {
          case '(.)\\1{4,}':
            issues.push('repeated_characters')
            break
          case '[A-Z]{10,}':
            issues.push('excessive_caps_sequence')
            break
          case '(https?:\\/\\/[^\\s]+)':
            issues.push('contains_url')
            break
          case '(\\b\\w+\\b)(\\s+\\1){2,}':
            issues.push('repeated_words')
            break
          case '[!@#$%^&*()]{5,}':
            issues.push('excessive_special_chars')
            break
          case '\\b\\d{4,}\\b':
            issues.push('contains_phone_number')
            break
          case '@\\w+':
            issues.push('contains_email_pattern')
            break
        }
      }
    })
    
    return issues
  }

  checkProfanity(commentText) {
    const issues = []
    const lowerText = commentText.toLowerCase()
    
    this.profanityList.forEach(word => {
      if (lowerText.includes(word.toLowerCase())) {
        issues.push(`profanity_detected_${word}`)
      }
    })
    
    return issues
  }

  checkPositiveContent(commentText) {
    const lowerText = commentText.toLowerCase()
    let boost = 0
    
    this.positiveKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        boost += 5
      }
    })
    
    // Extra boost for cultural/educational content
    const culturalKeywords = ['folklore', 'culture', 'heritage', 'traditional', 'educational', 'filipino']
    culturalKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        boost += 10
      }
    })
    
    return Math.min(boost, 30) // Cap at 30 point boost
  }

  determineSeverity(score) {
    if (score >= 80) return 'clean'
    if (score >= 60) return 'mild'
    if (score >= 40) return 'moderate'
    return 'severe'
  }

  determineAutoAction(score, issues) {
    // Auto-reject severe issues
    if (issues.some(issue => issue.includes('profanity') || issue.includes('url'))) {
      return 'reject'
    }
    
    // Score-based decisions using environment variables
    if (score >= this.autoApprovalThreshold) return 'approve'
    if (score >= this.autoRejectionThreshold) return 'review'
    return 'reject'
  }

  // Generate user-friendly moderation message
  getModerationMessage(moderation) {
    if (moderation.isApproved) {
      return null // No message needed for approved comments
    }
    
    const messages = {
      'suspicious_name_pattern': 'Please use a more appropriate display name.',
      'excessive_caps': 'Please avoid using excessive capital letters.',
      'profanity_detected': 'Please keep comments respectful and family-friendly.',
      'contains_url': 'Comments with links are not allowed for security reasons.',
      'repeated_characters': 'Please avoid repeating characters excessively.',
      'very_short_comment': 'Please write a more detailed review to help other players.',
      'contains_phone_number': 'Please don\'t include personal information in comments.'
    }
    
    // Find the most relevant message
    for (const issue of moderation.issues) {
      for (const [key, message] of Object.entries(messages)) {
        if (issue.includes(key.split('_')[0])) {
          return message
        }
      }
    }
    
    return 'Your comment needs review before it can be published. Please ensure it follows our community guidelines.'
  }

  // Generate moderation report for admins
  getModerationReport(moderation, playerName, commentText) {
    return {
      timestamp: new Date().toISOString(),
      playerName,
      commentText,
      score: moderation.score,
      severity: moderation.severity,
      autoAction: moderation.autoAction,
      issues: moderation.issues,
      flags: moderation.flags,
      needsReview: moderation.autoAction === 'review',
      isRejected: moderation.autoAction === 'reject'
    }
  }
}

// Singleton instance
export const contentModerator = new ContentModerator()