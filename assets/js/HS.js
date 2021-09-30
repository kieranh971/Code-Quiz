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

var userScores = localStorage.getItem("allUsers");
userScores = JSON.parse(userScores);

if (userScores !== null) {
    for (var i=0; i < userScores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = userScores[i].initials + " " + userScores[i].final;
        highScores.appendChild(newLi);
    }
}

returnBtn.addEventListener("click", function(event){
    window.location.replace("./index.html")
})