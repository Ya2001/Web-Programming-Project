// the buttons
var startButton = document.querySelector(".startButton");
var stopButton = document.querySelector(".stopButton");

// the obstacle
var obstacle = document.querySelector(".obstacle");

// variable for the level (the higher, the more obstacles)
var level = 3;

// array for the colours used in the game
// used in createObstacle
var colours = ["#ffa500", "#3cb371", "#6a5acd", "#ee82ee"];


// event listener for the startButton & stopButton: when clicked, the game will start/stop
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);


// start the game: everything that needs to start when the startButton is clicked
function startGame() {
    var interval;
    switch (level) {
        case 1:
            interval = 5000; break;
        case 2:
            interval = 4000; break;
        case 3:
            interval = 3000; break;
        default:
            stopGame();
            break;
    }
    addObstacle();

    obstacleArray = document.getElementsByClassName("obstacle");
    var i;
    for (i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].classList.add("obstacle-animation");
    }
}

// stop the game: everything that needs to start when the stopButton is clicked
function stopGame() {
    obstacle.classList.remove("obstacle-animation");
}

// function to create obstacles
function addObstacle(level) {
    // random width, height, colour, posX & posY for the new obstacle
    var width = Math.floor((Math.random() * 30) + 10);
    var height = Math.floor((Math.random() * 10) + 10);
    var colour = Math.floor(Math.random() * colours.length);
    var posX = Math.floor(Math.random() * (90 - width));

    // get a random number between 1 & 100: Math.floor((Math.random() * 100) + 1);
    createObstacle(width, height, colours[colour], posX);

}

function createObstacle(width, height, colour, posX) {
    // create a new obstacle 
    var obstacle = document.createElement("div");
    obstacle.className = "obstacle";

    // size, colour of the obstacle
    obstacle.style.width = width + "vw";
    obstacle.style.height = height + "vh";
    obstacle.style.border = "5px solid " + colour;

    // start position of the obstacle
    obstacle.style.position = "absolute";
    obstacle.style.left = posX + "vw";
    obstacle.style.top = -100 + "vh";

    document.querySelector(".canvas").style.overflow = "hidden";

    // add the newly created obstacle to the canvas
    document.getElementsByClassName('canvas')[0].appendChild(obstacle);
}