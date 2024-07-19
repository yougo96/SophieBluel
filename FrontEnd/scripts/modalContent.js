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
                <button class="button-absolute" imageId="${i.id}" name="trash" onclick="deleteWorks(event)"><i class="fa-solid fa-trash-can"></i></button>
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


function imagePreview(event) {

    let childDiv = document.querySelector('dialog .form-file-preview')
    let imageSize = event.target.files[0].size

    if (imageSize < 4705078 && childDiv) {
        childDiv.src = URL.createObjectURL(event.target.files[0])
        childDiv.classList.toggle("d-none", false)
        document.querySelector('dialog .form-file-label').setAttribute("role", "")
    } else {
        childDiv.src = ""
        childDiv.classList.toggle("d-none", true)
        document.querySelector('dialog .form-file-label').setAttribute("role", "alert")
        workModalForm.reset()
    }
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
    .then(
        await worksUi(),
        await worksModal()
    )
}

async function sendWorkModal(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    await fetch(event.target.action, {
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
        
    })
    .then((response) => {
        if( response.ok ) {
            console.log("work post success", response)
            resetIndex()
        } else {
            console.log("work post bad response", response)
            document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        }
    })
    .catch((err) => {
        console.log("work post fetch error", err)
        document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
    })
    
}

async function resetIndex() {
    await worksUi()
    await worksModal()
    goToStep(1)
    if(document.querySelector('dialog .form-file-preview')) document.querySelector('dialog .form-file-preview').classList.toggle("d-none", true)
    workModalForm.reset()
    document.querySelector('dialog .form-file-preview').src = ""
    document.querySelector("dialog").close()
}



// Build
worksModal()
categorieModal()

let workModalForm = document.querySelector("dialog #workModalForm")
if (workModalForm) { workModalForm.addEventListener("submit", sendWorkModal) } else { console.log("workModalForm not found") }
