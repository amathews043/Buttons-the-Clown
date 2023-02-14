import { RequestForm } from "./requestForm.js";
import { Requests } from "./requests.js";

export const Clowns = () => {
    return `
        <h1>Hire Buttons and Lollipop the Clowns</h1>
        <section class="requestForm">
            ${RequestForm()}
        </section>

        <section class="serviceRequests">
            <h2>Party Requests</h2>
            ${Requests()}
        </section>
    `
}