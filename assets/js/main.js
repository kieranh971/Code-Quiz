// console.log("I'm connected");
//Array of objects. Contains contents of the quiz
var questions = [
    {
        header: "Commonly used data types DO NOT include:", // Question to be asked
        options: ["booleans", "alerts", "numbers", "strings"], // Array of choices
        correct: "alerts" // Correct Answer
    },
    {
        header: "The condition in an if/else statement is enclosed within:",
        options: ["parentheses ()", "quotes", "square brackets []", "curly brackets {}"],
        correct: "parentheses ()"
    },
    {
        header: "Arrays in Javascript can be used to store:",
        options: ["booleans", "numbers and strings", "additional arrays", "all of the above"],
        correct: "all of the above"
    },
    {
        header: "When assigned to a variable, string values must be enclosed within:",
        options: ["curly brackets", "commas", "parentheses", "quotes"],
        correct: "quotes"
    },
    {
        header: "A very useful tool for use during development and debugging for printing content to the debugger is:",
        options: ["Terminal", "Javascript", "console.log()", "if statement"],
        correct: "console.log"
    },
];

var highscore = 0; // Score Counter
var quiz = 0; // Will contain contents of quiz, leaving empty

// Global variables sections
// Grabbing contents of HTML
var mainContainer = document.querySelector("#main-container");
var timer = document.querySelector("#TimerDiv");
var QuestionsDiv = document.querySelector("#QuestionsDiv");
var startBtn = document.querySelector("#Start-Button");

// Timer and penalty for wrong questions. 10 seconds to answer each question, 5 second penalty
var secondsLeft = 51;
var penalty = 5;
var olNew = document.createElement("ol"); // Will create list out of options array

// When user clicks start quiz button, quiz will begin
startBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log("start"); // For testing purposes
    // console.log(setTime());
    setTime(); // Starts timer on click of start button
    render(quiz); // Renders quiz on click of Start button
});

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "Timer: " + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
};

// Below function renders questions and options to page
function render(quiz) {
    // Sets any existing elements to empty
    QuestionsDiv.textContent = "";
    olNew.textContent = "";
    // For loop will cycle through all info in primary array
    for (var i = 0; i < questions.length; i++){
        // Appends actual question only
        var QuizQuestion = questions[quiz].header;
        var QuizOptions = questions[quiz].options;
        QuestionsDiv.textContent = QuizQuestion;
    }
    // Creates new list of options for each question
    QuizOptions.forEach(function(newElement){
        var newLi = document.createElement("li");
        newLi.textContent = newElement;
        QuestionsDiv.appendChild(olNew);
        olNew.append(newLi);
        newLi.addEventListener("click", (validateAnswer));
    })
};
// Confirms whether or not user guessed correctly
function validateAnswer(event) {
    var element = event.target;

    if (element.matches("li")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "NewDiv");
        // If statement for correct answer
        if (element.textContent == questions[quiz].correct) {
            highscore++;
            newDiv.textContent = "Correct!";
        } else { // Else user is wrong
            secondsLeft = secondsLeft - penalty;
            newDiv.textContent = "Wrong!";
        }
    }
    // Determines which question user is looking at
    quiz++;

    if (quiz >= questions.length) {
        EndQuiz(); // Runs end quiz function after all questions have been answered
        newDiv.textContent = "End of quiz!";
    } else {
        render(quiz);
    } QuestionsDiv.appendChild(newDiv);
};

// Ends quiz, brings user to submission page
function EndQuiz() {
    QuestionsDiv.textContent = ""; // Resets this section in HTML to empty
    timer = ""; // Resets timer to empty, don't want to see this on display page
    //Creates header for submission page
    var newh1 = document.createElement("h1");
    newh1.setAttribute("id", "newh1");
    newh1.textContent = "End of quiz!";
    //Must always append a created element so it displays on the page
    QuestionsDiv.appendChild(newh1);

    var newPtag = document.createElement("p");
    newPtag.setAttribute("id", "newPtag");

    QuestionsDiv.appendChild(newPtag);

    if(secondsLeft >= 0) {
        var RemainingTime = secondsLeft;
        var newP2tag = document.createElement("p");
        clearInterval();
        newPtag.textContent = "Your final score is: " + RemainingTime;

        QuestionsDiv.appendChild(newP2tag);
    }

    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Please submit your initials: ";

    QuestionsDiv.appendChild(newLabel);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "inputEl");
    inputEl.textContent = "";

    QuestionsDiv.appendChild(inputEl);

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submit-button");
    submitBtn.textContent = "Submit";

    QuestionsDiv.appendChild(submitBtn);

    //Need a click event to store scores in local storage

    submitBtn.addEventListener("click", function(event) {
        var userInitials = inputEl.value;

        if (userInitials === null) {
            alert("Please submit your initials");
        } else {
            var score = {
                initials: userInitials,
                final: RemainingTime
            }
            // console.log(score); // Test
            var allUsers = localStorage.getItem("allUsers");
            if (allUsers === null) {
                allUsers = [];
            } else {
                allUsers = JSON.parse(allUsers);
            }
            allUsers.push(score);
            var newScore = JSON.stringify(allUsers);
            localStorage.setItem("allUsers", newScore);
            window.location.replace("./HS.html");
            }
    });
};