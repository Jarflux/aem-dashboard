(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/links/:environment',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        params: {
          environment: 'dev'
        }
      });
  }

})();
