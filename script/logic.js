
//Logic operations
export function randomNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

//Front end
//Create element
export function createElement (element, elementClass, parent) {
    element = document.createElement(element)
    element.className = elementClass
    parent.append(element)
    return element
}
//Back end
//Make req to endpoint with "path", "method" & "body"(optional)
export async function makeReq(path, method, body) {
    try {
        let response = await fetch(path, {
            method,
            body
        })
        return response.json()     
    }
     catch(err) {
          console.error("Failed fetch", err)
      } 
}


export function getCheckedRadio() {
    let levelInput = document.getElementsByClassName("levelInput")
    let nameInput = document.getElementById("nameInput").value
    for(let i = 0; i < levelInput.length; i++) {
        if(levelInput[i].checked) {
            let player = {
                name: nameInput,    
                level: levelInput[i].value,
                set: 3
            }
            console.log(player)
            sessionStorage.setItem("player", JSON.stringify(player))

        }
    }
}

export function removeElementById(myId){	
	var elem = document.getElementById(myId)
	elem.parentNode.removeChild(elem);	
} 

export function addNumberToLocalArray(number) {
    let pickedNumbers = JSON.parse(sessionStorage.getItem("pickedNumbers"))
    let numberArray
    if(!pickedNumbers) {
        numberArray = []
        numberArray.push(number)
    }
    else {
        numberArray = pickedNumbers
        numberArray.push(number)
 /*        numberArray.forEach(numberInArray => {
            if(numberInArray != number) {
                numberArray.push(number)
            } 
        });  */
    }
    sessionStorage.setItem("pickedNumbers", JSON.stringify(numberArray))
}

/* export function loopPickedNumber(array, guess) {
        if(array.includes(guess)) {
            console.log("found guess in arrray")
            return false
        }
        else {
            return true
        }

    
}
 */
