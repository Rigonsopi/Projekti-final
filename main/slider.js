const imageTrack = document.getElementById('image-track');

// Track dragging behavior
let isMouseDown = false;
let startX;
let scrollLeft;

// Mouse down event
imageTrack.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - imageTrack.offsetLeft;
    scrollLeft = imageTrack.scrollLeft;
});

// Mouse move event
imageTrack.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return; // If not dragging, return
    e.preventDefault();
    const x = e.pageX - imageTrack.offsetLeft;
    const walk = (x - startX) * 2; // 2x speed of dragging
    imageTrack.scrollLeft = scrollLeft - walk;
});

// Mouse up event
imageTrack.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Mouse leave event
imageTrack.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

// Dynamic image interaction (change title and description when clicked)
const imageItems = document.querySelectorAll('.image-item');

imageItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Update the title and description dynamically
        const title = item.querySelector('h2');
        const description = item.querySelector('p');
        
        // Set the new title and description based on the image clicked
        title.textContent = `New Title for Image ${index + 1}`;
        description.textContent = `This is a new description for Image ${index + 1}. You can customize this text to provide more details.`;
    });
});

// Scroll effect (optional: smooth scroll if needed)
imageTrack.style.scrollBehavior = 'smooth';
