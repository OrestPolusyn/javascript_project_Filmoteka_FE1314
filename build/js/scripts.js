"use strict";
"use strict";
"use strict";

var homePageBtn = document.querySelector('#homePage-js');
var myLibraryPageBtn = document.querySelector('#myLibraryPage-js');
var detailsPageShown = document.querySelector('.detalisPage__block');
var myLibraryPageShown = document.querySelector('#myFilmLibraryPage__block');
var homePageShown = document.querySelector('.homePage__block');
var selectFilm = {};
window.onload = showHomePage();
homePageBtn.addEventListener('click', showHomePage);
myLibraryPageBtn.addEventListener('click', showLibraryPage);

function showHomePage() {
  myLibraryPageShown.classList.add('main__hidden');
  detailsPageShown.classList.add('main__hidden');
  homePageShown.style.display = 'block';
  homePageBtn.classList.add('nav-list__item-hover');
  myLibraryPageBtn.classList.remove('nav-list__item-hover');
}

function showLibraryPage() {
  homePageShown.classList.add('main__hidden');
  detailsPageShown.classList.add('main__hidden');
  myLibraryPageShown.classList.remove('main__hidden');
  myLibraryPageBtn.classList.add('nav-bar__link-hover');
  homePageBtn.classList.remove('nav-bar__link-hover');
} // function activeDetailsPage(ev) {
//     homePageShown.classList.remove('main__hidden');
//     detailsPageShown.classList.add('main__hidden');
//     myLibraryPageShown.classList.add('main__hidden');
//     let id = ev.target.getAttribute('alt');
//     let ApiLink = `https://api.themoviedb.org/3/movie/${id}?api_key=f1943ebda4bde31f3353b960641d381f`;
//     fetch(ApiLink)
//         .then(Response => Response.json())
//         .then(data => {
//             selectFilm = data;
//             homePageShown.classList.add('main__hidden');
//             detailsPageShown.classList.remove('main__hidden');
//             myLibraryPageShown.classList.add('main__hidden')';
//             showDetails(selectFilm);
//         })
//         .catch(error => console.log(error));
// }
"use strict";
"use strict";

var cardLibrary = document.querySelector('.library-list');
var buttonWatch = document.querySelector('.library__btn--watch');
var buttonQueue = document.querySelector('.library__btn--queue');
buttonWatch.addEventListener('click', drawWatchedFilmList);
buttonQueue.addEventListener('click', drawQueueFilmList); // ============

var settings = [{
  poster_path: 'dark',
  title: "cvjfsdkjg",
  id: 1,
  vote_average: 7.5
}, {
  poster_path: 'fgdf',
  title: "fgfdg",
  id: 4,
  vote_average: 56
}];
localStorage.setItem("settings", JSON.stringify(settings)); // ==========

function drawWatchedFilmList(ev) {
  if (ev.target.nodeName != 'BUTTON') return;
  var local = JSON.parse(localStorage.getItem('settings'));
  local.forEach(function (el) {
    return createLibraryCardFunc(el.poster_path, el.title, el.id, el.vote_average);
  });
}

function drawQueueFilmList(ev) {
  buttonWatch.classList.remove('library__btn--active');
  buttonQueue.classList.add('library__btn--active');
  if (ev.target.nodeName != "BUTTON") return;
  var local = JSON.parse(localStorage.getItem("filmsQueue"));
  local.forEach(function (el) {
    return createLibraryCardFunc(el.poster_path, el.title, el.id, el.vote_average);
  });
}

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  var li = document.createElement('li');
  li.classList.add('library__list-item');
  cardLibrary.append(li);
  var imgFilm = document.createElement('img');
  imgFilm.setAttribute('src', "https://image.tmdb.org/t/p/w500".concat(imgPath));
  imgFilm.setAttribute('alt', 'poster film');
  li.append(imgFilm);
  var voteFilm = document.createElement('p');
  voteFilm.classList.add('library__vote');
  voteFilm.textContent = voteAverage;
  li.append(voteFilm);
  var titleFilm = document.createElement('p');
  titleFilm.classList.add('library__nameFilm');
  li.append(titleFilm);
  titleFilm.textContent = filmTitle;
  console.log(cardLibrary);
}