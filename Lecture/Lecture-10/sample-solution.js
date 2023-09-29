// Flag to determine if the mouse button is currently pressed down
let mousePressedDown = false;

// Add an event listener for the 'mouseover' event on the button
btn.addEventListener('mouseover', () => {
    // Add the 'hover' class to the button when mouse is over it
    btn.classList.add('hover');
    // If the mouse is pressed down and hovering over the button, add the 'active' class
    if(mousePressedDown) {
        btn.classList.add('active');
    }
});

// Add an event listener for the 'mouseout' event on the button
btn.addEventListener('mouseout', () => {
    // Remove the 'hover' class when mouse is no longer hovering over the button
    btn.classList.remove('hover');
    // If the mouse was pressed down when leaving the button, remove the 'active' class
    if(mousePressedDown) {
        btn.classList.remove('active');
    }
});

// Add an event listener for the 'mousedown' event on the button
btn.addEventListener('mousedown', () => {
    // Add the 'active' class when the mouse button is pressed down on the button
    btn.classList.add('active');
    // Set the flag to true indicating that the mouse button is pressed down
    mousePressedDown = true;
});

// Add an event listener for the 'mouseup' event on the window
window.addEventListener('mouseup', () => {
    // Remove the 'active' class when the mouse button is released
    btn.classList.remove('active');
    // If the button was clicked while the mouse button was pressed down, call the 'flashClicked' function
    if(mousePressedDown) {
        flashClicked(btn);
    }
    // Reset the flag to false indicating that the mouse button is no longer pressed down
    mousePressedDown = false;
});
