import { createElement, randomNr } from "./logic.js"

let botArray = [{
    name: "gulBot",
    img: ".././assets/gul",
    guess: ""
},
    {
    name: "gronBot",
    img: ".././assets/gron",
    guess: ""
    },
    {
    name: "turkos",
    img: ".././assets/turkos",
    guess: ""
}]


export function renderBot(amount) {    
    for(let i = 0; i < amount; i++) {
        let main = document.getElementsByTagName("main")[0]
        let botWrap = createElement("div", "botWrap", main)
        let botDiv = createElement("div", "botDiv", botWrap)
        let botImgDiv = createElement("div", "botImgDiv", botDiv)
        let botImg = createElement("img", "botImg", botImgDiv)
        let botTextResponse = createElement("p", "botTextResponse", botDiv)
        let botTextChoice = createElement("p", "botTextChoice", botDiv)
        botImg.src = botArray[i].img + "-glad.png"
    }

}
 
export function botGuess(correctAnswer) {
    let player = JSON.parse(sessionStorage.getItem("player"))
    for(let i = 0; i < player.level; i++) {
        let botGuess = randomNr(1, 20)
        botArray[i].guess = botGuess
        console.log(botGuess)
    }
    sessionStorage.setItem("botInfo", JSON.stringify(botArray))
    botInteraction(correctAnswer)
}
 
export function checkGuess(correctAnswer) {
    let botInfo = JSON.parse(sessionStorage.getItem("botInfo"))    
    let player = JSON.parse(sessionStorage.getItem("player"))

    console.log(botInfo)
    for(let i = 0; i < player.level; i++){
        if(botInfo[i].guess == correctAnswer) {
            console.log("in checkGuess()")
            return true
        }
    }
}


async function botInteraction(correctAnswer) { 
    let botInfo = JSON.parse(sessionStorage.getItem("botInfo"))
    let player = JSON.parse(sessionStorage.getItem("player"))

    console.log(botInfo)
    const timer = ms => new Promise(res => setTimeout(res, ms))
        for (var i = 0; i < player.level; i++) {
            
            let botTextChoice = document.getElementsByClassName("botTextChoice")[i]
            botTextChoice.innerText = botInfo[i].guess
            
            if(botInfo[i].guess == correctAnswer) {
                let botImgDiv = document.getElementsByClassName("botImgDiv")[i]
                botImgDiv.style.animation = "bounce 0.5s"
                break
            }
            await timer(randomNr(1, 3) * 1000); 
        }

}






/*  
export function botCheckGuess() {
   // for(let i = 0; i < amount; i++) {
            let botTextChoice = document.getElementsByClassName("botTextChoice")[i]
            let botTextResponse = document.getElementsByClassName("botTextResponse")[i]
            botTextChoice.innerText = botGuess

            if(botGuess == correctAnswer) {
                botTextResponse.innerText = "Winner"
                return true
            }
            else if(botGuess < correctAnswer) {
              
                botTextResponse.innerText = "higher"
                return false
            }
            else if(botGuess > correctAnswer) {
            
                botTextResponse.innerText = "lower"
                return false
            }
}
 */



            /*             if(checkBotGuess(correctAnswer, botGuess) == "winner") {
                botTextResponse.innerText = "WINNER"
                return true
            }
            else if(checkBotGuess(correctAnswer, botGuess) == "higher") {
                botTextResponse.innerText = "higher"
                return false
            }
            else if(checkBotGuess(correctAnswer, botGuess) == "lower") {
                botTextResponse.innerText = "lower"
                return false
            } */
            //   }
    
        
        
/*         
function checkBotGuess(correctAnswer, botGuess) {

    
    if(botGuess == correctAnswer) {
    
        return "winner"
    }
    else if(botGuess < correctAnswer) {

        return "higher"
    }
    else if(botGuess > correctAnswer) {
     
        return "lower"
    }
}




 */














/* export function botInteraction(correctAnswer, amount) {
    console.log("botInteraction running")
    
    for(let i = 0; i < amount; i++) {
        
        let botTextResponse = document.getElementsByClassName("botTextResponse")
        let botImg = document.getElementsByClassName("botImg")
        let choice = botChoice(correctAnswer)
        


        if (choice == true) {
            botTextResponse[i].innerText = "winner"
        }

        else if (choice == "higher") {

            botImg.src = botArray[i].img + "-titta.png"
            botTextChoice[i].innerText = curren
            botTextResponse[i].innerText = choice
        }

        else if (choice == "lower"){
            botImg.src = botArray[i].img + "-forvarnad.png"
            botTextResponse[i].innerText = choice

        }

        else {
            console.log("error")
        }
        
    }
}

function botChoice(correctAnswer) {
    console.log("botChoice running")
    
    
    let botChoice = randomNr(1, 20)




    if(botChoice == correctAnswer) {
              
       
        return true
    }
    else if(botChoice < correctAnswer) {
   
        return "higher"
    }
    else if(botChoice > correctAnswer) {


        return "lower"
    } 
} */