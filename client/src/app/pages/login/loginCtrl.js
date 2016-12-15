(function () {
  'use strict';
  angular.module('ServerInventory.pages.login')
    .controller('loginCtrl', loginCtrl);

  /** @ngInject */
  function loginCtrl($window, $cookies, urls, loginService, toastr) {

    var vm = this;
    vm.isAdminLogin = false;
    vm.showLoginForm = showLoginForm;
    vm.authenticateUser = authenticateUser;
    vm.authenticateAdmin = authenticateAdmin;
    vm.logout = logout;
    vm.userProfilePic = userProfilePic;
    vm.getUserName = getUserName;

    function showLoginForm() {
      vm.isAdminLogin = true;
      return false;
    }

    function authenticateUser() {

      var user = {
        isAdmin: false
      };
      var dateToday = new Date();
      dateToday.setHours(dateToday.getHours() + 2);
      $cookies.put('userDetails', JSON.stringify(user), [{expires: dateToday}]);
      $cookies.put('userRole', "user", [{expires: dateToday}]);
      $window.location = urls.BASE + '/#/applications';

    }

    function authenticateAdmin(isFormValid) {

      if (!isFormValid)
        return;

      loginService.authenticateUser(vm.userCredentials).then(onSuccess).catch(onError);

      function onSuccess(response) {
        var dateToday = new Date();
        dateToday.setHours(dateToday.getHours() + 2);
        $cookies.put('userDetails', JSON.stringify(response.data), [{expires: dateToday}]);
        $cookies.put('userRole', response.data.isAdmin ? "admin" : "user", [{expires: dateToday}]);
        $window.location = urls.BASE + '/#/applications';
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error('No such user exists in the system', 'Server Inventory');
        if (error.status === 401)
          return toastr.error('User credentials does not match. Please check your username and password', 'Server Inventory');
        return toastr.error('Error occurred while signing you in', 'Server Inventory');
      }
    }

    function getUserName() {
      var userDetails = $cookies.get('userDetails');

      try {
        return JSON.parse(userDetails).firstName;
      } catch (ex) {

      }
    }

    function logout() {
      var cookies = $cookies.getAll();
      angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
      });
      $window.location = urls.AUTH_URL;
    }

    function userProfilePic() {
      //var userDetails = JSON.parse($cookies.get('userDetails'));
      //var userPic = userDetails && userDetails.picture && userDetails.picture[0];
      //return userPic? urls.BASE + userPic : urls.USER_PROFILE;
      return urls.USER_PROFILE;
    }

  }

})();
