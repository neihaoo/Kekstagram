'use strict';

(function () {
  var EFFECTS_MAX_VALUE = 100;
  var CHROME_MAX_VALUE = 1;
  var SEPIA_MAX_VALUE = 1;
  var MARVIN_MAX_VALUE = 100;
  var PHOBOS_MAX_VALUE = 3;
  var HEAT_MAX_VALUE = 3;

  var effectValue = document.querySelector('.scale__value');

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

  var changeEffectValue = function (photo) {
    switch (photo.className) {
      case 'effects__preview--chrome':
        return 'grayscale(' + effectValue.value * CHROME_MAX_VALUE / 100 + ')';
      case 'effects__preview--sepia':
        return 'sepia(' + effectValue.value * SEPIA_MAX_VALUE / 100 + ')';
      case 'effects__preview--marvin':
        return 'invert(' + effectValue.value * MARVIN_MAX_VALUE / 100 + '%)';
      case 'effects__preview--phobos':
        return 'blur(' + effectValue.value * PHOBOS_MAX_VALUE / 100 + 'px)';
      case 'effects__preview--heat':
        return 'brightness(' + (effectValue.value * (HEAT_MAX_VALUE - 1) / 100 + 1) + ')';
      default:
        return 'effects__preview--none';
    }
  };

  window.effects = {
    maxValue: EFFECTS_MAX_VALUE,
    defaultValue: getDefaultEffectValue,
    changeEffects: changeEffectValue
  };
})();
