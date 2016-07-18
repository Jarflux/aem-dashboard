(function() {
  'use strict';

  angular
      .module('aemDashboard')
      .service('applicationDataService', applicationDataService);

  /** @ngInject */
  function applicationDataService() {
    this.getData = getData;

    function getData() {
      var data = {} || null;

      $http({
        method: 'GET',
        url: '/shared/services/application.data.service.js'
      }).then(function successCallback(response) {
        console.log(response);
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      return data;
    }
  }

})();
