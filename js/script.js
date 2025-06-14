// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing recommendations
    initializeRecommendations();
    
    // Get the recommendation form and attach submit event
    const recommendationForm = document.getElementById('recommendationForm');
    
    // Requirement 7: Add new recommendations
    // Requirement 9: First show confirmation dialog, then display thank you message
    if (recommendationForm) {
        recommendationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            // Get input values
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');
            
            if (messageInput.value.trim() !== '') {
                // First show confirmation dialog
                showConfirmationDialog(nameInput.value, messageInput.value);
            }
        });
    }
    
    // Function to initialize existing recommendations from JS
    function initializeRecommendations() {
        // Clear existing hardcoded recommendations
        const recommendationsContainer = document.querySelector('.recommendations-container');
        recommendationsContainer.innerHTML = '';
        
        // Initial recommendation data
        const initialRecommendations = [
            {
                text: "Jane is a very quick learner and quickly grasps key concepts of Web development. She got a great attitude & she is an excellent team player. She has a curious mind and asks the right question. She takes initiative within a team and has potentials to lead the team.",
                name: "David Miller"
            },
            {
                text: "Working with Jane has been an awesome experience. She is highly knowledgeable and always goes the extra step to make sure everything is right. For any future projects that need her expertise I would definitely want to work with her again.",
                name: "Sarah Johnson"
            },
            {
                text: "I had worked along with Jane during the initial phase of our venture which needed Web development. She is a committed resource who has in depth knowledge about the domain. She will be an asset for any organisation!",
                name: "Michael Chen"
            }
        ];
        
        // Add each recommendation to the DOM
        initialRecommendations.forEach(rec => {
            // Create recommendation card
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            // Create blockquote with the message
            const blockquote = document.createElement('blockquote');
            blockquote.textContent = `"${rec.text}"`;
            
            // Add recommender name if available
            if (rec.name) {
                const nameSpan = document.createElement('span');
                nameSpan.className = 'recommender-name';
                nameSpan.textContent = ` - ${rec.name}`;
                blockquote.appendChild(nameSpan);
            }
            
            // Add to card and then to container
            card.appendChild(blockquote);
            recommendationsContainer.appendChild(card);
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
    
    // Function to show confirmation dialog before adding recommendation
    function showConfirmationDialog(name, message) {
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
            modalTitle.textContent = 'Confirm Submission';
            
            const modalText = document.createElement('p');
            modalText.textContent = 'Are you sure you want to submit this recommendation?';
            
            // Add button container for Yes/No buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'center';
            buttonContainer.style.gap = '10px';
            buttonContainer.style.marginTop = '15px';
            
            // Add Yes button
            const yesButton = document.createElement('button');
            yesButton.className = 'modal-button';
            yesButton.textContent = 'Yes';
            yesButton.addEventListener('click', function() {
                modal.style.display = 'none';
                addRecommendation(name, message);
            });
            
            // Add No button
            const noButton = document.createElement('button');
            noButton.className = 'modal-button';
            noButton.style.backgroundColor = '#888';
            noButton.textContent = 'No';
            noButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Append all elements to modal
            buttonContainer.appendChild(yesButton);
            buttonContainer.appendChild(noButton);
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalText);
            modalContent.appendChild(buttonContainer);
            modal.appendChild(modalContent);
            
            // Add modal to the document
            document.body.appendChild(modal);
        } else {
            // Update modal content if it already exists
            const modalTitle = modal.querySelector('h3');
            modalTitle.textContent = 'Confirm Submission';
            
            const modalText = modal.querySelector('p');
            modalText.textContent = 'Are you sure you want to submit this recommendation?';
            
            // Find or create button container
            let buttonContainer = modal.querySelector('.button-container');
            if (!buttonContainer) {
                buttonContainer = document.createElement('div');
                buttonContainer.className = 'button-container';
                buttonContainer.style.display = 'flex';
                buttonContainer.style.justifyContent = 'center';
                buttonContainer.style.gap = '10px';
                buttonContainer.style.marginTop = '15px';
                
                const modalContent = modal.querySelector('.modal-content');
                modalContent.appendChild(buttonContainer);
            }
            
            // Clear existing buttons
            buttonContainer.innerHTML = '';
            
            // Add Yes button
            const yesButton = document.createElement('button');
            yesButton.className = 'modal-button';
            yesButton.textContent = 'Yes';
            yesButton.addEventListener('click', function() {
                modal.style.display = 'none';
                addRecommendation(name, message);
            });
            
            // Add No button
            const noButton = document.createElement('button');
            noButton.className = 'modal-button';
            noButton.style.backgroundColor = '#888';
            noButton.textContent = 'No';
            noButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            buttonContainer.appendChild(yesButton);
            buttonContainer.appendChild(noButton);
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
    
    // Function to show thank you message after submitting recommendation
    function showThankYouModal() {
        // Create modal elements if they don't exist
        let modal = document.getElementById('thankYouModal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'thankYouModal';
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
            
            // Add thank you message
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
    
    // Function to add recommendation after confirmation
    function addRecommendation(name, message) {
        // Create new recommendation card
        const newRecommendation = document.createElement('div');
        newRecommendation.className = 'recommendation-card';
        
        // Create blockquote with the submitted message
        const blockquote = document.createElement('blockquote');
        blockquote.textContent = `"${message}"`;
        
        // If name was provided, add it to the blockquote
        if (name.trim() !== '') {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'recommender-name';
            nameSpan.textContent = ` - ${name}`;
            blockquote.appendChild(nameSpan);
        }
        
        // Append the blockquote to the new recommendation card
        newRecommendation.appendChild(blockquote);
        
        // Get recommendations container and append new recommendation
        const recommendationsContainer = document.querySelector('.recommendations-container');
        recommendationsContainer.appendChild(newRecommendation);
        
        // Reset form
        document.getElementById('recommendationForm').reset();
        
        // Show thank you modal
        showThankYouModal();
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
