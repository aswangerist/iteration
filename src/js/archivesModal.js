// Archives Modal Functionality
export function initArchivesModal() {
  // Remove any existing event listeners to prevent duplicates
  document.removeEventListener('click', handleCardClick);
  document.removeEventListener('click', handleModalClose);
  document.removeEventListener('keydown', handleEscapeKey);
  
  // Use event delegation for card clicks
  document.addEventListener('click', handleCardClick);
  
  // Use event delegation for modal close
  document.addEventListener('click', handleModalClose);
  
  // Handle escape key
  document.addEventListener('keydown', handleEscapeKey);
}

// Event handler functions
function handleCardClick(e) {
  // Check if clicked element is an aswang card or inside one
  const card = e.target.closest('.aswang-card');
  if (!card) return;
  
  e.preventDefault();
  
  const cardData = {
    image: card.dataset.image,
    title: card.dataset.title,
    description: card.dataset.description
  };

  if (cardData.image && cardData.title && cardData.description) {
    openModal(cardData);
  }
}

function handleModalClose(e) {
  // Check if clicked element is modal close button or modal background
  if (e.target.classList.contains('modal-close') || e.target.id === 'imageModal') {
    closeModal();
  }
}

function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'block') {
      closeModal();
    }
  }
}

function openModal(data) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  
  if (!modal || !modalImage || !modalTitle || !modalDescription) {
    return;
  }
  
  modalImage.src = data.image;
  modalImage.alt = data.title;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

