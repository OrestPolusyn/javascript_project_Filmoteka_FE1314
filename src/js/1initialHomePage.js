'use strict';

let renderFilms;
let genres;
let pageNumber = 1;
let inputValue;
const form = document.querySelector('.homePage__form');
const input = document.querySelector('.homePage__input');
const prevBtn = document.querySelector('.js-prev');
const nextBtn = document.querySelector('.js-next');
const homePlaginationNumber = document.querySelector('.homepage__page');
let list = document.querySelector('.homePage__filmList');
const popWhenError = document.querySelector('.homePage__error');

function fetchGenres() {
  fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=f1943ebda4bde31f3353b960641d381f&language=en-US',
  )
    .then(res => res.json())
    .then(data => {
      genres = data.genres;
    })
    .catch(err => console.log(err));
}

fetchGenres();

function createCards(name, imgPath, year, movieId) {
  const item = document.createElement('li');
  item.classList.add('homePage__filmItem');

  // const imgShadow = document.createElement('img');
  // imgShadow.classList.add('homePage__imgShadow');
  // imgShadow.setAttribute('src', './images/_Path_.png');

  const img = document.createElement('img');
  img.classList.add('homePage__img');
  img.setAttribute('src', `https:/image.tmdb.org/t/p/w500${imgPath}`);

  const movieName = document.createElement('p');
  movieName.classList.add('homePage__movieName');
  const res = getYearFromDate(year);
  movieName.textContent = `${name} (${res})`;

  item.append(img, movieName);
  return item;
    item.addEventListener('click', activeDetailsPage);
}

function getYearFromDate(string){
  const res = string.slice(0,4);
  return res
}

function getPopularMovies() {
  let fragment = document.createDocumentFragment();
  list.innerHTML = '';
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=f1943ebda4bde31f3353b960641d381f&language=en-US&page=${pageNumber}`,
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.results.forEach(el => {
        fragment.append(createCards(el.title, el.backdrop_path,el.release_date, el.id));
      });
      list.append(fragment);
      renderFilms = data.results;
    });
}

getPopularMovies();

function searchFilms(e) {
  e.preventDefault();
  //   console.log(input.value);
  inputValue = input.value;
  fetchMovies();
  form.reset();
}

function fetchMovies() {
  let fragment = document.createDocumentFragment();
  list.innerHTML = '';
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f1943ebda4bde31f3353b960641d381f&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`,
  )
    .then(res => res.json())
    .then(data => {
      if (data.results.length < 1) {
        popWhenError.classList.remove('main__hidden');
      }
      else{
        popWhenError.classList.add('main__hidden');
      }
      console.log(data);
      data.results.forEach(el =>{
          console.log(createCards(el.title, el.backdrop_path, el.id));
        fragment.append(createCards(el.title, el.backdrop_path, el.id))},
      );
      list.append(fragment);
    //   console.log(list);
      renderFilms = data.results;
    })
    .catch(err => console.log(err));
}

function plaginationNavigation(e) {
  let click = Number(homePlaginationNumber.textContent);
  //   console.log(pageNumb.textContent);

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
  if(homePlaginationNumber.textContent <= 1){
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
