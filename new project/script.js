// DOM Elements
const mainElement = document.querySelector('main');

// Initialize project
document.addEventListener('DOMContentLoaded', () => {
    console.log('Project loaded successfully!');
    
    // Add any initialization code here
});

// Example function
function handleClick(event) {
    console.log('Clicked:', event.target);
}

// Add event listeners
mainElement.addEventListener('click', handleClick);
