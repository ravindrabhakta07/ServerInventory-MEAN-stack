(function () {
  'use strict';

  angular.module('ServerInventory.pages.servers')
    .factory('serversService', serversService);

  /** @ngInject */
  function serversService($http, urls) {

    var service = {
      createServer: createServer,
      getServers: getServers,
      getServerById: getServerById,
      updateServer: updateServer,
      removeServer: removeServer
    };

    function createServer(serverData) {
      return $http.post(urls.BASE_API + "/api/servers", serverData);
    }

    function getServers() {
      return $http.get(urls.BASE_API + "/api/servers");
    }

    function getServerById(id) {
      return $http.get(urls.BASE_API + "/api/servers/" + id);
    }

    function updateServer(id, server) {
      return $http.put(urls.BASE_API + "/api/servers/" + id, server);
    }

    function removeServer(id) {
      return $http.delete(urls.BASE_API + "/api/servers/" + id);
    }

    return service;
  }

})();
