
export const RequestForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="partyAddress">Party Address</label>
            <input type="text" name="partyAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numberOfKids">Number of Children Attending</label>
            <input type="number" name="numberOfKids" class="input" />
        </div>
        <div class="field">
            <label class="label" for="partyDate">Date of Party</label>
            <input type="date" name="partyDate" class="input" />
        </div>
        <div class="field">
        <label class="label" for="numberOfHours">Party Hours </label>
        <input type="number" name="numberOfHours" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}

import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const nameParent = document.querySelector("input[name='parentName']").value
        const nameChild = document.querySelector("input[name='childName']").value
        const addressParty = document.querySelector("input[name='partyAddress']").value
        const kidsNum = document.querySelector("input[name='numberOfKids']").value
        const dateParty = document.querySelector("input[name='partyDate']").value
        const hours = document.querySelector("input[name='numberOfHours']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: nameParent,
            childName: nameChild,
            partyAddress: addressParty,
            numberOfKids: kidsNum,
            partyDate: dateParty,
            numOfHours: hours,
            assigned: false
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})