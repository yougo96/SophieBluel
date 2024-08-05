let loginForm = document.querySelector("#login > form")
if (loginForm) loginForm.addEventListener("submit", handleLogin)

function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    const formDataCheck = checkInputForm("login", formData)
    if (!formDataCheck) {
        console.log("login formData invalid")
        document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        return
    }

    fetch(event.target.action, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then((response) => {
        if( response.ok ) {
            response.json().then((json) => {
                console.log(json)
                sessionStorage.setItem("userId", json.userId);
                sessionStorage.setItem("token", json.token);
            })            
            window.location.href = "./index.html";
        } else {
            console.log("login bad response", response)
            document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        }
    })
    .catch((err) => {
        console.log("login function Failed", err)
        document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
    })
    
}