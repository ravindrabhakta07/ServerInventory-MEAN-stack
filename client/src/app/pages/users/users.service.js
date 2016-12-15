(function () {
  'use strict';

  angular.module('ServerInventory.pages.users')
    .factory('usersService', usersService);

  /** @ngInject */
  function usersService($http, $cookies, $window, urls) {

    var service = {
      createUser: createUser,
      getUsers: getUsers,
      updateUser: updateUser,
      removeUser: removeUser,
      validateUser: validateUser
    };

    function createUser(userDetails) {
      return $http.post(urls.BASE_API + "/api/users", userDetails);
    }

    function getUsers() {
      return $http.get(urls.BASE_API + "/api/users");
    }

    function updateUser(id, user) {
      return $http.put(urls.BASE_API + "/api/users/" + id, user);
    }

    function removeUser(id) {
      return $http.delete(urls.BASE_API + "/api/users/" + id);
    }

    function validateUser() {
      var userDetails = $cookies.get('userDetails');

      try {
        return userDetails = JSON.parse(userDetails);
      } catch (ex) {
        $window.location = urls.AUTH_URL + "?error=Please login first.";
      }
    }

    return service;
  }

})();
