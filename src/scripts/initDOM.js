/**
 * Initialize DOM with proper parameters
 */

export function initDOM() {

  /* — — — — — — — VIEWPORT HEIGHT — — — — — — — */

  // Set viewport height CSS variable
  const setViewportHeight = () => {
    // Use visual viewport if available for better mobile support
    const vh = window.visualViewport 
      ? window.visualViewport.height 
      : window.innerHeight;
    
    // Set the CSS variable (numeric value without unit)
    document.documentElement.style.setProperty('--viewport-height', vh);
  };

  // Set initially
  setViewportHeight();
  
  // Update on resize
  window.addEventListener('resize', setViewportHeight);
  
  // For mobile, also update on orientation change
  window.addEventListener('orientationchange', setViewportHeight);

  /* — — — — — — — CONTAINER CLASSES — — — — — — — */
  
  // Initialize container classes based on their order values
  const initContainerClasses = () => {
    const containers = document.querySelectorAll('.br_container');
    
    containers.forEach(container => {
      // Get order directly from CSS variable
      const orderValue = container.style.getPropertyValue('--order');
      const order = parseInt(orderValue);
      
      // Apply appropriate class based on order sign
      if (order > 0) {
        container.classList.add('br_container--default-state');
        container.classList.remove('br_container--above');
      } else if (order < 0) {
        container.classList.add('br_container--above');
        container.classList.remove('br_container--default-state');
      }
    });
  };
  
  // Initialize container classes
  initContainerClasses();

  /* — — — — — — — MAX BLOCKS COUNT — — — — — — — */
  
  // Count the total number of .br_container elements and update --max-blocks if needed
  const updateMaxBlocks = () => {
    const containers = document.querySelectorAll('.br_container');
    const blockCount = containers.length;
    
    // Get current --max-blocks value from CSS
    const currentMaxBlocks = getComputedStyle(document.documentElement).getPropertyValue('--max-blocks').trim();
    
    // Only update if the actual count is different from the CSS value
    if (blockCount.toString() !== currentMaxBlocks) {
      document.documentElement.style.setProperty('--max-blocks', blockCount);
    }
  };
  
  // Update max blocks count
  updateMaxBlocks();
  
}