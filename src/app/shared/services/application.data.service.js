(function() {
  'use strict';

  angular
      .module('aemDashboard')
      .service('applicationDataService', applicationDataService);

  /** @ngInject */
  function applicationDataService($http, $q, $log) {
    this.getData = getData;

    function getData() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: '/app/config/application.data.json'
      }).then(function successCallback(response) {
        $log.info(response);
        deferred.resolve(response);
      }, function errorCallback(response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
  }

})();
