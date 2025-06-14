/**
 * Profile Module (profile.js)
 * 
 * WHAT THIS FILE DOES:
 * This file holds all your personal information in one place. By keeping all your
 * personal information in one object (profileData), you can easily update everything
 * on your website just by changing values here.
 * 
 * HOW IT WORKS:
 * 1. We create a single object (profileData) with all your information
 * 2. We create a function (initializeProfile) to add this information to the webpage
 * 3. When the website loads, script.js will call this function
 * 
 * WHY IT'S USEFUL:
 * - All your personal info is in one place
 * - You don't need to hunt through HTML files to update your information
 * - Makes it easy to update the website with your new details
 */

// Profile data object - Single source of truth for all profile information
// This object contains all your personal information in one place
const profileData = {
    name: "Jane Doe",                 // Your name
    title: "Full Stack Developer",    // Your job title
    image: "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png", // Your profile picture URL
    description: "I am a full stack developer with 2 years of experience in both application and presentation layers. I have worked on applications and microservices deployed on IBM Cloud. I am an avid user of IBM Watson Services and have worked on Watson Assistant, NLU, Sentiment analyzer to name a few.", // Your bio description
    email: "jdoe@jeemail.com",        // Your email address
    phone: "+13456764598"             // Your phone number
    // Note: Social links removed as they're not currently used in the UI
    // Add them back when implementing social icons in the future
};

/**
 * Function to initialize profile information
 * 
 * This function:
 * 1. Updates the document title with your name
 * 2. Fills in your name and contact information in the header
 * 3. Sets your profile picture in the About section
 * 4. Adds your bio information to the About section
 */
function initializeProfile() {
    // Update document title - This is what appears on the browser tab
    document.title = `Portfolio - ${profileData.name}`;
    
    // Update header information
    // querySelector finds HTML elements by their CSS selectors
    document.querySelector('header h1').textContent = profileData.name;  // Adds your name to the header
    document.querySelector('.contact-info p:nth-child(1)').innerHTML = `<i class="fas fa-envelope"></i> ${profileData.email}`; // Adds your email
    document.querySelector('.contact-info p:nth-child(2)').innerHTML = `<i class="fas fa-phone"></i> ${profileData.phone}`; // Adds your phone number
    
    // Update profile section
    // Find the profile image element
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.src = profileData.image;  // Set the image source to your profile picture
        profileImage.alt = `${profileData.name} Profile`;  // Set alt text for accessibility
    }
    
    // Update profile content
    // Find the heading element in the profile section
    const profileHeading = document.querySelector('.profile-content h2');
    if (profileHeading) {
        // Set the heading with your name and a waving emoji
        profileHeading.innerHTML = `Hi, I'm ${profileData.name}! <span class="wave-emoji">👋</span>`;
    }
    
    // Find the paragraph element for your description
    const profileDescription = document.querySelector('.profile-content p');
    if (profileDescription) {
        profileDescription.textContent = profileData.description;  // Add your bio text
    }
}

// Make the function available globally so it can be called from script.js
// The window object represents the browser window
window.initializeProfile = initializeProfile;
