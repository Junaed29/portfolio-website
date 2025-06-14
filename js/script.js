// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize profile information
    initializeProfile();
    
    // Initialize projects dynamically
    initializeProjects();
    
    // Initialize skills dynamically
    initializeSkills();
   
    // Initialize existing recommendations
    initializeRecommendations();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
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
                closeModal(modal);
            });
            
            // Add confirmation message
            const modalTitle = document.createElement('h3');
            modalTitle.textContent = 'Confirm Submission';
            
            const modalText = document.createElement('p');
            modalText.textContent = 'Are you sure you want to submit this recommendation?';
            
            // Add button container for Yes/No buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            
            // Add Yes button
            const yesButton = document.createElement('button');
            yesButton.className = 'modal-button';
            yesButton.textContent = 'Yes';
            yesButton.addEventListener('click', function() {
                closeModal(modal);
                addRecommendation(name, message);
            });
            
            // Add No button
            const noButton = document.createElement('button');
            noButton.className = 'modal-button';
            noButton.style.backgroundColor = '#888';
            noButton.textContent = 'No';
            noButton.addEventListener('click', function() {
                closeModal(modal);
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
                closeModal(modal);
                addRecommendation(name, message);
            });
            
            // Add No button
            const noButton = document.createElement('button');
            noButton.className = 'modal-button';
            noButton.style.backgroundColor = '#888';
            noButton.textContent = 'No';
            noButton.addEventListener('click', function() {
                closeModal(modal);
            });
            
            buttonContainer.appendChild(yesButton);
            buttonContainer.appendChild(noButton);
        }
        
        // Display the modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
        
        // Close modal when clicking outside the content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    // Helper function to close modals with animation
    function closeModal(modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
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
                closeModal(modal);
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
                closeModal(modal);
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
        
        // Display the modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
        
        // Close modal when clicking outside the content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    // Function to add recommendation after confirmation
    function addRecommendation(name, message) {
        // Create new recommendation card
        const newRecommendation = document.createElement('div');
        newRecommendation.className = 'recommendation-card';
        // Start with animation initial state
        newRecommendation.style.opacity = '0';
        newRecommendation.style.transform = 'translateY(20px)';
        
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
        
        // Animate the new card after a brief delay
        setTimeout(() => {
            newRecommendation.style.transition = 'all 0.5s ease-out';
            newRecommendation.style.opacity = '1';
            newRecommendation.style.transform = 'translateY(0)';
        }, 50);
        
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
                // Highlight the active navigation link
                //navLinks.forEach(navLink => navLink.classList.remove('active'));
                //this.classList.add('active');
                
                // Smooth scroll with animation
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 0;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

        
    // Function to set profile image to use external link instead of local file - REMOVED
    // This functionality is now handled by profile.js
    
    // Function to initialize skills dynamically
    function initializeSkills() {
        // Skills data with integrated icon URLs
        const skillsData = [
            { 
                name: "HTML", 
                experience: "2 years experience",
                iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
            },
            { 
                name: "JavaScript", 
                experience: "1.5 years experience",
                iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            },
            { 
                name: "Java", 
                experience: ".5 years experience",
                iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
            },
            { 
                name: "React", 
                experience: "1 year experience",
                iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            },
            { 
                name: "Node.js", 
                experience: "1 year experience",
                iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            },
            { 
                name: "CSS", 
                experience: "2 years experience",
                iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            }
        ];
        
        // Get the skills container
        const skillsContainer = document.querySelector('.skills-container');
        
        // Clear any existing skill cards
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            
            // Create and append skill cards
            skillsData.forEach(skill => {
                // Create skill card
                const skillCard = document.createElement('div');
                skillCard.className = 'skill-card';
                
                // Create skill icon container
                const skillIcon = document.createElement('div');
                skillIcon.className = 'skill-icon';
                
                // Create and set up the image element
                const img = document.createElement('img');
                img.src = skill.iconUrl;
                img.alt = `${skill.name} Icon`;
                
                // Create skill name
                const skillName = document.createElement('h3');
                skillName.textContent = skill.name;
                
                // Create experience text
                const experience = document.createElement('p');
                experience.textContent = skill.experience;
                
                // Assemble the skill card
                skillIcon.appendChild(img);
                skillCard.appendChild(skillIcon);
                skillCard.appendChild(skillName);
                skillCard.appendChild(experience);
                
                // Add to the container
                skillsContainer.appendChild(skillCard);
            });
        }
    }
    
    // Function to initialize projects dynamically
    function initializeProjects() {
        // Projects data
        const projectsData = [
            {
                title: "Chatbot",
                description: "Developed a secure website integrated with chatbot for an automobile client using HTML, CSS, JavaScript and IBM Watson Assistant"
            },
            {
                title: "Sentiment Analyzer",
                description: "Developed and deployed a sentiment analyzer for the box reviews section of an eCommerce platform using IBM NLU"
            },
            {
                title: "Fashion Website",
                description: "Created a styled multi-page website for a new player in the fashion industry and integrated it with a shopping cart, using stripe for payment gateway"
            }
        ];
        
        // Get the projects section
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            // Create and append each project
            projectsData.forEach(project => {
                // Create project container
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';
                
                // Create project title
                const projectTitle = document.createElement('h3');
                projectTitle.textContent = project.title;
                
                // Create description list
                const descriptionList = document.createElement('ul');
                const descriptionItem = document.createElement('li');
                descriptionItem.textContent = project.description;
                
                // Assemble the project
                descriptionList.appendChild(descriptionItem);
                projectDiv.appendChild(projectTitle);
                projectDiv.appendChild(descriptionList);
                
                // Add to projects section
                projectsSection.appendChild(projectDiv);
            });
        }
    }
    
    // Initialize scroll animations with Intersection Observer
    function initializeScrollAnimations() {
        // Setup Intersection Observer options
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% of element is visible
        };
        
        // Observer for sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    sectionObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, options);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0'; // Start hidden
            sectionObserver.observe(section);
        });
        
        // Observer for back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            // Initial check
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            }
        }
        
        // Observer for recommendation cards (staggered animation)
        const recommendationObserver = new IntersectionObserver((entries) => {
            let delay = 0.1;
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${delay}s`;
                    delay += 0.1;
                    recommendationObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe recommendation cards
        document.querySelectorAll('.recommendation-card').forEach(card => {
            recommendationObserver.observe(card);
        });
    }
    
    // Track active section on scroll for navigation highlighting
    function trackActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const headerHeight = document.querySelector('header').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100; // Add offset for better UX
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                
                if (href === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Call all initialization functions
    //trackActiveSection();
});
