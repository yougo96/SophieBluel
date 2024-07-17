let loginForm = document.querySelector("#login > form")
loginForm.addEventListener("submit", handleLogin)

function handleLogin(event) {
    event.preventDefault();
    fetch(event.target.action, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
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
            console.log("login Failed")
            document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        }
    })
    .catch((err) => {
        console.log(err)
    });
}