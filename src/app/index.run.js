(function() {
  'use strict';

  angular
    .module('aemDashboard')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

  angular.isValue = function (val) {
    return !(val === null || !angular.isDefined(val) || val === "" || (angular.isNumber(val) && !isFinite(val)));
  };

  angular.isNonValue = function (val) {
    return !angular.isValue(val);
  };
})();
