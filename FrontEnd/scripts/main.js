const apiUrl = "http://localhost:5678/api/"


function checkDataForm(event) {
    
}

function checkValidityForm(event) {
    if (event.currentTarget.reportValidity() === true) {
        console.log("form valid")
        event.currentTarget.querySelector('[type="submit"]').setAttribute("role", "")
    } else {
        console.log("form not valid")
        event.currentTarget.querySelector('[type="submit"]').setAttribute("role", "alert")
    }
}

document.querySelectorAll("form").forEach(i => 
    i.addEventListener("change", checkValidityForm)
)