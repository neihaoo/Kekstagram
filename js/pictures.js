'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var ARRAY_PHOTOS_LENGTH = 25;
var LIKES_MIN_VALUE = 15;
var LIKES_MAX_VALUE = 200;
var PHOTOS_MIN_VALUE = 1;
var PHOTOS_MAX_VALUE = 25;
var AVATAR_MIN_VALUE = 1;
var AVATAR_MAX_VALUE = 6;
var CHROME_MAX_VALUE = 1;
var SEPIA_MAX_VALUE = 1;
var MARVIN_MAX_VALUE = 100;
var PHOBOS_MAX_VALUE = 3;
var HEAT_MAX_VALUE = 3;
var RESIZE_MAX_VALUE = 100;
var RESIZE_MIN_VALUE = 25;
var RESIZE_STEP = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var photos = [];
var currentEffectValue;
var uploadPhotos = document.querySelector('.img-upload');
var uploadPhotosOpen = uploadPhotos.querySelector('#upload-file');
var uploadPhotosClose = uploadPhotos.querySelector('#upload-cancel');
var previewPhoto = uploadPhotos.querySelector('.img-upload__preview img');
var effectsList = uploadPhotos.querySelector('.effects__list');
var sliderPin = uploadPhotos.querySelector('.scale__pin');
var sliderBar = uploadPhotos.querySelector('.img-upload__scale');
var photoResizeMinus = uploadPhotos.querySelector('.resize__control--minus');
var photoResizePlus = uploadPhotos.querySelector('.resize__control--plus');
var photoResizeValue = uploadPhotos.querySelector('.resize__control--value');
var bigPhotoClose = document.querySelector('.big-picture__cancel');
var allPhotos = document.querySelector('.pictures');

var onUploadPhotoEscPress = function (evt) {
  if (evt.keyCode !== ESC_KEYCODE) {
    return;
  }

  switch (evt.target.className) {
    case 'text__hashtags':
      evt.target.blur();
      break;
    case 'text__description':
      evt.target.blur();
      break;
    default:
      hideUploadPhoto();
  }
};

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

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var generateNumbersArray = function (min, max) {
  var numbers = [];

  while (min <= max) {
    numbers.push(min++);
  }

  return numbers;
};

var shuffleElements = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var generatePhotos = function () {
  var photosNames = shuffleElements(generateNumbersArray(PHOTOS_MIN_VALUE, PHOTOS_MAX_VALUE));

  for (var i = 0; i < ARRAY_PHOTOS_LENGTH; i++) {
    photos.push({
      url: 'photos/' + photosNames[i] + '.jpg',
      likes: getRandomNumber(LIKES_MIN_VALUE, LIKES_MAX_VALUE),
      comments: getRandomElement(COMMENTS),
      description: getRandomElement(DESCRIPTIONS)
    });
  }
};

var createElement = function (tagName, className1, className2, text) {
  var element = document.createElement(tagName);

  element.classList.add(className1);

  if (className2) {
    element.classList.add(className2);
  }
  if (text) {
    element.textContent = text;
  }

  return element;
};

var renderSmallPhoto = function (photo) {
  var photosTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var photoElement = photosTemplate.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photoElement;
};

var renderComments = function () {
  var commentsItem = createElement('li', 'social__comment', 'social__comment--text', getRandomElement(COMMENTS));
  var avatar = createElement('img', 'social__picture');

  avatar.src = 'img/avatar-' + getRandomNumber(AVATAR_MIN_VALUE, AVATAR_MAX_VALUE) + '.svg';
  avatar.alt = 'Аватар комментатора фотографии';
  avatar.width = 35;
  avatar.height = 35;
  commentsItem.insertBefore(avatar, commentsItem.firstChild);

  return commentsItem;
};

var addElementsOnPage = function (arg) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arg.length; i++) {
    fragment.appendChild(renderSmallPhoto(arg[i]));
  }

  return fragment;
};

var showAllPhotos = function () {
  allPhotos.appendChild(addElementsOnPage(photos));
};

var showBigPhoto = function (photo) {
  var bigPhoto = document.querySelector('.big-picture');
  var comments = bigPhoto.querySelector('.social__comments');

  bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhoto.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  if (comments.childElementCount < COMMENTS.length) {
    comments.appendChild(renderComments());
  }

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

var showUploadPhoto = function () {
  sliderBar.classList.add('hidden');
  uploadPhotos.querySelector('.img-upload__overlay').classList.remove('hidden');

  effectsList.querySelector('#effect-none').checked = true;
  photoResizeValue.setAttribute('value', RESIZE_MAX_VALUE + '%');
  uploadPhotos.querySelector('.img-upload__resize').setAttribute('style', 'z-index: 1');
  document.addEventListener('keydown', onUploadPhotoEscPress);
};

var hideUploadPhoto = function () {
  uploadPhotos.querySelector('.img-upload__overlay').classList.add('hidden');

  document.removeEventListener('keydown', onUploadPhotoEscPress);
  previewPhoto.removeAttribute('class');
  uploadPhotosOpen.value = '';
};

var initPictures = function () {
  generatePhotos();
  showAllPhotos();
};

var getDefaultEffectValue = function (effect) {
  switch (effect) {
    case 'chrome':
      return 'grayscale(' + CHROME_MAX_VALUE + ')';
    case 'sepia':
      return 'sepia(' + SEPIA_MAX_VALUE + ')';
    case 'marvin':
      return 'invert(' + MARVIN_MAX_VALUE + '%)';
    case 'phobos':
      return 'blur(' + PHOBOS_MAX_VALUE + 'px)';
    case 'heat':
      return 'brightness(' + HEAT_MAX_VALUE + ')';
    default:
      return 'none';
  }
};

var changeEffectValue = function () {
  switch (previewPhoto.className) {
    case 'effects__preview--chrome':
      return 'grayscale(' + currentEffectValue * CHROME_MAX_VALUE / 100 + ')';
    case 'effects__preview--sepia':
      return 'sepia(' + currentEffectValue * SEPIA_MAX_VALUE / 100 + ')';
    case 'effects__preview--marvin':
      return 'invert(' + currentEffectValue * MARVIN_MAX_VALUE + '%)';
    case 'effects__preview--phobos':
      return 'blur(' + currentEffectValue * PHOBOS_MAX_VALUE / 100 + 'px)';
    case 'effects__preview--heat':
      return 'brightness(' + currentEffectValue * HEAT_MAX_VALUE / 100 + ')';
    default:
      return 'effects__preview--none';
  }
};

var getEffectValue = function (value) {
  var sliderWidth = uploadPhotos.querySelector('.scale__line').clientWidth;
  var sliderPinPosition = value - (document.documentElement.clientWidth - sliderWidth) / 2 + (sliderPin.clientWidth / 2);
  var effectValue = Math.round(sliderPinPosition * 100 / sliderWidth);

  return effectValue;
};

uploadPhotosOpen.addEventListener('change', function () {
  showUploadPhoto();
});

uploadPhotosClose.addEventListener('click', function () {
  hideUploadPhoto();
});

uploadPhotosClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideUploadPhoto();
  }

});

photoResizeMinus.addEventListener('click', function () {
  if (parseInt(photoResizeValue.value, 10) > RESIZE_MIN_VALUE) {
    photoResizeValue.setAttribute('value', parseInt(photoResizeValue.value, 10) - RESIZE_STEP + '%');
    previewPhoto.style.transform = 'scale(' + parseInt(photoResizeValue.value, 10) / 100 + ')';
  }
});

photoResizePlus.addEventListener('click', function () {
  if (parseInt(photoResizeValue.value, 10) < RESIZE_MAX_VALUE) {
    photoResizeValue.setAttribute('value', parseInt(photoResizeValue.value, 10) + RESIZE_STEP + '%');
    previewPhoto.style.transform = 'scale(' + parseInt(photoResizeValue.value, 10) / 100 + ')';
  } else if (parseInt(photoResizeValue.value, 10) === RESIZE_MAX_VALUE) {
    previewPhoto.style.transform = 'none';
  }
});

effectsList.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('effects__radio')) {
    if (evt.target.value === 'none') {
      sliderBar.classList.add('hidden');
    } else {
      sliderBar.classList.remove('hidden');
    }

    previewPhoto.removeAttribute('class');
    previewPhoto.classList.add('effects__preview--' + evt.target.value);
    previewPhoto.style.filter = getDefaultEffectValue(evt.target.value);
  }
});

sliderPin.addEventListener('mousedown', function (evt) {
  currentEffectValue = getEffectValue(evt.clientX);
  uploadPhotos.querySelector('.scale__value').setAttribute('value', currentEffectValue);
  previewPhoto.style.filter = changeEffectValue();
});

bigPhotoClose.addEventListener('click', function () {
  hideBigPhoto();
});

allPhotos.addEventListener('click', function (evt) {
  if (evt.target.className !== 'picture__img') {
    return;
  }

  for (var i = 0; i < photos.length; i++) {
    if (photos[i].url === evt.target.attributes.src.value) {
      showBigPhoto(photos[i]);
      break;
    }
  }
});

initPictures();
