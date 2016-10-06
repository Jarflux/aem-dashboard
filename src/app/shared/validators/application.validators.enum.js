(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .constant('applicationValidatorEnum', {
      actuator: "actuatorKey",
      actuator2: "actuatorKey2"
    });


  .
  constant('applicationValidatorFunctions', {
    actuatorKey: {
      var1: true,
      var2: false
    },
    actuatorKey2: {
      var1: true,
      var2: true
    }

  });
})();
