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

worksModal()

// document.querySelector(`#modal-gallery [name="next"]`).addEventListener("click", nextStep)
setTimeout(() => {
    document.querySelectorAll(`#modal-gallery [name="trash"]`).forEach((elem) => {
        elem.addEventListener("click", deleteWorks)
    })
}, 200);



