'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var AVATAR_MIN_VALUE = 1;
  var AVATAR_MAX_VALUE = 6;

  var bigPhotoClose = document.querySelector('.big-picture__cancel');

  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode !== ESC_KEYCODE) {
      return;
    }

    if (evt.target.className === 'social__footer-text') {
      evt.target.blur();
    } else {
      hideBigPhoto();
    }
  };

  var renderComments = function () {
    var commentsItem = window.util.element('li', 'social__comment', 'social__comment--text', window.util.randomElement(window.data.comments));
    var avatar = window.util.element('img', 'social__picture');

    avatar.src = 'img/avatar-' + window.util.randomNumber(AVATAR_MIN_VALUE, AVATAR_MAX_VALUE) + '.svg';
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = 35;
    avatar.height = 35;
    commentsItem.insertBefore(avatar, commentsItem.firstChild);

    return commentsItem;
  };

  var showBigPhoto = function (photo) {
    var bigPhoto = document.querySelector('.big-picture');
    var comments = bigPhoto.querySelector('.social__comments');

    if (comments.childElementCount < window.data.comments.length) {
      comments.appendChild(renderComments());
    }

    bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPhoto.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    document.addEventListener('keydown', onBigPhotoEscPress);
    document.querySelector('body').classList.add('modal-open');

    bigPhoto.classList.remove('hidden');
  };

  var hideBigPhoto = function () {
    var bigPhoto = document.querySelector('.big-picture');

    bigPhoto.querySelector('.social__comment-count').classList.remove('visually-hidden');
    bigPhoto.querySelector('.social__comment-loadmore').classList.remove('visually-hidden');
    bigPhoto.classList.add('hidden');

    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  bigPhotoClose.addEventListener('click', function () {
    hideBigPhoto();
  });

  window.bigPhoto = showBigPhoto;

})();
