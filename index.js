const box = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 1. initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // 6. clear UI
  box.forEach((box, index) => {
    box.innerText = "";
    box.classList = `box box${index + 1}`;
    box.style.pointerEvents = "all"; // enable clicks
  });

  newGamebtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// 4. swap turn
function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// 5. check winner or tie
function checkGameover() {
  let answer = "";

  winningPositions.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      answer = gameGrid[position[0]];

      // disable clicks
      box.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // add win color
      box[position[0]].classList.add("win");
      box[position[1]].classList.add("win");
      box[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGamebtn.classList.add("active");
    return;
  }

  // check tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied!";
    newGamebtn.classList.add("active");
  }
}

// 3. handle box click
function handleClick(index) {
  if (gameGrid[index] === "") {
    box[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;

    checkGameover();

    // only swap if game is not over
    if (!newGamebtn.classList.contains("active")) {
      swapTurn();
    }
  }
}

// 2. add click listener
box.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// New Game button
newGamebtn.addEventListener("click", initGame);