// === Auth ========================================================================
if (userId && token) {
    if (userId = 1) {
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
    await fetch( apiUrl + "works").then((res) => {return res.json()})
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
    await fetch( apiUrl +"categories").then((res) => {return res.json()}).then((json) => {
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
    // Filters
    document.querySelectorAll("#portfolio > ul > li").forEach(i => {i.classList.toggle("active", false)})       
    event.target.classList.toggle("active", true);
    // Gallery
    document.querySelectorAll(".gallery > figure").forEach(i => {
        if (event.target.id == 0) {
            i.classList.toggle("filtered", false)
        }
        else {
            i.classList.toggle("filtered", i.getAttribute("categoryid") !== event.target.id)
        }
    })
}

// === Build page ========================================================================
worksUi()
FiltersUi()

// Event listener
document.querySelector("#logout").addEventListener("click", logout)