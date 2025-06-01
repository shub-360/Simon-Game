
// DEfining the game variables
let buttonColors = ['top-left-red', 'top-right-green', 'bottom-left-yellow', 'bottom-right-blue'];
let GamePatternOrder = [];
let userClickedPattern = [];
let turn = 0;
let win;
let gameActive = false;

// Definig the dom element 
const start = document.querySelector("#start-button");

const gameBoardSquares = document.querySelectorAll(".game-board-square");
const levelTitle = document.querySelector(".counter-label");


// Add event listener to the start button
start.addEventListener('click', () => {
    if (!gameActive) {
        start.classList.add('active');
        gameActive = true;
        nextSequence();
    }
    else {
        start.classList.remove('active');
        gameActive = false;
        startOver();
    }
});


// Start the game with the first sequence
gameBoardSquares.forEach((square) => {
    square.addEventListener("click", (event) => {
        if (!gameActive) return;// Prevent interaction if the game is not active
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);

        flashSquare(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);

    });
});

function checkAnswer(currentLevel) {
    console.log("Current Level: " + currentLevel);
    // Check if the user clicked pattern matches the game pattern
    if (GamePatternOrder[currentLevel] === userClickedPattern[currentLevel]) {
        // If the user has completed the sequence
        if (userClickedPattern.length === GamePatternOrder.length) {
            // Check for win condition
            if (turn === 20) {
                win = true;
                levelTitle.textContent = "You Win!";
                return;
            }
            // Proceed to next sequence after a short delay
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        // If the user clicked pattern is incorrect
        playSound("wrong");
        levelTitle.textContent = "NO!!";
        gameActive = false; // ✅ Stop input on wrong answer
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    turn++;
    levelTitle.textContent = `${turn}`;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoosenColor = buttonColors[randomNumber];
    console.log(randomChoosenColor);
    // flash the square
    flashSquare(randomChoosenColor); 

    playSound(randomChoosenColor);
    GamePatternOrder.push(randomChoosenColor);

     gameActive = true; // ✅ Allow input after pattern is shown
}

// 🔁 Flash animation
function flashSquare(id) {
    const square = document.getElementById(id);
    square.classList.add('active');
    //   set time for the flash animation
    setTimeout(() => square.classList.remove('active'), 400);
    
}
// Play sound 
function playSound(id) {
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}

// Start button functionality
function startOver() {
  turn = 0;
  GamePatternOrder = [];
  userClickedPattern = [];
  gameActive = false;
  start.classList.remove('active');
}