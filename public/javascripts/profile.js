
// Select modal and buttons
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

// Open modal
openModal.addEventListener('click', function () {
  modal.style.display = 'flex'; // Show modal (flex for centering)
  document.body.classList.add('modal-open'); // Disable background scroll
});

// Close modal
closeModal.addEventListener('click', function () {
  modal.style.display = 'none'; // Hide modal
  document.body.classList.remove('modal-open'); // Enable background scroll
});

// Close modal when clicking outside the content
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});


const showFormButton = document.getElementById('showFormButton');
const uploadFormContainer = document.getElementById('uploadFormContainer');

showFormButton.addEventListener('click', () => {
  // Toggle form visibility
  if (uploadFormContainer.style.display === 'none' || uploadFormContainer.style.display === '') {
    uploadFormContainer.style.display = 'block';
  } else {
    uploadFormContainer.style.display = 'none';
  }
});