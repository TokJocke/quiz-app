import { createElement, makeReq, removeElementById } from "./logic.js"
import { startGame, playAgain } from "./game.js"

window.addEventListener("load", initSite)


function initSite() {
    createIndexContent()
    callBtn()
    clickLogo()
    selectOption()
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
    nameInput.style.height = "50px"
    nameInput.style.width = "80%"
    nameInput.style.maxWidth ="600px"
    nameInput.style.border = "none"
    nameInput.style.borderRadius = "5px"
    
    let levelCheck = createElement("div", "levelCheck", parentDiv )
    
    let easyDiv = createElement("div", "easyDiv",levelCheck )

    let normalDiv = createElement("div", "easyDiv",levelCheck )

    let hardDiv = createElement("div", "easyDiv",levelCheck )


    let easycheck = createElement("input", "levelInput", easyDiv)
    easycheck.value = 1
    easycheck.type = "radio"
    easycheck.name ="radio"
    let easycheckTitle = createElement("p", "checkTitle", easyDiv)
    easycheckTitle.innerText="Easy"
    
    let normalcheck = createElement("input", "levelInput", normalDiv)
    normalcheck.value = 2
    normalcheck.checked = true
    normalcheck.type = "radio"
    normalcheck.name ="radio"
    let normalcheckTitle = createElement("p", "checkTitle", normalDiv)
    normalcheckTitle.innerText="Normal"
  
    let hardcheck = createElement("input", "levelInput", hardDiv)
    hardcheck.value = 3
    hardcheck.type = "radio"
    hardcheck.name ="radio"
    let hardcheckTitle = createElement("p", "checkTitle", hardDiv)
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
      window.location.reload()

    } )
}

async function getTop50() {
  let myDiv = document.createElement("div")
  let overflowDiv = document.createElement("div")
  overflowDiv.style.maxHeight = "30vh"
  overflowDiv.style.overflowY = "scroll"
  myDiv.id = "highscoreDiv"
  let ordList = document.createElement("ol")
  let headline = document.createElement("h2")
  headline.innerText = "Top 50 Highscore"
  ordList.append(headline)
  ordList.style.width = "100vw"
  ordList.style.maxHeight = "auto"
  ordList.style.display = "flex"
  ordList.style.flexDirection = "column"
  ordList.style.justifyContent = "center"
  ordList.style.alignItems = "center"
  ordList.style.padding = "0px"

  const response = await makeReq("./api/dbReciever.php?top50", "GET")

  response.forEach(user => {
    let listItem = document.createElement("li")
    listItem.style.margin = "3px"
    listItem.innerText = user.name + "," + " " + user.highscore + " p"
    ordList.appendChild(listItem)
  });
  let main = document.getElementsByTagName("main")[0]
  myDiv.append(overflowDiv)
  overflowDiv.append(ordList)
  main.appendChild(myDiv)
} 
 
async function GetHighscoreList() {
  let myDiv = document.createElement("div")
  myDiv.id = "highscoreDiv2"
  let ordList = document.createElement("ol")
  let headline = document.createElement("h2")
  headline.innerText = "Top 3 Highscore"
  ordList.append(headline)
  ordList.style.width = "100vw"
  ordList.style.display = "flex"
  ordList.style.flexDirection = "column"
  ordList.style.justifyContent = "center"
  ordList.style.alignItems = "center"
  ordList.style.padding = "0px"

  const response = await makeReq("./api/dbReciever.php", "GET")

  response.forEach(user => {
    let listItem = document.createElement("li")
    listItem.style.margin = "3px"
    listItem.innerText = user.name + "," + " " + user.highscore + " p"
    ordList.appendChild(listItem)
  });
  let main = document.getElementsByTagName("main")[0]
  myDiv.append(ordList)
  main.appendChild(myDiv)
}

function selectOption() {
  let main = document.getElementsByTagName("main")[0]
  let mySelect = document.createElement("select")
  mySelect.id = "mySelect"
  let option = document.createElement("option")
  option.innerText = "Top 3"
  option.value = "1"
  let option2 = document.createElement("option")
  option2.innerText = "Top 50"
  option2.value = "2"
  mySelect.append(option, option2)
  main.appendChild(mySelect)
  mySelect.addEventListener("change", () => {
   
    if(mySelect.value == 2) {
      getTop50()
      removeElementById("highscoreDiv2")
    }

    if(mySelect.value == 1) {
      GetHighscoreList()
      removeElementById("highscoreDiv")
    }

  })
 
} 


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
  let backtoGame = createElement("button","startBtn", buttonDiv)
  backtoGame.innerText ="Play Again"
  backtoGame.addEventListener("click", playAgain)
 
 } 

 
 export function gamedone() {
   
   let main = document.getElementsByTagName("main")[0]
   
   let endgame = createElement("div","endgame", main)
   endgame.id="endgame"
   endgame.style.display ="block"
   endgame.style.padding ="10px"
   
   let winbox = createElement("div","winbox", endgame)
   winbox.innerText ="Correct guess"
  }