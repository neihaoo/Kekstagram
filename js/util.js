'use strict';

(function () {
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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

  var shuffleElements = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
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

  window.util = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    generateNumbersArray: generateNumbersArray,
    shuffleElements: shuffleElements,
    createElement: createElement
  };
})();
