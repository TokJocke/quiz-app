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


                        //HUR LÅNG???



/* export function roundAmount(nrOfRounds, roundTime) {
     roundTimer(roundTime)
     winner = false
    let currentRound = document.getElementsByClassName("currentRound")[0]
    round = 1
    let delay = (roundTime + 1) * 1000 
    currentRound.innerText = "round: " + round
        let roundAmount = setInterval(() => {
            if(winner == false) {
                console.log("winner false in roundamount")
                roundTimer(roundTime)
                lockGuess()
                round++
                currentRound.innerText = "round: " + round
                if(round === nrOfRounds) {
                    clearInterval(roundAmount)
                    nextSetBtn(roundTime, nrOfRounds)
                }
            }
            else if(winner == true) {
                clearInterval(roundAmount)
                console.log("winner true")
                nextSetBtn(roundTime, nrOfRounds)
            }
    
        }, delay)
}  */



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
    if(!playerPick.disabled) {
        playerPick.disabled = "true"
    }
    else {
        playerPick.disabled = ""
    }
}



function nextSetBtn(roundTime, nrOfRounds) {
    lockGuess()
    let playerDiv = document.getElementsByClassName("playerDiv")[0]
    let nextSetBtnWrap = createElement("div", "nextSetBtnWrap", playerDiv)
    let delay = roundTime * 1000

    setTimeout(() => {
        
        let nextSetBtn = createElement("button", "nextSetBtn", nextSetBtnWrap)
        nextSetBtn.innerText = "Next set"
        nextSetBtn.addEventListener("click", () => {
            nextSetBtnWrap.innerHTML = null
            roundTimer(nrOfRounds, roundTime)   
            correctAnswer = randomNr(1, 20)
            console.log("correct answer: ", correctAnswer)
         })
        
      


    }, delay);
} 