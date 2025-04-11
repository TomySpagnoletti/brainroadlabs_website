/**
 * Handle the splash screen animation
 */

export function initSplashScreen() {
  const splash = document.getElementById('br_splash');
  if (!splash) return;
  
  // Hide splash screen after 1.5 seconds
  setTimeout(() => {
    splash.classList.add('br_splash--hidden');
    
    // Remove from DOM after transition completes
    setTimeout(() => {
      splash.remove();
    }, 600); // Same as transition duration
  }, 1500);
}