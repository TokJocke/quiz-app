import { randomNr } from "./logic.js"

//Some global variables to keep track of things
let correctAnswer = randomNr(1, 20)
let currentGuess = 0
let currentRound = 1
let points = 0


export function playTurn() {

    currentGuess++
    roundAmount(5, 5)

/*     playerChoice()
    checkNrOfGuess() */
}

function playerChoice() {
    let playerChoice = Number(document.getElementsByClassName("playerInput")[0].value)
    let highOrLowEle = document.getElementsByClassName("highOrLow")[0]
    console.log("player: ", playerChoice)
    if(playerChoice == correctAnswer) {
        givePoints()
        currentRound++
        currentGuess = 0
        correctAnswer = randomNr(1, 20)
        console.log("correct")
    }
    else if(playerChoice < correctAnswer) {
        highOrLowEle.innerText = "higher"
    }
    else if(playerChoice > correctAnswer) {
        highOrLowEle.innerText = "lower"
    }
}


function checkNrOfGuess() {
    if(currentGuess >= 5) {
        correctAnswer = randomNr(1, 20)
        currentRound++
        currentGuess = 0
        console.log("fail, new round")
    }
}

function givePoints() {
    const pointCounter = document.getElementsByClassName("pointCounter")[0]
    if(currentGuess === 1) {
        points += 50;
    }
    else if(currentGuess === 2) {
        points += 40;
    }
    else if(currentGuess === 3) {
        points += 30;
    }
    else if(currentGuess === 4) {
        points += 20;
    }
    else if(currentGuess === 5) {
        points += 10;
    }
    pointCounter.innerText = points
}





//Sätter ny correctanswer på rad 26 när playchoice == correctanswer innan den hinner till if på rad 78

function roundTimer(roundTime) {
    let playerPick = Number(document.getElementsByClassName("playerInput")[0].value)
    let timerElement = document.getElementsByClassName("timer")[0]
    
    
    timerElement.innerText = roundTime
    
    let gameTimer = setInterval(function(){
        roundTime -= 1
        timerElement.innerText = roundTime
        if(roundTime === 0 || playerPick == correctAnswer){
            clearInterval(gameTimer);
            timerElement.innerText = ""
            console.log("rounderTimer stoped")
            lockGuess()
            playerChoice()

        }
    }, 1000);    
}



export function roundAmount(nrOfRounds, roundTime) {
    roundTimer(roundTime)
    let currentRound = document.getElementsByClassName("currentRound")[0]
    let round = 1
    let delay = (roundTime + 5) * 1000 
    currentRound.innerText = "round: " + round

    let roundAmount = setInterval(() => {
        roundTimer(roundTime)
        lockGuess()
        round++
        currentRound.innerText = "round: " + round
        if(round === nrOfRounds) {
            clearInterval(roundAmount)
            console.log("intervall cleared")
        }


    }, delay)
} 












function lockGuess() {
    const playerPick = document.getElementsByClassName("playerInput")[0]
/*     const confirmBtn = document.getElementsByClassName("confirmBtn")[0]
    console.log(confirmBtn) */
    if(!playerPick.disabled) {
        playerPick.disabled = "true"
/*         confirmBtn.style.display = "none"
 */    }
    else {
        playerPick.disabled = ""
/*         confirmBtn.style.display = "Inline-block"
 */    }
    

}