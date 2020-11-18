// go full screen button
var goFS = document.getElementById("goFS"); 

// landing page content 
var landing = document.getElementsByClassName("landing"); 



goFS.addEventListener("click", function(){
    // go fullscreen
    document.body.requestFullscreen(); 
    // hide landing content

}); 

// login register button 
var login = document.getElementById("login"); 

login.addEventListener("click", hideLanding)

function hideLanding(){
    document.getElementsByClassName("landing").style.visibility = "hidden"; 
} 