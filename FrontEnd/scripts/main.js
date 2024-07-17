

// === Auth ========================================================================
let userId = sessionStorage.getItem("userId")
let token = sessionStorage.getItem("token")

if (userId && token) {
    if (userId = 1) {
        document.querySelectorAll(".auth-admin").forEach((elem) => {
            elem.classList.toggle("d-none", false)
        })
    }
    document.querySelectorAll(".auth-login").forEach((elem) => {
        elem.classList.toggle("d-none", false)
    })
    document.querySelectorAll(".auth-logoff").forEach((elem) => {
        elem.classList.toggle("d-none", true)
    })
}

document.querySelector("#logout").addEventListener("click", () => {
    sessionStorage.clear()
    location.reload()
})


// === Fetch /works ========================================================================
let works = null

async function worksJson() {
    await fetch("http://localhost:5678/api/works").then((res) => {return res.json()}).then((obj) => {
        console.log("worksJson", obj)
        works = obj
    })
}
async function worksUi() {
    await worksJson()

    let parentDiv = document.querySelector('.gallery')
    parentDiv.innerHTML = ``

    works.forEach(i => {
        let childDiv = document.createElement("figure")
        childDiv.id = i.id
        childDiv.setAttribute('categoryid', i.categoryId)
        childDiv.setAttribute('userid', i.userId)
        childDiv.innerHTML = `
            <img loading="lazy" src="${i.imageUrl}" alt="${i.title}">
            <figcaption>${i.title}</figcaption>
        `
        parentDiv.appendChild(childDiv)
    });
}

// === Fetch /categories ========================================================================
let categories = null

async function categoriesJson() {
    await fetch("http://localhost:5678/api/categories").then((res) => {return res.json()}).then((obj) => {
        console.log("categoriesJson", obj)
        categories = obj;
    })
}
async function FiltersUi() {
    await categoriesJson()

    let parentDiv = document.querySelector('#portfolio > ul')
    parentDiv.innerHTML = `<li id="0" class="active">Tous</li>`

    categories.forEach(i => {
        let childDiv = document.createElement("li")
        childDiv.id = i.id
        childDiv.innerHTML = `
        ${i.name}
        `
        parentDiv.appendChild(childDiv)
    });

    document.querySelectorAll("#portfolio > ul > li").forEach((elem) => {
        elem.addEventListener("click", clickFilters)
    })
}

function clickFilters(event) {
    let currentFilterId = 0

    document.querySelectorAll("#portfolio > ul > li").forEach((elem) => {elem.classList.toggle("active", false)})
    event.target.classList.toggle("active", true);
    currentFilterId = event.target.id
       
    document.querySelectorAll(".gallery > figure").forEach((elem) => {
        elem.classList.toggle("d-none", true)

        if (currentFilterId == 0) {
            elem.classList.toggle("d-none", false)
        }
        else if (elem.getAttribute("categoryid") == currentFilterId) {
            elem.classList.toggle("d-none", false)
        }
    })
}



// === Build page ========================================================================
worksUi()
FiltersUi()



