import { createElement } from "./logic.js"
import { startGame } from "./game.js"

window.addEventListener("load", initSite)


function initSite() {
    createTestBtn()
 	
}


function createTestBtn() {
    let parentDiv = document.createElement("div")
    parentDiv.classList = "parentDiv"
    let nameInput = document.createElement("input")
    nameInput.placeholder = "What's your player name?"
    nameInput.style.height = "35px"
    nameInput.style.width = "50%"
    nameInput.style.border = "none"
    nameInput.style.borderRadius = "5px"
    let main = document.getElementsByTagName("main")[0]
    let startGameBtn = createElement("button", "startBtn", main)
    startGameBtn.innerText = "Start Game"
    startGameBtn.addEventListener("click", startGame)
    parentDiv.append(nameInput, startGameBtn)
    main.appendChild(parentDiv)
}
