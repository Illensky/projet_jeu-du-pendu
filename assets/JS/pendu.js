const words = [
    "test",
    "apocalypse",
    "dictionnaire",
    "pendu",
    "jeu",
    "yahourt",
    "chien",
    "chat",
    "anticonstitutionnellement",
    "anaconda",
    "foret",
    "france",
    "italie",
    "fourmies",
    "paris",
    "tasse",
    "pizza",
    "kebab",
    "friterie",
    "catholique",
    "église",
]

const validButton = document.querySelector("#valid");
const retryButton = document.querySelector("#retry");
const hanged = document.querySelector("#hanged");
const game = document.querySelector("#game");
const info = document.querySelector("#info");
const looseOrWin = document.querySelector("#looseOrWin");
const input = document.querySelector("#input");
const tryedLetter = document.querySelector("#tryedLetter");

let actualWord;
let error = 1;
let goodLetter = 2;
let goodLetterGiven = [];
let wrongLetterGiven = [];

function getRandomWord() {
    const random = Math.floor(Math.random() * words.length)
    actualWord = words[random]
    return actualWord
}

function displayWord(word) {
    let idNumber = 0;
    game.innerHTML = ""
    for (const letter of word) {
        let letterDiv = document.createElement("div");
        letterDiv.type = "text";
        letterDiv.innerHTML = letter.toUpperCase();
        letterDiv.classList.add("letter");
        letterDiv.id = idNumber.toString();
        idNumber++;
        game.appendChild(letterDiv);
    }
    const letters = document.querySelectorAll(".letter")
    for (let i = 1; i < letters.length - 1; i++) {
        letters[i].innerHTML = "";
    }
}

function check() {
    info.innerHTML = ""
    if (actualWord.includes(input.value.toLowerCase()) && input.value.length === 1 && !goodLetterGiven.includes(input.value.toUpperCase())) {
        goodLetterGiven.push(input.value.toUpperCase())
        for (let i = 1; i < actualWord.length-1; i++) {
            if (input.value.toLowerCase() === actualWord[i]) {
                document.getElementById(i.toString()).innerHTML = actualWord[i].toUpperCase();
                tryedLetter.innerHTML = "Lettres déjà proposée : " + goodLetterGiven.join(", ") + ", " + wrongLetterGiven.join(", ")
                goodLetter++;
                if (goodLetter >= actualWord.length) {
                    win();
                    return;
                }
            }
        }
    }
    else if (goodLetterGiven.includes(input.value.toUpperCase()) || wrongLetterGiven.includes(input.value.toUpperCase())){
        info.innerHTML = "Vous avez déjà essayer cette lettre"
    }
    else {
        error++;
        hanged.src = "assets/img/" + error.toString() +".jpg"
        info.innerHTML = "La lettre " + input.value.toUpperCase() + " n'est pas dans le mot."
        wrongLetterGiven.push(input.value.toUpperCase())
        tryedLetter.innerHTML = "Lettres déjà proposée : " + wrongLetterGiven.join(", ") + ", " + goodLetterGiven.join(", ")
        if (error === 8) {
            loose();
        }
    }
}

function win() {
    validButton.style.display = "none";
    retryButton.style.display = "inline";
    looseOrWin.innerHTML = "C'est gagner !";
}

function loose() {
    validButton.style.display = "none";
    retryButton.style.display = "inline";
    info.innerHTML = ""
    looseOrWin.innerHTML = "C'est perdu !<br> Le mot était " + actualWord + ".";
}

function retry() {
    looseOrWin.innerHTML = "";
    retryButton.style.display = "none";
    validButton.style.display = "inline";
    error = 1;
    goodLetter = 2;
    goodLetterGiven = [];
    wrongLetterGiven = [];
    hanged.src = "assets/img/1.jpg"
    tryedLetter.innerHTML = ""
    displayWord(getRandomWord())
}

displayWord(getRandomWord())

validButton.addEventListener("click", check);
retryButton.addEventListener("click", retry)