(function () {
  'use strict';

  angular.module('ServerInventory.pages.servers', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('servers', {
        url: '/servers',
        templateUrl: 'app/pages/servers/servers.html',
        controller: 'serversCtrl',
        controllerAs: 'vm',
        title: 'Servers',
        role: ['admin', 'user'],
        sidebarMeta: {
          icon: 'fa fa-server',
          order: 200,
        }
      })
  }
})();
