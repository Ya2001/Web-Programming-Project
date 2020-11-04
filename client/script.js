// IDEA: when the game starts, obstacles are created (random size, colour & y-position) at a certain time interval
// depending on the difficulty level the players are on


// obstacles movement: css animation: .obstacle-animation class is added to every newly created obstacle
console.log(document.documentElement.clientWidth);
// the start & stop buttons to control the game
var startButton = document.querySelector(".startButton");
var stopButton = document.querySelector(".stopButton");
// event listener for the startButton & stopButton: when clicked, the game will start/stop
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

// variables for the game
var gameWidth = 95; //vw
var gameHeight = 90; //vh

// variable for the level (the higher, the more obstacles)
var level = 4;
// global variable for window.setInterval: saves the intervalID from startGame() so it can be later 
// removed in stopGame()
var intervalID;

// array for the colours used in the game; used in createObstacle
var colours = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"];

// variables used for the player/character
var character = document.getElementById("character");
var interval;
var both = 0;
// grabs the player width & height from the style.css :root{}
var charWidth = 5;
// size of 1vw in px (used in moveLeft() & moveRight())
var oneVW = document.documentElement.clientWidth / 100;
// displaying the name of the player
var playerName = document.getElementById('playerName');

// to check if the start button was pressed
var gameIsOn = false;

// stop the game: everything that needs to start when the stopButton is clicked
function stopGame() {
    gameIsOn = false;
    obstacleArray = document.getElementsByClassName("obstacle");
    for (var i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].parentNode.removeChild(obstacleArray[i]);
    }
    window.clearInterval(intervalID);

    // put player back to starting position
    character.style.left = 1;
    character.style.transform = 'rotate(0deg)';
    playerName.style.left = 1;
}

// start the game: everything that needs to start when the startButton is clicked
// var interval: variable for the difficulty level to control the speed of the obstacle creation

function startGame() {
    gameIsOn = true;
    var interval;
    switch (level) {
        case 1:
            interval = 5000; break;
        case 2:
            interval = 4000; break;
        case 3:
            interval = 3000; break;
        case 4:
            interval = 2000; break;
        case 5:
            interval = 1000; break;
        default:
            stopGame();
            break;
    }

    // add obstacles at the correct speed (according to difficulty)
    intervalID = window.setInterval(function () {
        addObstacle();
    }, interval);
}

// adding the created obstacles
function addObstacle() {
    // create a new obstacle
    var newObstacle = createObstacle();
    // add the newly created obstacle to the game
    document.getElementsByClassName('game')[0].appendChild(newObstacle);
    console.log(newObstacle);
    // add the animation to it 
    newObstacle.classList.add("obstacle-animation");
}

// creates new obstacles
function createObstacle() {
    // create a new div
    var obstacle = document.createElement("div");
    // random width, height, colour, posX (within limits) 
    var width = Math.floor((Math.random() * 30) + 10);
    var height = Math.floor((Math.random() * 10) + 10);
    var colour = Math.floor(Math.random() * colours.length);
    var posX = Math.floor(Math.random() * (90 - width));
    // create either circle or rectangle
    var circleOrRectangle = Math.floor((Math.random() * 2)); // random number between 0 and 1
    if (circleOrRectangle == 0) {
        console.log("in circle");
        // create a circle
        obstacle.style.width = height + "vw";
        obstacle.style.height = height + "vw";
        obstacle.style.borderRadius = "50%";
        obstacle.style.top = height * (-1) + "vh";
    } else {
        // create a rectangle
        obstacle.style.width = width + "vw";
        obstacle.style.height = height + "vh";
        obstacle.style.top = height * (-1) + "vh";
    }

    // give it a colour: 
    obstacle.style.backgroundColor = "" + colours[colour];

    // start position of the obstacle
    obstacle.style.position = "absolute";
    obstacle.style.left = posX + "vw";

    return obstacle;
}
// Message to print when player hits an obstacle. This depends on whether they won or lost the game//
function gameOver(message){
    gameIsOn = false;
    setTimeout(printEndGameMessage(message, false));
}
function gameWin(message){
    gameIsOn = false;
    setTimeout(printEndGameMessage(message, true));
}
function printEndGameMessage(message, gameWon){
    if(gameWon){
        alert(message);
    }
    else{
        alert("Game Over \n" + message);
    }
        

}






/* player movement */
function moveLeft() {
    // the distance from the leftmost point of the screen to the rightmost point of the character
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    // while this distance != 0, the character can still move left
    if (left > 0) {
        // move the character 10 pixels to the left
        character.style.left = left - 10 + "px";
        // rotate the character's legs to the left
        character.style.transform = "rotate(180deg)";
        // moving the display of the player name
        playerName.style.left = left - 10 + "px";
    }
}
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    // while this distance is not bigger than gamewidth - charwidth, character can still move right
    if (left < oneVW * (gameWidth - charWidth)) {  // == game width - char width
        // move the character 10 pixels to the right
        character.style.left = left + 10 + "px";
        // rotate the character gif to the right
        character.style.transform = "rotate(0deg)";
        // moving the display of the player name
        playerName.style.left = left + 10 + "px";
    }
}
document.addEventListener('keydown', (event) => {
    // if the start key has been pressed
    if (gameIsOn) {
        switch (event.key) {
            // if the left arrow is pressed, move left
            case 'ArrowLeft': moveLeft();
                break;
            // if the right arrow is pressed, move right
            case 'ArrowRight': moveRight();
                break;
        }
    }
});