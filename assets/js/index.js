//TODO
//LOCAL STORE THE HIGH SCORE
//ADD TO LIST  //THIS NEEDS MOST RESEARCH
//REFACTOR goToHighscore()


//An array of objects each containing a 
//Question, List of Answers, and a Correct Answer
let questionBank = [  
    {question: "Which of these are not a Javascript Data Type?", 
    answerList: ["Strings","Numbers","Alert","Boolean"], 
    correctAnswer: 2 },
    
    {question: "What is hoisting in Javascript?", 
    answerList:["When you unfurl a sail.","When you lift something","When you loop through a method to iterate through it", "The unique behaviour where all variables and function declarations are moved to the top"], 
    correctAnswer: 3 },

    {question: "What does the '===' operator do?", 
    answerList:["It checks whether its two operands are equal, and returns a boolean, checking to make sure both operands are of the same type and value", "Assigns a value to a variable and makes that variable unchangeable", "Checks to see if both operands are equal to each other", "Changes both values to the same value"], 
    correctAnswer: 0 },

    {question: "What type of variable is only visible inside the function it is declared in", 
    answerList: ["Global Variable","Local Variable","Both of the above","None of the above"], 
    correctAnswer: 1 },

    {question: "Which of the following is a ternary operator", 
    answerList: [":","=","-","?"], 
    correctAnswer: 3 }
];

//These variables are used to track which answer the users has picked and what question the quiz is on
var currentSelection;
var timeLeft; 
var currentQuestion = 0;
var score = localStorage.getItem(score); 


//Counts down and iterates the progress bar accordingly
function countdown(){
var timer = setInterval(function(){
    $('.progress-bar').css({'width': (timeLeft*2) + '%'}).text('Time Left: ' + timeLeft + "s");
    timeLeft--;

    if(timeLeft <= 0)
    {
        goToHighScore();
    }
 },1000);
}

/*This function takes an index that represent which question and answers you want to use from questionBank[]
When done calls the populateAnswers to populate the corresponding answers*/
function populateQuestion(questionNum){
    $("#q-num").text("Question " + (questionNum + 1));        //Question Header is set to read Question + question number. The +1 is to account for the array offset 
    $("#question").text(questionBank[questionNum].question); //Sets the question element to the contents of questionBank[i]
    populateAnswers(questionNum);                            
}

//This function populates answers to the buttons
function populateAnswers(questionNum){

    //Each of the answer button elements
    let answers = [ 
        answer1 = document.getElementById("answer-1"),
        answer2 = document.getElementById("answer-2"),
        answer3 = document.getElementById("answer-3"),
        answer4 = document.getElementById("answer-4"),
       ];

    //ensures that there is a question to match the questionNum 
    if(questionBank[questionNum] == null )
    {
        alert("There are not enough questions");
        answers[i].textContent = "Answer " + ((i+1).toString()); //assigns html with default values if there is no question
        return;
    }
    else 
    //Iterates through the array of answer buttons and assigns each of them the corresponding answers according to the questionBank[] index specified
    for(var i = 0; i< answers.length; i++){
       answers[i].textContent = questionBank[questionNum].answerList[i].toString();   
    }
}

//Targets answer buttons, activates the selected button and logs the value as currentSelection. 
function selectAnswer(){
    $('#quiz button').on('click', function() {
        var selectedButton = $(this);

        selectedButton.addClass('active').siblings().removeClass('active');
        currentSelection = selectedButton.val();
        console.log("you currently have button number " + currentSelection + " selected");
      });
}

//Compares the selectedButton value to the correct answer stored in the questionBank
//Based if the value matches, it moves to the next question or it removes time from the timer
function submitAnswer() {
$('#submit').on('click',function(){
       
    //IF CORRECT
    if(currentSelection == questionBank[currentQuestion].correctAnswer)
    {
        console.log("You got it right!");
        currentQuestion++;

        //AS LONG AS THERE ARE QUESTIONS, ITERATE IF USER IS CORRECT, ELSE GO TO HIGH SCORE TO END THE GAME
        if(currentQuestion < questionBank.length)
            populateQuestion(currentQuestion);
        else
            goToHighScore();
    }
    //IF INCORRECT
    else {
        console.log("You got it wrong! :C");
        timeLeft -= 10;
    }
       
});
}

//Handles buttons that involve the high score page
function highScoreBtns(){

    //TAKES TO HIGHSCORE PAGE
    $('#highscore-btn').on('click',function(){
        goToHighScore();
    })

    //RELOADS PAGE TO PLAY AGAIN
    $('.reset').on('click',function(){
        document.location.reload();
        init();
    });

    //CLEARS LOCAL STORAGE
    $('.clear-score').on('click',function(){
        localStorage.clear();
        console.log("I cleared the storage");
    });
}

//Clears the screen of the quiz UI and Shows the Highscore UI
//Halts the timer and logs the score and stores to local storage.
function goToHighScore(){

    countdown.timer = clearInterval(countdown.timer);
    $('.quiz-holder').hide();
    $('.quiz-header').hide();
    $('.highscore-holder').show();

    score = timeLeft;
    localStorage.setItem("score", score);

    //sends to highscore page.
    console.log("Go to High-score Page");

}

//Nothing is called until init.
function init(){

    //manages various html elements
    $('.quiz-holder').hide();
    $('.highscore-holder').hide(); 

    //on click of the start button, show quiz UI and start the countdown
    $('#start-button').on('click',function(){
        $('.quiz-header').hide();
        $('#start-button').hide();
        $('.quiz-holder').show();
        timeLeft = 50;
        countdown();
    });

    populateQuestion(0);
    selectAnswer();
    submitAnswer();
    highScoreBtns();

}

init();
