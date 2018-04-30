'use strict';

(function () {
  var Avatar = {
    MIN_VALUE: 1,
    MAX_VALUE: 6
  };

  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoComments = bigPhoto.querySelector('.social__comments');
  var bigPhotoClose = document.querySelector('.big-picture__cancel');

  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode !== window.uploadPhotos.KeyCode.ESC) {
      return;
    }

    if (evt.target.className === 'social__footer-text') {
      evt.target.blur();
    } else {
      hideBigPhoto();
    }
  };

  var creatComments = function (comment) {
    var commentsItem = window.utils.createElement('li', 'social__comment', 'social__comment--text', comment);
    var avatar = window.utils.createElement('img', 'social__picture');

    avatar.src = 'img/avatar-' + window.utils.getRandomNumber(Avatar.MIN_VALUE, Avatar.MAX_VALUE) + '.svg';
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = 35;
    avatar.height = 35;
    commentsItem.insertBefore(avatar, commentsItem.firstChild);

    return commentsItem;
  };

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 1; i < comments.length; i++) {
      fragment.appendChild(creatComments(comments[i]));
    }

    bigPhotoComments.appendChild(fragment);
  };

  var showBigPhoto = function (photo) {
    if (bigPhotoComments.textContent) {
      bigPhotoComments.textContent = '';
    }

    bigPhoto.classList.remove('hidden');
    bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPhoto.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.social__caption').textContent = photo.comments[0];
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length - 1;
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onBigPhotoEscPress);

    renderComments(photo.comments);
  };

  var hideBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    bigPhoto.querySelector('.social__comment-count').classList.remove('visually-hidden');
    bigPhoto.querySelector('.social__comment-loadmore').classList.remove('visually-hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  bigPhotoClose.addEventListener('click', function () {
    hideBigPhoto();
  });

  window.bigPhoto = {
    showBigPhoto: showBigPhoto
  };
})();
