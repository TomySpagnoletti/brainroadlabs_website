/**
 * Handle responsive badge/title layouts
 */

export function initResponsiveHeaders() {
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