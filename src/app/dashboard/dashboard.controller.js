(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(applicationDataService, $stateParams) {
    var vm = this;

    vm.$onInit = function () {
      vm.environmentKey = $stateParams.environment;
      if (vm.environmentKey) {
        applicationDataService.getEnvironmentByKey(vm.environmentKey).then(function (environment) {
          vm.environment = environment;
        }, function () {
          vm.environment = undefined;
        });

        applicationDataService.getLinkTypes().then(function (linkTypes) {
          vm.linkTypes = linkTypes;
        }, function () {
          vm.linkTypes = undefined;
        });

        applicationDataService.getData().then(function (data) {
          var mainwebshops = angular.copy(data.mainwebshops);
          var sites = [];
            angular.forEach(mainwebshops, function (mainwebshop) {
              angular.forEach(mainwebshop.sites, function (site) {
                site.internalUrl = site.internalUrl.replace("{env}", $stateParams.environment);
                site.showLiveSite = site.isLive && vm.environmentKey == 'prd';
                sites.push(site);
              });
            });
            vm.sites = sites;
        }, function () {
          vm.sites = undefined;
        });
      }

    };

    //vm.$onInit(); // not needed when newer angular version (check which version is needed)
  }
})();
