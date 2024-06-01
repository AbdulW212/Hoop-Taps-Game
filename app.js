// Initialize variables
let score = 0; // Current score
let hoopInterval; // Interval for generating hoops
let timeLeft = 30; // Time left in seconds
let level = 1; // Current level
let highScore = 0; // Highest score 

// Function to generate a random position for hoops
const randomPosition = () => {
    let x = Math.floor(Math.random() * 730); // Random x-coordinate within screen width
    let y = Math.floor(Math.random() * 500); // Random y-coordinate within screen height
    return { x, y };
};

// Function to create a hoop element
const createHoop = () => {
    let position = randomPosition(); // Get random position for the hoop
    let hoop = document.createElement('div'); // Create a div element for the hoop
    hoop.classList.add('hoopPic'); // Add CSS class for style
    hoop.style.left = `${position.x}px`; // Set left position
    hoop.style.top = `${position.y}px`; // Set top position

    // Add event listener for clicking on the hoop
    hoop.addEventListener('click', () => {
        score++; // Increment score
        document.getElementsByClassName('Score')[0].innerText = score; // Update score display
        hoop.remove(); // Remove the hoop when clicked
    });

    document.body.appendChild(hoop); // Add the hoop to the document body
};

// Function to stop generating hoops
const stopHoopGeneration = () => {
    clearInterval(hoopInterval); // Clear the hoop generation interval
};

// Function to update the timer display and check for game over
const updateTimer = () => {
    document.getElementById('timer').innerText = timeLeft; // Update timer display

    // Check if the time is up
    if (timeLeft === 0) {
        stopHoopGeneration(); // Stop generating hoops
        // Display final score and prompt for advancing to the next level
        const playAgain = confirm(`Your final score is: You scored ${score} points in level ${level}\nDo you want to advance to the next level?`);
        console.log(`Level ${level} complete your scored ${score}`);
        // If player chooses to advance to the next level
        if (playAgain) {
            level++; // Increment level
            score = 0; // Reset score
            timeLeft = 30; // Reset time left
            document.getElementsByClassName('Score')[0].innerText = score; // Update score display
            // Remove all existing hoops
            document.querySelectorAll('.hoopPic').forEach(hoop => hoop.remove());
            // Set interval for generating hoops based on current level
            hoopInterval = setInterval(createHoop, 500 - (level * 50));
        }
    } else {
        timeLeft--; // Decreasing time left
    }
};

// Function to display game instructions
const instructions = () => {
    try {
        alert("Welcome to the Hoop Taps Game!\n\nInstructions:\n1. Click on the hoops as they appear on the screen.\n2. Each click earns you a point. \n3. Hoops will generate faster as level increases. \n4. Try to achieve the highest score possible before the time runs out!\n\nHave Fun! Get Buckets!!");
    } catch (error) {
        console.error('Error displaying instructions:', error);
    }
};

instructions(); // Call instructions function to display game instructions

// Set interval to update timer every second
setInterval(updateTimer, 1000);
// Set interval to generate hoops every second
hoopInterval = setInterval(createHoop, 1000);