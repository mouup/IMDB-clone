const movieTitle = localStorage.getItem('movieTitle');
const apiKey = '539a82cf';
const title = document.querySelector('.movie-title');
const year = document.querySelector('.year');
const runTime = document.querySelector('.running-time');
const rating = document.querySelector("#rating");
const poster = document.querySelector("#movie-poster");
const plot = document.querySelector("#plot");
const directors = document.querySelector("#directors");
const cast = document.querySelector("#cast");
const genre = document.querySelector("#genre");

fetchAPIMovieDetails(movieTitle);

// api call to get movie details with title as parameter
async function fetchAPIMovieDetails(t) {
    const apiURL = `https://www.omdbapi.com/?t=${t}&page=1&apikey=${apiKey}`;

    const response = await fetch(apiURL);
    movieDetails = await response.json();

    if(movieDetails) {
        title.innerHTML = movieTitle;
        year.textContent = movieDetails.Year;
        runTime.textContent = movieDetails.Runtime;
        rating.textContent = `${movieDetails.imdbRating}/10`;
        poster.src = movieDetails.Poster;
        plot.textContent = movieDetails.Plot;
        directors.textContent = movieDetails.Director;
        cast.textContent = movieDetails.Actors;

        const genreList = movieDetails.Genre.split(',');
        genreList.forEach(element => {
            const span = document.createElement('span');
            span.classList.add('genre-style');
            span.textContent = element;

            genre.appendChild(span);
        });
    }
}