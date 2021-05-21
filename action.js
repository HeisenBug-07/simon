"use strict";
// all audios
const blue = new Audio("sounds/blue.mp3");
const green = new Audio("sounds/green.mp3");
const red = new Audio("sounds/red.mp3");
const yellow = new Audio("sounds/yellow.mp3");
const wrong = new Audio("sounds/wrong.mp3");

// array storing all audios
const sounds = [blue, green, red, yellow, wrong];

// necessary dom elements
const info = document.querySelector("h1");
const body = document.querySelector("body");
const score = document.querySelector("h2");

// necessary elements to srart game
let highScore = 0;
let startGame = false;
let level = 0;
let count = 0;
let gameSequence = [];

// function to generate sound sequence according to level
function sequenceGenerator(level) {
  let sequence = [];
  for (let i = 0; i < level; i++) {
    sequence.push(Math.floor(Math.random() * 4));
  }
  return sequence;
}

// function to play audio file
function soundPlayer(n) {
  sounds[n].play();
}

// function to play and display button according to the level
function levelSoundPlayer(sequence) {
  for (let i in sequence) {
    setTimeout(() => {
      if (startGame) {
        soundPlayer(sequence[i]);
        document.getElementById(`${sequence[i]}`).classList.add("pressed");
        setTimeout(() => {
          document.getElementById(`${sequence[i]}`).classList.remove("pressed");
        }, 100);
      }
    }, 100 * (i + 1));
  }
}

// event listner to start game by key press
document.addEventListener("keypress", () => {
  if (!startGame) {
    gameSequence = sequenceGenerator(level + 1);
    // initilizing level with level = 1
    info.innerHTML = `level ${1}`;
    startGame = true;
    // calling levelSoundPlayer to start game
    if (startGame) levelSoundPlayer(gameSequence);
  }
});

// user pressing button
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnId = btn.id;
    sounds[btnId].play();
    // if pressed button is NOT equal to sequence generated
    if (btnId != gameSequence[count]) {
      // ending game and displaying messege accordingly
      sounds[4].play();
      body.classList.add("lose");
      setTimeout(() => {
        body.classList.remove("lose");
      }, 300);
      info.innerHTML = "you lose";

      // updating high score
      if (level > highScore) highScore = level;
      score.innerHTML = `High Score : ${highScore}`;

      // resetting game
      setTimeout(() => {
        info.innerHTML = "press a KEY to start";
      }, 1000);
      startGame = false;
      count = 0;
      level = 0;
    } else count++;

    // if user generates correct sequence
    if (count === gameSequence.length && startGame) {
      // increasing and updating level
      level++;
      count = 0;
      gameSequence = sequenceGenerator(level + 1);
      startGame = true;
      // recalling levelSoundGenerator function for next level
      setTimeout(() => {
        info.innerHTML = `level ${level + 1}`;
        if (startGame) levelSoundPlayer(gameSequence);
      }, 1200);
    }
  });
});
