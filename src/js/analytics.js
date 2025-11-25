// Analytics tracking system for Aswang Chronicles
// Combines Google Analytics 4 events with custom Firebase tracking

import { db, COLLECTIONS } from './firebase.js';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export class Analytics {
  constructor() {
    this.gaReady = typeof gtag !== 'undefined';
  }

  // Google Analytics 4 Event Tracking
  trackEvent(eventName, eventParams = {}) {
    if (this.gaReady) {
      gtag('event', eventName, eventParams);
    }
    console.log('📊 Event tracked:', eventName, eventParams);
  }

  // Page View Tracking
  trackPageView(pagePath, pageTitle) {
    if (this.gaReady) {
      gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  }

  // Game Play Tracking (to Firebase)
  async trackGamePlay(gameData) {
    try {
      const playData = {
        gameName: gameData.gameName,
        gameUrl: gameData.gameUrl || window.location.href,
        timestamp: serverTimestamp(),
        sessionId: this.getSessionId(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      };

      // Save to Firebase
      await addDoc(collection(db, COLLECTIONS.ANALYTICS), playData);

      // Also track in GA4
      this.trackEvent('game_play', {
        game_name: gameData.gameName,
        game_url: gameData.gameUrl
      });

      console.log('✅ Game play tracked:', gameData.gameName);
    } catch (error) {
      console.error('❌ Error tracking game play:', error);
    }
  }

  // Story Path Tracking (user choices)
  async trackStoryChoice(choiceData) {
    try {
      const trackData = {
        storyId: choiceData.storyId,
        choiceId: choiceData.choiceId,
        choiceText: choiceData.choiceText,
        timestamp: serverTimestamp(),
        sessionId: this.getSessionId()
      };

      await addDoc(collection(db, COLLECTIONS.STORY_CHOICES), trackData);

      this.trackEvent('story_choice', {
        story_id: choiceData.storyId,
        choice_id: choiceData.choiceId
      });
    } catch (error) {
      console.error('❌ Error tracking story choice:', error);
    }
  }

  // Button Click Tracking
  trackButtonClick(buttonName, buttonLocation) {
    this.trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation
    });
  }

  // Social Share Tracking
  trackShare(platform, contentType) {
    this.trackEvent('share', {
      method: platform,
      content_type: contentType,
      item_id: window.location.pathname
    });
  }

  // External Link Tracking
  trackOutboundLink(url, linkText) {
    this.trackEvent('click', {
      event_category: 'outbound',
      event_label: url,
      link_text: linkText
    });
  }

  // Admin Actions Tracking
  trackAdminAction(action, details = {}) {
    this.trackEvent('admin_action', {
      action_type: action,
      ...details
    });
  }

  // Get or create session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Get analytics data from Firebase (for dashboard)
  async getGamePlayStats(dateRange = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      const analyticsRef = collection(db, COLLECTIONS.ANALYTICS);
      const q = query(analyticsRef);
      const snapshot = await getDocs(q);

      const stats = {
        total: 0,
        byGame: {},
        byDate: {},
        byReferrer: {}
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;

        // Count by game
        if (data.gameName) {
          stats.byGame[data.gameName] = (stats.byGame[data.gameName] || 0) + 1;
        }

        // Count by date
        if (data.timestamp) {
          const date = data.timestamp.toDate().toLocaleDateString();
          stats.byDate[date] = (stats.byDate[date] || 0) + 1;
        }

        // Count by referrer
        if (data.referrer) {
          stats.byReferrer[data.referrer] = (stats.byReferrer[data.referrer] || 0) + 1;
        }
      });

      return stats;
    } catch (error) {
      console.error('❌ Error getting game play stats:', error);
      return null;
    }
  }

  // Get story choice analytics
  async getStoryChoiceStats() {
    try {
      const choicesRef = collection(db, COLLECTIONS.STORY_CHOICES);
      const snapshot = await getDocs(choicesRef);

      const stats = {
        total: 0,
        byStory: {},
        byChoice: {}
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;

        // Count by story
        if (data.storyId) {
          stats.byStory[data.storyId] = (stats.byStory[data.storyId] || 0) + 1;
        }

        // Count by specific choice
        const choiceKey = `${data.storyId}_${data.choiceId}`;
        stats.byChoice[choiceKey] = (stats.byChoice[choiceKey] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('❌ Error getting story choice stats:', error);
      return null;
    }
  }
}

// Create global analytics instance
export const analytics = new Analytics();

// Auto-track external links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && link.target === '_blank') {
    analytics.trackOutboundLink(link.href, link.textContent);
  }
});
