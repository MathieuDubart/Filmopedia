
const imgLink = document.querySelector('#imgSrc')
const imgTitle = document.querySelector('#movieTitle')
const movieGallery = document.getElementById('movieGallery')
const categorySelector = document.getElementById("category-select")
const submitButton = document.getElementById("formSubmitButton")

let allMovies = []
let allCategories = []

fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/moviesApi/api/v1/movies")
.then(res=>res.json())
.then(val=> {
    val.map(movie=>allMovies.push(movie))
    console.log(allMovies)
    movieIntegration()
})

fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/moviesApi/api/v1/categories")
.then(res=>res.json())
.then(val=>{
    val.map(categorie=>allCategories.push(categorie))
    console.log(allCategories)
    categoryIntegration()
})

const movieIntegration =() => {
    allMovies.map(movie=> {
        movieGallery.innerHTML += `<div class="imgContainer"> <img src="${movie.img}" alt="${movie.name}"> <a href="${movie.video}" target="_blank"> <div class="titleContainer"> <div class="movieTitle"> ${movie.name} </div> </div> </a> </div>`
    })
}

const categoryIntegration = () => {
    allCategories.map(category=>{
        categorySelector.innerHTML += `<option value="${category.id}">${category.name}</option>`
    })
}

const submit = (e) => {
    e.preventDefault()
    let movieName = document.getElementById("movieName").value
    let movieAuthor = document.getElementById("movieAuthor").value
    let movieImg = document.getElementById("movieImg").value
    let movieVideo = document.getElementById("movieVideo").value
    let movieDescription = document.getElementById("movieDescription").value
    let movieCategory = document.getElementById("category-select").value
 
    axios.post("https://europe-west3-gobelins-9079b.cloudfunctions.net/moviesApi/api/v1/movies/", {
        name: movieName,
        author: movieAuthor,
        img: movieImg,
        video: movieVideo,
        category: movieCategory,
        description: movieDescription,
    })
}

submitButton.addEventListener("click", e => submit(e))
