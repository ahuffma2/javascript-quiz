
//These are the four answer buttons in the html
let answers = [ 
 answer1 = document.getElementById("answer-1"),
 answer2 = document.getElementById("answer-2"),
 answer3 = document.getElementById("answer-3"),
 answer4 = document.getElementById("answer-4"),
];

//An array of objects each containing a 
//Question, List of Answers, and a Correct Answer
let questionBank = [  
    {question: "Which of these are not a Javascript Data Type?", answerList: ["Strings","Numbers","Alert","Boolean"], correctAnswer: 2 },
    {question: "What is hoisting in Javascript?", answerList:["When you unfurl a sail.","When you lift something","When you loop through a method to iterate through it", "The unique behaviour where all variables and function declarations are moved to the top"], correctAnswer: 3},
    {question: "What does the '===' operator do?", answerList:["It checks whether its two operands are equal, and returns a boolean, checking to make sure both operands are of the same type and value", "Assigns a value to a variable and makes that variable unchangeable", "Checks to see if both operands are equal to each other", "Changes both values to the same value"], correctAnswer: 0},
    {question: "Question 4", answerList: ["A1","A2","A3","A4"], correctAnswer: 2}

];

//These variables are used to track which answer the users has picked and what question the quiz is on
var currentSelection; 
var currentQuestion = 0;

function populateQuestion(questionNum){


    console.log();
}

//This function populates answers to the buttons
function populateAnswers(questionNum){

    //ensures that there is a question to match the questionNum 
    if(questionBank[questionNum] == null )
    {
        alert("There are not enough questions");
        answers[i].textContent = "Answer " + ((i+1).toString()); //populates as a default for answer 1 - 4
        return;
    }
    else 
    //Iterates through the array of answer buttons and assigns each of them the corresponding answers according to the Question Bank
    for(var i = 0; i< answers.length; i++){
       answers[i].textContent = questionBank[questionNum].answerList[i].toString();   
    }
    return;
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
       
    if(currentSelection == questionBank[currentQuestion].correctAnswer)
    {
        console.log("You got it right!");
        //MOVE TO NEXT QUESTION
    }
    else {
        console.log("You got it wrong! :C");
        //DECREASE TIMER BY 10
    }
       
});
}


function goToHighScore(){}



//Nothing is called until init.
function init(){
    populateQuestion(0);
    populateAnswers(0);
    selectAnswer();
    submitAnswer();
}

init();