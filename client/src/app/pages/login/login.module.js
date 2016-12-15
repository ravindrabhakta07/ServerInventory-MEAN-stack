(function () {
  'use strict';
  angular.module('ServerInventory.pages.login', [
    'ngCookies',
    'toastr'
  ]).constant('urls', {
    BASE: 'http://localhost:3000',
    AUTH_URL: 'http://localhost:3000/auth.html',
    BASE_API: 'http://localhost:4040'
  });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/pages/login/auth.html',
        controller: 'loginCtrl',
        controllerAs: 'vm',
        fixedHref: 'auth.html',
        title: 'Login',
        sidebarMeta: {
          order: 800,
        },
      })
  }
})();
