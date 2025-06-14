/**
 * Skills Module (skills.js)
 * 
 * WHAT THIS FILE DOES:
 * This file handles everything related to displaying your skills section.
 * It contains a list of your skills and creates nice-looking cards to show them.
 * 
 * HOW IT WORKS:
 * 1. We create an array of skill objects, each with a name, experience level, and icon
 * 2. The initializeSkills function creates HTML elements for each skill
 * 3. When the website loads, script.js will call this function
 * 
 * WHY IT'S USEFUL:
 * - To add a new skill, you just add a new object to the skillsData array
 * - All skills are created dynamically using JavaScript, not hardcoded in HTML
 * - You can easily change the appearance of all skill cards by editing one function
 */

// Skills data with integrated icon URLs
// This is an array of objects, where each object represents one skill
// Each skill has:
// - name: The name of the skill (e.g., "HTML")
// - experience: Description of experience level (e.g., "2 years experience")
// - iconUrl: URL to the skill's icon image
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

/**
 * Initializes the skills section by adding skill cards to the DOM
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Finds the skills container in the HTML
 * 2. Clears any existing content in the container
 * 3. For each skill in our skillsData array:
 *    - Creates a new card element
 *    - Adds the skill's icon, name, and experience level
 *    - Adds the card to the skills container
 * 
 * DOM = Document Object Model (the browser's representation of your HTML)
 */
function initializeSkills() {
    // STEP 1: Find the skills container element in the HTML
    // querySelector searches the HTML document for elements matching a CSS selector
    const skillsContainer = document.querySelector('.skills-container');
    
    // STEP 2: Only proceed if the container exists
    if (skillsContainer) {
        // Clear any existing skill cards (important when refreshing or updating)
        skillsContainer.innerHTML = '';
        
        // STEP 3: Loop through each skill in the skills data array
        // forEach is an array method that runs a function for each item in the array
        skillsData.forEach(skill => {
            // STEP 4: Create a new div element for the skill card
            // createElement makes a new HTML element
            const skillCard = document.createElement('div');
            // Add the skill-card class for styling
            skillCard.className = 'skill-card';
            
            // STEP 5: Create a container for the skill icon
            const skillIcon = document.createElement('div');
            skillIcon.className = 'skill-icon';
            
            // STEP 6: Create an image element for the skill icon
            const img = document.createElement('img');
            img.src = skill.iconUrl;  // Set the image source
            img.alt = `${skill.name} Icon`;  // Set alt text for accessibility
            
            // STEP 7: Create heading for the skill name
            const skillName = document.createElement('h3');
            skillName.textContent = skill.name;
            
            // STEP 8: Create paragraph for the experience level
            const experience = document.createElement('p');
            experience.textContent = skill.experience;
            
            // STEP 9: Build the skill card structure by appending elements
            // appendChild adds one element as a child of another
            skillIcon.appendChild(img);  // Add the image to the icon container
            skillCard.appendChild(skillIcon);  // Add the icon container to the card
            skillCard.appendChild(skillName);  // Add the skill name to the card
            skillCard.appendChild(experience);  // Add the experience text to the card
            
            // STEP 10: Finally, add the complete skill card to the skills container
            skillsContainer.appendChild(skillCard);
        });
    }
}

// Make the function available globally so it can be called from script.js
// This allows other files to use our initializeSkills function
window.initializeSkills = initializeSkills;
