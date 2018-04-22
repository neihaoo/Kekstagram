'use strict';

(function () {
  var allPhotos = document.querySelector('.pictures');

  var renderSmallPhoto = function (photo) {
    var photosTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return photoElement;
  };

  var preparePhotos = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderSmallPhoto(arr[i]));
    }

    return fragment;
  };

  var renderAllPhotos = function () {
    window.data.getPhotosData();
    allPhotos.appendChild(preparePhotos(window.data.photos));
  };

  renderAllPhotos();

  allPhotos.addEventListener('click', function (evt) {
    if (evt.target.className !== 'picture__img') {
      return;
    }

    for (var i = 0; i < window.data.photos.length; i++) {
      if (window.data.photos[i].url === evt.target.attributes.src.value) {
        window.showBigPhoto(window.data.photos[i]);

        break;
      }
    }
  });
})();
