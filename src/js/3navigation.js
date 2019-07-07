const homePageBtn = document.querySelector('#homePage-js');
const myLibraryPageBtn = document.querySelector('#myLibraryPage-js');
const detailsPage = document.querySelector('.detalisPage__block');
const myLibraryPage = document.querySelector('.myFilmLibraryPage__block');
const homePage = document.querySelector('.homePage__block');
const formSearch = document.querySelector('.homePage__form');
const homePageBtnLogo = document.querySelector('.header-logo');
let selectFilm = {};

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
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  homePageShown.classList.add('main__hidden');
  detailsPageShown.classList.remove('main__hidden');
  myLibraryPageShown.classList.add('main__hidden');

  if (itsLibraryFilm) {
    if (localStorage.filmsQueue) {
      selectFilm = localStorage.filmsQueue.find(el => el.id === movieId);
    }
    else {
      selectFilm = localStorage.filmsWatched.find(el => el.id === movieId);
    }
  }
  // console.log(movieId);
  selectFilm = renderFilms.find(el => el.id === movieId);
  showDetails(selectFilm);
  console.log(selectFilm);

}
