'use strict';

var ARRAY_PHOTOS_LENGTH = 25;
var LIKES_MIN_VALUE = 15;
var LIKES_MAX_VALUE = 200;
var PHOTOS_MIN_VALUE = 1;
var PHOTOS_MAX_VALUE = 25;
var AVATAR_MIN_VALUE = 1;
var AVATAR_MAX_VALUE = 6;
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

var hideElement = function (element) {
  return element.classList.add('visually-hidden');
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
  var allPhotos = document.querySelector('.pictures');

  allPhotos.appendChild(addElementsOnPage(photos));
};

var showBigPhoto = function (photo) {
  var bigPhoto = document.querySelector('.big-picture');
  var comments = bigPhoto.querySelector('.social__comments');

  hideElement(bigPhoto.querySelector('.social__comment-count'));
  hideElement(bigPhoto.querySelector('.social__comment-loadmore'));

  bigPhoto.querySelector('.big-picture__img img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  comments.appendChild(renderComments());
  bigPhoto.classList.remove('hidden');
};

var initPictures = function () {
  generatePhotos();
  showAllPhotos();
  showBigPhoto(photos[0]);
};

initPictures();
