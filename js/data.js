'use strict';

(function () {
  var ARRAY_PHOTOS_LENGTH = 25;
  var LIKES_MIN_VALUE = 15;
  var LIKES_MAX_VALUE = 200;
  var PHOTOS_MIN_VALUE = 1;
  var PHOTOS_MAX_VALUE = 25;

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

  var generatePhotos = function () {
    var photosNames = window.util.shuffleElements(window.util.numberArray(PHOTOS_MIN_VALUE, PHOTOS_MAX_VALUE));

    for (var i = 0; i < ARRAY_PHOTOS_LENGTH; i++) {
      photos.push({
        url: 'photos/' + photosNames[i] + '.jpg',
        likes: window.util.randomNumber(LIKES_MIN_VALUE, LIKES_MAX_VALUE),
        comments: window.util.randomElement(COMMENTS),
        description: window.util.randomElement(DESCRIPTIONS)
      });
    }
  };

  window.data = {
    photosData: generatePhotos,
    comments: COMMENTS,
    photos: photos
  };
})();
