'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

  var debounce = function (fun, timeout) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(fun, timeout);
    };
  };

  var onPageShowError = function (errorMessage) {
    var node = document.createElement('div');

    node.textContent = errorMessage;
    node.setAttribute('style', 'z-index: 100; background-color: #ff4d4d; position: fixed; top: 0; width: 582px; text-align: center; padding: 10px; left: 50%; transform: translateX(-50%);');
    document.body.appendChild(node);

    setTimeout(function () {
      node.parentNode.removeChild(node);
    }, 2000);
  };

  window.utils = {
    onPageShowError: onPageShowError,
    getRandomNumber: getRandomNumber,
    createElement: createElement,
    debounce: debounce
  };
})();
