import { createElement, getCheckedRadio } from "./logic.js"
import {  rounds } from "./gameLogic.js"
import { renderBot } from "./bot.js"


export function startGame() {
    getCheckedRadio()
    let player = JSON.parse(sessionStorage.getItem("player"))

    if(!player.name) {
        alert("Fyll i ditt namn!")
    }
    else {
        createGamePage()
        rounds(5, 12/player.level)
        renderBot(player.level)
    }
}

function createGamePage() {
    let main = document.getElementsByTagName("main")[0]
    main.innerHTML = null
    let playerDiv = createElement("div", "playerDiv", main)
    
    
    /*     let confirmBtn = createElement("button", "confirmBtn", playerDiv)
    */    
   
    let playerInput = createElement("input", "playerInput", playerDiv)

    let actionDiv = createElement("div", "actionDiv", playerDiv)
    let setAndRoundDiv = createElement("div", "setAndRoundDiv", actionDiv)
  
    let timer = createElement("p", "timer", actionDiv) 
    let setCounter = createElement("p", "setCounter", setAndRoundDiv)
    let pointCounter = createElement("p", "pointCounter", setAndRoundDiv)
    let currentRound = createElement("p", "currentRound", setAndRoundDiv)
    let highOrLow = createElement("P", "highOrLow", actionDiv) 
    playerInput.focus()
    playerInput.placeholder = "Choose a number between 1-20"
    playerInput.type = "number"

    pointCounter.innerText = "Points: 0"
 }  

