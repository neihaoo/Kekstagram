'use strict';

(function () {
  var ARRAY_PHOTOS_LENGTH = 25;

  var photos = [];

  var allPhotos = document.querySelector('.pictures');
  var sortFilters = document.querySelector('.img-filters');

  var renderSmallPhoto = function (photo) {
    var photosTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length - 1;

    return photoElement;
  };

  var renderPhotos = function (photo) {
    var fragment = document.createDocumentFragment();

    allPhotos.querySelectorAll('.picture__link').forEach(function (node) {
      return node.parentNode.removeChild(node);
    });

    for (var i = 0; i < ARRAY_PHOTOS_LENGTH; i++) {
      fragment.appendChild(renderSmallPhoto(photo[i]));
    }

    allPhotos.appendChild(fragment);
    sortFilters.classList.remove('img-filters--inactive');
  };

  var onPageLoad = function (data) {
    data.pop();
    photos = data;
    renderPhotos(photos);
  };

  var onPopularChange = window.utils.debounce(function () {
    renderPhotos(photos.slice().sort(function (a, b) {
      return b.likes - a.likes;
    }));
  }, 500);

  var onNewChange = window.utils.debounce(function () {
    renderPhotos(photos);
  }, 500);

  var onMostCommentChange = window.utils.debounce(function () {
    renderPhotos(photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }));
  }, 500);

  var renderAllPhotos = function () {
    window.backend.load(onPageLoad, window.utils.onPageShowError);
    sortFilters.querySelector('.img-filters__button').classList.remove('img-filters__button--active');
  };

  allPhotos.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      for (var i = 0; i < ARRAY_PHOTOS_LENGTH; i++) {
        if (photos[i].url === evt.target.attributes.src.value) {
          window.bigPhoto.showBigPhoto(photos[i]);

          break;
        }
      }
    }
  });

  allPhotos.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.uploadPhotos.KeyCode.ENTER && evt.target.className === 'picture__link') {
      for (var i = 0; i < ARRAY_PHOTOS_LENGTH; i++) {
        if (photos[i].url === evt.target.firstElementChild.attributes.src.value) {
          window.bigPhoto.showBigPhoto(photos[i]);

          break;
        }
      }
    }
  });

  sortFilters.addEventListener('click', function (evt) {
    evt.preventDefault();

    sortFilters.querySelectorAll('.img-filters__button').forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });

    switch (evt.target.id) {
      case 'filter-popular':
        onPopularChange();
        evt.target.classList.add('img-filters__button--active');

        break;
      case 'filter-new':
        onNewChange();
        evt.target.classList.add('img-filters__button--active');

        break;
      case 'filter-discussed':
        onMostCommentChange();
        evt.target.classList.add('img-filters__button--active');

        break;
    }
  });

  renderAllPhotos();

  window.photos = photos;
})();
