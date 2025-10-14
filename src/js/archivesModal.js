// Archives Modal Functionality
export function initArchivesModal() {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalClose = document.querySelector('.modal-close');
  const aswangCards = document.querySelectorAll('.aswang-card');

  if (!modal || !modalImage || !modalTitle || !modalDescription) {
    return; // Not on archives page
  }

  // Add click event to each aswang card
  aswangCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e || !e.target) return;
      
      const cardData = {
        image: this.dataset.image,
        title: this.dataset.title,
        description: this.dataset.description
      };

      if (cardData.image && cardData.title && cardData.description) {
        openModal(cardData);
      }
    });
  });

  // Close modal when clicking X
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

  function openModal(data) {
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}