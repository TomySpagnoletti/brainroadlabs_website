/**
 * BrainRoad Labs - Main JavaScript
 */

import { initInteractiveBubble } from './interactiveBubble.js';
import { initResponsiveHeaders } from './responsiveHeaders.js';
import { initSplashScreen } from './splashScreen.js';
import { initNavigation } from './navigation.js';
import { initDOM } from './initDOM.js';

// Initialize all features when document is ready
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initInteractiveBubble();
  initResponsiveHeaders();
  initSplashScreen();
  initNavigation();
});