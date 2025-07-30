/**
 * Handles resizing of all .br_container blocks by dragging a handle.
 * This functionality is only active on desktop devices in landscape mode.
 */

export function initResize() {
  // --- Constants ---
  const HANDLE_HEIGHT = 20; // The height of the handle hit area in pixels
  const MIN_HEIGHT = 300;   // The minimum height in pixels
  const MAX_HEIGHT = 700;   // The maximum height in pixels
  const ANIMATION_DURATION = 400; // Must match the CSS transition duration

  // --- State Variables ---
  let isResizing = false;
  let activeContainer = null;

  /**
   * Checks if the resize functionality should be active.
   * @returns {boolean} - True if resizing should be enabled.
   */
  function shouldBeActive() {
    return window.matchMedia("(orientation: landscape) and (min-width: 1024px) and (hover: hover)").matches;
  }

  /**
   * Handles the mousedown event to initiate resizing.
   * @param {MouseEvent} e - The mousedown event.
   */
  function onMouseDown(e) {
    if (!shouldBeActive() || e.button !== 0) return; // Only for left-click

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const isClickOnHandle = e.clientY > rect.bottom - HANDLE_HEIGHT;

    if (isClickOnHandle) {
      isResizing = true;
      activeContainer = container;
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  /**
   * Handles the mousemove event to perform the resize.
   * @param {MouseEvent} e - The mousemove event.
   */
  function onMouseMove(e) {
    if (!isResizing || !activeContainer) return;

    const rect = activeContainer.getBoundingClientRect();
    let newHeight = e.clientY - rect.top;

    // Enforce min and max height
    if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
    if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
    
    document.documentElement.style.setProperty('--container-portrait', `${newHeight}px`);
  }

  /**
   * Handles the mouseup event to end resizing.
   */
  function onMouseUp() {
    isResizing = false;
    activeContainer = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  /**
   * Handles the dblclick event to toggle the container height.
   * @param {MouseEvent} e - The dblclick event.
   */
  function onDoubleClick(e) {
    if (!shouldBeActive()) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const isClickOnHandle = e.clientY > rect.bottom - HANDLE_HEIGHT;

    if (isClickOnHandle) {
      const rootStyle = document.documentElement.style;
      const currentHeight = parseInt(rootStyle.getPropertyValue('--container-portrait') || MIN_HEIGHT);
      const targetHeight = currentHeight > MIN_HEIGHT ? MIN_HEIGHT : MAX_HEIGHT;
      
      const allContainers = document.querySelectorAll('.br_container');
      allContainers.forEach(c => c.classList.add('br_container--animated-resize'));

      rootStyle.setProperty('--container-portrait', `${targetHeight}px`);

      setTimeout(() => {
        allContainers.forEach(c => c.classList.remove('br_container--animated-resize'));
      }, ANIMATION_DURATION);
    }
  }
  
  /**
   * Resets the container height to its default if conditions are no longer met.
   */
  function resetToDefaultIfNeeded() {
    if (!shouldBeActive()) {
      document.documentElement.style.setProperty('--container-portrait', `${MIN_HEIGHT}px`);
    }
  }

  // --- Event Listener Setup ---
  const containers = document.querySelectorAll('.br_container');
  containers.forEach(container => {
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('dblclick', onDoubleClick);
  });

  const mediaQuery = window.matchMedia("(orientation: landscape) and (min-width: 1024px) and (hover: hover)");
  mediaQuery.addEventListener('change', resetToDefaultIfNeeded);
}