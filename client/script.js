// IDEA: when the game starts, obstacles are created (random size, colour & y-position) at a certain time interval
// depending on the difficulty level the players are on
// obstacles movement: css animation: .obstacle-animation class is added to every newly created obstacle

// the start & stop buttons to control the game
var startButton = document.querySelector(".startButton");
var stopButton = document.querySelector(".stopButton");
// event listener for the startButton & stopButton: when clicked, the game will start/stop
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

// variable for the level (the higher, the more obstacles)
var level = 4;

// array for the colours used in the game
// used in createObstacle
var colours = ["#ffa500", "#3cb371", "#6a5acd", "#ee82ee"];

// global variable for window.setInterval: saves the intervalID from startGame() so it can be later 
// removed in stopGame()
var intervalID;


// stop the game: everything that needs to start when the stopButton is clicked
function stopGame() {
    var i;
    obstacleArray = document.getElementsByClassName("obstacle");
    for (i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].parentNode.removeChild(obstacleArray[i]);
    }
    window.clearInterval(intervalID);
}

// start the game: everything that needs to start when the startButton is clicked
// var interval: variable for the difficulty level to control the speed of the obstacle creation
function startGame() {
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

function addObstacle() {
    //create a new obstacle
    createObstacle();

    // add the CSS animation to every obstacle that is created
    obstacleArray = document.getElementsByClassName("obstacle");
    var i;
    for (i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].classList.add("obstacle-animation");
    }
}

// creates new obstacles
function createObstacle() {
    // random width, height, colour, posX (within limits) 
    var width = Math.floor((Math.random() * 30) + 10);
    var height = Math.floor((Math.random() * 10) + 10);
    var colour = Math.floor(Math.random() * colours.length);
    var posX = Math.floor(Math.random() * (90 - width));

    var obstacle = document.createElement("div");
    obstacle.className = "obstacle";

    // size, colour of the obstacle
    obstacle.style.width = width + "vw";
    obstacle.style.height = height + "vh";
    obstacle.style.border = "5px solid " + colours[colour];

    // start position of the obstacle
    obstacle.style.position = "absolute";
    obstacle.style.left = posX + "vw";
    obstacle.style.top = -100 + "vh";

    // add the newly created obstacle to the canvas
    document.getElementsByClassName('canvas')[0].appendChild(obstacle);
}