# Portfolio Website

A professional portfolio website showcasing skills, projects, and recommendations.

## Features

1. Styled name at the top-left of the page
2. Navigation bar with 4 options (About, Skills, Projects, and Recommendations) with hover effects
3. "About Me" section with profile image, name, and summary
4. Skills section with logos and experience information
5. Projects section with descriptions
6. Recommendations section with existing testimonials
7. Ability to add new recommendations to the existing list
8. Back-to-top button (Home icon)
9. Confirmation dialog after submitting a recommendation

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- SVG icons

## Usage

Simply open the `index.html` file in a web browser to view the portfolio website.

## Structure

- `index.html`: Main HTML document
- `css/styles.css`: Stylesheet for the website
- `js/script.js`: JavaScript for interactive features
- `images/`: Directory containing all image assets

## Responsive Design

The website is fully responsive and works well on desktop, tablet, and mobile devices.

## Adding New Content

### Projects
To add new projects, edit the `projectsData` array in the `script.js` file by adding a new project object with `title` and `description` properties.

### Skills
To add new skills, edit the `skillsData` array in the `script.js` file by adding a new skill object with `name`, `experience`, and `iconUrl` properties.
