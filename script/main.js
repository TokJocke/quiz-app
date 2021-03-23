import { createElement, makeReq } from "./logic.js"
import { startGame } from "./game.js"

window.addEventListener("load", initSite)


function initSite() {
    createIndexContent()
    callBtn()
    clickLogo()
    GetHighscoreList()
}


function createIndexContent() {
    let parentDiv = document.createElement("div")
    parentDiv.classList = "parentDiv"
    let nameInput = document.createElement("input")
    nameInput.id = "nameInput"
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
        GetHighscoreList()

    } )
}

async function GetHighscoreList() {
  let ordList = document.createElement("ol")
  let headline = document.createElement("h2")
  headline.innerText = "Highscore"
  ordList.append(headline)
  ordList.style.width = "100vw"
  ordList.style.display = "flex"
  ordList.style.flexDirection = "column"
  ordList.style.justifyContent = "center"
  ordList.style.alignItems = "center"
  const response = await makeReq("./api/dbReciever.php", "GET")
  console.log("ARRAY =", response)
  response.forEach(user => {
    let listItem = document.createElement("li")
    listItem.style.margin = "3px"
    listItem.innerText = user.name + "," + " " + user.highscore + " p"
    ordList.appendChild(listItem)
  });
  let main = document.getElementsByTagName("main")[0]
  main.append(ordList)
}

//testknapp
let x = document.getElementById("tstbtn")
x.addEventListener("click", postName)

async function postName() {
  let input = document.getElementById("nameInput").value
  let body = new FormData()
  body.set("nameInput", input)
  const response = await makeReq("./api/dbReciever.php", "POST", body)
  console.log(response)
  
}

