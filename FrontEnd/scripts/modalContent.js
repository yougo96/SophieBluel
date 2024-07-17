// UI modale
async function worksModal() {
        await worksJson()
        let parentDiv = document.querySelector('.modal-gallery')
        parentDiv.innerHTML = ``

        works.forEach(i => {
            let childDiv = document.createElement("figure")
            childDiv.id = i.id
            childDiv.setAttribute('categoryid', i.categoryId)
            childDiv.setAttribute('userid', i.userId)
            childDiv.innerHTML = `
                <img loading="lazy" src="${i.imageUrl}" alt="${i.title}">
                <button imageId="${i.id}" name="trash"><i class="fa-solid fa-trash-can"></i></button>
            `
            parentDiv.appendChild(childDiv)
        });
}

async function categorieModal() {
    await categoriesJson()

    let parentDiv = document.querySelector('dialog select')
    parentDiv.innerHTML = ``

    categories.forEach(i => {
        let childDiv = document.createElement("option")
        childDiv.value = i.id
        childDiv.innerHTML = `${i.name}`
        parentDiv.appendChild(childDiv)
    });
}

function nextStep(event) {
    console.log("trying change step")

    document.querySelectorAll(`dialog article`).forEach((elem) => {
        elem.classList.toggle("d-none", true)
    })

    let target = event.target.getAttribute("step-target")
    console.log(target)

    document.querySelector(`dialog [step="${target}"]`).classList.toggle("d-none", false)

    console.log("change step")
}

let imagePreviewUrl = null

function imagePreview(event) {
    let childDiv = document.querySelector('dialog .custom-file-preview')
    childDiv.src = URL.createObjectURL(event.target.files[0])
    childDiv.classList.toggle("d-none", false)
    imagePreviewUrl = childDiv.src
}

// Form modal
async function deleteWorks(event) {
    event.preventDefault();

    let id = event.target.getAttribute("imageid")
    console.log("trying to delete ", id)

    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers : {Authorization: `Bearer ${token}`}
    })

    await worksUi()
    await worksModal()
}

async function sendWorkModal(event) {
    event.preventDefault();

    console.log("trying to add works", event)

    const formData = new FormData(event.target)


    console.log(formData)

    await fetch(event.target.action, {
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
        
    })
    .then((response) => {
        if( response.ok ) {
            console.log("work post", json)
        } else {
            console.log("work post Failed")
            document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        }
    })
    .catch((err) => {
        console.log(err)
    });
}



// Build
worksModal()
categorieModal()

setTimeout(() => {
    document.querySelectorAll(`#modal-gallery [name="trash"]`).forEach((elem) => {
        elem.addEventListener("click", deleteWorks)
    })

    document.querySelectorAll(`[step-target]`).forEach((elem) => {
        elem.addEventListener("click", nextStep)
    })

    document.querySelector('dialog input[type="file"]').addEventListener("change", imagePreview)
    
    let workForm = document.querySelector("dialog form")
    workForm.addEventListener("submit", sendWorkModal)

}, 200);



