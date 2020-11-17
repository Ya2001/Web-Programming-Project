// Play Again button
var playAgain = document.querySelector(".playAgain");

// scoreboard button 
var scoreboard = document.querySelector(".scoreboard");

// if play again is pressed
playAgain.addEventListener("click", gotoIndex);


// function to go back to index.html
function gotoIndex() {
    window.open("../index.html", "_self");
}
