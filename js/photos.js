'use strict';

(function () {
  var allPhotos = document.querySelector('.pictures');

  var renderSmallPhoto = function (photo) {
    var photosTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length - 1;

    return photoElement;
  };

  var onPageLoad = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.photosCount; i++) {
      fragment.appendChild(renderSmallPhoto(photos[i]));
    }

    allPhotos.appendChild(fragment);
  };

  window.backend.load(onPageLoad, window.utils.onError);

  allPhotos.addEventListener('click', function (evt) {
    if (evt.target.className !== 'picture__img') {
      return;
    }

    for (var i = 0; i < window.data.photosCount; i++) {
      if (window.data.photos[i].url === evt.target.attributes.src.value) {
        window.showBigPhoto(window.data.photos[i]);

        break;
      }
    }
  });
})();
