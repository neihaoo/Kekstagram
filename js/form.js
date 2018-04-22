'use strict';

(function () {
  var HASHTAGS_MIN_LENGTH = 2;
  var HASHTAGS_MAX_LENGTH = 20;
  var HASHTAGS_MAX_COUNT = 5;

  var validateHashTags = function () {
    var hashTagsInput = document.querySelector('.img-upload .text__hashtags');
    var hashTagsArray = hashTagsInput.value.toLowerCase().trim().split(' ');
    var hashTagsCounts = {};

    var showErrorMessage = function (message) {
      hashTagsInput.setCustomValidity(message);
      hashTagsInput.setAttribute('style', 'border-color: #ff4d4d');
    };

    hashTagsInput.setCustomValidity('');
    hashTagsInput.removeAttribute('style');

    if (hashTagsInput.value.toLowerCase().trim() === '') {
      return;
    }

    if (hashTagsArray.length > HASHTAGS_MAX_COUNT) {
      showErrorMessage('Количество хэш-тегов должно быть не больше ' + HASHTAGS_MAX_COUNT);

      return;
    }

    for (var i = 0; i < hashTagsArray.length; i++) {
      var currentHashTag = hashTagsArray[i];

      if (!hashTagsCounts[currentHashTag]) {
        hashTagsCounts[currentHashTag] = 1;
      } else {
        hashTagsCounts[currentHashTag]++;
      }

      if (hashTagsCounts[currentHashTag] > 1) {
        showErrorMessage('Один и тот же хэш-тег не может быть использован дважды');

        return;
      } else if (hashTagsArray[i][0] !== '#') {
        showErrorMessage('Каждый хэш-тег должен начинаться с символа # (решётка)');

        return;
      } else if (hashTagsArray[i].length < HASHTAGS_MIN_LENGTH) {
        showErrorMessage('Хэш-тег не может состоять только из одного символа # (решётка)');

        return;
      } else if (hashTagsArray[i].length > HASHTAGS_MAX_LENGTH) {
        showErrorMessage('Хэш-тег должен состоять максимум из ' + HASHTAGS_MAX_LENGTH + '-х символов');

        return;
      }
    }
  };

  window.form = {
    validateHashTags: validateHashTags
  };
})();
