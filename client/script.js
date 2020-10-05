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
var lblue = window.getComputedStyle(document.documentElement).getPropertyValue('--accent-colour-lblue');
var blue = window.getComputedStyle(document.documentElement).getPropertyValue('--accent-colour-blue');
var dblue = window.getComputedStyle(document.documentElement).getPropertyValue('--accent-colour-dblue');
var yellow = window.getComputedStyle(document.documentElement).getPropertyValue('--accent-colour-yellow');
var orange = window.getComputedStyle(document.documentElement).getPropertyValue('--accent-colour-orange');
var colours = [lblue, blue, dblue, yellow, orange];


// width & height of canvas 
// can't grab them from css since they're saved as strings there 
var canvasWidth = 98; //vw
var canvasHeight = 90; //vh


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
    createPoliticans();

    // add the CSS animation to every obstacle that is created
    obstacleArray = document.getElementsByClassName("obstacle");
    var i;
    for (i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].classList.add("obstacle-animation");
    }
}
function createPoliticans() {
    var width = Math.floor((Math.random() * 30) + 10);
    var colour = Math.floor(Math.random() * colours.length);
    var posX = Math.floor(Math.random() * (canvasWidth - width));

    var politician = document.createElement("div");
    politician.className = "obstacle";

    politician.style.width = width + "vw";
    politician.style.height = width + "vw";
    politician.style.borderRadius = "50%";
    politician.style.backgroundColor = colours[colour];
    console.log(colours[colour]);

    politician.style.position = "absolute";
    politician.style.left = posX + "vw";
    politician.style.top = -100 + "vh";

    document.getElementsByClassName('canvas')[0].appendChild(politician);
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