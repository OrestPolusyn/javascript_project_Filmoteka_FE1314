const homePageBtn = document.querySelector('#homePage-js');
const myLibraryPageBtn = document.querySelector('#myLibraryPage-js');
const detailsPageShown = document.querySelector('.detalisPage__block');
const myLibraryPageShown = document.querySelector('#myFilmLibraryPage__block');
const homePageShown = document.querySelector('.homePage__block');

let selectFilm = {};

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
}

// function activeDetailsPage(ev) {
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

function activeDetailsPage(movieId, itsLibraryFilm) {
    homePageShown.classList.add('main__hidden');
  detailsPageShown.classList.remove('main__hidden');
  myLibraryPageShown.classList.add('main__hidden');

  if (itsLibraryFilm) {
    if (localStorage.filmsQueue) {
      selectFilm = localStorage.filmsQueue.find(el => el.id === movieId);
    }
    else{
        selectFilm = localStorage.filmsWatched.find(el => el.id === movieId);
    }
  }
  // console.log(movieId);
  selectFilm = renderFilms.find(el => el.id === movieId);
  showDetails(selectFilm);
  console.log(selectFilm);
  
}
