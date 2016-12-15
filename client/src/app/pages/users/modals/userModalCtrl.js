(function () {
  'use strict';

  angular.module('ServerInventory.pages.users')
    .controller('UserModalCtrl', UserModalCtrl);

  /** @ngInject */
  function UserModalCtrl($cookies, $uibModalInstance, user, toastr, usersService) {

    var vm = this;
    vm.modalUser = user;
    vm.createUser = createUser;
    vm.updateUser = updateUser;

    function createUser(isFormValid) {
      if (!isFormValid)
        return false;

      usersService.createUser(vm.modalUser).then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data)
          $uibModalInstance.close(response.data);
        toastr.success('User created successfully', 'Users', {});
      }

      function onError(error) {
        toastr.error('There was error creating the user', 'Users', {})
      }

    }

    function updateUser() {
      usersService.updateUser(vm.modalUser._id, vm.modalUser).then(onSuccess).catch(onError);

      function onSuccess(response) {
        if (response.data._id) {
          if(response.data.isAdmin){
            var dateToday = new Date();
            dateToday.setHours(dateToday.getHours() + 2);
            $cookies.put('userDetails', JSON.stringify(response.data), [{expires: dateToday}]);
          }
          toastr.success('User has been updated successfully', 'Users', {});
          return $uibModalInstance.close(response.data);
        }
        return toastr.error('There was error in updating user', 'Users', {});
      }

      function onError(error) {
        if (error.status === 404)
          return toastr.error('No such user found', 'Users', {});
        return toastr.error('There was error in updating user', 'Users', {});
      }

    }

  }

})();
