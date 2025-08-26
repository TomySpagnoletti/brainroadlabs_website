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
  const prevButton = document.getElementById('image-modal-prev');
  const nextButton = document.getElementById('image-modal-next');
  const zoomableImages = document.querySelectorAll('.zoomable-image');

  let currentGallery = [];
  let currentIndex = -1;

  if (!modalOverlay || !modalImage || !closeButton || !modalContainer || !prevButton || !nextButton) {
    return;
  }

  function showImage(index) {
    if (index < 0 || index >= currentGallery.length) {
      return;
    }
    currentIndex = index;
    modalImage.setAttribute('src', currentGallery[currentIndex].src);

    // Update button visibility
    prevButton.classList.toggle('hidden', currentIndex === 0);
    nextButton.classList.toggle('hidden', currentIndex === currentGallery.length - 1);
  }

  function openModal(clickedImage) {
    const galleryContainer = clickedImage.parentElement;
    if (galleryContainer) {
      currentGallery = Array.from(galleryContainer.querySelectorAll('.zoomable-image'));
      currentIndex = currentGallery.findIndex(img => img === clickedImage);
    } else {
      // Fallback if the image is not in a container
      currentGallery = [clickedImage];
      currentIndex = 0;
    }
    
    // Hide buttons if there's only one image
    if (currentGallery.length <= 1) {
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
    }

    window.isModalOpen = true;
    modalOverlay.classList.remove('hidden');
    setTimeout(() => {
      modalOverlay.classList.remove('opacity-0');
    }, 10);
    document.addEventListener('keydown', handleKeyPress);
    showImage(currentIndex);
  }

  function closeModal() {
    window.isModalOpen = false;
    modalOverlay.classList.add('opacity-0');
    modalOverlay.addEventListener('transitionend', () => {
      modalOverlay.classList.add('hidden');
      modalImage.setAttribute('src', ''); // Clear src to avoid loading issues
    }, { once: true });
    document.removeEventListener('keydown', handleKeyPress);
    // Reset gallery
    currentGallery = [];
    currentIndex = -1;
  }

  function showNextImage() {
    if (currentIndex < currentGallery.length - 1) {
      showImage(currentIndex + 1);
    }
  }

  function showPrevImage() {
    if (currentIndex > 0) {
      showImage(currentIndex - 1);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
    if (event.key === 'ArrowRight') {
      showNextImage();
    }
    if (event.key === 'ArrowLeft') {
      showPrevImage();
    }
  }

  zoomableImages.forEach(image => {
    image.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(image);
    });
    // Add a cursor style to indicate it's clickable
    image.style.cursor = 'zoom-in';
  });

  closeButton.addEventListener('click', closeModal);
  prevButton.addEventListener('click', showPrevImage);
  nextButton.addEventListener('click', showNextImage);

  modalContainer.addEventListener('click', (e) => {
    // Close only if the container (the "empty" space) is clicked, not the image or buttons.
    if (e.target === modalContainer) {
      closeModal();
    }
  });
}