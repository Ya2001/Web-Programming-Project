// go full screen button 
var goFS = document.getElementById("goFS");

// landing page content 
var landing = document.getElementsByClassName("landing");



goFS.addEventListener("click", function () {
    // start game
    window.open("mobileIndex.html", '_self');

});

// login register button 
var login = document.getElementById("login");

login.addEventListener("click", hideLanding)

function hideLanding() {
    document.getElementsByClassName("landing").style.visibility = "hidden";
} 
