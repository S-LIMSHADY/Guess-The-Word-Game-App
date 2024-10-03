const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
// let score = 0;
// let highScore = localStorage.getItem("highScore") || 0;

// function updateScore(points) {
//   score += points;
//   document.querySelector(".score span").innerText = score;
// }

// function checkHighScore() {
//   if (score > highScore) {
//     highScore = score;
//     localStorage.setItem("highScore", highScore);
//     document.querySelector(".high-score span").innerText = highScore;
//   }
// }
// function initGame(e) {
//     // ...
//     if (word.includes(key)) {
//       updateScore(10); // award 10 points for correct guess
//     } else {
//       updateScore(-5); // deduct 5 points for incorrect guess
//       maxGuesses--;
//     }
//     // ...
//     if (correctLetters.length === word.length) {
//       updateScore(50); // award 50 points for solving the word
//       checkHighScore();
//       alert(`Congrats! You found the word ${word.toUpperCase()}`);
//       return randomWord();
//     }
//     // ...
//   }
  

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());