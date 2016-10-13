(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .service('applicationValidatorActuatorCheck', applicationValidatorActuatorCheck);

  /** @ngInject */
  function applicationValidatorActuatorCheck(applicationValidatorAbstract, $log, applicationDataService) {
    var log = $log.getInstance('applicationValidatorActuatorCheck');

    var data = {
      to_check_public_url: undefined,
      last_run: undefined,
      is_healthy: undefined
    };

    var service = {};

    // Apply the "interface"
    angular.extend(service, applicationValidatorAbstract);

    //Create own implementation for functions
    service.initialize = initialize;
    service.isPristine = isPristine;
    service.checkEndpoint = checkEndpoint;
    service.lastRun = lastRun;

    //Implementations
    function initialize(envConfig, statusCheckerConfig) {
      var deferred = $q.defer();

      if (angular.isValue(envConfig) && angular.isValue(envConfig.services)) {
          data.to_check_public_url = envConfig.services.apigateway + statusCheckerConfig.url_public;
          deferred.resolve({ success: true });
      } else {
        deferred.reject({ success: false, error_message: "Has no services config"});
      }

      return deferred.promise;
    }

    function isPristine(){
      return angular.isNonValue(data.last_run) && angular.isNonValue(data.is_healthy);
    }

    function checkEndpoint(){
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: data.to_check_public_url
      }).then(function(response){
        var dataJson = response.data;
        if (angular.isValue(dataJson) && angular.isValue(dataJson.status) && dataJson.status === "UP") {
          data.is_healthy = true;
          data.last_run = Date.now();

          deferred.resolve({ success: true, data: dataJson });
        } else {
          deferred.reject({ success: false, error_message: "Status NOK :(", stack_trace: response})
        }
      }, function(error){
        deferred.reject({ success: false, error_message: "Error getting status", stack_trace: error});
      });

      return deferred.promise;
    }

    function lastRun(){
      return data.last_run;
    }

  }
})();
