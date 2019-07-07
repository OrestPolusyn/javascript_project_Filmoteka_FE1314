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
  item.classList.add('homePage__filmItem');
  var img = document.createElement('img');
  img.classList.add('homePage__img');
  img.setAttribute('src', "https:/image.tmdb.org/t/p/w500".concat(imgPath));
  var movieName = document.createElement('p');
  movieName.classList.add('homePage__movieName');
  var res = getYearFromDate(year);
  movieName.textContent = "".concat(name, " (").concat(res, ")");
  item.append(img, movieName);
  item.addEventListener('click', function () {
    return activeDetailsPage(movieId, false);
  });
  return item;
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
    // console.log(data.results);
    data.results.forEach(function (el) {
      fragment.append(createCards(el.title, el.backdrop_path, el.release_date, el.id));
    });
    list.append(fragment);
    renderFilms = data.results;
  });
}

getPopularMovies();

function searchFilms(e) {
  e.preventDefault();
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

    data.results.forEach(function (el) {
      // console.log(createCards(el.title, el.backdrop_path, el.id));
      fragment.append(createCards(el.title, el.backdrop_path, el.release_date, el.id));
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var homePageBtn = document.querySelector('#homePage-js');
var myLibraryPageBtn = document.querySelector('#myLibraryPage-js');
var detailsPage = document.querySelector('.detalisPage__block');
var myLibraryPage = document.querySelector('.myFilmLibraryPage__block');
var homePage = document.querySelector('.homePage__block');
var formSearch = document.querySelector('.homePage__form');
var homePageBtnLogo = document.querySelector('.header-logo');
var selectFilm = {};
var buttonWatch = document.querySelector('#js-buttonWatchedFilms');
var buttonQueue = document.querySelector('#js-buttonQueueFilms');
window.onload = showHomePage();
homePageBtn.addEventListener('click', showHomePage);
myLibraryPageBtn.addEventListener('click', showLibraryPage);
homePageBtnLogo.addEventListener('click', showHomePage);

function showHomePage() {
  myLibraryPage.classList.add('main__hidden');
  detailsPage.classList.add('main__hidden');
  formSearch.classList.remove('main__hidden');
  homePage.classList.remove('main__hidden');
  homePageBtn.classList.add('nav-list__item-hover');
  myLibraryPageBtn.classList.remove('nav-list__item-hover');
}

function showLibraryPage() {
  homePage.classList.add('main__hidden');
  detailsPage.classList.add('main__hidden');
  formSearch.classList.add('main__hidden');
  myLibraryPage.classList.remove('main__hidden');
  myLibraryPageBtn.classList.add('nav-bar__link-hover');
  homePageBtn.classList.remove('nav-bar__link-hover');
  buttonWatch.addEventListener('click', drawWatchedFilmList);
  buttonQueue.addEventListener('click', drawQueueFilmList);
  drawQueueFilmList();
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  homePage.classList.add('main__hidden');
  detailsPage.classList.remove('main__hidden');
  myLibraryPage.classList.add('main__hidden');

  if (itsLibraryFilm) {
    var allLocalStorageFilms = [];

    if (localStorage.getItem('filmsQueue') !== null) {
      allLocalStorageFilms.push.apply(allLocalStorageFilms, _toConsumableArray(JSON.parse(localStorage.getItem('filmsQueue'))));
    }

    ;

    if (localStorage.getItem('filmsWatched') !== null) {
      allLocalStorageFilms.push.apply(allLocalStorageFilms, _toConsumableArray(JSON.parse(localStorage.getItem('filmsWatched'))));
    }

    ;
    selectFilm = allLocalStorageFilms.find(function (el) {
      return el.id === movieId;
    });
  } else {
    selectFilm = renderFilms.find(function (el) {
      return el.id === movieId;
    });
  }

  showDetails(selectFilm);
  var buttonAddRemoveToWatched = document.querySelector('#watch');
  var buttonAddRemoveToQueue = document.querySelector('#queue');
  buttonAddRemoveToWatched.addEventListener('click', toggleToWatched);
  buttonAddRemoveToQueue.addEventListener('click', toggleToQueue);
  buttonWatch.removeEventListener('click', drawWatchedFilmList);
  buttonQueue.removeEventListener('click', drawQueueFilmList);
}
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var detalis = document.querySelector('.detalisPage__block');

function monitorButtonStatusText() {
  var iconQueue = document.querySelector('.film-card__icon-queue');
  var btnToQueue = document.querySelector('.js-to-queue');
  var iconWatched = document.querySelector('.film-card__icon-watch');
  var btnToWatched = document.querySelector('.js-to-watched');
  var lsWatchedList = JSON.parse(localStorage.getItem('filmsWatched'));

  if (lsWatchedList !== null) {
    if (lsWatchedList.find(function (el) {
      return el.id === selectFilm.id;
    })) {
      iconWatched.textContent = '🗑️';
      btnToWatched.textContent = 'Delete from watched';
    } else {
      iconWatched.textContent = '📽️';
      btnToWatched.textContent = 'Add to watched';
    }
  }

  var lsQueueList = JSON.parse(localStorage.getItem('filmsQueue'));

  if (lsQueueList !== null) {
    if (lsQueueList.find(function (el) {
      return el.id === selectFilm.id;
    })) {
      iconQueue.textContent = '➖';
      btnToQueue.textContent = 'Delete from queue';
    } else {
      iconQueue.textContent = '➕';
      btnToQueue.textContent = 'Add to queue';
    }
  }
}

function toggleToWatched() {
  monitorButtonStatusText();
  var watchedList = [];
  var lsWatchedList = JSON.parse(localStorage.getItem('filmsWatched'));

  if (lsWatchedList !== null) {
    watchedList = _toConsumableArray(lsWatchedList);
  }

  if (watchedList.find(function (el) {
    return el.id === selectFilm.id;
  })) {
    watchedList = watchedList.filter(function (el) {
      return el.id !== selectFilm.id;
    });
  } else {
    watchedList.push(selectFilm);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(watchedList));
  monitorButtonStatusText();
}

function toggleToQueue() {
  monitorButtonStatusText();
  var queueList = [];
  var lsQueueList = JSON.parse(localStorage.getItem('filmsQueue'));

  if (lsQueueList !== null) {
    queueList = _toConsumableArray(lsQueueList);
  }

  if (queueList.find(function (el) {
    return el.id === selectFilm.id;
  })) {
    queueList = queueList.filter(function (el) {
      return el.id !== selectFilm.id;
    });
  } else {
    queueList.push(selectFilm);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(queueList));
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  detalis.innerHTML = "";
  var imagePosterPath = "https://image.tmdb.org/t/p/w500/".concat(selectFilm.poster_path);
  detalis.insertAdjacentHTML('afterbegin', "<div class=\"film-card\">\n    <img src=".concat(imagePosterPath, " alt=\"film-img\" class=\"film-card__img\">\n    <div class=\"film-card__details\">\n<h2 class=\"film-card__title\"> ").concat(selectFilm.title, "<span class=\"film-card__release\">").concat(selectFilm.release_date.split('-')[0], "</span></h2>\n      <ul class=\"film-card__info-list info-list\">\n        <li class=\"info-list__item\">\n          <p class=\"info-list__keywords\">vote</p>\n          <p class=\"info-list__value\">").concat(selectFilm.vote_average, " </p>\n        </li>\n        <li class=\"info-list__item\">\n          <p class=\"info-list__keywords\">popularity</p>\n          <p class=\"info-list__value\">").concat(selectFilm.popularity, "</p>\n        </li>\n        <li class=\"info-list__item\">\n          <p class=\"info-list__keywords\">original title</p>\n          <p class=\"info-list__value\">").concat(selectFilm.original_title, "</p>\n        </li>\n        <li class=\"info-list__item\">\n          <p class=\"info-list__keywords\">genre</p>\n          <p class=\"info-list__value\">").concat(genres.filter(function (el) {
    return selectFilm.genre_ids.find(function (item) {
      return el.id === item;
    });
  }).reduce(function (acc, el) {
    return acc + "".concat(el.name, " ");
  }, ''), "</p>\n        </li>\n      </ul>\n      <div class=\"film-card__about about\">\n        <h2 class=\"film-card__title\">About</h2>\n        <p class=\"film-card__text\">").concat(selectFilm.overview, "</p>\n      </div>\n      <ul class=\"film-card__btn-list\">\n        <li class=\"btn-list__item\" id=\"watch\">\n        <span class=\"film-card__icon-watch\"></span>\n          <button type=\"button\" class=\"btn btn__to-watch js-to-watched\" data-action=\"add\" id=\"watch\">Add to watched</button>\n        </li>\n\n        <li class=\"btn-list__item\" id=\"queue\">\n          <span class=\"film-card__icon-queue\"></span>\n          <button type=\"button\" class=\"btn btn__to-queue js-to-queue\">Add to queue</button>\n        </li>\n      </ul>\n    </div>\n  </div>"));
  monitorButtonStatusText();
}
"use strict";

var cardLibrary = document.querySelector('.library-list');

function drawWatchedFilmList() {
  buttonWatch.classList.add('library__btn--active');
  buttonQueue.classList.remove('library__btn--active');
  cardLibrary.innerHTML = "";
  var local = JSON.parse(localStorage.getItem('filmsWatched'));
  var fragment = document.createDocumentFragment();
  local.forEach(function (el) {
    return fragment.append(createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average));
  });
  cardLibrary.append(fragment);
}

function drawQueueFilmList() {
  buttonWatch.classList.remove('library__btn--active');
  buttonQueue.classList.add('library__btn--active');
  cardLibrary.innerHTML = "";
  var local = JSON.parse(localStorage.getItem("filmsQueue"));
  var fragment = document.createDocumentFragment();
  local.forEach(function (el) {
    return fragment.append(createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average));
  });
  cardLibrary.append(fragment);
}

function createLibraryCardFunc(name, imgPath, movieId, voteAverage) {
  var item = document.createElement('li');
  item.classList.add('homePage__filmItem');
  var img = document.createElement('img');
  img.classList.add('homePage__img');
  img.setAttribute('src', "https://image.tmdb.org/t/p/w500".concat(imgPath));
  var movieName = document.createElement('p');
  movieName.classList.add('homePage__movieName');
  movieName.textContent = name;
  var voteFilm = document.createElement('p');
  voteFilm.classList.add('library__vote');
  voteFilm.textContent = voteAverage;
  item.append(img, movieName, voteFilm);
  item.addEventListener('click', function () {
    return activeDetailsPage(movieId, true);
  });
  return item;
}