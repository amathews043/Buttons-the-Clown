const applicationState = {
    requestForms: [],
    completions:[], 
}

export const getRequests = () => {
    const requestsArray = applicationState.requestForms.map(request => ({...request}))
    requestsArray.sort(function(x, y) {
        return (x.assigned === y.assigned)? 0 : x.assigned? 1 : -1
    })
    return requestsArray
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}


export const fetchRequestForms = () => {
    return fetch(`${API}/requestForms`)
        .then(response => response.json())
        .then(
            (data) => {
                // Store the external state in application state
                applicationState.requestForms = data
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (data) => {
            applicationState.completions = data
        }
    )
}

export const changeRequest = (userServiceRequest, ID) => {
    const fetchOptions = {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requestForms/${ID}`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(`${API}/requestForms`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requestForms/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (request) => {
    const fetchOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }
    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
