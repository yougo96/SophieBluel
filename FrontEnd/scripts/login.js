let loginForm = document.querySelector("#login > form")
loginForm.addEventListener("submit", handleLogin)

function handleLogin(event) {
    event.preventDefault();
    fetch(loginForm.action, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(loginForm)))
    })
    .then((response) => {
        if( response.ok ) {
            response.json().then((json) => {
                console.log(json)
                sessionStorage.setItem("userId", JSON.stringify(json.userId));
                sessionStorage.setItem("token", JSON.stringify(json.token));
            })            
            window.location.href = "./index.html";
        } else {
            console.log("login Failed")
            document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        }
    })
    .catch((err) => {
        console.log(err)
    });
}