const questions = [
  {
    question: "Which is largest animal in the world ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest continent in the world ?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is largest desert in the world ?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is smallest country in the world ?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
];

const questionEle = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQueInd = 0;
let score = 0;

function startQuiz() {
  currentQueInd = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQueInd];
  let questionNo = currentQueInd + 1;
  questionEle.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach(button =>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = 'block';
}
function showScore(){
    resetState();
    questionEle.innerHTML = `Your Score ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextBtn(){
currentQueInd++;
if(currentQueInd < questions.length){
    showQuestion();
}else{
    showScore();
}
}

nextBtn.addEventListener('click',()=>{
    if(currentQueInd < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();
