/**
 * Handles the logic for a site-wide image modal.
 * It finds all images with the '.zoomable-image' class and makes them clickable
 * to open in a full-screen overlay. Also handles closing via a button,
 * the escape key, or clicking on the background overlay.
 */

export function initImageModal() {
  // Set initial state for the global flag
  window.isModalOpen = false;

  const modalOverlay = document.getElementById('image-modal-overlay');
  const modalImage = document.getElementById('image-modal-content');
  const modalContainer = document.getElementById('image-modal-container');
  const closeButton = document.getElementById('image-modal-close');
  const zoomableImages = document.querySelectorAll('.zoomable-image');

  if (!modalOverlay || !modalImage || !closeButton || !modalContainer) {
    return;
  }

  function openModal(src) {
    window.isModalOpen = true;
    modalImage.setAttribute('src', src);
    modalOverlay.classList.remove('hidden');
    // Use a timeout to allow the display property to change before starting the transition
    setTimeout(() => {
      modalOverlay.classList.remove('opacity-0');
    }, 10);
    document.addEventListener('keydown', handleEscKey);
  }

  function closeModal() {
    window.isModalOpen = false;
    modalOverlay.classList.add('opacity-0');
    modalOverlay.addEventListener('transitionend', () => {
      modalOverlay.classList.add('hidden');
      modalImage.setAttribute('src', ''); // Clear src to avoid loading issues
    }, { once: true });
    document.removeEventListener('keydown', handleEscKey);
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  zoomableImages.forEach(image => {
    image.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(image.src);
    });
    // Add a cursor style to indicate it's clickable
    image.style.cursor = 'zoom-in';
  });

  closeButton.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', (e) => {
    // Close only if the container (the "empty" space) is clicked, not the image inside it.
    if (e.target === modalContainer) {
      closeModal();
    }
  });
}