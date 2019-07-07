const cardLibrary = document.querySelector('.library-list');
const buttonWatch = document.querySelector('.library__btn--watch');
const buttonQueue = document.querySelector('.library__btn--queue');

buttonWatch.addEventListener('click', drawWatchedFilmList);
buttonQueue.addEventListener('click', drawQueueFilmList);

// ============
const settings = [{
    poster_path: 'dark',
    title: "cvjfsdkjg",
    id: 1,
    vote_average: 7.5
},
{
    poster_path: 'fgdf',
    title: "fgfdg",
    id: 4,
    vote_average: 56
}];

localStorage.setItem("settings", JSON.stringify(settings));

// ==========

function drawWatchedFilmList(ev) {
    if (ev.target.nodeName != 'BUTTON') return;

    const local = JSON.parse(localStorage.getItem('settings'));
    local.forEach(el =>
        createLibraryCardFunc(el.poster_path, el.title, el.id, el.vote_average),
    );
}

function drawQueueFilmList(ev) {
    

    buttonWatch.classList.remove('library__btn--active');
    buttonQueue.classList.add('library__btn--active');

    if (ev.target.nodeName != "BUTTON") return;

    const local = JSON.parse(localStorage.getItem("filmsQueue"));
    local.forEach(el => createLibraryCardFunc(el.poster_path, el.title, el.id, el.vote_average))

}

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
    const li = document.createElement('li');
    li.classList.add('library__list-item');
    cardLibrary.append(li);

    const imgFilm = document.createElement('img');
    imgFilm.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);
    imgFilm.setAttribute('alt', 'poster film');
    li.append(imgFilm);

    const voteFilm = document.createElement('p');
    voteFilm.classList.add('library__vote');
    voteFilm.textContent = voteAverage;
    li.append(voteFilm);

    const titleFilm = document.createElement('p');
    titleFilm.classList.add('library__nameFilm');
    li.append(titleFilm);
    titleFilm.textContent = filmTitle;
    console.log(cardLibrary);
}