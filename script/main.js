import { createElement } from "./logic.js"
import { startGame } from "./game.js"

window.addEventListener("load", initSite)


function initSite() {
    createTestBtn()
 	
}


function createTestBtn() {
    let parentDiv = document.createElement("div")
    parentDiv.classList = "parentDiv"
    let main = document.getElementsByTagName("main")[0]
    let startGameBtn = createElement("button", "startBtn", main)
    startGameBtn.innerText = "Start Game"
    startGameBtn.addEventListener("click", startGame)
    parentDiv.append(startGameBtn)
    main.appendChild(parentDiv)
}
