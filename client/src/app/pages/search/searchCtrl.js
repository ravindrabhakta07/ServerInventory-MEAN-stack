(function () {
  'use strict';

  angular.module('ServerInventory.pages.search')
    .controller('searchCtrl', searchCtrl);

  /** @ngInject */
  function searchCtrl($uibModal, toastr, serversService) {

    var vm = this;
    vm.smartTablePageSize = 10;

    vm.getServers = getServers;
    vm.searchResults = searchResults;
    vm.openServerModal = openServerModal;
    vm.openApplicationModal = openApplicationModal;
    vm.activate = activate;

    vm.activate();

    function getServers() {

      serversService.getServers().then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data) {
          vm.servers = undefined;
          vm.safeServers = response.data;
        } else {
          vm.servers = undefined;
          vm.safeServers = undefined;
          toastr.error("Error loading details", 'Search', {});
        }
      }

      function onError(error) {
        vm.servers = undefined;
        vm.safeServers = undefined;
        toastr.error("Error loading details", 'Search', {});
      }
    }

    function searchResults(searchValue) {

      vm.servers = angular.copy(vm.safeServers);
      vm.servers = vm.servers.filter(function (item){
        return item.serverName.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1 ||
          item.application.applicationName.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
      });
      vm.results = angular.copy(vm.servers);
    }

    function openServerModal(id) {
      $uibModal.open({
        animation: true,
        templateUrl: '/app/pages/servers/modals/serverDetails.modal.html',
        size: 'lg',
        controller: 'ServerModalCtrl',
        controllerAs: 'vm',
        resolve: {
          serverId: function () {
            return {
              id: id,
              isViewOrEdit: true
            };
          }
        }
      }).result.then(function () {

      });
    }

    function openApplicationModal(id) {
      $uibModal.open({
        animation: true,
        templateUrl: '/app/pages/search/modals/applicationDetails.modal.html',
        size: 'lg',
        controller: 'ApplicationModalCtrl',
        controllerAs: 'vm',
        resolve: {
          applicationId: function () {
            return {
              id: id,
              isViewOrEdit: true
            };
          }
        }
      }).result.then(function () {

      });
    }

    function activate() {
      vm.getServers();
    }

  }
})();
