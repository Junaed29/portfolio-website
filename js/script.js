// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the recommendation form and attach submit event
    const recommendationForm = document.getElementById('recommendationForm');
    
    // Requirement 7: Add new recommendations
    // Requirement 9: Display confirmation dialog after submission
    if (recommendationForm) {
        recommendationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            // Get input values
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');
            
            if (messageInput.value.trim() !== '') {
                // Create new recommendation card
                const newRecommendation = document.createElement('div');
                newRecommendation.className = 'recommendation-card';
                
                // Create blockquote with the submitted message
                const blockquote = document.createElement('blockquote');
                blockquote.textContent = `"${messageInput.value}"`;
                
                // If name was provided, add it to the blockquote
                if (nameInput.value.trim() !== '') {
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'recommender-name';
                    nameSpan.textContent = ` - ${nameInput.value}`;
                    blockquote.appendChild(nameSpan);
                }
                
                // Append the blockquote to the new recommendation card
                newRecommendation.appendChild(blockquote);
                
                // Get recommendations container and append new recommendation
                const recommendationsContainer = document.querySelector('.recommendations-container');
                recommendationsContainer.appendChild(newRecommendation);
                
                // Reset form
                recommendationForm.reset();
                
                // Show confirmation modal
                showConfirmationModal();
            }
        });
    }
    
    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        // Initial check for scroll position
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Function to show confirmation modal after submitting recommendation
    function showConfirmationModal() {
        // Create modal elements if they don't exist
        let modal = document.getElementById('confirmationModal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'confirmationModal';
            modal.className = 'modal';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            // Add close button
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Add confirmation message
            const modalTitle = document.createElement('h3');
            modalTitle.textContent = 'Thank You!';
            
            const modalText = document.createElement('p');
            modalText.textContent = 'Your recommendation has been successfully submitted.';
            
            // Add OK button
            const okButton = document.createElement('button');
            okButton.className = 'modal-button';
            okButton.textContent = 'OK';
            okButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Append all elements to modal
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalText);
            modalContent.appendChild(okButton);
            modal.appendChild(modalContent);
            
            // Add modal to the document
            document.body.appendChild(modal);
        }
        
        // Display the modal
        modal.style.display = 'flex';
        
        // Close modal when clicking outside the content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
