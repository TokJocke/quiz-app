import { createElement } from "./logic.js"
import { startGame } from "./game.js"

window.addEventListener("load", initSite)


function initSite() {
    createIndexContent()
    callBtn()
    clickLogo()
}


function createIndexContent() {
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

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
function callBtn() {
    let x = document.getElementsByClassName("dropbtn")[0]
    x.addEventListener("click", myFunction)
}

function clickLogo() {
    let x = document.getElementById("logo")
    let main = document.getElementsByTagName("main")[0]
    x.addEventListener("click", () => {
        main.innerHTML = null
        createIndexContent()

    } )
}