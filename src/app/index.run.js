(function() {
  'use strict';

  angular
    .module('aemDashboard')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
