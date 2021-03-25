import { createElement, makeReq } from "./logic.js"
import { startGame } from "./game.js"

window.addEventListener("load", initSite)


function initSite() {
    createIndexContent()
    callBtn()
    clickLogo()
    GetHighscoreList()
    sessionStorage.clear()
}


function createIndexContent() {
    let main = document.getElementsByTagName("main")[0]
    main.innerHTML = null

    let parentDiv = document.createElement("div")
    parentDiv.classList = "parentDiv"

    let nameInput = document.createElement("input")
    nameInput.id = "nameInput"
    nameInput.placeholder = "What's your player name?"
    nameInput.style.height = "35px"
    nameInput.style.width = "50%"
    nameInput.style.border = "none"
    nameInput.style.borderRadius = "5px"
    
    let levelCheck = createElement("div", "levelCheck", parentDiv )
    
    let easycheck = createElement("input", "levelInput", levelCheck)
    easycheck.value = 1
    easycheck.type = "radio"
    easycheck.name ="radio"
    let easycheckTitle = createElement("p", "checkTitle", levelCheck)
    easycheckTitle.innerText="Easy"
    
    let normalcheck = createElement("input", "levelInput", levelCheck)
    normalcheck.value = 2
    normalcheck.checked = true
    normalcheck.type = "radio"
    normalcheck.name ="radio"
    let normalcheckTitle = createElement("p", "checkTitle", levelCheck)
    normalcheckTitle.innerText="Normal"
  
    let hardcheck = createElement("input", "levelInput", levelCheck)
    hardcheck.value = 3
    hardcheck.type = "radio"
    hardcheck.name ="radio"
    let hardcheckTitle = createElement("p", "checkTitle", levelCheck)
    hardcheckTitle.innerText="Hard"
    
    
    let startGameBtn = createElement("button", "startBtn", main)
    startGameBtn.innerText = "Start Game"
    startGameBtn.addEventListener("click", startGame)

    parentDiv.append(nameInput, levelCheck,startGameBtn)
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
    let x = document.getElementById("logga")
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

/* 

async function postName() {
  let input = document.getElementById("nameInput").value
  let body = new FormData()
  body.set("nameInput", input)
  const response = await makeReq("./api/dbReciever.php", "POST", body)
  console.log(response)
  
} */
//New page showing result after game
export async function createResultsPage() {
  let main = document.getElementsByTagName("main")[0]
  main.innerText = null

  let playerInfo = JSON.parse(sessionStorage.getItem("player"))
  let resultWrap = createElement("div", "resultWrap", main)
  let resultText = createElement("p", "scoreText", resultWrap)
  let highScoreDiv = createElement("div", "highScoreDiv", resultWrap)
  let buttonDiv = createElement("div", "resultBtnDiv", resultWrap)
  let backToStartBtn = createElement("button", "startBtn", buttonDiv)
  let response = await makeReq("./api/dbReciever.php?result=" + playerInfo.name, "GET")  
  
  resultText.innerText = response[0].name + " you scored " + response[0].highscore + " points"
  backToStartBtn.innerText = "Back to start"
  
  backToStartBtn.addEventListener("click", initSite)
  
  console.log(response)



 }