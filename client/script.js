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

// global variable for window.setInterval: saves the intervalID from obstacles() so it can be later 
// removed in stop()
var intervalID;

// variables for the character
var character = document.getElementById("character");
var charWidth = 5;
var charHeight = 5;
var charSize = charWidth * charHeight;

// variables for the obstacle
var obstacle;
var width;
var height;
var colour;
var posX;
var circleOrRectangle;


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
    // size of 1vw in px (used in moveLeft() & moveRight())
    var oneVW = document.documentElement.clientWidth / 100;
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
    // collision();
}

// update the graphics
function draw(positionX) {
    character.style.left = positionX;
}


/* ********************************************** stop the game *********************************************** */
// stop the game: everything that needs to start when the stopButton is clicked
function stop() {
    // delete all the obstacles
    window.clearInterval(intervalID);
    obstacleArray = document.getElementsByClassName("obstacle");
    for (var i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].parentNode.removeChild(obstacleArray[i]);
    }

    // put player back to starting position
    character.style.left = 0;
    positionX = 0;
}


/* ********************************************** Obstacle creation *********************************************** */
function obstacles() {
    // variable for the level (the higher, the more obstacles)
    var level = 4;

    // var interval: variable for the difficulty level to control the speed of the obstacle creation
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
    // add the animation to it 
    newObstacle.classList.add("obstacle-animation");
}

// creates new obstacles
function createObstacle() {
    // array for the colours used in the game; used in createObstacle
    var colours = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"];
    // create a new div
    obstacle = document.createElement("div");
    // random width, height, colour, posX (within limits) 
    width = Math.floor((Math.random() * 30) + 10);
    height = Math.floor((Math.random() * 10) + 10);
    colour = Math.floor(Math.random() * colours.length);
    posX = Math.floor(Math.random() * (90 - width));

    // create either circle or rectangle
    circleOrRectangle = Math.floor((Math.random() * 2)); // random number between 0 and 1
    // creates a circle
    if (circleOrRectangle == 0) {
        obstacle.style.width = height + "vw";
        obstacle.style.height = height + "vw";
        obstacle.style.borderRadius = "50%";
        obstacle.style.top = "-100vh";
        // creates a rectangle
    } else {
        obstacle.style.width = width + "vw";
        obstacle.style.height = height + "vh";
        obstacle.style.top = "-100vh";
        obstacle.style.size = width * height;
    }

    // give it a colour: 
    obstacle.style.backgroundColor = "" + colours[colour];

    // get its size

    // start position of the obstacle
    obstacle.style.position = "absolute";
    obstacle.style.left = posX + "vw";

    return obstacle;
}


/* ********************************************** collision detection ********************************************** */
function collision(object1, object2) {
    // Checking if the player is colliding with a rectangle or a circle
    if (circleOrRectangle == 0) {
        return (
            //This checks to see if the x and y coordinates of object 1 are touching or overlapping 
            // the x and y coordinates of object 2 and returns a boolean value accordingly
            (object1.left + object1.size / 2) >= (object2.left - object2.size / 2) &&
            (object1.left - object1.size / 2) <= (object2.left + object2.size / 2) &&
            (object1.top + object1.size / 2) >= (object2.top - object2.size / 2) &&
            (object1.top - object1.size / 2) <= (object2.top + object2.size / 2)
        )
    }

    else {
        // Find the difference between the centre of the circle and the centre of the player character
        var distX = Math.abs(object1.left - object2.left - object2.width / 2);
        var distY = Math.abs(object1.top - object2.top - object2.height / 2);
        // Check to see if the dictance between the centres is greater that the 
        // radius of the circle + half the width of the rectangle since then they would be too far apart to touch
        if (distX >= (object2.width / 2 + object1.width / 2)) { return false };
        if (distY >= (object2.height / 2 + object1.width / 2)) { return false };
        //If the distance is less than that then we can confirm that they are definately colliding
        if (distX <= (object2.width / 2)) { return true };
        if (distY <= (object2.height / 2)) { return true };
        // We then use pythagoras theorum to compare the diztance from the centre of the rectangle
        // to the centre of the circle. If this returns true then the rectangles corner is touching the circle
        var dx = distX - object2.width / 2;
        var dy = distY - object2.heigth / 2;
        return (dx * dx + dy * dy <= (object2.width / 2) * (object2.width / 2));
    }
}

function checkCollision() {
    if (collision(obstacle, character)) {
        gameOver("You got hit")
    }
}
//Getting an error asking for a bracket when it is not necessary 

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