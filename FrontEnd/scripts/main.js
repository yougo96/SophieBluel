// === Fetch /works ========================================================================
try {

fetch("http://localhost:5678/api/works").then((res) => {return res.json()}).then((obj) => {

        console.log(obj)
        let galleryDiv = document.querySelector('.gallery')
        obj.forEach(i => {
            let workDiv = document.createElement("figure")
            workDiv.innerHTML = `
            <figure>
                <img src="${i.imageUrl}" alt="${i.title}">
                <figcaption>${i.title}</figcaption>
            </figure>
            `
            galleryDiv.appendChild(workDiv)
        });
})

}
catch(error) {
    console.error("ERROR : ", error);
}