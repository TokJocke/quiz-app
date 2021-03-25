import { createElement, getCheckedRadio } from "./logic.js"
import {  rounds } from "./gameLogic.js"
import { renderBot } from "./bot.js"


export function startGame() {
    getCheckedRadio()
    let player = JSON.parse(sessionStorage.getItem("player"))

    if(!player.name) {
        alert("fyll i ditt namn")
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
   
    let pointCounter = createElement("p", "pointCounter", playerDiv)
    let setCounter = createElement("p", "setCounter", playerDiv)
    let timer = createElement("p", "timer", playerDiv) 
    let currentRound = createElement("p", "currentRound", playerDiv)
    let highOrLow = createElement("P", "highOrLow", playerDiv)
    let playerInput = createElement("input", "playerInput", playerDiv)
    playerInput.focus()
    playerInput.placeholder = "chose a number between 1-20"
    playerInput.type = "number"

    pointCounter.innerText = 0
 }  

