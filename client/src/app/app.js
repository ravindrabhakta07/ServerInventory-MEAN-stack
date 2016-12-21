'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ngCookies',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'ServerInventory.pages',
]).constant('urls', {
  BASE: 'http://localhost:3000',
  AUTH_URL: 'http://localhost:3000/auth.html',
  BASE_API: 'http://localhost:4040',
  USER_PROFILE: 'assets/pictures/pic-user-profile2.png'
}).run(function ($rootScope, $cookies, $window, $state, toastr, urls) {

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

  if(!$cookies.get('userRole') && !$cookies.get('isLoggedOut'))
    authenticateUser();

  if ($window.location.pathname == "/auth.html")
    return;

  var userDetails = $cookies.get('userDetails');

  if ($window.location.href !== urls.AUTH_URL && userDetails == undefined) {
    return $window.location = urls.AUTH_URL;
  } else {

    angular.forEach($state.get(), function(s) {
      s.visible = false;
      var userRole = $cookies.get('userRole');
      if (userRole != undefined) {
        if (s.role === undefined || s.role.includes(userRole)) {
          s.visible = true;
        }
      }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState) {

      if (toState.name == "login" || $window.location.pathname == "/auth.html") {
        return;
      }
      var userRole = $cookies.get('userRole');
      if (userRole != undefined) {
        if (!toState.role.includes(userRole)) {
          //$state.transitionTo('login');
          // var cookies = $cookies.getAll();
          // angular.forEach(cookies, function (v, k) {
          //     $cookies.remove(k);
          // });
          event.preventDefault();
          toastr.error('You are not authorized person to view this content. Please contact admin for more details.', 'ServerInventory', {});
          //$window.location.href = urls.AUTH_URL + "?error=You are not authorized person to view this content. Please contact admin for more details.";
          return false;
        }
      } else {
        event.preventDefault();
        return $window.location.href = urls.AUTH_URL + "?error=Please login first.";
      }
    });
  }
});
