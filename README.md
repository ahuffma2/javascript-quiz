# javascript-quiz

## Client Requirements
The client wanted a a system that would prompt users with a quiz.
The system needed to iterate through questions and penalize the user if they got a question wrong
The systems scoring is based on how fast they can complete the quiz and the remaining time left is calculated into the score.
The system needed a locally stored highscore, per page call, and a way to log your own scores and clear them if desired. 

##Code
First I created an array of objects to hold each question and the respective answers.
The object sructure is as follows:
```
let questionBank = [  
    {question: "Which of these are not a Javascript Data Type?", 
    answerList: ["Strings","Numbers","Alert","Boolean"], 
    correctAnswer: 2 },
    ... etc    
```

I then use jquery to grab respective elements of the HTML to assign respective elements to the questions in questionBank. 
This function takes an index (questionNum), and that is used to iterate when the user gets a question correct. 
```
function populateQuestion(questionNum){
    $("#q-num").text("Question " + (questionNum + 1));        //Question Header is set to read Question + question number. The +1 is to account for the array offset 
    $("#question").text(questionBank[questionNum].question); //Sets the question element to the contents of questionBank[i]
    populateAnswers(questionNum);                            
}
```

I do a similar strategy to assign answers to their respective buttons and ensure they match their questions by passing the same value as an index (questionNum).
Answers is an array of the HTML answer buttons. 
```
 //Iterates through the array of answer buttons and assigns each of them the corresponding answers according to the questionBank[] index specified
    for(var i = 0; i< answers.length; i++){
       answers[i].textContent = questionBank[questionNum].answerList[i].toString();   
    }
```

I use this function to determine which of buttons are selected, rather than instantly submitting when the button is clicked. #quz button is the id for the answer buttons. 
```
function selectAnswer(){
    $('#quiz button').on('click', function() {
        var selectedButton = $(this);
        selectedButton.addClass('active').siblings().removeClass('active');
        currentSelection = selectedButton.val();
      });
}
```

When submit is clicked , I compare the value of the selected button with the answer property of the current question bank and use that logic to determine if the question is right or wrong. From there I just choose what to do. If correct move to the next question, if incorrect subtract your time by 10 seconds. I also added logic to ensure that the quiz won't allow for displaying questions that dont exist (eg. if currentQuestion is equal to the bank.length, there are no questions left, and go to the high-score page)

```
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
```
