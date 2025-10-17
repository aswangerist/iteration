// Game controls and UI functionality for Aswang Chronicles
export function initGameControls() {
  console.log('Game controls initialization started');
  
  // Only initialize if we're on the game page
  if (window.location.pathname !== '/game') {
    console.log('Not on game page, skipping game controls initialization');
    return;
  }
  
  // Initialize warning documentation
  initWarningDocumentation();
  
  // Add a small delay to ensure DOM is fully rendered
  setTimeout(() => {
    initBackgroundToggle();
    initFullscreenControls();
  }, 100);
  
  // Also try again with a longer delay as fallback
  setTimeout(() => {
    if (!document.getElementById('backgroundToggle')) {
      console.log('Retrying background toggle initialization...');
      initBackgroundToggle();
    }
    initFullscreenControls();
  }, 500);
  
  console.log('Game controls initialization scheduled');
}

function initBackgroundToggle() {
  console.log('Initializing background toggle...');
  const toggle = document.getElementById('backgroundToggle');
  const body = document.body;
  
  console.log('Toggle element found:', toggle);
  console.log('Current URL:', window.location.pathname);
  
  if (!toggle) {
    // Only warn if we're actually on the game page
    if (window.location.pathname === '/game') {
      console.warn('Background toggle element not found on game page');
    } else {
      console.log('Background toggle not found - not on game page');
    }
    return;
  }
  
  // Check localStorage for saved preference
  const savedDarkMode = localStorage.getItem('aswang-dark-gaming-mode') === 'true';
  console.log('Saved dark mode preference:', savedDarkMode);
  
  if (savedDarkMode) {
    toggle.checked = true;
    body.classList.add('dark-gaming-mode');
    console.log('Applied saved dark mode');
  }
  
  // Handle toggle change
  toggle.addEventListener('change', function() {
    console.log('Toggle changed, checked:', this.checked);
    
    if (this.checked) {
      body.classList.add('dark-gaming-mode');
      localStorage.setItem('aswang-dark-gaming-mode', 'true');
      body.style.transition = 'background-color 0.5s ease';
      console.log('Dark mode enabled');
      showToggleNotification('Dark mode enabled for better gaming experience');
    } else {
      body.classList.remove('dark-gaming-mode');
      localStorage.setItem('aswang-dark-gaming-mode', 'false');
      body.style.transition = 'background-color 0.5s ease';
      console.log('Dark mode disabled');
      showToggleNotification('Dark mode disabled');
    }
  });
  
  console.log('Background toggle initialized successfully');
}

function showToggleNotification(message) {
  // Create a subtle notification
  const notification = document.createElement('div');
  notification.className = 'toggle-notification';
  notification.textContent = message;
  notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.8); color: white; padding: 12px 20px; border-radius: 8px; font-size: 0.9rem; z-index: 10000; opacity: 0; transform: translateY(-20px); transition: all 0.3s ease; border-left: 4px solid #bd0300;';
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function initFullscreenControls() {
  // Make fullscreen function globally available
  window.enterGameFullscreen = enterGameFullscreen;
  window.exitGameFullscreen = exitGameFullscreen;
  
  // Listen for fullscreen change events
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  
  // Add double-click to fullscreen on game container
  const gameContainer = document.querySelector('.game-embed-container');
  if (gameContainer) {
    gameContainer.addEventListener('dblclick', (e) => {
      e.preventDefault();
      enterGameFullscreen();
    });
    
    // Add title attribute for user guidance
    gameContainer.title = 'Double-click to enter fullscreen mode';
  }
  
  console.log('Fullscreen controls initialized');
}

function enterGameFullscreen() {
  const gameContainer = document.querySelector('.game-embed-container');
  const iframe = document.querySelector('.game-embed-iframe');
  
  if (!gameContainer || !iframe) {
    console.warn('Game container or iframe not found');
    showToggleNotification('Could not enter fullscreen mode');
    return;
  }
  
  // Request fullscreen
  const element = gameContainer;
  
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    // Fallback: open in new window
    const gameUrl = iframe.src;
    window.open(gameUrl, '_blank', 'width=1080,height=800,scrollbars=no,resizable=yes');
    showToggleNotification('Opened game in new window');
    return;
  }
  
  showToggleNotification('Entering fullscreen mode...');
}

function exitGameFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function handleFullscreenChange() {
  const isFullscreen = !!(document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement);
  
  const gameContainer = document.querySelector('.game-embed-container');
  
  if (gameContainer) {
    if (isFullscreen) {
      gameContainer.classList.add('game-fullscreen-mode');
      showToggleNotification('Press ESC to exit fullscreen');
    } else {
      gameContainer.classList.remove('game-fullscreen-mode');
      showToggleNotification('Exited fullscreen mode');
    }
  }
  
  console.log('Fullscreen state changed:', isFullscreen);
}

function initWarningDocumentation() {
  // Document expected warnings from itch.io iframe for developers
  console.group('🎮 Game Embed Information');
  console.info('Expected warnings from itch.io embed (can be safely ignored):');
  console.info('• "Unrecognized feature: monetization" - Web Monetization API (experimental)');
  console.info('• "Unrecognized feature: xr" - WebXR API (experimental)');
  console.info('• "Allow attribute will take precedence" - Internal itch.io iframe settings');
  console.info('• "AudioContext warnings" - Normal browser security, will resolve on user interaction');
  console.info('• Permissions policy violations - Explicitly denied for security (camera, microphone, etc.)');
  console.groupEnd();
}