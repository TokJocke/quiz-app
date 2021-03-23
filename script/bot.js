import { createElement, randomNr } from "./logic.js"

let botArray = [{
    name: "gulBot",
    img: ".././assets/gul"
},
    {
    name: "gronBot",
    img: ".././assets/gron"
    },
    {
    name: "turkos",
    img: ".././assets/turkos"
}]


export function renderBot(amount) {    
    for(let i = 0; i < amount; i++) {
        let main = document.getElementsByTagName("main")[0]
        let botDiv = createElement("div", "botDiv", main)
        let botImgDiv = createElement("div", "botImgDiv", botDiv)
        let botImg = createElement("img", "botImg", botImgDiv)
        let botTextResponse = createElement("p", "botTextResponse", botDiv)
        let botTextChoice = createElement("p", "botTextChoice", botDiv)
        
        botImg.src = botArray[i].img + "-glad.png"

    }

}

let i = 0
export function initBot(amount, correctAnswer) {
    setTimeout(function() {  
        if(botMakeGuess(amount, correctAnswer, i) == true) {
            return true
        }  
        i++;                   
        if (i < amount) {          
            initBot(amount, correctAnswer);             
        } 
        else {
            i = 0
        }                      
      }, randomNr(0, 4)*1000)


} 



export function botMakeGuess(amount, correctAnswer, i) {
   // for(let i = 0; i < amount; i++) {
            let botGuess = randomNr(1, 20) //correctAnswer för buggfix
            let botTextChoice = document.getElementsByClassName("botTextChoice")[i]
            let botTextResponse = document.getElementsByClassName("botTextResponse")[i]
            botTextChoice.innerText = botGuess

            if(botGuess == correctAnswer) {
    
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
        }
        
        
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