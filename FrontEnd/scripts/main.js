// === Auth ========================================================================
let userId = sessionStorage.getItem("userId")
let token = sessionStorage.getItem("token")

if (userId && token) {
    if (userId == 1) {
        document.querySelectorAll(".auth-admin").forEach(i => {
            i.classList.toggle("d-none", false)
        })
    }
    document.querySelectorAll(".auth-login").forEach(i => {
        i.classList.toggle("d-none", false)
    })
    document.querySelectorAll(".auth-logoff").forEach(i => {
        i.classList.toggle("d-none", true)
    })
}

function logout() {
    sessionStorage.clear()
    location.reload()
}


// === Fetch /works ========================================================================
let works = null

async function worksJson() {
    await fetch("http://localhost:5678/api/works").then((res) => {return res.json()})
    .then((json) => {
        console.log("worksJson", json)
        works = json
    })
    .catch((err) => {console.log(err)})
}

async function worksUi(obj) {
    await worksJson()

    obj ?? (obj = works)

    let parentDiv = document.querySelector('.gallery')
    parentDiv.innerHTML = ``

    obj.forEach(i => {
        i.title = i.title.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").trim();

        let childDiv = `
        <figure id="${i.id}" categoryid="${i.categoryId}" userid="${i.userId}">
        <img loading="lazy" src="${i.imageUrl}" alt="${i.title}">
            <figcaption>${i.title}</figcaption>
        </figure>
        `
        parentDiv.insertAdjacentHTML("beforeend", childDiv)
    });
}

// === Fetch /categories ========================================================================
let categories = null

async function categoriesJson() {
    await fetch("http://localhost:5678/api/categories").then((res) => {return res.json()}).then((json) => {
        console.log("categoriesJson", json)
        categories = new Set(json);
    })
}
async function FiltersUi() {
    await categoriesJson()

    let parentDiv = document.querySelector('#portfolio > ul')
    parentDiv.innerHTML = `<li id="0" class="active" onclick="filtersAction(event)">Tous</li>`

    categories.forEach(i => {
        let childDiv = `
        <li id="${i.id}" onclick="filtersAction(event)">
            ${i.name}
        </li>
        `
        parentDiv.insertAdjacentHTML("beforeend", childDiv)
    });
}

function filtersAction(event) {
    event.preventDefault()

    let currentFilterId = 0

    document.querySelectorAll("#portfolio > ul > li").forEach(i => {i.classList.toggle("active", false)})
    currentFilterId = event.target.id
    event.target.classList.toggle("active", true);

    // filer
    // if (currentFilterId == 0) { 
    //     worksUi()
    //  }
    // else { 
    //     const filterList = works.filter((figure) => figure.categoryId == currentFilterId) 
    //     worksUi(filterList)
    // }
       
    // Display
    document.querySelectorAll(".gallery > figure").forEach(i => {
        i.classList.toggle("d-none", true)

        if (currentFilterId == 0) {
            i.classList.toggle("d-none", false)
        }
        else if (i.getAttribute("categoryid") === currentFilterId) {
            i.classList.toggle("d-none", false)
        }
    })
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

// === Build page ========================================================================
worksUi()
FiltersUi()

document.querySelectorAll("form").forEach(i => 
    i.addEventListener("change", checkValidityForm)
)