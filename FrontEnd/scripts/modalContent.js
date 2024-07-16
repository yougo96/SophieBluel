async function worksModal() {
    await fetch("http://localhost:5678/api/works").then((res) => {return res.json()}).then((obj) => {

        let parentDiv = document.querySelector('.modal-gallery')
        obj.forEach(i => {
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
    })
}

async function deleteWorks(event) {
    event.preventDefault();

    let id = event.target.getAttribute("imageid")
    console.log("trying to delete ", id)

    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers : {Authorization: `Bearer ${token}`}
    })
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

worksModal()

setTimeout(() => {
    document.querySelectorAll(`#modal-gallery [name="trash"]`).forEach((elem) => {
        elem.addEventListener("click", deleteWorks)
    })

    document.querySelectorAll(`[step-target]`).forEach((elem) => {
        elem.addEventListener("click", nextStep)
    })
}, 200);



