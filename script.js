const scores = { 1: 0, 2: 0 };

function updateScoreDisplay(player) {
  const cell = document.querySelector(`.table_cell[data-player="${player}"]`);
  const scoreSpan = cell.querySelector(".score");
  scoreSpan.textContent = `Score: ${scores[player]}`;
}

function incrementScore(player, amount) {
  scores[player] += amount;
  updateScoreDisplay(player);
}

function resetScores() {
  scores[1] = 0;
  scores[2] = 0;
  updateScoreDisplay(1);
  updateScoreDisplay(2);
}

// Додавання слухачів до кнопок
document.querySelectorAll(".table_cell").forEach(cell => {
  const player = cell.getAttribute("data-player");
  cell.querySelectorAll(".actions button").forEach(btn => {
    btn.addEventListener("click", () => {
      const points = parseInt(btn.getAttribute("data-points"));
      incrementScore(player, points);
    });
  });
});

document.getElementById("resetBtn").addEventListener("click", resetScores);

// Таймер
let timeLeft = 120;
let timerInterval;

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent = formatTime(timeLeft);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function restartTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  updateTimerDisplay();
  startTimer();
}

document.getElementById("restartTimerBtn").addEventListener("click", restartTimer);

updateTimerDisplay();
startTimer();
