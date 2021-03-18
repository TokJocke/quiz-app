import { randomNr, createElement } from "./logic.js"
import { playTurn, roundAmount } from "./gameLogic.js"

export function startGame() {
    createGamePage()
    roundAmount(5, 5)
}

function createGamePage() {
    let main = document.getElementsByTagName("main")[0]
    main.innerHTML = null
    let playerDiv = createElement("div", "playerDiv", main)
    
    
    /*     let confirmBtn = createElement("button", "confirmBtn", playerDiv)
    */    
   
    let playerInput = createElement("input", "playerInput", playerDiv)
    let pointCounter = createElement("p", "pointCounter", playerDiv)
    let timer = createElement("p", "timer", playerDiv) 
    let currentRound = createElement("p", "currentRound", playerDiv)
    let highOrLow = createElement("P", "highOrLow", playerDiv)


    playerInput.placeholder = "chose a number between 1-20"
    playerInput.type = "number"
 /*    confirmBtn.innerText = "confirm"
    confirmBtn.addEventListener("click", playTurn) */
    pointCounter.innerText = 0
 }

