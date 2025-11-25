// Game data configuration for Aswang Chronicles
export const GAMES = [
  {
    id: 'spoon-test',
    title: 'Aswang Chronicles: Spoon Test',
    subtitle: 'Experience the prototype of our interactive Filipino folklore adventure',
    iframeSrc: 'https://itch.io/embed-upload/14090605?color=1e1e1e',
    itchUrl: 'https://aswang-chronicles.itch.io/aswang-chronicles-spoon-test',
    containerClass: 'game-embed-container',
    iframeClass: 'game-embed-iframe',
    gameKey: 'first'
  },
  {
    id: 'left-in-shadows',
    title: 'Aswang Chronicles: Left In the Shadows',
    subtitle: 'Discover another chapter in our Filipino folklore collection',
    iframeSrc: 'https://itch.io/embed-upload/15242150?color=333333',
    itchUrl: 'https://aswang-chronicles.itch.io/aswang-chronicles-left-in-the-shadows',
    containerClass: 'second-game-embed-container',
    iframeClass: 'second-game-embed-iframe',
    gameKey: 'second'
  },
  {
    id: 'smoke-break',
    title: 'Aswang Chronicles: Smoke Break',
    subtitle: 'Another thrilling chapter in our Filipino folklore series',
    iframeSrc: 'https://itch.io/embed-upload/15268338?color=333333',
    itchUrl: 'https://aswang-chronicles.itch.io/aswang-chronicles-smoke-break',
    containerClass: 'third-game-embed-container',
    iframeClass: 'third-game-embed-iframe',
    gameKey: 'third'
  }
];

export function getGameById(id) {
  return GAMES.find(game => game.id === id);
}

export function getGameByKey(key) {
  return GAMES.find(game => game.gameKey === key);
}
