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
    name: "Junaed Muhammad Chowdhury",                 // Your name
    title: "iOS Developer",    // Your job title
    image: "https://media.licdn.com/dms/image/v2/D5603AQEzwsKIARqc0w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693292366940?e=1755734400&v=beta&t=6X83qdP1jLNyoRTF8DjcUxIJs1lzfLHqDoWAnSPR_pc", // Your profile picture URL
    description: "Mobile app developer with over 5 years of experience — 3 years in Android and 2+ years focused on iOS development. Skilled in Swift and SwiftUI, with a passion for crafting intuitive, high-performance iOS applications. Currently working at Beyond Innovations & Technologies Limited as an iOS Developer. Experienced in building scalable apps, integrating APIs, and delivering polished user experiences. Always exploring new ways to push mobile technology forward.", // Your bio description
    email: "junaed.dev@gmail.com",        // Your email address
    phone: "+601139714017"             // Your phone number
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
