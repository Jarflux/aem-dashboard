(function () {
  'use strict';

  angular
    .module('aemDashboard')
    .service('applicationValidatorAbstract', applicationValidatorAbstract);

  /** @ngInject */
  function applicationValidatorAbstract() {
    var log = $log.getInstance('applicationValidatorAbstract');

    return {
      initialize: function(envConfig, statusCheckerConfig){
        log.error("Not implemented yet");
      },
      checkEndpoint: function(){
        log.error("Not implemented yet");
      },
      lastRun: function(){
        log.error("Not implemented yet");
      },
      isPristine: function(){
        log.error("Not implemented yet");
      }
    };

  }
})();
