const clear = document.getElementById("clear");

clear.addEventListener("click", function () {
  localStorage.removeItem("highscores");
  document.getElementById("highscores").innerHTML = "";
});

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

function printHighscores() {
  highscores.sort(function (a, b) {
    if (a.score > b.score) {
      return -1;
    } else {
      return 1;
    }
  });
  for (let i = 0; i < highscores.length; i++) {
    const li = document.createElement("li");
    li.textContent = highscores[i].name + " : " + highscores[i].score;
    document.getElementById("highscores").appendChild(li);
  }
}
printHighscores();