(function() {
  'use strict';

  angular
    .module('aemDashboard')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(false);
  }

})();
