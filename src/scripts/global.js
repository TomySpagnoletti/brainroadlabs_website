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

// Initialize all animations when document is ready
// Add additional initializations below as needed
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBubble();
});