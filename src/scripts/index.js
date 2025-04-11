/**
 * BrainRoad Labs - Main JavaScript
 */

import { initInteractiveBubble } from './interactiveBubble.js';
import { initResponsiveHeaders } from './responsiveHeaders.js';
import { initSplashScreen } from './splashScreen.js';
import { initScrollTransition } from './scrollTransitionV2.js';
import { initDOM } from './initDOM.js';

// Initialize all features when document is ready
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initInteractiveBubble();
  initResponsiveHeaders();
  initSplashScreen();
  initScrollTransition();
});