(function () {
  'use strict';

  angular.module('ServerInventory.pages.servers')
    .controller('ServerModalCtrl', ServerModalCtrl);

  /** @ngInject */
  function ServerModalCtrl($uibModalInstance, serverId, toastr, serversService, applicationsService) {
    var vm = this;
    vm.server = getServerById;
    vm.createServer = createServer;
    vm.updateServer = updateServer;
    vm.getApplications = getApplications;
    vm.activate = activate;

    vm.activate();

    function getServerById(id) {

      serversService.getServerById(id).then(onSuccess).catch(onError);

      function onSuccess(response) {
        vm.modalServer = serverId.isViewOrEdit && response && response.data;
        return response && response.data ||
          toastr.error("Error in receiving server data", "Servers", {}) && undefined;
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error("No such server found", "Servers", {});
        return toastr.error("Error in receiving server data", "Servers", {});
      }

    }

    function createServer(isFormValid) {
      if (!isFormValid)
        return false;

      serversService.createServer(vm.modalServer).then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data)
          $uibModalInstance.close(response.data);
        return toastr.success('Server created successfully', 'Servers', {});
      }

      function onError(error) {
        if (error.status == 409)
          return toastr.error('Server name must be unique in an application', 'Servers', {});
        return toastr.error('There was error creating the server', 'Servers', {})
      }

    }

    function updateServer() {

      serversService.updateServer(vm.modalServer._id, vm.modalServer).then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data._id) {
          toastr.success('Server has been updated successfully', 'Servers', {});
          return $uibModalInstance.close(response.data);
        }
        return toastr.error('There was error in updating server', 'Servers', {});
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error('No such server found', 'Servers', {});
        return toastr.error('There was error in updating server', 'Servers', {});
      }

    }

    function getApplications() {

      applicationsService.getApplications().then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data) {
          vm.applications = response.data;
        } else {
          vm.applications = undefined;
          toastr.error("Error loading applications", 'Applications', {});
        }
      }

      function onError(error) {
        vm.applications = undefined;
        toastr.error("Error loading applications", 'Applications', {});
      }

    }

    function activate() {
      vm.getApplications();
      if (serverId.id)
        vm.server(serverId.id);
    }

  }

})();
