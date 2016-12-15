(function () {
  'use strict';

  angular.module('ServerInventory.pages.users')
    .controller('usersCtrl', usersCtrl);

  /** @ngInject */
  function usersCtrl($uibModal, toastr, usersService, confirmationModalService) {
    var vm = this;
    vm.smartTablePageSize = 10;

    vm.getUsers = getUsers;
    vm.removeUser = removeUser;
    vm.openConfirmationDialog = openConfirmationDialog;
    vm.openCreateUserModal = openCreateUserModal;
    vm.openEditModal = openEditModal;
    vm.activate = activate;

    vm.activate();

    function getUsers() {
      usersService.getUsers().then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data) {
          vm.users = response.data;
          vm.safeUsers = response.data;
        } else {
          vm.users = undefined;
          vm.safeUsers = undefined;
          toastr.error("Error loading Users", 'Users', {})
        }
      }

      function onError(error) {
        vm.users = undefined;
        vm.safeUsers = undefined;
        toastr.error("Error loading Users", 'Users', {});
      }
    }

    function removeUser(id) {
      usersService.removeUser(id).then(onSuccess).catch(onError);
      function onSuccess(response) {
        vm.users = vm.users.filter(function (user) {
          return user._id !== id;
        });
        vm.safeUsers = vm.safeUsers.filter(function (user) {
          return user._id !== id;
        });
        return toastr.success('User has been deleted successfully', 'Users', {});
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error('No such user found', 'Users', {});

        return toastr.error('There was error in deleting user', 'Users', {});
      }
    }

    function openConfirmationDialog(id) {
      var options = {
        title: "Delete User",
        content: "Are you sure you want to Delete the User?",
        buttonTitle: "Yes"
      };
      confirmationModalService.confirmationModal(options)
        .then(function () {
          vm.removeUser(id);
        });
    }

    function openCreateUserModal() {
      $uibModal.open({
        animation: true,
        templateUrl: '/app/pages/users/modals/createUser.modal.html',
        size: 'lg',
        controller: 'UserModalCtrl',
        controllerAs: 'vm',
        resolve: {
          user: function () {
            return undefined;
          }
        }
      }).result.then(function (user) {
        vm.users.push(user);
        vm.safeUsers.push(user);
      });
    }

    function openEditModal(user) {
      $uibModal.open({
        animation: false,
        templateUrl: '/app/pages/users/modals/updateUser.modal.html',
        size: 'lg',
        controller: 'UserModalCtrl',
        controllerAs: 'vm',
        resolve: {
          user: function () {
            return user;
          }
        }
      }).result.then(function (updatedUser) {
        if (updatedUser._id) {
          var userIndex = _.findIndex(vm.users, function (user) {
            return user._id === updatedUser._id;
          });
          if (userIndex !== -1) {
            vm.users[userIndex] = updatedUser;
            vm.safeUsers[userIndex] = updatedUser;
          }
        }
      });

    }

    function activate() {
      vm.getUsers();
    }

  }

})();
