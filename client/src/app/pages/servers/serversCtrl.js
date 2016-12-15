(function () {
  'use strict';

  angular.module('ServerInventory.pages.servers')
    .controller('serversCtrl', serversCtrl);

  /** @ngInject */
  function serversCtrl($uibModal, toastr, serversService, usersService, confirmationModalService) {

    var vm = this;
    vm.smartTablePageSize = 10;
    vm.oldServer = {};
    vm.userDetails = usersService.validateUser();

    vm.getServers = getServers;
    vm.removeServer = removeServer;
    vm.openConfirmationDialog = openConfirmationDialog;
    vm.openServerModal = openServerModal;
    vm.openCreateServerModal = openCreateServerModal;
    vm.openEditModal = openEditModal;
    vm.activate = activate;

    vm.activate();

    function getServers() {

      serversService.getServers().then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data) {
          vm.servers = response.data;
          vm.safeServers = response.data;
        } else {
          vm.servers = undefined;
          vm.safeServers = undefined;
          toastr.error("Error loading servers", 'Servers', {});
        }
      }

      function onError(error) {
        vm.servers = undefined;
        vm.safeServers = undefined;
        toastr.error("Error loading servers", 'Servers', {});
      }
    }

    function removeServer(id) {
      serversService.removeServer(id).then(onSuccess).catch(onError);
      function onSuccess(response) {
        vm.servers = vm.servers.filter(function (server) {
          return server._id !== id;
        });
        vm.safeServers = vm.safeServers.filter(function (server) {
          return server._id !== id;
        });
        toastr.success('Server has been deleted successfully', 'Servers', {});
      }

      function onError(error) {
        toastr.error('There was error in deleting the server', 'Servers', {})
      }
    }

    function openConfirmationDialog(id) {
      var options = {
        title: "Delete Server",
        content: "Are you sure you want to Delete the Server?",
        buttonTitle: "Yes"
      };
      confirmationModalService.confirmationModal(options)
        .then(function () {
          vm.removeServer(id);
        });
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

    function openCreateServerModal() {
      $uibModal.open({
        animation: true,
        templateUrl: '/app/pages/servers/modals/createServer.modal.html',
        size: 'lg',
        controller: 'ServerModalCtrl',
        controllerAs: 'vm',
        resolve: {
          serverId: function () {
            return {
              id: null
            };
          }
        }
      }).result.then(function (server) {
        vm.servers.push(server);
        vm.safeServers.push(server);
      });
    }

    function openEditModal(id) {
      $uibModal.open({
        animation: false,
        templateUrl: '/app/pages/servers/modals/updateServer.modal.html',
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
      }).result.then(function (updatedServer) {
        if (updatedServer._id) {
          var serverIndex = _.findIndex(vm.servers, function (server) {
            return server._id === updatedServer._id;
          });
          if (serverIndex !== -1) {
            vm.servers[serverIndex] = updatedServer;
            vm.safeServers[serverIndex] = updatedServer;
          }
        }
      });

    }

    function activate() {
      vm.getServers();
    }

  }
})();
