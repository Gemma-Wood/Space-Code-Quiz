const startBtn = document.getElementById("start");
const timeCount = document.getElementById("time");
const answersArray = document.getElementById("answersArray");
const submit = document.getElementById("submit");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const feedback = document.getElementById("feedback");

let timeLeft = 75;
let questionIndex = 0;
let finalScore = 0;
let timerInterval = null;

for (let i = 0; i < 4; i++) {
  answersArray.children[i].addEventListener("click", function (event) {
    if (event.target.dataset.rightAnswer === "false") {
      timeLeft = timeLeft - 10;
      timeCount.textContent = timeLeft;
      showFeedback("Wrong!");
    } else {
      showFeedback("Correct!");
    }
    if (questionIndex < allQuestions.length) {
      showQuestion();
    } else {
      showFinal();
    }
  });
}

function showFeedback(message) {
  feedback.classList.remove("hide");
  feedback.textContent = message;
  if (message === "Correct!") {
    document.getElementById("correctAudio").play();
  } else if (message === "Wrong!") {
    document.getElementById("incorrectAudio").play();
  }
}

startBtn.addEventListener("click", function () {
  //btn hide
  startBtn.style.display = "none";
  //timer starts
  setTime();
  //welcome text - dissapears
  document.getElementById("start-screen").classList.add("hide");
  //first question appears
  document.getElementById("questions").classList.remove("hide");
  showQuestion();
});

function setTime() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timeCount.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("questions").classList.add("hide");
      timeCount.parentElement.classList.add("hide");
      showFeedback("Time's up!");
      document.getElementById("incorrectAudio").play();
    }
  }, 1000);
}

function showQuestion() {
  document.getElementById("question-title").textContent =
    allQuestions[questionIndex].question;
  for (let i = 0; i < 4; i++) {
    answersArray.children[i].textContent =
      allQuestions[questionIndex].answers[i];
    if (i === allQuestions[questionIndex].correctAnswer) {
      answersArray.children[i].dataset.rightAnswer = true;
    } else {
      answersArray.children[i].dataset.rightAnswer = false;
    }
  }
  questionIndex++;
}

function showFinal() {
  document.getElementById("questions").classList.add("hide");
  clearInterval(timerInterval);
  document.getElementById("end-screen").classList.remove("hide");
  timeCount.parentElement.classList.add("hide");
  finalScore = timeLeft;
  document.getElementById("final-score").textContent = finalScore;
  submit.addEventListener("click", function () {
    highscores.push({
      score: finalScore,
      name: document.getElementById("initials").value,
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  });
}