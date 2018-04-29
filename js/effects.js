'use strict';

(function () {
  var EFFECTS_MAX_VALUE = 100;
  var CHROME_MAX_VALUE = 1;
  var SEPIA_MAX_VALUE = 1;
  var MARVIN_MAX_VALUE = 100;
  var PHOBOS_MAX_VALUE = 3;
  var HEAT_MAX_VALUE = 3;

  var defaultEffectValueMap = {
    'chrome': 'grayscale(' + CHROME_MAX_VALUE + ')',
    'sepia': 'sepia(' + SEPIA_MAX_VALUE + ')',
    'marvin': 'invert(' + MARVIN_MAX_VALUE + '%)',
    'phobos': 'blur(' + PHOBOS_MAX_VALUE + 'px)',
    'heat': 'brightness(' + HEAT_MAX_VALUE + ')',
    'none': 'none'
  };

  var effectValue = document.querySelector('.scale__value');

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
        return 'none';
    }
  };

  window.effects = {
    maxValue: EFFECTS_MAX_VALUE,
    defaultValueEffect: defaultEffectValueMap,
    changeEffects: changeEffectValue
  };
})();
