(function () {
  'use strict';

  angular.module('ServerInventory.pages.applications', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('applications', {
        url: '/applications',
        templateUrl: 'app/pages/applications/applications.html',
        controller: 'applicationsCtrl',
        controllerAs: 'vm',
        title: 'Applications',
        role: ['admin', 'user'],
        sidebarMeta: {
          icon: 'fa fa-industry',
          order: 100,
        }
      })
  }
})();
