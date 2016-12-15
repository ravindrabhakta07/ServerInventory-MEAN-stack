(function () {
  'use strict';

  angular.module('ServerInventory.pages', [
    'ui.router',
    'ServerInventory.pages.applications',
    'ServerInventory.pages.search',
    'ServerInventory.pages.servers',
    'ServerInventory.pages.users'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/applications');
  }

})();
