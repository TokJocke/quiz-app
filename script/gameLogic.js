import { createElement, randomNr } from "./logic.js"

//Some global variables to keep track of things
let correctAnswer = randomNr(1, 20)
let round = 1
let gameSet = 0
let points = 0


console.log(correctAnswer)

export function rounds(roundTime, nrOfRounds) {
    let playerPick = Number(document.getElementsByClassName("playerInput")[0].value)
    let timerElement = document.getElementsByClassName("timer")[0]
    //roundCount == varje sekund RoundTime == totalTid för runda
    let roundCount = roundTime
    timerElement.innerText = roundTime
    let gameTimer = setInterval(function(){  
        roundCount -= 1
        timerElement.innerText = roundCount
        if(roundCount == 0){
            lockGuess()
            clearInterval(gameTimer);
            timerElement.innerText = "Timeout"
            console.log("rounderTimer stoped")
            if(playerChoice() == true) {
                console.log("WINNER TRUE TRUE TRUE")
                nextSetBtn(roundTime, nrOfRounds)
                givePoints()
            }
            else if(playerChoice() == false) {
                console.log(round) 
                round++
                if(round <= nrOfRounds) {
                    setTimeout(() => {
                        rounds(roundTime, nrOfRounds)
                        lockGuess()
                    }, 3000);
                }
                else {
                    nextSetBtn(roundTime, nrOfRounds)
                }
            }    
        }
    }, 1000);    
}

function playerChoice() {
    let playerChoice = Number(document.getElementsByClassName("playerInput")[0].value)
    console.log("playerChoiceFunc running")
    let highOrLowEle = document.getElementsByClassName("highOrLow")[0]
    console.log("player: ", playerChoice)
    if(playerChoice == correctAnswer) {
        highOrLowEle.innerText = "correct"
        return true
    }
    else if(playerChoice < correctAnswer) {
        highOrLowEle.innerText = "higher"
        return false
    }
    else if(playerChoice > correctAnswer) {
        highOrLowEle.innerText = "lower"
        return false
    }
}

function givePoints() {
    const pointCounter = document.getElementsByClassName("pointCounter")[0]
    if(round === 1) {
        points += 50;
    }
    else if(round === 2) {
        points += 40;
    }
    else if(round === 3) {
        points += 30;
    }
    else if(round === 4) {
        points += 20;
    }
    else if(round === 5) {
        points += 10;
    }
    pointCounter.innerText = points
}

export function gameSetAmount(nrOfRounds, roundTime, setAmount) {
    gameSet++
    roundTimer(nrOfRounds, roundTime)

    if(gameSet == setAmount) {
        console.log("finished")
    }
}

function lockGuess() {
    console.log("running lockGuess")
    const playerPick = document.getElementsByClassName("playerInput")[0]
    console.log(playerPick)
    if(!playerPick.disabled) {
        playerPick.disabled = "true"
    }
    else {
        playerPick.disabled = ""
        playerPick.value = ""
        playerPick.focus()
    }
}

function nextSetBtn(roundTime, nrOfRounds) {
    let playerDiv = document.getElementsByClassName("playerDiv")[0]
    let nextSetBtnWrap = createElement("div", "nextSetBtnWrap", playerDiv)   
    let nextSetBtn = createElement("button", "nextSetBtn", nextSetBtnWrap)
        nextSetBtn.innerText = "Next set"
        nextSetBtn.addEventListener("click", () => {
            lockGuess()
            nextSetBtnWrap.innerHTML = null
            rounds(nrOfRounds, roundTime)   
            correctAnswer = randomNr(1, 20)
            console.log("correct answer: ", correctAnswer)
         }) 
} 