// write your code here
fetchRamens().then(data => {data.forEach(ramen => {
    renderDetails(data[0])
    renderRamen(ramen)
})})

document.getElementById('new-ramen').addEventListener('submit', (e) => {
    e.preventDefault()
    const ramen = {}
    const form = e.target

    ramen[form["name"].name] = form["name"].value
    ramen[form["restaurant"].name] = form["restaurant"].value
    ramen[form["image"].name] = form["image"].value
    ramen[form["rating"].name] = form["rating"].value
    ramen[form["new-comment"].name] = form["new-comment"].value
    renderRamen(ramen)
})

document.getElementById('edit-button').addEventListener('click', () => {
    const form = document.getElementById('edit-ramen')
    let formVal = form.style.display
    form.style.display = formVal === "none" ? "block" : "none"
})

document.getElementById('delete-button').addEventListener('click', () => {
    removeRamen()
})

document.getElementById('edit-ramen').addEventListener('submit', (e) => {
    e.preventDefault()
    const rating = document.querySelector('#rating-display')
    const comment = document.querySelector('#comment-display')
    rating.textContent = e.target["rating"].value
    comment.textContent = e.target["new-comment"].value
    document.getElementById('edit-ramen').reset()
})

function fetchRamens() {
    return fetch('http://localhost:3000/ramens').then(res => res.json())
}

function renderRamen(ramen) {
    const container = document.getElementById('ramen-menu')
    const image = document.createElement('img')
    image.addEventListener('click', () => {
        renderDetails(ramen)
    })
    image.src = ramen.image
    container.append(image)
}

function renderDetails(ramen) {
    const container = document.getElementById('ramen-detail')
    const image = container.querySelector('.detail-image')
    const name = container.querySelector('.name')
    const restaurant = container.querySelector('.restaurant')
    const rating = document.querySelector('#rating-display')
    const comment = document.querySelector('#comment-display')

    image.src = ramen.image
    name.textContent = ramen.name
    restaurant.textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment
    document.getElementById('edit-ramen').reset()
}

function removeRamen() {
    const imageContainer = document.getElementById('ramen-menu')
    const container = document.getElementById('ramen-detail')
    const image = container.querySelector('.detail-image')
    const name = container.querySelector('.name')
    const restaurant = container.querySelector('.restaurant')
    const rating = document.querySelector('#rating-display')
    const comment = document.querySelector('#comment-display')

    let child = null
    let i = 0

    while (child === null && i<imageContainer.children.length) {
        if (imageContainer.children[i].src === image.src) {
            child = imageContainer.children[i]
        }
        i++
    }

    
    child ? imageContainer.removeChild(child) : null
    image.src = "./assets/image-placeholder.jpg"
    name.textContent = "Insert Name Here"
    restaurant.textContent = "Insert Restaurant Here" 
    rating.textContent = "Insert rating here" 
    comment.textContent = "Insert comment here" 


}
