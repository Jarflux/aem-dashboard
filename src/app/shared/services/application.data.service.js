(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .factory('applicationDataService', applicationDataService);

  /** @ngInject */
  function applicationDataService($http, $q, $log) {
    var cachedPromise = undefined;

    return {
      getData: getData,
      getEnvironmentByKey: getEnvironmentByKey,
      getLinkTypes: getLinkTypes
    };

    function getLinkTypes() {
      var deferred = $q.defer();

      getData().then(function (result) {
        if (result && result.linkTypes) {
          deferred.resolve(result.linkTypes);
        } else {
          deferred.reject();
        }
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getEnvironmentByKey(key) {
      var deferred = $q.defer();

      getData().then(function (result) {
        if (result && result.environments) {
          var environment = result.environments[key];
          if (environment) {
            deferred.resolve(environment);
          } else {
            deferred.reject();
          }
        }
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getData() {
      var deferred = $q.defer();

      if (angular.isUndefined(cachedPromise)) {
        cachedPromise = $http({
          method: 'GET',
          url: '/app/config/application.data.json'
        });
      }

      cachedPromise.then(function successCallback(response) {
        $log.debug("application data retrieved", response.data);
        deferred.resolve(response.data);
      }, function errorCallback(response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
  }

})();
