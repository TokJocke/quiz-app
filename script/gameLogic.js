import { createElement, randomNr, makeReq, removeElementById } from "./logic.js"
import { botGuess, checkGuess } from "./bot.js"
import { createResultsPage } from "./main.js"

//Some global variables to keep track of things
let correctAnswer = randomNr(1, 20)
let round = 1
let gameSet = 3
let points = 0

console.log(correctAnswer)

export function rounds(nrOfRounds, roundTime) {
    let playerPick = Number(document.getElementsByClassName("playerInput")[0].value)
    let timerElement = document.getElementsByClassName("timer")[0]
    let setCounter = document.getElementsByClassName("setCounter")[0]
    let currentRoundEle = document.getElementsByClassName("currentRound")[0]
    //roundCount == varje sekund RoundTime == totalTid för runda
    let roundCount = roundTime
    timerElement.innerText = "Time left: " + roundTime
    setCounter.innerText = "Current set: " + gameSet
    currentRoundEle.innerText = "Round: " + round
    gameSet = 3
    points = 0

    let gameTimer = setInterval(function(){  
        roundCount -= 1
        currentRoundEle.innerText = "Round: " + round
        timerElement.innerText = "Time left: " + roundCount
        setCounter.innerText = "Current set: " + gameSet
        if(roundCount == 0){
            lockGuess()
            clearInterval(gameTimer);
            timerElement.innerText = "Timeout"
            console.log("rounderTimer stoped")
            if(playerChoice() == true) {
                console.log("WINNER TRUE TRUE TRUE", round)
                nextSetBtn(roundTime, nrOfRounds)
                givePoints()
                gameEnd()
                gameSet++
                round = 1
            }
            else if(playerChoice() == false) {
                botGuess(correctAnswer)
                round++

                // Check if bot guess = correct
                if(checkGuess(correctAnswer) == true) {
                    console.log("BOT WINNER TRUE TRUE TRUE", round)
                    nextSetBtn(roundTime, nrOfRounds)
                    gameEnd()
                    gameSet++
                    round = 1
                }
                else if(round <= nrOfRounds) {
                    setTimeout(() => {
                        rounds(roundTime, nrOfRounds)
                        lockGuess()
                    }, 9000);
                }
                else {
                    nextSetBtn(roundTime, nrOfRounds)
                    gameEnd()
                    gameSet++
                    round = 1
                }
            }    
        }
    }, 1000);    
}

function playerChoice() {
    let playerChoice = Number(document.getElementsByClassName("playerInput")[0].value)
    let highOrLowEle = document.getElementsByClassName("highOrLow")[0]
   // let actionDiv = document.getElementsByClassName("actionDiv")[0]
   
    
    
    console.log("playerChoiceFunc running")
    if(playerChoice == correctAnswer) {
 
        highOrLowEle.innerText = "Correct"
        highOrLowEle.style.animation = "bounce 0.5s"
        return true
    }
    else if(playerChoice < correctAnswer) {
        highOrLowEle.innerText = "Higher"
        highOrLowEle.style.animation = "bounce 0.5s"
        return false
    }
    else if(playerChoice > correctAnswer) {
        highOrLowEle.innerText = "Lower"
        highOrLowEle.style.animation = "bounce 0.5s"
        return false
    }
}

function givePoints() {
    let player = JSON.parse(sessionStorage.getItem("player"))
    const pointCounter = document.getElementsByClassName("pointCounter")[0]
    if(round === 1) {
        points += 50*player.level;
    }
    else if(round === 2) {
        points += 40*player.level;
    }
    else if(round === 3) {
        points += 30*player.level;
    }
    else if(round === 4) {
        points += 20*player.level;
    }
    else if(round === 5) {
        points += 10*player.level;
    }
    pointCounter.innerText = "Points: " + points
}
/* 
export function gameSetAmount(nrOfRounds, roundTime) {
    //gameSet++
    rounds(nrOfRounds, roundTime)
} */

async function gameEnd() {
    let player = JSON.parse(sessionStorage.getItem("player"))

    if(gameSet == player.set) {
        let nextSetBtn = document.getElementsByClassName("nextSetBtn")[0]
        let playerInfo = [points, player.name]
  

        let body = new FormData()
        body.set("playerInfo", JSON.stringify(playerInfo))
        const playerScore = await makeReq("./api/dbReciever.php", "POST", body)
        console.log(playerScore)
        createResultsPage()
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
         }) 
} 