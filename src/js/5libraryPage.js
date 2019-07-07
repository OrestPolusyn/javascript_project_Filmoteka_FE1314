const cardLibrary = document.querySelector('.library-list');

function drawWatchedFilmList() {
    buttonWatch.classList.add('library__btn--active');
    buttonQueue.classList.remove('library__btn--active');
    cardLibrary.innerHTML = "";
    const local = JSON.parse(localStorage.getItem('filmsWatched'));
    let fragment = document.createDocumentFragment();
    local.forEach(el =>
        fragment.append(createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average)),
    );
    cardLibrary.append(fragment);
}

function drawQueueFilmList() {
    buttonWatch.classList.remove('library__btn--active');
    buttonQueue.classList.add('library__btn--active');
    cardLibrary.innerHTML = "";
    const local = JSON.parse(localStorage.getItem("filmsQueue"));
    let fragment = document.createDocumentFragment();
    local.forEach(el => fragment.append(createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average)));
    cardLibrary.append(fragment);
}

function createLibraryCardFunc(name, imgPath, movieId, voteAverage) {
    const item = document.createElement('li');
    item.classList.add('homePage__filmItem');
  
    const img = document.createElement('img');
    img.classList.add('homePage__img');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);
  
    const movieName = document.createElement('p');
    movieName.classList.add('homePage__movieName');
    movieName.textContent = name;

    const voteFilm = document.createElement('p');
    voteFilm.classList.add('library__vote');
    voteFilm.textContent = voteAverage;
  
    item.append(img, movieName, voteFilm);
  
    item.addEventListener('click', () => activeDetailsPage(movieId, true));
  
    return item;
  }