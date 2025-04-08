/**
 * BrainRoad Labs - Global JavaScript
 */

// Interactive bubble animation that follows the cursor
function initInteractiveBubble() {
  const interBubble = document.querySelector('.interactive');
  if (!interBubble) return;
  
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  }

  window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
}

// Function to handle responsive badge/title layouts
function initResponsiveHeaders() {
  // Using class selectors instead of IDs for reusability
  const containers = document.querySelectorAll('.br_js_header-container');
  
  function adjustLayout() {
    containers.forEach(container => {
      const title = container.querySelector('.br_js_title');
      const badge = container.querySelector('.br_js_badge');
      
      if (!title || !badge) return;
      
      // Clear layout classes first
      title.classList.remove('order-1', 'order-2', 'w-full', 'mt-3');
      badge.classList.remove('order-1', 'order-2');
      
      // Get positions
      const titleRect = title.getBoundingClientRect();
      const badgeRect = badge.getBoundingClientRect();
      
      // Check if they overlap or are too close (5px buffer)
      const isOverlapping = titleRect.right + 5 >= badgeRect.left;
      
      if (isOverlapping) {
        // Apply stacked layout only
        title.classList.add('order-2', 'w-full', 'mt-3');
        badge.classList.add('order-1');
      } else {
        // Apply side-by-side layout only
        title.classList.add('order-1');
        badge.classList.add('order-2');
      }
    });
  }
  
  // Run on resize
  window.addEventListener('resize', adjustLayout);
  
  // Initial adjustment
  adjustLayout();
}

// Function to handle the splash screen
function initSplashScreen() {
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

// Initialize all animations when document is ready
// Add additional initializations below as needed
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBubble();
  initResponsiveHeaders();
  initSplashScreen();
});