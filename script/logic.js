
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


