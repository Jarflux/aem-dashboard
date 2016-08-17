(function() {
  'use strict';

  angular
    .module('aemDashboard')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(false);
  }

})();
