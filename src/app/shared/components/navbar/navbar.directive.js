(function() {
  'use strict';

  angular
    .module('aemDashboard')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/shared/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(applicationDataService) {
      var vm = this;

      vm.enviroments = {} || null;
      vm.isCollapsed = true;

      applicationDataService.getData()
          .then(function(response){
            vm.environments = response.data.environments;
      });

    }
  }

})();
