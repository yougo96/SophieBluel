// === Fetch /works ========================================================================
async function works() {
    fetch("http://localhost:5678/api/works").then((res) => {return res.json()}).then((obj) => {

        console.log(obj)
        let parentDiv = document.querySelector('.gallery')
        obj.forEach(i => {
            let childDiv = document.createElement("figure")
            childDiv.id = i.id
            childDiv.setAttribute('categoryid', i.categoryId)
            childDiv.setAttribute('userid', i.userId)
            childDiv.innerHTML = `
                <img src="${i.imageUrl}" alt="${i.title}">
                <figcaption>${i.title}</figcaption>
            `
            parentDiv.appendChild(childDiv)
        });
    })
}

// === Fetch /categories ========================================================================
async function categories() {
    await fetch("http://localhost:5678/api/categories").then((res) => {return res.json()}).then((obj) => {

        console.log(obj)
        let parentDiv = document.querySelector('#portfolio > ul')
        obj.forEach(i => {
            let childDiv = document.createElement("li")
            childDiv.id = i.id
            childDiv.innerHTML = `
            ${i.name}
            `
            parentDiv.appendChild(childDiv)
        });
    })

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
works()
categories()


