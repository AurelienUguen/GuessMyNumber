'use strict';

/* CONSTANT DECLARATION */
const hiddenNumberElement = document.querySelector('.number');
const guessMessage = document.querySelector('.message');
const inputElement = document.querySelector('.guess');
const backgroundElement = document.querySelector('body');
const getItem = localStorage.getItem('myScore');
const betweenElement = document.querySelector('.between');
let scoreElement = document.querySelector('.score');
let isGameFinish = false;
let highscoreElement = document.querySelector('.highscore');
let guessMax = 20;

const mode = document.querySelector('.select-mode');

/* GET HIGHSCORE FROM LOCAL STORAGE */
if (getItem) {
    highscoreElement.textContent = getItem;
}

/* GET THE SECRET NUMBER WITH RANDOM */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let secretNumber = null;

if (secretNumber === null) {
    guessMessage.textContent = "Choose difficulty";
}

/* DIFFICULTY */

function easyMode() {
    guessMax = 20;
    betweenElement.textContent = `(Between 1 and ${guessMax})`
    secretNumber = randomIntFromInterval(1, guessMax);
    console.log(secretNumber);
}

function normalMode() {
    guessMax = 50;
    betweenElement.textContent = `(Between 1 and ${guessMax})`
    secretNumber = randomIntFromInterval(1, guessMax);
    console.log(secretNumber);
}

/* SELECT DIFFICULTY */

function selectMode() {
    const difficulty = document.createElement("div");
    difficulty.classList.add("select-difficulty");
    mode.appendChild(difficulty);
}



/*  COMPARE NUMBERS FUNCTION */
function compareNumber() {
    const guess = Number(inputElement.value);

    let score = Number(scoreElement.textContent);

    let highscore = Number(highscoreElement.textContent);

    if (guess === secretNumber) {
        guessMessage.textContent = 'Well done, you guess it !';
        backgroundElement.style.backgroundColor = '#60b347';
        hiddenNumberElement.textContent = secretNumber;
        hiddenNumberElement.classList.add('bignumber');
        isGameFinish = true;
        if (score > highscore) {
            highscore = score;
            highscoreElement.textContent = highscore;
            localStorage.setItem('myScore', highscore);
        }
    } else if (guess < secretNumber) {
        guessMessage.textContent = 'Oops, you are too low !';
    } else {
        guessMessage.textContent = 'Damn, you are too high !';
    }
}

/* UPDATE SCORE FUNCTION */
function updateScore(guess) {
    let score = Number(scoreElement.textContent);

    if (guess !== secretNumber) {
        score = score - 1;
        scoreElement.textContent = score;
        if (score <= 0) {
            scoreElement.textContent = 'You lose ... Loser !';
            backgroundElement.style.backgroundColor = '#DA2528';
            hiddenNumberElement.textContent = secretNumber;
            return (isGameFinish = true);
        }
    }
}

if (easyMode()) {
    guessMax = 20;
} else if (normalMode()) {
    guessMax = 50;
}

/* ONCLICK FUNCTION */
function onButtonClick() {
    if (isGameFinish) return;

    const guess = Number(inputElement.value);

    if (isNaN(guess) || guess < 1 || guess > guessMax) {
        guessMessage.textContent = 'Please, enter a valid number !';
    }

    if (guess >= 1 && guess <= guessMax) {
        compareNumber();
    }

    updateScore(guess);
}

/* AGAIN BUTTON */
function onAgainButtonClick() {
    isGameFinish = false;
    guessMessage.textContent = "Start guessing ...";
    backgroundElement.style.backgroundColor = '#222';
    hiddenNumberElement.textContent = '?';
    scoreElement.textContent = '20';
    secretNumber = randomIntFromInterval(1, guessMax);
    console.log(secretNumber);
    inputElement.value = ' ';
    hiddenNumberElement.classList.remove('bignumber');
}

/* RESET HIGHSCORE BUTTON */
function onResetButtonClick() {
    localStorage.removeItem('myScore');
    return (highscoreElement.textContent = 0);
}