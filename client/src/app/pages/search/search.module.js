(function () {
  'use strict';

  angular.module('ServerInventory.pages.search', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'app/pages/search/search.html',
        controller: 'searchCtrl',
        controllerAs: 'vm',
        title: 'Search',
        role: ['admin', 'user'],
        sidebarMeta: {
          icon: 'fa fa-search',
          order: 400,
        }
      })
  }
})();
