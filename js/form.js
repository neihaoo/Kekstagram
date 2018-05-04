'use strict';

(function () {
  var HashTags = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };

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
    if (hashTagsArray.length > HashTags.MAX_COUNT) {
      showErrorMessage('Количество хэш-тегов должно быть не больше ' + HashTags.MAX_COUNT);
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
      } else if (hashTagsArray[i][0] !== '#') {
        showErrorMessage('Каждый хэш-тег должен начинаться с символа # (решётка)');
      } else if (hashTagsArray[i].length < HashTags.MIN_LENGTH) {
        showErrorMessage('Хэш-тег не может состоять только из одного символа # (решётка)');
      } else if (hashTagsArray[i].length > HashTags.MAX_LENGTH) {
        showErrorMessage('Хэш-тег должен состоять максимум из ' + HashTags.MAX_LENGTH + '-х символов');
      }
    }
  };

  window.form = {
    validateHashTags: validateHashTags
  };
})();
