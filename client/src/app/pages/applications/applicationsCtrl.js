(function () {
  'use strict';

  angular.module('ServerInventory.pages.applications')
    .controller('applicationsCtrl', applicationsCtrl);

  /** @ngInject */
  function applicationsCtrl($uibModal, toastr, applicationsService, usersService, confirmationModalService) {

    var vm = this;
    vm.smartTablePageSize = 10;
    vm.oldApplication = {};
    vm.userDetails = usersService.validateUser();

    vm.getApplications = getApplications;
    vm.removeApplication = removeApplication;
    vm.openConfirmationDialog = openConfirmationDialog;
    vm.openApplicationModal = openApplicationModal;
    vm.openCreateApplicationModal = openCreateApplicationModal;
    vm.openEditModal = openEditModal;
    vm.activate = activate;

    vm.activate();

    function getApplications() {

      applicationsService.getApplications().then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data) {
          vm.applications = response.data;
          vm.safeApplications = response.data;
        } else {
          vm.applications = undefined;
          vm.safeApplications = undefined;
          toastr.error("Error loading applications", 'Applications', {});
        }
      }

      function onError(error) {
        vm.applications = undefined;
        vm.safeApplications = undefined;
        toastr.error("Error loading applications", 'Applications', {});
      }
    }

    function removeApplication(id) {
      applicationsService.removeApplication(id).then(onSuccess).catch(onError);
      function onSuccess(response) {
        vm.applications = vm.applications.filter(function (application) {
          return application._id !== id;
        });
        vm.safeApplications = vm.safeApplications.filter(function (application) {
          return application._id !== id;
        });
        toastr.success('Application has been deleted successfully', 'Applications', {});
      }

      function onError(error) {
        toastr.error('There was error in deleting application', 'Applications', {})
      }
    }

    function openConfirmationDialog(id) {
      var options = {
        title: "Delete Application",
        content: "Are you sure you want to Delete the Application?",
        buttonTitle: "Yes"
      };
      confirmationModalService.confirmationModal(options)
        .then(function () {
          vm.removeApplication(id);
        });
    }

    function openApplicationModal(id) {
      $uibModal.open({
        animation: true,
        templateUrl: '/app/pages/applications/modals/applicationDetails.modal.html',
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

    function openCreateApplicationModal() {
      $uibModal.open({
        animation: true,
        templateUrl: '/app/pages/applications/modals/createApplication.modal.html',
        size: 'lg',
        controller: 'ApplicationModalCtrl',
        controllerAs: 'vm',
        resolve: {
          applicationId: function () {
            return {
              id: undefined
            };
          }
        }
      }).result.then(function (application) {
        vm.applications.push(application);
        vm.safeApplications.push(application);
      });
    }

    function openEditModal(id) {
      $uibModal.open({
        animation: false,
        templateUrl: '/app/pages/applications/modals/updateApplication.modal.html',
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
      }).result.then(function (updatedApplication) {
        if (updatedApplication._id) {
          var applicationIndex = _.findIndex(vm.applications, function (application) {
            return application._id === updatedApplication._id;
          });
          if (applicationIndex !== -1) {
            vm.applications[applicationIndex] = updatedApplication;
            vm.safeApplications[applicationIndex] = updatedApplication;
          }
        }
      });

    }

    function activate() {
      vm.getApplications();
    }

  }
})();
