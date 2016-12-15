(function () {
  'use strict';

  angular.module('ServerInventory.pages.applications')
    .controller('ApplicationModalCtrl', ApplicationModalCtrl);

  /** @ngInject */
  function ApplicationModalCtrl($uibModalInstance, applicationId, toastr, applicationsService) {
    var vm = this;

    vm.application = getApplicationById;
    vm.updateApplication = updateApplication;
    vm.createApplication = createApplication;
    vm.activate = activate;

    vm.activate();

    function getApplicationById(id) {
      applicationsService.getApplicationById(id).then(onSuccess).catch(onError);

      function onSuccess(response) {
        vm.modalApplication = applicationId.isViewOrEdit && response && response.data;
        return response && response.data ||
          toastr.error("Error in receiving application data", "Applications", {}) && undefined;
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error("No such application found", "Applications", {});
        return toastr.error("Error in receiving application data", "Applications", {});
      }
    }

    function updateApplication() {

      applicationsService.updateApplication(vm.modalApplication._id, vm.modalApplication).then(onSuccess).catch(onError);
      function onSuccess(response) {
        if (response.data._id) {
          toastr.success('Application has been updated successfully', 'Applications', {});
          return $uibModalInstance.close(response.data);
        }
        return toastr.error('There was error in updating application', 'Applications', {});
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error('No such application found', 'Applications', {});
        return toastr.error('There was error in updating application', 'Applications', {});
      }

    }

    function createApplication(isFormValid) {
      if (!isFormValid)
        return false;

      applicationsService.createApplication(vm.modalApplication).then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data)
          $uibModalInstance.close(response.data);
        toastr.success('Application created successfully', 'Applications', {});
      }

      function onError(error) {
        toastr.error('There was error creating the application', 'Applications', {})
      }

    }

    function activate() {
      if (applicationId.id)
        vm.application(applicationId.id);
    }

  }

})();
