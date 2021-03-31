import { createElement, randomNr, makeReq, removeElementById } from "./logic.js"
import { createResultsPage, gamedone } from "./main.js"
import { botGuess, checkBotGuess, resetBotGuess } from "./bot.js"


//Some global variables to keep track of things
let correctAnswer = randomNr(1, 20)
let round = 1
let gameSet = 1
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
    points = 0
    gameSet = 1
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
                nextSetBtn(nrOfRounds, roundTime)
                givePoints()
                gameEnd()
                gamedone()
                gameSet++
                round = 1
            }
            else if(playerChoice() == false) {
                botGuess(correctAnswer)
                round++

                // Check if bot guess = correct
                if(checkBotGuess(correctAnswer) == true) {
                    console.log("BOT WINNER TRUE TRUE TRUE", round)
                    nextSetBtn(nrOfRounds, roundTime)
                    gameEnd()
                    gameSet++
                    round = 1
                }
                else if(round <= nrOfRounds) {
                    setTimeout(() => {
                        rounds(nrOfRounds, roundTime)
                        lockGuess()
                    }, 9000);
                }
                else {
                    nextSetBtn(nrOfRounds, roundTime)
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
        
        removeElementById("nextSetBtn")
        let playerInfo = [points, player.name]
        

        let body = new FormData()
        body.set("playerInfo", JSON.stringify(playerInfo))
        const playerScore = await makeReq("./api/dbReciever.php", "POST", body)
        console.log(playerScore)
        setTimeout(() => {
            createResultsPage()
            correctAnswer = randomNr(1, 20)
        }, 4000);
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

function nextSetBtn(nrOfRounds, roundTime) {
    let playerDiv = document.getElementsByClassName("playerDiv")[0]
    let nextSetBtnWrap = createElement("div", "nextSetBtnWrap", playerDiv)   
    let nextSetBtn = createElement("button", "nextSetBtn", nextSetBtnWrap)
        nextSetBtn.id="nextSetBtn"
        nextSetBtn.innerText = "Next set"
        nextSetBtn.addEventListener("click", () => {
            lockGuess()
            ifwin()
            resetBotGuess()
            nextSetBtnWrap.innerHTML = null
            rounds(nrOfRounds, roundTime)   
            correctAnswer = randomNr(1, 20)
        }) 
    } 
    
    function ifwin(){
        if(document.getElementById("endgame")){
            removeElementById("endgame")
        }
    }
