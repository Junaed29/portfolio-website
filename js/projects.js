/**
 * Projects Module (projects.js)
 * 
 * WHAT THIS FILE DOES:
 * This file handles everything related to displaying your projects section.
 * It lists all your projects and creates the HTML elements to show them.
 * 
 * HOW IT WORKS:
 * 1. We create an array of project objects, each with a title and description
 * 2. The initializeProjects function creates HTML elements for each project
 * 3. When the website loads, script.js will call this function
 * 
 * WHY IT'S USEFUL:
 * - To add a new project, you just add a new object to the projectsData array
 * - All projects are created dynamically using JavaScript, not hardcoded in HTML
 * - You can easily change the appearance of all project listings by editing one function
 */

// Projects data array
// This is an array of objects, where each object represents one project
// Each project has:
// - title: The name of the project (e.g., "Chatbot")
// - description: A detailed description of what the project involved
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

/**
 * Initializes the projects section by adding project items to the DOM
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Finds the projects section in the HTML
 * 2. For each project in our projectsData array:
 *    - Creates a new div element
 *    - Adds the project's title and description
 *    - Adds the div to the projects section
 * 
 * DOM = Document Object Model (the browser's representation of your HTML)
 */
function initializeProjects() {
    // STEP 1: Find the projects section in the HTML using its ID
    // getElementById is a method to find an HTML element with a specific ID
    const projectsSection = document.getElementById('projects');
    
    // STEP 2: Only proceed if the section exists
    if (projectsSection) {
        // STEP 3: Loop through each project in the projects data array
        // forEach is an array method that runs a function for each item in the array
        projectsData.forEach(project => {
            // STEP 4: Create a div to contain the project details
            // createElement makes a new HTML element
            const projectDiv = document.createElement('div');
            // Add the project class for styling with CSS
            projectDiv.className = 'project';
            
            // STEP 5: Create heading for the project title
            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.title; // Set the heading text to the project title
            
            // STEP 6: Create a list to contain the description
            // We use a list (ul) here to allow for multiple bullet points in the future
            const descriptionList = document.createElement('ul');
            
            // STEP 7: Create a list item for the description
            const descriptionItem = document.createElement('li');
            descriptionItem.textContent = project.description; // Set the content to project description
            
            // STEP 8: Build the project structure by appending elements
            // appendChild adds one element as a child of another
            descriptionList.appendChild(descriptionItem); // Add the description item to the list
            projectDiv.appendChild(projectTitle); // Add the project title to the project div
            projectDiv.appendChild(descriptionList); // Add the description list to the project div
            
            // STEP 9: Finally, add the complete project div to the projects section
            projectsSection.appendChild(projectDiv);
        });
    }
}

// Make the function available globally so it can be called from script.js
// This allows other files to use our initializeProjects function
window.initializeProjects = initializeProjects;
