/**
 * BrainRoad Labs - Main JavaScript
 */

import { initInteractiveBubble } from './interactiveBubble.js';
import { initResponsiveHeaders } from './responsiveHeaders.js';
import { initNavigation } from './navigation.js';
import { initDOM } from './initDOM.js';
import { initImageModal } from './modal.js';
import { initResize } from './resize.js';

// Initialize all features when document is ready
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initInteractiveBubble();
  initResponsiveHeaders();
  initNavigation();
  initImageModal();
  initResize();
});