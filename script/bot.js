import { createElement, randomNr, addNumberToLocalArray } from "./logic.js"

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
//RENSA BOTINFO VID NYTT SET

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
//VISA DENNA!!!
export function botGuess(correctAnswer) {
    let player = JSON.parse(sessionStorage.getItem("player"))
    let botInfo = JSON.parse(sessionStorage.getItem("botInfo"))
    let pickedNumbers = JSON.parse(sessionStorage.getItem("pickedNumbers"))
    let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    for(let i = 0; i < player.level; i++) {
        //Settings for dumb bot
        let botGuess
        if(botInfo) {
            //dumbbot
            if(i == 0) {
                botGuess = randomNr(1, 20)
                addNumberToLocalArray(botGuess)
            }
            //Mediumbot
            else if(i == 1) {
                if(correctAnswer < botInfo[i].guess) {
                    botGuess = randomNr(1, botInfo[i].guess--)
                    addNumberToLocalArray(botGuess)
                }
                else if(correctAnswer > botInfo[i].guess) {
                    botGuess = randomNr(botInfo[i].guess++, 20)
                    addNumberToLocalArray(botGuess)
                }
            }
            //Smartbot
            else if(i == 2) {

                if(correctAnswer < botInfo[i].guess) {
                    
                    pickedNumbers.forEach(number => {            
                        numberArray = numberArray.filter(item => item !== number)       
                    }); 
                    let finalArray = numberArray.filter(item => item < botInfo[i].guess)
                    botGuess = finalArray[Math.floor(Math.random() * finalArray.length)]  
                    addNumberToLocalArray(botGuess)
                }
                else if(correctAnswer > botInfo[i].guess) {
                           
                    pickedNumbers.forEach(number => {
                        numberArray = numberArray.filter(item => item !== number)   
                    });  
                    let finalArray = numberArray.filter(item => item > botInfo[i].guess)
                    botGuess = finalArray[Math.floor(Math.random() * finalArray.length)]  
                    addNumberToLocalArray(botGuess)
                }
            }
        }
        else {
            botGuess = randomNr(1, 20)
            addNumberToLocalArray(botGuess)

            console.log(botGuess)
        }
        botArray[i].guess = botGuess
    }
    sessionStorage.setItem("botInfo", JSON.stringify(botArray))
    botInteraction(correctAnswer)
}

 
export function checkBotGuess(correctAnswer) {
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

export function resetBotGuess() {

    let botInfo = JSON.parse(sessionStorage.getItem("botInfo"))
    for (let i = 0; i < botInfo.length; i++) {
        botInfo[i].guess = ""
    }
    sessionStorage.setItem("botInfo", JSON.stringify(botInfo))

}


