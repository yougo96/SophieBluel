// Pico.css - https://picocss.com Copyright 2019-2024 - Licensed under MIT

// Config
let visibleModal = null;

// Toggle modal
const toggleModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.dataset.target);
    if (!modal) return;
    modal && (modal.open ? closeModal(modal) : openModal(modal));
};

// Open modal
const openModal = (modal) => {    
    setTimeout(() => {
        visibleModal = modal;
      }, 10);
      modal.showModal();
};

// Close modal
const closeModal = (modal) => {
    visibleModal = null;
    modal.close();
};

// Close with a click outside
document.addEventListener("click", (event) => {
    if (visibleModal === null) return;
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && visibleModal) {
        closeModal(visibleModal);
    }
});