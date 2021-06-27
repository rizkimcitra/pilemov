const body = document.body;
const infoBtn = document.querySelector(".content__info");

infoBtn.addEventListener("click", function (e) {
  
  this.classList.toggle("shifted");
  
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("shifted");
  
  const header = document.querySelector("header");
  header.classList.toggle("shifted");

  const main = document.querySelector("main");
  main.classList.toggle("shifted");

  const searchBar = document.querySelector(".search__bar");
  searchBar.classList.toggle("hidden");

  const asideBackdrop = document.querySelector(".aside__backdrop");
  asideBackdrop.classList.toggle("hidden");
});

const modalArea = document.querySelector(".modal");

function closeModal(e) {
  const btnCloseModal = document.querySelector(".close__modal");
  const backdropModal = document.querySelector(".modal__backdrop");
  const modalArea = document.querySelector(".modal__container");

  if (e.target.className === backdropModal.className || e.target.className === btnCloseModal.className) {
    
    this.classList.remove("show");
    modalArea.classList.remove("show");
    body.classList.remove("modalIsOpen");
    
  }
}
modalArea.addEventListener("click", closeModal);

body.addEventListener("click", async function (e) {

  if (e.target.classList.contains("btn__detail")) {
    
    const modalContainer = document.querySelector(".modal__container");
    modalArea.classList.add("show");
    modalContainer.classList.add("show");
    body.classList.add("modalIsOpen");

    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }

  if (e.target.className === "bannerHero__backdrop" || e.target.className === "close") {
    
    document.querySelector(".bannerHero").remove();
  }

  const asideBackdrop = document.querySelector(".aside__backdrop");
  
  if (e.target.className === asideBackdrop.className) {
    
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const searchBar = document.querySelector(".search__bar");

    infoBtn.classList.remove("shifted");
    asideBackdrop.classList.remove("hidden");
    header.classList.remove("shifted");
    sidebar.classList.remove("shifted");
    main.classList.remove("shifted");
    searchBar.classList.remove("hidden");
  }
});

const searchMovie = document.getElementById("search__movies");
searchMovie.addEventListener("submit", async function (e) {
  
  const inputKeyword = document.getElementById("search");
  e.preventDefault();

  const movies = await getMovies(inputKeyword.value);
  if (movies === undefined) {
    
    const container = document.querySelector(".movies__list");
    let greet = `<p>hmm🤔, couldn't find that Movies, TV Series or Animes, try another title!</p>`;
    container.innerHTML = greet;
    
  } else {
    
    updateUI(movies);
  }
});

function updateUI(movies) {
  
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));

  const movieContainer = document.querySelector(".movies__list");
  movieContainer.innerHTML = cards;
}

function updateUIDetail(m) {
  
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal__container");
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  
  return fetch("https://www.omdbapi.com/?apikey=925caaea&s=" + keyword)
    .then((r) => r.json())
    .then((r) => r.Search);
}
function getMovieDetail(imdbid) {
  
  return fetch("https://www.omdbapi.com/?apikey=925caaea&i=" + imdbid)
    .then((r) => r.json())
    .then((m) => m);
}

function showCards(m) {
  return `<div class="item">
    <img src="${m.Poster}" onerror="this.src='../icons/404.svg'" alt="Movie Thumbnail" class='movie__cover'/>
    <div class="item__description">
      <h5 class="title">${m.Title}</h5>
      <span class="year__released">${m.Year}</span>
      <button class="btn__detail" data-imdbid="${m.imdbID}">Details</button>
    </div>
  </div>`;
}

function showMovieDetail(m) {
  return `<div class="cover">
            <img src="${m.Poster}" onerror="this.src='../icons/404.svg'" alt="Movie Cover" />
          </div>
          <ul class="movie__detail">
            <li><h5>${m.Title}</h5></li>
            <li><span>Released : </span>${m.Released}</li>
            <li><span>Genre : </span>${m.Genre}</li>
            <li><span>Director : </span>${m.Director}</li>
            <li><span>Actors : </span>${m.Actors}</li>
            <li><span>Country : </span>${m.Country}</li>
            <li><span>Languages : </span>${m.Language}</li>
            <li><span>Plot : </span><br />${m.Plot}.</li>
            <li><button class="close__modal">Close</button></li>
          </ul>`;
}

const switcher = document.querySelector(".switcher");
switcher.addEventListener("click", function () {
  
  body.classList.toggle("lightMode");
  this.classList.toggle("switched");
});
