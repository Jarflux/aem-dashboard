(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(applicationDataService) {
    var vm = this;


    function _getEnvironmentData() {
      applicationDataService.getData()
        .then(function (response) {
          vm.environments = response.environments;
          vm.links = response.links;
        });
    }

    vm.$onInit = function () {
      _getEnvironmentData();
    };

    vm.$onInit();

  }
})();
