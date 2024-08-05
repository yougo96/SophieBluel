// Toggle modal
function toggleModal(event) {
    const modal = document.getElementById(event.currentTarget.dataset.target)
    if (!modal) return
    modal && (modal.open ? modal.close() : modal.showModal());
}

// Step manager
function goToStep(event, customStep) {
    let step = null
    if (event != undefined || event != null) {
        step = event.currentTarget.dataset.target
    } else {
        step = customStep
    }

    if (step) { 
        console.log(step)

        document.querySelectorAll(`dialog article`).forEach(i => {
            i.classList.toggle("d-none", true)
        })
        document.querySelector(`dialog [step="${step}"]`).classList.toggle("d-none", false)
    }
}

// UI modal
async function worksModal() {
    await worksJson()
    let parentDiv = document.querySelector('.modal-gallery')
    parentDiv.innerHTML = ``

    works.forEach(i => {
        let childDiv = `
        <figure id="${i.id}" categoryid="${i.categoryId}" userid="${i.userId}">
            <img loading="lazy" src="${i.imageUrl}" alt="${i.title}">
            <button class="button-absolute" imageId="${i.id}" name="trash" onclick="deleteWorks(event)"><i class="fa-solid fa-trash-can"></i></button>
        </figure>
        `
        parentDiv.insertAdjacentHTML("beforeend", childDiv)
    });
}

async function categorieModal() {
    await categoriesJson()

    let parentDiv = document.querySelector('dialog select')
    parentDiv.innerHTML = `
        <option disabled selected value>- selectionner une categorie -</option>
        `

    categories.forEach(i => {
        let childDiv = `
        <option id="${i.id}" value="${i.id}">
            ${i.name}
        </option>
        `
        parentDiv.insertAdjacentHTML("beforeend", childDiv)
    });
}


function imagePreview(event) {

    let childDiv = document.querySelector('dialog .form-file-preview')

    let imageFile = event.target.files[0]

    console.log(imageFile)
    console.log(event.target)

    if ( 
        (imageFile != undefined || imageFile != null)
        && childDiv
        && (imageFile.type == "image/png" || imageFile.type == "image/jpeg")
        && imageFile.size < 4705078
    ) {
        childDiv.src = URL.createObjectURL(imageFile)
        childDiv.classList.toggle("d-none", false)
        document.querySelector('dialog .form-file-label').setAttribute("role", "")
    } else {
        childDiv.src = ""
        childDiv.classList.toggle("d-none", true)
        document.querySelector('dialog .form-file-label').setAttribute("role", "alert")
        document.querySelector('#image').value = ""
        // workModalForm.reset()
    }
}

// Form modal
async function deleteWorks(event) {
    event.preventDefault();

    const formDataCheck = checkInputForm("delete")
    if (!formDataCheck) {
        console.log("delete invalid, not logged in")
        return
    }

    let id = event.target.getAttribute("imageid")

    await fetch( apiUrl + `works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(
            await worksUi(),
            await worksModal()
        )
        .catch((err) => {
            console.log("work delete fetch error", err)
        })
}

async function sendWorkModal(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    const formDataCheck = checkInputForm("post", formData)
    if (!formDataCheck) {
        console.log("work formData invalid or not logged in")
        document.querySelector(`[role="alert"]`).classList.toggle("d-none", false)
        return
    }

    await fetch( apiUrl + `works`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData

        })
        .then((response) => {
            if (response.ok) {
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
    goToStep(null, 1)
    if (document.querySelector('dialog .form-file-preview')) document.querySelector('dialog .form-file-preview').classList.toggle("d-none", true)
    workModalForm.reset()
    document.querySelector('dialog .form-file-preview').src = ""
    document.querySelector("dialog").close()
}

// Build modal
worksModal()
categorieModal()

// Event listener
document.querySelector("#edit").addEventListener("click", toggleModal)
document.querySelector("#modal-example").addEventListener("click", (event) => {if(event.target == event.currentTarget) event.target.close()})
document.querySelectorAll(".goToStep").forEach(i => 
    i.addEventListener("click", goToStep)
)
document.querySelectorAll("[aria-label='Close']").forEach(i => 
    i.addEventListener("click", toggleModal)
)
document.querySelector("#image").addEventListener("change", imagePreview)

let workModalForm = document.querySelector("dialog #workModalForm")
if (workModalForm) {
    workModalForm.addEventListener("submit", sendWorkModal)
} else {
    console.log("workModalForm not found")
}