/**
 * Animations and UI Module (animations.js)
 * 
 * WHAT THIS FILE DOES:
 * This file handles all the visual effects and user interactions that make the website feel alive.
 * It includes:
 * 1. Scroll animations (making sections fade in as you scroll)
 * 2. Navigation highlighting (showing which section you're currently viewing)
 * 3. Smooth scrolling (making clicking navigation links scroll smoothly)
 * 4. Back-to-top button functionality (letting you easily return to the top of the page)
 * 
 * HOW IT WORKS:
 * We use JavaScript to detect when you scroll or click, and then make changes to the HTML elements
 * to create smooth animations and improve user experience.
 * 
 * IMPORTANT CONCEPTS:
 * - Intersection Observer: A browser API that tells us when elements are visible on the screen
 * - Event Listeners: Functions that wait for specific actions (like clicks or scrolling)
 * - DOM Manipulation: Changing the HTML elements using JavaScript
 */

/**
 * Initializes all scroll-based animations
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Sets up Intersection Observer to detect when elements come into view
 * 2. Applies fade-in animations to sections when they become visible
 * 3. Handles staggered animations for recommendation cards (they fade in one after another)
 * 4. Sets up the back-to-top button visibility
 */
function initializeScrollAnimations() {
    // STEP 1: Setup Intersection Observer options
    // This determines when animations will trigger based on visibility
    const options = {
        root: null,        // Use the viewport (visible screen) as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.15    // Trigger when 15% of element is visible
    };
    
    // STEP 2: Create an observer for animating sections
    // The Intersection Observer watches elements and tells us when they become visible
    const sectionObserver = new IntersectionObserver((entries) => {
        // Process each section that intersects with the viewport
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When a section becomes visible, add the 'visible' class to start the animation
                entry.target.classList.add('visible');
                // Stop observing after animation is triggered (so it only animates once)
                sectionObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    // STEP 3: Apply the observer to all sections
    // Find all section elements and set them up for animation
    document.querySelectorAll('section').forEach(section => {
        // Start with opacity 0 to prepare for fade-in animation
        section.style.opacity = '0';
        // Start observing this section
        sectionObserver.observe(section);
    });
    
    // STEP 4: Setup the back-to-top button
    setupBackToTopButton();
    
    // STEP 5: Setup staggered animations for recommendation cards
    setupRecommendationCardAnimations(options);
}

/**
 * Sets up the back-to-top button functionality
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Finds the back-to-top button in the HTML
 * 2. Shows the button when you scroll down the page
 * 3. Hides the button when you're near the top
 * 4. Makes the button scroll to the top when clicked
 */
function setupBackToTopButton() {
    // STEP 1: Find the back-to-top button in the HTML
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // STEP 2: Only proceed if the button exists
    if (backToTopBtn) {
        // STEP 3: Add a scroll event listener to show/hide the button
        // This function runs every time the user scrolls the page
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                // If scrolled down more than 300 pixels, show the button
                backToTopBtn.classList.add('visible');
            } else {
                // If near the top, hide the button
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // STEP 4: Initial check for page load (in case page is already scrolled)
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        }
        
        // STEP 5: Add click event to scroll to top when button is clicked
        backToTopBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            window.scrollTo({
                top: 0,             // Scroll to the top of the page
                behavior: 'smooth'  // Use smooth scrolling animation
            });
        });
    }
}

/**
 * Sets up staggered animations for recommendation cards
 * 
 * @param {Object} options - Intersection Observer options
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Creates an Intersection Observer for recommendation cards
 * 2. Applies staggered animation delays to each card (they appear one after another)
 * 3. This creates a nice "cascade" effect as you scroll to the recommendations section
 */
function setupRecommendationCardAnimations(options) {
    // STEP 1: Create an observer for recommendation cards
    const recommendationObserver = new IntersectionObserver((entries) => {
        // Start with a small delay for the first card
        let delay = 0.1;
        
        // STEP 2: Process each recommendation card that intersects with the viewport
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set a staggered delay for each card
                // This makes them animate one after another instead of all at once
                entry.target.style.animationDelay = `${delay}s`;
                // Increase delay for next card (adds 0.1 seconds per card)
                delay += 0.1;
                // Only animate once per page load
                recommendationObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    // STEP 3: Apply the observer to all recommendation cards
    document.querySelectorAll('.recommendation-card').forEach(card => {
        recommendationObserver.observe(card);
    });
}

/**
 * Tracks which section is currently in the viewport
 * and updates the navigation highlighting accordingly
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Listens to scroll events on the page
 * 2. Determines which section is currently in view
 * 3. Updates the active class on the corresponding navigation link
 * 4. This helps users know which section they're currently viewing
 */
function trackActiveSection() {
    // STEP 1: Get all sections from the page
    const sections = document.querySelectorAll('section');
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // STEP 2: Add scroll event listener
    // This function runs every time the user scrolls the page
    window.addEventListener('scroll', () => {
        // Will store the ID of the current active section
        let current = '';
        // Get header height to account for sticky header
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // STEP 3: Check each section's position
        sections.forEach(section => {
            // Calculate position accounting for header offset and extra margin
            // This ensures the highlight changes at the right time
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionHeight = section.offsetHeight;
            
            // STEP 4: If we've scrolled past the start of this section
            if (window.pageYOffset >= sectionTop) {
                // Set this as the current section
                current = section.getAttribute('id');
            }
        });
        
        // STEP 5: Update active class on navigation links
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            // Get the target section ID from the href attribute
            // (substring(1) removes the # character from the href)
            const href = link.getAttribute('href').substring(1);
            
            // STEP 6: If this link points to the current section
            if (href === current) {
                // Add the active class to highlight it
                link.classList.add('active');
            }
        });
    });
}

/**
 * Sets up navigation links for smooth scrolling
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Finds all navigation links in the header
 * 2. Adds click event listeners to each link
 * 3. When a link is clicked, it smoothly scrolls to that section
 * 4. It also updates the active navigation link
 * 5. This creates a much better user experience than standard jumping
 */
function setupNavigationLinks() {
    // STEP 1: Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // STEP 2: Add click event listeners to each link
    // This runs whenever a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // STEP 3: Prevent default link behavior
            // This stops the browser from jumping to the section instantly
            event.preventDefault();
            
            // STEP 4: Get the target section ID from the href attribute
            // (substring(1) removes the # character from the href)
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // STEP 5: Only proceed if the target section exists
            if (targetSection) {
                // STEP 6: Highlight the active navigation link
                // First remove active class from all links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                // Then add active class to the clicked link
                this.classList.add('active');
                
                // STEP 7: Smooth scroll to the target section
                // Using native scrollIntoView with smooth behavior
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Smooth animation rather than jumping
                });
            }
        });
    });
}

// Make the functions available globally so they can be called from other scripts
window.initializeScrollAnimations = initializeScrollAnimations;
window.trackActiveSection = trackActiveSection;
window.setupNavigationLinks = setupNavigationLinks;
