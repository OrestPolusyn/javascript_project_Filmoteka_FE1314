'use strict';

var renderFilms;
var genres;
var pageNumber = 1;
var inputValue;
var form = document.querySelector('.homePage__form');
var input = document.querySelector('.homePage__input');
var prevBtn = document.querySelector('.js-prev');
var nextBtn = document.querySelector('.js-next');
var homePlaginationNumber = document.querySelector('.homepage__page');
var list = document.querySelector('.homePage__filmList');
var popWhenError = document.querySelector('.homePage__error');

function fetchGenres() {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f1943ebda4bde31f3353b960641d381f&language=en-US').then(function (res) {
    return res.json();
  }).then(function (data) {
    genres = data.genres;
  }).catch(function (err) {
    return console.log(err);
  });
}

fetchGenres();

function createCards(name, imgPath, year, movieId) {
  var item = document.createElement('li');
  item.classList.add('homePage__filmItem'); // const imgShadow = document.createElement('img');
  // imgShadow.classList.add('homePage__imgShadow');
  // imgShadow.setAttribute('src', './images/_Path_.png');

  var img = document.createElement('img');
  img.classList.add('homePage__img');
  img.setAttribute('src', "https:/image.tmdb.org/t/p/w500".concat(imgPath));
  var movieName = document.createElement('p');
  movieName.classList.add('homePage__movieName');
  var res = getYearFromDate(year);
  movieName.textContent = "".concat(name, " (").concat(res, ")");
  item.append(img, movieName);
  return item; //   item.addEventListener('click', activeDetailsPage);
}

function getYearFromDate(string) {
  var res = string.slice(0, 4);
  return res;
}

function getPopularMovies() {
  var fragment = document.createDocumentFragment();
  list.innerHTML = '';
  fetch("https://api.themoviedb.org/3/movie/popular?api_key=f1943ebda4bde31f3353b960641d381f&language=en-US&page=".concat(pageNumber)).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    data.results.forEach(function (el) {
      fragment.append(createCards(el.title, el.backdrop_path, el.release_date, el.id));
    });
    list.append(fragment);
    renderFilms = data.results;
  });
}

getPopularMovies();

function searchFilms(e) {
  e.preventDefault(); //   console.log(input.value);

  inputValue = input.value;
  fetchMovies();
  form.reset();
}

function fetchMovies() {
  var fragment = document.createDocumentFragment();
  list.innerHTML = '';
  fetch("https://api.themoviedb.org/3/search/movie?api_key=f1943ebda4bde31f3353b960641d381f&language=en-US&page=".concat(pageNumber, "&include_adult=false&query=").concat(inputValue)).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.results.length < 1) {
      popWhenError.classList.remove('main__hidden');
    } else {
      popWhenError.classList.add('main__hidden');
    }

    console.log(data);
    data.results.forEach(function (el) {
      console.log(createCards(el.title, el.backdrop_path, el.id));
      fragment.append(createCards(el.title, el.backdrop_path, el.id));
    });
    list.append(fragment); //   console.log(list);

    renderFilms = data.results;
  }).catch(function (err) {
    return console.log(err);
  });
}

function plaginationNavigation(e) {
  var click = Number(homePlaginationNumber.textContent); //   console.log(pageNumb.textContent);

  if (e.target.textContent === 'Next') {
    pageNumber += 1;
    homePlaginationNumber.textContent = pageNumber;
  }

  if (e.target.textContent === 'Prev') {
    pageNumber -= 1;
    homePlaginationNumber.textContent = pageNumber;
  }

  if (homePlaginationNumber.textContent === '1') {
    prevBtn.classList.add('transparent');
  } else {
    prevBtn.classList.remove('transparent');
  }

  if (homePlaginationNumber.textContent <= 1) {
    prevBtn.disabled = true;
  }

  console.log(pageNumber);
}

function pageAfterLoading() {
  if (homePlaginationNumber.textContent === '1') {
    prevBtn.classList.add('transparent');
  }
}

window.onload = pageAfterLoading;
prevBtn.addEventListener('click', plaginationNavigation);
prevBtn.addEventListener('click', getPopularMovies);
nextBtn.addEventListener('click', plaginationNavigation);
nextBtn.addEventListener('click', getPopularMovies);
form.addEventListener('submit', searchFilms);
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