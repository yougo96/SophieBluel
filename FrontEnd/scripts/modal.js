// Toggle modal
function toggleModal (event) {
    event.preventDefault()
    const modal = document.getElementById(event.currentTarget.dataset.target)
    if (!modal) return
    modal && (modal.open ? modal.close() : modal.showModal());
};

// Step manager
function goToStep(step) {
    document.querySelectorAll(`dialog article`).forEach((elem) => {
        elem.classList.toggle("d-none", true)
    })
    if (step) document.querySelector(`dialog [step="${step}"]`).classList.toggle("d-none", false)
}