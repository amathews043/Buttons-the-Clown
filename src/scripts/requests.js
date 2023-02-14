import { getClowns, getRequests, deleteRequest, saveCompletion, getCompletions, changeRequest } from "./dataAccess.js"


// const requestsHTML = (request) => {
//     const clowns = getClowns()
//     const completions = getCompletions()
//     let html = ""
//     html += `
//     <li>
//         ${request.childName}'s Party. Hosted by ${request.parentName} at ${request.partyAddress} for 
//         ${request.numberOfKids} kids on ${request.partyDate} for ${request.numOfHours} hours 
//         <select class="clowns" id="clowns">
//     <option value="">Choose</option>`

//         for (const clown of clowns){
//             for (const completion of completions){
//                 if (completion.requestId === request.id){
//                     html += `<option selected value="${request.id}--${clown.id}">${clown.name}</option>`
//                 } else {
//                     html += `<option value="${request.id}--${clown.id}">${clown.name}</option>`
//                 }
//             }
//         }

//         html += `</select>
//             <button class="request__delete"
//                 id="request--${request.id}">
//             Deny
//             </button>
//     </li>`
    
//     return html
    
// }

//The code below works but it continues to show the select button after a clown has already been selected. 

const requestsHTML = (request) => {
    const clowns = getClowns()
    if (request.assigned === false) {return `
    <li>
        ${request.childName}'s Party. Hosted by ${request.parentName} at ${request.partyAddress} for 
        ${request.numberOfKids} kids on ${request.partyDate} for ${request.numOfHours} hours 
        <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
    }
    </select>
        <button class="request__delete"
                id="request--${request.id}">
            Deny
        </button>
    </li>
        `} else {return `
        <li class ="complete">
            ${request.childName}'s Party. Hosted by ${request.parentName} at ${request.partyAddress} for 
            ${request.numberOfKids} kids on ${request.partyDate} for ${request.numOfHours} hours 
            <button class="request__delete"
                    id="request--${request.id}">
                Deny
            </button>
        </li>
            `}
    
}

// why does this code only show choose and not a list of clowns? I am trying to keep the clown's name 
// selected after I select them. I also tried it with for loops instead of .map and receieved the same result. 

// const requestsHTML = (request) => {
//     const clowns = getClowns()
//     const completions = getCompletions()
//     return `
//     <li>
//         ${request.childName}'s Party. Hosted by ${request.parentName} at ${request.partyAddress} for 
//         ${request.numberOfKids} kids on ${request.partyDate} for ${request.numOfHours} hours 
//         <select class="clowns" id="clowns">
//     <option value="">Choose</option>
//     ${
//         clowns.map(
//             clown => {
//                 completions.map(
//                     completion => {
//                         if(completion.requestId === request.id){
//                             return `<option selected value="${request.id}--${clown.id}">${clown.name}</option>`
//                         }
//                         else {
//                             return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
//                         }
//                     }
//                 )

//             }
//         ).join("")
//     }
//     </select>
//         <button class="request__delete"
//                 id="request--${request.id}">
//             Deny
//         </button>
//     </li>
//         `
    
// }

export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul>
            ${
                requests.map(requestsHTML).join("")
            }
            
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")
            
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId, 
                clown: clownId,
                date_created: new Date()
             }

             saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                const requests = getRequests()
                for (const request of requests){
                    if(request.id === parseInt(requestId)){
                        const requestComplete = {
                            assigned: true, 
                            clown: clownId, 
                            date_completed: new Date().toLocaleDateString()
                        }
                        changeRequest(requestComplete, request.id)
                    }
                }

        }
    }
)