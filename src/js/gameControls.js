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
    initFullscreenControls();
  }, 100);
  
  // Also try again with a longer delay as fallback
  setTimeout(() => {
    initFullscreenControls();
  }, 500);
  
  console.log('Game controls initialization scheduled');
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