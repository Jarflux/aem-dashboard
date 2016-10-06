(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .factory('applicationStatusCheckerManagerService', applicationStatusCheckerManagerService);

  /** @ngInject */
  function applicationStatusCheckerManagerService($log, $injector, applicationValidatorEnum) {
    var log = $log.getInstance('applicationValidatorEnum'),
        statusCheckers = {};

    statusCheckers[applicationValidatorEnum.actuator] = "applicationValidatorActuatorCheck";

    return {
      make: make
    };

    function make(statusChecker) {
      if (angular.isValue(applicationValidatorEnum[statusChecker])) {
        // Dinamycally inject the editor service properly
        var adapter = statusCheckers[statusChecker];
        log.info('Create statusChecker: ' + statusChecker, adapter);

        return $injector.get(adapter);
      } else {
        log.error("Validator not found: " + statusChecker, applicationValidatorEnum);
      }

      return undefined;
    }
  }
})();
