// console.log("I'm connected"); // Separate js page for highscores. Makes for cleaner code
//Retrieving HTML elements
var highScores = document.querySelector("#highscores");
var returnBtn = document.querySelector("#Return");
var wipe = document.querySelector("#clear-hs");
//Clears highscores from board and local storage
wipe.addEventListener("click", function(event){
    localStorage.clear();
    location.reload();
});

//Below variable takes info stored in local storage from the main.js file and makes it available here
var userScores = localStorage.getItem("allUsers");
userScores = JSON.parse(userScores);
//Below if statement creates a for loop that appends user scores to a list for the high score board
if (userScores !== null) {
    for (var i=0; i < userScores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = userScores[i].initials + " " + userScores[i].final;
        highScores.appendChild(newLi);
    }
}
//Below button returns user to the start of the quiz
returnBtn.addEventListener("click", function(event){
    window.location.replace("./index.html")
})