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
            console.log("login success")
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