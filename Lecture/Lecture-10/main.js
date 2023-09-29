const btn = document.querySelector('.custom-button'); // btn is our "fake" button
let mousePressed = false;
// Write your code here
// Add a class of "hover" to the button when the mouse is over it
//      Hint: Use the mouseover and mouseout events
btn.addEventListener('mouseover', ()=> {
    btn.classList.add('hover');
    if(mousePressed){
        btn.classList.add('active')
    }

});
btn.addEventListener('mouseout', ()=> {
    btn.classList.remove('hover')
    if(mousePressed){
        btn.classList.remove('active');
    }
});

// Add a class of "active" to the button when the user presses the mouse down on it
// If the user's mouse is released while it is over the button, "flash" the button by calling flashClicked(btn)
//      Hint: Use the mousedown and mouseup events
btn.addEventListener('mousedown', ()=> {
    btn.classList.add('active');
    mousePressed = true;
});
btn.addEventListener('mouseup', ()=> {
    btn.classList.remove('active');
    mousePressed = false;
    flashClicked(btn);
});

//btn.addEventListener('mouseup', ()=> {
  //  flashClicked(btn);
//});

// If the user's mouse leaves the button while the mouse is pressed down, remove the "active" class
// If the user's mouse comes back over the button while the mouse is **still** pressed down, add the "active" class
//     Hint: Use the mouseout and mouseover events (again)
//     Hint: You will need to use a variable to keep track of whether the mouse is pressed down or not



/**
 * Call this function when you want to "flash" the button --- when it is clicked
 * 
 * @param {*} element The element that we want to "flash"
 */
function flashClicked(element) {
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 300);
}

// Give the "real" button a flash effect
const realButton = document.querySelector('button');
realButton.addEventListener('click', () => {
    flashClicked(realButton);
});