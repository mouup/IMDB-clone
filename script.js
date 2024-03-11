const apiKey = '539a82cf';

const searchBox = document.getElementById('search-input');
const movieDisplay = document.getElementById('display-section');
const favIcon = document.getElementById('fav-icon');
const favList = document.getElementById('fav-list');



window.addEventListener('load', moveToFavourites);

async function fetchAPISearchResults(queryTerm) {
    let searchResults;
    const apiURL = `https://www.omdbapi.com/?s=${queryTerm}&page=1&apikey=${apiKey}`;

    const response = await fetch(apiURL);
    searchResults = await response.json();

    if (searchResults && searchResults.Response === 'True') {
        displayMovieTiles(searchResults.Search);
    }
}

function getSearchResults() {
    const queryTerm = searchBox.value;

    if (queryTerm) {
        fetchAPISearchResults(queryTerm);
        movieDisplay.style.display = 'flex';
    } else {
        movieDisplay.style.display = 'none';
    }

}

function displayMovieTiles(searchResults) {
    movieDisplay.innerHTML = '';
    searchResults.forEach(element => {

        const movieCard = document.createElement('div');
        movieCard.innerHTML = `<div class="movie-card">
        <a href="movie-details.html" >
            <img class="movie-poster" src="${element.Poster}">
        </a>
        <div class="movie-footer">
        <span>${element.Title}</span><i id="fav-icon" onclick="storeFavourites(this)" class="fa-solid fa-heart-circle-plus" aria-hidden="true"></i>
        </div>
        </div>`;
        // movieCard.href = 'movie-details.html';

        movieDisplay.appendChild(movieCard);
    });

}

async function storeFavourites(title) {
    let movieDetails;
    const movieTitle = title.previousSibling.textContent;

    const apiURL = `https://www.omdbapi.com/?t=${movieTitle}&page=1&apikey=${apiKey}`;

    const response = await fetch(apiURL);
    movieDetails = await response.json();


    if (movieDetails) {
        let movieExists = false;
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        favourites.forEach(fav => {
            if (fav['key'] === movieDetails.Title) {
                movieExists = true;
                alert('Movie exists in Favourite collection!');

            }
        })

        if (!movieExists) {
            favourites.push({
                key: movieDetails.Title,
                value: movieDetails
            });
        }

        localStorage.setItem('favourites', JSON.stringify(favourites));


    }

    // console.log(Array.from(JSON.parse(localStorage.getItem('favourites'))));

    moveToFavourites();
}


async function moveToFavourites() {
    favList.innerHTML = '';
    const favourites = JSON.parse(localStorage.getItem('favourites'));


    favourites.forEach(movie => {
        let movieDetails = movie.value;

        let poster = movieDetails.Poster != 'N/A' ? movieDetails.Poster : 'assets/img-not-found.png';
        const favItem = document.createElement('div');

        favItem.innerHTML = `<div class="fav-item">
            <div class="poster-element">
                <img src="${poster}" alt="">
            </div>
            <div class="movie-details">
                <div class="title-section">
                    <p class="title">${movieDetails.Title}</p>
                    <i onclick="removeFromFavourites(this)" id="remove-fav" class="fa-solid fa-heart-circle-minus"></i>
                </div>
                <p class="year">${movieDetails.Year}</p>
            </div>
        </div>`;

        favList.appendChild(favItem);
    })
}

function removeFromFavourites(fav) {
    console.log(fav);
    const favTitle = fav.previousElementSibling.textContent;
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    const movieIdx = favourites.findIndex(x => x.key === favTitle);
    favourites.splice(movieIdx, 1);

    localStorage.setItem('favourites', JSON.stringify(favourites));

    moveToFavourites();

}

document.addEventListener('click', function (event) {
    console.log(event);
    if(event.target.classList.contains('movie-poster')) {
        let movieTitle = event.target.parentElement.nextElementSibling.children[0].textContent;
        localStorage.setItem('movieTitle', movieTitle);
    }   
})
