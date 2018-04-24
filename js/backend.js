'use strict';
(function () {
  var loadData = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка закгрузки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания.');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка отправки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка отправки');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: sendData
  };
})();
