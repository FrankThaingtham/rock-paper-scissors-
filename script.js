function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[getRandomInt(choices.length)];
}

// ----- Game state (MUST be accessible to playRound + renderScore) -----
let humanScore = 0;
let computerScore = 0;
let gameOver = false;

// ----- DOM references -----
const scoreboard = document.querySelector("#scoreboard");
const container = document.querySelector("#container");

// ----- Render -----
function renderScore() {
  scoreboard.textContent = `Player: ${humanScore} | Computer: ${computerScore}`;
}

function endGame() {
  gameOver = true;

  if (humanScore > computerScore) {
    alert(`Game over! You win ${humanScore} to ${computerScore}.`);
  } else if (computerScore > humanScore) {
    alert(`Game over! You lose ${computerScore} to ${humanScore}.`);
  } else {
    alert(`Game over! It’s a tie at ${humanScore} to ${computerScore}.`);
  }
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;
  renderScore();
  console.log("New game started.");
}

// ----- Round logic -----
function playRound(humanChoice) {
  if (gameOver) return; // ignore clicks after game ends

  const computerChoice = getComputerChoice();
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    console.log(`Tie! Both chose ${humanChoice}.`);
    return;
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    humanScore += 1;
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
  } else {
    computerScore += 1;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
  }

  renderScore();

  // End condition (first to 5)
  if (humanScore === 5 || computerScore === 5) {
    endGame();
  }
}

// ----- Event wiring -----
container.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const playerChoice = e.target.textContent.toLowerCase();
  playRound(playerChoice);
});

// Initial render
renderScore();

// Optional: expose reset for console testing
window.resetGame = resetGame;