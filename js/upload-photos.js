'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var Resize = {
    MAX_VALUE: 100,
    MIN_VALUE: 25,
    STEP: 25
  };

  var uploadPhotos = document.querySelector('.img-upload');
  var uploadPhotosOpen = uploadPhotos.querySelector('#upload-file');
  var uploadPhotosClose = uploadPhotos.querySelector('#upload-cancel');
  var uploadPhotosSubmitButton = uploadPhotos.querySelector('.img-upload__submit');
  var previewPhoto = uploadPhotos.querySelector('.img-upload__preview img');
  var effectsList = uploadPhotos.querySelector('.effects__list');
  var effectValue = document.querySelector('.scale__value');
  var sliderPin = uploadPhotos.querySelector('.scale__pin');
  var sliderBar = uploadPhotos.querySelector('.scale__line');
  var sliderLevel = uploadPhotos.querySelector('.scale__level');
  var photoResizeMinus = uploadPhotos.querySelector('.resize__control--minus');
  var photoResizePlus = uploadPhotos.querySelector('.resize__control--plus');
  var photoResizeValue = uploadPhotos.querySelector('.resize__control--value');
  var form = uploadPhotos.querySelector('.img-upload__form');

  var onUploadPhotoEscPress = function (evt) {
    if (evt.keyCode !== KeyCode.ESC) {
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

  var onUploadShowError = function () {
    hideUploadPhoto();
    document.querySelector('.img-upload__message--error').classList.remove('hidden');
  };

  var showPreviewPhoto = function () {
    var file = uploadPhotosOpen.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var effectsPreview = effectsList.querySelectorAll('.effects__preview');

      previewPhoto.src = reader.result;

      for (var i = 0; i < effectsPreview.length; i++) {
        effectsPreview[i].setAttribute('style', 'background-image: url(' + previewPhoto.src + ')');
      }
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  var showUploadPhoto = function () {
    showPreviewPhoto();

    sliderBar.parentElement.classList.add('hidden');
    uploadPhotos.querySelector('.img-upload__overlay').classList.remove('hidden');

    effectsList.querySelector('#effect-none').checked = true;
    photoResizeValue.setAttribute('value', Resize.MAX_VALUE + '%');
    uploadPhotos.querySelector('.img-upload__resize').setAttribute('style', 'z-index: 1');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onUploadPhotoEscPress);
  };

  var hideUploadPhoto = function () {
    uploadPhotos.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', onUploadPhotoEscPress);
    document.querySelector('body').classList.remove('modal-open');
    previewPhoto.removeAttribute('class');
    previewPhoto.removeAttribute('style');
    uploadPhotos.querySelector('.text__hashtags').removeAttribute('style');
    uploadPhotos.querySelector('.text__hashtags').value = '';
    uploadPhotos.querySelector('.text__description').value = '';
    uploadPhotosOpen.value = '';
  };

  uploadPhotosOpen.addEventListener('change', function () {
    showUploadPhoto();
  });

  uploadPhotosClose.addEventListener('click', function () {
    hideUploadPhoto();
  });

  uploadPhotosClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      hideUploadPhoto();
    }
  });

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      if (evt.target.value === 'none') {
        sliderBar.parentElement.classList.add('hidden');
      } else {
        sliderBar.parentElement.classList.remove('hidden');
      }

      previewPhoto.removeAttribute('class');
      previewPhoto.classList.add('effects__preview--' + evt.target.value);
      previewPhoto.setAttribute('style', 'filter: ' + window.effects.defaultValueEffect[evt.target.value]);
      sliderPin.setAttribute('style', 'left: ' + window.effects.maxValue + '%');
      sliderLevel.setAttribute('style', 'width: ' + sliderPin.style.left);
      effectValue.setAttribute('value', window.effects.maxValue);
      photoResizeValue.setAttribute('value', Resize.MAX_VALUE + '%');
    }
  });

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var sliderPinCoords = sliderPin.getBoundingClientRect();
    var sliderBarCoords = sliderBar.getBoundingClientRect();
    var shiftX = evt.pageX - (sliderPinCoords.left + sliderPinCoords.width / 2);

    var onMouseMove = function (evtMove) {
      var newCoords = evtMove.pageX - shiftX - sliderBarCoords.left;
      var rightEdge = sliderBarCoords.width;

      if (newCoords < 0) {
        newCoords = 0;
      }

      if (newCoords > rightEdge) {
        newCoords = rightEdge;
      }

      sliderPin.setAttribute('style', 'left: ' + Math.round(newCoords * 100 / sliderBarCoords.width) + '%');
      sliderLevel.setAttribute('style', 'width: ' + sliderPin.style.left);
      effectValue.setAttribute('value', Math.round(newCoords * 100 / sliderBarCoords.width));
      previewPhoto.setAttribute('style', 'filter: ' + window.effects.changeEffects(previewPhoto));
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  photoResizeMinus.addEventListener('click', function () {
    if (parseInt(photoResizeValue.value, 10) > Resize.MIN_VALUE) {
      photoResizeValue.setAttribute('value', parseInt(photoResizeValue.value, 10) - Resize.STEP + '%');
      previewPhoto.setAttribute('style', 'transform: scale(' + parseInt(photoResizeValue.value, 10) / 100 + ')');
    }
  });

  photoResizePlus.addEventListener('click', function () {
    if (parseInt(photoResizeValue.value, 10) < Resize.MAX_VALUE) {
      photoResizeValue.setAttribute('value', parseInt(photoResizeValue.value, 10) + Resize.STEP + '%');
      previewPhoto.setAttribute('style', 'transform: scale(' + parseInt(photoResizeValue.value, 10) / 100 + ')');
    } else if (parseInt(photoResizeValue.value, 10) === Resize.MAX_VALUE) {
      previewPhoto.setAttribute('style', 'transform: none');
    }
  });

  uploadPhotosSubmitButton.addEventListener('click', function () {
    window.form.validateHashTags();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      hideUploadPhoto();
    }, onUploadShowError);
  });

  window.uploadPhotos = {
    KeyCode: KeyCode
  };
})();
