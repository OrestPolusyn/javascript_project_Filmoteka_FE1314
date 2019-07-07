const detalis = document.querySelector('.detalisPage__block');

const LOCALSTORAGE = (w => {
  if (!w) return;

  const isActive = 'localStorage' in w;

  const get = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState ? JSON.parse(serializedState) : null;
    } catch (error) {
      console.error('Get state error: ', error);
    }
  };

  const set = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error);
    }
  };

  const publicAPI = {
    isActive,
    get,
    set,
  };

  return publicAPI;
})(window);

function monitorButtonStatusText() {
  const btnQueue = document.querySelector('#queue');
  const iconQueue = btnQueue.querySelector('.js-svg');
  const btnToQueue = btnQueue.querySelector('.js-to-queue');

  const btnWatched = document.querySelector('#watched');
  const iconWatched = btnWatched.querySelector('.js-svg');
  const btnToWatched = btnWatched.querySelector('.js-to-watched');

  if (hasMovie(filmsQueue)) {
    iconQueue.href = './images/sprite.svg#icon-calendar-minus';
    btnToQueue.textContent = 'Delete from queue';
  }
  else {
    iconQueue.href = './images/sprite.svg#icon-calendar-plus';
    btnToQueue.textContent = 'Add to queue';
  }

  if (hasMovie(filmsWatched)) {
    iconWatched.href = './images/sprite.svg#icon-trash-alt';
    btnToWatched.textContent = 'Delete from watched';
  }
  else {
    iconWatched.href = './images/sprite.svg#icon-video';
    btnToWatched.textContent = 'Add to watched';
  }
}

function toggleTo(key) {
  const films = LOCALSTORAGE.get(key);
  if (hasMovie(key)) {
    films = films.filter(item => item.movieId !== selectFilm.movieId);
  } else films.push(selectFilm);

  LOCALSTORAGE.set(key, films);
}

function toggleToQueue() {
  toggleTo(filmsQueue);
  monitorButtonStatusText();
}

function toggleToWatche() {
  toggleTo(filmsWatched);
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  detalis.innerHTML = "";
  const imagePosterPath = `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`;
  detalis.insertAdjacentHTML(
    'afterbegin',
    `<div class="film-card">
    <img src=${imagePosterPath} alt="film-img" class="film-card__img">
    <div class="film-card__details">
<h2 class="film-card__title"> ${
      selectFilm.title
    }<span class="film-card__release">${
      selectFilm.release_date.split('-')[0]
    }</span></h2>
      <ul class="film-card__info-list info-list">
        <li class="info-list__item">
          <p class="info-list__keywords">vote / votes</p>
          <p class="info-list__value">${selectFilm.vote_average} / </p>
        </li>
        <li class="info-list__item">
          <p class="info-list__keywords">popularity</p>
          <p class="info-list__value">${selectFilm.popularity}</p>
        </li>
        <li class="info-list__item">
          <p class="info-list__keywords">original title</p>
          <p class="info-list__value">${selectFilm.original_title}</p>
        </li>
        <li class="info-list__item">
          <p class="info-list__keywords">genre</p>
          <p class="info-list__value">${genres.filter(el =>
            selectFilm.genre_ids
              .find(item => el.id === item)
          ).reduce((acc, el) => acc + `${el.name} `, '')}</p>
        </li>
      </ul>
      <div class="film-card__about about">
        <h2 class="film-card__title">About</h2>
        <p class="film-card__text">${selectFilm.overview}</p>
      </div>
      <ul class="film-card__btn-list">
        <li class="btn-list__item" id="watched">
          <svg class="btn__svg">
            <use href="./images/sprite.svg#icon-video" class="js-svg"></use>
          </svg>
          <button type="button" class="btn btn__to-watch js-to-watched" data-action="add" id="watch">Add to watched</button>
        </li>

        <li class="btn-list__item" id="queue">
          <svg class="btn__svg">
            <use href="./images/sprite.svg#icon-calendar-plus" class="js-svg"></use>
          </svg>
          <button type="button" class="btn btn__to-queue js-to-queue">Add to queue</button>
        </li>
      </ul>
    </div>
  </div>`,
  );

    // monitorButtonStatusText();
}

function hasMovie(key) {
  const film = localStorage.get(key).find(
    item => item.movieId === selectFilm.movieId,
  );
  return !!film;
}




