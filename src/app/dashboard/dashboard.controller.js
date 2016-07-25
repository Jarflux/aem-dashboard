(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(applicationDataService) {
    var vm = this;

    vm.$onInit = function () {
      applicationDataService.getData().then(function (result) {
        vm.environments = result.data.environments;
      }, function () {
        vm.environments = [];
      });
    };

    vm.$onInit(); // not needed when newer angular version (check which version is needed)
  }
})();
