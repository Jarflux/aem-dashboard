(function() {
  'use strict';

  angular
    .module('aemDashboard')
    .directive('statusChecker', statusChecker);

  /** @ngInject */
  function statusChecker() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/shared/components/status-checker/status-checker.html',
      scope: {
        environmentConfig: '<',
        statusCheckerConfig: '<',
        key: '<'
      },
      controller: StatusCheckerController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function StatusCheckerController(applicationDataService, applicationValidatorFunctions) {
      var vm = this;

      vm.enviroments = {} || null;
      vm.isCollapsed = true;


      applicationValidatorFunctions[key]

      applicationDataService.getData()
          .then(function(response){
            vm.environments = response.environments;
      });
    }
  }
})();
