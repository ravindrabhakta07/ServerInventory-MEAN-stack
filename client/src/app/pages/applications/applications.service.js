(function () {
  'use strict';

  angular.module('ServerInventory.pages.applications')
    .factory('applicationsService', applicationsService);

  /** @ngInject */
  function applicationsService($http, urls) {

    var service = {
      createApplication: createApplication,
      getApplications: getApplications,
      getApplicationById: getApplicationById,
      updateApplication: updateApplication,
      removeApplication: removeApplication
    };

    function createApplication(applicationData) {
      return $http.post(urls.BASE_API + "/api/applications", applicationData);
    }

    function getApplications() {
      return $http.get(urls.BASE_API + "/api/applications");
    }

    function getApplicationById(id) {
      return $http.get(urls.BASE_API + "/api/applications/" + id);
    }

    function updateApplication(id, application) {
      return $http.put(urls.BASE_API + "/api/applications/" + id, application);
    }

    function removeApplication(id) {
      return $http.delete(urls.BASE_API + "/api/applications/" + id);
    }

    return service;
  }

})();
