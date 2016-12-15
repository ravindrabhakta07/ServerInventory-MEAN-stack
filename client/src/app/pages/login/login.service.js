(function () {
  'use strict';

  angular.module('ServerInventory.pages.login')
    .factory('loginService', loginService);

  /** @ngInject */
  function loginService($http, urls) {

    var service = {
      authenticateUser: authenticateUser,
      getUserClaims: getUserClaims,
    };

    function authenticateUser(userCredentials) {
      return $http.post(urls.BASE_API + "/api/auth/login", userCredentials);
    }

    function getUserClaims(authTokens) {
      return $http.get(urls.BASE_API + "/oxd/userdata" + authTokens);
    }

    return service;

  }

})();
