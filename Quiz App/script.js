const qusetions = [

    {
        question: "Which one is the largest animal in the world?",

        answers: [

                        {text : "Shark" , correct : false},
                        {text : "Blue Whale" , correct : true},
                        {text : "Elephant" , correct : false},
                        {text : "Giraffe" , correct : false}
        ]
    },
    {

        question: "Which one is the smallet country in the world?",

        answers: [

                        {text : "Vatican City" , correct : true},
                        {text : "Bhutan" , correct : false},
                        {text : "Nepal" , correct : false},
                        {text : "Shri Lanka" , correct : false}
        ]

    },

    {
        question: "Which one is the largest desert in the world?",

        answers: [

                        {text : "Kalahari" , correct : false},
                        {text : "Gobi" , correct : false},
                        {text : "Sahara" , correct : false},
                        {text : "Antarctica" , correct : true}
        ]
    },
    {
        question: "Which one is the smallest continent in the world?",

        answers: [

                        {text : "Asia" , correct : false},
                        {text : "Australia" , correct : true},
                        {text : "Arctic" , correct : false},
                        {text : "Africa" , correct : false}
        ]
    }

];

const questionElement   = document.getElementById("question");
const answerButton      = document.getElementById("answers-buttons");
const nextBtn           = document.getElementById("next-btn");

let currentQuestionIndex  = 0;
let score                 = 0;

function startQuiz(){

    currentQuestionIndex = 0;
    score                = 0;
    nextBtn.innerHTML    = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion        = qusetions[currentQuestionIndex];
    let questonNo              = currentQuestionIndex + 1;
    questionElement.innerHTML  = questonNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {

        const buttons     = document.createElement("button");
        buttons.innerHTML = answers.text;
        buttons.classList.add("btn");
        answerButton.appendChild(buttons);
        if(answers.correct)
            {
                buttons.dataset.correct  =answers.correct;
            }

        buttons.addEventListener("click",selectAnswer);
        
    });

}

function resetState(){

    nextBtn.style.display   = "none";
    while(answerButton.firstChild){

        answerButton.removeChild(answerButton.firstChild);

    }

}

function selectAnswer(e){

    const selectedBtn   = e.target;
    const isCorect      = selectedBtn.dataset.correct === "true";
    if(isCorect){

        selectedBtn.classList.add("correct");
        score++;

    }else
    {
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButton.children).forEach(buttons =>{

        if(buttons.dataset.correct === "true")
            {
                buttons.classList.add("correct");
            }
            buttons.disabled =true;
    });
            nextBtn.style.display  = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML   =`You Scored ${score} out of ${qusetions.length}!`
    nextBtn.innerHTML           = "Play Again";
    nextBtn.style.display       ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<qusetions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{

    if(currentQuestionIndex<qusetions.length)
        {
            handleNextButton();
        }
    else
    {
        startQuiz();
    }

});


startQuiz();