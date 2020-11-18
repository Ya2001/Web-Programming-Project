// if client is on phone, switch to mobile view
var isMobile = /iphone|ipod|ipa|android|blackberry|opara mini|opera mobi|skyfire|meamo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());        
console.log(isMobile); 

if (isMobile){
    window.open("../client/mobile/landingPage.html", "_self");
}

// otherwise, we're on a computer: 
// variable to track if start or stop was last clicked
var gameIsOn;

// the start & stop buttons to control the game
var startButton = document.querySelector(".startButton");
var stopButton = document.querySelector(".stopButton");
// event listener for the startButton & stopButton: when clicked, the game will start/stop
startButton.addEventListener("click", start);
stopButton.addEventListener("click", () => gameIsOn = false);

// variables for the game
var gameWidth = 95; //vw
var gameHeight = 90; //vh
var gameWidthPx = document.getElementsByClassName("game")[0].clientWidth; // pixels
var gameHeightPx = document.getElementsByClassName("game")[0].clientHeight; // pixels
// size of 1vw in px (used in moveLeft() & moveRight())
var oneVW = document.documentElement.clientWidth / 100; // oneVW in pixels (on my machine: 13.96)

// global variable for window.setInterval: saves the intervalID from obstacles() so it can be later 
// removed in stop()
var intervalID;

// variables for the character
var character = document.getElementById("character");
var charWidth = 5; // vw
var charHeight = 5; // vw
var charSize = charWidth * charHeight;
var charWidthPx = character.clientWidth; // pixels
var charHeightPx = character.clientHeight; // pixels

// variables for the obstacle
var obstacle = document.getElementById("obstacle");
var width;
var height;
var colour;
var posX;
var circleOrRectangle;

// variables for collision detection
var collisionID; // saves the intervalID for the collision setInterval() function


/* ******************************************* window listeners *********************************************** */
/* store all key presses in an object and later check what we need
   source: https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg */
var keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}
window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

/* ******************************************* moving the character *********************************************** */
const MOVEMENT_SPEED = 10;
var positionX = parseInt(window.getComputedStyle(character).getPropertyValue("left"));


/* *************************************************** GAME LOOP ************************************************** */
// starts the game and obstacle loops
function start() {
    gameIsOn = true;
    /* start obstacle creation */
    obstacles();
    /* start the game by calling the game loop once, and then keep on calling it inside the loop */
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw(positionX);

    /* the browser performs the callback function on its own time: the browser takes care of picking a suitable fps
    (= frame per second) for the device it is running on (usually about 60fps). */
    if (gameIsOn) {
        window.requestAnimationFrame(gameLoop);
    } else {
        stop();
        window.cancelAnimationFrame(gameLoop);
    }
}

// update the variables
function update() {
    // start collision detection 
    detectCollision();
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    if (keyPresses.ArrowLeft) {
        if (left > 8) {
            positionX = left - MOVEMENT_SPEED + "px";
        }

    } else if (keyPresses.ArrowRight) {
        if (left < oneVW * (gameWidth - charWidth) - 5) {
            positionX = left + MOVEMENT_SPEED + "px";
        }
    }
}

// update the graphics
function draw(positionX) {
    character.style.left = positionX;
}


/* ********************************************** stop the game *********************************************** */
// stop the game: everything that needs to start when the stopButton is clicked
function stop() {
    // delete animation from obstacles
    obstacle.style.top = (-1) * obstacle.style.height.replace(/[^0-9]/g, '') + "vw";
    obstacle.classList.remove('obstacle-animation');

    // put player back to starting position
    character.style.left = 0;
    positionX = 0;

    // stop collision detection
    clearInterval(collisionID);
}


/* ********************************************** Obstacle creation *********************************************** */
function obstacles() {
    obstacle.classList.add('obstacle-animation'); // takes the CSS obstacle-animation and adds it to the obstacle div
    obstacle.addEventListener('animationiteration', () => {
        // change the position in every iteration
        var random = Math.floor(Math.random() * gameWidth + 1);
        width = obstacle.style.left.replace(/[^0-9]/g, ''); // the current width of the obstacle
        obstacle.style.left = random - width + "vw"; // subtract width from obstacle so it doesn't go out of the canvas

        // change the width and height in every iteration
        var randomWidth = Math.floor(Math.random() * 10 + 1) // gives you a random number from 1 to 10
        obstacle.style.width = randomWidth + "vw";
        obstacle.style.height = Math.floor(Math.random() * 20 + 1) + "vw";
    })
}

/* ********************************************** collision detection ********************************************** */
function detectCollision() {
    collisionID = setInterval(function () {
        var cLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var cRight = parseInt(window.getComputedStyle(character).getPropertyValue("right"));

        var oLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        var oRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));
        var oBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue("bottom"));
        var oWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue("width"));
        var oHeight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("width"));

        // if distance from bottom to obstacle is smaller than the character height, there is potential to collide
        if (oBottom < (charHeightPx + 1.5 * oneVW) && oBottom >= oHeight * (-1)) { // +1 is the distance the character hovers over the bottom
            if (oLeft < cLeft && oLeft + oWidth >= cLeft || oRight < cRight && oRight + oWidth >= cRight) {
                window.open("win-lose/gameOver.html", "_self");
                gameIsOn = false;
            }
        }
    }, 50);
}


// Message to print when player hits an obstacle. This depends on whether they won or lost the game//
function gameOver(message) {
    gameIsOn = false;
    setTimeout(printEndGameMessage(message, false));
}
function gameWin(message) {
    gameIsOn = false;
    setTimeout(printEndGameMessage(message, true));
}
function printEndGameMessage(message, gameWon) {
    if (gameWon) {
        alert(message);
    }
    else {
        alert("Game Over \n" + message);
    }
}