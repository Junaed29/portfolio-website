// Profile data object
const profileData = {
    name: "Jane Doe",
    title: "Full Stack Developer",
    image: "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
    description: "I am a full stack developer with 2 years of experience in both application and presentation layers. I have worked on applications and microservices deployed on IBM Cloud. I am an avid user of IBM Watson Services and have worked on Watson Assistant, NLU, Sentiment analyzer to name a few.",
    email: "jdoe@jeemail.com",
    phone: "+13456764598",
    social: {
        linkedin: "https://linkedin.com/in/janedoe",
        github: "https://github.com/janedoe",
        twitter: "https://twitter.com/janedoe"
    }
};

// Function to initialize profile information
function initializeProfile() {
    // Update header information
    document.querySelector('header h1').textContent = profileData.name;
    document.querySelector('.contact-info p:nth-child(1)').innerHTML = `<i class="fas fa-envelope"></i> ${profileData.email}`;
    document.querySelector('.contact-info p:nth-child(2)').innerHTML = `<i class="fas fa-phone"></i> ${profileData.phone}`;
    
    // Update profile section
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.src = profileData.image;
        profileImage.alt = `${profileData.name} Profile`;
    }
    
    // Update profile content
    const profileHeading = document.querySelector('.profile-content h2');
    if (profileHeading) {
        // Clear any existing content and set the heading with wave emoji
        profileHeading.innerHTML = `Hi, I'm ${profileData.name}! <span class="wave-emoji">👋</span>`;
    }
    
    const profileDescription = document.querySelector('.profile-content p');
    if (profileDescription) {
        profileDescription.textContent = profileData.description;
    }
}

// Make the function available globally
window.initializeProfile = initializeProfile;
