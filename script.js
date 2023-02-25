"use strict";
// ALL THIS WAS THE MODAL

//VARIABLES CONTAINING THE TEXTS THAT APPEAR IN THE MODAL
const textAboutMe = `Meet Áxel, an 18-year-old Brazilian who is passionate about technology and programming. I am fluent in both Portuguese and English, and I am interested in the tech field since a young age. My current goal is to work for a big tech company and build something important. I have a solid foundation in JavaScript, HTML, and CSS, which I used to create this website. I'm always eager to learn new programming languages and am willing to take on any challenge that comes his way.`;

const explainingTheGame = `The game is a fast-paced, thrilling competition between two players. Players take turns rolling the dice, and the number of rolls they can make is determined by luck. However, players must be strategic in their decision-making, as the outcome of their first roll will determine when their turn ends. If a player rolls a 1, they lose all the points they have accumulated and it becomes their opponent's turn. However, players can choose to "hold" their points and end their turn, keeping the points they have accumulated during that round. The game is won by the first player to reach 100 points, making it an intense race to the finish. Examples:
Player 1 starts with a roll of 4 and chooses to roll again, getting a 6. They decide to roll again and get a 3. They choose to hold their points, ending their turn with 9 points.
Player 2 starts with a roll of 6 and chooses to roll again, getting a 6 again. They lose all their points and it becomes Player 1's turn.`;

const modal = document.getElementById("modal");
const menu = document.getElementById("menu");
const buttons = document.getElementById("buttons");
const title = document.getElementById("titlesModal");
const text = document.getElementById("textsModal");
const gameAbout = document.getElementById("gameAbout");
const meAbout = document.getElementById("meAbout");
const overlay = document.querySelector(".overlay");
const closeModalX = document.getElementById("closeModalX");
const closeModalOptions = document.getElementById('closeModalOptions')

//FUNCTION TO OPEN THE MODAL
const openModal = (x) => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  if (x === "me") {
    title.textContent = "Get to know me";
    text.textContent = textAboutMe;
  } else if (x === "game") {
    title.textContent = "Roll the Dice";
    text.textContent = explainingTheGame;
  }
};

//FUNCTION TO CLOSE THE MODAL
const closeModal = () => {
  buttons.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

//FUNCTION TO CLOSE THE MODEL CLICKING "ESC" KEY
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const openButtons = () => {
  buttons.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//RUNNING THE EVENTS WHEN THE BUTTON IS CLICKED
menu.addEventListener("click", openButtons);
meAbout.addEventListener("click", () => openModal("me"));
gameAbout.addEventListener("click", () => openModal("game"));
closeModalX.addEventListener("click", closeModal);
closeModalOptions.addEventListener('click', closeModal);

//GAME CODE

//SELECTING ELEMENTS
const body = document.getElementById("body");
const btnAboutMe = document.getElementById("meAbout");
const btnAboutGame = document.getElementById("gameAbout");
const currentBox0 = document.getElementById("currentBox0");
const currentBox1 = document.getElementById("currentBox1");
const player0El = document.getElementById("player0Bg");
const player1El = document.getElementById("player1Bg");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//STARTING CONDITIONS
let scores, currentScore, activePlayer, playing;

//STYLE OF THE BOXES (CURRENT, SCORE AND BUTTONS);
const boxChanges = () => {
  if (playing) {
    menu.classList.remove("btn-about-winner");
    menu.classList.add("btn-about");
    btnAboutMe.classList.remove("btn-about-winner");
    btnAboutMe.classList.add("btn-about");
    btnAboutGame.classList.remove("btn-about-winner");
    btnAboutGame.classList.add("btn-about");
    currentBox0.classList.remove("current-winner");
    currentBox0.classList.add("current");
    currentBox1.classList.remove("current-winner");
    currentBox1.classList.add("current");
    score0El.classList.remove("score-winner");
    score0El.classList.add("score");
    score1El.classList.remove("score-winner");
    score1El.classList.add("score");
  } else {
    menu.classList.remove("btn-about");
    menu.classList.add("btn-about-winner");
    btnAboutMe.classList.remove("btn-about");
    btnAboutMe.classList.add("btn-about-winner");
    btnAboutGame.classList.remove("btn-about");
    btnAboutGame.classList.add("btn-about-winner");
    document
      .getElementById(`currentBox${activePlayer}`)
      .classList.remove("current");
    document
      .getElementById(`currentBox${activePlayer}`)
      .classList.add("current-winner");
    document.getElementById(`score--${activePlayer}`).classList.remove("score");
    document
      .getElementById(`score--${activePlayer}`)
      .classList.add("score-winner");
  }
};

//RUN STARTING CONDITIONS
const newGame = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  body.classList.remove("winner");

  boxChanges();

  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
};
newGame();

//SWITCHING PLAYER FUNCTION
const switchPlayer = () => {
  //RESETTING THE SCORE OF THE ROUND AND DO IT BEFORE CHANGING THE PLAYER IN THE CODE LINE ORDER TO DO IT IMMEDIATELY
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //IF/ELSE STATEMENT SHORT WAY: (1° CONDITION) IF ACTIVE PLAYER=0, (?) TOGGLE TO 1, (:) ELSE TOGGLE TO 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //CHANGING BACKGROUND OF THE PLAYERS TO SHOW WHOSE TURN IT IS
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//FUNCTION TO PLAY THE GAME---PUT IT OUTSIDE OF THE EVENT HANDLER BECAUSE THERE IT WAS A LOCAL FUNCTION THAT COULDN'T BE CALLED OUTSIDE OF IT'S BLOCK
function playGame() {
  if (playing) {
    //GENERATE NUMBER
    const dice = Math.trunc(Math.random() * 6) + 1;
    //SHOW THE DICE
    diceEl.classList.remove("hidden");
    boxChanges();
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

//ROLLING THE DICE
btnRoll.addEventListener("click", playGame);

document.addEventListener("keydown", function (e) {
  if (e.key === "Backspace" && modal.classList.contains("hidden")) {
    playGame();
  }
});

function holdFunction() {
  if (playing) {
    //ADDING CURRENT SCORE TO ACTIVE PLAYER SCORE
    scores[activePlayer] += currentScore;
    //SAVING THE SCORE TO THE GLOBAL SCORE
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");
      body.classList.add("winner");
      boxChanges();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
}

btnHold.addEventListener("click", holdFunction);

document.addEventListener("keydown", function (e) {
  if (e.key === "h" && modal.classList.contains("hidden")) {
    holdFunction();
  }
});

btnNew.addEventListener("click", newGame);

/*
function sumArray(x){
  let sum = 0;
  x.forEach(item => {
    sum += item;
  });
  return sum;
};

//FUNCTION THAT SHOW THE DICE ACCORDING TO THE NUMBER THAT IT GENERATES FROM 1 TO 6
function dices() {
  //GENERATE NUMBER
  const dice = Math.trunc(Math.random() * 6) + 1;
  //ADD ELEMENT TO THE ARRAY
  arrayDices.push(dice);
  //SHOW THE DICE
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;
};

//CREATING AN EMPTY ARRAY TO ADD THE NUMBER;
const arrayDices = [];
let arrayDicesRepeat = new Set();

const addCurrentScore = () => {
  //CURRENT SCORE VARIABLE
  let currentScore = 0;
  currentScore += sumArray(arrayDices[]);
  current0El.textContent = currentScore;
};*/

//MISSING: ADD MODAL TO SELECT MAX SCORE; CHANGES PLAYER WHEN FIRST NUMBER REPEATS
