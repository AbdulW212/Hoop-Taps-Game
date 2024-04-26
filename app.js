let score = 0;
let hoopInterval;
let timeLeft = 30;
let level = 1; 
let highScore = 0; 

const randomPosition = () => {
    let x = Math.floor(Math.random() * 730);
    let y = Math.floor(Math.random() * 500);
   


    return { x, y};
};

const createHoop = () => {
    let position = randomPosition();
    let hoop = document.createElement('div');
    hoop.classList.add('hoopPic');
    hoop.style.left = `${position.x}px`;
    hoop.style.top = `${position.y}px`;

    hoop.addEventListener('click', () => {
        score++;
        document.getElementsByClassName('Score')[0].innerText = score;
        hoop.remove();
    });

    document.body.appendChild(hoop);
};

const stopHoopGeneration = () => {
    clearInterval(hoopInterval);
};

const updateTimer = () => {
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft === 0) {
        stopHoopGeneration();
        const playAgain = confirm(`Your final score is: You scored ${score} points in level ${level}\nDo you want to advance to the next level?`);
        console.log(`Level ${level} complete your scored ${score}`);
        if (playAgain) {
            level++;
            score = 0;
            timeLeft = 30 ; 
            document.getElementsByClassName('Score')[0].innerText = score;
            document.querySelectorAll('.hoopPic').forEach(hoop => hoop.remove());
            hoopInterval = setInterval(createHoop, 500 - (level * 50));
        }
    } else {
        timeLeft--;
    }
};

const instructions = () => {
    try {
        alert("Welcome to the Hoop Taps Game!\n\nInstructions:\n1. Click on the hoops as they appear on the screen.\n2. Each click earns you a point. \n3.Hoops will generate faster as level increases. \n4. Try to achieve the highest score possible before the time runs out!\n\nHave Fun! Get Buckets!!");
    } catch (error) {
        console.error('Error displaying instructions:', error);
    }
};

instructions();

setInterval(updateTimer, 1000);
hoopInterval = setInterval(createHoop, 1000);