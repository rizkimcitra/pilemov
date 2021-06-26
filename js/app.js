const body = document.body;
// Initialize body that assigned to variable body

const infoBtn = document.querySelector(".content__info");
// initialize ( info icon ) that assigned to infoBtn

infoBtn.addEventListener("click", function () {
  // infoBtn got an event click then run the function
  this.classList.toggle("shifted");
  // the infoBtn has added a new class shifted
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("shifted");
  // get a element with class sidebar and assigned it to variable sidebar
  // and then sidebar will have toggle class named shifted
  const header = document.querySelector("header");
  header.classList.toggle("shifted");
  // get a element header and assigned it to variable header
  // and then header will have toggle class named shifted

  const main = document.querySelector("main");
  main.classList.toggle("shifted");
  // get a element main and assigned it to variable main
  // and then main will have toggle class named shifted
});

const modalArea = document.querySelector(".modal");
// Initialize modal element then assign it to variable modalArea

function closeModal(e) {
  // create a function called e that represent for "event" later will be used
  const btnCloseModal = document.querySelector(".close__modal");
  const backdropModal = document.querySelector(".modal__backdrop");
  const modalArea = document.querySelector(".modal__container");
  // initialize all element above, each element have their own variable name

  if (e.target.className === backdropModal.className || e.target.className === btnCloseModal.className) {
    // e represents the event, so if the event and the target have the same class name as the previously initialized variable, then run the function below
    this.classList.remove("show");
    // this keyword represent the element that have event click later
    modalArea.classList.remove("show");
    // the modal area will remove class named show
    body.classList.remove("modalIsOpen");
    // the body will remove class named show
  }
}
modalArea.addEventListener("click", closeModal);
//call the prvious function on this event

body.addEventListener("click", async function (e) {
  // the body represent document.body that previosly has been initalized to variable body
  // this event has Asynghcronous and have parameter called e represent event

  if (e.target.classList.contains("btn__detail")) {
    // if the e target contains classlist btn__detail then then run the function below
    const modalContainer = document.querySelector(".modal__container");
    // initialize element that have class name modal__container and assign it to variable modalContainer
    modalArea.classList.add("show");
    // modalArea represent an element that has the class name modal, (previously has been assigned to variable modalArea), and now class show has been added to the element
    modalContainer.classList.add("show");
    // class show will be added to modalContainer that represent an element that has the class name modal__container
    body.classList.add("modalIsOpen");
    // the element body has been added a class named modalIsOpen to get a new styling from the CSS

    const imdbid = e.target.dataset.imdbid;
    //take the data attribute on the target element
    const movieDetail = await getMovieDetail(imdbid);
    // assign getMovieDetail function to variable movieDetail, the function carrried the parameter contain data attribute and running on asynchronous
    updateUIDetail(movieDetail);
    // call updateUIDetail function that carried data from movie detail
  }
  if (e.target.className === "bannerHero__backdrop" || e.target.className === "close") {
    document.querySelector(".bannerHero").remove();
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
  // if (document.querySelector(".movie__cover").src == "N/A") {
  //   console.log("a");
  // }
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
