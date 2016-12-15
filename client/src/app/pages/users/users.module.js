(function () {
  'use strict';

  angular.module('ServerInventory.pages.users', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/pages/users/users.html',
        controller: 'usersCtrl',
        controllerAs: 'vm',
        title: 'Users',
        role: ['admin'],
        sidebarMeta: {
          icon: 'fa fa-users',
          order: 300,
        },

      })
  }
})();
