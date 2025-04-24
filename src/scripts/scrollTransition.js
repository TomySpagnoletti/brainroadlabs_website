/**
 * Handle section transitions on scroll
 */

/*

  TODO: Faire le JS pour coordonner tout ça, touch et wheel (au lieu des flêches), dans le nouveau fichier scrollTransitionV2
  TODO: Nettoyer Layout.astro

  TODO: Logo + Finir Splashscreen

  TODO: Meta SEO Layout.astro (après remplissage)
  TODO: Favicon.svg (mon logo ! :-) )

  TODO: Revoir toutes mes TODOs

  TODO: Repasser dans tous les dossiers pour contrôle

  TODO: Noter dans mes TODOs de tester sur plusieurs navigateurs
  TODO: Et sur mobile (ngrok)

  TODO: Faire ou remplir Projet Things pour tâches à venir : Social network, etc...

*/




export function initScrollTransition() {
  const containers = document.querySelectorAll('.br_container');
  if (containers.length < 2) return;
  
  // Current active section (0 = first section)
  let currentSection = 0;
  
  // Update container positions based on current section
  function updateSections() {
    containers.forEach((container, index) => {
      // Last container never moves
      if (index === containers.length - 1) {
        container.classList.remove('parked');
        return;
      }
      
      // If container is before current section, move it up
      if (index < currentSection) {
        container.classList.add('parked');
      } else {
        container.classList.remove('parked');
      }
    });
  }
  
  // Move to next or previous section
  function moveSection(direction) {
    // Calculate new section
    const newSection = currentSection + direction;
    
    // Validate bounds (allow seeing the last container)
    if (newSection < 0 || newSection >= containers.length) return;
    
    // Update current section
    currentSection = newSection;
    
    // Update display
    updateSections();
  }
  
  // Intelligent wheel gesture detection
  let currentGestureId = 0;        // Unique ID for each detected gesture
  let lastDirection = 0;           // Last detected direction
  let previousMagnitude = 0;       // Previous magnitude reading
  let magnitudeTrend = 'none';     // Trend of the magnitude (decreasing, increasing, none)
  let isFirstReading = true;       // Whether this is the first reading
  let wasDecreasing = false;       // Track if the magnitude was previously decreasing
  let gestureActive = false;       // Track if we're in an active gesture
  
  document.addEventListener('wheel', (event) => {
    // Prevent default scrolling
    event.preventDefault();
    
    // Only consider vertical movement (deltaY)
    const deltaY = event.deltaY;
    const direction = deltaY > 0 ? 1 : -1;
    const currentMagnitude = Math.abs(deltaY);
    
    // Handle first reading specially
    if (isFirstReading) {
      magnitudeTrend = 'none';
      isFirstReading = false;
      gestureActive = true;
    } else {
      // Determine if magnitude is increasing or decreasing
      if (currentMagnitude > previousMagnitude) {
        // It's increasing
        magnitudeTrend = 'increasing';
        
        // If it was decreasing before, and now increasing, this signals possible new gesture
        if (wasDecreasing) {
          wasDecreasing = false;
          // Only consider as new gesture if we were already in a gesture
          if (gestureActive) {
            // Now it's a new gesture
            gestureActive = false;
          }
        }
      } else {
        // It's decreasing or same
        magnitudeTrend = 'decreasing';
        wasDecreasing = true;
      }
    }
    
    // Log for debugging
    console.log(`Magnitude: ${currentMagnitude.toFixed(2)}, Prev: ${previousMagnitude.toFixed(2)}, Trend: ${magnitudeTrend}, Active: ${gestureActive}, WasDecreasing: ${wasDecreasing}`);
    
    // Detect a new gesture
    let isNewGesture = false;
    
    // Case 1: Direction changed
    if (direction !== lastDirection && lastDirection !== 0) {
      isNewGesture = true;
    }
    // Case 2: Magnitude was decreasing but now increased (new gesture)
    // Only trigger a new gesture if the trend is increasing AND we're not in an active gesture
    else if (magnitudeTrend === 'increasing' && !gestureActive) {
      isNewGesture = true;
    }
    
    // Process new gestures
    if (isNewGesture) {
      currentGestureId++;
      console.log(`Gesture #${currentGestureId}: direction=${direction}, deltaY=${deltaY.toFixed(2)}`);
      
      // Move the section
      moveSection(direction);
      
      // Mark that we're now in an active gesture
      gestureActive = true;
    }
    
    // Update tracking variables
    lastDirection = direction;
    previousMagnitude = currentMagnitude;
  }, { passive: false });
  
  // Handle touch
  let touchStartY = 0;
  let totalY = 0;
  
  document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
    totalY = 0;
  }, { passive: true });
  
  document.addEventListener('touchmove', (event) => {
    const currentY = event.touches[0].clientY;
    totalY += (touchStartY - currentY);
    touchStartY = currentY;
  }, { passive: true });
  
  document.addEventListener('touchend', () => {
    // Skip if movement too small
    if (Math.abs(totalY) < 20) return;
    
    const direction = totalY > 0 ? 1 : -1;
    moveSection(direction);
  }, { passive: true });
  
  // Handle window resize
  window.addEventListener('resize', updateSections);
}